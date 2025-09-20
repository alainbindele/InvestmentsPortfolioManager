import { Language } from '../types/language';

export const translations = {
  it: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: 'Ottimizza i tuoi investimenti con l\'AI',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategie',
    aiAssistant: 'AI Assistant',
    
    // Common
    add: 'Aggiungi',
    edit: 'Modifica',
    delete: 'Elimina',
    save: 'Salva',
    cancel: 'Annulla',
    continue: 'Continua',
    close: 'Chiudi',
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    warning: 'Attenzione',
    info: 'Informazione',
    
    // Asset Management
    addAsset: 'Aggiungi Asset',
    editAsset: 'Modifica Asset',
    updateAsset: 'Aggiorna Asset',
    addAssetButton: 'Aggiungi Asset',
    assetName: 'Nome Asset',
    assetType: 'Tipo Asset',
    assetCurrentValue: 'Valore Attuale (€)',
    expectedReturnLabel: 'Rendimento Atteso (%)',
    riskLevel: 'Livello di Rischio',
    fillAllRequiredFields: 'Compila tutti i campi obbligatori',
    
    // PAC (Piano di Accumulo del Capitale)
    enablePAC: 'Abilita PAC',
    pacAmount: 'Importo PAC',
    pacFrequency: 'Frequenza PAC',
    monthly: 'Mensile',
    quarterly: 'Trimestrale',
    yearly: 'Annuale',
    pacNote: 'Nota PAC',
    pacDescription: 'Il PAC aggiunge automaticamente l\'importo specificato al valore dell\'asset secondo la frequenza scelta, simulando investimenti ricorrenti nel tempo.',
    enablePAC: 'Habilitar PAC',
    
    // Asset Types
    stocks: 'Azioni',
    bonds: 'Obbligazioni',
    etf: 'ETF',
    crypto: 'Criptovalute',
    real_estate: 'Immobiliare',
    cash: 'Liquidità',
    commodities: 'Materie Prime',
    other: 'Altro',
    
    // Risk Levels
    very_low: 'Molto Basso',
    low: 'Basso',
    medium: 'Medio',
    high: 'Alto',
    very_high: 'Molto Alto',
    
    // Portfolio
    portfolioAssets: 'Asset del Portfolio',
    portfolioMetrics: 'Metriche Portfolio',
    currentAllocation: 'Allocazione Attuale',
    totalValue: 'Valore Totale',
    expectedReturn: 'Rendimento Atteso',
    riskScore: 'Punteggio Rischio',
    diversification: 'Diversificazione',
    currentValue: 'Valore Attuale',
    risk: 'Rischio',
    
    // Strategies
    investmentStrategies: 'Strategie di Investimento',
    strategiesDescription: 'Confronta diverse strategie di allocazione per ottimizzare il tuo portfolio',
    currentStrategy: 'Strategia Attuale',
    currentStrategyName: 'Portfolio Attuale',
    currentStrategyDescription: 'La tua allocazione attuale degli asset',
    aiGeneratedStrategies: 'Strategie Generate dall\'AI',
    targetAllocation: 'Allocazione Target',
    compareStrategies: 'Confronta Strategie',
    strategyComparison: 'Confronto Strategie',
    
    // Strategy Metrics
    rendimento: 'Rendimento',
    rischio: 'Rischio',
    sharpeRatio: 'Sharpe Ratio',
    volatility: 'Volatilità',
    maxDrawdown: 'Max Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'AI Assistant',
    aiDescription: 'Utilizza l\'intelligenza artificiale per analizzare il tuo portfolio e generare strategie ottimali',
    aiPortfolioAnalysis: 'Analisi Portfolio AI',
    analyzePortfolio: 'Analizza Portfolio',
    analyzing: 'Analizzando...',
    aiRecommendations: 'Raccomandazioni AI',
    marketInsights: 'Insights di Mercato',
    
    // Strategy Generation
    aiStrategyGeneration: 'Generazione Strategia AI',
    riskProfile: 'Profilo di Rischio',
    conservative: 'Conservativo',
    balanced: 'Bilanciato',
    aggressive: 'Aggressivo',
    conservativeDesc: 'Basso rischio',
    balancedDesc: 'Rischio medio',
    aggressiveDesc: 'Alto rischio',
    investmentGoals: 'Obiettivi di Investimento',
    generateStrategy: 'Genera Strategia',
    generatingStrategy: 'Generando Strategia...',
    
    // Investment Goals
    longTermGrowth: 'Crescita a Lungo Termine',
    passiveIncome: 'Reddito Passivo',
    capitalPreservation: 'Preservazione del Capitale',
    diversificationGoal: 'Diversificazione',
    inflationProtection: 'Protezione dall\'Inflazione',
    
    // Messages
    noAssetsMessage: 'Nessun asset presente. Aggiungi il tuo primo asset per iniziare.',
    noAssetsToAnalyze: 'Aggiungi almeno un asset per analizzare il portfolio',
    noStrategiesAvailable: 'Nessuna strategia disponibile',
    addAssetsToCompareStrategies: 'Aggiungi asset al tuo portfolio per confrontare le strategie',
    
    // Disclaimer
    disclaimerTitle: 'Avviso Importante',
    disclaimerSubtitle: 'Informazioni sui Rischi degli Investimenti',
    disclaimerAcceptance: 'Ho letto e compreso l\'avviso sui rischi. Accetto di utilizzare questo strumento a mio rischio.',
    
    // Common UI
    home: 'Home',
    reset: 'Reset',
    resetData: 'Resetta Dati',
    
    // Cookie Consent
    cookieConsentTitle: 'Utilizzo dei Cookie',
    cookieConsentMessage: 'Questo sito utilizza cookie tecnici necessari per salvare i tuoi dati di portfolio direttamente sul tuo computer in locale.',
    cookieConsentDetails: 'I dati (asset, strategie, preferenze) vengono salvati solo sul tuo PC e non vengono mai inviati a server esterni. Senza cookie l\'app non può funzionare.',
    acceptCookies: 'Accetta Cookie',
    decline: 'Rifiuta',
    
    // Asset Lock Manager
    assetLockManager: 'Gestione Blocco Asset',
    assetLockDescription: 'Blocca gli asset che non vuoi modificare durante il ribilanciamento AI',
    lockedAssets: 'Asset Bloccati',
    unlockedAssets: 'Asset Sbloccati',
    assetLockControls: 'Controlli Blocco Asset',
    locked: 'Bloccato',
    lockAsset: 'Blocca Asset',
    unlockAsset: 'Sblocca Asset',
    aiRebalanceTitle: 'Ribilanciamento AI Intelligente',
    aiRebalanceDescription: 'L\'AI ottimizzerà solo gli asset non bloccati, mantenendo fissi quelli bloccati.',
    lockedAssetsNote: 'Asset bloccati (non verranno modificati):',
    requestAiRebalance: 'Richiedi Ribilanciamento AI',
    rebalancing: 'Ribilanciando...',
    allAssetsLocked: 'Tutti gli asset sono bloccati',
    unlockSomeAssets: 'Sblocca almeno un asset per permettere il ribilanciamento AI',
    withLockedAssets: 'con Asset Bloccati',
    noUnlockedAssets: 'Nessun asset sbloccato disponibile per il ribilanciamento',
    rebalanceError: 'Errore durante il ribilanciamento. Riprova più tardi.',
    nonBloccati: 'non bloccati',
    asset: 'asset',
    assets: 'asset'
  },
  
  en: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: 'Optimize your investments with AI',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategies',
    aiAssistant: 'AI Assistant',
    
    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    
    // Asset Management
    addAsset: 'Add Asset',
    editAsset: 'Edit Asset',
    updateAsset: 'Update Asset',
    addAssetButton: 'Add Asset',
    assetName: 'Asset Name',
    assetType: 'Asset Type',
    assetCurrentValue: 'Current Value (€)',
    expectedReturnLabel: 'Expected Return (%)',
    riskLevel: 'Risk Level',
    fillAllRequiredFields: 'Fill all required fields',
    
    // PAC (Periodic Investment Plan)
    enablePAC: 'Enable PAC',
    pacAmount: 'PAC Amount',
    pacFrequency: 'PAC Frequency',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    pacNote: 'PAC Note',
    pacDescription: 'PAC automatically adds the specified amount to the asset value according to the chosen frequency, simulating recurring investments over time.',
    enablePAC: 'Enable PAC',
    
    // Asset Types
    stocks: 'Stocks',
    bonds: 'Bonds',
    etf: 'ETF',
    crypto: 'Cryptocurrency',
    real_estate: 'Real Estate',
    cash: 'Cash',
    commodities: 'Commodities',
    other: 'Other',
    
    // Risk Levels
    very_low: 'Very Low',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    very_high: 'Very High',
    
    // Portfolio
    portfolioAssets: 'Portfolio Assets',
    portfolioMetrics: 'Portfolio Metrics',
    currentAllocation: 'Current Allocation',
    totalValue: 'Total Value',
    expectedReturn: 'Expected Return',
    riskScore: 'Risk Score',
    diversification: 'Diversification',
    currentValue: 'Current Value',
    risk: 'Risk',
    
    // Strategies
    investmentStrategies: 'Investment Strategies',
    strategiesDescription: 'Compare different allocation strategies to optimize your portfolio',
    currentStrategy: 'Current Strategy',
    currentStrategyName: 'Current Portfolio',
    currentStrategyDescription: 'Your current asset allocation',
    aiGeneratedStrategies: 'AI Generated Strategies',
    targetAllocation: 'Target Allocation',
    compareStrategies: 'Compare Strategies',
    strategyComparison: 'Strategy Comparison',
    
    // Strategy Metrics
    rendimento: 'Return',
    rischio: 'Risk',
    sharpeRatio: 'Sharpe Ratio',
    volatility: 'Volatility',
    maxDrawdown: 'Max Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'AI Assistant',
    aiDescription: 'Use artificial intelligence to analyze your portfolio and generate optimal strategies',
    aiPortfolioAnalysis: 'AI Portfolio Analysis',
    analyzePortfolio: 'Analyze Portfolio',
    analyzing: 'Analyzing...',
    aiRecommendations: 'AI Recommendations',
    marketInsights: 'Market Insights',
    
    // Strategy Generation
    aiStrategyGeneration: 'AI Strategy Generation',
    riskProfile: 'Risk Profile',
    conservative: 'Conservative',
    balanced: 'Balanced',
    aggressive: 'Aggressive',
    conservativeDesc: 'Low risk',
    balancedDesc: 'Medium risk',
    aggressiveDesc: 'High risk',
    investmentGoals: 'Investment Goals',
    generateStrategy: 'Generate Strategy',
    generatingStrategy: 'Generating Strategy...',
    
    // Investment Goals
    longTermGrowth: 'Long Term Growth',
    passiveIncome: 'Passive Income',
    capitalPreservation: 'Capital Preservation',
    diversificationGoal: 'Diversification',
    inflationProtection: 'Inflation Protection',
    
    // Messages
    noAssetsMessage: 'No assets present. Add your first asset to get started.',
    noAssetsToAnalyze: 'Add at least one asset to analyze the portfolio',
    noStrategiesAvailable: 'No strategies available',
    addAssetsToCompareStrategies: 'Add assets to your portfolio to compare strategies',
    
    // Disclaimer
    disclaimerTitle: 'Important Notice',
    disclaimerSubtitle: 'Investment Risk Information',
    disclaimerAcceptance: 'I have read and understood the risk notice. I accept to use this tool at my own risk.',
    
    // Common UI
    home: 'Home',
    reset: 'Reset',
    resetData: 'Reset Data',
    
    // Cookie Consent
    cookieConsentTitle: 'Cookie Usage',
    cookieConsentMessage: 'This site uses technical cookies necessary to save your portfolio data locally on your computer.',
    cookieConsentDetails: 'Data (assets, strategies, preferences) is saved only on your PC and never sent to external servers. Without cookies the app cannot work.',
    acceptCookies: 'Accept Cookies',
    decline: 'Decline',
    
    // Asset Lock Manager
    assetLockManager: 'Asset Lock Manager',
    assetLockDescription: 'Lock assets you don\'t want to modify during AI rebalancing',
    lockedAssets: 'Locked Assets',
    unlockedAssets: 'Unlocked Assets',
    assetLockControls: 'Asset Lock Controls',
    locked: 'Locked',
    lockAsset: 'Lock Asset',
    unlockAsset: 'Unlock Asset',
    aiRebalanceTitle: 'Smart AI Rebalancing',
    aiRebalanceDescription: 'AI will optimize only unlocked assets, keeping locked ones fixed.',
    lockedAssetsNote: 'Locked assets (will not be modified):',
    requestAiRebalance: 'Request AI Rebalancing',
    rebalancing: 'Rebalancing...',
    allAssetsLocked: 'All assets are locked',
    unlockSomeAssets: 'Unlock at least one asset to allow AI rebalancing',
    withLockedAssets: 'with Locked Assets',
    noUnlockedAssets: 'No unlocked assets available for rebalancing',
    rebalanceError: 'Error during rebalancing. Please try again later.',
    nonBloccati: 'unlocked',
    asset: 'asset',
    assets: 'assets'
  },
  
  es: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: 'Optimiza tus inversiones con IA',
    
    // Navigation
    portfolio: 'Portafolio',
    strategies: 'Estrategias',
    aiAssistant: 'Asistente IA',
    
    // Common
    add: 'Añadir',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    close: 'Cerrar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información',
    
    // Asset Management
    addAsset: 'Añadir Activo',
    editAsset: 'Editar Activo',
    updateAsset: 'Actualizar Activo',
    addAssetButton: 'Añadir Activo',
    assetName: 'Nombre del Activo',
    assetType: 'Tipo de Activo',
    assetCurrentValue: 'Valor Actual (€)',
    expectedReturnLabel: 'Rendimiento Esperado (%)',
    riskLevel: 'Nivel de Riesgo',
    fillAllRequiredFields: 'Completa todos los campos obligatorios',
    
    // Asset Types
    stocks: 'Acciones',
    bonds: 'Bonos',
    etf: 'ETF',
    crypto: 'Criptomonedas',
    real_estate: 'Inmobiliario',
    cash: 'Efectivo',
    commodities: 'Materias Primas',
    other: 'Otro',
    
    // Risk Levels
    very_low: 'Muy Bajo',
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    very_high: 'Muy Alto',
    
    // Portfolio
    portfolioAssets: 'Activos del Portafolio',
    portfolioMetrics: 'Métricas del Portafolio',
    currentAllocation: 'Asignación Actual',
    totalValue: 'Valor Total',
    expectedReturn: 'Rendimiento Esperado',
    riskScore: 'Puntuación de Riesgo',
    diversification: 'Diversificación',
    currentValue: 'Valor Actual',
    risk: 'Riesgo',
    
    // Strategies
    investmentStrategies: 'Estrategias de Inversión',
    strategiesDescription: 'Compara diferentes estrategias de asignación para optimizar tu portafolio',
    currentStrategy: 'Estrategia Actual',
    currentStrategyName: 'Portafolio Actual',
    currentStrategyDescription: 'Tu asignación actual de activos',
    aiGeneratedStrategies: 'Estrategias Generadas por IA',
    targetAllocation: 'Asignación Objetivo',
    compareStrategies: 'Comparar Estrategias',
    strategyComparison: 'Comparación de Estrategias',
    
    // Strategy Metrics
    rendimiento: 'Rendimiento',
    rischio: 'Riesgo',
    sharpeRatio: 'Ratio de Sharpe',
    volatility: 'Volatilidad',
    maxDrawdown: 'Máxima Caída',
    
    // AI Assistant
    aiAssistantTitle: 'Asistente IA',
    aiDescription: 'Utiliza inteligencia artificial para analizar tu portafolio y generar estrategias óptimas',
    aiPortfolioAnalysis: 'Análisis de Portafolio IA',
    analyzePortfolio: 'Analizar Portafolio',
    analyzing: 'Analizando...',
    aiRecommendations: 'Recomendaciones IA',
    marketInsights: 'Perspectivas del Mercado',
    
    // Strategy Generation
    aiStrategyGeneration: 'Generación de Estrategia IA',
    riskProfile: 'Perfil de Riesgo',
    conservative: 'Conservador',
    balanced: 'Equilibrado',
    aggressive: 'Agresivo',
    conservativeDesc: 'Bajo riesgo',
    balancedDesc: 'Riesgo medio',
    aggressiveDesc: 'Alto riesgo',
    investmentGoals: 'Objetivos de Inversión',
    generateStrategy: 'Generar Estrategia',
    generatingStrategy: 'Generando Estrategia...',
    
    // Investment Goals
    longTermGrowth: 'Crecimiento a Largo Plazo',
    passiveIncome: 'Ingresos Pasivos',
    capitalPreservation: 'Preservación del Capital',
    diversificationGoal: 'Diversificación',
    inflationProtection: 'Protección contra la Inflación',
    
    // Messages
    noAssetsMessage: 'No hay activos presentes. Añade tu primer activo para comenzar.',
    noAssetsToAnalyze: 'Añade al menos un activo para analizar el portafolio',
    noStrategiesAvailable: 'No hay estrategias disponibles',
    addAssetsToCompareStrategies: 'Añade activos a tu portafolio para comparar estrategias',
    
    // Disclaimer
    disclaimerTitle: 'Aviso Importante',
    disclaimerSubtitle: 'Información sobre Riesgos de Inversión',
    disclaimerAcceptance: 'He leído y entendido el aviso de riesgos. Acepto usar esta herramienta bajo mi propio riesgo.',
    
    // Common UI
    home: 'Inicio',
    reset: 'Reiniciar',
    resetData: 'Reiniciar Datos',
    
    // Cookie Consent
    cookieConsentTitle: 'Uso de Cookies',
    cookieConsentMessage: 'Este sitio utiliza cookies técnicas necesarias para guardar tus datos de portafolio localmente en tu computadora.',
    cookieConsentDetails: 'Los datos (activos, estrategias, preferencias) se guardan solo en tu PC y nunca se envían a servidores externos. Sin cookies la app no puede funcionar.',
    acceptCookies: 'Aceptar Cookies',
    decline: 'Rechazar',
    
    // Asset Lock Manager
    assetLockManager: 'Gestor de Bloqueo de Activos',
    assetLockDescription: 'Bloquea los activos que no quieres modificar durante el rebalanceo IA',
    lockedAssets: 'Activos Bloqueados',
    unlockedAssets: 'Activos Desbloqueados',
    assetLockControls: 'Controles de Bloqueo de Activos',
    locked: 'Bloqueado',
    lockAsset: 'Bloquear Activo',
    unlockAsset: 'Desbloquear Activo',
    aiRebalanceTitle: 'Rebalanceo IA Inteligente',
    aiRebalanceDescription: 'La IA optimizará solo los activos desbloqueados, manteniendo fijos los bloqueados.',
    lockedAssetsNote: 'Activos bloqueados (no serán modificados):',
    requestAiRebalance: 'Solicitar Rebalanceo IA',
    rebalancing: 'Rebalanceando...',
    allAssetsLocked: 'Todos los activos están bloqueados',
    unlockSomeAssets: 'Desbloquea al menos un activo para permitir el rebalanceo IA',
    withLockedAssets: 'con Activos Bloqueados',
    noUnlockedAssets: 'No hay activos desbloqueados disponibles para rebalanceo',
    rebalanceError: 'Error durante el rebalanceo. Inténtalo de nuevo más tarde.',
    nonBloccati: 'desbloqueados',
    asset: 'activo',
    assets: 'activos'
  },
  
  fr: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: 'Optimisez vos investissements avec l\'IA',
    
    // Navigation
    portfolio: 'Portefeuille',
    strategies: 'Stratégies',
    aiAssistant: 'Assistant IA',
    
    // Common
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    continue: 'Continuer',
    close: 'Fermer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Information',
    
    // Asset Management
    addAsset: 'Ajouter un Actif',
    editAsset: 'Modifier l\'Actif',
    updateAsset: 'Mettre à jour l\'Actif',
    addAssetButton: 'Ajouter un Actif',
    assetName: 'Nom de l\'Actif',
    assetType: 'Type d\'Actif',
    assetCurrentValue: 'Valeur Actuelle (€)',
    expectedReturnLabel: 'Rendement Attendu (%)',
    riskLevel: 'Niveau de Risque',
    fillAllRequiredFields: 'Remplissez tous les champs obligatoires',
    
    // Asset Types
    stocks: 'Actions',
    bonds: 'Obligations',
    etf: 'ETF',
    crypto: 'Cryptomonnaies',
    real_estate: 'Immobilier',
    cash: 'Liquidités',
    commodities: 'Matières Premières',
    other: 'Autre',
    
    // Risk Levels
    very_low: 'Très Bas',
    low: 'Bas',
    medium: 'Moyen',
    high: 'Élevé',
    very_high: 'Très Élevé',
    
    // Portfolio
    portfolioAssets: 'Actifs du Portefeuille',
    portfolioMetrics: 'Métriques du Portefeuille',
    currentAllocation: 'Allocation Actuelle',
    totalValue: 'Valeur Totale',
    expectedReturn: 'Rendement Attendu',
    riskScore: 'Score de Risque',
    diversification: 'Diversification',
    currentValue: 'Valeur Actuelle',
    risk: 'Risque',
    
    // Strategies
    investmentStrategies: 'Stratégies d\'Investissement',
    strategiesDescription: 'Comparez différentes stratégies d\'allocation pour optimiser votre portefeuille',
    currentStrategy: 'Stratégie Actuelle',
    currentStrategyName: 'Portefeuille Actuel',
    currentStrategyDescription: 'Votre allocation actuelle d\'actifs',
    aiGeneratedStrategies: 'Stratégies Générées par l\'IA',
    targetAllocation: 'Allocation Cible',
    compareStrategies: 'Comparer les Stratégies',
    strategyComparison: 'Comparaison des Stratégies',
    
    // Strategy Metrics
    rendimento: 'Rendement',
    rischio: 'Risque',
    sharpeRatio: 'Ratio de Sharpe',
    volatility: 'Volatilité',
    maxDrawdown: 'Perte Maximale',
    
    // AI Assistant
    aiAssistantTitle: 'Assistant IA',
    aiDescription: 'Utilisez l\'intelligence artificielle pour analyser votre portefeuille et générer des stratégies optimales',
    aiPortfolioAnalysis: 'Analyse de Portefeuille IA',
    analyzePortfolio: 'Analyser le Portefeuille',
    analyzing: 'Analyse en cours...',
    aiRecommendations: 'Recommandations IA',
    marketInsights: 'Perspectives du Marché',
    
    // Strategy Generation
    aiStrategyGeneration: 'Génération de Stratégie IA',
    riskProfile: 'Profil de Risque',
    conservative: 'Conservateur',
    balanced: 'Équilibré',
    aggressive: 'Agressif',
    conservativeDesc: 'Faible risque',
    balancedDesc: 'Risque moyen',
    aggressiveDesc: 'Risque élevé',
    investmentGoals: 'Objectifs d\'Investissement',
    generateStrategy: 'Générer une Stratégie',
    generatingStrategy: 'Génération de la Stratégie...',
    
    // Investment Goals
    longTermGrowth: 'Croissance à Long Terme',
    passiveIncome: 'Revenus Passifs',
    capitalPreservation: 'Préservation du Capital',
    diversificationGoal: 'Diversification',
    inflationProtection: 'Protection contre l\'Inflation',
    
    // Messages
    noAssetsMessage: 'Aucun actif présent. Ajoutez votre premier actif pour commencer.',
    noAssetsToAnalyze: 'Ajoutez au moins un actif pour analyser le portefeuille',
    noStrategiesAvailable: 'Aucune stratégie disponible',
    addAssetsToCompareStrategies: 'Ajoutez des actifs à votre portefeuille pour comparer les stratégies',
    
    // Disclaimer
    disclaimerTitle: 'Avis Important',
    disclaimerSubtitle: 'Informations sur les Risques d\'Investissement',
    disclaimerAcceptance: 'J\'ai lu et compris l\'avis sur les risques. J\'accepte d\'utiliser cet outil à mes propres risques.',
    
    // Common UI
    home: 'Accueil',
    reset: 'Réinitialiser',
    resetData: 'Réinitialiser les Données',
    
    // Cookie Consent
    cookieConsentTitle: 'Utilisation des Cookies',
    cookieConsentMessage: 'Ce site utilise des cookies techniques nécessaires pour sauvegarder vos données de portefeuille localement sur votre ordinateur.',
    cookieConsentDetails: 'Les données (actifs, stratégies, préférences) sont sauvegardées uniquement sur votre PC et ne sont jamais envoyées à des serveurs externes. Sans cookies l\'app ne peut pas fonctionner.',
    acceptCookies: 'Accepter les Cookies',
    decline: 'Refuser',
    
    // Asset Lock Manager
    assetLockManager: 'Gestionnaire de Verrouillage d\'Actifs',
    assetLockDescription: 'Verrouillez les actifs que vous ne voulez pas modifier lors du rééquilibrage IA',
    lockedAssets: 'Actifs Verrouillés',
    unlockedAssets: 'Actifs Déverrouillés',
    assetLockControls: 'Contrôles de Verrouillage d\'Actifs',
    locked: 'Verrouillé',
    lockAsset: 'Verrouiller l\'Actif',
    unlockAsset: 'Déverrouiller l\'Actif',
    aiRebalanceTitle: 'Rééquilibrage IA Intelligent',
    aiRebalanceDescription: 'L\'IA optimisera uniquement les actifs déverrouillés, en gardant les verrouillés fixes.',
    lockedAssetsNote: 'Actifs verrouillés (ne seront pas modifiés):',
    requestAiRebalance: 'Demander un Rééquilibrage IA',
    rebalancing: 'Rééquilibrage...',
    allAssetsLocked: 'Tous les actifs sont verrouillés',
    unlockSomeAssets: 'Déverrouillez au moins un actif pour permettre le rééquilibrage IA',
    withLockedAssets: 'avec Actifs Verrouillés',
    noUnlockedAssets: 'Aucun actif déverrouillé disponible pour le rééquilibrage',
    rebalanceError: 'Erreur lors du rééquilibrage. Veuillez réessayer plus tard.',
    nonBloccati: 'déverrouillés',
    asset: 'actif',
    assets: 'actifs'
  },
  
  de: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: 'Optimieren Sie Ihre Investitionen mit KI',
    
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategien',
    aiAssistant: 'KI-Assistent',
    
    // Common
    add: 'Hinzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    continue: 'Fortfahren',
    close: 'Schließen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    warning: 'Warnung',
    info: 'Information',
    
    // Asset Management
    addAsset: 'Asset hinzufügen',
    editAsset: 'Asset bearbeiten',
    updateAsset: 'Asset aktualisieren',
    addAssetButton: 'Asset hinzufügen',
    assetName: 'Asset-Name',
    assetType: 'Asset-Typ',
    assetCurrentValue: 'Aktueller Wert (€)',
    expectedReturnLabel: 'Erwartete Rendite (%)',
    riskLevel: 'Risikolevel',
    fillAllRequiredFields: 'Füllen Sie alle Pflichtfelder aus',
    
    // Asset Types
    stocks: 'Aktien',
    bonds: 'Anleihen',
    etf: 'ETF',
    crypto: 'Kryptowährungen',
    real_estate: 'Immobilien',
    cash: 'Bargeld',
    commodities: 'Rohstoffe',
    other: 'Andere',
    
    // Risk Levels
    very_low: 'Sehr Niedrig',
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    very_high: 'Sehr Hoch',
    
    // Portfolio
    portfolioAssets: 'Portfolio-Assets',
    portfolioMetrics: 'Portfolio-Metriken',
    currentAllocation: 'Aktuelle Allokation',
    totalValue: 'Gesamtwert',
    expectedReturn: 'Erwartete Rendite',
    riskScore: 'Risiko-Score',
    diversification: 'Diversifikation',
    currentValue: 'Aktueller Wert',
    risk: 'Risiko',
    
    // Strategies
    investmentStrategies: 'Anlagestrategien',
    strategiesDescription: 'Vergleichen Sie verschiedene Allokationsstrategien zur Optimierung Ihres Portfolios',
    currentStrategy: 'Aktuelle Strategie',
    currentStrategyName: 'Aktuelles Portfolio',
    currentStrategyDescription: 'Ihre aktuelle Asset-Allokation',
    aiGeneratedStrategies: 'KI-generierte Strategien',
    targetAllocation: 'Ziel-Allokation',
    compareStrategies: 'Strategien vergleichen',
    strategyComparison: 'Strategienvergleich',
    
    // Strategy Metrics
    rendimento: 'Rendite',
    rischio: 'Risiko',
    sharpeRatio: 'Sharpe-Ratio',
    volatility: 'Volatilität',
    maxDrawdown: 'Max. Drawdown',
    
    // AI Assistant
    aiAssistantTitle: 'KI-Assistent',
    aiDescription: 'Nutzen Sie künstliche Intelligenz zur Analyse Ihres Portfolios und zur Generierung optimaler Strategien',
    aiPortfolioAnalysis: 'KI-Portfolio-Analyse',
    analyzePortfolio: 'Portfolio analysieren',
    analyzing: 'Analysiere...',
    aiRecommendations: 'KI-Empfehlungen',
    marketInsights: 'Markteinblicke',
    
    // Strategy Generation
    aiStrategyGeneration: 'KI-Strategiegenerierung',
    riskProfile: 'Risikoprofil',
    conservative: 'Konservativ',
    balanced: 'Ausgewogen',
    aggressive: 'Aggressiv',
    conservativeDesc: 'Niedriges Risiko',
    balancedDesc: 'Mittleres Risiko',
    aggressiveDesc: 'Hohes Risiko',
    investmentGoals: 'Anlageziele',
    generateStrategy: 'Strategie generieren',
    generatingStrategy: 'Generiere Strategie...',
    
    // Investment Goals
    longTermGrowth: 'Langfristiges Wachstum',
    passiveIncome: 'Passives Einkommen',
    capitalPreservation: 'Kapitalerhaltung',
    diversificationGoal: 'Diversifikation',
    inflationProtection: 'Inflationsschutz',
    
    // Messages
    noAssetsMessage: 'Keine Assets vorhanden. Fügen Sie Ihr erstes Asset hinzu, um zu beginnen.',
    noAssetsToAnalyze: 'Fügen Sie mindestens ein Asset hinzu, um das Portfolio zu analysieren',
    noStrategiesAvailable: 'Keine Strategien verfügbar',
    addAssetsToCompareStrategies: 'Fügen Sie Assets zu Ihrem Portfolio hinzu, um Strategien zu vergleichen',
    
    // Disclaimer
    disclaimerTitle: 'Wichtiger Hinweis',
    disclaimerSubtitle: 'Informationen zu Anlagerisiken',
    disclaimerAcceptance: 'Ich habe den Risikohinweis gelesen und verstanden. Ich akzeptiere, dieses Tool auf eigenes Risiko zu verwenden.',
    
    // Common UI
    home: 'Startseite',
    reset: 'Zurücksetzen',
    resetData: 'Daten zurücksetzen',
    
    // Cookie Consent
    cookieConsentTitle: 'Cookie-Nutzung',
    cookieConsentMessage: 'Diese Seite verwendet technische Cookies, die notwendig sind, um Ihre Portfolio-Daten lokal auf Ihrem Computer zu speichern.',
    cookieConsentDetails: 'Die Daten (Assets, Strategien, Einstellungen) werden nur auf Ihrem PC gespeichert und niemals an externe Server gesendet. Ohne Cookies kann die App nicht funktionieren.',
    acceptCookies: 'Cookies Akzeptieren',
    decline: 'Ablehnen',
    
    // Asset Lock Manager
    assetLockManager: 'Asset-Sperren-Manager',
    assetLockDescription: 'Sperren Sie Assets, die Sie während der KI-Neugewichtung nicht ändern möchten',
    lockedAssets: 'Gesperrte Assets',
    unlockedAssets: 'Entsperrte Assets',
    assetLockControls: 'Asset-Sperren-Kontrollen',
    locked: 'Gesperrt',
    lockAsset: 'Asset sperren',
    unlockAsset: 'Asset entsperren',
    aiRebalanceTitle: 'Intelligente KI-Neugewichtung',
    aiRebalanceDescription: 'Die KI optimiert nur entsperrte Assets und hält gesperrte fest.',
    lockedAssetsNote: 'Gesperrte Assets (werden nicht geändert):',
    requestAiRebalance: 'KI-Neugewichtung anfordern',
    rebalancing: 'Neugewichtung...',
    allAssetsLocked: 'Alle Assets sind gesperrt',
    unlockSomeAssets: 'Entsperren Sie mindestens ein Asset, um KI-Neugewichtung zu ermöglichen',
    withLockedAssets: 'mit Gesperrten Assets',
    noUnlockedAssets: 'Keine entsperrten Assets für Neugewichtung verfügbar',
    rebalanceError: 'Fehler bei der Neugewichtung. Bitte versuchen Sie es später erneut.',
    nonBloccati: 'entsperrt',
    asset: 'Asset',
    assets: 'Assets'
  },
  
  zh: {
    // App
    appTitle: 'Portfolio Balancer',
    appSubtitle: '用AI优化您的投资',
    
    // Navigation
    portfolio: '投资组合',
    strategies: '策略',
    aiAssistant: 'AI助手',
    
    // Common
    add: '添加',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    continue: '继续',
    close: '关闭',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    warning: '警告',
    info: '信息',
    
    // Asset Management
    addAsset: '添加资产',
    editAsset: '编辑资产',
    updateAsset: '更新资产',
    addAssetButton: '添加资产',
    assetName: '资产名称',
    assetType: '资产类型',
    assetCurrentValue: '当前价值 (€)',
    expectedReturnLabel: '预期收益 (%)',
    riskLevel: '风险等级',
    fillAllRequiredFields: '请填写所有必填字段',
    
    // Asset Types
    stocks: '股票',
    bonds: '债券',
    etf: 'ETF',
    crypto: '加密货币',
    real_estate: '房地产',
    cash: '现金',
    commodities: '大宗商品',
    other: '其他',
    
    // Risk Levels
    very_low: '极低',
    low: '低',
    medium: '中等',
    high: '高',
    very_high: '极高',
    
    // Portfolio
    portfolioAssets: '投资组合资产',
    portfolioMetrics: '投资组合指标',
    currentAllocation: '当前配置',
    totalValue: '总价值',
    expectedReturn: '预期收益',
    riskScore: '风险评分',
    diversification: '多样化',
    currentValue: '当前价值',
    risk: '风险',
    
    // Strategies
    investmentStrategies: '投资策略',
    strategiesDescription: '比较不同的配置策略以优化您的投资组合',
    currentStrategy: '当前策略',
    currentStrategyName: '当前投资组合',
    currentStrategyDescription: '您当前的资产配置',
    aiGeneratedStrategies: 'AI生成的策略',
    targetAllocation: '目标配置',
    compareStrategies: '比较策略',
    strategyComparison: '策略比较',
    
    // Strategy Metrics
    rendimento: '收益',
    rischio: '风险',
    sharpeRatio: '夏普比率',
    volatility: '波动率',
    maxDrawdown: '最大回撤',
    
    // AI Assistant
    aiAssistantTitle: 'AI助手',
    aiDescription: '使用人工智能分析您的投资组合并生成最优策略',
    aiPortfolioAnalysis: 'AI投资组合分析',
    analyzePortfolio: '分析投资组合',
    analyzing: '分析中...',
    aiRecommendations: 'AI建议',
    marketInsights: '市场洞察',
    
    // Strategy Generation
    aiStrategyGeneration: 'AI策略生成',
    riskProfile: '风险偏好',
    conservative: '保守型',
    balanced: '平衡型',
    aggressive: '激进型',
    conservativeDesc: '低风险',
    balancedDesc: '中等风险',
    aggressiveDesc: '高风险',
    investmentGoals: '投资目标',
    generateStrategy: '生成策略',
    generatingStrategy: '生成策略中...',
    
    // Investment Goals
    longTermGrowth: '长期增长',
    passiveIncome: '被动收入',
    capitalPreservation: '资本保值',
    diversificationGoal: '多样化',
    inflationProtection: '通胀保护',
    
    // Messages
    noAssetsMessage: '没有资产。添加您的第一个资产开始使用。',
    noAssetsToAnalyze: '至少添加一个资产来分析投资组合',
    noStrategiesAvailable: '没有可用策略',
    addAssetsToCompareStrategies: '向您的投资组合添加资产以比较策略',
    
    // Disclaimer
    disclaimerTitle: '重要提示',
    disclaimerSubtitle: '投资风险信息',
    disclaimerAcceptance: '我已阅读并理解风险提示。我接受自担风险使用此工具。',
    
    // Common UI
    home: '首页',
    reset: '重置',
    resetData: '重置数据',
    
    // Cookie Consent
    cookieConsentTitle: 'Cookie使用',
    cookieConsentMessage: '本站使用技术Cookie在您的计算机本地保存您的投资组合数据。',
    cookieConsentDetails: '数据（资产、策略、偏好设置）仅保存在您的PC上，从不发送到外部服务器。没有Cookie，应用程序无法工作。',
    acceptCookies: '接受Cookie',
    decline: '拒绝',
    
    // Asset Lock Manager
    assetLockManager: '资产锁定管理器',
    assetLockDescription: '锁定您在AI重新平衡期间不想修改的资产',
    lockedAssets: '已锁定资产',
    unlockedAssets: '未锁定资产',
    assetLockControls: '资产锁定控制',
    locked: '已锁定',
    lockAsset: '锁定资产',
    unlockAsset: '解锁资产',
    aiRebalanceTitle: '智能AI重新平衡',
    aiRebalanceDescription: 'AI将仅优化未锁定的资产，保持锁定资产不变。',
    lockedAssetsNote: '锁定的资产（不会被修改）：',
    requestAiRebalance: '请求AI重新平衡',
    rebalancing: '重新平衡中...',
    allAssetsLocked: '所有资产都已锁定',
    unlockSomeAssets: '至少解锁一个资产以允许AI重新平衡',
    withLockedAssets: '带锁定资产',
    noUnlockedAssets: '没有可用于重新平衡的未锁定资产',
    rebalanceError: '重新平衡时出错。请稍后重试。',
    nonBloccati: '未锁定',
    asset: '资产',
    assets: '资产'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language]?.[key] || translations.it[key] || key;
};