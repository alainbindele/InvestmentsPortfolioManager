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

    // Get locked assets
    const lockedAssets = assets.filter(asset => asset.isLocked).map(asset => asset.id);
    setIsGeneratingStrategy(true);
    setErrorMessage('');
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      const strategy = await chatGPTService.generateStrategy(assets, selectedRiskProfile, goals, language, lockedAssets);
      onStrategyGenerated(strategy);
      setApiStatus('working');
    } catch (error) {
      console.error('Errore nella generazione della strategia:', error);
      setApiStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Errore sconosciuto');
      // Genera comunque una strategia di fallback
      try {
        const strategy = await chatGPTService.generateStrategy(assets, selectedRiskProfile, goals, language, lockedAssets);
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
      {/* Portfolio Analysis */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="icon-tile icon-tile-success">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h3 className="section-title">{t('aiPortfolioAnalysis')}</h3>
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
                <p className="eyebrow">{t('totalValue')}</p>
                <p className="mt-1 text-lg font-semibold text-ink num">
                  €{analysis.currentMetrics.totalValue.toLocaleString('it-IT')}
                </p>
              </div>
              <div className="metric-card">
                <p className="eyebrow">{t('expectedReturn')}</p>
                <p className="mt-1 text-lg font-semibold text-success-400 num">
                  {analysis.currentMetrics.expectedReturn.toFixed(1)}%
                </p>
              </div>
              <div className="metric-card">
                <p className="eyebrow">{t('risk')}</p>
                <p className="mt-1 text-lg font-semibold text-warning-400 num">
                  {analysis.currentMetrics.riskScore.toFixed(1)}/5
                </p>
              </div>
              <div className="metric-card">
                <p className="eyebrow">{t('diversification')}</p>
                <p className="mt-1 text-lg font-semibold text-accent-300 num">
                  {analysis.currentMetrics.diversificationScore}/100
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="callout callout-info !p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-primary-300" />
                <h4 className="font-semibold text-primary-200">
                  {t('aiRecommendations')}
                  {apiStatus === 'working' && <span className="ml-2 badge badge-success">AI</span>}
                  {apiStatus === 'error' && <span className="ml-2 badge badge-warning">Fallback</span>}
                </h4>
              </div>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-primary-200 flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Market Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold text-ink flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-ink-muted" />
                {t('marketInsights')}
                {apiStatus === 'working' && <span className="badge badge-success">AI</span>}
              </h4>
              {analysis.marketInsights.map((insight, index) => (
                <div key={index} className="panel-inset p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-ink">{insight.asset}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-subtle">{insight.timeframe}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        insight.confidence > 0.8 ? 'bg-success-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]' :
                        insight.confidence > 0.6 ? 'bg-warning-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]' : 'bg-error-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]'
                      }`} />
                    </div>
                  </div>
                  <p className="text-sm text-ink-soft">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Strategy Generation */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="icon-tile icon-tile-accent">
            <Bot className="w-5 h-5" />
          </span>
          <h3 className="section-title">
            {t('aiStrategyGeneration')}
            {apiStatus === 'working' && <span className="ml-2 badge badge-success">{t('aiActive')}</span>}
          </h3>
        </div>

        <div className="space-y-4">
          {/* Risk Profile Selection */}
          <div>
            <label className="field-label !mb-2">
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
                  className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                    selectedRiskProfile === profile.id
                      ? 'border-primary-400/60 bg-primary-500/15 text-primary-200 shadow-glow'
                      : 'border-line bg-white/[0.04] text-ink-soft hover:bg-white/[0.07] hover:border-line-strong'
                  }`}
                >
                  <p className="font-medium text-sm">{profile.label}</p>
                  <p className="text-xs text-ink-subtle">{profile.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          <div>
            <label className="field-label !mb-2">
              {t('investmentGoals')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                    goals.includes(goal.id)
                      ? 'border-accent-400/50 bg-accent-500/10 text-accent-200'
                      : 'border-line bg-white/[0.04] text-ink-soft hover:bg-white/[0.07] hover:border-line-strong'
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
            className="btn-primary w-full !py-2.5"
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
            <div className="callout callout-warning mt-3">
              <p className="text-sm text-warning-300">
               <strong>{t('note')}:</strong> {t('aiConfigNote')}
              </p>
              <p className="text-xs text-warning-300/80 mt-1">
               {t('fallbackStrategyNote')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};