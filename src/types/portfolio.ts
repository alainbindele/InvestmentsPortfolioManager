export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  currentValue: number;
  expectedReturn: number; // Annual percentage
  riskLevel: RiskLevel;
  allocation?: number; // Percentage of total portfolio
  isPAC?: boolean; // Indicates if this is a PAC asset
  pacAmount?: number; // Contribution amount for PAC
  pacFrequency?: PACFrequency; // Frequency of PAC contributions
  pacStartingValue?: number; // Starting value for PAC calculations
}

export type PACFrequency = 'monthly' | 'bimonthly' | 'quarterly' | 'fourmonthly' | 'biannual' | 'annual';

export type AssetType = 
  | 'stocks' 
  | 'bonds' 
  | 'etf' 
  | 'real_estate' 
  | 'commodities' 
  | 'crypto' 
  | 'cash' 
  | 'other';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface Portfolio {
  id: string;
  name: string;
  assets: Asset[];
  totalValue: number;
  expectedReturn: number;
  riskScore: number;
  createdAt: Date;
}

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

export interface RebalancingAction {
  assetId: string;
  assetName: string;
  currentAllocation: number;
  targetAllocation: number;
  currentValue: number;
  targetValue: number;
  action: 'buy' | 'sell' | 'hold';
  amount: number;
}

export interface MarketInsight {
  asset: string;
  insight: string;
  confidence: number;
  timeframe: string;
}

export interface PortfolioAnalysis {
  currentMetrics: {
    totalValue: number;
    expectedReturn: number;
    riskScore: number;
    diversificationScore: number;
  };
  recommendations: string[];
  marketInsights: MarketInsight[];
  suggestedActions: RebalancingAction[];
}

export interface PACPlan {
  id: string;
  name: string;
  monthlyAmount: number;
  frequency: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  duration: number; // in years
  targetAllocations: { [assetId: string]: number };
  expectedReturn: number;
  customReturn?: number; // Override per il rendimento personalizzato
  startDate: Date;
  isActive: boolean;
  asAsset?: boolean; // Flag per indicare se è stato aggiunto come asset
}

export interface PACProjection {
  month: number;
  totalInvested: number;
  portfolioValue: number;
  totalGain: number;
  gainPercentage: number;
}

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  stocks: 'Stocks',
  bonds: 'Bonds',
  etf: 'ETF',
  real_estate: 'Real Estate',
  commodities: 'Commodities',
  crypto: 'Cryptocurrency',
  cash: 'Cash',
  other: 'Other'
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export const ASSET_COLORS: Record<AssetType, string> = {
  stocks: '#3b82f6',
  bonds: '#10b981',
  etf: '#f59e0b',
  real_estate: '#8b5cf6',
  commodities: '#ef4444',
  crypto: '#f97316',
  cash: '#6b7280',
  other: '#ec4899'
};