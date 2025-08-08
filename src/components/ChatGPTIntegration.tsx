import React, { useState } from 'react';
import { Bot, Loader2, Key, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { Asset, Strategy, PortfolioAnalysis } from '../types/portfolio';
import { ChatGPTService } from '../services/chatgpt';

interface ChatGPTIntegrationProps {
  assets: Asset[];
  onStrategyGenerated: (strategy: Strategy) => void;
}

export const ChatGPTIntegration: React.FC<ChatGPTIntegrationProps> = ({ 
  assets, 
  onStrategyGenerated 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [goals, setGoals] = useState<string[]>(['crescita_lungo_termine']);

  const chatGPTService = new ChatGPTService();

  const handleAnalyzePortfolio = async () => {
    if (assets.length === 0) {
      alert('Aggiungi almeno un asset per analizzare il portafoglio');
      return;
    }

    setIsAnalyzing(true);
    try {
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      const portfolioAnalysis = await chatGPTService.analyzePortfolio(assets);
      setAnalysis(portfolioAnalysis);
    } catch (error) {
      console.error('Errore nell\'analisi del portafoglio:', error);
      alert('Errore nell\'analisi del portafoglio. Riprova più tardi.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateStrategy = async () => {
    if (assets.length === 0) {
      alert('Aggiungi almeno un asset per generare una strategia');
      return;
    }

    setIsGeneratingStrategy(true);
    try {
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      const strategy = await chatGPTService.generateStrategy(assets, selectedRiskProfile, goals);
      onStrategyGenerated(strategy);
    } catch (error) {
      console.error('Errore nella generazione della strategia:', error);
      alert('Errore nella generazione della strategia. Riprova più tardi.');
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const availableGoals = [
    { id: 'crescita_lungo_termine', label: 'Crescita a Lungo Termine' },
    { id: 'reddito_passivo', label: 'Reddito Passivo' },
    { id: 'preservazione_capitale', label: 'Preservazione del Capitale' },
    { id: 'diversificazione', label: 'Diversificazione' },
    { id: 'protezione_inflazione', label: 'Protezione dall\'Inflazione' }
  ];

  return (
    <div className="space-y-6">
      {/* API Key Configuration */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Key className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Configurazione ChatGPT</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key OpenAI (Opzionale)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-field"
              placeholder="sk-..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Inserisci la tua API key per analisi AI reali. Senza API key verranno utilizzate analisi simulate.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Analysis */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-success-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Analisi Portafoglio AI</h3>
        </div>

        <button
          onClick={handleAnalyzePortfolio}
          disabled={isAnalyzing || assets.length === 0}
          className="btn-primary mb-4"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analizzando...
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              Analizza Portafoglio
            </>
          )}
        </button>

        {analysis && (
          <div className="space-y-4 animate-fade-in">
            {/* Current Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="metric-card">
                <p className="text-sm text-gray-600">Valore Totale</p>
                <p className="text-lg font-bold text-gray-900">
                  €{analysis.currentMetrics.totalValue.toLocaleString('it-IT')}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">Rendimento Atteso</p>
                <p className="text-lg font-bold text-success-600">
                  {analysis.currentMetrics.expectedReturn.toFixed(1)}%
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">Rischio</p>
                <p className="text-lg font-bold text-warning-600">
                  {analysis.currentMetrics.riskScore.toFixed(1)}/5
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">Diversificazione</p>
                <p className="text-lg font-bold text-primary-600">
                  {analysis.currentMetrics.diversificationScore}/100
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Raccomandazioni AI</h4>
              </div>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Market Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                Insights di Mercato
              </h4>
              {analysis.marketInsights.map((insight, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{insight.asset}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{insight.timeframe}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        insight.confidence > 0.8 ? 'bg-success-500' :
                        insight.confidence > 0.6 ? 'bg-warning-500' : 'bg-error-500'
                      }`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Strategy Generation */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-warning-100 rounded-lg">
            <Bot className="w-5 h-5 text-warning-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Generazione Strategia AI</h3>
        </div>

        <div className="space-y-4">
          {/* Risk Profile Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profilo di Rischio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'conservative', label: 'Conservativo', desc: 'Basso rischio' },
                { id: 'balanced', label: 'Bilanciato', desc: 'Rischio medio' },
                { id: 'aggressive', label: 'Aggressivo', desc: 'Alto rischio' }
              ].map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedRiskProfile(profile.id as any)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedRiskProfile === profile.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium text-sm">{profile.label}</p>
                  <p className="text-xs text-gray-500">{profile.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Obiettivi di Investimento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    goals.includes(goal.id)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-sm font-medium">{goal.label}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateStrategy}
            disabled={isGeneratingStrategy || assets.length === 0}
            className="btn-primary w-full"
          >
            {isGeneratingStrategy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generando Strategia AI...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                Genera Strategia AI
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};