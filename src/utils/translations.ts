export interface Translation {
  [key: string]: string | Translation;
}

export const translations: { [lang: string]: Translation } = {
  en: {
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategies',
    aiAssistant: 'AI Assistant',
    
    // Asset Management
    addAsset: 'Add Asset',
    assetName: 'Asset Name',
    assetType: 'Asset Type',
    currentValue: 'Current Value',
    expectedReturn: 'Expected Return (%)',
    riskLevel: 'Risk Level',
    isPAC: 'PAC Investment',
    pacAmount: 'PAC Amount',
    pacFrequency: 'PAC Frequency',
    
    // Asset Types
    stocks: 'Stocks',
    bonds: 'Bonds',
    etf: 'ETF',
    crypto: 'Cryptocurrency',
    real_estate: 'Real Estate',
    commodities: 'Commodities',
    cash: 'Cash',
    
    // Risk Levels
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // PAC Frequencies
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    biannual: 'Biannual',
    annual: 'Annual',
    
    // Portfolio Metrics
    totalValue: 'Total Value',
    expectedReturnLabel: 'Expected Return',
    riskScore: 'Risk Score',
    diversificationScore: 'Diversification Score',
    
    // Strategies
    generateStrategy: 'Generate AI Strategy',
    riskProfile: 'Risk Profile',
    conservative: 'Conservative',
    balanced: 'Balanced',
    aggressive: 'Aggressive',
    investmentGoals: 'Investment Goals',
    
    // Common
    add: 'Add',
    remove: 'Remove',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Charts
    allocation: 'Allocation',
    projections: 'Projections',
    comparison: 'Comparison',
    
    // AI
    aiAnalysis: 'AI Analysis',
    recommendations: 'Recommendations',
    marketInsights: 'Market Insights',
    
    // Buttons
    compareStrategies: 'Compare Strategies',
    selectStrategy: 'Select Strategy',
    applyStrategy: 'Apply Strategy'
  },
  
  it: {
    // Navigation
    portfolio: 'Portafoglio',
    strategies: 'Strategie',
    aiAssistant: 'Assistente AI',
    
    // Asset Management
    addAsset: 'Aggiungi Asset',
    assetName: 'Nome Asset',
    assetType: 'Tipo Asset',
    currentValue: 'Valore Attuale',
    expectedReturn: 'Rendimento Atteso (%)',
    riskLevel: 'Livello di Rischio',
    isPAC: 'Investimento PAC',
    pacAmount: 'Importo PAC',
    pacFrequency: 'Frequenza PAC',
    
    // Asset Types
    stocks: 'Azioni',
    bonds: 'Obbligazioni',
    etf: 'ETF',
    crypto: 'Criptovalute',
    real_estate: 'Immobiliare',
    commodities: 'Materie Prime',
    cash: 'Liquidità',
    
    // Risk Levels
    low: 'Basso',
    medium: 'Medio',
    high: 'Alto',
    
    // PAC Frequencies
    monthly: 'Mensile',
    quarterly: 'Trimestrale',
    biannual: 'Semestrale',
    annual: 'Annuale',
    
    // Portfolio Metrics
    totalValue: 'Valore Totale',
    expectedReturnLabel: 'Rendimento Atteso',
    riskScore: 'Punteggio Rischio',
    diversificationScore: 'Punteggio Diversificazione',
    
    // Strategies
    generateStrategy: 'Genera Strategia AI',
    riskProfile: 'Profilo di Rischio',
    conservative: 'Conservativo',
    balanced: 'Bilanciato',
    aggressive: 'Aggressivo',
    investmentGoals: 'Obiettivi di Investimento',
    
    // Common
    add: 'Aggiungi',
    remove: 'Rimuovi',
    edit: 'Modifica',
    save: 'Salva',
    cancel: 'Annulla',
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    
    // Charts
    allocation: 'Allocazione',
    projections: 'Proiezioni',
    comparison: 'Confronto',
    
    // AI
    aiAnalysis: 'Analisi AI',
    recommendations: 'Raccomandazioni',
    marketInsights: 'Insights di Mercato',
    
    // Buttons
    compareStrategies: 'Confronta Strategie',
    selectStrategy: 'Seleziona Strategia',
    applyStrategy: 'Applica Strategia'
  },
  
  es: {
    // Navigation
    portfolio: 'Cartera',
    strategies: 'Estrategias',
    aiAssistant: 'Asistente IA',
    
    // Asset Management
    addAsset: 'Añadir Activo',
    assetName: 'Nombre del Activo',
    assetType: 'Tipo de Activo',
    currentValue: 'Valor Actual',
    expectedReturn: 'Rendimiento Esperado (%)',
    riskLevel: 'Nivel de Riesgo',
    isPAC: 'Inversión PAC',
    pacAmount: 'Cantidad PAC',
    pacFrequency: 'Frecuencia PAC',
    
    // Asset Types
    stocks: 'Acciones',
    bonds: 'Bonos',
    etf: 'ETF',
    crypto: 'Criptomonedas',
    real_estate: 'Inmobiliario',
    commodities: 'Materias Primas',
    cash: 'Efectivo',
    
    // Risk Levels
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    
    // PAC Frequencies
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    biannual: 'Semestral',
    annual: 'Anual',
    
    // Portfolio Metrics
    totalValue: 'Valor Total',
    expectedReturnLabel: 'Rendimiento Esperado',
    riskScore: 'Puntuación de Riesgo',
    diversificationScore: 'Puntuación de Diversificación',
    
    // Strategies
    generateStrategy: 'Generar Estrategia IA',
    riskProfile: 'Perfil de Riesgo',
    conservative: 'Conservador',
    balanced: 'Equilibrado',
    aggressive: 'Agresivo',
    investmentGoals: 'Objetivos de Inversión',
    
    // Common
    add: 'Añadir',
    remove: 'Eliminar',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    
    // Charts
    allocation: 'Asignación',
    projections: 'Proyecciones',
    comparison: 'Comparación',
    
    // AI
    aiAnalysis: 'Análisis IA',
    recommendations: 'Recomendaciones',
    marketInsights: 'Perspectivas del Mercado',
    
    // Buttons
    compareStrategies: 'Comparar Estrategias',
    selectStrategy: 'Seleccionar Estrategia',
    applyStrategy: 'Aplicar Estrategia'
  },
  
  fr: {
    // Navigation
    portfolio: 'Portefeuille',
    strategies: 'Stratégies',
    aiAssistant: 'Assistant IA',
    
    // Asset Management
    addAsset: 'Ajouter un Actif',
    assetName: 'Nom de l\'Actif',
    assetType: 'Type d\'Actif',
    currentValue: 'Valeur Actuelle',
    expectedReturn: 'Rendement Attendu (%)',
    riskLevel: 'Niveau de Risque',
    isPAC: 'Investissement PAC',
    pacAmount: 'Montant PAC',
    pacFrequency: 'Fréquence PAC',
    
    // Asset Types
    stocks: 'Actions',
    bonds: 'Obligations',
    etf: 'ETF',
    crypto: 'Cryptomonnaies',
    real_estate: 'Immobilier',
    commodities: 'Matières Premières',
    cash: 'Liquidités',
    
    // Risk Levels
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    
    // PAC Frequencies
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    biannual: 'Semestriel',
    annual: 'Annuel',
    
    // Portfolio Metrics
    totalValue: 'Valeur Totale',
    expectedReturnLabel: 'Rendement Attendu',
    riskScore: 'Score de Risque',
    diversificationScore: 'Score de Diversification',
    
    // Strategies
    generateStrategy: 'Générer une Stratégie IA',
    riskProfile: 'Profil de Risque',
    conservative: 'Conservateur',
    balanced: 'Équilibré',
    aggressive: 'Agressif',
    investmentGoals: 'Objectifs d\'Investissement',
    
    // Common
    add: 'Ajouter',
    remove: 'Supprimer',
    edit: 'Modifier',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Charts
    allocation: 'Allocation',
    projections: 'Projections',
    comparison: 'Comparaison',
    
    // AI
    aiAnalysis: 'Analyse IA',
    recommendations: 'Recommandations',
    marketInsights: 'Perspectives du Marché',
    
    // Buttons
    compareStrategies: 'Comparer les Stratégies',
    selectStrategy: 'Sélectionner la Stratégie',
    applyStrategy: 'Appliquer la Stratégie'
  },
  
  de: {
    // Navigation
    portfolio: 'Portfolio',
    strategies: 'Strategien',
    aiAssistant: 'KI-Assistent',
    
    // Asset Management
    addAsset: 'Asset hinzufügen',
    assetName: 'Asset-Name',
    assetType: 'Asset-Typ',
    currentValue: 'Aktueller Wert',
    expectedReturn: 'Erwartete Rendite (%)',
    riskLevel: 'Risikolevel',
    isPAC: 'PAC-Investition',
    pacAmount: 'PAC-Betrag',
    pacFrequency: 'PAC-Häufigkeit',
    
    // Asset Types
    stocks: 'Aktien',
    bonds: 'Anleihen',
    etf: 'ETF',
    crypto: 'Kryptowährungen',
    real_estate: 'Immobilien',
    commodities: 'Rohstoffe',
    cash: 'Bargeld',
    
    // Risk Levels
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    
    // PAC Frequencies
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    biannual: 'Halbjährlich',
    annual: 'Jährlich',
    
    // Portfolio Metrics
    totalValue: 'Gesamtwert',
    expectedReturnLabel: 'Erwartete Rendite',
    riskScore: 'Risiko-Score',
    diversificationScore: 'Diversifikations-Score',
    
    // Strategies
    generateStrategy: 'KI-Strategie generieren',
    riskProfile: 'Risikoprofil',
    conservative: 'Konservativ',
    balanced: 'Ausgewogen',
    aggressive: 'Aggressiv',
    investmentGoals: 'Anlageziele',
    
    // Common
    add: 'Hinzufügen',
    remove: 'Entfernen',
    edit: 'Bearbeiten',
    save: 'Speichern',
    cancel: 'Abbrechen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    
    // Charts
    allocation: 'Allokation',
    projections: 'Projektionen',
    comparison: 'Vergleich',
    
    // AI
    aiAnalysis: 'KI-Analyse',
    recommendations: 'Empfehlungen',
    marketInsights: 'Markteinblicke',
    
    // Buttons
    compareStrategies: 'Strategien vergleichen',
    selectStrategy: 'Strategie auswählen',
    applyStrategy: 'Strategie anwenden'
  },
  
  pt: {
    // Navigation
    portfolio: 'Portfólio',
    strategies: 'Estratégias',
    aiAssistant: 'Assistente IA',
    
    // Asset Management
    addAsset: 'Adicionar Ativo',
    assetName: 'Nome do Ativo',
    assetType: 'Tipo de Ativo',
    currentValue: 'Valor Atual',
    expectedReturn: 'Retorno Esperado (%)',
    riskLevel: 'Nível de Risco',
    isPAC: 'Investimento PAC',
    pacAmount: 'Valor PAC',
    pacFrequency: 'Frequência PAC',
    
    // Asset Types
    stocks: 'Ações',
    bonds: 'Títulos',
    etf: 'ETF',
    crypto: 'Criptomoedas',
    real_estate: 'Imobiliário',
    commodities: 'Commodities',
    cash: 'Dinheiro',
    
    // Risk Levels
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto',
    
    // PAC Frequencies
    monthly: 'Mensal',
    quarterly: 'Trimestral',
    biannual: 'Semestral',
    annual: 'Anual',
    
    // Portfolio Metrics
    totalValue: 'Valor Total',
    expectedReturnLabel: 'Retorno Esperado',
    riskScore: 'Pontuação de Risco',
    diversificationScore: 'Pontuação de Diversificação',
    
    // Strategies
    generateStrategy: 'Gerar Estratégia IA',
    riskProfile: 'Perfil de Risco',
    conservative: 'Conservador',
    balanced: 'Equilibrado',
    aggressive: 'Agressivo',
    investmentGoals: 'Objetivos de Investimento',
    
    // Common
    add: 'Adicionar',
    remove: 'Remover',
    edit: 'Editar',
    save: 'Salvar',
    cancel: 'Cancelar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    
    // Charts
    allocation: 'Alocação',
    projections: 'Projeções',
    comparison: 'Comparação',
    
    // AI
    aiAnalysis: 'Análise IA',
    recommendations: 'Recomendações',
    marketInsights: 'Insights de Mercado',
    
    // Buttons
    compareStrategies: 'Comparar Estratégias',
    selectStrategy: 'Selecionar Estratégia',
    applyStrategy: 'Aplicar Estratégia'
  }
};

export function getTranslation(key: string, language: string = 'en'): string {
  const langTranslations = translations[language] || translations.en;
  
  // Handle nested keys (e.g., 'portfolio.metrics.totalValue')
  const keys = key.split('.');
  let value: any = langTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return the key itself if not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];