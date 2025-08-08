import { Asset, Strategy, PortfolioAnalysis, MarketInsight } from '../types/portfolio';
import { calculatePortfolioMetrics } from '../utils/calculations';

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
      throw new Error('Nessun JSON trovato nella risposta');
    } catch (error) {
      console.warn('Parsing manuale fallito:', error);
      return null;
    }
  }

  async analyzePortfolio(assets: Asset[]): Promise<PortfolioAnalysis> {
    const metrics = calculatePortfolioMetrics(assets);
    
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
        
        IMPORTANTE: Rispondi ESCLUSIVAMENTE con il JSON richiesto, senza testo aggiuntivo prima o dopo.
        Fornisci raccomandazioni specifiche, pratiche e actionable. Gli insights di mercato devono essere attuali e basati su tendenze reali del 2025.`
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
            "Analisi AI completata con successo",
            "Raccomandazioni personalizzate generate dall'AI"
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
          "⚠️ Analisi AI non disponibile - verifica la configurazione API",
          "Il portafoglio mostra una diversificazione discreta tra asset class",
          "Considera di rivedere l'allocazione in base ai tuoi obiettivi di rischio",
          "Monitora regolarmente le performance e riequilibra se necessario"
        ],
        marketInsights: [
          {
            asset: "Analisi di Mercato",
            insight: "Analisi AI temporaneamente non disponibile. Configura l'API key OpenAI per ottenere insights di mercato in tempo reale.",
            confidence: 0.5,
            timeframe: "N/A"