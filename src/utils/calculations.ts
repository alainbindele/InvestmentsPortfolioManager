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
  years: number = 10
): { year: number; value: number }[] => {
  const projections = [];
  let currentValue = initialValue;
  
  for (let year = 0; year <= years; year++) {
    projections.push({
      year,
      value: Math.round(currentValue)
    });
    currentValue *= (1 + expectedReturn / 100);
  }
  
  return projections;
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
  const weightedReturn = Object.entries(pacPlan.targetAllocations).reduce((sum, [assetId, allocation]) => {
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