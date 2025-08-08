import { Asset, Strategy } from '../types/portfolio';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'VWCE - Vanguard FTSE All-World',
    type: 'etf',
    currentValue: 50000,
    expectedReturn: 7.5,
    riskLevel: 'medium'
  },
  {
    id: '2',
    name: 'BTP Italia 2030',
    type: 'bonds',
    currentValue: 30000,
    expectedReturn: 3.2,
    riskLevel: 'low'
  },
  {
    id: '3',
    name: 'Appartamento Milano',
    type: 'real_estate',
    currentValue: 200000,
    expectedReturn: 4.5,
    riskLevel: 'medium'
  },
  {
    id: '4',
    name: 'Conto Deposito',
    type: 'cash',
    currentValue: 20000,
    expectedReturn: 1.5,
    riskLevel: 'low'
  },
  {
    id: '5',
    name: 'Bitcoin',
    type: 'crypto',
    currentValue: 15000,
    expectedReturn: 12.0,
    riskLevel: 'high'
  }
];

export const mockStrategies: Strategy[] = [
  {
    id: 'conservative',
    name: 'Strategia Conservativa',
    description: 'Portafoglio bilanciato con focus sulla preservazione del capitale e rendimenti stabili.',
    targetAllocations: {
      '1': 30, // VWCE
      '2': 40, // BTP
      '3': 20, // Real Estate
      '4': 10, // Cash
      '5': 0   // Bitcoin
    },
    expectedReturn: 4.8,
    riskScore: 1.6,
    sharpeRatio: 1.4,
    maxDrawdown: 12,
    volatility: 8.5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'balanced',
    name: 'Strategia Bilanciata',
    description: 'Mix equilibrato tra crescita e stabilità, adatto per investitori con orizzonte temporale medio-lungo.',
    targetAllocations: {
      '1': 45, // VWCE
      '2': 25, // BTP
      '3': 20, // Real Estate
      '4': 5,  // Cash
      '5': 5   // Bitcoin
    },
    expectedReturn: 6.2,
    riskScore: 2.1,
    sharpeRatio: 1.8,
    maxDrawdown: 18,
    volatility: 12.3,
    createdAt: new Date('2024-01-16')
  },
  {
    id: 'aggressive',
    name: 'Strategia Aggressiva',
    description: 'Portafoglio orientato alla crescita con maggiore esposizione ad asset rischiosi.',
    targetAllocations: {
      '1': 60, // VWCE
      '2': 10, // BTP
      '3': 15, // Real Estate
      '4': 5,  // Cash
      '5': 10  // Bitcoin
    },
    expectedReturn: 8.1,
    riskScore: 2.7,
    sharpeRatio: 2.1,
    maxDrawdown: 25,
    volatility: 16.8,
    createdAt: new Date('2024-01-17')
  }
];