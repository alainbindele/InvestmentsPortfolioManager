export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'zh';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // App Title and Navigation
  appTitle: {
    it: 'Portfolio Balancer',
    en: 'Portfolio Balancer',
    es: 'Portfolio Balancer',
    fr: 'Portfolio Balancer',
    de: 'Portfolio Balancer',
    zh: '投资组合平衡器'
  },
  appSubtitle: {
    it: 'Ottimizza i tuoi investimenti con l\'AI',
    en: 'Optimize your investments with AI',
    es: 'Optimiza tus inversiones con IA',
    fr: 'Optimisez vos investissements avec l\'IA',
    de: 'Optimieren Sie Ihre Investitionen mit KI',
    zh: '用AI优化您的投资'
  },
  portfolio: {
    it: 'Portfolio',
    en: 'Portfolio',
    es: 'Portafolio',
    fr: 'Portefeuille',
    de: 'Portfolio',
    zh: '投资组合'
  },
  strategies: {
    it: 'Strategie',
    en: 'Strategies',
    es: 'Estrategias',
    fr: 'Stratégies',
    de: 'Strategien',
    zh: '投资策略'
  },
  aiAssistant: {
    it: 'AI Assistant',
    en: 'AI Assistant',
    es: 'Asistente IA',
    fr: 'Assistant IA',
    de: 'KI-Assistent',
    zh: 'AI助手'
  },
  home: {
    it: 'Home',
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    zh: '首页'
  },

  // Asset Management
  addAsset: {
    it: 'Aggiungi Asset',
    en: 'Add Asset',
    es: 'Agregar Activo',
    fr: 'Ajouter un Actif',
    de: 'Asset hinzufügen',
    zh: '添加资产'
  },
  editAsset: {
    it: 'Modifica Asset',
    en: 'Edit Asset',
    es: 'Editar Activo',
    fr: 'Modifier l\'Actif',
    de: 'Asset bearbeiten',
    zh: '编辑资产'
  },
  updateAsset: {
    it: 'Aggiorna Asset',
    en: 'Update Asset',
    es: 'Actualizar Activo',
    fr: 'Mettre à jour l\'Actif',
    de: 'Asset aktualisieren',
    zh: '更新资产'
  },
  addAssetButton: {
    it: 'Aggiungi',
    en: 'Add',
    es: 'Agregar',
    fr: 'Ajouter',
    de: 'Hinzufügen',
    zh: '添加'
  },
  assetName: {
    it: 'Nome Asset',
    en: 'Asset Name',
    es: 'Nombre del Activo',
    fr: 'Nom de l\'Actif',
    de: 'Asset-Name',
    zh: '资产名称'
  },
  assetType: {
    it: 'Tipo Asset',
    en: 'Asset Type',
    es: 'Tipo de Activo',
    fr: 'Type d\'Actif',
    de: 'Asset-Typ',
    zh: '资产类型'
  },
  assetCurrentValue: {
    it: 'Valore Attuale (€)',
    en: 'Current Value (€)',
    es: 'Valor Actual (€)',
    fr: 'Valeur Actuelle (€)',
    de: 'Aktueller Wert (€)',
    zh: '当前价值 (€)'
  },
  currentValue: {
    it: 'Valore Attuale',
    en: 'Current Value',
    es: 'Valor Actual',
    fr: 'Valeur Actuelle',
    de: 'Aktueller Wert',
    zh: '当前价值'
  },
  expectedReturnLabel: {
    it: 'Rendimento Atteso (% annuo)',
    en: 'Expected Return (% annual)',
    es: 'Rendimiento Esperado (% anual)',
    fr: 'Rendement Attendu (% annuel)',
    de: 'Erwartete Rendite (% jährlich)',
    zh: '预期收益率（年化%）'
  },
  expectedReturn: {
    it: 'Rendimento Atteso',
    en: 'Expected Return',
    es: 'Rendimiento Esperado',
    fr: 'Rendement Attendu',
    de: 'Erwartete Rendite',
    zh: '预期收益'
  },
  riskLevel: {
    it: 'Livello di Rischio',
    en: 'Risk Level',
    es: 'Nivel de Riesgo',
    fr: 'Niveau de Risque',
    de: 'Risikolevel',
    zh: '风险等级'
  },
  risk: {
    it: 'Rischio',
    en: 'Risk',
    es: 'Riesgo',
    fr: 'Risque',
    de: 'Risiko',
    zh: '风险'
  },
  riskScore: {
    it: 'Punteggio Rischio',
    en: 'Risk Score',
    es: 'Puntuación de Riesgo',
    fr: 'Score de Risque',
    de: 'Risiko-Score',
    zh: '风险评分'
  },

  // Asset Types
  stocks: {
    it: 'Azioni',
    en: 'Stocks',
    es: 'Acciones',
    fr: 'Actions',
    de: 'Aktien',
    zh: '股票'
  },
  bonds: {
    it: 'Obbligazioni',
    en: 'Bonds',
    es: 'Bonos',
    fr: 'Obligations',
    de: 'Anleihen',
    zh: '债券'
  },
  etf: {
    it: 'ETF',
    en: 'ETF',
    es: 'ETF',
    fr: 'ETF',
    de: 'ETF',
    zh: 'ETF'
  },
  crypto: {
    it: 'Criptovalute',
    en: 'Cryptocurrency',
    es: 'Criptomonedas',
    fr: 'Cryptomonnaies',
    de: 'Kryptowährungen',
    zh: '加密货币'
  },
  real_estate: {
    it: 'Immobiliare',
    en: 'Real Estate',
    es: 'Bienes Raíces',
    fr: 'Immobilier',
    de: 'Immobilien',
    zh: '房地产'
  },
  cash: {
    it: 'Liquidità',
    en: 'Cash',
    es: 'Efectivo',
    fr: 'Liquidités',
    de: 'Bargeld',
    zh: '现金'
  },
  commodities: {
    it: 'Materie Prime',
    en: 'Commodities',
    es: 'Materias Primas',
    fr: 'Matières Premières',
    de: 'Rohstoffe',
    zh: '大宗商品'
  },
  other: {
    it: 'Altro',
    en: 'Other',
    es: 'Otro',
    fr: 'Autre',
    de: 'Andere',
    zh: '其他'
  },

  // Risk Levels
  very_low: {
    it: 'Molto Basso',
    en: 'Very Low',
    es: 'Muy Bajo',
    fr: 'Très Bas',
    de: 'Sehr Niedrig',
    zh: '极低'
  },
  low: {
    it: 'Basso',
    en: 'Low',
    es: 'Bajo',
    fr: 'Bas',
    de: 'Niedrig',
    zh: '低'
  },
  medium: {
    it: 'Medio',
    en: 'Medium',
    es: 'Medio',
    fr: 'Moyen',
    de: 'Mittel',
    zh: '中等'
  },
  high: {
    it: 'Alto',
    en: 'High',
    es: 'Alto',
    fr: 'Élevé',
    de: 'Hoch',
    zh: '高'
  },
  very_high: {
    it: 'Molto Alto',
    en: 'Very High',
    es: 'Muy Alto',
    fr: 'Très Élevé',
    de: 'Sehr Hoch',
    zh: '极高'
  },

  // Portfolio Metrics
  totalValue: {
    it: 'Valore Totale',
    en: 'Total Value',
    es: 'Valor Total',
    fr: 'Valeur Totale',
    de: 'Gesamtwert',
    zh: '总价值'
  },
  portfolioMetrics: {
    it: 'Metriche Portfolio',
    en: 'Portfolio Metrics',
    es: 'Métricas del Portafolio',
    fr: 'Métriques du Portefeuille',
    de: 'Portfolio-Kennzahlen',
    zh: '投资组合指标'
  },
  diversification: {
    it: 'Diversificazione',
    en: 'Diversification',
    es: 'Diversificación',
    fr: 'Diversification',
    de: 'Diversifikation',
    zh: '多样化'
  },
  portfolioAssets: {
    it: 'Asset del Portfolio',
    en: 'Portfolio Assets',
    es: 'Activos del Portafolio',
    fr: 'Actifs du Portefeuille',
    de: 'Portfolio-Assets',
    zh: '投资组合资产'
  },
  currentAllocation: {
    it: 'Allocazione Attuale',
    en: 'Current Allocation',
    es: 'Asignación Actual',
    fr: 'Allocation Actuelle',
    de: 'Aktuelle Allokation',
    zh: '当前配置'
  },
  targetAllocation: {
    it: 'Allocazione Target',
    en: 'Target Allocation',
    es: 'Asignación Objetivo',
    fr: 'Allocation Cible',
    de: 'Ziel-Allokation',
    zh: '目标配置'
  },
  allocationTarget: {
    it: 'Allocazione Target:',
    en: 'Target Allocation:',
    es: 'Asignación Objetivo:',
    fr: 'Allocation Cible:',
    de: 'Ziel-Allokation:',
    zh: '目标配置:'
  },
  totalPortfolio: {
    it: 'Totale Portfolio:',
    en: 'Total Portfolio:',
    es: 'Portafolio Total:',
    fr: 'Portefeuille Total:',
    de: 'Gesamt-Portfolio:',
    zh: '投资组合总计:'
  },

  // Strategy Management
  investmentStrategies: {
    it: 'Strategie di Investimento',
    en: 'Investment Strategies',
    es: 'Estrategias de Inversión',
    fr: 'Stratégies d\'Investissement',
    de: 'Anlagestrategien',
    zh: '投资策略'
  },
  strategiesDescription: {
    it: 'Confronta e analizza diverse strategie di investimento',
    en: 'Compare and analyze different investment strategies',
    es: 'Compara y analiza diferentes estrategias de inversión',
    fr: 'Comparez et analysez différentes stratégies d\'investissement',
    de: 'Vergleichen und analysieren Sie verschiedene Anlagestrategien',
    zh: '比较和分析不同的投资策略'
  },
  currentStrategy: {
    it: 'Strategia Attuale',
    en: 'Current Strategy',
    es: 'Estrategia Actual',
    fr: 'Stratégie Actuelle',
    de: 'Aktuelle Strategie',
    zh: '当前策略'
  },
  aiGeneratedStrategies: {
    it: 'Strategie AI Generate',
    en: 'AI Generated Strategies',
    es: 'Estrategias Generadas por IA',
    fr: 'Stratégies Générées par IA',
    de: 'KI-generierte Strategien',
    zh: 'AI生成的策略'
  },
  compareStrategies: {
    it: 'Confronta Strategie',
    en: 'Compare Strategies',
    es: 'Comparar Estrategias',
    fr: 'Comparer les Stratégies',
    de: 'Strategien vergleichen',
    zh: '比较策略'
  },
  strategyComparison: {
    it: 'Confronto Strategie',
    en: 'Strategy Comparison',
    es: 'Comparación de Estrategias',
    fr: 'Comparaison des Stratégies',
    de: 'Strategienvergleich',
    zh: '策略比较'
  },
  selectedStrategies: {
    it: 'Strategie Selezionate',
    en: 'Selected Strategies',
    es: 'Estrategias Seleccionadas',
    fr: 'Stratégies Sélectionnées',
    de: 'Ausgewählte Strategien',
    zh: '已选择的策略'
  },
  selectedStrategy: {
    it: 'Selezionata',
    en: 'Selected',
    es: 'Seleccionada',
    fr: 'Sélectionnée',
    de: 'Ausgewählt',
    zh: '已选择'
  },
  selectedForComparison: {
    it: 'Selezionata per Confronto',
    en: 'Selected for Comparison',
    es: 'Seleccionada para Comparación',
    fr: 'Sélectionnée pour Comparaison',
    de: 'Für Vergleich ausgewählt',
    zh: '已选择用于比较'
  },
  suggestionPrefix: {
    it: 'Suggerimento:',
    en: 'Suggestion:',
    es: 'Sugerencia:',
    fr: 'Suggestion:',
    de: 'Vorschlag:',
    zh: '建议：'
  },
  clickAiStrategiesMessage: {
    it: 'Clicca sulle strategie AI per selezionarle e confrontarle con la tua strategia attuale',
    en: 'Click on AI strategies to select them and compare with your current strategy',
    es: 'Haz clic en las estrategias de IA para seleccionarlas y compararlas con tu estrategia actual',
    fr: 'Cliquez sur les stratégies IA pour les sélectionner et les comparer avec votre stratégie actuelle',
    de: 'Klicken Sie auf KI-Strategien, um sie auszuwählen und mit Ihrer aktuellen Strategie zu vergleichen',
    zh: '点击AI策略来选择它们并与您当前的策略进行比较'
  },
  selectOneOrMoreStrategies: {
    it: 'Seleziona una o più strategie AI per confrontarle con la tua strategia attuale',
    en: 'Select one or more AI strategies to compare with your current strategy',
    es: 'Selecciona una o más estrategias de IA para compararlas con tu estrategia actual',
    fr: 'Sélectionnez une ou plusieurs stratégies IA pour les comparer avec votre stratégie actuelle',
    de: 'Wählen Sie eine oder mehrere KI-Strategien aus, um sie mit Ihrer aktuellen Strategie zu vergleichen',
    zh: '选择一个或多个AI策略与您当前的策略进行比较'
  },
  noStrategySelected: {
    it: 'Nessuna strategia selezionata',
    en: 'No strategy selected',
    es: 'Ninguna estrategia seleccionada',
    fr: 'Aucune stratégie sélectionnée',
    de: 'Keine Strategie ausgewählt',
    zh: '未选择策略'
  },
  clickStrategiesAbove: {
    it: 'Clicca sulle strategie AI sopra per selezionarle e vedere il confronto con la tua strategia attuale',
    en: 'Click on the AI strategies above to select them and see the comparison with your current strategy',
    es: 'Haz clic en las estrategias de IA de arriba para seleccionarlas y ver la comparación con tu estrategia actual',
    fr: 'Cliquez sur les stratégies IA ci-dessus pour les sélectionner et voir la comparaison avec votre stratégie actuelle',
    de: 'Klicken Sie auf die KI-Strategien oben, um sie auszuwählen und den Vergleich mit Ihrer aktuellen Strategie zu sehen',
    zh: '点击上面的AI策略来选择它们，并查看与您当前策略的比较'
  },

  // Strategy Metrics
  volatility: {
    it: 'Volatilità',
    en: 'Volatility',
    es: 'Volatilidad',
    fr: 'Volatilité',
    de: 'Volatilität',
    zh: '波动性'
  },
  sharpe: {
    it: 'Sharpe',
    en: 'Sharpe',
    es: 'Sharpe',
    fr: 'Sharpe',
    de: 'Sharpe',
    zh: '夏普比率'
  },
  return: {
    it: 'Rendimento',
    en: 'Return',
    es: 'Rendimiento',
    fr: 'Rendement',
    de: 'Rendite',
    zh: '收益率'
  },
  maxDrawdown: {
    it: 'Max Drawdown',
    en: 'Max Drawdown',
    es: 'Máxima Caída',
    fr: 'Drawdown Max',
    de: 'Max. Drawdown',
    zh: '最大回撤'
  },
  bestReturn: {
    it: 'Miglior Rendimento',
    en: 'Best Return',
    es: 'Mejor Rendimiento',
    fr: 'Meilleur Rendement',
    de: 'Beste Rendite',
    zh: '最佳收益'
  },
  lowestRisk: {
    it: 'Rischio Più Basso',
    en: 'Lowest Risk',
    es: 'Menor Riesgo',
    fr: 'Risque le Plus Bas',
    de: 'Niedrigstes Risiko',
    zh: '最低风险'
  },
  bestSharpe: {
    it: 'Miglior Sharpe',
    en: 'Best Sharpe',
    es: 'Mejor Sharpe',
    fr: 'Meilleur Sharpe',
    de: 'Beste Sharpe',
    zh: '最佳夏普比率'
  },
  comparisonMetrics: {
    it: 'Metriche di Confronto',
    en: 'Comparison Metrics',
    es: 'Métricas de Comparación',
    fr: 'Métriques de Comparaison',
    de: 'Vergleichsmetriken',
    zh: '比较指标'
  },
  detailedComparison: {
    it: 'Confronto Dettagliato',
    en: 'Detailed Comparison',
    es: 'Comparación Detallada',
    fr: 'Comparaison Détaillée',
    de: 'Detaillierter Vergleich',
    zh: '详细比较'
  },
  strategy: {
    it: 'Strategia',
    en: 'Strategy',
    es: 'Estrategia',
    fr: 'Stratégie',
    de: 'Strategie',
    zh: '策略'
  },

  // Projection and Charts
  portfolioProjection: {
    it: 'Proiezione Portfolio',
    en: 'Portfolio Projection',
    es: 'Proyección del Portafolio',
    fr: 'Projection du Portefeuille',
    de: 'Portfolio-Projektion',
    zh: '投资组合预测'
  },
  portfolioGrowthProjection: {
    it: 'Proiezione di Crescita Portfolio',
    en: 'Portfolio Growth Projection',
    es: 'Proyección de Crecimiento del Portafolio',
    fr: 'Projection de Croissance du Portefeuille',
    de: 'Portfolio-Wachstumsprognose',
    zh: '投资组合增长预测'
  },
  portfolioGrowthDescription: {
    it: 'Proiezione di crescita basata sui rendimenti attesi degli asset',
    en: 'Growth projection based on expected asset returns',
    es: 'Proyección de crecimiento basada en los rendimientos esperados de los activos',
    fr: 'Projection de croissance basée sur les rendements attendus des actifs',
    de: 'Wachstumsprognose basierend auf erwarteten Asset-Renditen',
    zh: '基于资产预期收益的增长预测'
  },
  selectAssetToAnalyze: {
    it: 'Seleziona Asset da Analizzare',
    en: 'Select Asset to Analyze',
    es: 'Seleccionar Activo a Analizar',
    fr: 'Sélectionner l\'Actif à Analyser',
    de: 'Asset zur Analyse auswählen',
    zh: '选择要分析的资产'
  },
  entirePortfolio: {
    it: 'Intero Portfolio',
    en: 'Entire Portfolio',
    es: 'Portafolio Completo',
    fr: 'Portefeuille Entier',
    de: 'Gesamtes Portfolio',
    zh: '整个投资组合'
  },
  years: {
    it: 'anni',
    en: 'years',
    es: 'años',
    fr: 'années',
    de: 'Jahre',
    zh: '年'
  },
  assetDetails: {
    it: 'Dettagli Asset',
    en: 'Asset Details',
    es: 'Detalles del Activo',
    fr: 'Détails de l\'Actif',
    de: 'Asset-Details',
    zh: '资产详情'
  },

  // AI Assistant
  aiAssistantTitle: {
    it: 'Assistente AI',
    en: 'AI Assistant',
    es: 'Asistente IA',
    fr: 'Assistant IA',
    de: 'KI-Assistent',
    zh: 'AI助手'
  },
  aiDescription: {
    it: 'Ottieni analisi personalizzate del portafoglio e suggerimenti strategici',
    en: 'Get personalized portfolio analysis and strategic recommendations',
    es: 'Obtén análisis personalizados de portafolio y recomendaciones estratégicas',
    fr: 'Obtenez des analyses de portefeuille personnalisées et des recommandations stratégiques',
    de: 'Erhalten Sie personalisierte Portfolio-Analysen und strategische Empfehlungen',
    zh: '获得个性化的投资组合分析和策略建议'
  },
  aiPortfolioAnalysis: {
    it: 'Analisi Portfolio AI',
    en: 'AI Portfolio Analysis',
    es: 'Análisis de Portafolio IA',
    fr: 'Analyse de Portefeuille IA',
    de: 'KI-Portfolio-Analyse',
    zh: 'AI投资组合分析'
  },
  aiStrategyGeneration: {
    it: 'Generazione Strategia AI',
    en: 'AI Strategy Generation',
    es: 'Generación de Estrategia IA',
    fr: 'Génération de Stratégie IA',
    de: 'KI-Strategiegenerierung',
    zh: 'AI策略生成'
  },
  analyzePortfolio: {
    it: 'Analizza Portfolio',
    en: 'Analyze Portfolio',
    es: 'Analizar Portafolio',
    fr: 'Analyser le Portefeuille',
    de: 'Portfolio analysieren',
    zh: '分析投资组合'
  },
  analyzing: {
    it: 'Analizzando...',
    en: 'Analyzing...',
    es: 'Analizando...',
    fr: 'Analyse en cours...',
    de: 'Analysiere...',
    zh: '分析中...'
  },
  generateStrategy: {
    it: 'Genera Strategia',
    en: 'Generate Strategy',
    es: 'Generar Estrategia',
    fr: 'Générer une Stratégie',
    de: 'Strategie generieren',
    zh: '生成策略'
  },
  generatingStrategy: {
    it: 'Generando Strategia...',
    en: 'Generating Strategy...',
    es: 'Generando Estrategia...',
    fr: 'Génération de Stratégie...',
    de: 'Strategie wird generiert...',
    zh: '生成策略中...'
  },
  generateRealAiStrategy: {
    it: 'Genera Strategia AI Reale',
    en: 'Generate Real AI Strategy',
    es: 'Generar Estrategia IA Real',
    fr: 'Générer une Vraie Stratégie IA',
    de: 'Echte KI-Strategie generieren',
    zh: '生成真实AI策略'
  },
  aiRecommendations: {
    it: 'Raccomandazioni AI',
    en: 'AI Recommendations',
    es: 'Recomendaciones IA',
    fr: 'Recommandations IA',
    de: 'KI-Empfehlungen',
    zh: 'AI建议'
  },
  marketInsights: {
    it: 'Insights di Mercato',
    en: 'Market Insights',
    es: 'Perspectivas del Mercado',
    fr: 'Aperçus du Marché',
    de: 'Markteinblicke',
    zh: '市场洞察'
  },
  apiStatus: {
    it: 'Stato API',
    en: 'API Status',
    es: 'Estado de la API',
    fr: 'Statut de l\'API',
    de: 'API-Status',
    zh: 'API状态'
  },
  connected: {
    it: 'Connesso',
    en: 'Connected',
    es: 'Conectado',
    fr: 'Connecté',
    de: 'Verbunden',
    zh: '已连接'
  },
  error: {
    it: 'Errore',
    en: 'Error',
    es: 'Error',
    fr: 'Erreur',
    de: 'Fehler',
    zh: '错误'
  },
  notTested: {
    it: 'Non Testato',
    en: 'Not Tested',
    es: 'No Probado',
    fr: 'Non Testé',
    de: 'Nicht getestet',
    zh: '未测试'
  },
  apiKeyConfigured: {
    it: 'API Key Configurata',
    en: 'API Key Configured',
    es: 'Clave API Configurada',
    fr: 'Clé API Configurée',
    de: 'API-Schlüssel konfiguriert',
    zh: 'API密钥已配置'
  },
  apiKeyNotConfigured: {
    it: 'API Key Non Configurata',
    en: 'API Key Not Configured',
    es: 'Clave API No Configurada',
    fr: 'Clé API Non Configurée',
    de: 'API-Schlüssel nicht konfiguriert',
    zh: 'API密钥未配置'
  },
  apiError: {
    it: 'Errore API',
    en: 'API Error',
    es: 'Error de API',
    fr: 'Erreur API',
    de: 'API-Fehler',
    zh: 'API错误'
  },
  fallbackMessage: {
    it: 'Utilizzando strategia di fallback',
    en: 'Using fallback strategy',
    es: 'Usando estrategia de respaldo',
    fr: 'Utilisation de la stratégie de secours',
    de: 'Fallback-Strategie wird verwendet',
    zh: '使用备用策略'
  },
  aiActive: {
    it: 'AI Attiva',
    en: 'AI Active',
    es: 'IA Activa',
    fr: 'IA Active',
    de: 'KI Aktiv',
    zh: 'AI激活'
  },
  note: {
    it: 'Nota',
    en: 'Note',
    es: 'Nota',
    fr: 'Note',
    de: 'Hinweis',
    zh: '注意'
  },
  aiConfigNote: {
    it: 'Configura l\'API key OpenAI per analisi AI complete',
    en: 'Configure OpenAI API key for complete AI analysis',
    es: 'Configura la clave API de OpenAI para análisis completos de IA',
    fr: 'Configurez la clé API OpenAI pour une analyse IA complète',
    de: 'Konfigurieren Sie den OpenAI API-Schlüssel für vollständige KI-Analysen',
    zh: '配置OpenAI API密钥以进行完整的AI分析'
  },
  fallbackStrategyNote: {
    it: 'Verranno generate strategie di fallback senza AI',
    en: 'Fallback strategies will be generated without AI',
    es: 'Se generarán estrategias de respaldo sin IA',
    fr: 'Des stratégies de secours seront générées sans IA',
    de: 'Fallback-Strategien werden ohne KI generiert',
    zh: '将生成无AI的备用策略'
  },

  // Risk Profiles
  riskProfile: {
    it: 'Profilo di Rischio',
    en: 'Risk Profile',
    es: 'Perfil de Riesgo',
    fr: 'Profil de Risque',
    de: 'Risikoprofil',
    zh: '风险偏好'
  },
  conservative: {
    it: 'Conservativo',
    en: 'Conservative',
    es: 'Conservador',
    fr: 'Conservateur',
    de: 'Konservativ',
    zh: '保守型'
  },
  balanced: {
    it: 'Bilanciato',
    en: 'Balanced',
    es: 'Equilibrado',
    fr: 'Équilibré',
    de: 'Ausgewogen',
    zh: '平衡型'
  },
  aggressive: {
    it: 'Aggressivo',
    en: 'Aggressive',
    es: 'Agresivo',
    fr: 'Agressif',
    de: 'Aggressiv',
    zh: '激进型'
  },
  conservativeDesc: {
    it: 'Basso rischio',
    en: 'Low risk',
    es: 'Bajo riesgo',
    fr: 'Faible risque',
    de: 'Geringes Risiko',
    zh: '低风险'
  },
  balancedDesc: {
    it: 'Rischio medio',
    en: 'Medium risk',
    es: 'Riesgo medio',
    fr: 'Risque moyen',
    de: 'Mittleres Risiko',
    zh: '中等风险'
  },
  aggressiveDesc: {
    it: 'Alto rischio',
    en: 'High risk',
    es: 'Alto riesgo',
    fr: 'Risque élevé',
    de: 'Hohes Risiko',
    zh: '高风险'
  },

  // Investment Goals
  investmentGoals: {
    it: 'Obiettivi di Investimento',
    en: 'Investment Goals',
    es: 'Objetivos de Inversión',
    fr: 'Objectifs d\'Investissement',
    de: 'Anlageziele',
    zh: '投资目标'
  },
  longTermGrowth: {
    it: 'Crescita a Lungo Termine',
    en: 'Long-term Growth',
    es: 'Crecimiento a Largo Plazo',
    fr: 'Croissance à Long Terme',
    de: 'Langfristiges Wachstum',
    zh: '长期增长'
  },
  passiveIncome: {
    it: 'Reddito Passivo',
    en: 'Passive Income',
    es: 'Ingresos Pasivos',
    fr: 'Revenus Passifs',
    de: 'Passives Einkommen',
    zh: '被动收入'
  },
  capitalPreservation: {
    it: 'Preservazione del Capitale',
    en: 'Capital Preservation',
    es: 'Preservación del Capital',
    fr: 'Préservation du Capital',
    de: 'Kapitalerhaltung',
    zh: '资本保值'
  },
  diversificationGoal: {
    it: 'Diversificazione',
    en: 'Diversification',
    es: 'Diversificación',
    fr: 'Diversification',
    de: 'Diversifikation',
    zh: '多样化'
  },
  inflationProtection: {
    it: 'Protezione dall\'Inflazione',
    en: 'Inflation Protection',
    es: 'Protección contra la Inflación',
    fr: 'Protection contre l\'Inflation',
    de: 'Inflationsschutz',
    zh: '通胀保护'
  },

  // PAC (Dollar Cost Averaging)
  isPAC: {
    it: 'Piano di Accumulo (PAC)',
    en: 'Dollar Cost Averaging (DCA)',
    es: 'Plan de Acumulación (PAC)',
    fr: 'Plan d\'Épargne Programmée',
    de: 'Sparplan (Cost-Average-Effekt)',
    zh: '定投计划 (PAC)'
  },
  pacDescription: {
    it: 'Investi un importo fisso a intervalli regolari',
    en: 'Invest a fixed amount at regular intervals',
    es: 'Invierte una cantidad fija a intervalos regulares',
    fr: 'Investissez un montant fixe à intervalles réguliers',
    de: 'Investieren Sie regelmäßig einen festen Betrag',
    zh: '定期投资固定金额'
  },
  pacAmount: {
    it: 'Importo PAC',
    en: 'PAC Amount',
    es: 'Cantidad PAC',
    fr: 'Montant PAC',
    de: 'PAC-Betrag',
    zh: 'PAC金额'
  },
  pacFrequency: {
    it: 'Frequenza PAC',
    en: 'PAC Frequency',
    es: 'Frecuencia PAC',
    fr: 'Fréquence PAC',
    de: 'PAC-Häufigkeit',
    zh: 'PAC频率'
  },
  pacActive: {
    it: 'PAC Attivo',
    en: 'PAC Active',
    es: 'PAC Activo',
    fr: 'PAC Actif',
    de: 'PAC Aktiv',
    zh: 'PAC激活'
  },
  monthly: {
    it: 'Mensile',
    en: 'Monthly',
    es: 'Mensual',
    fr: 'Mensuel',
    de: 'Monatlich',
    zh: '月度'
  },
  quarterly: {
    it: 'Trimestrale',
    en: 'Quarterly',
    es: 'Trimestral',
    fr: 'Trimestriel',
    de: 'Vierteljährlich',
    zh: '季度'
  },
  biannual: {
    it: 'Semestrale',
    en: 'Biannual',
    es: 'Semestral',
    fr: 'Semestriel',
    de: 'Halbjährlich',
    zh: '半年度'
  },
  annual: {
    it: 'Annuale',
    en: 'Annual',
    es: 'Anual',
    fr: 'Annuel',
    de: 'Jährlich',
    zh: '年度'
  },

  // Allocation Editor
  editAllocation: {
    it: 'Modifica Allocazione',
    en: 'Edit Allocation',
    es: 'Editar Asignación',
    fr: 'Modifier l\'Allocation',
    de: 'Allokation bearbeiten',
    zh: '编辑配置'
  },
  adjustAllocations: {
    it: 'Regola Allocazioni',
    en: 'Adjust Allocations',
    es: 'Ajustar Asignaciones',
    fr: 'Ajuster les Allocations',
    de: 'Allokationen anpassen',
    zh: '调整配置'
  },
  totalAllocation: {
    it: 'Allocazione Totale',
    en: 'Total Allocation',
    es: 'Asignación Total',
    fr: 'Allocation Totale',
    de: 'Gesamtallokation',
    zh: '总配置'
  },
  allocationTooHigh: {
    it: 'L\'allocazione supera il 100%. Riduci alcune percentuali.',
    en: 'Allocation exceeds 100%. Please reduce some percentages.',
    es: 'La asignación supera el 100%. Reduce algunos porcentajes.',
    fr: 'L\'allocation dépasse 100%. Veuillez réduire certains pourcentages.',
    de: 'Die Allokation übersteigt 100%. Bitte reduzieren Sie einige Prozentsätze.',
    zh: '配置超过100%。请减少一些百分比。'
  },
  allocationTooLow: {
    it: 'L\'allocazione è inferiore al 100%.',
    en: 'Allocation is below 100%.',
    es: 'La asignación está por debajo del 100%.',
    fr: 'L\'allocation est inférieure à 100%.',
    de: 'Die Allokation liegt unter 100%.',
    zh: '配置低于100%。'
  },
  saveAllocation: {
    it: 'Salva Allocazione',
    en: 'Save Allocation',
    es: 'Guardar Asignación',
    fr: 'Sauvegarder l\'Allocation',
    de: 'Allokation speichern',
    zh: '保存配置'
  },
  liveProjection: {
    it: 'Proiezione in Tempo Reale',
    en: 'Live Projection',
    es: 'Proyección en Tiempo Real',
    fr: 'Projection en Temps Réel',
    de: 'Live-Projektion',
    zh: '实时预测'
  },
  cloneAndEdit: {
    it: 'Clona e Modifica',
    en: 'Clone & Edit',
    es: 'Clonar y Editar',
    fr: 'Cloner et Modifier',
    de: 'Klonen & Bearbeiten',
    zh: '克隆和编辑'
  },

  // Common Actions
  save: {
    it: 'Salva',
    en: 'Save',
    es: 'Guardar',
    fr: 'Sauvegarder',
    de: 'Speichern',
    zh: '保存'
  },
  cancel: {
    it: 'Annulla',
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    de: 'Abbrechen',
    zh: '取消'
  },
  edit: {
    it: 'Modifica',
    en: 'Edit',
    es: 'Editar',
    fr: 'Modifier',
    de: 'Bearbeiten',
    zh: '编辑'
  },
  delete: {
    it: 'Elimina',
    en: 'Delete',
    es: 'Eliminar',
    fr: 'Supprimer',
    de: 'Löschen',
    zh: '删除'
  },
  editName: {
    it: 'Modifica Nome',
    en: 'Edit Name',
    es: 'Editar Nombre',
    fr: 'Modifier le Nom',
    de: 'Name bearbeiten',
    zh: '编辑名称'
  },
  continue: {
    it: 'Continua',
    en: 'Continue',
    es: 'Continuar',
    fr: 'Continuer',
    de: 'Fortfahren',
    zh: '继续'
  },

  // Reset and Data Management
  reset: {
    it: 'Reset',
    en: 'Reset',
    es: 'Restablecer',
    fr: 'Réinitialiser',
    de: 'Zurücksetzen',
    zh: '重置'
  },
  resetData: {
    it: 'Resetta Dati',
    en: 'Reset Data',
    es: 'Restablecer Datos',
    fr: 'Réinitialiser les Données',
    de: 'Daten zurücksetzen',
    zh: '重置数据'
  },
  confirmReset: {
    it: 'Conferma Reset',
    en: 'Confirm Reset',
    es: 'Confirmar Restablecimiento',
    fr: 'Confirmer la Réinitialisation',
    de: 'Reset bestätigen',
    zh: '确认重置'
  },
  resetWarning: {
    it: 'Questa azione eliminerà tutti i dati',
    en: 'This action will delete all data',
    es: 'Esta acción eliminará todos los datos',
    fr: 'Cette action supprimera toutes les données',
    de: 'Diese Aktion löscht alle Daten',
    zh: '此操作将删除所有数据'
  },
  dataToDelete: {
    it: 'Dati da eliminare',
    en: 'Data to delete',
    es: 'Datos a eliminar',
    fr: 'Données à supprimer',
    de: 'Zu löschende Daten',
    zh: '要删除的数据'
  },
  assets: {
    it: 'asset',
    en: 'assets',
    es: 'activos',
    fr: 'actifs',
    de: 'Assets',
    zh: '资产'
  },
  aiStrategies: {
    it: 'strategie AI',
    en: 'AI strategies',
    es: 'estrategias IA',
    fr: 'stratégies IA',
    de: 'KI-Strategien',
    zh: 'AI策略'
  },
  languageAndCurrency: {
    it: 'Lingua e valuta',
    en: 'Language and currency',
    es: 'Idioma y moneda',
    fr: 'Langue et devise',
    de: 'Sprache und Währung',
    zh: '语言和货币'
  },
  resetConfirm: {
    it: 'Conferma',
    en: 'Confirm',
    es: 'Confirmar',
    fr: 'Confirmer',
    de: 'Bestätigen',
    zh: '确认'
  },

  // Empty States and Messages
  noAssetsMessage: {
    it: 'Nessun asset nel portfolio',
    en: 'No assets in portfolio',
    es: 'No hay activos en el portafolio',
    fr: 'Aucun actif dans le portefeuille',
    de: 'Keine Assets im Portfolio',
    zh: '投资组合中没有资产'
  },
  noStrategiesAvailable: {
    it: 'Nessuna strategia disponibile',
    en: 'No strategies available',
    es: 'No hay estrategias disponibles',
    fr: 'Aucune stratégie disponible',
    de: 'Keine Strategien verfügbar',
    zh: '没有可用的策略'
  },
  addAssetsToCompareStrategies: {
    it: 'Aggiungi asset al tuo portfolio per confrontare le strategie',
    en: 'Add assets to your portfolio to compare strategies',
    es: 'Agrega activos a tu portafolio para comparar estrategias',
    fr: 'Ajoutez des actifs à votre portefeuille pour comparer les stratégies',
    de: 'Fügen Sie Assets zu Ihrem Portfolio hinzu, um Strategien zu vergleichen',
    zh: '向您的投资组合添加资产以比较策略'
  },
  fillRequiredFields: {
    it: 'Compila tutti i campi obbligatori',
    en: 'Fill in all required fields',
    es: 'Completa todos los campos obligatorios',
    fr: 'Remplissez tous les champs obligatoires',
    de: 'Füllen Sie alle Pflichtfelder aus',
    zh: '填写所有必填字段'
  },
  noAssetsToAnalyze: {
    it: 'Nessun asset da analizzare',
    en: 'No assets to analyze',
    es: 'No hay activos para analizar',
    fr: 'Aucun actif à analyser',
    de: 'Keine Assets zu analysieren',
    zh: '没有资产可分析'
  },

  // Disclaimer
  disclaimerTitle: {
    it: 'Avviso Importante',
    en: 'Important Notice',
    es: 'Aviso Importante',
    fr: 'Avis Important',
    de: 'Wichtiger Hinweis',
    zh: '重要提示'
  },
  disclaimerSubtitle: {
    it: 'Leggi attentamente prima di procedere',
    en: 'Please read carefully before proceeding',
    es: 'Lee cuidadosamente antes de continuar',
    fr: 'Veuillez lire attentivement avant de continuer',
    de: 'Bitte lesen Sie sorgfältig, bevor Sie fortfahren',
    zh: '请在继续之前仔细阅读'
  },
  disclaimerAcceptance: {
    it: 'Ho letto e compreso l\'avviso e accetto di procedere sotto la mia responsabilità',
    en: 'I have read and understood the notice and agree to proceed at my own responsibility',
    es: 'He leído y entendido el aviso y acepto proceder bajo mi propia responsabilidad',
    fr: 'J\'ai lu et compris l\'avis et j\'accepte de procéder sous ma propre responsabilité',
    de: 'Ich habe den Hinweis gelesen und verstanden und stimme zu, auf eigene Verantwortung fortzufahren',
    zh: '我已阅读并理解此通知，同意自行承担责任继续'
  },

  // SEO
  seoDescription: {
    it: 'Strumento avanzato per l\'ottimizzazione e il ribilanciamento di portafogli di investimento. Analisi AI, strategie personalizzate, piani di accumulo (PAC) e proiezioni di crescita.',
    en: 'Advanced tool for investment portfolio optimization and rebalancing. AI analysis, personalized strategies, dollar-cost averaging (DCA) plans and growth projections.',
    es: 'Herramienta avanzada para la optimización y rebalanceo de carteras de inversión. Análisis de IA, estrategias personalizadas, planes de acumulación (PAC) y proyecciones de crecimiento.',
    fr: 'Outil avancé pour l\'optimisation et le rééquilibrage de portefeuilles d\'investissement. Analyse IA, stratégies personnalisées, plans d\'épargne programmée et projections de croissance.',
    de: 'Fortschrittliches Tool für die Optimierung und Neugewichtung von Anlageportfolios. KI-Analyse, personalisierte Strategien, Sparpläne und Wachstumsprognosen.',
    zh: '先进的投资组合优化和再平衡工具。AI分析、个性化策略、定投计划(PAC)和增长预测。'
  },
  seoKeywords: {
    it: 'portfolio balancer, investimenti, AI, ribilanciamento, PAC, piano accumulo capitale, ETF, azioni, obbligazioni, diversificazione, analisi portafoglio',
    en: 'portfolio balancer, investments, AI, rebalancing, DCA, dollar cost averaging, ETF, stocks, bonds, diversification, portfolio analysis',
    es: 'balanceador de cartera, inversiones, IA, rebalanceo, PAC, promedio de costo, ETF, acciones, bonos, diversificación, análisis de cartera',
    fr: 'équilibreur de portefeuille, investissements, IA, rééquilibrage, DCA, moyenne des coûts, ETF, actions, obligations, diversification, analyse de portefeuille',
    de: 'Portfolio-Balancer, Investitionen, KI, Neugewichtung, Cost-Average, ETF, Aktien, Anleihen, Diversifikation, Portfolio-Analyse',
    zh: '投资组合平衡器, 投资, AI, 再平衡, 定投, 成本平均, ETF, 股票, 债券, 多样化, 投资组合分析'
  },

  // Additional translations for missing texts
  comparisonBetween: {
    it: 'Confronto tra la tua strategia attuale e',
    en: 'Comparison between your current strategy and',
    es: 'Comparación entre tu estrategia actual y',
    fr: 'Comparaison entre votre stratégie actuelle et',
    de: 'Vergleich zwischen Ihrer aktuellen Strategie und',
    zh: '您当前策略与以下策略的比较'
  },
  selectedStrategySingular: {
    it: 'strategia selezionata',
    en: 'selected strategy',
    es: 'estrategia seleccionada',
    fr: 'stratégie sélectionnée',
    de: 'ausgewählte Strategie',
    zh: '个已选择的策略'
  },
  selectedStrategiesPlural: {
    it: 'strategie selezionate',
    en: 'selected strategies',
    es: 'estrategias seleccionadas',
    fr: 'stratégies sélectionnées',
    de: 'ausgewählte Strategien',
    zh: '个已选择的策略'
  },
  deselectAll: {
    it: 'Deseleziona tutto',
    en: 'Deselect all',
    es: 'Deseleccionar todo',
    fr: 'Tout désélectionner',
    de: 'Alle abwählen',
    zh: '取消全选'
  },
  currentStrategyName: {
    it: 'Strategia Attuale',
    en: 'Current Strategy',
    es: 'Estrategia Actual',
    fr: 'Stratégie Actuelle',
    de: 'Aktuelle Strategie',
    zh: '当前策略'
  },
  currentStrategyDescription: {
    it: 'La tua allocazione attuale del portafoglio',
    en: 'Your current portfolio allocation',
    es: 'Tu asignación actual del portafolio',
    fr: 'Votre allocation actuelle du portefeuille',
    de: 'Ihre aktuelle Portfolio-Allokation',
    zh: '您当前的投资组合配置'
  },
  modifiedStrategy: {
    it: 'Strategia Attuale (Modificata)',
    en: 'Current Strategy (Modified)',
    es: 'Estrategia Actual (Modificada)',
    fr: 'Stratégie Actuelle (Modifiée)',
    de: 'Aktuelle Strategie (Geändert)',
    zh: '当前策略（已修改）'
  },
  modifiedStrategyDescription: {
    it: 'Strategia modificata basata su: Strategia Attuale',
    en: 'Modified strategy based on: Current Strategy',
    es: 'Estrategia modificada basada en: Estrategia Actual',
    fr: 'Stratégie modifiée basée sur: Stratégie Actuelle',
    de: 'Geänderte Strategie basierend auf: Aktuelle Strategie',
    zh: '基于当前策略的修改策略'
  },
  modified: {
    it: 'Modificata',
    en: 'Modified',
    es: 'Modificada',
    fr: 'Modifiée',
    de: 'Geändert',
    zh: '已修改'
  },
  modifiedStrategyBasedOn: {
    it: 'Strategia modificata basata su',
    en: 'Modified strategy based on',
    es: 'Estrategia modificada basada en',
    fr: 'Stratégie modifiée basée sur',
    de: 'Geänderte Strategie basierend auf',
    zh: '基于以下策略的修改'
  },
  strategiesCount: {
    it: 'strategie',
    en: 'strategies',
    es: 'estrategias',
    fr: 'stratégies',
    de: 'Strategien',
    zh: '个策略'
  },
  
  // ProjectionChart hardcoded texts
  growthProjectionComparison: {
    it: 'Confronto delle proiezioni di crescita tra diverse strategie',
    en: 'Comparison of growth projections between different strategies',
    es: 'Comparación de proyecciones de crecimiento entre diferentes estrategias',
    fr: 'Comparaison des projections de croissance entre différentes stratégies',
    de: 'Vergleich der Wachstumsprognosen zwischen verschiedenen Strategien',
    zh: '不同策略间增长预测的比较'
  },
  singleAssetProjection: {
    it: 'Proiezione di crescita per:',
    en: 'Growth projection for:',
    es: 'Proyección de crecimiento para:',
    fr: 'Projection de croissance pour:',
    de: 'Wachstumsprognose für:',
    zh: '增长预测：'
  },
  
  // AllocationEditor hardcoded texts
  modifiedStrategyPrefix: {
    it: 'Strategia modificata basata su:',
    en: 'Modified strategy based on:',
    es: 'Estrategia modificada basada en:',
    fr: 'Stratégie modifiée basée sur:',
    de: 'Geänderte Strategie basierend auf:',
    zh: '基于以下策略的修改：'
  },
  
  // ChatGPTIntegration hardcoded texts
  fillAllRequiredFields: {
    it: 'Compila tutti i campi obbligatori',
    en: 'Fill in all required fields',
    es: 'Completa todos los campos obligatorios',
    fr: 'Remplissez tous les champs obligatoires',
    de: 'Füllen Sie alle Pflichtfelder aus',
    zh: '填写所有必填字段'
  },
  
  // PACManager hardcoded texts
  createPac: {
    it: 'Crea PAC',
    en: 'Create PAC',
    es: 'Crear PAC',
    fr: 'Créer PAC',
    de: 'PAC erstellen',
    zh: '创建PAC'
  },
  pacName: {
    it: 'Nome PAC',
    en: 'PAC Name',
    es: 'Nombre PAC',
    fr: 'Nom PAC',
    de: 'PAC-Name',
    zh: 'PAC名称'
  },
  monthlyAmount: {
    it: 'Importo Mensile',
    en: 'Monthly Amount',
    es: 'Cantidad Mensual',
    fr: 'Montant Mensuel',
    de: 'Monatlicher Betrag',
    zh: '月度金额'
  },
  frequency: {
    it: 'Frequenza',
    en: 'Frequency',
    es: 'Frecuencia',
    fr: 'Fréquence',
    de: 'Häufigkeit',
    zh: '频率'
  },
  duration: {
    it: 'Durata (anni)',
    en: 'Duration (years)',
    es: 'Duración (años)',
    fr: 'Durée (années)',
    de: 'Dauer (Jahre)',
    zh: '持续时间（年）'
  },
  pacAllocation: {
    it: 'Allocazione PAC',
    en: 'PAC Allocation',
    es: 'Asignación PAC',
    fr: 'Allocation PAC',
    de: 'PAC-Allokation',
    zh: 'PAC配置'
  },
  activePacs: {
    it: 'PAC Attivi',
    en: 'Active PACs',
    es: 'PACs Activos',
    fr: 'PACs Actifs',
    de: 'Aktive PACs',
    zh: '活跃PAC'
  },
  noPacsMessage: {
    it: 'Crea il tuo primo piano di accumulo per iniziare a investire regolarmente',
    en: 'Create your first accumulation plan to start investing regularly',
    es: 'Crea tu primer plan de acumulación para empezar a invertir regularmente',
    fr: 'Créez votre premier plan d\'accumulation pour commencer à investir régulièrement',
    de: 'Erstellen Sie Ihren ersten Sparplan, um regelmäßig zu investieren',
    zh: '创建您的第一个积累计划以开始定期投资'
  },
  pacProjection: {
    it: 'Proiezione PAC',
    en: 'PAC Projection',
    es: 'Proyección PAC',
    fr: 'Projection PAC',
    de: 'PAC-Projektion',
    zh: 'PAC预测'
  },
  totalInvested: {
    it: 'Totale Investito',
    en: 'Total Invested',
    es: 'Total Invertido',
    fr: 'Total Investi',
    de: 'Gesamt Investiert',
    zh: '总投资'
  },
  portfolioValue: {
    it: 'Valore Portfolio',
    en: 'Portfolio Value',
    es: 'Valor del Portafolio',
    fr: 'Valeur du Portefeuille',
    de: 'Portfolio-Wert',
    zh: '投资组合价值'
  },
  totalGain: {
    it: 'Guadagno Totale',
    en: 'Total Gain',
    es: 'Ganancia Total',
    fr: 'Gain Total',
    de: 'Gesamtgewinn',
    zh: '总收益'
  },
  compoundEffect: {
    it: 'Effetto Compound',
    en: 'Compound Effect',
    es: 'Efecto Compuesto',
    fr: 'Effet de Composition',
    de: 'Zinseszinseffekt',
    zh: '复利效应'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[language] || translation['it'] || key;
};