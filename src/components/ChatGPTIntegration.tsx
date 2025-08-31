import React, { useState } from 'react';
import { Bot, Loader2, TrendingUp, AlertCircle, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Asset, Strategy, PortfolioAnalysis } from '../types/portfolio';
import { Language } from '../types/language';
import { ChatGPTService } from '../services/chatgpt';
import { getTranslation } from '../utils/translations';

interface ChatGPTIntegrationProps {
  assets: Asset[];
  language: Language;
  onStrategyGenerated: (strategy: Strategy) => void;
}

export const ChatGPTIntegration: React.FC<ChatGPTIntegrationProps> = ({ 
  assets, 
  language,
  onStrategyGenerated 
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'working' | 'error'>('unknown');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedRiskProfile, setSelectedRiskProfile] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [goals, setGoals] = useState<string[]>(['crescita_lungo_termine']);

  const chatGPTService = new ChatGPTService();

  const handleAnalyzePortfolio = async () => {
    if (assets.length === 0) {
      alert(t('noAssetsToAnalyze'));
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      const portfolioAnalysis = await chatGPTService.analyzePortfolio(assets, language);
      setAnalysis(portfolioAnalysis);
      setApiStatus('working');
    } catch (error) {
      console.error('Errore nell\'analisi del portafoglio:', error);
      setApiStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
      // Mostra comunque l'analisi di fallback
      try {
        const portfolioAnalysis = await chatGPTService.analyzePortfolio(assets, language);
        setAnalysis(portfolioAnalysis);
      } catch (fallbackError) {
        console.error('Errore anche nel fallback:', fallbackError);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateStrategy = async () => {
    if (assets.length === 0) {
      alert(t('noAssetsToAnalyze'));
      return;
    }

    setIsGeneratingStrategy(true);
    setErrorMessage('');
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      const strategy = await chatGPTService.generateStrategy(assets, selectedRiskProfile, goals, language);
      onStrategyGenerated(strategy);
      setApiStatus('working');
    } catch (error) {
      console.error('Errore nella generazione della strategia:', error);
      setApiStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
      // Genera comunque una strategia di fallback
      try {
        const strategy = await chatGPTService.generateStrategy(assets, selectedRiskProfile, goals, language);
        onStrategyGenerated(strategy);
      } catch (fallbackError) {
        console.error('Errore anche nel fallback:', fallbackError);
      }
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
    { id: 'crescita_lungo_termine', label: t('longTermGrowth') },
    { id: 'reddito_passivo', label: t('passiveIncome') },
    { id: 'preservazione_capitale', label: t('capitalPreservation') },
    { id: 'diversificazione', label: t('diversificationGoal') },
    { id: 'protezione_inflazione', label: t('inflationProtection') }
  ];

  return (
    <div className="space-y-6">
      {/* API Status Indicator */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {apiStatus === 'working' && <CheckCircle className="w-5 h-5 text-success-600" />}
              {apiStatus === 'error' && <XCircle className="w-5 h-5 text-error-600" />}
              {apiStatus === 'unknown' && <AlertCircle className="w-5 h-5 text-gray-400" />}
              <span className="font-medium text-gray-900">
                {t('apiStatus')}: {
                  apiStatus === 'working' ? t('connected') :
                  apiStatus === 'error' ? t('error') : t('notTested')
                }
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {import.meta.env.VITE_OPENAI_API_KEY ? 
              t('apiKeyConfigured') : 
              t('apiKeyNotConfigured')
            }
          </div>
        </div>
        {errorMessage && (
          <div className="mt-3 p-3 bg-error-50 border border-error-200 rounded-lg">
            <p className="text-sm text-error-700">
              <strong>{t('apiError')}:</strong> {errorMessage}
            </p>
            <p className="text-xs text-error-600 mt-1">
              {t('fallbackMessage')}
            </p>
          </div>
        )}
      </div>

      {/* Portfolio Analysis */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-success-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{t('aiPortfolioAnalysis')}</h3>
        </div>

        <button
          onClick={handleAnalyzePortfolio}
          disabled={isAnalyzing || assets.length === 0}
          className="btn-primary mb-4"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('analyzing')}
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              {t('analyzePortfolio')}
            </>
          )}
        </button>

        {analysis && (
          <div className="space-y-4 animate-fade-in">
            {/* Current Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="metric-card">
                <p className="text-sm text-gray-600">{t('totalValue')}</p>
                <p className="text-lg font-bold text-gray-900">
                  €{analysis.currentMetrics.totalValue.toLocaleString('it-IT')}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                <p className="text-lg font-bold text-success-600">
                  {analysis.currentMetrics.expectedReturn.toFixed(1)}%
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">{t('risk')}</p>
                <p className="text-lg font-bold text-warning-600">
                  {analysis.currentMetrics.riskScore.toFixed(1)}/5
                </p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-600">{t('diversification')}</p>
                <p className="text-lg font-bold text-primary-600">
                  {analysis.currentMetrics.diversificationScore}/100
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">
                  {t('aiRecommendations')}
                  {apiStatus === 'working' && <span className="ml-2 text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">AI</span>}
                  {apiStatus === 'error' && <span className="ml-2 text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">Fallback</span>}
                </h4>
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
                {t('marketInsights')}
                {apiStatus === 'working' && <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">AI</span>}
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
          <h3 className="text-lg font-semibold text-gray-900">
            {t('aiStrategyGeneration')}
            {apiStatus === 'working' && <span className="ml-2 text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">{t('aiActive')}</span>}
          </h3>
        </div>

        <div className="space-y-4">
          {/* Risk Profile Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('riskProfile')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'conservative', label: t('conservative'), desc: t('conservativeDesc') },
                { id: 'balanced', label: t('balanced'), desc: t('balancedDesc') },
                { id: 'aggressive', label: t('aggressive'), desc: t('aggressiveDesc') }
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
              {t('investmentGoals')}
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
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              isGeneratingStrategy || assets.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : apiStatus === 'working'
                ? 'bg-success-600 hover:bg-success-700 text-white' 
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {isGeneratingStrategy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('generatingStrategy')}
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                {apiStatus === 'working' ? t('generateRealAiStrategy') : t('generateStrategy')}
              </>
            )}
          </button>
          
          {!import.meta.env.VITE_OPENAI_API_KEY_PFB && (
            <div className="mt-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-700">
               <strong>{t('note')}:</strong> {t('aiConfigNote')}
              </p>
              <p className="text-xs text-warning-600 mt-1">
               {t('fallbackStrategyNote')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};