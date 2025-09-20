import { Asset, Strategy, PortfolioMetrics } from '../types/portfolio';
import { Currency, getCurrencyByCode } from '../types/currency';
import { getTranslation, Language } from './translations';

// Risk level mappings
const RISK_MULTIPLIERS: { [key: string]: number } = {
  'very_low': 1,
  'low': 2,
  'medium': 3,
  'high': 4,
  'very_high': 5
};

// Asset type diversification weights
const DIVERSIFICATION_WEIGHTS = {
  stocks: 1,
  bonds: 1,
  etf: 0.8,
  real_estate: 1.2,
  commodities: 1.1,
  crypto: 1.3,
  cash: 0.5,
  other: 0.9
};

export const calculatePortfolioMetrics = (assets: Asset[]): PortfolioMetrics => {
  if (assets.length === 0) {
    return {
      totalValue: 0,
      expectedReturn: 0,
      riskScore: 0,
      diversificationScore: 0
    };
  }

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Weighted average expected return
  const expectedReturn = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    return sum + (asset.expectedReturn * weight);
  }, 0);

  // Weighted average risk score
  const riskScore = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    const riskValue = RISK_MULTIPLIERS[asset.riskLevel];
    return sum + (riskValue * weight);
  }, 0);

  // Diversification score based on asset types and allocation
  const typeAllocations: { [key: string]: number } = {};
  assets.forEach(asset => {
    const allocation = asset.currentValue / totalValue;
    typeAllocations[asset.type] = (typeAllocations[asset.type] || 0) + allocation;
  });

  // Calculate diversification score (0-100)
  const numTypes = Object.keys(typeAllocations).length;
  const maxTypes = Object.keys(DIVERSIFICATION_WEIGHTS).length;
  
  // Base score from number of asset types
  let diversificationScore = (numTypes / maxTypes) * 50;
  
  // Bonus for balanced allocation (penalty for concentration)
  const allocations = Object.values(typeAllocations);
  const maxAllocation = Math.max(...allocations);
  const concentrationPenalty = maxAllocation > 0.6 ? (maxAllocation - 0.6) * 50 : 0;
  diversificationScore = Math.max(0, diversificationScore + 50 - concentrationPenalty);

  return {
    totalValue,
    expectedReturn,
    riskScore,
    diversificationScore: Math.round(diversificationScore)
  };
};

export const generateCurrentStrategy = (assets: Asset[], language: Language = 'it'): Strategy => {
  const metrics = calculatePortfolioMetrics(assets);
  const totalValue = metrics.totalValue;
  
  // Calculate current allocations
  const targetAllocations: { [assetId: string]: number } = {};
  assets.forEach(asset => {
    const allocation = totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0;
    targetAllocations[asset.id] = Math.round(allocation);
  });

  // Calculate Sharpe ratio (simplified)
  const riskFreeRate = 2; // Assume 2% risk-free rate
  const sharpeRatio = metrics.riskScore > 0 ? (metrics.expectedReturn - riskFreeRate) / (metrics.riskScore * 2) : 0;

  // Estimate volatility based on risk score and asset mix
  const volatility = metrics.riskScore * 2.5 + 5;

  // Estimate max drawdown based on risk profile
  const maxDrawdown = metrics.riskScore * 4 + 8;

  return {
    id: 'current-strategy',
    name: getTranslation(language, 'currentStrategyName'),
    description: getTranslation(language, 'currentStrategyDescription'),
    targetAllocations,
    expectedReturn: Math.round(metrics.expectedReturn * 10) / 10, // Round to 1 decimal
    riskScore: metrics.riskScore,
    sharpeRatio,
    maxDrawdown,
    volatility,
    createdAt: new Date(),
    isAIGenerated: false
  };
};

export const projectPortfolioGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number,
  assets: Asset[],
  strategy?: Strategy
): Array<{ year: number; value: number }> => {
  console.log('projectPortfolioGrowth called with:', {
    initialValue,
    annualReturn,
    years,
    hasStrategy: !!strategy,
    assetsWithPAC: assets.filter(a => a.isPAC).length
  });
  
  // ALWAYS use the precise calculation that handles PAC correctly
  return calculatePrecisePortfolioGrowth(initialValue, annualReturn, years, assets, strategy);
};

