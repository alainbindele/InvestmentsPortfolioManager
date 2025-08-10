import { Asset, Strategy, PortfolioMetrics } from '../types/portfolio';
import { Currency, getCurrencyByCode } from '../types/currency';

// Risk level mappings
const RISK_MULTIPLIERS = {
  low: 1,
  medium: 2,
  high: 3
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

export const generateCurrentStrategy = (assets: Asset[]): Strategy => {
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
  const sharpeRatio = metrics.riskScore > 0 ? (metrics.expectedReturn - riskFreeRate) / metrics.riskScore : 0;

  // Estimate volatility based on risk score and asset mix
  const volatility = metrics.riskScore * 3 + Math.random() * 2;

  // Estimate max drawdown based on risk profile
  const maxDrawdown = metrics.riskScore * 5 + Math.random() * 5;

  return {
    id: 'current-strategy',
    name: 'Strategia Attuale',
    description: 'La tua allocazione attuale del portafoglio',
    targetAllocations,
    expectedReturn: metrics.expectedReturn,
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
  assets: Asset[]
): Array<{ year: number; value: number }> => {
  const projections = [];
  let currentValue = initialValue;
  
  // Add PAC contributions if any assets have PAC enabled
  const totalPACContribution = assets.reduce((sum, asset) => {
    if (asset.isPAC && asset.pacAmount && asset.pacFrequency) {
      const monthlyContribution = asset.pacAmount;
      const frequencyMultiplier = asset.pacFrequency === 'monthly' ? 12 :
                                 asset.pacFrequency === 'quarterly' ? 4 :
                                 asset.pacFrequency === 'biannual' ? 2 : 1;
      return sum + (monthlyContribution * frequencyMultiplier);
    }
    return sum;
  }, 0);

  for (let year = 0; year <= years; year++) {
    projections.push({
      year,
      value: Math.round(currentValue)
    });
    
    if (year < years) {
      // Apply annual return
      currentValue *= (1 + annualReturn / 100);
      
      // Add PAC contributions
      currentValue += totalPACContribution;
    }
  }
  
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