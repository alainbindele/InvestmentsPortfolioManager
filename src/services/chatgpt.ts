import {
  Asset,
  Strategy,
  PortfolioAnalysis,
  MarketInsight,
} from '../types/portfolio';
import { calculatePortfolioMetrics } from '../utils/calculations';

// Mock ChatGPT service - replace with real OpenAI API integration
export class ChatGPTService {
  private apiKey: string | null = null;

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzePortfolio(assets: Asset[]): Promise<PortfolioAnalysis> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const metrics = calculatePortfolioMetrics(assets);

    // Mock analysis - replace with real ChatGPT API call
    const analysis: PortfolioAnalysis = {
      currentMetrics: metrics,
      recommendations: [
        'Il tuo portafoglio mostra una buona diversificazione tra asset class diverse.',
        "Considera di ridurre l'esposizione alle criptovalute se hai un profilo di rischio conservativo.",
        "L'allocazione immobiliare è significativa - valuta se è in linea con i tuoi obiettivi.",
        'I rendimenti attesi sono realistici per il mix di asset attuale.',
      ],
      marketInsights: [
        {
          asset: 'ETF Azionari',
          insight:
            "I mercati azionari globali mostrano resilienza nonostante l'incertezza geopolitica. Focus su aziende con fondamentali solidi.",
          confidence: 0.75,
          timeframe: '6-12 mesi',
        },
        {
          asset: 'Obbligazioni',
          insight:
            'I tassi di interesse potrebbero stabilizzarsi nel 2024, rendendo le obbligazioni più attraenti.',
          confidence: 0.68,
          timeframe: '12-18 mesi',
        },
        {
          asset: 'Immobiliare',
          insight:
            'Il settore immobiliare potrebbe beneficiare della stabilizzazione dei tassi e della domanda strutturale.',
          confidence: 0.72,
          timeframe: '18-24 mesi',
        },
      ],
      suggestedActions: [],
    };

    return analysis;
  }

  async generateStrategy(
    assets: Asset[],
    riskProfile: 'conservative' | 'balanced' | 'aggressive',
    goals: string[]
  ): Promise<Strategy> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const totalValue = assets.reduce(
      (sum, asset) => sum + asset.currentValue,
      0
    );

    // Mock strategy generation based on risk profile
    let targetAllocations: { [assetId: string]: number } = {};
    let expectedReturn = 0;
    let riskScore = 0;
    let description = '';

    switch (riskProfile) {
      case 'conservative':
        // Conservative allocation
        assets.forEach((asset) => {
          switch (asset.type) {
            case 'bonds':
            case 'cash':
              targetAllocations[asset.id] = 35;
              break;
            case 'etf':
            case 'stocks':
              targetAllocations[asset.id] = 25;
              break;
            case 'real_estate':
              targetAllocations[asset.id] = 20;
              break;
            default:
              targetAllocations[asset.id] = 5;
          }
        });
        expectedReturn = 4.5;
        riskScore = 1.5;
        description =
          'Strategia AI ottimizzata per la preservazione del capitale con crescita moderata e bassa volatilità.';
        break;

      case 'balanced':
        // Balanced allocation
        assets.forEach((asset) => {
          switch (asset.type) {
            case 'etf':
            case 'stocks':
              targetAllocations[asset.id] = 40;
              break;
            case 'bonds':
              targetAllocations[asset.id] = 25;
              break;
            case 'real_estate':
              targetAllocations[asset.id] = 20;
              break;
            case 'cash':
              targetAllocations[asset.id] = 10;
              break;
            default:
              targetAllocations[asset.id] = 5;
          }
        });
        expectedReturn = 6.8;
        riskScore = 2.2;
        description =
          'Strategia AI bilanciata che ottimizza il rapporto rischio-rendimento per una crescita sostenibile nel lungo termine.';
        break;

      case 'aggressive':
        // Aggressive allocation
        assets.forEach((asset) => {
          switch (asset.type) {
            case 'etf':
            case 'stocks':
              targetAllocations[asset.id] = 55;
              break;
            case 'crypto':
              targetAllocations[asset.id] = 15;
              break;
            case 'real_estate':
              targetAllocations[asset.id] = 15;
              break;
            case 'bonds':
              targetAllocations[asset.id] = 10;
              break;
            default:
              targetAllocations[asset.id] = 5;
          }
        });
        expectedReturn = 9.2;
        riskScore = 2.8;
        description =
          'Strategia AI aggressiva focalizzata sulla massimizzazione dei rendimenti con tolleranza per volatilità elevata.';
        break;
    }

    // Normalize allocations to 100%
    const totalAllocation = Object.values(targetAllocations).reduce(
      (sum, val) => sum + val,
      0
    );
    Object.keys(targetAllocations).forEach((key) => {
      targetAllocations[key] = Math.round(
        (targetAllocations[key] / totalAllocation) * 100
      );
    });

    const strategy: Strategy = {
      id: `ai-${riskProfile}-${Date.now()}`,
      name: `Strategia AI ${riskProfile.charAt(0).toUpperCase() + riskProfile.slice(1)}`,
      description,
      targetAllocations,
      expectedReturn,
      riskScore,
      sharpeRatio: (expectedReturn - 2) / (riskScore * 5), // Simplified calculation
      maxDrawdown: riskScore * 8,
      volatility: riskScore * 6,
      createdAt: new Date(),
      isAIGenerated: true,
    };

    return strategy;
  }

  async getMarketResearch(assetType: string): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const marketResearch: { [key: string]: string } = {
      etf: 'Gli ETF continuano a guadagnare popolarità grazie ai bassi costi e alla diversificazione. Focus su ETF broad market e settoriali in crescita come tecnologia e sostenibilità.',
      stocks:
        'I mercati azionari mostrano resilienza nonostante le sfide macroeconomiche. Settori difensivi e value stocks potrebbero sovraperformare nel breve termine.',
      bonds:
        'Le obbligazioni stanno ritrovando attrattività con tassi più elevati. Duration media consigliata per bilanciare rischio di tasso e rendimento.',
      real_estate:
        'Il real estate beneficia di domanda strutturale e inflazione. REITs e investimenti diretti offrono diversificazione e protezione inflazionistica.',
      crypto:
        'Le criptovalute rimangono volatili ma con adozione istituzionale crescente. Bitcoin ed Ethereum dominano, ma attenzione alla regolamentazione.',
      cash: 'La liquidità offre ora rendimenti interessanti con tassi elevati. Utile per opportunità tattiche e gestione del rischio di portafoglio.',
    };

    return (
      marketResearch[assetType] ||
      'Ricerca di mercato non disponibile per questo tipo di asset.'
    );
  }
}
