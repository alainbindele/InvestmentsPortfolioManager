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