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
    name: 'ARKK - ARK Innovation ETF',
    type: 'etf',
    currentValue: 15000,
    expectedReturn: 12.0,
    riskLevel: 'high'
  },
  {
    id: '3',
    name: 'BTP Italia 2030',
    type: 'bonds',
    currentValue: 25000,
    expectedReturn: 3.5,
    riskLevel: 'low'
  },
  {
    id: '4',
    name: 'Conto Deposito',
    type: 'cash',
    currentValue: 10000,
    expectedReturn: 2.0,
    riskLevel: 'low'
  }
];

export const mockStrategies: Strategy[] = [
  {
    id: 'conservative',
    name: 'Strategia Conservativa',
    description: 'Focus sulla preservazione del capitale con rendimenti stabili',
    targetAllocations: {
      '1': 30, // VWCE
      '2': 5,  // ARKK
      '3': 45, // BTP
      '4': 20  // Cash
    },
    expectedReturn: 4.5,
    riskScore: 1.5,
    sharpeRatio: 1.2,
    maxDrawdown: 12,
    volatility: 8.5,
    createdAt: new Date('2025-01-01')
  },
  {
    id: 'balanced',
    name: 'Strategia Bilanciata',
    description: 'Equilibrio ottimale tra crescita e stabilità',
    targetAllocations: {
      '1': 50, // VWCE
      '2': 15, // ARKK
      '3': 25, // BTP
      '4': 10  // Cash
    },
    expectedReturn: 6.8,
    riskScore: 2.2,
    sharpeRatio: 1.8,
    maxDrawdown: 18,
    volatility: 12.3,
    createdAt: new Date('2025-01-01')
  },
  {
    id: 'aggressive',
    name: 'Strategia Aggressiva',
    description: 'Massimizzazione dei rendimenti con alta tolleranza al rischio',
    targetAllocations: {
      '1': 60, // VWCE
      '2': 30, // ARKK
      '3': 5,  // BTP
      '4': 5   // Cash
    },
    expectedReturn: 9.2,
    riskScore: 2.8,
    sharpeRatio: 2.1,
    maxDrawdown: 25,
    volatility: 16.8,
    createdAt: new Date('2025-01-01')
  }
];