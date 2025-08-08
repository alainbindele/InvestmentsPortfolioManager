import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart3, Bot, Calendar, Target } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { PACManager } from './components/PACManager';
import { SEOHead } from './components/SEOHead';
import { AssetModal } from './components/AssetModal';
import { LanguageSelector } from './components/LanguageSelector';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage, generateCurrentStrategy } from './utils/calculations';
import { getTranslation } from './utils/translations';
import { Language } from './types/language';

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [pacs, setPacs] = useState<PACPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'comparison' | 'ai' | 'pac'>('portfolio');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string) => getTranslation(language, key);

  // Update strategies when assets change
  useEffect(() => {
    const currentStrategy = generateCurrentStrategy(assets);
    const aiStrategies = strategies.filter(s => s.isAIGenerated);
    setStrategies([currentStrategy, ...aiStrategies]);
  }, [assets]);

  const addAsset = (assetData: Omit<Asset, 'id'>) => {
    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const removeAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  const addStrategy = (strategy: Strategy) => {
    setStrategies(prev => {
      const currentStrategy = prev.find(s => s.id === 'current-strategy' || s.id === 'current-empty');
      const aiStrategies = prev.filter(s => s.isAIGenerated);
      return currentStrategy ? [currentStrategy, ...aiStrategies, strategy] : [...aiStrategies, strategy];
    });
  };

  const addPAC = (pacData: Omit<PACPlan, 'id'>) => {
    const newPAC: PACPlan = {
      ...pacData,
      id: Date.now().toString(),
    };
    setPacs(prev => [...prev, newPAC]);
  };

  const removePAC = (pacId: string) => {
    setPacs(prev => prev.filter(pac => pac.id !== pacId));
  };

  const addPACAsAsset = (pacId: string, customReturn: number) => {
    const pac = pacs.find(p => p.id === pacId);
    if (!pac) return;

    // Calculate current value based on PAC parameters
    const monthsElapsed = Math.floor((Date.now() - pac.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const contributionsCount = Math.floor(monthsElapsed / (pac.frequency === 'monthly' ? 1 : pac.frequency === 'quarterly' ? 3 : pac.frequency === 'biannual' ? 6 : 12));
    const totalContributed = contributionsCount * pac.monthlyAmount;
    const currentValue = Math.max(totalContributed * 1.05, pac.monthlyAmount); // Assume 5% growth minimum

    const pacAsset: Omit<Asset, 'id'> = {
      name: `PAC ${pac.name}`,
      type: 'other',
      currentValue: currentValue,
      expectedReturn: customReturn,
      riskLevel: 'medium',
      isPAC: true,
      pacAmount: pac.monthlyAmount,
      pacFrequency: pac.frequency as any,
      pacStartingValue: 0
    };

    addAsset(pacAsset);

    // Mark PAC as added to portfolio
    setPacs(prev => prev.map(p => 
      p.id === pacId ? { ...p, asAsset: true } : p
    ));
  };

  const metrics = calculatePortfolioMetrics(assets);

  const tabs = [
    { id: 'portfolio' as const, label: t('portfolio'), icon: PieChart },
    { id: 'strategies' as const, label: t('strategies'), icon: Target },
    { id: 'comparison' as const, label: t('comparison'), icon: BarChart3 },
    { id: 'ai' as const, label: t('aiAssistant'), icon: Bot },
    { id: 'pac' as const, label: t('pac'), icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead language={language} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {assets.length > 0 && (
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">{t('totalValue')}</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-semibold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
                  </div>
                </div>
              )}
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <AssetForm 
              onAddAsset={addAsset} 
              onRemoveAsset={removeAsset}
              onAssetClick={setSelectedAsset}
              assets={assets}
              pacs={pacs}
              onAddPACAsAsset={addPACAsAsset}
              language={language}
            />
            
            {assets.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PortfolioChart assets={assets} language={language} />
                  
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('riskScore')}</p>
                        <p className="text-2xl font-bold text-warning-600">
                          {metrics.riskScore.toFixed(1)}/5
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('diversification')}</p>
                        <p className="text-2xl font-bold text-primary-600">
                          {metrics.diversificationScore}/100
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('totalAssets')}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {assets.length}
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">Sharpe Ratio</p>
                        <p className="text-2xl font-bold text-success-600">
                          {metrics.sharpeRatio.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ProjectionChart assets={assets} language={language} strategies={strategies} />
              </>
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  assets={assets}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('strategyComparison')}</h2>
              <p className="text-gray-600">{t('comparisonDescription')}</p>
            </div>
            
            <StrategyComparison strategies={strategies} language={language} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('aiAssistantTitle')}</h2>
              <p className="text-gray-600">{t('aiDescription')}</p>
            </div>
            
            <ChatGPTIntegration 
              assets={assets} 
              language={language}
              onStrategyGenerated={addStrategy}
            />
          </div>
        )}

        {activeTab === 'pac' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pacTitle')}</h2>
              <p className="text-gray-600">{t('pacDescription')}</p>
            </div>
            
            <PACManager 
              assets={assets}
              pacs={pacs}
              onAddPAC={addPAC}
              onRemovePAC={removePAC}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Asset Modal */}
      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          language={language}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
}

export default App;