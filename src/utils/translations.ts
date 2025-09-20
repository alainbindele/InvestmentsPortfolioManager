export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'zh';

const TRANSLATIONS = {
  // Navigation and UI
  portfolioBalancer: {
    it: 'Portfolio Balancer',
    en: 'Portfolio Balancer',
    es: 'Balanceador de Cartera',
    fr: 'Équilibreur de Portefeuille',
    de: 'Portfolio-Balancer',
    zh: '投资组合平衡器'
  },
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
  
  // Asset form fields
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
  currentValue: {
    it: 'Valore Attuale',
    en: 'Current Value',
    es: 'Valor Actual',
    fr: 'Valeur Actuelle',
    de: 'Aktueller Wert',
    zh: '当前价值'
  },
  expectedReturn: {
    it: 'Rendimento Atteso (%)',
    en: 'Expected Return (%)',
    es: 'Rendimiento Esperado (%)',
    fr: 'Rendement Attendu (%)',
    de: 'Erwartete Rendite (%)',
    zh: '预期收益率 (%)'
  },
  riskLevel: {
    it: 'Livello di Rischio',
    en: 'Risk Level',
    es: 'Nivel de Riesgo',
    fr: 'Niveau de Risque',
    de: 'Risikolevel',
    zh: '风险等级'
  },
  
  // Risk levels
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
  real_estate: {
    it: 'Immobiliare',
    en: 'Real Estate',
    es: 'Bienes Raíces',
    fr: 'Immobilier',
    de: 'Immobilien',
    zh: '房地产'
  },
  commodities: {
    it: 'Materie Prime',
    en: 'Commodities',
    es: 'Materias Primas',
    fr: 'Matières Premières',
    de: 'Rohstoffe',
    zh: '大宗商品'
  },
  crypto: {
    it: 'Criptovalute',
    en: 'Cryptocurrency',
    es: 'Criptomonedas',
    fr: 'Cryptomonnaies',
    de: 'Kryptowährungen',
    zh: '加密货币'
  },
  cash: {
    it: 'Liquidità',
    en: 'Cash',
    es: 'Efectivo',
    fr: 'Liquidités',
    de: 'Bargeld',
    zh: '现金'
  },
  other: {
    it: 'Altro',
    en: 'Other',
    es: 'Otro',
    fr: 'Autre',
    de: 'Andere',
    zh: '其他'
  },
  
  // Buttons and actions
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
  delete: {
    it: 'Elimina',
    en: 'Delete',
    es: 'Eliminar',
    fr: 'Supprimer',
    de: 'Löschen',
    zh: '删除'
  },
  edit: {
    it: 'Modifica',
    en: 'Edit',
    es: 'Editar',
    fr: 'Modifier',
    de: 'Bearbeiten',
    zh: '编辑'
  },
  
  // Portfolio metrics
  totalValue: {
    it: 'Valore Totale',
    en: 'Total Value',
    es: 'Valor Total',
    fr: 'Valeur Totale',
    de: 'Gesamtwert',
    zh: '总价值'
  },
  expectedReturnLabel: {
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
  diversificationScore: {
    it: 'Diversificazione',
    en: 'Diversification',
    es: 'Diversificación',
    fr: 'Diversification',
    de: 'Diversifikation',
    zh: '多样化'
  },
  
  // Strategy related
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
    fr: 'Votre allocation de portefeuille actuelle',
    de: 'Ihre aktuelle Portfolio-Allokation',
    zh: '您当前的投资组合配置'
  },
  
  // Lock/unlock tooltips
  lockAsset: {
    it: 'Blocca asset',
    en: 'Lock asset',
    es: 'Bloquear activo',
    fr: 'Verrouiller l\'actif',
    de: 'Asset sperren',
    zh: '锁定资产'
  },
  unlockAsset: {
    it: 'Sblocca asset',
    en: 'Unlock asset',
    es: 'Desbloquear activo',
    fr: 'Déverrouiller l\'actif',
    de: 'Asset entsperren',
    zh: '解锁资产'
  },
  
  // Table headers
  name: {
    it: 'Nome',
    en: 'Name',
    es: 'Nombre',
    fr: 'Nom',
    de: 'Name',
    zh: '名称'
  },
  type: {
    it: 'Tipo',
    en: 'Type',
    es: 'Tipo',
    fr: 'Type',
    de: 'Typ',
    zh: '类型'
  },
  value: {
    it: 'Valore',
    en: 'Value',
    es: 'Valor',
    fr: 'Valeur',
    de: 'Wert',
    zh: '价值'
  },
  allocation: {
    it: 'Allocazione',
    en: 'Allocation',
    es: 'Asignación',
    fr: 'Allocation',
    de: 'Allokation',
    zh: '配置'
  },
  returnRate: {
    it: 'Rendimento',
    en: 'Return',
    es: 'Rendimiento',
    fr: 'Rendement',
    de: 'Rendite',
    zh: '收益率'
  },
  risk: {
    it: 'Rischio',
    en: 'Risk',
    es: 'Riesgo',
    fr: 'Risque',
    de: 'Risiko',
    zh: '风险'
  },
  actions: {
    it: 'Azioni',
    en: 'Actions',
    es: 'Acciones',
    fr: 'Actions',
    de: 'Aktionen',
    zh: '操作'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  const translation = TRANSLATIONS[key as keyof typeof TRANSLATIONS];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  return translation[language] || translation.en || key;
};

export { TRANSLATIONS };