// New function for strategy-specific growth calculations
export const calculateStrategySpecificGrowth = (
  initialValue: number,
  strategy: Strategy,
  assets: Asset[],
  years: number
): Array<{ year: number; value: number }> => {
  // Calculate weighted returns based on strategy allocations and asset-specific returns
  let strategyWeightedReturn = 0;
  let totalStrategyAllocation = 0;
  
  // Calculate the weighted return for this specific strategy
  Object.entries(strategy.targetAllocations).forEach(([assetId, allocation]) => {
    const asset = assets.find(a => a.id === assetId);
    if (asset && allocation > 0) {
      const weight = allocation / 100;
      strategyWeightedReturn += asset.expectedReturn * weight;
      totalStrategyAllocation += allocation;
    }
  });
  
  // Normalize if allocations don't sum to 100%
  if (totalStrategyAllocation > 0 && totalStrategyAllocation !== 100) {
    strategyWeightedReturn = (strategyWeightedReturn / totalStrategyAllocation) * 100;
  }
  
  // Use strategy's expected return if no valid allocations found
  const finalReturn = strategyWeightedReturn > 0 ? strategyWeightedReturn : strategy.expectedReturn;
  
  // Calculate monthly return for this strategy
  const monthlyReturn = finalReturn / 100 / 12;
  
  const totalMonths = years * 12;
  let currentValue = initialValue;
  const yearlyProjections = [];
  
  // Calculate month by month
  for (let month = 0; month <= totalMonths; month++) {
    // Add yearly projections
    if (month % 12 === 0) {
      yearlyProjections.push({
        year: month / 12,
        value: Math.round(currentValue)
      });
    }
    
    if (month < totalMonths) {
      // Apply monthly compound growth using strategy-specific return
      currentValue *= (1 + monthlyReturn);
    }
  }
  
  return yearlyProjections;
};

// New precise calculation with monthly compounding
export const calculatePrecisePortfolioGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number,
  assets: Asset[],
  strategy?: Strategy
): Array<{ year: number; value: number }> => {
  const projections = [];
  let currentValue = initialValue;
  
  // Calculate monthly return rate
  const monthlyReturn = annualReturn / 100 / 12;
  
  // Calculate monthly PAC contributions for each asset
  const assetPACContributions = assets.map(asset => {
    if (!asset.isPAC || !asset.pacAmount) return 0;
    
    switch (asset.pacFrequency) {
      case 'monthly':
        return asset.pacAmount;
      case 'quarterly':
        return asset.pacAmount / 3;
      case 'yearly':
        return asset.pacAmount / 12;
      default:
        return 0;
    }
  });
  
  const totalMonthlyPAC = assetPACContributions.reduce((sum, contrib) => sum + contrib, 0);
  
  console.log('PAC Debug:', {
    initialValue,
    annualReturn,
    monthlyReturn,
    totalMonthlyPAC,
    years,
    assets: assets.map(a => ({ name: a.name, isPAC: a.isPAC, pacAmount: a.pacAmount }))
  });
  
  // Add year 0
  projections.push({ year: 0, value: Math.round(currentValue) });
  
  // Calculate year by year
  for (let year = 1; year <= years; year++) {
    // Calculate 12 months for this year
    for (let month = 1; month <= 12; month++) {
      // Add monthly PAC contribution first
      currentValue += totalMonthlyPAC;
      // Then apply monthly compound interest
      currentValue *= (1 + monthlyReturn);
    }
    
    console.log(`Year ${year}: ${Math.round(currentValue)}€`);
    
    // Store yearly result
    projections.push({ 
      year, 
      value: Math.round(currentValue) 
    });
  }
  
  console.log('Final projections:', projections);
  return projections;
};

export const formatCurrency = (amount: number, currency: Currency = 'EUR'): string => {
  const currencyData = getCurrencyByCode(currency);
  
  // For currencies with specific formatting needs
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
  
  // Special handling for certain currencies
  if (['JPY', 'KRW', 'VND', 'IDR'].includes(currency)) {
    // These currencies typically don't use decimal places
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  } else if (['BHD', 'KWD', 'OMR'].includes(currency)) {
    // These currencies use 3 decimal places
    formatOptions.minimumFractionDigits = 3;
    formatOptions.maximumFractionDigits = 3;
  }
  
  // Determine locale based on currency
  let locale = 'en-US';
  if (currency === 'EUR') locale = 'it-IT';
  else if (currency === 'GBP') locale = 'en-GB';
  else if (currency === 'JPY') locale = 'ja-JP';
  else if (currency === 'CNY') locale = 'zh-CN';
  else if (currency === 'INR') locale = 'hi-IN';
  else if (currency === 'BRL') locale = 'pt-BR';
  else if (currency === 'RUB') locale = 'ru-RU';
  else if (currency === 'KRW') locale = 'ko-KR';
  
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
    ...formatOptions
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};