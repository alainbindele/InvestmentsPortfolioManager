import { Asset, Portfolio, Strategy, RebalancingAction } from '../types/portfolio';
import { PACPlan, PACProjection } from '../types/portfolio';

export const calculatePortfolioMetrics = (assets: Asset[]): {
  totalValue: number;
  expectedReturn: number;
  riskScore: number;
  diversificationScore: number;
} => {
  if (assets.length === 0) {
    return { totalValue: 0, expectedReturn: 0, riskScore: 0, diversificationScore: 0 };
  }

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Calculate weighted expected return
  const expectedReturn = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    return sum + (asset.expectedReturn * weight);
  }, 0);

  // Calculate risk score (weighted average of risk levels)
  const riskScore = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    const riskValue = asset.riskLevel === 'low' ? 1 : asset.riskLevel === 'medium' ? 2 : 3;
    return sum + (riskValue * weight);
  }, 0);

  // Calculate diversification score (based on number of asset types and allocation distribution)
  const assetTypes = new Set(assets.map(asset => asset.type));
  const typeCount = assetTypes.size;
  const maxAllocation = Math.max(...assets.map(asset => asset.currentValue / totalValue));
  const diversificationScore = Math.min(100, (typeCount * 20) + ((1 - maxAllocation) * 50));

  return {
    totalValue,
    expectedReturn: Math.round(expectedReturn * 100) / 100,
    riskScore: Math.round(riskScore * 100) / 100,
    diversificationScore: Math.round(diversificationScore)
  };
};

export const calculateSharpeRatio = (expectedReturn: number, riskFreeRate: number = 2, volatility: number): number => {
  return (expectedReturn - riskFreeRate) / volatility;
};

export const calculateVolatility = (assets: Asset[]): number => {
  if (assets.length === 0) return 0;
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Simplified volatility calculation based on risk levels and correlations
  const weightedVolatility = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    const assetVolatility = asset.riskLevel === 'low' ? 5 : asset.riskLevel === 'medium' ? 15 : 25;
    return sum + (weight * weight * assetVolatility * assetVolatility);
  }, 0);
  
  return Math.sqrt(weightedVolatility);
};

export const calculateMaxDrawdown = (expectedReturn: number, volatility: number): number => {
  // Simplified max drawdown estimation
  return Math.min(50, volatility * 1.5 + Math.max(0, 10 - expectedReturn));
};

export const calculateRebalancingActions = (
  currentAssets: Asset[],
  targetAllocations: { [assetId: string]: number }
): RebalancingAction[] => {
  const totalValue = currentAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  return currentAssets.map(asset => {
    const currentAllocation = (asset.currentValue / totalValue) * 100;
    const targetAllocation = targetAllocations[asset.id] || 0;
    const targetValue = (targetAllocation / 100) * totalValue;
    const difference = targetValue - asset.currentValue;
    
    return {
      assetId: asset.id,
      assetName: asset.name,
      currentAllocation: Math.round(currentAllocation * 100) / 100,
      targetAllocation,
      currentValue: asset.currentValue,
      targetValue: Math.round(targetValue),
      action: Math.abs(difference) < totalValue * 0.01 ? 'hold' : difference > 0 ? 'buy' : 'sell',
      amount: Math.abs(Math.round(difference))
    };
  });
};

export const projectPortfolioGrowth = (
  initialValue: number,
  expectedReturn: number,
  years: number = 10,
  assets?: Asset[]
): { year: number; value: number }[] => {
  const projections = [];
  
  // Se abbiamo gli asset, calcola separatamente PAC e non-PAC
  if (assets && assets.length > 0) {
    const pacAssets = assets.filter(asset => asset.isPAC);
    const nonPacAssets = assets.filter(asset => !asset.isPAC);
    
    // Calcola i valori iniziali correttamente
    let nonPacValue = nonPacAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
    let pacValue = pacAssets.reduce((sum, asset) => {
      // Per i PAC, usa pacStartingValue se disponibile, altrimenti currentValue
      return sum + (asset.pacStartingValue !== undefined ? asset.pacStartingValue : asset.currentValue);
    }, 0);
    
    // Contributi mensili totali dai PAC
    const totalMonthlyContributions = pacAssets.reduce((sum, asset) => {
      if (!asset.pacAmount || !asset.pacFrequency) return sum;
      
      const monthsPerContribution = getFrequencyMonths(asset.pacFrequency);
      const monthlyEquivalent = asset.pacAmount / monthsPerContribution;
      return sum + monthlyEquivalent;
    }, 0);
    
    // Calcola i rendimenti medi per ogni categoria
    const nonPacReturn = nonPacAssets.length > 0 ? 
      nonPacAssets.reduce((sum, asset) => sum + asset.expectedReturn, 0) / nonPacAssets.length : 0;
    
    const pacReturn = pacAssets.length > 0 ? 
      pacAssets.reduce((sum, asset) => sum + asset.expectedReturn, 0) / pacAssets.length : 0;
    
    const monthlyNonPacReturn = nonPacReturn / 100 / 12;
    const monthlyPacReturn = pacReturn / 100 / 12;
    
    for (let year = 0; year <= years; year++) {
      // Per il primo anno, usa i valori iniziali
      if (year === 0) {
        projections.push({
          year: 0,
          value: Math.round(nonPacValue + pacValue)
        });
      } else {
        // Calcola crescita mese per mese per questo anno
        for (let month = 1; month <= 12; month++) {
          // Aggiungi contributi mensili PAC
          // Aggiungi contributi PAC in base alla frequenza
          pacAssets.forEach(asset => {
            if (asset.pacAmount && asset.pacFrequency) {
              const monthsPerContribution = getFrequencyMonths(asset.pacFrequency);
              if (month % monthsPerContribution === 0) {
                pacValue += asset.pacAmount;
              }
            }
          });
          
          // Applica crescita compound mensile
          if (nonPacValue > 0 && monthlyNonPacReturn > 0) {
            nonPacValue *= (1 + monthlyNonPacReturn);
          }
          if (pacValue > 0 && monthlyPacReturn > 0) {
            pacValue *= (1 + monthlyPacReturn);
          }
        }
        
        projections.push({
          year,
          value: Math.round(nonPacValue + pacValue)
        });
      }
    }
  } else {
    // Calcolo semplice senza PAC (backward compatibility)
    let currentValue = initialValue;
    
    for (let year = 0; year <= years; year++) {
      projections.push({
        year,
        value: Math.round(currentValue)
      });
      if (year < years) {
        currentValue *= (1 + expectedReturn / 100);
      }
    }
  }
  
  return projections;
};

