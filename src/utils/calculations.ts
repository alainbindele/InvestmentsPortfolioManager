import { Asset, Strategy, PACPlan, PACProjection, PACFrequency } from '../types/portfolio';

export interface PortfolioMetrics {
  totalValue: number;
  expectedReturn: number;
  riskScore: number;
  diversificationScore: number;
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
}

export const calculatePortfolioMetrics = (assets: Asset[]): PortfolioMetrics => {
  if (assets.length === 0) {
    return {
      totalValue: 0,
      expectedReturn: 0,
      riskScore: 0,
      diversificationScore: 0,
      sharpeRatio: 0,
      volatility: 0,
      maxDrawdown: 0
    };
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
    const riskValue = asset.riskLevel === 'low' ? 1 : asset.riskLevel === 'medium' ? 2.5 : 4;
    return sum + (riskValue * weight);
  }, 0);

  // Calculate diversification score based on asset types
  const assetTypes = new Set(assets.map(asset => asset.type));
  const diversificationScore = Math.min(assetTypes.size * 20, 100);

  // Calculate volatility (simplified)
  const volatility = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    const assetVolatility = asset.riskLevel === 'low' ? 5 : asset.riskLevel === 'medium' ? 12 : 20;
    return sum + (assetVolatility * weight);
  }, 0);

  // Calculate Sharpe ratio (simplified)
  const riskFreeRate = 2; // Assume 2% risk-free rate
  const sharpeRatio = (expectedReturn - riskFreeRate) / (volatility / 100);

  // Calculate max drawdown (simplified)
  const maxDrawdown = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    const assetDrawdown = asset.riskLevel === 'low' ? 8 : asset.riskLevel === 'medium' ? 15 : 25;
    return sum + (assetDrawdown * weight);
  }, 0);

  return {
    totalValue,
    expectedReturn,
    riskScore,
    diversificationScore,
    sharpeRatio,
    volatility,
    maxDrawdown
  };
};

export const generateCurrentStrategy = (assets: Asset[]): Strategy => {
  if (assets.length === 0) {
    return {
      id: 'current-empty',
      name: 'Portfolio Vuoto',
      description: 'Aggiungi asset per vedere la tua strategia attuale',
      targetAllocations: {},
      expectedReturn: 0,
      riskScore: 0,
      sharpeRatio: 0,
      maxDrawdown: 0,
      volatility: 0,
      createdAt: new Date(),
      isAIGenerated: false
    };
  }

  const metrics = calculatePortfolioMetrics(assets);
  const totalValue = metrics.totalValue;
  
  // Calculate current allocations
  const currentAllocations: { [assetId: string]: number } = {};
  assets.forEach(asset => {
    currentAllocations[asset.id] = Math.round((asset.currentValue / totalValue) * 100);
  });

  return {
    id: 'current-strategy',
    name: 'Strategia Attuale',
    description: `La tua allocazione attuale basata su ${assets.length} asset`,
    targetAllocations: currentAllocations,
    expectedReturn: metrics.expectedReturn,
    riskScore: metrics.riskScore,
    sharpeRatio: metrics.sharpeRatio,
    maxDrawdown: metrics.maxDrawdown,
    volatility: metrics.volatility,
    createdAt: new Date(),
    isAIGenerated: false
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const projectPortfolioGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number,
  assets: Asset[]
): Array<{ year: number; value: number }> => {
  const projections = [];
  let currentValue = initialValue;
  
  for (let year = 0; year <= years; year++) {
    projections.push({
      year,
      value: Math.round(currentValue)
    });
    
    if (year < years) {
      currentValue *= (1 + annualReturn / 100);
    }
  }
  
  return projections;
};

export const getFrequencyMonths = (frequency: PACFrequency): number => {
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

export const calculatePACProjection = (
  pac: PACPlan,
  assets: Asset[]
): PACProjection[] => {
  const projections: PACProjection[] = [];
  const monthsPerYear = 12;
  const totalMonths = pac.duration * monthsPerYear;
  const monthlyReturn = pac.expectedReturn / 100 / 12;
  const frequencyMonths = getFrequencyMonths(pac.frequency);
  
  let totalInvested = 0;
  let portfolioValue = 0;
  
  for (let month = 0; month <= totalMonths; month++) {
    // Add contribution based on frequency
    if (month > 0 && month % frequencyMonths === 0) {
      totalInvested += pac.monthlyAmount;
      portfolioValue += pac.monthlyAmount;
    }
    
    // Apply monthly growth
    if (month > 0) {
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