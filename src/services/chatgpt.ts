import { Asset, Strategy, PortfolioAnalysis, MarketInsight } from '../types/portfolio';
import { calculatePortfolioMetrics } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

export class ChatGPTService {
  private apiKey: string | null = null;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeOpenAIRequest(messages: any[], temperature: number = 0.7): Promise<any> {
    if (!this.apiKey) {
      throw new Error('API key non configurata');
    }

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    try {
      return JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Se il parsing JSON fallisce, restituisci la risposta raw
      console.warn('Risposta non in formato JSON, usando parsing manuale');
      return this.parseResponseManually(data.choices[0].message.content);
    }
  }

  private parseResponseManually(content: string): any {
    // Cerca di estrarre JSON dalla risposta anche se non è perfettamente formattata
    try {
      // Cerca il primo { e l'ultimo }
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      
      if (start !== -1 && end !== -1 && end > start) {
        const jsonStr = content.substring(start, end + 1);
        return JSON.parse(jsonStr);
      }
      
      // Se non trova JSON, restituisce un oggetto di fallback
      throw new Error(getTranslation('it', 'nessunJsonTrovato'));
    } catch (error) {
      console.warn('Parsing manuale fallito:', error);
      return null;
    }
  }

  async analyzePortfolio(assets: Asset[], language: string = 'it'): Promise<PortfolioAnalysis> {
    const t = (key: string) => getTranslation(language as any, key);
    const metrics = calculatePortfolioMetrics(assets);
    
    // Language mapping for AI prompts
    const languageNames = {
      'it': 'italiano',
      'en': 'inglese',
      'es': 'spagnolo', 
      'fr': 'francese',
      'de': 'tedesco',
      'zh': 'cinese semplificato'
    };
    
    const selectedLanguageName = languageNames[language as keyof typeof languageNames] || 'italiano';
    
    const portfolioData = {
      assets: assets.map(asset => ({
        name: asset.name,
        type: asset.type,
        value: asset.currentValue,
        expectedReturn: asset.expectedReturn,
        riskLevel: asset.riskLevel,
        allocation: ((asset.currentValue / metrics.totalValue) * 100).toFixed(1)
      })),
      totalValue: metrics.totalValue,
      expectedReturn: metrics.expectedReturn,
      riskScore: metrics.riskScore,
      diversificationScore: metrics.diversificationScore
    };

    const messages = [
      {
        role: 'system',
        content: `Sei un esperto consulente finanziario specializzato nell'analisi di portafogli di investimento.
        IMPORTANTE: Rispondi SEMPRE in ${selectedLanguageName}. Tutte le raccomandazioni e insights devono essere scritti in ${selectedLanguageName}.
        Analizza il portafoglio fornito e restituisci SOLO un JSON valido con questa struttura esatta:
        {
          "currentMetrics": {
            "totalValue": number,
            "expectedReturn": number,
            "riskScore": number,
            "diversificationScore": number
          },
          "recommendations": [
            "string di raccomandazione 1",
            "string di raccomandazione 2",
            "string di raccomandazione 3",
            "string di raccomandazione 4"
          ],
          "marketInsights": [
            {
              "asset": "nome categoria asset",
              "insight": "insight dettagliato sul mercato",
              "confidence": 0.75,
              "timeframe": "6-12 mesi"
            }
          ]
        }
        
        CRITICO: 
        1. Rispondi ESCLUSIVAMENTE con il JSON richiesto, senza testo aggiuntivo prima o dopo
        2. TUTTE le stringhe nel JSON devono essere in ${selectedLanguageName}
        3. Fornisci raccomandazioni specifiche, pratiche e actionable in ${selectedLanguageName}
        4. Gli insights di mercato devono essere attuali e basati su tendenze reali del 2025, scritti in ${selectedLanguageName}`
      },
      {
        role: 'user',
        content: `Analizza questo portafoglio di investimenti:
        
        PORTAFOGLIO:
        ${JSON.stringify(portfolioData, null, 2)}
        
        Fornisci un'analisi completa con raccomandazioni specifiche per ottimizzare questo portafoglio.`
      }
    ];

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY_PFB;
      if (apiKey) {
        this.setApiKey(apiKey);
        const aiResponse = await this.makeOpenAIRequest(messages);
        
        // Se la risposta è null (parsing fallito), usa il fallback
        if (!aiResponse) {
          throw new Error('Risposta AI non valida');
        }
        
        return {
          currentMetrics: aiResponse.currentMetrics || metrics,
          recommendations: aiResponse.recommendations || [
            t('analisiAiCompletata'),
            t('raccomandazioniPersonalizzate')
          ],
          marketInsights: aiResponse.marketInsights || [],
          suggestedActions: []
        };
      } else {
        // Nessuna API key configurata, usa fallback
        throw new Error('API key non configurata');
      }
    } catch (error) {
      console.error('Errore nell\'analisi AI:', error);
      
      // Fallback con analisi mock migliorata
      return {
        currentMetrics: metrics,
        recommendations: [
          t('analisiAiNonDisponibile'),
          t('diversificazioneDiscreta'),
          t('consideraRivedere'),
          t('monitoraRegolarmente')
        ],
        marketInsights: [
          {
            asset: t('analisiMercato'),
            insight: t('analisiAiTemporaneamente'),
            confidence: 0.5,
            timeframe: "N/A"
          }
        ],
        suggestedActions: []
      };
    }
  }

  async generateStrategy(
    assets: Asset[], 
    riskProfile: 'conservative' | 'balanced' | 'aggressive',
    goals: string[],
    language: string = 'it'
  ): Promise<Strategy> {
    const t = (key: string) => getTranslation(language as any, key);
    
    // Language mapping for AI prompts
    const languageNames = {
      'it': 'italiano',
      'en': 'inglese', 
      'es': 'spagnolo',
      'fr': 'francese',
      'de': 'tedesco',
      'zh': 'cinese semplificato'
    };
    
    const selectedLanguageName = languageNames[language as keyof typeof languageNames] || 'italiano';
    const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    
    const portfolioData = {
      assets: assets.map(asset => ({
        id: asset.id,
        name: asset.name,
        type: asset.type,
        currentValue: asset.currentValue,
        expectedReturn: asset.expectedReturn,
        riskLevel: asset.riskLevel
      })),
      totalValue,
      riskProfile,
      goals
    };

    const riskProfileDescriptions = {
      conservative: 'conservativo - focus su preservazione del capitale e rendimenti stabili',
      balanced: 'bilanciato - equilibrio tra crescita e stabilità',
      aggressive: 'aggressivo - focus su massimizzazione dei rendimenti con tolleranza al rischio'
    };

    const messages = [
      {
        role: 'system',
        content: `Sei un esperto consulente finanziario specializzato nella creazione di strategie di investimento ottimali.
        IMPORTANTE: Rispondi SEMPRE in ${selectedLanguageName}. Tutti i testi nel JSON devono essere scritti in ${selectedLanguageName}.
        Crea una strategia di investimento personalizzata e restituisci SOLO un JSON valido con questa struttura esatta:
        {
          "name": "Nome della strategia",
          "description": "Descrizione dettagliata della strategia (max 200 caratteri)",
          "targetAllocations": {
            "asset_id_1": percentuale_numero,
            "asset_id_2": percentuale_numero
          },
          "expectedReturn": numero_rendimento_atteso,
          "riskScore": numero_da_1_a_5,
          "sharpeRatio": numero_sharpe_ratio,
          "maxDrawdown": numero_max_drawdown_percentuale,
          "volatility": numero_volatilita_percentuale,
          "reasoning": [
            "Ragione 1 per questa allocazione",
            "Ragione 2 per questa allocazione",
            "Ragione 3 per questa allocazione"
          ]
        }
        
        Le percentuali in targetAllocations devono sommare a 100. Usa gli ID degli asset forniti.
        CRITICO:
        1. Rispondi ESCLUSIVAMENTE con il JSON richiesto, senza testo aggiuntivo prima o dopo
        2. TUTTI i testi nel JSON (name, description, reasoning) devono essere in ${selectedLanguageName}
        3. Basa le tue raccomandazioni su principi di Modern Portfolio Theory e diversificazione ottimale`
      },
      {
        role: 'user',
        content: `Crea una strategia di investimento ottimale per questo portafoglio:
        
        DATI PORTAFOGLIO:
        ${JSON.stringify(portfolioData, null, 2)}
        
        PROFILO DI RISCHIO: ${riskProfileDescriptions[riskProfile]}
        
        OBIETTIVI: ${goals.join(', ')}
        
        Crea una strategia che ottimizzi il rapporto rischio-rendimento per questo profilo specifico.`
      }
    ];

    try {
      const aiResponse = await this.makeOpenAIRequest(messages, 0.3);
      
      if (!aiResponse || !aiResponse.targetAllocations || typeof aiResponse.targetAllocations !== 'object') {
        throw new Error('Risposta AI non valida');
      }
      
      // Normalizza le allocazioni per assicurarsi che sommino a 100
      const totalAllocation = Object.values(aiResponse.targetAllocations).reduce((sum: number, val: any) => sum + Number(val), 0);
      const normalizedAllocations: { [key: string]: number } = {};
      
      Object.entries(aiResponse.targetAllocations).forEach(([assetId, allocation]) => {
        normalizedAllocations[assetId] = Math.round((Number(allocation) / totalAllocation) * 100);
      });

      const strategy: Strategy = {
        id: `ai-${riskProfile}-${Date.now()}`,
        name: aiResponse.name || `${t('strategy')} AI ${riskProfile.charAt(0).toUpperCase() + riskProfile.slice(1)}`,
        description: aiResponse.description || `${t('strategy')} ${t('optimizedByAi')} ${t(riskProfile)}`,
        targetAllocations: normalizedAllocations,
        expectedReturn: Number(aiResponse.expectedReturn) || this.getDefaultReturn(riskProfile),
        riskScore: Number(aiResponse.riskScore) || this.getDefaultRisk(riskProfile),
        sharpeRatio: Number(aiResponse.sharpeRatio) || this.calculateDefaultSharpe(riskProfile),
        maxDrawdown: Number(aiResponse.maxDrawdown) || this.getDefaultDrawdown(riskProfile),
        volatility: Number(aiResponse.volatility) || this.getDefaultVolatility(riskProfile),
        createdAt: new Date(),
        isAIGenerated: true
      };

      return strategy;
    } catch (error) {
      console.error('Errore nella generazione strategia AI:', error);
      
      // Fallback con strategia mock migliorata
      return this.generateFallbackStrategy(assets, riskProfile, language);
    }
  }

  private getDefaultReturn(riskProfile: string): number {
    switch (riskProfile) {
      case 'conservative': return 4.5;
      case 'balanced': return 6.8;
      case 'aggressive': return 9.2;
      default: return 6.0;
    }
  }

  private getDefaultRisk(riskProfile: string): number {
    switch (riskProfile) {
      case 'conservative': return 1.5;
      case 'balanced': return 2.2;
      case 'aggressive': return 2.8;
      default: return 2.0;
    }
  }

  private calculateDefaultSharpe(riskProfile: string): number {
    const returns = this.getDefaultReturn(riskProfile);
    const risk = this.getDefaultRisk(riskProfile);
    return (returns - 2) / (risk * 5);
  }

  private getDefaultDrawdown(riskProfile: string): number {
    switch (riskProfile) {
      case 'conservative': return 12;
      case 'balanced': return 18;
      case 'aggressive': return 25;
      default: return 18;
    }
  }

  private getDefaultVolatility(riskProfile: string): number {
    switch (riskProfile) {
      case 'conservative': return 8.5;
      case 'balanced': return 12.3;
      case 'aggressive': return 16.8;
      default: return 12.0;
    }
  }

  private generateFallbackStrategy(assets: Asset[], riskProfile: string, language: string = 'it'): Strategy {
    const t = (key: string) => getTranslation(language as any, key);
    
    let targetAllocations: { [assetId: string]: number } = {};
    
    // Strategia di fallback basata sul profilo di rischio
    assets.forEach(asset => {
      switch (riskProfile) {
        case 'conservative':
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
          break;
          
        case 'balanced':
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
          break;
          
        case 'aggressive':
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
          break;
      }
    });

    // Normalizza le allocazioni
    const totalAllocation = Object.values(targetAllocations).reduce((sum, val) => sum + val, 0);
    Object.keys(targetAllocations).forEach(key => {
      targetAllocations[key] = Math.round((targetAllocations[key] / totalAllocation) * 100);
    });

    return {
      id: `fallback-${riskProfile}-${Date.now()}`,
      name: `⚠️ ${t('strategy')} ${t(riskProfile)} (Fallback)`,
      description: t('strategiaFallback'),
      targetAllocations,
      expectedReturn: this.getDefaultReturn(riskProfile),
      riskScore: this.getDefaultRisk(riskProfile),
      sharpeRatio: this.calculateDefaultSharpe(riskProfile),
      maxDrawdown: this.getDefaultDrawdown(riskProfile),
      volatility: this.getDefaultVolatility(riskProfile),
      createdAt: new Date(),
      isAIGenerated: false
    };
  }

  async getMarketResearch(assetType: string, language: string = 'it'): Promise<string> {
    const t = (key: string) => getTranslation(language as any, key);
    
    // Language mapping for AI prompts
    const languageNames = {
      'it': 'italiano',
      'en': 'inglese',
      'es': 'spagnolo', 
      'fr': 'francese',
      'de': 'tedesco',
      'zh': 'cinese semplificato'
    };
    
    const selectedLanguageName = languageNames[language as keyof typeof languageNames] || 'italiano';
    
    if (!this.apiKey) {
      return `${t('ricercaMercatoNonDisponibile')} ${assetType}. ${t('configuraApiKey')}`;
    }

    const messages = [
      {
        role: 'system',
        content: `Sei un analista finanziario esperto. Fornisci una ricerca di mercato concisa e attuale per la categoria di asset richiesta.
        IMPORTANTE: Rispondi SEMPRE in ${selectedLanguageName}. Tutti i testi nel JSON devono essere scritti in ${selectedLanguageName}.
        Restituisci SOLO un JSON con questa struttura:
        {
          "research": "Analisi di mercato dettagliata e attuale in ${selectedLanguageName} (max 300 caratteri)",
          "outlook": "positive|neutral|negative",
          "keyFactors": ["fattore1 in ${selectedLanguageName}", "fattore2 in ${selectedLanguageName}", "fattore3 in ${selectedLanguageName}"]
        }`
      },
      {
        role: 'user',
        content: `Fornisci una ricerca di mercato aggiornata per: ${assetType}
        
        Include tendenze attuali, outlook e fattori chiave da considerare per il 2025.
        IMPORTANTE: Scrivi tutto in ${selectedLanguageName}.`
      }
    ];

    try {
      const aiResponse = await this.makeOpenAIRequest(messages);
      return aiResponse.research || `${t('analisiMercatoTemporaneamente')} ${assetType}.`;
    } catch (error) {
      console.error('Errore nella ricerca di mercato:', error);
      return `${t('erroreRecupero')} ${assetType}. ${t('verificaConfigurazioneApi')}`;
    }
  }
}