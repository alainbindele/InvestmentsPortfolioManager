import { ASSET_TYPE_COLORS } from '../theme/chartTheme';

// Asset Types
export type AssetType = 'stocks' | 'bonds' | 'etf' | 'crypto' | 'real_estate' | 'cash' | 'commodities' | 'other';

export type RiskLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  currentValue: number;
  expectedReturn: number;
  rateType?: 'nominal' | 'effective'; // Only used for PAC assets
  riskLevel: RiskLevel;
  isLocked?: boolean; // For AI rebalancing - locked assets won't be modified
  isPAC?: boolean; // Indicates if this is a PAC (recurring investment) asset
  pacAmount?: number; // PAC amount per contribution (frequency determines when it's applied)
  pacFrequency?: 'monthly' | 'quarterly' | 'yearly'; // PAC frequency
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

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  'very_low': 'Molto Basso',
  'low': 'Basso', 
  'medium': 'Medio',
  'high': 'Alto',
  'very_high': 'Molto Alto'
};

// Colors live in the theme so charts and UI share one palette
export const ASSET_COLORS: Record<AssetType, string> = ASSET_TYPE_COLORS;