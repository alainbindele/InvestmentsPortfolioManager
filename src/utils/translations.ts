export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

export const TRANSLATIONS = {
  // UI Elements
  portfolioBalancer: {
    it: 'Portfolio Balancer',
    en: 'Portfolio Balancer',
    es: 'Balanceador de Cartera',
    fr: 'Équilibreur de Portefeuille',
    de: 'Portfolio-Balancer',
    pt: 'Balanceador de Portfólio'
  },
  addAsset: {
    it: 'Aggiungi Asset',
    en: 'Add Asset',
    es: 'Agregar Activo',
    fr: 'Ajouter un Actif',
    de: 'Asset hinzufügen',
    pt: 'Adicionar Ativo'
  },
  assetName: {
    it: 'Nome Asset',
    en: 'Asset Name',
    es: 'Nombre del Activo',
    fr: 'Nom de l\'Actif',
    de: 'Asset-Name',
    pt: 'Nome do Ativo'
  },
  assetType: {
    it: 'Tipo',
    en: 'Type',
    es: 'Tipo',
    fr: 'Type',
    de: 'Typ',
    pt: 'Tipo'
  },
  currentValue: {
    it: 'Valore Attuale',
    en: 'Current Value',
    es: 'Valor Actual',
    fr: 'Valeur Actuelle',
    de: 'Aktueller Wert',
    pt: 'Valor Atual'
  },
  expectedReturn: {
    it: 'Rendimento Atteso (%)',
    en: 'Expected Return (%)',
    es: 'Rendimiento Esperado (%)',
    fr: 'Rendement Attendu (%)',
    de: 'Erwartete Rendite (%)',
    pt: 'Retorno Esperado (%)'
  },
  riskLevel: {
    it: 'Livello di Rischio',
    en: 'Risk Level',
    es: 'Nivel de Riesgo',
    fr: 'Niveau de Risque',
    de: 'Risikoniveau',
    pt: 'Nível de Risco'
  },
  save: {
    it: 'Salva',
    en: 'Save',
    es: 'Guardar',
    fr: 'Sauvegarder',
    de: 'Speichern',
    pt: 'Salvar'
  },
  cancel: {
    it: 'Annulla',
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    de: 'Abbrechen',
    pt: 'Cancelar'
  },
  edit: {
    it: 'Modifica',
    en: 'Edit',
    es: 'Editar',
    fr: 'Modifier',
    de: 'Bearbeiten',
    pt: 'Editar'
  },
  delete: {
    it: 'Elimina',
    en: 'Delete',
    es: 'Eliminar',
    fr: 'Supprimer',
    de: 'Löschen',
    pt: 'Excluir'
  },
  
  // Asset Types
  stocks: {
    it: 'Azioni',
    en: 'Stocks',
    es: 'Acciones',
    fr: 'Actions',
    de: 'Aktien',
    pt: 'Ações'
  },
  bonds: {
    it: 'Obbligazioni',
    en: 'Bonds',
    es: 'Bonos',
    fr: 'Obligations',
    de: 'Anleihen',
    pt: 'Títulos'
  },
  etf: {
    it: 'ETF',
    en: 'ETF',
    es: 'ETF',
    fr: 'ETF',
    de: 'ETF',
    pt: 'ETF'
  },
  real_estate: {
    it: 'Immobiliare',
    en: 'Real Estate',
    es: 'Bienes Raíces',
    fr: 'Immobilier',
    de: 'Immobilien',
    pt: 'Imóveis'
  },
  commodities: {
    it: 'Materie Prime',
    en: 'Commodities',
    es: 'Materias Primas',
    fr: 'Matières Premières',
    de: 'Rohstoffe',
    pt: 'Commodities'
  },
  crypto: {
    it: 'Criptovalute',
    en: 'Crypto',
    es: 'Criptomonedas',
    fr: 'Crypto',
    de: 'Krypto',
    pt: 'Cripto'
  },
  cash: {
    it: 'Liquidità',
    en: 'Cash',
    es: 'Efectivo',
    fr: 'Liquidités',
    de: 'Bargeld',
    pt: 'Dinheiro'
  },
  other: {
    it: 'Altro',
    en: 'Other',
    es: 'Otro',
    fr: 'Autre',
    de: 'Andere',
    pt: 'Outro'
  },

  // Risk Levels
  very_low: {
    it: 'Molto Basso',
    en: 'Very Low',
    es: 'Muy Bajo',
    fr: 'Très Bas',
    de: 'Sehr Niedrig',
    pt: 'Muito Baixo'
  },
  low: {
    it: 'Basso',
    en: 'Low',
    es: 'Bajo',
    fr: 'Bas',
    de: 'Niedrig',
    pt: 'Baixo'
  },
  medium: {
    it: 'Medio',
    en: 'Medium',
    es: 'Medio',
    fr: 'Moyen',
    de: 'Mittel',
    pt: 'Médio'
  },
  high: {
    it: 'Alto',
    en: 'High',
    es: 'Alto',
    fr: 'Élevé',
    de: 'Hoch',
    pt: 'Alto'
  },
  very_high: {
    it: 'Molto Alto',
    en: 'Very High',
    es: 'Muy Alto',
    fr: 'Très Élevé',
    de: 'Sehr Hoch',
    pt: 'Muito Alto'
  },

  // Portfolio Metrics
  totalValue: {
    it: 'Valore Totale',
    en: 'Total Value',
    es: 'Valor Total',
    fr: 'Valeur Totale',
    de: 'Gesamtwert',
    pt: 'Valor Total'
  },
  diversificationScore: {
    it: 'Punteggio Diversificazione',
    en: 'Diversification Score',
    es: 'Puntuación de Diversificación',
    fr: 'Score de Diversification',
    de: 'Diversifikations-Score',
    pt: 'Pontuação de Diversificação'
  },
  riskScore: {
    it: 'Punteggio Rischio',
    en: 'Risk Score',
    es: 'Puntuación de Riesgo',
    fr: 'Score de Risque',
    de: 'Risiko-Score',
    pt: 'Pontuação de Risco'
  },

  // Lock/Unlock Asset
  lockAsset: {
    it: 'Blocca asset per valutazione AI',
    en: 'Lock asset for AI evaluation',
    es: 'Bloquear activo para evaluación IA',
    fr: 'Verrouiller l\'actif pour l\'évaluation IA',
    de: 'Asset für KI-Bewertung sperren',
    pt: 'Bloquear ativo para avaliação IA'
  },
  unlockAsset: {
    it: 'Sblocca asset per valutazione AI',
    en: 'Unlock asset for AI evaluation',
    es: 'Desbloquear activo para evaluación IA',
    fr: 'Déverrouiller l\'actif pour l\'évaluation IA',
    de: 'Asset für KI-Bewertung entsperren',
    pt: 'Desbloquear ativo para avaliação IA'
  },

  // Charts and Projections
  portfolioAllocation: {
    it: 'Allocazione Portfolio',
    en: 'Portfolio Allocation',
    es: 'Asignación de Cartera',
    fr: 'Allocation du Portefeuille',
    de: 'Portfolio-Allokation',
    pt: 'Alocação do Portfólio'
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
  value: {
    it: 'Valore',
    en: 'Value',
    es: 'Valor',
    fr: 'Valeur',
    de: 'Wert',
    pt: 'Valor'
  },
  noAssetsMessage: {
    it: 'Aggiungi alcuni asset per vedere i grafici del tuo portfolio',
    en: 'Add some assets to see your portfolio charts',
    es: 'Agrega algunos activos para ver los gráficos de tu cartera',
    fr: 'Ajoutez des actifs pour voir les graphiques de votre portefeuille',
    de: 'Fügen Sie Assets hinzu, um Ihre Portfolio-Diagramme zu sehen',
    pt: 'Adicione alguns ativos para ver os gráficos do seu portfólio'
  },
  scrollToEditMobile: {
    it: 'Scorri in alto per modificare',
    en: 'Scroll up to edit',
    es: 'Desplázate hacia arriba para editar',
    fr: 'Faites défiler vers le haut pour modifier',
    de: 'Nach oben scrollen zum Bearbeiten',
    pt: 'Role para cima para editar'
  }
};

export const getTranslation = (language: Language, key: keyof typeof TRANSLATIONS): string => {
  const translation = TRANSLATIONS[key];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  return translation[language] || translation.en || key;
};