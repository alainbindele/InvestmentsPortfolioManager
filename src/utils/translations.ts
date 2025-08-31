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
  editAsset: string;
  updateAsset: string;
  fillRequiredFields: string;
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
  very_low: string;
  very_high: string;
  
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
  
  // Disclaimer
  disclaimerTitle: string;
  disclaimerSubtitle: string;
  disclaimerAcceptance: string;
  continue: string;
  
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
  
  // Allocation Editor
  cloneAndEdit: string;
  editAllocation: string;
  adjustAllocations: string;
  totalAllocation: string;
  allocationTooHigh: string;
  allocationTooLow: string;
  saveAllocation: string;
  liveProjection: string;
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
    editAsset: "Edit Asset",
    updateAsset: "Update Asset",
    fillRequiredFields: "Fill all required fields",
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
    very_low: "Very Low",
    very_high: "Very High",
    
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
    close: "Close",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimize your investments with AI",
    
    // Disclaimer
    disclaimerTitle: "Important Disclaimer",
    disclaimerSubtitle: "Please read carefully before proceeding",
    disclaimerAcceptance: "I have read and accept the Disclaimer",
    continue: "Continue",
    
    portfolioMetrics: "Portfolio Metrics",
    currentAllocation: "Current Allocation",
    portfolioGrowthProjection: "Portfolio Growth Projection",
    portfolioGrowthDescription: "Projected growth of your portfolio over time based on current assets",
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
    generatingStrategy: "Generating...",
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
    pacDescription: "Enable this option if you are investing with recurring payments",
    apiStatus: "OpenAI API Status",
    connected: "Connected",
    notTested: "Not Tested",
    apiKeyConfigured: "API Key configured",
    apiKeyNotConfigured: "API Key not configured - using fallback",
    apiError: "API Error",
    fallbackMessage: "The application will continue to work with fallback analysis.",
    aiPortfolioAnalysis: "AI Portfolio Analysis",
    aiStrategyGeneration: "AI Strategy Generation",
    aiActive: "AI Active",
    conservativeDesc: "Low risk, stable returns",
    balancedDesc: "Balanced risk and growth",
    aggressiveDesc: "High risk, maximum returns",
    generateRealAiStrategy: "Generate Real AI Strategy",
    note: "Note",
    aiConfigNote: "To use real AI, configure your OpenAI API key in the .env file",
    fallbackStrategyNote: "Without API key, fallback strategies based on predefined rules will be generated.",
    
    // Asset projection
    selectAssetToAnalyze: "Select Asset to Analyze",
    entirePortfolio: "Entire Portfolio",
    assetDetails: "Asset Details",
    other: "Other",
    
    // Allocation Editor
    cloneAndEdit: "Clone & Edit",
    editAllocation: "Edit Allocation",
    adjustAllocations: "Adjust Allocations",
    totalAllocation: "Total Allocation",
    allocationTooHigh: "Total allocation exceeds 100%. Reduce some allocations.",
    allocationTooLow: "Total allocation is less than 100%. Increase allocations to reach 100%.",
    saveAllocation: "Save Allocation",
    liveProjection: "Live Projection Preview"
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
    editAsset: "Modifica Asset",
    updateAsset: "Aggiorna Asset",
    fillRequiredFields: "Compila tutti i campi obbligatori",
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
    very_low: "Molto Basso",
    very_high: "Molto Alto",
    
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
    close: "Chiudi",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Ottimizza i tuoi investimenti con l'AI",
    
    // Disclaimer
    disclaimerTitle: "Disclaimer Importante",
    disclaimerSubtitle: "Leggi attentamente prima di procedere",
    disclaimerAcceptance: "Ho letto e accetto il Disclaimer",
    continue: "Continua",
    
    portfolioMetrics: "Metriche Portfolio",
    currentAllocation: "Allocazione Attuale",
    portfolioGrowthProjection: "Proiezione Crescita Portfolio",
    portfolioGrowthDescription: "Crescita prevista del tuo portafoglio nel tempo basata sugli asset attuali",
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
    generatingStrategy: "Generando...",
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
    pacDescription: "Attiva questa opzione se stai investendo con versamenti ricorrenti",
    apiStatus: "Stato API OpenAI",
    connected: "Connessa",
    notTested: "Non testata",
    apiKeyConfigured: "API Key configurata",
    apiKeyNotConfigured: "API Key non configurata - usando fallback",
    apiError: "Errore API",
    fallbackMessage: "L'applicazione continuerà a funzionare con analisi di fallback.",
    aiPortfolioAnalysis: "Analisi Portafoglio AI",
    aiStrategyGeneration: "Generazione Strategia AI",
    aiActive: "AI Attiva",
    conservativeDesc: "Basso rischio, rendimenti stabili",
    balancedDesc: "Rischio e crescita bilanciati",
    aggressiveDesc: "Alto rischio, rendimenti massimi",
    generateRealAiStrategy: "Genera Strategia AI Reale",
    note: "Nota",
    aiConfigNote: "Per utilizzare l'AI reale, configura la tua API key OpenAI nel file .env",
    fallbackStrategyNote: "Senza API key, verranno generate strategie di fallback basate su regole predefinite.",
    
    // Asset projection
    selectAssetToAnalyze: "Seleziona Asset da Analizzare",
    entirePortfolio: "Intero Portfolio",
    assetDetails: "Dettagli Asset",
    other: "Altro",
    
    // Allocation Editor
    cloneAndEdit: "Clona e Modifica",
    editAllocation: "Modifica Allocazione",
    adjustAllocations: "Regola Allocazioni",
    totalAllocation: "Allocazione Totale",
    allocationTooHigh: "L'allocazione totale supera il 100%. Riduci alcune allocazioni.",
    allocationTooLow: "L'allocazione totale è inferiore al 100%. Aumenta le allocazioni per raggiungere il 100%.",
    saveAllocation: "Salva Allocazione",
    liveProjection: "Anteprima Proiezione Live",
  
    // Reset functionality
    reset: "Ripristina",
    resetData: "Ripristina tutti i dati",
    confirmReset: "Conferma Ripristino",
    resetWarning: "Questa azione eliminerà permanentemente tutti i tuoi dati",
    dataToDelete: "Dati da eliminare",
    assets: "asset",
    aiStrategies: "strategie IA",
    languageAndCurrency: "Lingua e Valuta",
    resetConfirm: "Elimina Tutto",
    portfolioAssets: "Asset del Portfolio"
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
    editAsset: "Editar Activo",
    updateAsset: "Actualizar Activo",
    fillRequiredFields: "Completa todos los campos obligatorios",
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
    very_low: "Muy Bajo",
    very_high: "Muy Alto",
    
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
    close: "Cerrar",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimiza tus inversiones con IA",
    
    // Disclaimer
    disclaimerTitle: "Descargo de Responsabilidad Importante",
    disclaimerSubtitle: "Por favor lee cuidadosamente antes de continuar",
    disclaimerAcceptance: "He leído y acepto el Descargo de Responsabilidad",
    continue: "Continuar",
    
    portfolioMetrics: "Métricas del Portfolio",
    currentAllocation: "Asignación Actual",
    portfolioGrowthProjection: "Proyección de Crecimiento del Portfolio",
    portfolioGrowthDescription: "Crecimiento proyectado de tu portfolio a lo largo del tiempo basado en los activos actuales",
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
    generatingStrategy: "Generando...",
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
    pacDescription: "Habilita esta opción si estás invirtiendo con pagos recurrentes",
    apiStatus: "Estado API OpenAI",
    connected: "Conectada",
    notTested: "No probada",
    apiKeyConfigured: "API Key configurada",
    apiKeyNotConfigured: "API Key no configurada - usando respaldo",
    apiError: "Error de API",
    fallbackMessage: "La aplicación continuará funcionando con análisis de respaldo.",
    aiPortfolioAnalysis: "Análisis de Portfolio IA",
    aiStrategyGeneration: "Generación de Estrategia IA",
    aiActive: "IA Activa",
    conservativeDesc: "Bajo riesgo, rendimientos estables",
    balancedDesc: "Riesgo y crecimiento equilibrados",
    aggressiveDesc: "Alto riesgo, rendimientos máximos",
    generateRealAiStrategy: "Generar Estrategia IA Real",
    note: "Nota",
    aiConfigNote: "Para usar IA real, configura tu API key de OpenAI en el archivo .env",
    fallbackStrategyNote: "Sin API key, se generarán estrategias de respaldo basadas en reglas predefinidas.",
    
    // Asset projection
    selectAssetToAnalyze: "Seleccionar Activo para Analizar",
    entirePortfolio: "Portfolio Completo",
    assetDetails: "Detalles del Activo",
    other: "Otro",
    
    // Allocation Editor
    cloneAndEdit: "Clonar y Editar",
    editAllocation: "Editar Asignación",
    adjustAllocations: "Ajustar Asignaciones",
    totalAllocation: "Asignación Total",
    allocationTooHigh: "La asignación total supera el 100%. Reduce algunas asignaciones.",
    allocationTooLow: "La asignación total es menor al 100%. Aumenta las asignaciones para llegar al 100%.",
    saveAllocation: "Guardar Asignación",
    liveProjection: "Vista Previa de Proyección en Vivo",
  
    // Reset functionality
    reset: "Restablecer",
    resetData: "Restablecer todos los datos",
    confirmReset: "Confirmar Restablecimiento",
    resetWarning: "Esta acción eliminará permanentemente todos tus datos",
    dataToDelete: "Datos a eliminar",
    assets: "activos",
    aiStrategies: "estrategias IA",
    languageAndCurrency: "Idioma y Moneda",
    resetConfirm: "Eliminar Todo",
    portfolioAssets: "Activos del Portfolio"
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
    editAsset: "Modifier l'Actif",
    updateAsset: "Mettre à jour l'Actif",
    fillRequiredFields: "Remplir tous les champs obligatoires",
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
    very_low: "Très Faible",
    very_high: "Très Élevé",
    
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
    close: "Fermer",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimisez vos investissements avec l'IA",
    
    // Disclaimer
    disclaimerTitle: "Avertissement Important",
    disclaimerSubtitle: "Veuillez lire attentivement avant de continuer",
    disclaimerAcceptance: "J'ai lu et j'accepte l'Avertissement",
    continue: "Continuer",
    
    portfolioMetrics: "Métriques du Portfolio",
    currentAllocation: "Allocation Actuelle",
    portfolioGrowthProjection: "Projection de Croissance du Portfolio",
    portfolioGrowthDescription: "Croissance projetée de votre portefeuille dans le temps basée sur les actifs actuels",
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
    generatingStrategy: "Génération...",
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
    pacDescription: "Activez cette option si vous investissez avec des paiements récurrents",
    apiStatus: "Statut API OpenAI",
    connected: "Connectée",
    notTested: "Non testée",
    apiKeyConfigured: "Clé API configurée",
    apiKeyNotConfigured: "Clé API non configurée - utilisation de secours",
    apiError: "Erreur API",
    fallbackMessage: "L'application continuera à fonctionner avec une analyse de secours.",
    aiPortfolioAnalysis: "Analyse de Portfolio IA",
    aiStrategyGeneration: "Génération de Stratégie IA",
    aiActive: "IA Active",
    conservativeDesc: "Faible risque, rendements stables",
    balancedDesc: "Risque et croissance équilibrés",
    aggressiveDesc: "Risque élevé, rendements maximums",
    generateRealAiStrategy: "Générer une Stratégie IA Réelle",
    note: "Note",
    aiConfigNote: "Pour utiliser l'IA réelle, configurez votre clé API OpenAI dans le fichier .env",
    fallbackStrategyNote: "Sans clé API, des stratégies de secours basées sur des règles prédéfinies seront générées.",
    
    // Asset projection
    selectAssetToAnalyze: "Sélectionner l'Actif à Analyser",
    entirePortfolio: "Portfolio Entier",
    assetDetails: "Détails de l'Actif",
    other: "Autre",
    
    // Allocation Editor
    cloneAndEdit: "Cloner et Modifier",
    editAllocation: "Modifier l'Allocation",
    adjustAllocations: "Ajuster les Allocations",
    totalAllocation: "Allocation Totale",
    allocationTooHigh: "L'allocation totale dépasse 100%. Réduisez certaines allocations.",
    allocationTooLow: "L'allocation totale est inférieure à 100%. Augmentez les allocations pour atteindre 100%.",
    saveAllocation: "Sauvegarder l'Allocation",
    liveProjection: "Aperçu de Projection en Direct",
  
    // Reset functionality
    reset: "Réinitialiser",
    resetData: "Réinitialiser toutes les données",
    confirmReset: "Confirmer la Réinitialisation",
    resetWarning: "Cette action supprimera définitivement toutes vos données",
    dataToDelete: "Données à supprimer",
    assets: "actifs",
    aiStrategies: "stratégies IA",
    languageAndCurrency: "Langue et Devise",
    resetConfirm: "Tout Supprimer",
    portfolioAssets: "Actifs du Portfolio"
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
    editAsset: "Asset bearbeiten",
    updateAsset: "Asset aktualisieren",
    fillRequiredFields: "Alle Pflichtfelder ausfüllen",
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
    very_low: "Sehr Niedrig",
    very_high: "Sehr Hoch",
    
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
    close: "Schließen",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Optimieren Sie Ihre Investitionen mit KI",
    
    // Disclaimer
    disclaimerTitle: "Wichtiger Haftungsausschluss",
    disclaimerSubtitle: "Bitte lesen Sie sorgfältig, bevor Sie fortfahren",
    disclaimerAcceptance: "Ich habe den Haftungsausschluss gelesen und akzeptiert",
    continue: "Fortfahren",
    
    portfolioMetrics: "Portfolio-Metriken",
    currentAllocation: "Aktuelle Allokation",
    portfolioGrowthProjection: "Portfolio-Wachstumsprojektion",
    portfolioGrowthDescription: "Projiziertes Wachstum Ihres Portfolios über die Zeit basierend auf aktuellen Assets",
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
    generatingStrategy: "Generiere...",
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
    pacDescription: "Aktivieren Sie diese Option, wenn Sie mit wiederkehrenden Zahlungen investieren",
    apiStatus: "OpenAI API Status",
    connected: "Verbunden",
    notTested: "Nicht getestet",
    apiKeyConfigured: "API-Schlüssel konfiguriert",
    apiKeyNotConfigured: "API-Schlüssel nicht konfiguriert - Fallback verwenden",
    apiError: "API-Fehler",
    fallbackMessage: "Die Anwendung wird mit Fallback-Analyse weiterarbeiten.",
    aiPortfolioAnalysis: "KI-Portfolio-Analyse",
    aiStrategyGeneration: "KI-Strategiegenerierung",
    aiActive: "KI Aktiv",
    conservativeDesc: "Niedriges Risiko, stabile Renditen",
    balancedDesc: "Ausgewogenes Risiko und Wachstum",
    aggressiveDesc: "Hohes Risiko, maximale Renditen",
    generateRealAiStrategy: "Echte KI-Strategie generieren",
    note: "Hinweis",
    aiConfigNote: "Um echte KI zu verwenden, konfigurieren Sie Ihren OpenAI API-Schlüssel in der .env-Datei",
    fallbackStrategyNote: "Ohne API-Schlüssel werden Fallback-Strategien basierend auf vordefinierten Regeln generiert.",
    
    // Asset projection
    selectAssetToAnalyze: "Asset zur Analyse auswählen",
    entirePortfolio: "Gesamtes Portfolio",
    assetDetails: "Asset-Details",
    other: "Andere",
    
    // Allocation Editor
    cloneAndEdit: "Klonen und Bearbeiten",
    editAllocation: "Allocation Bearbeiten",
    adjustAllocations: "Allocationen Anpassen",
    totalAllocation: "Gesamte Allocation",
    allocationTooHigh: "Die Gesamtallocation übersteigt 100%. Reduzieren Sie einige Allocationen.",
    allocationTooLow: "Die Gesamtallocation ist weniger als 100%. Erhöhen Sie die Allocationen auf 100%.",
    saveAllocation: "Allocation Speichern",
    liveProjection: "Live-Projektionsvorschau",
  
    // Reset functionality
    reset: "Zurücksetzen",
    resetData: "Alle Daten zurücksetzen",
    confirmReset: "Zurücksetzen Bestätigen",
    resetWarning: "Diese Aktion wird alle Ihre Daten dauerhaft löschen",
    dataToDelete: "Zu löschende Daten",
    assets: "Assets",
    aiStrategies: "KI-Strategien",
    languageAndCurrency: "Sprache und Währung",
    resetConfirm: "Alles Löschen",
    portfolioAssets: "Portfolio-Assets"
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
    editAsset: "Editar Ativo",
    updateAsset: "Atualizar Ativo",
    fillRequiredFields: "Preencher todos os campos obrigatórios",
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
    very_low: "Muito Baixo",
    very_high: "Muito Alto",
    
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
    close: "Fechar",
    
    // App specific
    appTitle: "Portfolio Balancer",
    appSubtitle: "Otimize seus investimentos com IA",
    portfolioMetrics: "Métricas do Portfolio",
    currentAllocation: "Alocação Atual",
    portfolioGrowthProjection: "Projeção de Crescimento do Portfolio",
    portfolioGrowthDescription: "Crescimento projetado do seu portfólio ao longo do tempo baseado nos ativos atuais",
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
    generatingStrategy: "Gerando...",
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
    pacDescription: "Ative esta opção se você está investindo com pagamentos recorrentes",
    apiStatus: "Status da API OpenAI",
    connected: "Conectada",
    notTested: "Não testada",
    apiKeyConfigured: "Chave API configurada",
    apiKeyNotConfigured: "Chave API não configurada - usando fallback",
    apiError: "Erro da API",
    fallbackMessage: "A aplicação continuará funcionando com análise de fallback.",
    aiPortfolioAnalysis: "Análise de Portfolio IA",
    aiStrategyGeneration: "Geração de Estratégia IA",
    aiActive: "IA Ativa",
    conservativeDesc: "Baixo risco, retornos estáveis",
    balancedDesc: "Risco e crescimento equilibrados",
    aggressiveDesc: "Alto risco, retornos máximos",
    generateRealAiStrategy: "Gerar Estratégia IA Real",
    note: "Nota",
    aiConfigNote: "Para usar IA real, configure sua chave API OpenAI no arquivo .env",
    fallbackStrategyNote: "Sem chave API, estratégias de fallback baseadas em regras predefinidas serão geradas.",
    
    // Reset functionality
    reset: "Redefinir",
    resetData: "Redefinir todos os dados",
    confirmReset: "Confirmar Redefinição",
    resetWarning: "Esta ação excluirá permanentemente todos os seus dados",
    dataToDelete: "Dados a serem excluídos",
    assets: "ativos",
    aiStrategies: "estratégias IA",
    languageAndCurrency: "Idioma e Moeda",
    resetConfirm: "Excluir Tudo",
    portfolioAssets: "Ativos do Portfolio",
    
    // Asset projection
    selectAssetToAnalyze: "Selecionar Ativo para Analisar",
    entirePortfolio: "Portfolio Completo",
    assetDetails: "Detalhes do Ativo",
    other: "Outro",
    
    // Allocation Editor
    cloneAndEdit: "Clonar e Editar",
    editAllocation: "Editar Alocação",
    adjustAllocations: "Ajustar Alocações",
    totalAllocation: "Alocação Total",
    allocationTooHigh: "A alocação total excede 100%. Reduza algumas alocações.",
    allocationTooLow: "A alocação total é menor que 100%. Aumente as alocações para atingir 100%.",
    saveAllocation: "Salvar Alocação",
    liveProjection: "Visualização de Projeção ao Vivo",
    
    // Disclaimer
    disclaimerTitle: "Aviso Importante",
    disclaimerSubtitle: "Por favor, leia cuidadosamente antes de prosseguir",
    disclaimerAcceptance: "Eu li e aceito o Aviso",
    continue: "Continuar"
  },
  
  zh: {
    // Navigation
    portfolio: "投资组合",
    strategies: "策略",
    analysis: "分析",
    settings: "设置",

    // Portfolio
    totalValue: "总价值",
    expectedReturn: "预期收益",
    riskScore: "风险评分",
    diversification: "多样化",
    addAsset: "添加资产",
    assetName: "资产名称",
    assetType: "资产类型",
    editAsset: "编辑资产",
    updateAsset: "更新资产",
    fillRequiredFields: "填写所有必填字段",
    currentValue: "当前价值",
    expectedReturnLabel: "预期收益 (%)",
    riskLevel: "风险等级",
    save: "保存",
    cancel: "取消",
    edit: "编辑",
    delete: "删除",
    
    // Asset Types
    stocks: "股票",
    bonds: "债券",
    etf: "ETF",
    crypto: "加密货币",
    real_estate: "房地产",
    cash: "现金",
    commodities: "大宗商品",
    
    // Risk Levels
    low: "低",
    medium: "中",
    high: "高",
    very_low: "很低",
    very_high: "很高",
    
    // Strategies
    generateStrategy: "生成策略",
    strategyName: "策略名称",
    description: "描述",
    targetAllocation: "目标配置",
    riskProfile: "风险档案",
    conservative: "保守",
    balanced: "平衡",
    aggressive: "激进",
    
    // Analysis
    recommendations: "建议",
    marketInsights: "市场洞察",
    analyzePortfolio: "分析投资组合",
    
    // PAC
    isPAC: "PAC投资",
    pacAmount: "PAC金额",
    pacFrequency: "PAC频率",
    monthly: "每月",
    quarterly: "每季度",
    biannual: "每半年",
    annual: "每年",
    pacActive: "PAC活跃",
    
    // Common
    loading: "加载中...",
    error: "错误",
    success: "成功",
    confirm: "确认",
    close: "关闭",
    
    // App specific
    appTitle: "投资组合平衡器",
    appSubtitle: "用AI优化您的投资",
    
    // Disclaimer
    disclaimerTitle: "重要免责声明",
    disclaimerSubtitle: "请在继续之前仔细阅读",
    disclaimerAcceptance: "我已阅读并接受免责声明",
    continue: "继续",
    
    portfolioMetrics: "投资组合指标",
    currentAllocation: "当前配置",
    portfolioGrowthProjection: "投资组合增长预测",
    portfolioGrowthDescription: "基于当前资产的投资组合随时间增长预测",
    addAssetButton: "添加资产",
    assetCurrentValue: "当前价值",
    noAssetsMessage: "投资组合中没有资产",
    investmentStrategies: "投资策略",
    strategiesDescription: "比较和分析不同的投资策略",
    currentStrategy: "当前策略",
    aiGeneratedStrategies: "AI生成的策略",
    selectedStrategies: "选定的策略",
    compareStrategies: "比较策略",
    portfolioProjection: "投资组合预测",
    comparisonMetrics: "比较指标",
    detailedComparison: "详细比较",
    strategy: "策略",
    return: "收益",
    risk: "风险",
    sharpe: "夏普",
    volatility: "波动性",
    maxDrawdown: "最大回撤",
    selectedStrategy: "已选择",
    selectedForComparison: "已选择用于比较",
    aiAssistantTitle: "AI助手",
    aiDescription: "获得个性化的投资组合分析和策略建议",
    analyzing: "分析中...",
    aiRecommendations: "AI建议",
    generatingStrategy: "生成中...",
    investmentGoals: "投资目标",
    longTermGrowth: "长期增长",
    passiveIncome: "被动收入",
    capitalPreservation: "资本保值",
    diversificationGoal: "多样化",
    inflationProtection: "通胀保护",
    lowRisk: "低风险",
    mediumRisk: "中等风险",
    highRisk: "高风险",
    bestReturn: "最佳收益",
    lowestRisk: "最低风险",
    bestSharpe: "最佳夏普",
    years: "年",
    pacDescription: "如果您正在进行定期投资，请启用此选项",
    apiStatus: "OpenAI API状态",
    connected: "已连接",
    notTested: "未测试",
    apiKeyConfigured: "API密钥已配置",
    apiKeyNotConfigured: "API密钥未配置 - 使用备用方案",
    apiError: "API错误",
    fallbackMessage: "应用程序将继续使用备用分析。",
    aiPortfolioAnalysis: "AI投资组合分析",
    aiStrategyGeneration: "AI策略生成",
    aiActive: "AI活跃",
    conservativeDesc: "低风险，稳定收益",
    balancedDesc: "平衡风险和增长",
    aggressiveDesc: "高风险，最大收益",
    generateRealAiStrategy: "生成真实AI策略",
    note: "注意",
    aiConfigNote: "要使用真实AI，请在.env文件中配置您的OpenAI API密钥",
    fallbackStrategyNote: "没有API密钥，将生成基于预定义规则的备用策略。",
    
    // Reset functionality
    reset: "重置",
    resetData: "重置所有数据",
    confirmReset: "确认重置",
    resetWarning: "此操作将永久删除您的所有数据",
    dataToDelete: "要删除的数据",
    assets: "资产",
    aiStrategies: "AI策略",
    languageAndCurrency: "语言和货币",
    resetConfirm: "删除全部",
    portfolioAssets: "投资组合资产",
    
    // Asset projection
    selectAssetToAnalyze: "选择要分析的资产",
    entirePortfolio: "整个投资组合",
    assetDetails: "资产详情",
    other: "其他",
    
    // Allocation Editor
    cloneAndEdit: "克隆和编辑",
    editAllocation: "编辑配置",
    adjustAllocations: "调整配置",
    totalAllocation: "总配置",
    allocationTooHigh: "总配置超过100%。请减少一些配置。",
    allocationTooLow: "总配置少于100%。请增加配置以达到100%。",
    saveAllocation: "保存配置",
    liveProjection: "实时投影预览"
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