export const getFrequencyMonths = (frequency: string): number => {
  switch (frequency) {
    case 'monthly': return 1;
    case 'bimonthly': return 2;
    case 'quarterly': return 3;
    case 'fourmonthly': return 4;
    case 'biannual': return 6;
    case 'annual': return 12;
    default: return 1;
  }
};

export const compareStrategies = (strategies: Strategy[]): {
  bestReturn: Strategy;
  bestRisk: Strategy;
  bestSharpe: Strategy;
} => {
  if (strategies.length === 0) {
    const defaultStrategy: Strategy = {
      id: '',
      name: '',
      description: '',
      targetAllocations: {},
      expectedReturn: 0,
      riskScore: 0,
      sharpeRatio: 0,
      maxDrawdown: 0,
      volatility: 0,
      createdAt: new Date()
    };
    return {
      bestReturn: defaultStrategy,
      bestRisk: defaultStrategy,
      bestSharpe: defaultStrategy
    };
  }

  const bestReturn = strategies.reduce((best, current) => 
    current.expectedReturn > best.expectedReturn ? current : best
  );
  
  const bestRisk = strategies.reduce((best, current) => 
    current.riskScore < best.riskScore ? current : best
  );
  
  const bestSharpe = strategies.reduce((best, current) => 
    current.sharpeRatio > best.sharpeRatio ? current : best
  );

  return { bestReturn, bestRisk, bestSharpe };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const calculatePACProjection = (
  pacPlan: PACPlan,
  assets: Asset[]
): PACProjection[] => {
  const projections: PACProjection[] = [];
  const monthsPerContribution = pacPlan.frequency === 'monthly' ? 1 : 
                                pacPlan.frequency === 'quarterly' ? 3 :
                                pacPlan.frequency === 'biannual' ? 6 : 12;
  
  const totalMonths = pacPlan.duration * 12;
  const contributionAmount = pacPlan.monthlyAmount * monthsPerContribution;
  
  // Calculate weighted expected return based on PAC allocation
  // Use custom return if specified, otherwise calculate weighted return
  const weightedReturn = pacPlan.customReturn || Object.entries(pacPlan.targetAllocations).reduce((sum, [assetId, allocation]) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return sum;
    return sum + (asset.expectedReturn * allocation / 100);
  }, 0);
  
  const monthlyReturn = weightedReturn / 100 / 12;
  
  let totalInvested = 0;
  let portfolioValue = 0;
  
  for (let month = 0; month <= totalMonths; month++) {
    // Add contribution at the right frequency
    if (month > 0 && month % monthsPerContribution === 0) {
      totalInvested += contributionAmount;
      portfolioValue += contributionAmount;
    }
    
    // Apply compound growth
    if (month > 0 && portfolioValue > 0) {
      portfolioValue *= (1 + monthlyReturn);
    }
    
    const totalGain = portfolioValue - totalInvested;
    const gainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
    
    projections.push({
      month,
      totalInvested: Math.round(totalInvested),
      portfolioValue: Math.round(portfolioValue),
      totalGain: Math.round(totalGain),
      gainPercentage: Math.round(gainPercentage * 100) / 100
    });
  }
  
  return projections;
};

export const getContributionFrequencyMultiplier = (frequency: PACPlan['frequency']): number => {
  switch (frequency) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'biannual': return 2;
    case 'annual': return 1;
    default: return 12;
  }
};