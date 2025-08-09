import React, { useState } from 'react';
import { PieChart, TrendingUp, BarChart3, Bot, Briefcase } from 'lucide-react';
import { Asset, Strategy } from './types/portfolio';
import { Language } from './types/language';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { ProjectionChart } from './components/ProjectionChart';
import { MultiStrategyProjectionChart } from './components/MultiStrategyProjectionChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { LanguageSelector } from './components/LanguageSelector';
import { SEOHead } from './components/SEOHead';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage, generateCurrentStrategy } from './utils/calculations';
import { getTranslation } from './utils/translations';
import { ASSET_COLORS } from './types/portfolio';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai'>('portfolio');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [aiStrategies, setAiStrategies] = useState<Strategy[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set());

  const t = (key: string) => getTranslation(language, key);

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
    setAiStrategies(prev => {
      const filtered = prev.filter(s => s.id !== strategy.id);
      return [...filtered, strategy];
    });
    setActiveTab('strategies');
  };

  const handleToggleStrategy = (strategyId: string) => {
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

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets);
  const allStrategies = [currentStrategy, ...aiStrategies];
  const selectedStrategyList = allStrategies.filter(s => selectedStrategies.has(s.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead language={language} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
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
                    <p className="font-bold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-bold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
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
            {[
              { id: 'portfolio', label: t('portfolio'), icon: PieChart },
              { id: 'strategies', label: t('strategies'), icon: BarChart3 },
              { id: 'ai', label: t('aiAssistant'), icon: Bot }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset del Portfolio ({assets.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                            <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAsset(asset.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          ×
                        </button>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assets.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun Asset</h3>
                <p className="text-gray-600">{t('noAssetsMessage')}</p>
              </div>
            )}

            {/* Portfolio Metrics and Charts */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Portfolio Metrics */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalValue')}</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                      <p className="text-xl font-bold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-xl font-bold text-warning-600">{metrics.riskScore.toFixed(1)}/5</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-xl font-bold text-primary-600">{metrics.diversificationScore}/100</p>
                    </div>
                  </div>
                </div>

                {/* Current Allocation Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} />
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

            {assets.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna Strategia</h3>
                <p className="text-gray-600">{t('noAssetsMessage')}</p>
              </div>
            ) : (
              <>
                {/* Strategies List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Strategie Disponibili ({allStrategies.length})
                  </h3>
                  <div className="space-y-6">
                    {allStrategies.map((strategy) => (
                      <div key={strategy.id} className="card">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Strategy Info */}
                          <div className="space-y-4">
                            <StrategyCard
                              strategy={strategy}
                              assets={assets}
                              isSelected={selectedStrategies.has(strategy.id)}
                              onSelect={() => handleToggleStrategy(strategy.id)}
                              language={language}
                            />
                          </div>
                          
                          {/* Strategy Chart */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Allocazione Target</h4>
                            <PortfolioChart 
                              assets={assets} 
                              language={language}
                              targetAllocations={strategy.targetAllocations}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Comparison */}
                {selectedStrategyList.length > 0 && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Confronto Strategie Selezionate ({selectedStrategyList.length})
                    </h3>
                    
                    <div className="space-y-8">
                      {/* Multi-Strategy Projection Chart */}
                      <div className="card">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Proiezione Crescita Comparativa
                        </h4>
                        <MultiStrategyProjectionChart
                          strategies={selectedStrategyList}
                          assets={assets}
                          language={language}
                        />
                      </div>

                      {/* Strategy Comparison Table */}
                      <StrategyComparison
                        strategies={selectedStrategyList}
                        language={language}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
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