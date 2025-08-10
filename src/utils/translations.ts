export interface Translation {
  // Navigation
  portfolio: string;
  strategies: string;
  analysis: string;
  settings: string;

  // Portfolio
  totalValue: string;
  expectedReturn: string;
  riskScore: string;
  diversification: string;
  addAsset: string;
  assetName: string;
  assetType: string;
  currentValue: string;
  expectedReturnLabel: string;
  riskLevel: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  
  // Asset Types
  stocks: string;
  bonds: string;
  etf: string;
  crypto: string;
  real_estate: string;
  cash: string;
  commodities: string;
  
  // Risk Levels
  low: string;
  medium: string;
  high: string;
  
  // Strategies
  generateStrategy: string;
  strategyName: string;
  description: string;
  targetAllocation: string;
  riskProfile: string;
  conservative: string;
  balanced: string;
  aggressive: string;
  
  // Analysis
  recommendations: string;
  marketInsights: string;
  analyzePortfolio: string;
  
  // PAC
  isPAC: string;
  pacAmount: string;
  pacFrequency: string;
  monthly: string;
  quarterly: string;
  biannual: string;
  annual: string;
  pacActive: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  confirm: string;
  close: string;
  
  // App specific
  appTitle: string;
  appSubtitle: string;
  portfolioMetrics: string;
  currentAllocation: string;
  addAssetButton: string;
  assetCurrentValue: string;
  noAssetsMessage: string;
  investmentStrategies: string;
  strategiesDescription: string;
  currentStrategy: string;
  aiGeneratedStrategies: string;
  selectedStrategies: string;
  compareStrategies: string;
  portfolioProjection: string;
  comparisonMetrics: string;
  detailedComparison: string;
  strategy: string;
  return: string;
  risk: string;
  sharpe: string;
  volatility: string;
  maxDrawdown: string;
  selectedStrategy: string;
  aiAssistantTitle: string;
  aiDescription: string;
  analyzing: string;
  aiRecommendations: string;
  marketInsights: string;
  generatingStrategy: string;
  riskProfile: string;
  investmentGoals: string;
  longTermGrowth: string;
  passiveIncome: string;
  capitalPreservation: string;
  diversificationGoal: string;
  inflationProtection: string;
  lowRisk: string;
  mediumRisk: string;
  highRisk: string;
  bestReturn: string;
  lowestRisk: string;
  bestSharpe: string;
  years: string;
  currentValue: string;
  other: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    portfolio: "Portfolio",
    strategies: "Strategies",
    analysis: "Analysis",
    settings: "Settings",

    // Portfolio
    totalValue: "Total Value",
    expectedReturn: "Expected Return",
    riskScore: "Risk Score",
    diversification: "Diversification",
    addAsset: "Add Asset",
    assetName: "Asset Name",
    assetType: "Asset Type",
    currentValue: "Current Value",
    expectedReturnLabel: "Expected Return (%)",
    riskLevel: "Risk Level",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    
    // Asset Types
    stocks: "Stocks",
    bonds: "Bonds",
    etf: "ETF",
    crypto: "Cryptocurrency",
    real_estate: "Real Estate",
    cash: "Cash",
    commodities: "Commodities",
    
    // Risk Levels
    low: "Low",
    medium: "Medium",
    high: "High",
    
    // Strategies
    generateStrategy: "Generate Strategy",
    strategyName: "Strategy Name",
    description: "Description",
    targetAllocation: "Target Allocation",
    riskProfile: "Risk Profile",
    conservative: "Conservative",
    balanced: "Balanced",
    aggressive: "Aggressive",
    
    // Analysis
    recommendations: "Recommendations",
    marketInsights: "Market Insights",
    analyzePortfolio: "Analyze Portfolio",
    
    // PAC
    isPAC: "PAC Investment",
    pacAmount: "PAC Amount",
    pacFrequency: "PAC Frequency",
    monthly: "Monthly",
    quarterly: "Quarterly",
    biannual: "Biannual",
    annual: "Annual",
    pacActive: "PAC Active",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    confirm: "Confirm",
    close: "Close"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimize your investments with AI",
    portfolioMetrics: "Portfolio Metrics",
    currentAllocation: "Current Allocation",
    addAssetButton: "Add Asset",
    assetCurrentValue: "Current Value",
    noAssetsMessage: "No assets in portfolio",
    investmentStrategies: "Investment Strategies",
    strategiesDescription: "Compare and analyze different investment strategies",
    currentStrategy: "Current Strategy",
    aiGeneratedStrategies: "AI Generated Strategies",
    selectedStrategies: "Selected Strategies",
    compareStrategies: "Compare Strategies",
    portfolioProjection: "Portfolio Projection",
    comparisonMetrics: "Comparison Metrics",
    detailedComparison: "Detailed Comparison",
    strategy: "Strategy",
    return: "Return",
    risk: "Risk",
    sharpe: "Sharpe",
    volatility: "Volatility",
    maxDrawdown: "Max Drawdown",
    selectedStrategy: "Selected",
    aiAssistantTitle: "AI Assistant",
    aiDescription: "Get personalized portfolio analysis and strategy recommendations",
    analyzing: "Analyzing...",
    aiRecommendations: "AI Recommendations",
    marketInsights: "Market Insights",
    generatingStrategy: "Generating...",
    riskProfile: "Risk Profile",
    investmentGoals: "Investment Goals",
    longTermGrowth: "Long-term Growth",
    passiveIncome: "Passive Income",
    capitalPreservation: "Capital Preservation",
    diversificationGoal: "Diversification",
    inflationProtection: "Inflation Protection",
    lowRisk: "Low Risk",
    mediumRisk: "Medium Risk",
    highRisk: "High Risk",
    bestReturn: "Best Return",
    lowestRisk: "Lowest Risk",
    bestSharpe: "Best Sharpe",
    years: "years",
    currentValue: "Current Value",
    portfolioAssets: "Portfolio Assets",
    pacDescription: "Enable this option if you are investing with recurring payments"
  },
  
  it: {
    // Navigation
    portfolio: "Portafoglio",
    strategies: "Strategie",
    analysis: "Analisi",
    settings: "Impostazioni",

    // Portfolio
    totalValue: "Valore Totale",
    expectedReturn: "Rendimento Atteso",
    riskScore: "Punteggio Rischio",
    diversification: "Diversificazione",
    addAsset: "Aggiungi Asset",
    assetName: "Nome Asset",
    assetType: "Tipo Asset",
    currentValue: "Valore Attuale",
    expectedReturnLabel: "Rendimento Atteso (%)",
    riskLevel: "Livello Rischio",
    save: "Salva",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    
    // Asset Types
    stocks: "Azioni",
    bonds: "Obbligazioni",
    etf: "ETF",
    crypto: "Criptovalute",
    real_estate: "Immobiliare",
    cash: "Liquidità",
    commodities: "Materie Prime",
    
    // Risk Levels
    low: "Basso",
    medium: "Medio",
    high: "Alto",
    
    // Strategies
    generateStrategy: "Genera Strategia",
    strategyName: "Nome Strategia",
    description: "Descrizione",
    targetAllocation: "Allocazione Target",
    riskProfile: "Profilo Rischio",
    conservative: "Conservativo",
    balanced: "Bilanciato",
    aggressive: "Aggressivo",
    
    // Analysis
    recommendations: "Raccomandazioni",
    marketInsights: "Insights di Mercato",
    analyzePortfolio: "Analizza Portafoglio",
    
    // PAC
    isPAC: "Investimento PAC",
    pacAmount: "Importo PAC",
    pacFrequency: "Frequenza PAC",
    monthly: "Mensile",
    quarterly: "Trimestrale",
    biannual: "Semestrale",
    annual: "Annuale",
    pacActive: "PAC Attivo",
    
    // Common
    loading: "Caricamento...",
    error: "Errore",
    success: "Successo",
    confirm: "Conferma",
    close: "Chiudi"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Ottimizza i tuoi investimenti con l'AI",
    portfolioMetrics: "Metriche Portfolio",
    currentAllocation: "Allocazione Attuale",
    addAssetButton: "Aggiungi Asset",
    assetCurrentValue: "Valore Attuale",
    noAssetsMessage: "Nessun asset nel portfolio",
    investmentStrategies: "Strategie di Investimento",
    strategiesDescription: "Confronta e analizza diverse strategie di investimento",
    currentStrategy: "Strategia Attuale",
    aiGeneratedStrategies: "Strategie AI Generate",
    selectedStrategies: "Strategie Selezionate",
    compareStrategies: "Confronta Strategie",
    portfolioProjection: "Proiezione Portfolio",
    comparisonMetrics: "Metriche di Confronto",
    detailedComparison: "Confronto Dettagliato",
    strategy: "Strategia",
    return: "Rendimento",
    risk: "Rischio",
    sharpe: "Sharpe",
    volatility: "Volatilità",
    maxDrawdown: "Max Drawdown",
    selectedStrategy: "Selezionata",
    aiAssistantTitle: "Assistente AI",
    aiDescription: "Ottieni analisi personalizzate del portfolio e raccomandazioni strategiche",
    analyzing: "Analizzando...",
    aiRecommendations: "Raccomandazioni AI",
    marketInsights: "Insights di Mercato",
    generatingStrategy: "Generando...",
    riskProfile: "Profilo di Rischio",
    investmentGoals: "Obiettivi di Investimento",
    longTermGrowth: "Crescita a Lungo Termine",
    passiveIncome: "Reddito Passivo",
    capitalPreservation: "Preservazione del Capitale",
    diversificationGoal: "Diversificazione",
    inflationProtection: "Protezione dall'Inflazione",
    lowRisk: "Basso Rischio",
    mediumRisk: "Medio Rischio",
    highRisk: "Alto Rischio",
    bestReturn: "Miglior Rendimento",
    lowestRisk: "Minor Rischio",
    bestSharpe: "Miglior Sharpe",
    years: "anni",
    currentValue: "Valore Attuale",
    portfolioAssets: "Asset del Portfolio",
    pacDescription: "Attiva questa opzione se stai investendo con versamenti ricorrenti"
  },
  
  es: {
    // Navigation
    portfolio: "Cartera",
    strategies: "Estrategias",
    analysis: "Análisis",
    settings: "Configuración",

    // Portfolio
    totalValue: "Valor Total",
    expectedReturn: "Rendimiento Esperado",
    riskScore: "Puntuación de Riesgo",
    diversification: "Diversificación",
    addAsset: "Agregar Activo",
    assetName: "Nombre del Activo",
    assetType: "Tipo de Activo",
    currentValue: "Valor Actual",
    expectedReturnLabel: "Rendimiento Esperado (%)",
    riskLevel: "Nivel de Riesgo",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    
    // Asset Types
    stocks: "Acciones",
    bonds: "Bonos",
    etf: "ETF",
    crypto: "Criptomonedas",
    real_estate: "Bienes Raíces",
    cash: "Efectivo",
    commodities: "Materias Primas",
    
    // Risk Levels
    low: "Bajo",
    medium: "Medio",
    high: "Alto",
    
    // Strategies
    generateStrategy: "Generar Estrategia",
    strategyName: "Nombre de Estrategia",
    description: "Descripción",
    targetAllocation: "Asignación Objetivo",
    riskProfile: "Perfil de Riesgo",
    conservative: "Conservador",
    balanced: "Equilibrado",
    aggressive: "Agresivo",
    
    // Analysis
    recommendations: "Recomendaciones",
    marketInsights: "Perspectivas del Mercado",
    analyzePortfolio: "Analizar Cartera",
    
    // PAC
    isPAC: "Inversión PAC",
    pacAmount: "Cantidad PAC",
    pacFrequency: "Frecuencia PAC",
    monthly: "Mensual",
    quarterly: "Trimestral",
    biannual: "Semestral",
    annual: "Anual",
    pacActive: "PAC Activo",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    confirm: "Confirmar",
    close: "Cerrar"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimiza tus inversiones con IA",
    portfolioMetrics: "Métricas del Portfolio",
    currentAllocation: "Asignación Actual",
    addAssetButton: "Agregar Activo",
    assetCurrentValue: "Valor Actual",
    noAssetsMessage: "No hay activos en el portfolio",
    investmentStrategies: "Estrategias de Inversión",
    strategiesDescription: "Compara y analiza diferentes estrategias de inversión",
    currentStrategy: "Estrategia Actual",
    aiGeneratedStrategies: "Estrategias Generadas por IA",
    selectedStrategies: "Estrategias Seleccionadas",
    compareStrategies: "Comparar Estrategias",
    portfolioProjection: "Proyección del Portfolio",
    comparisonMetrics: "Métricas de Comparación",
    detailedComparison: "Comparación Detallada",
    strategy: "Estrategia",
    return: "Rendimiento",
    risk: "Riesgo",
    sharpe: "Sharpe",
    volatility: "Volatilidad",
    maxDrawdown: "Máxima Pérdida",
    selectedStrategy: "Seleccionada",
    aiAssistantTitle: "Asistente IA",
    aiDescription: "Obtén análisis personalizados del portfolio y recomendaciones estratégicas",
    analyzing: "Analizando...",
    aiRecommendations: "Recomendaciones IA",
    marketInsights: "Perspectivas del Mercado",
    generatingStrategy: "Generando...",
    riskProfile: "Perfil de Riesgo",
    investmentGoals: "Objetivos de Inversión",
    longTermGrowth: "Crecimiento a Largo Plazo",
    passiveIncome: "Ingresos Pasivos",
    capitalPreservation: "Preservación del Capital",
    diversificationGoal: "Diversificación",
    inflationProtection: "Protección contra Inflación",
    lowRisk: "Bajo Riesgo",
    mediumRisk: "Riesgo Medio",
    highRisk: "Alto Riesgo",
    bestReturn: "Mejor Rendimiento",
    lowestRisk: "Menor Riesgo",
    bestSharpe: "Mejor Sharpe",
    years: "años",
    currentValue: "Valor Actual",
    portfolioAssets: "Activos del Portfolio",
    pacDescription: "Habilita esta opción si estás invirtiendo con pagos recurrentes"
  },
  
  fr: {
    // Navigation
    portfolio: "Portefeuille",
    strategies: "Stratégies",
    analysis: "Analyse",
    settings: "Paramètres",

    // Portfolio
    totalValue: "Valeur Totale",
    expectedReturn: "Rendement Attendu",
    riskScore: "Score de Risque",
    diversification: "Diversification",
    addAsset: "Ajouter un Actif",
    assetName: "Nom de l'Actif",
    assetType: "Type d'Actif",
    currentValue: "Valeur Actuelle",
    expectedReturnLabel: "Rendement Attendu (%)",
    riskLevel: "Niveau de Risque",
    save: "Sauvegarder",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    
    // Asset Types
    stocks: "Actions",
    bonds: "Obligations",
    etf: "ETF",
    crypto: "Cryptomonnaies",
    real_estate: "Immobilier",
    cash: "Liquidités",
    commodities: "Matières Premières",
    
    // Risk Levels
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    
    // Strategies
    generateStrategy: "Générer une Stratégie",
    strategyName: "Nom de la Stratégie",
    description: "Description",
    targetAllocation: "Allocation Cible",
    riskProfile: "Profil de Risque",
    conservative: "Conservateur",
    balanced: "Équilibré",
    aggressive: "Agressif",
    
    // Analysis
    recommendations: "Recommandations",
    marketInsights: "Perspectives du Marché",
    analyzePortfolio: "Analyser le Portefeuille",
    
    // PAC
    isPAC: "Investissement PAC",
    pacAmount: "Montant PAC",
    pacFrequency: "Fréquence PAC",
    monthly: "Mensuel",
    quarterly: "Trimestriel",
    biannual: "Semestriel",
    annual: "Annuel",
    pacActive: "PAC Actif",
    
    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    confirm: "Confirmer",
    close: "Fermer"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimisez vos investissements avec l'IA",
    portfolioMetrics: "Métriques du Portfolio",
    currentAllocation: "Allocation Actuelle",
    addAssetButton: "Ajouter un Actif",
    assetCurrentValue: "Valeur Actuelle",
    noAssetsMessage: "Aucun actif dans le portfolio",
    investmentStrategies: "Stratégies d'Investissement",
    strategiesDescription: "Comparez et analysez différentes stratégies d'investissement",
    currentStrategy: "Stratégie Actuelle",
    aiGeneratedStrategies: "Stratégies Générées par IA",
    selectedStrategies: "Stratégies Sélectionnées",
    compareStrategies: "Comparer les Stratégies",
    portfolioProjection: "Projection du Portfolio",
    comparisonMetrics: "Métriques de Comparaison",
    detailedComparison: "Comparaison Détaillée",
    strategy: "Stratégie",
    return: "Rendement",
    risk: "Risque",
    sharpe: "Sharpe",
    volatility: "Volatilité",
    maxDrawdown: "Perte Maximale",
    selectedStrategy: "Sélectionnée",
    aiAssistantTitle: "Assistant IA",
    aiDescription: "Obtenez des analyses personnalisées du portfolio et des recommandations stratégiques",
    analyzing: "Analyse en cours...",
    aiRecommendations: "Recommandations IA",
    marketInsights: "Perspectives du Marché",
    generatingStrategy: "Génération...",
    riskProfile: "Profil de Risque",
    investmentGoals: "Objectifs d'Investissement",
    longTermGrowth: "Croissance à Long Terme",
    passiveIncome: "Revenus Passifs",
    capitalPreservation: "Préservation du Capital",
    diversificationGoal: "Diversification",
    inflationProtection: "Protection contre l'Inflation",
    lowRisk: "Faible Risque",
    mediumRisk: "Risque Moyen",
    highRisk: "Risque Élevé",
    bestReturn: "Meilleur Rendement",
    lowestRisk: "Risque le Plus Faible",
    bestSharpe: "Meilleur Sharpe",
    years: "années",
    currentValue: "Valeur Actuelle",
    portfolioAssets: "Actifs du Portfolio",
    pacDescription: "Activez cette option si vous investissez avec des paiements récurrents"
  },
  
  de: {
    // Navigation
    portfolio: "Portfolio",
    strategies: "Strategien",
    analysis: "Analyse",
    settings: "Einstellungen",

    // Portfolio
    totalValue: "Gesamtwert",
    expectedReturn: "Erwartete Rendite",
    riskScore: "Risiko-Score",
    diversification: "Diversifikation",
    addAsset: "Asset hinzufügen",
    assetName: "Asset-Name",
    assetType: "Asset-Typ",
    currentValue: "Aktueller Wert",
    expectedReturnLabel: "Erwartete Rendite (%)",
    riskLevel: "Risikolevel",
    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    delete: "Löschen",
    
    // Asset Types
    stocks: "Aktien",
    bonds: "Anleihen",
    etf: "ETF",
    crypto: "Kryptowährungen",
    real_estate: "Immobilien",
    cash: "Bargeld",
    commodities: "Rohstoffe",
    
    // Risk Levels
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    
    // Strategies
    generateStrategy: "Strategie generieren",
    strategyName: "Strategiename",
    description: "Beschreibung",
    targetAllocation: "Zielallokation",
    riskProfile: "Risikoprofil",
    conservative: "Konservativ",
    balanced: "Ausgewogen",
    aggressive: "Aggressiv",
    
    // Analysis
    recommendations: "Empfehlungen",
    marketInsights: "Markteinblicke",
    analyzePortfolio: "Portfolio analysieren",
    
    // PAC
    isPAC: "PAC-Investition",
    pacAmount: "PAC-Betrag",
    pacFrequency: "PAC-Häufigkeit",
    monthly: "Monatlich",
    quarterly: "Vierteljährlich",
    biannual: "Halbjährlich",
    annual: "Jährlich",
    pacActive: "PAC Aktiv",
    
    // Common
    loading: "Laden...",
    error: "Fehler",
    success: "Erfolg",
    confirm: "Bestätigen",
    close: "Schließen"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimieren Sie Ihre Investitionen mit KI",
    portfolioMetrics: "Portfolio-Metriken",
    currentAllocation: "Aktuelle Allokation",
    addAssetButton: "Asset hinzufügen",
    assetCurrentValue: "Aktueller Wert",
    noAssetsMessage: "Keine Assets im Portfolio",
    investmentStrategies: "Investmentstrategien",
    strategiesDescription: "Vergleichen und analysieren Sie verschiedene Investmentstrategien",
    currentStrategy: "Aktuelle Strategie",
    aiGeneratedStrategies: "KI-generierte Strategien",
    selectedStrategies: "Ausgewählte Strategien",
    compareStrategies: "Strategien vergleichen",
    portfolioProjection: "Portfolio-Projektion",
    comparisonMetrics: "Vergleichsmetriken",
    detailedComparison: "Detaillierter Vergleich",
    strategy: "Strategie",
    return: "Rendite",
    risk: "Risiko",
    sharpe: "Sharpe",
    volatility: "Volatilität",
    maxDrawdown: "Max. Verlust",
    selectedStrategy: "Ausgewählt",
    aiAssistantTitle: "KI-Assistent",
    aiDescription: "Erhalten Sie personalisierte Portfolio-Analysen und strategische Empfehlungen",
    analyzing: "Analysiere...",
    aiRecommendations: "KI-Empfehlungen",
    marketInsights: "Markteinblicke",
    generatingStrategy: "Generiere...",
    riskProfile: "Risikoprofil",
    investmentGoals: "Investitionsziele",
    longTermGrowth: "Langfristiges Wachstum",
    passiveIncome: "Passive Einkommen",
    capitalPreservation: "Kapitalerhaltung",
    diversificationGoal: "Diversifikation",
    inflationProtection: "Inflationsschutz",
    lowRisk: "Niedriges Risiko",
    mediumRisk: "Mittleres Risiko",
    highRisk: "Hohes Risiko",
    bestReturn: "Beste Rendite",
    lowestRisk: "Niedrigstes Risiko",
    bestSharpe: "Bester Sharpe",
    years: "Jahre",
    currentValue: "Aktueller Wert",
    portfolioAssets: "Portfolio-Assets",
    pacDescription: "Aktivieren Sie diese Option, wenn Sie mit wiederkehrenden Zahlungen investieren"
  },
  
  pt: {
    // Navigation
    portfolio: "Portfólio",
    strategies: "Estratégias",
    analysis: "Análise",
    settings: "Configurações",

    // Portfolio
    totalValue: "Valor Total",
    expectedReturn: "Retorno Esperado",
    riskScore: "Pontuação de Risco",
    diversification: "Diversificação",
    addAsset: "Adicionar Ativo",
    assetName: "Nome do Ativo",
    assetType: "Tipo de Ativo",
    currentValue: "Valor Atual",
    expectedReturnLabel: "Retorno Esperado (%)",
    riskLevel: "Nível de Risco",
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    
    // Asset Types
    stocks: "Ações",
    bonds: "Títulos",
    etf: "ETF",
    crypto: "Criptomoedas",
    real_estate: "Imóveis",
    cash: "Dinheiro",
    commodities: "Commodities",
    
    // Risk Levels
    low: "Baixo",
    medium: "Médio",
    high: "Alto",
    
    // Strategies
    generateStrategy: "Gerar Estratégia",
    strategyName: "Nome da Estratégia",
    description: "Descrição",
    targetAllocation: "Alocação Alvo",
    riskProfile: "Perfil de Risco",
    conservative: "Conservador",
    balanced: "Equilibrado",
    aggressive: "Agressivo",
    
    // Analysis
    recommendations: "Recomendações",
    marketInsights: "Insights de Mercado",
    analyzePortfolio: "Analisar Portfólio",
    
    // PAC
    isPAC: "Investimento PAC",
    pacAmount: "Valor PAC",
    pacFrequency: "Frequência PAC",
    monthly: "Mensal",
    quarterly: "Trimestral",
    biannual: "Semestral",
    annual: "Anual",
    pacActive: "PAC Ativo",
    
    // Common
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    confirm: "Confirmar",
    close: "Fechar"
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Otimize seus investimentos com IA",
    portfolioMetrics: "Métricas do Portfolio",
    currentAllocation: "Alocação Atual",
    addAssetButton: "Adicionar Ativo",
    assetCurrentValue: "Valor Atual",
    noAssetsMessage: "Nenhum ativo no portfolio",
    investmentStrategies: "Estratégias de Investimento",
    strategiesDescription: "Compare e analise diferentes estratégias de investimento",
    currentStrategy: "Estratégia Atual",
    aiGeneratedStrategies: "Estratégias Geradas por IA",
    selectedStrategies: "Estratégias Selecionadas",
    compareStrategies: "Comparar Estratégias",
    portfolioProjection: "Projeção do Portfolio",
    comparisonMetrics: "Métricas de Comparação",
    detailedComparison: "Comparação Detalhada",
    strategy: "Estratégia",
    return: "Retorno",
    risk: "Risco",
    sharpe: "Sharpe",
    volatility: "Volatilidade",
    maxDrawdown: "Perda Máxima",
    selectedStrategy: "Selecionada",
    aiAssistantTitle: "Assistente IA",
    aiDescription: "Obtenha análises personalizadas do portfolio e recomendações estratégicas",
    analyzing: "Analisando...",
    aiRecommendations: "Recomendações IA",
    marketInsights: "Insights do Mercado",
    generatingStrategy: "Gerando...",
    riskProfile: "Perfil de Risco",
    investmentGoals: "Objetivos de Investimento",
    longTermGrowth: "Crescimento a Longo Prazo",
    passiveIncome: "Renda Passiva",
    capitalPreservation: "Preservação do Capital",
    diversificationGoal: "Diversificação",
    inflationProtection: "Proteção contra Inflação",
    lowRisk: "Baixo Risco",
    mediumRisk: "Risco Médio",
    highRisk: "Alto Risco",
    bestReturn: "Melhor Retorno",
    lowestRisk: "Menor Risco",
    bestSharpe: "Melhor Sharpe",
    years: "anos",
    currentValue: "Valor Atual",
    portfolioAssets: "Ativos do Portfolio",
    pacDescription: "Ative esta opção se você está investindo com pagamentos recorrentes"
  }
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

export function getTranslation(language: string, key: string): string {
  const translation = translations[language];
  if (!translation) {
    // Fallback to English if language not found
    const fallback = translations['en'];
    return fallback?.[key as keyof Translation] || key;
  }
  
  const value = translation[key as keyof Translation];
  return typeof value === 'string' ? value : key;
}