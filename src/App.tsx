import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, TrendingUp, Bot, Trash2, Calendar } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency, formatPercentage } from './utils/calculations';
import { getTranslation } from './utils/translations';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/LanguageSelector';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [aiStrategies, setAiStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'comparison' | 'ai'>('portfolio');

  const t = (key: string) => getTranslation(language, key);

  // Generate current strategy based on assets
  const currentStrategy = generateCurrentStrategy(assets);
  const portfolioMetrics = calculatePortfolioMetrics(assets);

  // All strategies (current + AI generated)
  const allStrategies = [currentStrategy, ...aiStrategies];

  const handleAddAsset = (assetData: Omit<Asset, 'id'>) => {
    const newAsset: Asset = {
      ...assetData,
      id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
    // Reset selected strategy if it becomes invalid
    if (selectedStrategy && !aiStrategies.find(s => s.id === selectedStrategy.id)) {
      setSelectedStrategy(null);
    }
  };

  const handleStrategyGenerated = (strategy: Strategy) => {
    setAiStrategies(prev => {
      const filtered = prev.filter(s => s.id !== strategy.id);
      return [...filtered, strategy];
    });
    setSelectedStrategy(strategy);
    setActiveTab('strategies');
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy.id === selectedStrategy?.id ? null : strategy);
  };

  const tabs = [
    { id: 'portfolio' as const, label: t('portfolio'), icon: PieChart },
    { id: 'strategies' as const, label: t('strategies'), icon: BarChart3 },
    { id: 'comparison' as const, label: t('comparison'), icon: TrendingUp },
    { id: 'ai' as const, label: t('aiAssistant'), icon: Bot }
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
                    <p className="font-bold text-gray-900">
                      {formatCurrency(portfolioMetrics.totalValue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-bold text-success-600">
                      {formatPercentage(portfolioMetrics.expectedReturn)}
                    </p>
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
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
            {/* Asset Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('yourAssets')}</h2>
              <AssetForm onAddAsset={handleAddAsset} language={language} />
            </div>

            {/* Assets List */}
            {assets.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Asset Aggiunti ({assets.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                            {asset.isPAC && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                                <Calendar className="w-3 h-3" />
                                PAC
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveAsset(asset.id)}
                          className="p-1 text-gray-400 hover:text-error-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Valore:</span>
                          <span className="font-semibold">{formatCurrency(asset.currentValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rendimento:</span>
                          <span className="font-semibold text-success-600">
                            {formatPercentage(asset.expectedReturn)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rischio:</span>
                          <span className={`font-semibold capitalize ${
                            asset.riskLevel === 'low' ? 'text-success-600' :
                            asset.riskLevel === 'medium' ? 'text-warning-600' : 'text-error-600'
                          }`}>
                            {t(asset.riskLevel)}
                          </span>
                        </div>
                        {asset.isPAC && asset.pacAmount && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">PAC:</span>
                            <span className="font-semibold text-primary-600">
                              {formatCurrency(asset.pacAmount)}/{asset.pacFrequency === 'monthly' ? 'mese' : 
                               asset.pacFrequency === 'quarterly' ? 'trim' : 
                               asset.pacFrequency === 'biannual' ? 'sem' : 'anno'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Analysis */}
            {assets.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PortfolioChart assets={assets} language={language} />
                  
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                        <p className="text-2xl font-bold text-success-600">
                          {formatPercentage(portfolioMetrics.expectedReturn)}
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('riskScore')}</p>
                        <p className="text-2xl font-bold text-warning-600">
                          {portfolioMetrics.riskScore.toFixed(1)}/5
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('diversification')}</p>
                        <p className="text-2xl font-bold text-primary-600">
                          {portfolioMetrics.diversificationScore}/100
                        </p>
                      </div>
                      <div className="metric-card">
                        <p className="text-sm text-gray-600">{t('totalAssets')}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {assets.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Projection */}
                <ProjectionChart
                  currentStrategy={currentStrategy}
                  selectedStrategy={selectedStrategy}
                  assets={assets}
                  language={language}
                />
              </>
            )}

            {assets.length === 0 && (
              <div className="text-center py-12">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Inizia a costruire il tuo portfolio
                </h3>
                <p className="text-gray-600">
                  {t('noAssetsMessage')}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600 mb-6">{t('strategiesDescription')}</p>
            </div>

            {assets.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {allStrategies.map((strategy) => (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    assets={assets}
                    isSelected={selectedStrategy?.id === strategy.id}
                    onSelect={() => handleStrategySelect(strategy)}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aggiungi asset per vedere le strategie
                </h3>
                <p className="text-gray-600">
                  Vai alla tab Portfolio e aggiungi i tuoi asset per generare strategie di investimento.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('strategyComparison')}</h2>
              <p className="text-gray-600 mb-6">{t('comparisonDescription')}</p>
            </div>

            <StrategyComparison strategies={allStrategies} language={language} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('aiAssistantTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('aiDescription')}</p>
            </div>

            <ChatGPTIntegration
              assets={assets}
              language={language}
              onStrategyGenerated={handleStrategyGenerated}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;