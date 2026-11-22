import type { AssetType } from '../types/portfolio';

// Single source of truth for chart colors on the dark navy theme.
// Shades are the Tailwind 400 tones: bright enough for contrast on navy glass.

export const ASSET_TYPE_COLORS: Record<AssetType, string> = {
  stocks: '#60A5FA',
  bonds: '#34D399',
  etf: '#A78BFA',
  crypto: '#FBBF24',
  real_estate: '#FB7185',
  cash: '#94A3B8',
  commodities: '#FB923C',
  other: '#22D3EE',
};

// Line/bar series order: first entry is the "current" portfolio (neutral).
export const SERIES_COLORS: string[] = [
  '#94A3B8',
  '#34D399',
  '#60A5FA',
  '#FBBF24',
  '#FB7185',
  '#A78BFA',
  '#22D3EE',
  '#FB923C',
];

export const COLOR_PICKER_PALETTE: string[] = [
  '#60A5FA', '#34D399', '#A78BFA', '#FBBF24', '#FB7185', '#94A3B8',
  '#FB923C', '#A3E635', '#22D3EE', '#F472B6', '#C08457', '#2DD4BF',
  '#818CF8', '#F87171', '#FACC15', '#38BDF8', '#E879F9', '#4ADE80',
];

export const CHART = {
  grid: 'rgba(148, 163, 184, 0.12)',
  axis: 'rgba(148, 163, 184, 0.35)',
  tick: '#94A3B8',
  track: 'rgba(255, 255, 255, 0.10)',
  trackFill: '#3B82F6',
  lockedFill: '#64748B',
  cursor: 'rgba(148, 163, 184, 0.08)',
  pieStroke: '#0B1220',
  fallback: '#94A3B8',
} as const;
