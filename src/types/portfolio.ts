// Asset Types
export type AssetType = 'stocks' | 'bonds' | 'etf' | 'crypto' | 'real_estate' | 'cash' | 'commodities' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  currentValue: number;
  expectedReturn: number;
  riskLevel: number;
  isPAC?: boolean;
  pacAmount?: number;
  pacFrequency?: 'monthly' | 'quarterly' | 'biannual' | 'annual';
}

// Strategy Types
export interface Strategy {
  id: string;
  name: string;
  description: string;
  targetAllocations: { [assetId: string]: number };
  expectedReturn: number;
  riskScore: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  createdAt: Date;
  isAIGenerated?: boolean;
}

// Portfolio Analysis Types
export interface PortfolioMetrics {
  totalValue: number;
  expectedReturn: number;
  riskScore: number;
  diversificationScore: number;
}

export interface MarketInsight {
  asset: string;
  insight: string;
  confidence: number;
  timeframe: string;
}

export interface PortfolioAnalysis {
  currentMetrics: PortfolioMetrics;
  recommendations: string[];
  marketInsights: MarketInsight[];
  suggestedActions: string[];
}

// Constants
export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  stocks: 'Azioni',
  bonds: 'Obbligazioni',
  etf: 'ETF',
  crypto: 'Criptovalute',
  real_estate: 'Immobiliare',
  cash: 'Liquidità',
  commodities: 'Materie Prime',
  other: 'Altro'
};

export const RISK_LEVEL_LABELS: Record<number, string> = {
  1: 'Molto Basso',
  2: 'Basso',
  3: 'Medio',
  4: 'Alto',
  5: 'Molto Alto'
};

export const ASSET_COLORS: Record<AssetType, string> = {
  stocks: '#3B82F6',
  bonds: '#10B981',
  etf: '#8B5CF6',
  crypto: '#F59E0B',
  real_estate: '#EF4444',
  cash: '#6B7280',
  commodities: '#F97316',
  other: '#84CC16'
};