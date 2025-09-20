export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'zh';

const TRANSLATIONS = {
  // App basics
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
  seoDescription: {
    it: 'Strumento avanzato per l\'ottimizzazione e il ribilanciamento di portafogli di investimento con intelligenza artificiale',
    en: 'Advanced tool for portfolio optimization and rebalancing with artificial intelligence',
    es: 'Herramienta avanzada para optimización y rebalanceo de carteras con inteligencia artificial',
    fr: 'Outil avancé pour l\'optimisation et le rééquilibrage de portefeuilles avec intelligence artificielle',
    de: 'Erweiterte Tool für Portfolio-Optimierung und Neugewichtung mit künstlicher Intelligenz',
    zh: '使用人工智能进行投资组合优化和再平衡的高级工具'
  },
  seoKeywords: {
    it: 'portfolio balancer, investimenti, AI, ribilanciamento, PAC, piano accumulo capitale, ETF, azioni, obbligazioni, diversificazione',
    en: 'portfolio balancer, investments, AI, rebalancing, DCA, dollar cost averaging, ETF, stocks, bonds, diversification',
    es: 'balanceador de cartera, inversiones, IA, rebalanceo, DCA, promedio de costo, ETF, acciones, bonos, diversificación',
    fr: 'équilibreur de portefeuille, investissements, IA, rééquilibrage, DCA, moyenne des coûts, ETF, actions, obligations, diversification',
    de: 'Portfolio-Balancer, Investitionen, KI, Neugewichtung, DCA, Durchschnittskosteneffekt, ETF, Aktien, Anleihen, Diversifikation',
    zh: '投资组合平衡器, 投资, 人工智能, 再平衡, 定投, 平均成本法, ETF, 股票, 债券, 多元化'
  },

  // Navigation
  portfolio: {
    it: 'Portfolio',
    en: 'Portfolio',
    es: 'Cartera',
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
    zh: '策略'
  },
  aiAssistant: {
    it: 'AI Assistant',
    en: 'AI Assistant',
    es: 'Asistente IA',
    fr: 'Assistant IA',
    de: 'KI-Assistent',
    zh: 'AI助手'
  },

  // Asset form
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
  expectedReturnLabel: {
    it: 'Rendimento Atteso (%)',
    en: 'Expected Return (%)',
    es: 'Rendimiento Esperado (%)',
    fr: 'Rendement Attendu (%)',
    de: 'Erwartete Rendite (%)',
    zh: '预期收益 (%)'
  },
  riskLevel: {
    it: 'Livello di Rischio',
    en: 'Risk Level',
    es: 'Nivel de Riesgo',
    fr: 'Niveau de Risque',
    de: 'Risikolevel',
    zh: '风险等级'
  },
  cancel: {
    it: 'Annulla',
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    de: 'Abbrechen',
    zh: '取消'
  },
  addAssetButton: {
    it: 'Aggiungi',
    en: 'Add',
    es: 'Agregar',
    fr: 'Ajouter',
    de: 'Hinzufügen',
    zh: '添加'
  },
  updateAsset: {
    it: 'Aggiorna Asset',
    en: 'Update Asset',
    es: 'Actualizar Activo',
    fr: 'Mettre à jour l\'Actif',
    de: 'Asset aktualisieren',
    zh: '更新资产'
  },
  fillAllRequiredFields: {
    it: 'Compila tutti i campi obbligatori',
    en: 'Fill all required fields',
    es: 'Completa todos los campos obligatorios',
    fr: 'Remplissez tous les champs obligatoires',
    de: 'Füllen Sie alle Pflichtfelder aus',
    zh: '填写所有必填字段'
  },

  // Asset types
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
    en: 'Crypto',
    es: 'Criptomonedas',
    fr: 'Crypto',
    de: 'Krypto',
    zh: '加密货币'
  },
  real_estate: {
    it: 'Immobiliare',
    en: 'Real Estate',
    es: 'Inmobiliario',
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

  // Risk levels
  very_low: {
    it: 'Molto Basso',
    en: 'Very Low',
    es: 'Muy Bajo',
    fr: 'Très Bas',
    de: 'Sehr Niedrig',
    zh: '很低'
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
    zh: '很高'
  },

  // Portfolio metrics
  portfolioAllocation: {
    it: 'Allocazione Portfolio',
    en: 'Portfolio Allocation',
    es: 'Asignación de Cartera',
    fr: 'Allocation du Portefeuille',
    de: 'Portfolio-Allokation',
    zh: '投资组合配置'
  },
  portfolioMetrics: {
    it: 'Metriche Portfolio',
    en: 'Portfolio Metrics',
    es: 'Métricas de Cartera',
    fr: 'Métriques du Portefeuille',
    de: 'Portfolio-Metriken',
    zh: '投资组合指标'
  },
  totalValue: {
    it: 'Valore Totale',
    en: 'Total Value',
    es: 'Valor Total',
    fr: 'Valeur Totale',
    de: 'Gesamtwert',
    zh: '总价值'
  },
  expectedReturn: {
    it: 'Rendimento Atteso',
    en: 'Expected Return',
    es: 'Rendimiento Esperado',
    fr: 'Rendement Attendu',
    de: 'Erwartete Rendite',
    zh: '预期收益'
  },
  riskScore: {
    it: 'Punteggio Rischio',
    en: 'Risk Score',
    es: 'Puntuación de Riesgo',
    fr: 'Score de Risque',
    de: 'Risiko-Score',
    zh: '风险评分'
  },
  diversification: {
    it: 'Diversificazione',
    en: 'Diversification',
    es: 'Diversificación',
    fr: 'Diversification',
    de: 'Diversifikation',
    zh: '多元化'
  },
  assetsList: {
    it: 'Lista Asset',
    en: 'Assets List',
    es: 'Lista de Activos',
    fr: 'Liste des Actifs',
    de: 'Asset-Liste',
    zh: '资产列表'
  },
  asset: {
    it: 'Asset',
    en: 'Asset',
    es: 'Activo',
    fr: 'Actif',
    de: 'Asset',
    zh: '资产'
  },
  type: {
    it: 'Tipo',
    en: 'Type',
    es: 'Tipo',
    fr: 'Type',
    de: 'Typ',
    zh: '类型'
  },
  allocation: {
    it: 'Allocazione',
    en: 'Allocation',
    es: 'Asignación',
    fr: 'Allocation',
    de: 'Allokation',
    zh: '配置'
  },
  actions: {
    it: 'Azioni',
    en: 'Actions',
    es: 'Acciones',
    fr: 'Actions',
    de: 'Aktionen',
    zh: '操作'
  },
  confirmDeleteAsset: {
    it: 'Sei sicuro di voler eliminare questo asset?',
    en: 'Are you sure you want to delete this asset?',
    es: '¿Estás seguro de que quieres eliminar este activo?',
    fr: 'Êtes-vous sûr de vouloir supprimer cet actif?',
    de: 'Sind Sie sicher, dass Sie dieses Asset löschen möchten?',
    zh: '您确定要删除此资产吗？'
  },

  // Asset locking
  lockAsset: {
    it: 'Blocca Asset',
    en: 'Lock Asset',
    es: 'Bloquear Activo',
    fr: 'Verrouiller l\'Actif',
    de: 'Asset sperren',
    zh: '锁定资产'
  },
  unlockAsset: {
    it: 'Sblocca Asset',
    en: 'Unlock Asset',
    es: 'Desbloquear Activo',
    fr: 'Déverrouiller l\'Actif',
    de: 'Asset entsperren',
    zh: '解锁资产'
  },

  // Empty states
  noAssetsMessage: {
    it: 'Nessun asset nel portfolio',
    en: 'No assets in portfolio',
    es: 'No hay activos en la cartera',
    fr: 'Aucun actif dans le portefeuille',
    de: 'Keine Assets im Portfolio',
    zh: '投资组合中没有资产'
  },
  noAssetsTitle: {
    it: 'Inizia a costruire il tuo portfolio',
    en: 'Start building your portfolio',
    es: 'Comienza a construir tu cartera',
    fr: 'Commencez à construire votre portefeuille',
    de: 'Beginnen Sie mit dem Aufbau Ihres Portfolios',
    zh: '开始构建您的投资组合'
  },
  addFirstAsset: {
    it: 'Aggiungi il primo asset',
    en: 'Add first asset',
    es: 'Agregar primer activo',
    fr: 'Ajouter le premier actif',
    de: 'Erstes Asset hinzufügen',
    zh: '添加第一个资产'
  },
  noAssetsForAI: {
    it: 'Nessun asset per l\'analisi AI',
    en: 'No assets for AI analysis',
    es: 'No hay activos para análisis de IA',
    fr: 'Aucun actif pour l\'analyse IA',
    de: 'Keine Assets für KI-Analyse',
    zh: '没有资产进行AI分析'
  },
  addAssetsForAI: {
    it: 'Aggiungi alcuni asset per utilizzare l\'AI Assistant',
    en: 'Add some assets to use the AI Assistant',
    es: 'Agrega algunos activos para usar el Asistente de IA',
    fr: 'Ajoutez des actifs pour utiliser l\'Assistant IA',
    de: 'Fügen Sie Assets hinzu, um den KI-Assistenten zu verwenden',
    zh: '添加一些资产以使用AI助手'
  },

  // Current strategy
  currentStrategyName: {
    it: 'Strategia Attuale',
    en: 'Current Strategy',
    es: 'Estrategia Actual',
    fr: 'Stratégie Actuelle',
    de: 'Aktuelle Strategie',
    zh: '当前策略'
  },
  currentStrategyDescription: {
    it: 'La tua allocazione attuale del portfolio',
    en: 'Your current portfolio allocation',
    es: 'Tu asignación actual de cartera',
    fr: 'Votre allocation actuelle du portefeuille',
    de: 'Ihre aktuelle Portfolio-Allokation',
    zh: '您当前的投资组合配置'
  },

  // PAC (Piano di Accumulo del Capitale)
  enablePAC: {
    it: 'Abilita PAC',
    en: 'Enable DCA',
    es: 'Habilitar DCA',
    fr: 'Activer DCA',
    de: 'DCA aktivieren',
    zh: '启用定投'
  },
  pacFullName: {
    it: 'Piano di Accumulo del Capitale',
    en: 'Dollar Cost Averaging',
    es: 'Promedio de Costo en Dólares',
    fr: 'Moyenne des Coûts en Dollars',
    de: 'Durchschnittskosteneffekt',
    zh: '定期定额投资'
  },
  pacAmount: {
    it: 'Importo PAC',
    en: 'DCA Amount',
    es: 'Cantidad DCA',
    fr: 'Montant DCA',
    de: 'DCA-Betrag',
    zh: '定投金额'
  },
  pacFrequency: {
    it: 'Frequenza PAC',
    en: 'DCA Frequency',
    es: 'Frecuencia DCA',
    fr: 'Fréquence DCA',
    de: 'DCA-Häufigkeit',
    zh: '定投频率'
  },
  monthly: {
    it: 'Mensile',
    en: 'Monthly',
    es: 'Mensual',
    fr: 'Mensuel',
    de: 'Monatlich',
    zh: '每月'
  },
  quarterly: {
    it: 'Trimestrale',
    en: 'Quarterly',
    es: 'Trimestral',
    fr: 'Trimestriel',
    de: 'Vierteljährlich',
    zh: '每季度'
  },
  yearly: {
    it: 'Annuale',
    en: 'Yearly',
    es: 'Anual',
    fr: 'Annuel',
    de: 'Jährlich',
    zh: '每年'
  },
  pacNote: {
    it: 'Nota PAC',
    en: 'DCA Note',
    es: 'Nota DCA',
    fr: 'Note DCA',
    de: 'DCA-Hinweis',
    zh: '定投说明'
  },
  pacDescription: {
    it: 'Il PAC permette di investire importi fissi a intervalli regolari, riducendo l\'impatto della volatilità del mercato.',
    en: 'DCA allows you to invest fixed amounts at regular intervals, reducing the impact of market volatility.',
    es: 'DCA te permite invertir cantidades fijas a intervalos regulares, reduciendo el impacto de la volatilidad del mercado.',
    fr: 'DCA vous permet d\'investir des montants fixes à intervalles réguliers, réduisant l\'impact de la volatilité du marché.',
    de: 'DCA ermöglicht es Ihnen, feste Beträge in regelmäßigen Abständen zu investieren und reduziert die Auswirkungen der Marktvolatilität.',
    zh: '定投允许您定期投资固定金额，减少市场波动的影响。'
  },

  // Reset functionality
  reset: {
    it: 'Reset',
    en: 'Reset',
    es: 'Restablecer',
    fr: 'Réinitialiser',
    de: 'Zurücksetzen',
    zh: '重置'
  },
  resetData: {
    it: 'Resetta tutti i dati',
    en: 'Reset all data',
    es: 'Restablecer todos los datos',
    fr: 'Réinitialiser toutes les données',
    de: 'Alle Daten zurücksetzen',
    zh: '重置所有数据'
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
    it: 'Questa azione eliminerà tutti i tuoi dati.',
    en: 'This action will delete all your data.',
    es: 'Esta acción eliminará todos tus datos.',
    fr: 'Cette action supprimera toutes vos données.',
    de: 'Diese Aktion löscht alle Ihre Daten.',
    zh: '此操作将删除您的所有数据。'
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
    it: 'Elimina Tutto',
    en: 'Delete All',
    es: 'Eliminar Todo',
    fr: 'Tout Supprimer',
    de: 'Alles Löschen',
    zh: '删除全部'
  },

  // Projections and charts
  projectedGrowth: {
    it: 'Crescita Proiettata',
    en: 'Projected Growth',
    es: 'Crecimiento Proyectado',
    fr: 'Croissance Projetée',
    de: 'Projiziertes Wachstum',
    zh: '预期增长'
  },
  timeHorizon: {
    it: 'Orizzonte Temporale',
    en: 'Time Horizon',
    es: 'Horizonte Temporal',
    fr: 'Horizon Temporel',
    de: 'Zeithorizont',
    zh: '时间范围'
  },
  years: {
    it: 'anni',
    en: 'years',
    es: 'años',
    fr: 'années',
    de: 'Jahre',
    zh: '年'
  },
  year: {
    it: 'Anno',
    en: 'Year',
    es: 'Año',
    fr: 'Année',
    de: 'Jahr',
    zh: '年'
  },
  anno: {
    it: 'Anno',
    en: 'Year',
    es: 'Año',
    fr: 'Année',
    de: 'Jahr',
    zh: '年'
  },
  value: {
    it: 'Valore',
    en: 'Value',
    es: 'Valor',
    fr: 'Valeur',
    de: 'Wert',
    zh: '价值'
  },
  portfolioProjection: {
    it: 'Proiezione Portfolio',
    en: 'Portfolio Projection',
    es: 'Proyección de Cartera',
    fr: 'Projection du Portefeuille',
    de: 'Portfolio-Projektion',
    zh: '投资组合预测'
  },
  growthProjectionComparison: {
    it: 'Confronto delle proiezioni di crescita tra strategie',
    en: 'Growth projection comparison between strategies',
    es: 'Comparación de proyecciones de crecimiento entre estrategias',
    fr: 'Comparaison des projections de croissance entre stratégies',
    de: 'Vergleich der Wachstumsprojektionen zwischen Strategien',
    zh: '策略间增长预测比较'
  },
  singleAssetProjection: {
    it: 'Proiezione singolo asset:',
    en: 'Single asset projection:',
    es: 'Proyección de activo único:',
    fr: 'Projection d\'actif unique:',
    de: 'Einzelne Asset-Projektion:',
    zh: '单一资产预测：'
  },
  selectAssetToAnalyze: {
    it: 'Seleziona asset da analizzare',
    en: 'Select asset to analyze',
    es: 'Seleccionar activo para analizar',
    fr: 'Sélectionner l\'actif à analyser',
    de: 'Asset zur Analyse auswählen',
    zh: '选择要分析的资产'
  },
  entirePortfolio: {
    it: 'Intero Portfolio',
    en: 'Entire Portfolio',
    es: 'Cartera Completa',
    fr: 'Portefeuille Entier',
    de: 'Gesamtes Portfolio',
    zh: '整个投资组合'
  },

  // Strategy related
  investmentStrategies: {
    it: 'Strategie di Investimento',
    en: 'Investment Strategies',
    es: 'Estrategias de Inversión',
    fr: 'Stratégies d\'Investissement',
    de: 'Anlagestrategien',
    zh: '投资策略'
  },
  selectedStrategy: {
    it: 'Strategia Selezionata',
    en: 'Selected Strategy',
    es: 'Estrategia Seleccionada',
    fr: 'Stratégie Sélectionnée',
    de: 'Ausgewählte Strategie',
    zh: '选定策略'
  },
  strategyComparison: {
    it: 'Confronto Strategie',
    en: 'Strategy Comparison',
    es: 'Comparación de Estrategias',
    fr: 'Comparaison des Stratégies',
    de: 'Strategievergleich',
    zh: '策略比较'
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
  return: {
    it: 'Rendimento',
    en: 'Return',
    es: 'Rendimiento',
    fr: 'Rendement',
    de: 'Rendite',
    zh: '收益'
  },
  risk: {
    it: 'Rischio',
    en: 'Risk',
    es: 'Riesgo',
    fr: 'Risque',
    de: 'Risiko',
    zh: '风险'
  },
  sharpe: {
    it: 'Sharpe',
    en: 'Sharpe',
    es: 'Sharpe',
    fr: 'Sharpe',
    de: 'Sharpe',
    zh: 'Sharpe'
  },
  sharpeRatio: {
    it: 'Sharpe Ratio',
    en: 'Sharpe Ratio',
    es: 'Ratio de Sharpe',
    fr: 'Ratio de Sharpe',
    de: 'Sharpe-Verhältnis',
    zh: '夏普比率'
  },
  volatility: {
    it: 'Volatilità',
    en: 'Volatility',
    es: 'Volatilidad',
    fr: 'Volatilité',
    de: 'Volatilität',
    zh: '波动率'
  },
  maxDrawdown: {
    it: 'Max Drawdown',
    en: 'Max Drawdown',
    es: 'Máximo Drawdown',
    fr: 'Drawdown Maximum',
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
    de: 'Bester Sharpe',
    zh: '最佳夏普'
  },
  allocationTarget: {
    it: 'Allocazione Target',
    en: 'Target Allocation',
    es: 'Asignación Objetivo',
    fr: 'Allocation Cible',
    de: 'Ziel-Allokation',
    zh: '目标配置'
  },
  totalPortfolio: {
    it: 'Portfolio Totale',
    en: 'Total Portfolio',
    es: 'Cartera Total',
    fr: 'Portefeuille Total',
    de: 'Gesamtes Portfolio',
    zh: '总投资组合'
  },
  selectedForComparison: {
    it: 'Selezionata per confronto',
    en: 'Selected for comparison',
    es: 'Seleccionada para comparación',
    fr: 'Sélectionnée pour comparaison',
    de: 'Für Vergleich ausgewählt',
    zh: '已选择进行比较'
  },
  cloneAndEdit: {
    it: 'Clona e Modifica',
    en: 'Clone & Edit',
    es: 'Clonar y Editar',
    fr: 'Cloner et Modifier',
    de: 'Klonen & Bearbeiten',
    zh: '克隆并编辑'
  },

  // Sharpe Ratio tooltips
  sharpeRatioTitle: {
    it: 'Sharpe Ratio',
    en: 'Sharpe Ratio',
    es: 'Ratio de Sharpe',
    fr: 'Ratio de Sharpe',
    de: 'Sharpe-Verhältnis',
    zh: '夏普比率'
  },
  sharpeRatioDescription: {
    it: 'Misura il rendimento aggiustato per il rischio. Più alto è meglio.',
    en: 'Measures risk-adjusted return. Higher is better.',
    es: 'Mide el rendimiento ajustado por riesgo. Más alto es mejor.',
    fr: 'Mesure le rendement ajusté au risque. Plus élevé est mieux.',
    de: 'Misst die risikoadjustierte Rendite. Höher ist besser.',
    zh: '衡量风险调整后的收益。越高越好。'
  },
  interpretation: {
    it: 'Interpretazione',
    en: 'Interpretation',
    es: 'Interpretación',
    fr: 'Interprétation',
    de: 'Interpretation',
    zh: '解释'
  },
  sharpeExcellent: {
    it: 'Eccellente',
    en: 'Excellent',
    es: 'Excelente',
    fr: 'Excellent',
    de: 'Ausgezeichnet',
    zh: '优秀'
  },
  sharpeGood: {
    it: 'Buono',
    en: 'Good',
    es: 'Bueno',
    fr: 'Bon',
    de: 'Gut',
    zh: '良好'
  },
  sharpeAcceptable: {
    it: 'Accettabile',
    en: 'Acceptable',
    es: 'Aceptable',
    fr: 'Acceptable',
    de: 'Akzeptabel',
    zh: '可接受'
  },
  sharpePoor: {
    it: 'Scarso',
    en: 'Poor',
    es: 'Pobre',
    fr: 'Pauvre',
    de: 'Schlecht',
    zh: '差'
  },
  example: {
    it: 'Esempio',
    en: 'Example',
    es: 'Ejemplo',
    fr: 'Exemple',
    de: 'Beispiel',
    zh: '示例'
  },
  sharpeExample: {
    it: 'Un Sharpe di 1.2 significa che per ogni unità di rischio, ottieni 1.2 unità di rendimento extra.',
    en: 'A Sharpe of 1.2 means for every unit of risk, you get 1.2 units of extra return.',
    es: 'Un Sharpe de 1.2 significa que por cada unidad de riesgo, obtienes 1.2 unidades de rendimiento extra.',
    fr: 'Un Sharpe de 1.2 signifie que pour chaque unité de risque, vous obtenez 1.2 unités de rendement supplémentaire.',
    de: 'Ein Sharpe von 1.2 bedeutet, dass Sie für jede Risikoeinheit 1.2 Einheiten zusätzliche Rendite erhalten.',
    zh: '夏普比率1.2意味着每承担一单位风险，您获得1.2单位的额外收益。'
  },
  swipeToSeeMore: {
    it: 'Scorri per vedere tutti i dati',
    en: 'Swipe to see all data',
    es: 'Desliza para ver todos los datos',
    fr: 'Glissez pour voir toutes les données',
    de: 'Wischen Sie, um alle Daten zu sehen',
    zh: '滑动查看所有数据'
  },
  current: {
    it: 'Attuale',
    en: 'Current',
    es: 'Actual',
    fr: 'Actuel',
    de: 'Aktuell',
    zh: '当前'
  },
  target: {
    it: 'Target',
    en: 'Target',
    es: 'Objetivo',
    fr: 'Cible',
    de: 'Ziel',
    zh: '目标'
  },

  // AI Assistant
  aiPortfolioAnalysis: {
    it: 'Analisi Portfolio AI',
    en: 'AI Portfolio Analysis',
    es: 'Análisis de Cartera IA',
    fr: 'Analyse de Portefeuille IA',
    de: 'KI-Portfolio-Analyse',
    zh: 'AI投资组合分析'
  },
  analyzing: {
    it: 'Analizzando...',
    en: 'Analyzing...',
    es: 'Analizando...',
    fr: 'Analyse en cours...',
    de: 'Analysiere...',
    zh: '分析中...'
  },
  analyzePortfolio: {
    it: 'Analizza Portfolio',
    en: 'Analyze Portfolio',
    es: 'Analizar Cartera',
    fr: 'Analyser le Portefeuille',
    de: 'Portfolio analysieren',
    zh: '分析投资组合'
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
  aiStrategyGeneration: {
    it: 'Generazione Strategia AI',
    en: 'AI Strategy Generation',
    es: 'Generación de Estrategia IA',
    fr: 'Génération de Stratégie IA',
    de: 'KI-Strategiegenerierung',
    zh: 'AI策略生成'
  },
  riskProfile: {
    it: 'Profilo di Rischio',
    en: 'Risk Profile',
    es: 'Perfil de Riesgo',
    fr: 'Profil de Risque',
    de: 'Risikoprofil',
    zh: '风险档案'
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
    zh: '多元化'
  },
  inflationProtection: {
    it: 'Protezione dall\'Inflazione',
    en: 'Inflation Protection',
    es: 'Protección contra la Inflación',
    fr: 'Protection contre l\'Inflation',
    de: 'Inflationsschutz',
    zh: '通胀保护'
  },
  generatingStrategy: {
    it: 'Generando strategia...',
    en: 'Generating strategy...',
    es: 'Generando estrategia...',
    fr: 'Génération de stratégie...',
    de: 'Strategie wird generiert...',
    zh: '生成策略中...'
  },
  generateStrategy: {
    it: 'Genera Strategia',
    en: 'Generate Strategy',
    es: 'Generar Estrategia',
    fr: 'Générer une Stratégie',
    de: 'Strategie generieren',
    zh: '生成策略'
  },
  generateRealAiStrategy: {
    it: 'Genera Strategia AI Reale',
    en: 'Generate Real AI Strategy',
    es: 'Generar Estrategia IA Real',
    fr: 'Générer une Vraie Stratégie IA',
    de: 'Echte KI-Strategie generieren',
    zh: '生成真实AI策略'
  },
  noAssetsToAnalyze: {
    it: 'Nessun asset da analizzare. Aggiungi prima alcuni asset.',
    en: 'No assets to analyze. Add some assets first.',
    es: 'No hay activos para analizar. Agrega algunos activos primero.',
    fr: 'Aucun actif à analyser. Ajoutez d\'abord des actifs.',
    de: 'Keine Assets zu analysieren. Fügen Sie zuerst Assets hinzu.',
    zh: '没有资产可分析。请先添加一些资产。'
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
    it: 'API key OpenAI non configurata. Verrà utilizzata una strategia di fallback.',
    en: 'OpenAI API key not configured. A fallback strategy will be used.',
    es: 'Clave API de OpenAI no configurada. Se utilizará una estrategia de respaldo.',
    fr: 'Clé API OpenAI non configurée. Une stratégie de secours sera utilisée.',
    de: 'OpenAI API-Schlüssel nicht konfiguriert. Eine Fallback-Strategie wird verwendet.',
    zh: '未配置OpenAI API密钥。将使用备用策略。'
  },
  fallbackStrategyNote: {
    it: 'Le strategie di fallback sono basate su regole predefinite.',
    en: 'Fallback strategies are based on predefined rules.',
    es: 'Las estrategias de respaldo se basan en reglas predefinidas.',
    fr: 'Les stratégies de secours sont basées sur des règles prédéfinies.',
    de: 'Fallback-Strategien basieren auf vordefinierten Regeln.',
    zh: '备用策略基于预定义规则。'
  },
  aiActive: {
    it: 'AI Attiva',
    en: 'AI Active',
    es: 'IA Activa',
    fr: 'IA Active',
    de: 'KI Aktiv',
    zh: 'AI激活'
  },
  aiAssistantDescription: {
    it: 'Utilizza l\'intelligenza artificiale per analizzare il tuo portfolio e generare strategie ottimizzate',
    en: 'Use artificial intelligence to analyze your portfolio and generate optimized strategies',
    es: 'Utiliza inteligencia artificial para analizar tu cartera y generar estrategias optimizadas',
    fr: 'Utilisez l\'intelligence artificielle pour analyser votre portefeuille et générer des stratégies optimisées',
    de: 'Nutzen Sie künstliche Intelligenz, um Ihr Portfolio zu analysieren und optimierte Strategien zu generieren',
    zh: '使用人工智能分析您的投资组合并生成优化策略'
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
    it: 'Prima di utilizzare Portfolio Balancer',
    en: 'Before using Portfolio Balancer',
    es: 'Antes de usar Portfolio Balancer',
    fr: 'Avant d\'utiliser Portfolio Balancer',
    de: 'Vor der Nutzung von Portfolio Balancer',
    zh: '使用Portfolio Balancer之前'
  },
  disclaimerAcceptance: {
    it: 'Ho letto e compreso l\'avviso e accetto di utilizzare lo strumento sotto la mia responsabilità',
    en: 'I have read and understood the notice and agree to use the tool at my own responsibility',
    es: 'He leído y entendido el aviso y acepto usar la herramienta bajo mi responsabilidad',
    fr: 'J\'ai lu et compris l\'avis et j\'accepte d\'utiliser l\'outil sous ma responsabilité',
    de: 'Ich habe den Hinweis gelesen und verstanden und stimme zu, das Tool auf eigene Verantwortung zu nutzen',
    zh: '我已阅读并理解此通知，同意自行承担使用此工具的责任'
  },
  continue: {
    it: 'Continua',
    en: 'Continue',
    es: 'Continuar',
    fr: 'Continuer',
    de: 'Weiter',
    zh: '继续'
  },

  // Cookie consent
  cookieConsentTitle: {
    it: 'Utilizzo dei Cookie',
    en: 'Cookie Usage',
    es: 'Uso de Cookies',
    fr: 'Utilisation des Cookies',
    de: 'Cookie-Nutzung',
    zh: 'Cookie使用'
  },
  cookieConsentMessage: {
    it: 'Utilizziamo cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.',
    en: 'We use cookies to improve your experience, analyze traffic, and personalize content.',
    es: 'Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.',
    fr: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
    de: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Traffic zu analysieren und Inhalte zu personalisieren.',
    zh: '我们使用Cookie来改善您的体验、分析流量并个性化内容。'
  },
  cookieConsentDetails: {
    it: 'I dati vengono memorizzati localmente nel tuo browser e non vengono condivisi con terze parti.',
    en: 'Data is stored locally in your browser and is not shared with third parties.',
    es: 'Los datos se almacenan localmente en tu navegador y no se comparten con terceros.',
    fr: 'Les données sont stockées localement dans votre navigateur et ne sont pas partagées avec des tiers.',
    de: 'Daten werden lokal in Ihrem Browser gespeichert und nicht an Dritte weitergegeben.',
    zh: '数据存储在您的浏览器本地，不会与第三方共享。'
  },
  acceptCookies: {
    it: 'Accetta Cookie',
    en: 'Accept Cookies',
    es: 'Aceptar Cookies',
    fr: 'Accepter les Cookies',
    de: 'Cookies akzeptieren',
    zh: '接受Cookie'
  },
  decline: {
    it: 'Rifiuta',
    en: 'Decline',
    es: 'Rechazar',
    fr: 'Refuser',
    de: 'Ablehnen',
    zh: '拒绝'
  },

  // Strategy editing
  editAllocation: {
    it: 'Modifica Allocazione',
    en: 'Edit Allocation',
    es: 'Editar Asignación',
    fr: 'Modifier l\'Allocation',
    de: 'Allokation bearbeiten',
    zh: '编辑配置'
  },
  adjustAllocations: {
    it: 'Regola le Allocazioni',
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
    it: 'L\'allocazione totale supera il 100%. Riduci alcune allocazioni.',
    en: 'Total allocation exceeds 100%. Reduce some allocations.',
    es: 'La asignación total supera el 100%. Reduce algunas asignaciones.',
    fr: 'L\'allocation totale dépasse 100%. Réduisez certaines allocations.',
    de: 'Die Gesamtallokation übersteigt 100%. Reduzieren Sie einige Allokationen.',
    zh: '总配置超过100%。请减少一些配置。'
  },
  allocationTooLow: {
    it: 'L\'allocazione totale è inferiore al 100%.',
    en: 'Total allocation is less than 100%.',
    es: 'La asignación total es menor al 100%.',
    fr: 'L\'allocation totale est inférieure à 100%.',
    de: 'Die Gesamtallokation ist weniger als 100%.',
    zh: '总配置少于100%。'
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
  modifiedStrategy: {
    it: 'Strategia Modificata',
    en: 'Modified Strategy',
    es: 'Estrategia Modificada',
    fr: 'Stratégie Modifiée',
    de: 'Modifizierte Strategie',
    zh: '修改后的策略'
  },
  modifiedStrategyDescription: {
    it: 'Strategia personalizzata basata sulla tua allocazione attuale',
    en: 'Custom strategy based on your current allocation',
    es: 'Estrategia personalizada basada en tu asignación actual',
    fr: 'Stratégie personnalisée basée sur votre allocation actuelle',
    de: 'Benutzerdefinierte Strategie basierend auf Ihrer aktuellen Allokation',
    zh: '基于您当前配置的自定义策略'
  },
  modifiedStrategyPrefix: {
    it: 'Modificata:',
    en: 'Modified:',
    es: 'Modificada:',
    fr: 'Modifiée:',
    de: 'Modifiziert:',
    zh: '已修改：'
  },
  modified: {
    it: 'Modificata',
    en: 'Modified',
    es: 'Modificada',
    fr: 'Modifiée',
    de: 'Modifiziert',
    zh: '已修改'
  },
  max: {
    it: 'Max',
    en: 'Max',
    es: 'Máx',
    fr: 'Max',
    de: 'Max',
    zh: '最大'
  },
  azzera: {
    it: 'Azzera',
    en: 'Zero',
    es: 'Cero',
    fr: 'Zéro',
    de: 'Null',
    zh: '清零'
  },
  usaRimanente: {
    it: 'Usa rimanente',
    en: 'Use remaining',
    es: 'Usar restante',
    fr: 'Utiliser le reste',
    de: 'Rest verwenden',
    zh: '使用剩余'
  },

  // Strategy management
  editName: {
    it: 'Modifica nome',
    en: 'Edit name',
    es: 'Editar nombre',
    fr: 'Modifier le nom',
    de: 'Name bearbeiten',
    zh: '编辑名称'
  },
  deleteStrategy: {
    it: 'Elimina strategia',
    en: 'Delete strategy',
    es: 'Eliminar estrategia',
    fr: 'Supprimer la stratégie',
    de: 'Strategie löschen',
    zh: '删除策略'
  },
  confirmDeleteStrategy: {
    it: 'Elimina Strategia?',
    en: 'Delete Strategy?',
    es: '¿Eliminar Estrategia?',
    fr: 'Supprimer la Stratégie?',
    de: 'Strategie löschen?',
    zh: '删除策略？'
  },
  deleteStrategyWarning: {
    it: 'Questa azione non può essere annullata.',
    en: 'This action cannot be undone.',
    es: 'Esta acción no se puede deshacer.',
    fr: 'Cette action ne peut pas être annulée.',
    de: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    zh: '此操作无法撤销。'
  },
  delete: {
    it: 'Elimina',
    en: 'Delete',
    es: 'Eliminar',
    fr: 'Supprimer',
    de: 'Löschen',
    zh: '删除'
  },
  save: {
    it: 'Salva',
    en: 'Save',
    es: 'Guardar',
    fr: 'Sauvegarder',
    de: 'Speichern',
    zh: '保存'
  },

  // Fallback translations
  analisiAiCompletata: {
    it: 'Analisi AI completata con successo',
    en: 'AI analysis completed successfully',
    es: 'Análisis de IA completado con éxito',
    fr: 'Analyse IA terminée avec succès',
    de: 'KI-Analyse erfolgreich abgeschlossen',
    zh: 'AI分析成功完成'
  },
  raccomandazioniPersonalizzate: {
    it: 'Raccomandazioni personalizzate generate dall\'AI',
    en: 'Personalized recommendations generated by AI',
    es: 'Recomendaciones personalizadas generadas por IA',
    fr: 'Recommandations personnalisées générées par l\'IA',
    de: 'Personalisierte Empfehlungen von der KI generiert',
    zh: 'AI生成的个性化建议'
  },
  analisiAiNonDisponibile: {
    it: '⚠️ Analisi AI non disponibile - verifica la configurazione API',
    en: '⚠️ AI analysis not available - check API configuration',
    es: '⚠️ Análisis de IA no disponible - verifica la configuración de API',
    fr: '⚠️ Analyse IA non disponible - vérifiez la configuration API',
    de: '⚠️ KI-Analyse nicht verfügbar - API-Konfiguration prüfen',
    zh: '⚠️ AI分析不可用 - 请检查API配置'
  },
  diversificazioneDiscreta: {
    it: 'Il portafoglio mostra una diversificazione discreta tra asset class',
    en: 'The portfolio shows decent diversification across asset classes',
    es: 'La cartera muestra una diversificación decente entre clases de activos',
    fr: 'Le portefeuille montre une diversification correcte entre les classes d\'actifs',
    de: 'Das Portfolio zeigt eine angemessene Diversifikation zwischen Anlageklassen',
    zh: '投资组合在资产类别间显示出适度的多元化'
  },
  consideraRivedere: {
    it: 'Considera di rivedere l\'allocazione in base ai tuoi obiettivi di rischio',
    en: 'Consider reviewing allocation based on your risk objectives',
    es: 'Considera revisar la asignación basada en tus objetivos de riesgo',
    fr: 'Considérez réviser l\'allocation basée sur vos objectifs de risque',
    de: 'Erwägen Sie eine Überprüfung der Allokation basierend auf Ihren Risikozielen',
    zh: '考虑根据您的风险目标重新审视配置'
  },
  monitoraRegolarmente: {
    it: 'Monitora regolarmente le performance e riequilibra se necessario',
    en: 'Monitor performance regularly and rebalance if necessary',
    es: 'Monitorea el rendimiento regularmente y reequilibra si es necesario',
    fr: 'Surveillez régulièrement les performances et rééquilibrez si nécessaire',
    de: 'Überwachen Sie die Performance regelmäßig und rebalancieren Sie bei Bedarf',
    zh: '定期监控表现，必要时重新平衡'
  },
  analisiMercato: {
    it: 'Analisi di Mercato',
    en: 'Market Analysis',
    es: 'Análisis de Mercado',
    fr: 'Analyse de Marché',
    de: 'Marktanalyse',
    zh: '市场分析'
  },
  analisiAiTemporaneamente: {
    it: 'Analisi AI temporaneamente non disponibile. Configura l\'API key OpenAI per ottenere insights di mercato in tempo reale.',
    en: 'AI analysis temporarily unavailable. Configure OpenAI API key to get real-time market insights.',
    es: 'Análisis de IA temporalmente no disponible. Configura la clave API de OpenAI para obtener información de mercado en tiempo real.',
    fr: 'Analyse IA temporairement indisponible. Configurez la clé API OpenAI pour obtenir des informations de marché en temps réel.',
    de: 'KI-Analyse vorübergehend nicht verfügbar. Konfigurieren Sie den OpenAI API-Schlüssel für Echtzeit-Markteinblicke.',
    zh: 'AI分析暂时不可用。配置OpenAI API密钥以获取实时市场洞察。'
  },
  strategiaFallback: {
    it: 'Strategia di fallback - configura l\'API OpenAI per strategie AI personalizzate',
    en: 'Fallback strategy - configure OpenAI API for personalized AI strategies',
    es: 'Estrategia de respaldo - configura la API de OpenAI para estrategias de IA personalizadas',
    fr: 'Stratégie de secours - configurez l\'API OpenAI pour des stratégies IA personnalisées',
    de: 'Fallback-Strategie - konfigurieren Sie die OpenAI API für personalisierte KI-Strategien',
    zh: '备用策略 - 配置OpenAI API以获得个性化AI策略'
  },
  withLockedAssets: {
    it: 'con asset bloccati',
    en: 'with locked assets',
    es: 'con activos bloqueados',
    fr: 'avec actifs verrouillés',
    de: 'mit gesperrten Assets',
    zh: '包含锁定资产'
  },
  optimizedByAi: {
    it: 'ottimizzata dall\'AI per profilo',
    en: 'optimized by AI for profile',
    es: 'optimizada por IA para perfil',
    fr: 'optimisée par IA pour profil',
    de: 'von KI optimiert für Profil',
    zh: 'AI为档案优化'
  },
  nessunJsonTrovato: {
    it: 'Nessun JSON trovato nella risposta',
    en: 'No JSON found in response',
    es: 'No se encontró JSON en la respuesta',
    fr: 'Aucun JSON trouvé dans la réponse',
    de: 'Kein JSON in der Antwort gefunden',
    zh: '响应中未找到JSON'
  },
  analisiMercatoTemporaneamente: {
    it: 'Analisi di mercato per',
    en: 'Market analysis for',
    es: 'Análisis de mercado para',
    fr: 'Analyse de marché pour',
    de: 'Marktanalyse für',
    zh: '市场分析'
  },
  erroreRecupero: {
    it: 'Errore nel recupero della ricerca di mercato per',
    en: 'Error retrieving market research for',
    es: 'Error al recuperar la investigación de mercado para',
    fr: 'Erreur lors de la récupération de la recherche de marché pour',
    de: 'Fehler beim Abrufen der Marktforschung für',
    zh: '检索市场研究时出错'
  },
  verificaConfigurazioneApi: {
    it: 'Verifica la configurazione API.',
    en: 'Check API configuration.',
    es: 'Verifica la configuración de la API.',
    fr: 'Vérifiez la configuration de l\'API.',
    de: 'Überprüfen Sie die API-Konfiguration.',
    zh: '检查API配置。'
  },
  ricercaMercatoNonDisponibile: {
    it: 'Ricerca di mercato non disponibile per',
    en: 'Market research not available for',
    es: 'Investigación de mercado no disponible para',
    fr: 'Recherche de marché non disponible pour',
    de: 'Marktforschung nicht verfügbar für',
    zh: '市场研究不可用'
  },
  configuraApiKey: {
    it: 'Configura l\'API key OpenAI per insights in tempo reale.',
    en: 'Configure OpenAI API key for real-time insights.',
    es: 'Configura la clave API de OpenAI para información en tiempo real.',
    fr: 'Configurez la clé API OpenAI pour des informations en temps réel.',
    de: 'Konfigurieren Sie den OpenAI API-Schlüssel für Echtzeit-Einblicke.',
    zh: '配置OpenAI API密钥以获取实时洞察。'
  },
  rendimento: {
    it: 'Rendimento',
    en: 'Return',
    es: 'Rendimiento',
    fr: 'Rendement',
    de: 'Rendite',
    zh: '收益'
  },
  rischio: {
    it: 'Rischio',
    en: 'Risk',
    es: 'Riesgo',
    fr: 'Risque',
    de: 'Risiko',
    zh: '风险'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  const translation = TRANSLATIONS[key as keyof typeof TRANSLATIONS];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[language] || translation.it || key;
};

export { Language };