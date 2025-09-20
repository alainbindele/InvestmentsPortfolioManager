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
  // Check if any assets have PAC enabled
  const hasPAC = assets.some(asset => asset.isPAC && asset.pacAmount && asset.pacAmount > 0);
  
  if (hasPAC) {
    return calculatePACGrowth(initialValue, annualReturn, years, assets);
  } else {
    return calculateSimpleGrowth(initialValue, annualReturn, years);
  }
};

// Simple compound growth without PAC
const calculateSimpleGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number
): Array<{ year: number; value: number }> => {
  const projections = [];
  let currentValue = initialValue;
  
  for (let year = 0; year <= years; year++) {
    projections.push({ year, value: Math.round(currentValue) });
    if (year < years) {
      currentValue *= (1 + annualReturn / 100);
    }
  }
  
  return projections;
};

// PAC calculation with monthly contributions and compounding
const calculatePACGrowth = (
  initialValue: number,
  annualReturn: number,
  years: number,
  assets: Asset[]
): Array<{ year: number; value: number }> => {
    en: 'Type',
    es: 'Tipo',
    fr: 'Type',
    de: 'Typ',
    pt: 'Tipo'
  },
  allocation: {
    it: 'Allocazione',
    en: 'Allocation',
    es: 'Asignación',
    fr: 'Allocation',
    de: 'Allokation',
    pt: 'Alocação'
  },
  actions: {
    it: 'Azioni',
    en: 'Actions',
    es: 'Acciones',
    fr: 'Actions',
    de: 'Aktionen',
    pt: 'Ações'
  },
  projectedGrowth: {
    it: 'Crescita Proiettata',
    en: 'Projected Growth',
    es: 'Crecimiento Proyectado',
    fr: 'Croissance Projetée',
    de: 'Projiziertes Wachstum',
    pt: 'Crescimento Projetado'
  },
  timeHorizon: {
    it: 'Orizzonte Temporale',
    en: 'Time Horizon',
    es: 'Horizonte Temporal',
    fr: 'Horizon Temporel',
    de: 'Zeithorizont',
    pt: 'Horizonte Temporal'
  },
  years: {
    it: 'anni',
    en: 'years',
    es: 'años',
    fr: 'années',
    de: 'Jahre',
    pt: 'anos'
  },
  year: {
    it: 'Anno',
    en: 'Year',
    es: 'Año',
    fr: 'Année',
    de: 'Jahr',
    pt: 'Ano'
  },
  anno: {
    it: 'Anno',
    en: 'Year',
    es: 'Año',
    fr: 'Année',
    de: 'Jahr',
    pt: 'Ano'
  },
  value: {
    it: 'Valore',
    en: 'Value',
    es: 'Valor',
    fr: 'Valeur',
    de: 'Wert',
    pt: 'Valor'
  },
  portfolioProjection: {
    it: 'Proiezione Portfolio',
    en: 'Portfolio Projection',
    es: 'Proyección de Cartera',
    fr: 'Projection du Portefeuille',
    de: 'Portfolio-Projektion',
    pt: 'Projeção do Portfólio'
  },
  growthProjectionComparison: {
    it: 'Confronto delle proiezioni di crescita tra strategie',
    en: 'Growth projection comparison between strategies',
    es: 'Comparación de proyecciones de crecimiento entre estrategias',
    fr: 'Comparaison des projections de croissance entre stratégies',
    de: 'Vergleich der Wachstumsprojektionen zwischen Strategien',
    pt: 'Comparação de projeções de crescimento entre estratégias'
  },
  singleAssetProjection: {
    it: 'Proiezione singolo asset:',
    en: 'Single asset projection:',
    es: 'Proyección de activo único:',
    fr: 'Projection d\'actif unique:',
    de: 'Einzelne Asset-Projektion:',
    pt: 'Projeção de ativo único:'
  },
  selectAssetToAnalyze: {
    it: 'Seleziona asset da analizzare',
    en: 'Select asset to analyze',
    es: 'Seleccionar activo para analizar',
    fr: 'Sélectionner l\'actif à analyser',
    de: 'Asset zur Analyse auswählen',
    pt: 'Selecionar ativo para analisar'
  },
  entirePortfolio: {
    it: 'Intero Portfolio',
    en: 'Entire Portfolio',
    es: 'Cartera Completa',
    fr: 'Portefeuille Entier',
    de: 'Gesamtes Portfolio',
    pt: 'Portfólio Inteiro'
  },

  // Strategy related
  investmentStrategies: {
    it: 'Strategie di Investimento',
    en: 'Investment Strategies',
    es: 'Estrategias de Inversión',
    fr: 'Stratégies d\'Investissement',
    de: 'Anlagestrategien',
    pt: 'Estratégias de Investimento'
  },
  selectedStrategy: {
    it: 'Strategia Selezionata',
    en: 'Selected Strategy',
    es: 'Estrategia Seleccionada',
    fr: 'Stratégie Sélectionnée',
    de: 'Ausgewählte Strategie',
    pt: 'Estratégia Selecionada'
  },
  strategyComparison: {
    it: 'Confronto Strategie',
    en: 'Strategy Comparison',
    es: 'Comparación de Estrategias',
    fr: 'Comparaison des Stratégies',
    de: 'Strategievergleich',
    pt: 'Comparação de Estratégias'
  },
  comparisonMetrics: {
    it: 'Metriche di Confronto',
    en: 'Comparison Metrics',
    es: 'Métricas de Comparación',
    fr: 'Métriques de Comparaison',
    de: 'Vergleichsmetriken',
    pt: 'Métricas de Comparação'
  },
  detailedComparison: {
    it: 'Confronto Dettagliato',
    en: 'Detailed Comparison',
    es: 'Comparación Detallada',
    fr: 'Comparaison Détaillée',
    de: 'Detaillierter Vergleich',
    pt: 'Comparação Detalhada'
  },
  strategy: {
    it: 'Strategia',
    en: 'Strategy',
    es: 'Estrategia',
    fr: 'Stratégie',
    de: 'Strategie',
    pt: 'Estratégia'
  },
  return: {
    it: 'Rendimento',
    en: 'Return',
    es: 'Rendimiento',
    fr: 'Rendement',
    de: 'Rendite',
    pt: 'Retorno'
  },
  risk: {
    it: 'Rischio',
    en: 'Risk',
    es: 'Riesgo',
    fr: 'Risque',
    de: 'Risiko',
    pt: 'Risco'
  },
  sharpe: {
    it: 'Sharpe',
    en: 'Sharpe',
    es: 'Sharpe',
    fr: 'Sharpe',
    de: 'Sharpe',
    pt: 'Sharpe'
  },
  sharpeRatio: {
    it: 'Sharpe Ratio',
    en: 'Sharpe Ratio',
    es: 'Ratio de Sharpe',
    fr: 'Ratio de Sharpe',
    de: 'Sharpe-Verhältnis',
    pt: 'Índice de Sharpe'
  },
  volatility: {
    it: 'Volatilità',
    en: 'Volatility',
    es: 'Volatilidad',
    fr: 'Volatilité',
    de: 'Volatilität',
    pt: 'Volatilidade'
  },
  maxDrawdown: {
    it: 'Max Drawdown',
    en: 'Max Drawdown',
    es: 'Máximo Drawdown',
    fr: 'Drawdown Maximum',
    de: 'Max. Drawdown',
    pt: 'Drawdown Máximo'
  },
  bestReturn: {
    it: 'Miglior Rendimento',
    en: 'Best Return',
    es: 'Mejor Rendimiento',
    fr: 'Meilleur Rendement',
    de: 'Beste Rendite',
    pt: 'Melhor Retorno'
  },
  lowestRisk: {
    it: 'Rischio Più Basso',
    en: 'Lowest Risk',
    es: 'Menor Riesgo',
    fr: 'Risque le Plus Bas',
    de: 'Niedrigstes Risiko',
    pt: 'Menor Risco'
  },
  bestSharpe: {
    it: 'Miglior Sharpe',
    en: 'Best Sharpe',
    es: 'Mejor Sharpe',
    fr: 'Meilleur Sharpe',
    de: 'Bester Sharpe',
    pt: 'Melhor Sharpe'
  },
  allocationTarget: {
    it: 'Allocazione Target',
    en: 'Target Allocation',
    es: 'Asignación Objetivo',
    fr: 'Allocation Cible',
    de: 'Ziel-Allokation',
    pt: 'Alocação Alvo'
  },
  totalPortfolio: {
    it: 'Portfolio Totale',
    en: 'Total Portfolio',
    es: 'Cartera Total',
    fr: 'Portefeuille Total',
    de: 'Gesamtes Portfolio',
    pt: 'Portfólio Total'
  },
  selectedForComparison: {
    it: 'Selezionata per confronto',
    en: 'Selected for comparison',
    es: 'Seleccionada para comparación',
    fr: 'Sélectionnée pour comparaison',
    de: 'Für Vergleich ausgewählt',
    pt: 'Selecionada para comparação'
  },
  cloneAndEdit: {
    it: 'Clona e Modifica',
    en: 'Clone & Edit',
    es: 'Clonar y Editar',
    fr: 'Cloner et Modifier',
    de: 'Klonen & Bearbeiten',
    pt: 'Clonar e Editar'
  },

  // Sharpe Ratio tooltips
  sharpeRatioTitle: {
    it: 'Sharpe Ratio',
    en: 'Sharpe Ratio',
    es: 'Ratio de Sharpe',
    fr: 'Ratio de Sharpe',
    de: 'Sharpe-Verhältnis',
    pt: 'Índice de Sharpe'
  },
  sharpeRatioDescription: {
    it: 'Misura il rendimento aggiustato per il rischio. Più alto è meglio.',
    en: 'Measures risk-adjusted return. Higher is better.',
    es: 'Mide el rendimiento ajustado por riesgo. Más alto es mejor.',
    fr: 'Mesure le rendement ajusté au risque. Plus élevé est mieux.',
    de: 'Misst die risikoadjustierte Rendite. Höher ist besser.',
    pt: 'Mede o retorno ajustado ao risco. Maior é melhor.'
  },
  interpretation: {
    it: 'Interpretazione',
    en: 'Interpretation',
    es: 'Interpretación',
    fr: 'Interprétation',
    de: 'Interpretation',
    pt: 'Interpretação'
  },
  sharpeExcellent: {
    it: 'Eccellente',
    en: 'Excellent',
    es: 'Excelente',
    fr: 'Excellent',
    de: 'Ausgezeichnet',
    pt: 'Excelente'
  },
  sharpeGood: {
    it: 'Buono',
    en: 'Good',
    es: 'Bueno',
    fr: 'Bon',
    de: 'Gut',
    pt: 'Bom'
  },
  sharpeAcceptable: {
    it: 'Accettabile',
    en: 'Acceptable',
    es: 'Aceptable',
    fr: 'Acceptable',
    de: 'Akzeptabel',
    pt: 'Aceitável'
  },
  sharpePoor: {
    it: 'Scarso',
    en: 'Poor',
    es: 'Pobre',
    fr: 'Pauvre',
    de: 'Schlecht',
    pt: 'Ruim'
  },
  example: {
    it: 'Esempio',
    en: 'Example',
    es: 'Ejemplo',
    fr: 'Exemple',
    de: 'Beispiel',
    pt: 'Exemplo'
  },
  sharpeExample: {
    it: 'Un Sharpe di 1.2 significa che per ogni unità di rischio, ottieni 1.2 unità di rendimento extra.',
    en: 'A Sharpe of 1.2 means for every unit of risk, you get 1.2 units of extra return.',
    es: 'Un Sharpe de 1.2 significa que por cada unidad de riesgo, obtienes 1.2 unidades de rendimiento extra.',
    fr: 'Un Sharpe de 1.2 signifie que pour chaque unité de risque, vous obtenez 1.2 unités de rendement supplémentaire.',
    de: 'Ein Sharpe von 1.2 bedeutet, dass Sie für jede Risikoeinheit 1.2 Einheiten zusätzliche Rendite erhalten.',
    pt: 'Um Sharpe de 1.2 significa que para cada unidade de risco, você obtém 1.2 unidades de retorno extra.'
  },
  swipeToSeeMore: {
    it: 'Scorri per vedere tutti i dati',
    en: 'Swipe to see all data',
    es: 'Desliza para ver todos los datos',
    fr: 'Glissez pour voir toutes les données',
    de: 'Wischen Sie, um alle Daten zu sehen',
    pt: 'Deslize para ver todos os dados'
  },
  current: {
    it: 'Attuale',
    en: 'Current',
    es: 'Actual',
    fr: 'Actuel',
    de: 'Aktuell',
    pt: 'Atual'
  },
  target: {
    it: 'Target',
    en: 'Target',
    es: 'Objetivo',
    fr: 'Cible',
    de: 'Ziel',
    pt: 'Alvo'
  }
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