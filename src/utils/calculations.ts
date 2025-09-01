import { Asset, Strategy, PortfolioMetrics } from '../types/portfolio';
import { Asset, Strategy, PortfolioMetrics, PACPlan, PACProjection } from '../types/portfolio';
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
  assets: Asset[],
  strategy?: Strategy
): Array<{ year: number; value: number }> => {
  return calculatePrecisePortfolioGrowth(initialValue, annualReturn, years, assets, strategy);
};

// New precise calculation with monthly compounding
export const calculatePrecisePortfolioGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number,
  assets: Asset[],
  strategy?: Strategy
): Array<{ year: number; value: number }> => {
  const monthlyReturn = annualReturn / 100 / 12; // Convert annual to monthly
  const totalMonths = years * 12;
  let currentValue = initialValue;
  
  // Calculate monthly PAC contributions for each asset
  const assetPACContributions = assets.map(asset => {
    if (!asset.isPAC || !asset.pacAmount || !asset.pacFrequency) {
      return { assetId: asset.id, monthlyAmount: 0, frequency: 'monthly' as const };
    }
    
    let monthlyAmount = 0;
    switch (asset.pacFrequency) {
      case 'monthly':
        monthlyAmount = asset.pacAmount;
        break;
      case 'quarterly':
        monthlyAmount = asset.pacAmount / 3;
        break;
      case 'biannual':
        monthlyAmount = asset.pacAmount / 6;
        break;
      case 'annual':
        monthlyAmount = asset.pacAmount / 12;
        break;
    }
    
    // Apply strategy allocation weight if provided
    if (strategy && strategy.targetAllocations[asset.id]) {
      monthlyAmount *= (strategy.targetAllocations[asset.id] / 100);
    }
    
    return {
      assetId: asset.id,
      monthlyAmount,
      frequency: asset.pacFrequency
    };
  });
  
  const totalMonthlyPAC = assetPACContributions.reduce((sum, pac) => sum + pac.monthlyAmount, 0);
  
  // Monthly simulation for precise compound interest
  const monthlyValues: number[] = [];
  
  for (let month = 0; month <= totalMonths; month++) {
    if (month > 0) {
      // Apply monthly compound growth
      currentValue *= (1 + monthlyReturn);
      
      // Add PAC contributions
      assetPACContributions.forEach(pac => {
        if (pac.monthlyAmount > 0) {
          // Check if this month requires a contribution based on frequency
          let shouldContribute = false;
          
          switch (pac.frequency) {
            case 'monthly':
              shouldContribute = true;
              break;
            case 'quarterly':
              shouldContribute = month % 3 === 0;
              break;
            case 'biannual':
              shouldContribute = month % 6 === 0;
              break;
            case 'annual':
              shouldContribute = month % 12 === 0;
              break;
          }
          
          if (shouldContribute) {
            // For quarterly/biannual/annual, add the full amount in the contribution month
            const contributionAmount = pac.frequency === 'monthly' ? pac.monthlyAmount :
                                     pac.frequency === 'quarterly' ? pac.monthlyAmount * 3 :
                                     pac.frequency === 'biannual' ? pac.monthlyAmount * 6 :
                                     pac.monthlyAmount * 12;
            currentValue += contributionAmount;
          }
        }
      });
    }
    
    monthlyValues.push(currentValue);
  }
  
  // Convert monthly values to yearly projections
  const yearlyProjections = [];
  for (let year = 0; year <= years; year++) {
    const monthIndex = year * 12;
    yearlyProjections.push({
      year,
      value: Math.round(monthlyValues[monthIndex] || currentValue)
    });
  }
  
  return yearlyProjections;
};

// Calculate detailed PAC projection with monthly breakdown
export const calculatePACProjection = (
  pacPlan: PACPlan,
  assets: Asset[]
): PACProjection[] => {
  const monthlyReturn = pacPlan.expectedReturn / 100 / 12;
  const totalMonths = pacPlan.duration * 12;
  
  let portfolioValue = 0;
  let totalInvested = 0;
  const projections: PACProjection[] = [];
  
  // Calculate monthly contribution amount based on frequency
  const getMonthlyContribution = (month: number): number => {
    switch (pacPlan.frequency) {
      case 'monthly':
        return pacPlan.monthlyAmount;
      case 'quarterly':
        return month % 3 === 1 ? pacPlan.monthlyAmount : 0; // Contribute in months 1, 4, 7, 10
      case 'biannual':
        return month % 6 === 1 ? pacPlan.monthlyAmount : 0; // Contribute in months 1, 7
      case 'annual':
        return month % 12 === 1 ? pacPlan.monthlyAmount : 0; // Contribute in month 1 of each year
      default:
        return 0;
    }
  };
  
  for (let month = 0; month <= totalMonths; month++) {
    // Apply monthly compound growth to existing portfolio
    if (month > 0) {
      portfolioValue *= (1 + monthlyReturn);
      
      // Add monthly contribution if applicable
      const monthlyContribution = getMonthlyContribution(month);
      if (monthlyContribution > 0) {
        portfolioValue += monthlyContribution;
        totalInvested += monthlyContribution;
      }
    }
    
    const totalGain = portfolioValue - totalInvested;
    const gainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
    
    projections.push({
      month,
      totalInvested,
      portfolioValue: Math.round(portfolioValue),
      totalGain: Math.round(totalGain),
      gainPercentage,
      monthlyContribution: month > 0 ? getMonthlyContribution(month) : 0
    });
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