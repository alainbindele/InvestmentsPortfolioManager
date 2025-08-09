import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, Bot, TrendingUp, Wallet, Calendar } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { ProjectionChart } from './components/ProjectionChart';
import { MultiStrategyProjectionChart } from './components/MultiStrategyProjectionChart';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { PACManager } from './components/PACManager';
import { LanguageSelector } from './components/LanguageSelector';
import { SEOHead } from './components/SEOHead';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency, formatPercentage } from './utils/calculations';
import { getTranslation } from './utils/translations';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai' | 'pac'>('portfolio');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set());
  const [pacPlans, setPacPlans] = useState<PACPlan[]>([]);

  const t = (key: string) => getTranslation(language, key);

  // Generate current strategy based on assets
  const currentStrategy = generateCurrentStrategy(assets);
  const allStrategies = [currentStrategy, ...strategies];

  // Calculate portfolio metrics
  const portfolioMetrics = calculatePortfolioMetrics(assets);

  const handleAddAsset = (assetData: Omit<Asset, 'id'>) => {
    const newAsset: Asset = {
      ...assetData,
      id: `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  const handleStrategyGenerated = (strategy: Strategy) => {
    setStrategies(prev => {
      const filtered = prev.filter(s => s.id !== strategy.id);
      return [...filtered, strategy];
    });
  };

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(strategyId)) {
        newSet.delete(strategyId);
      } else {
        newSet.add(strategyId);
      }
      return newSet;
    });
  };

  const handleAddPAC = (pacData: Omit<PACPlan, 'id'>) => {
    const newPAC: PACPlan = {
      ...pacData,
      id: `pac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setPacPlans(prev => [...prev, newPAC]);
  };

  const handleRemovePAC = (pacId: string) => {
    setPacPlans(prev => prev.filter(pac => pac.id !== pacId));
  };

  const selectedStrategiesList = allStrategies.filter(s => selectedStrategies.has(s.id));

  const tabs = [
    { id: 'portfolio' as const, label: t('portfolio'), icon: Wallet },
    { id: 'strategies' as const, label: t('strategies'), icon: BarChart3 },
    { id: 'ai' as const, label: t('aiAssistant'), icon: Bot },
    { id: 'pac' as const, label: t('pac'), icon: Calendar }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Aggiunti ({assets.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {asset.isPAC && (
                            <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              PAC
                            </div>
                          )}
                          <button
                            onClick={() => handleRemoveAsset(asset.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Valore:</span>
                          <span className="font-semibold">{formatCurrency(asset.currentValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rendimento:</span>
                          <span className="font-semibold text-success-600">{formatPercentage(asset.expectedReturn)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rischio:</span>
                          <span className={`font-semibold ${
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
                               asset.pacFrequency === 'quarterly' ? 'trimestre' : 
                               asset.pacFrequency === 'biannual' ? 'semestre' : 'anno'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assets.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun Asset</h3>
                <p className="text-gray-600">{t('noAssetsMessage')}</p>
              </div>
            )}

            {/* Portfolio Analysis */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} />
                </div>

                {/* Portfolio Metrics */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalPortfolioValue')}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(portfolioMetrics.totalValue)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                      <p className="text-xl font-bold text-success-600">
                        {formatPercentage(portfolioMetrics.expectedReturn)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-xl font-bold text-warning-600">
                        {portfolioMetrics.riskScore.toFixed(1)}/5
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-xl font-bold text-primary-600">
                        {portfolioMetrics.diversificationScore}/100
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Projection */}
            {assets.length > 0 && (
              <ProjectionChart
                currentStrategy={currentStrategy}
                selectedStrategy={null}
                assets={assets}
                language={language}
              />
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600 mb-6">{t('strategiesDescription')}</p>
            </div>

            {/* Strategies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {allStrategies.map((strategy) => (
                <div key={strategy.id} className="space-y-4">
                  <StrategyCard
                    strategy={strategy}
                    assets={assets}
                    isSelected={selectedStrategies.has(strategy.id)}
                    onSelect={() => handleStrategySelect(strategy.id)}
                    language={language}
                  />
                  
                  {/* Pie Chart for Strategy */}
                  {assets.length > 0 && Object.keys(strategy.targetAllocations).length > 0 && (
                    <div className="card">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Allocazione Target</h4>
                      <PortfolioChart 
                        assets={assets} 
                        language={language} 
                        targetAllocations={strategy.targetAllocations}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {assets.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna Strategia</h3>
                <p className="text-gray-600">Aggiungi asset nella sezione Portfolio per vedere le strategie</p>
              </div>
            )}

            {/* Strategy Comparison */}
            {selectedStrategiesList.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Confronto Strategie Selezionate</h3>
                  <p className="text-gray-600">
                    Confronta le performance delle {selectedStrategiesList.length} strategie selezionate
                  </p>
                </div>

                {/* Multi-Strategy Projection Chart */}
                <div className="card">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Proiezione Crescita Comparativa</h4>
                  <MultiStrategyProjectionChart
                    strategies={selectedStrategiesList}
                    assets={assets}
                    language={language}
                  />
                </div>

                {/* Strategy Comparison Table */}
                <StrategyComparison strategies={selectedStrategiesList} language={language} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('aiAssistantTitle')}</h2>
            <p className="text-gray-600 mb-6">{t('aiDescription')}</p>
            
            <ChatGPTIntegration
              assets={assets}
              language={language}
              onStrategyGenerated={handleStrategyGenerated}
            />
          </div>
        )}

        {activeTab === 'pac' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pacTitle')}</h2>
            <p className="text-gray-600 mb-6">{t('pacDescription')}</p>
            
            <PACManager
              assets={assets}
              pacPlans={pacPlans}
              onAddPAC={handleAddPAC}
              onRemovePAC={handleRemovePAC}
              language={language}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;