import { Language } from '../types/language';

export const translations = {
  it: {
    // Header
    appTitle: 'Portfolio Rebalancer',
    appSubtitle: 'Ottimizza i tuoi investimenti con l\'AI',
    totalValue: 'Valore Totale',
    expectedReturn: 'Rendimento Atteso',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategie',
    comparison: 'Confronto',
    aiAssistant: 'AI Assistant',
    
    // Asset Form
    yourAssets: 'I Tuoi Asset',
    addAsset: 'Aggiungi Asset',
    assetName: 'Nome Asset',
    assetType: 'Tipo Asset',
    assetCurrentValue: 'Valore Attuale (€)',
    expectedReturnLabel: 'Rendimento Atteso (% annuo)',
    riskLevel: 'Livello di Rischio',
    addAssetButton: 'Aggiungi Asset',
    cancel: 'Annulla',
    noAssetsMessage: 'Nessun asset aggiunto. Inizia creando il tuo portafoglio!',
    
    // Portfolio Metrics
    portfolioMetrics: 'Metriche Portfolio',
    riskScore: 'Livello Rischio',
    diversification: 'Diversificazione',
    totalAssets: 'Asset Totali',
    currentAllocation: 'Allocazione Attuale',
    totalPortfolioValue: 'Valore Totale Portafoglio',
    
    // Strategies
    investmentStrategies: 'Strategie di Investimento',
    strategiesDescription: 'Confronta diverse strategie per ottimizzare il tuo portafoglio',
    conservativeStrategy: 'Strategia Conservativa',
    balancedStrategy: 'Strategia Bilanciata',
    aggressiveStrategy: 'Strategia Aggressiva',
    selectedStrategy: '✓ Strategia Selezionata',
    
    // Strategy Comparison
    strategyComparison: 'Confronto Strategie',
    comparisonDescription: 'Analizza e confronta le performance delle diverse strategie',
    bestReturn: 'Miglior Rendimento',
    lowestRisk: 'Minor Rischio',
    bestSharpe: 'Miglior Sharpe',
    comparisonMetrics: 'Confronto Metriche Strategie',
    detailedComparison: 'Tabella Comparativa Dettagliata',
    strategy: 'Strategia',
    return: 'Rendimento',
    risk: 'Rischio',
    sharpe: 'Sharpe',
    volatility: 'Volatilità',
    maxDrawdown: 'Max Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'AI Assistant',
    aiDescription: 'Utilizza l\'intelligenza artificiale per ottimizzare il tuo portafoglio',
    chatgptConfig: 'Configurazione ChatGPT',
    apiKey: 'API Key OpenAI (Opzionale)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: 'Inserisci la tua API key per analisi AI reali. Senza API key verranno utilizzate analisi simulate.',
    portfolioAnalysis: 'Analisi Portafoglio AI',
    analyzePortfolio: 'Analizza Portafoglio',
    analyzing: 'Analizzando...',
    aiRecommendations: 'Raccomandazioni AI',
    marketInsights: 'Insights di Mercato',
    strategyGeneration: 'Generazione Strategia AI',
    riskProfile: 'Profilo di Rischio',
    conservative: 'Conservativo',
    balanced: 'Bilanciato',
    aggressive: 'Aggressivo',
    lowRisk: 'Basso rischio',
    mediumRisk: 'Rischio medio',
    highRisk: 'Alto rischio',
    investmentGoals: 'Obiettivi di Investimento',
    generateStrategy: 'Genera Strategia AI',
    generatingStrategy: 'Generando Strategia AI...',
    
    // Projections
    portfolioProjection: 'Proiezione Crescita Portafoglio',
    years: 'anni',
    currentPortfolio: 'Portafoglio Attuale',
    currentValue: 'Valore Attuale',
    projection: 'Proiezione',
    totalGrowth: 'Crescita Totale',
    
    // Asset Types
    stocks: 'Azioni',
    bonds: 'Obbligazioni',
    etf: 'ETF',
    realEstate: 'Immobiliare',
    commodities: 'Materie Prime',
    crypto: 'Criptovalute',
    cash: 'Liquidità',
    other: 'Altro',
    
    // Risk Levels
    low: 'Basso',
    medium: 'Medio',
    high: 'Alto',
    
    // Investment Goals
    longTermGrowth: 'Crescita a Lungo Termine',
    passiveIncome: 'Reddito Passivo',
    capitalPreservation: 'Preservazione del Capitale',
    diversificationGoal: 'Diversificazione',
    inflationProtection: 'Protezione dall\'Inflazione',
    
    // PAC
    pac: 'PAC',
    pacTitle: 'Piano di Accumulo del Capitale',
    pacDescription: 'Simula l\'effetto compound dei versamenti ricorrenti nel tempo',
    createPac: 'Crea PAC',
    pacName: 'Nome PAC',
    monthlyAmount: 'Importo Mensile (€)',
    frequency: 'Frequenza',
    duration: 'Durata (anni)',
    monthly: 'Mensile',
    quarterly: 'Trimestrale',
    biannual: 'Semestrale',
    annual: 'Annuale',
    pacProjection: 'Proiezione PAC',
    totalInvested: 'Totale Investito',
    portfolioValue: 'Valore Portfolio',
    totalGain: 'Guadagno Totale',
    compoundEffect: 'Effetto Compound',
    pacAllocation: 'Allocazione PAC',
    activePacs: 'PAC Attivi',
    noPacsMessage: 'Nessun PAC creato. Inizia a pianificare i tuoi investimenti ricorrenti!',
    pacFrequencyDesc: 'Frequenza dei versamenti automatici',
    pacDurationDesc: 'Durata del piano in anni',
    pacAllocationDesc: 'Come distribuire i versamenti tra gli asset'
  },
  
  en: {
    // Header
    appTitle: 'Portfolio Rebalancer',
    appSubtitle: 'Optimize your investments with AI',
    totalValue: 'Total Value',
    expectedReturn: 'Expected Return',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategies',
    comparison: 'Comparison',
    aiAssistant: 'AI Assistant',
    
    // Asset Form
    yourAssets: 'Your Assets',
    addAsset: 'Add Asset',
    assetName: 'Asset Name',
    assetType: 'Asset Type',
    assetCurrentValue: 'Current Value ($)',
    expectedReturnLabel: 'Expected Return (% annual)',
    riskLevel: 'Risk Level',
    addAssetButton: 'Add Asset',
    cancel: 'Cancel',
    noAssetsMessage: 'No assets added. Start building your portfolio!',
    
    // Portfolio Metrics
    portfolioMetrics: 'Portfolio Metrics',
    riskScore: 'Risk Level',
    diversification: 'Diversification',
    totalAssets: 'Total Assets',
    currentAllocation: 'Current Allocation',
    totalPortfolioValue: 'Total Portfolio Value',
    
    // Strategies
    investmentStrategies: 'Investment Strategies',
    strategiesDescription: 'Compare different strategies to optimize your portfolio',
    conservativeStrategy: 'Conservative Strategy',
    balancedStrategy: 'Balanced Strategy',
    aggressiveStrategy: 'Aggressive Strategy',
    selectedStrategy: '✓ Selected Strategy',
    
    // Strategy Comparison
    strategyComparison: 'Strategy Comparison',
    comparisonDescription: 'Analyze and compare performance of different strategies',
    bestReturn: 'Best Return',
    lowestRisk: 'Lowest Risk',
    bestSharpe: 'Best Sharpe',
    comparisonMetrics: 'Strategy Metrics Comparison',
    detailedComparison: 'Detailed Comparison Table',
    strategy: 'Strategy',
    return: 'Return',
    risk: 'Risk',
    sharpe: 'Sharpe',
    volatility: 'Volatility',
    maxDrawdown: 'Max Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'AI Assistant',
    aiDescription: 'Use artificial intelligence to optimize your portfolio',
    chatgptConfig: 'ChatGPT Configuration',
    apiKey: 'OpenAI API Key (Optional)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: 'Enter your API key for real AI analysis. Without API key, simulated analysis will be used.',
    portfolioAnalysis: 'AI Portfolio Analysis',
    analyzePortfolio: 'Analyze Portfolio',
    analyzing: 'Analyzing...',
    aiRecommendations: 'AI Recommendations',
    marketInsights: 'Market Insights',
    strategyGeneration: 'AI Strategy Generation',
    riskProfile: 'Risk Profile',
    conservative: 'Conservative',
    balanced: 'Balanced',
    aggressive: 'Aggressive',
    lowRisk: 'Low risk',
    mediumRisk: 'Medium risk',
    highRisk: 'High risk',
    investmentGoals: 'Investment Goals',
    generateStrategy: 'Generate AI Strategy',
    generatingStrategy: 'Generating AI Strategy...',
    
    // Projections
    portfolioProjection: 'Portfolio Growth Projection',
    years: 'years',
    currentPortfolio: 'Current Portfolio',
    currentValue: 'Current Value',
    projection: 'Projection',
    totalGrowth: 'Total Growth',
    
    // Asset Types
    stocks: 'Stocks',
    bonds: 'Bonds',
    etf: 'ETF',
    realEstate: 'Real Estate',
    commodities: 'Commodities',
    crypto: 'Cryptocurrency',
    cash: 'Cash',
    other: 'Other',
    
    // Risk Levels
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Investment Goals
    longTermGrowth: 'Long Term Growth',
    passiveIncome: 'Passive Income',
    capitalPreservation: 'Capital Preservation',
    diversificationGoal: 'Diversification',
    inflationProtection: 'Inflation Protection',
    
    // PAC
    pac: 'DCA',
    pacTitle: 'Dollar Cost Averaging Plan',
    pacDescription: 'Simulate the compound effect of recurring investments over time',
    createPac: 'Create DCA',
    pacName: 'DCA Name',
    monthlyAmount: 'Monthly Amount ($)',
    frequency: 'Frequency',
    duration: 'Duration (years)',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    biannual: 'Biannual',
    annual: 'Annual',
    pacProjection: 'DCA Projection',
    totalInvested: 'Total Invested',
    portfolioValue: 'Portfolio Value',
    totalGain: 'Total Gain',
    compoundEffect: 'Compound Effect',
    pacAllocation: 'DCA Allocation',
    activePacs: 'Active DCAs',
    noPacsMessage: 'No DCA plans created. Start planning your recurring investments!',
    pacFrequencyDesc: 'Frequency of automatic contributions',
    pacDurationDesc: 'Plan duration in years',
    pacAllocationDesc: 'How to distribute contributions among assets'
  },
  
  es: {
    // Header
    appTitle: 'Rebalanceador de Cartera',
    appSubtitle: 'Optimiza tus inversiones con IA',
    totalValue: 'Valor Total',
    expectedReturn: 'Rendimiento Esperado',
    
    // Navigation
    portfolio: 'Cartera',
    strategies: 'Estrategias',
    comparison: 'Comparación',
    aiAssistant: 'Asistente IA',
    
    // Asset Form
    yourAssets: 'Tus Activos',
    addAsset: 'Añadir Activo',
    assetName: 'Nombre del Activo',
    assetType: 'Tipo de Activo',
    assetCurrentValue: 'Valor Actual (€)',
    expectedReturnLabel: 'Rendimiento Esperado (% anual)',
    riskLevel: 'Nivel de Riesgo',
    addAssetButton: 'Añadir Activo',
    cancel: 'Cancelar',
    noAssetsMessage: '¡No hay activos añadidos. Comienza creando tu cartera!',
    
    // Portfolio Metrics
    portfolioMetrics: 'Métricas de Cartera',
    riskScore: 'Nivel de Riesgo',
    diversification: 'Diversificación',
    totalAssets: 'Activos Totales',
    currentAllocation: 'Asignación Actual',
    totalPortfolioValue: 'Valor Total de la Cartera',
    
    // Strategies
    investmentStrategies: 'Estrategias de Inversión',
    strategiesDescription: 'Compara diferentes estrategias para optimizar tu cartera',
    conservativeStrategy: 'Estrategia Conservadora',
    balancedStrategy: 'Estrategia Equilibrada',
    aggressiveStrategy: 'Estrategia Agresiva',
    selectedStrategy: '✓ Estrategia Seleccionada',
    
    // Strategy Comparison
    strategyComparison: 'Comparación de Estrategias',
    comparisonDescription: 'Analiza y compara el rendimiento de diferentes estrategias',
    bestReturn: 'Mejor Rendimiento',
    lowestRisk: 'Menor Riesgo',
    bestSharpe: 'Mejor Sharpe',
    comparisonMetrics: 'Comparación de Métricas de Estrategias',
    detailedComparison: 'Tabla de Comparación Detallada',
    strategy: 'Estrategia',
    return: 'Rendimiento',
    risk: 'Riesgo',
    sharpe: 'Sharpe',
    volatility: 'Volatilidad',
    maxDrawdown: 'Pérdida Máxima',
    
    // AI Assistant
    aiAssistantTitle: 'Asistente IA',
    aiDescription: 'Utiliza inteligencia artificial para optimizar tu cartera',
    chatgptConfig: 'Configuración ChatGPT',
    apiKey: 'Clave API OpenAI (Opcional)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: 'Introduce tu clave API para análisis IA reales. Sin clave API se utilizarán análisis simulados.',
    portfolioAnalysis: 'Análisis de Cartera IA',
    analyzePortfolio: 'Analizar Cartera',
    analyzing: 'Analizando...',
    aiRecommendations: 'Recomendaciones IA',
    marketInsights: 'Perspectivas del Mercado',
    strategyGeneration: 'Generación de Estrategia IA',
    riskProfile: 'Perfil de Riesgo',
    conservative: 'Conservador',
    balanced: 'Equilibrado',
    aggressive: 'Agresivo',
    lowRisk: 'Riesgo bajo',
    mediumRisk: 'Riesgo medio',
    highRisk: 'Riesgo alto',
    investmentGoals: 'Objetivos de Inversión',
    generateStrategy: 'Generar Estrategia IA',
    generatingStrategy: 'Generando Estrategia IA...',
    
    // Projections
    portfolioProjection: 'Proyección de Crecimiento de Cartera',
    years: 'años',
    currentPortfolio: 'Cartera Actual',
    currentValue: 'Valor Actual',
    projection: 'Proyección',
    totalGrowth: 'Crecimiento Total',
    
    // Asset Types
    stocks: 'Acciones',
    bonds: 'Bonos',
    etf: 'ETF',
    realEstate: 'Inmobiliario',
    commodities: 'Materias Primas',
    crypto: 'Criptomonedas',
    cash: 'Efectivo',
    other: 'Otro',
    
    // Risk Levels
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    
    // Investment Goals
    longTermGrowth: 'Crecimiento a Largo Plazo',
    passiveIncome: 'Ingresos Pasivos',
    capitalPreservation: 'Preservación del Capital',
    diversificationGoal: 'Diversificación',
    inflationProtection: 'Protección contra Inflación',
    
    // PAC
    pac: 'PAC',
    pacTitle: 'Plan de Acumulación de Capital',
    pacDescription: 'Simula el efecto compuesto de las inversiones recurrentes en el tiempo',
    createPac: 'Crear PAC',
    pacName: 'Nombre PAC',
    monthlyAmount: 'Cantidad Mensual (€)',
    frequency: 'Frecuencia',
    duration: 'Duración (años)',
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    biannual: 'Semestral',
    annual: 'Anual',
    pacProjection: 'Proyección PAC',
    totalInvested: 'Total Invertido',
    portfolioValue: 'Valor del Portfolio',
    totalGain: 'Ganancia Total',
    compoundEffect: 'Efecto Compuesto',
    pacAllocation: 'Asignación PAC',
    activePacs: 'PACs Activos',
    noPacsMessage: '¡No hay PACs creados. Comienza a planificar tus inversiones recurrentes!',
    pacFrequencyDesc: 'Frecuencia de las contribuciones automáticas',
    pacDurationDesc: 'Duración del plan en años',
    pacAllocationDesc: 'Cómo distribuir las contribuciones entre los activos'
  },
  
  fr: {
    // Header
    appTitle: 'Rééquilibreur de Portefeuille',
    appSubtitle: 'Optimisez vos investissements avec l\'IA',
    totalValue: 'Valeur Totale',
    expectedReturn: 'Rendement Attendu',
    
    // Navigation
    portfolio: 'Portefeuille',
    strategies: 'Stratégies',
    comparison: 'Comparaison',
    aiAssistant: 'Assistant IA',
    
    // Asset Form
    yourAssets: 'Vos Actifs',
    addAsset: 'Ajouter un Actif',
    assetName: 'Nom de l\'Actif',
    assetType: 'Type d\'Actif',
    assetCurrentValue: 'Valeur Actuelle (€)',
    expectedReturnLabel: 'Rendement Attendu (% annuel)',
    riskLevel: 'Niveau de Risque',
    addAssetButton: 'Ajouter un Actif',
    cancel: 'Annuler',
    noAssetsMessage: 'Aucun actif ajouté. Commencez à créer votre portefeuille !',
    
    // Portfolio Metrics
    portfolioMetrics: 'Métriques du Portefeuille',
    riskScore: 'Niveau de Risque',
    diversification: 'Diversification',
    totalAssets: 'Actifs Totaux',
    currentAllocation: 'Allocation Actuelle',
    totalPortfolioValue: 'Valeur Totale du Portefeuille',
    
    // Strategies
    investmentStrategies: 'Stratégies d\'Investissement',
    strategiesDescription: 'Comparez différentes stratégies pour optimiser votre portefeuille',
    conservativeStrategy: 'Stratégie Conservatrice',
    balancedStrategy: 'Stratégie Équilibrée',
    aggressiveStrategy: 'Stratégie Agressive',
    selectedStrategy: '✓ Stratégie Sélectionnée',
    
    // Strategy Comparison
    strategyComparison: 'Comparaison des Stratégies',
    comparisonDescription: 'Analysez et comparez les performances de différentes stratégies',
    bestReturn: 'Meilleur Rendement',
    lowestRisk: 'Risque le Plus Faible',
    bestSharpe: 'Meilleur Sharpe',
    comparisonMetrics: 'Comparaison des Métriques de Stratégies',
    detailedComparison: 'Tableau de Comparaison Détaillé',
    strategy: 'Stratégie',
    return: 'Rendement',
    risk: 'Risque',
    sharpe: 'Sharpe',
    volatility: 'Volatilité',
    maxDrawdown: 'Perte Maximale',
    
    // AI Assistant
    aiAssistantTitle: 'Assistant IA',
    aiDescription: 'Utilisez l\'intelligence artificielle pour optimiser votre portefeuille',
    chatgptConfig: 'Configuration ChatGPT',
    apiKey: 'Clé API OpenAI (Optionnel)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: 'Entrez votre clé API pour des analyses IA réelles. Sans clé API, des analyses simulées seront utilisées.',
    portfolioAnalysis: 'Analyse de Portefeuille IA',
    analyzePortfolio: 'Analyser le Portefeuille',
    analyzing: 'Analyse en cours...',
    aiRecommendations: 'Recommandations IA',
    marketInsights: 'Perspectives du Marché',
    strategyGeneration: 'Génération de Stratégie IA',
    riskProfile: 'Profil de Risque',
    conservative: 'Conservateur',
    balanced: 'Équilibré',
    aggressive: 'Agressif',
    lowRisk: 'Risque faible',
    mediumRisk: 'Risque moyen',
    highRisk: 'Risque élevé',
    investmentGoals: 'Objectifs d\'Investissement',
    generateStrategy: 'Générer une Stratégie IA',
    generatingStrategy: 'Génération de Stratégie IA...',
    
    // Projections
    portfolioProjection: 'Projection de Croissance du Portefeuille',
    years: 'ans',
    currentPortfolio: 'Portefeuille Actuel',
    currentValue: 'Valeur Actuelle',
    projection: 'Projection',
    totalGrowth: 'Croissance Totale',
    
    // Asset Types
    stocks: 'Actions',
    bonds: 'Obligations',
    etf: 'ETF',
    realEstate: 'Immobilier',
    commodities: 'Matières Premières',
    crypto: 'Cryptomonnaies',
    cash: 'Liquidités',
    other: 'Autre',
    
    // Risk Levels
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    
    // Investment Goals
    longTermGrowth: 'Croissance à Long Terme',
    passiveIncome: 'Revenus Passifs',
    capitalPreservation: 'Préservation du Capital',
    diversificationGoal: 'Diversification',
    inflationProtection: 'Protection contre l\'Inflation',
    
    // PAC
    pac: 'PAC',
    pacTitle: 'Plan d\'Accumulation de Capital',
    pacDescription: 'Simulez l\'effet composé des investissements récurrents dans le temps',
    createPac: 'Créer PAC',
    pacName: 'Nom PAC',
    monthlyAmount: 'Montant Mensuel (€)',
    frequency: 'Fréquence',
    duration: 'Durée (années)',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    biannual: 'Semestriel',
    annual: 'Annuel',
    pacProjection: 'Projection PAC',
    totalInvested: 'Total Investi',
    portfolioValue: 'Valeur du Portefeuille',
    totalGain: 'Gain Total',
    compoundEffect: 'Effet Composé',
    pacAllocation: 'Allocation PAC',
    activePacs: 'PACs Actifs',
    noPacsMessage: 'Aucun PAC créé. Commencez à planifier vos investissements récurrents !',
    pacFrequencyDesc: 'Fréquence des contributions automatiques',
    pacDurationDesc: 'Durée du plan en années',
    pacAllocationDesc: 'Comment distribuer les contributions entre les actifs'
  },
  
  de: {
    // Header
    appTitle: 'Portfolio Rebalancer',
    appSubtitle: 'Optimieren Sie Ihre Investitionen mit KI',
    totalValue: 'Gesamtwert',
    expectedReturn: 'Erwartete Rendite',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategien',
    comparison: 'Vergleich',
    aiAssistant: 'KI-Assistent',
    
    // Asset Form
    yourAssets: 'Ihre Vermögenswerte',
    addAsset: 'Vermögenswert hinzufügen',
    assetName: 'Name des Vermögenswerts',
    assetType: 'Art des Vermögenswerts',
    assetCurrentValue: 'Aktueller Wert (€)',
    expectedReturnLabel: 'Erwartete Rendite (% jährlich)',
    riskLevel: 'Risikoniveau',
    addAssetButton: 'Vermögenswert hinzufügen',
    cancel: 'Abbrechen',
    noAssetsMessage: 'Keine Vermögenswerte hinzugefügt. Beginnen Sie mit der Erstellung Ihres Portfolios!',
    
    // Portfolio Metrics
    portfolioMetrics: 'Portfolio-Kennzahlen',
    riskScore: 'Risikoniveau',
    diversification: 'Diversifikation',
    totalAssets: 'Gesamte Vermögenswerte',
    currentAllocation: 'Aktuelle Allokation',
    totalPortfolioValue: 'Gesamter Portfolio-Wert',
    
    // Strategies
    investmentStrategies: 'Anlagestrategien',
    strategiesDescription: 'Vergleichen Sie verschiedene Strategien zur Optimierung Ihres Portfolios',
    conservativeStrategy: 'Konservative Strategie',
    balancedStrategy: 'Ausgewogene Strategie',
    aggressiveStrategy: 'Aggressive Strategie',
    selectedStrategy: '✓ Ausgewählte Strategie',
    
    // Strategy Comparison
    strategyComparison: 'Strategievergleich',
    comparisonDescription: 'Analysieren und vergleichen Sie die Performance verschiedener Strategien',
    bestReturn: 'Beste Rendite',
    lowestRisk: 'Niedrigstes Risiko',
    bestSharpe: 'Beste Sharpe',
    comparisonMetrics: 'Vergleich der Strategie-Kennzahlen',
    detailedComparison: 'Detaillierte Vergleichstabelle',
    strategy: 'Strategie',
    return: 'Rendite',
    risk: 'Risiko',
    sharpe: 'Sharpe',
    volatility: 'Volatilität',
    maxDrawdown: 'Maximaler Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'KI-Assistent',
    aiDescription: 'Nutzen Sie künstliche Intelligenz zur Optimierung Ihres Portfolios',
    chatgptConfig: 'ChatGPT-Konfiguration',
    apiKey: 'OpenAI API-Schlüssel (Optional)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: 'Geben Sie Ihren API-Schlüssel für echte KI-Analysen ein. Ohne API-Schlüssel werden simulierte Analysen verwendet.',
    portfolioAnalysis: 'KI-Portfolio-Analyse',
    analyzePortfolio: 'Portfolio analysieren',
    analyzing: 'Analysiere...',
    aiRecommendations: 'KI-Empfehlungen',
    marketInsights: 'Markteinblicke',
    strategyGeneration: 'KI-Strategiegenerierung',
    riskProfile: 'Risikoprofil',
    conservative: 'Konservativ',
    balanced: 'Ausgewogen',
    aggressive: 'Aggressiv',
    lowRisk: 'Niedriges Risiko',
    mediumRisk: 'Mittleres Risiko',
    highRisk: 'Hohes Risiko',
    investmentGoals: 'Anlageziele',
    generateStrategy: 'KI-Strategie generieren',
    generatingStrategy: 'Generiere KI-Strategie...',
    
    // Projections
    portfolioProjection: 'Portfolio-Wachstumsprognose',
    years: 'Jahre',
    currentPortfolio: 'Aktuelles Portfolio',
    currentValue: 'Aktueller Wert',
    projection: 'Prognose',
    totalGrowth: 'Gesamtwachstum',
    
    // Asset Types
    stocks: 'Aktien',
    bonds: 'Anleihen',
    etf: 'ETF',
    realEstate: 'Immobilien',
    commodities: 'Rohstoffe',
    crypto: 'Kryptowährungen',
    cash: 'Bargeld',
    other: 'Andere',
    
    // Risk Levels
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    
    // Investment Goals
    longTermGrowth: 'Langfristiges Wachstum',
    passiveIncome: 'Passives Einkommen',
    capitalPreservation: 'Kapitalerhaltung',
    diversificationGoal: 'Diversifikation',
    inflationProtection: 'Inflationsschutz',
    
    // PAC
    pac: 'Sparplan',
    pacTitle: 'Kapitalaufbau-Plan',
    pacDescription: 'Simulieren Sie den Zinseszinseffekt wiederkehrender Investitionen über die Zeit',
    createPac: 'Sparplan erstellen',
    pacName: 'Sparplan Name',
    monthlyAmount: 'Monatlicher Betrag (€)',
    frequency: 'Häufigkeit',
    duration: 'Laufzeit (Jahre)',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    biannual: 'Halbjährlich',
    annual: 'Jährlich',
    pacProjection: 'Sparplan Projektion',
    totalInvested: 'Gesamt Investiert',
    portfolioValue: 'Portfolio-Wert',
    totalGain: 'Gesamtgewinn',
    compoundEffect: 'Zinseszinseffekt',
    pacAllocation: 'Sparplan Allokation',
    activePacs: 'Aktive Sparpläne',
    noPacsMessage: 'Keine Sparpläne erstellt. Beginnen Sie mit der Planung Ihrer wiederkehrenden Investitionen!',
    pacFrequencyDesc: 'Häufigkeit der automatischen Beiträge',
    pacDurationDesc: 'Plandauer in Jahren',
    pacAllocationDesc: 'Wie die Beiträge auf die Vermögenswerte verteilt werden'
  },
  
  zh: {
    // Header
    appTitle: '投资组合再平衡器',
    appSubtitle: '用AI优化您的投资',
    totalValue: '总价值',
    expectedReturn: '预期收益',
    
    // Navigation
    portfolio: '投资组合',
    strategies: '策略',
    comparison: '比较',
    aiAssistant: 'AI助手',
    
    // Asset Form
    yourAssets: '您的资产',
    addAsset: '添加资产',
    assetName: '资产名称',
    assetType: '资产类型',
    assetCurrentValue: '当前价值 (¥)',
    expectedReturnLabel: '预期收益 (% 年化)',
    riskLevel: '风险等级',
    addAssetButton: '添加资产',
    cancel: '取消',
    noAssetsMessage: '未添加资产。开始构建您的投资组合！',
    
    // Portfolio Metrics
    portfolioMetrics: '投资组合指标',
    riskScore: '风险等级',
    diversification: '多样化',
    totalAssets: '总资产',
    currentAllocation: '当前配置',
    totalPortfolioValue: '投资组合总价值',
    
    // Strategies
    investmentStrategies: '投资策略',
    strategiesDescription: '比较不同策略以优化您的投资组合',
    conservativeStrategy: '保守策略',
    balancedStrategy: '平衡策略',
    aggressiveStrategy: '激进策略',
    selectedStrategy: '✓ 已选择策略',
    
    // Strategy Comparison
    strategyComparison: '策略比较',
    comparisonDescription: '分析和比较不同策略的表现',
    bestReturn: '最佳收益',
    lowestRisk: '最低风险',
    bestSharpe: '最佳夏普',
    comparisonMetrics: '策略指标比较',
    detailedComparison: '详细比较表',
    strategy: '策略',
    return: '收益',
    risk: '风险',
    sharpe: '夏普',
    volatility: '波动率',
    maxDrawdown: '最大回撤',
    
    // AI Assistant
    aiAssistantTitle: 'AI助手',
    aiDescription: '使用人工智能优化您的投资组合',
    chatgptConfig: 'ChatGPT配置',
    apiKey: 'OpenAI API密钥 (可选)',
    apiKeyPlaceholder: 'sk-...',
    apiKeyDescription: '输入您的API密钥进行真实AI分析。没有API密钥将使用模拟分析。',
    portfolioAnalysis: 'AI投资组合分析',
    analyzePortfolio: '分析投资组合',
    analyzing: '分析中...',
    aiRecommendations: 'AI建议',
    marketInsights: '市场洞察',
    strategyGeneration: 'AI策略生成',
    riskProfile: '风险偏好',
    conservative: '保守型',
    balanced: '平衡型',
    aggressive: '激进型',
    lowRisk: '低风险',
    mediumRisk: '中等风险',
    highRisk: '高风险',
    investmentGoals: '投资目标',
    generateStrategy: '生成AI策略',
    generatingStrategy: '正在生成AI策略...',
    
    // Projections
    portfolioProjection: '投资组合增长预测',
    years: '年',
    currentPortfolio: '当前投资组合',
    currentValue: '当前价值',
    projection: '预测',
    totalGrowth: '总增长',
    
    // Asset Types
    stocks: '股票',
    bonds: '债券',
    etf: 'ETF',
    realEstate: '房地产',
    commodities: '大宗商品',
    crypto: '加密货币',
    cash: '现金',
    other: '其他',
    
    // Risk Levels
    low: '低',
    medium: '中',
    high: '高',
    
    // Investment Goals
    longTermGrowth: '长期增长',
    passiveIncome: '被动收入',
    capitalPreservation: '资本保值',
    diversificationGoal: '多样化',
    inflationProtection: '通胀保护',
    
    // PAC
    pac: '定投计划',
    pacTitle: '资本积累计划',
    pacDescription: '模拟定期投资的复利效应',
    createPac: '创建定投',
    pacName: '定投名称',
    monthlyAmount: '月投金额 (¥)',
    frequency: '频率',
    duration: '期限（年）',
    monthly: '月度',
    quarterly: '季度',
    biannual: '半年',
    annual: '年度',
    pacProjection: '定投预测',
    totalInvested: '总投入',
    portfolioValue: '组合价值',
    totalGain: '总收益',
    compoundEffect: '复利效应',
    pacAllocation: '定投配置',
    activePacs: '活跃定投',
    noPacsMessage: '未创建定投计划。开始规划您的定期投资！',
    pacFrequencyDesc: '自动投资频率',
    pacDurationDesc: '计划期限（年）',
    pacAllocationDesc: '如何在资产间分配投资'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language]?.[key as keyof typeof translations[Language]] || key;
};