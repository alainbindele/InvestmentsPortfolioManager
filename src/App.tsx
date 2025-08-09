import React, { useState } from 'react';
import { TrendingUp, PieChart, Bot, Target, Shield, Zap, Plus, X, Trash2 } from 'lucide-react';
import { Asset, Strategy, AssetType, RiskLevel } from './types/portfolio';
import { Language } from './types/language';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { ProjectionChart } from './components/ProjectionChart';
import { MultiStrategyProjectionChart } from './components/MultiStrategyProjectionChart';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { LanguageSelector } from './components/LanguageSelector';
import { SEOHead } from './components/SEOHead';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency, formatPercentage } from './utils/calculations';
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
  const selectedStrategyObjects = allStrategies.filter(s => selectedStrategies.has(s.id));

  const tabs = [
    { id: 'portfolio' as const, label: t('portfolio'), icon: PieChart },
    { id: 'strategies' as const, label: t('strategies'), icon: Target },
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
                    <p className="font-bold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-bold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
                  </div>
                </div>
              )}
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
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
            {/* Asset Management */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('yourAssets')}</h2>
                  <p className="text-gray-600">Gestisci i tuoi asset di investimento</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Asset Form */}
                <div className="lg:col-span-1">
                  <AssetForm onAddAsset={handleAddAsset} language={language} />
                </div>

                {/* Asset List */}
                <div className="lg:col-span-2">
                  {assets.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <PieChart className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun Asset</h3>
                      <p className="text-gray-600">{t('noAssetsMessage')}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assets.map((asset) => (
                        <div key={asset.id} className="card">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {t(asset.type)} • {t(asset.riskLevel)} risk
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  {formatCurrency(asset.currentValue)}
                                </p>
                                <p className="text-sm text-success-600">
                                  {formatPercentage(asset.expectedReturn)} atteso
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveAsset(asset.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Portfolio Overview */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('currentAllocation')}
                  </h3>
                  <PortfolioChart assets={assets} language={language} />
                </div>

                {/* Portfolio Metrics */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('portfolioMetrics')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalPortfolioValue')}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(metrics.totalValue)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                      <p className="text-xl font-bold text-success-600">
                        {formatPercentage(metrics.expectedReturn)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-xl font-bold text-warning-600">
                        {metrics.riskScore.toFixed(1)}/5
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-xl font-bold text-primary-600">
                        {metrics.diversificationScore}/100
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
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>

            {assets.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna Strategia</h3>
                <p className="text-gray-600">{t('noAssetsMessage')}</p>
              </div>
            ) : (
              <>
                {/* Strategies List */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Strategie Disponibili</h3>
                  
                  {allStrategies.map((strategy) => {
                    const isSelected = selectedStrategies.has(strategy.id);
                    const isCurrentStrategy = strategy.id === 'current-strategy';
                    
                    // Get strategy icon and color
                    const getStrategyIcon = () => {
                      if (strategy.isAIGenerated) return Bot;
                      if (strategy.riskScore < 2) return Shield;
                      if (strategy.riskScore > 3) return Zap;
                      return Target;
                    };

                    const getStrategyColor = () => {
                      if (strategy.isAIGenerated) return 'primary';
                      if (strategy.riskScore < 2) return 'success';
                      if (strategy.riskScore > 3) return 'warning';
                      return 'gray';
                    };

                    const Icon = getStrategyIcon();
                    const colorClass = getStrategyColor();

                    return (
                      <div
                        key={strategy.id}
                        className={`card transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                            : isCurrentStrategy
                            ? 'bg-gray-50 border-gray-300'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Strategy Info */}
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  colorClass === 'primary' ? 'bg-primary-100' :
                                  colorClass === 'success' ? 'bg-success-100' :
                                  colorClass === 'warning' ? 'bg-warning-100' : 'bg-gray-100'
                                }`}>
                                  <Icon className={`w-5 h-5 ${
                                    colorClass === 'primary' ? 'text-primary-600' :
                                    colorClass === 'success' ? 'text-success-600' :
                                    colorClass === 'warning' ? 'text-warning-600' : 'text-gray-600'
                                  }`} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{strategy.name}</h4>
                                  <p className="text-sm text-gray-600">{strategy.description}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {strategy.isAIGenerated && (
                                  <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                    AI
                                  </div>
                                )}
                                {isSelected && (
                                  <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
                                    ✓ Selezionata
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="metric-card">
                                <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                                <p className="text-lg font-bold text-success-600">
                                  {formatPercentage(strategy.expectedReturn)}
                                </p>
                              </div>
                              <div className="metric-card">
                                <p className="text-sm text-gray-600">{t('riskScore')}</p>
                                <p className={`text-lg font-bold ${
                                  strategy.riskScore < 2 ? 'text-success-600' :
                                  strategy.riskScore < 3 ? 'text-warning-600' : 'text-error-600'
                                }`}>
                                  {strategy.riskScore.toFixed(1)}/5
                                </p>
                              </div>
                              <div className="metric-card">
                                <p className="text-sm text-gray-600">Sharpe Ratio</p>
                                <p className="text-lg font-bold text-primary-600">
                                  {strategy.sharpeRatio.toFixed(2)}
                                </p>
                              </div>
                              <div className="metric-card">
                                <p className="text-sm text-gray-600">{t('volatility')}</p>
                                <p className="text-lg font-bold text-warning-600">
                                  {formatPercentage(strategy.volatility)}
                                </p>
                              </div>
                            </div>

                            {/* Allocations */}
                            {Object.keys(strategy.targetAllocations).length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Allocazione Target:</p>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {Object.entries(strategy.targetAllocations).map(([assetId, allocation]) => {
                                    const asset = assets.find(a => a.id === assetId);
                                    if (!asset) return null;
                                    
                                    return (
                                      <div key={assetId} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 truncate flex-1 mr-2">
                                          {asset.name.length > 25 ? asset.name.substring(0, 25) + '...' : asset.name}
                                        </span>
                                        <span className="font-medium text-gray-900">{allocation}%</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Selection Button */}
                            {!isCurrentStrategy && (
                              <button
                                onClick={() => handleToggleStrategy(strategy.id)}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                  isSelected
                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {isSelected ? 'Deseleziona' : 'Seleziona per Confronto'}
                              </button>
                            )}
                          </div>

                          {/* Strategy Chart */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Allocazione Target</h5>
                            <div className="h-64">
                              <PortfolioChart 
                                assets={assets} 
                                language={language}
                                targetAllocations={strategy.targetAllocations}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strategy Comparison */}
                {selectedStrategyObjects.length > 0 && (
                  <div className="border-t border-gray-200 pt-8 space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Confronto Strategie Selezionate ({selectedStrategyObjects.length})
                      </h3>
                      <p className="text-gray-600">
                        Analisi comparativa delle strategie selezionate
                      </p>
                    </div>

                    <div className="card">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Proiezione Crescita Comparativa
                      </h4>
                      <MultiStrategyProjectionChart
                        strategies={selectedStrategyObjects}
                        assets={assets}
                        language={language}
                      />
                    </div>

                    <StrategyComparison strategies={selectedStrategyObjects} language={language} />
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
              <p className="text-gray-600">{t('aiDescription')}</p>
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