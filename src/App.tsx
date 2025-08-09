import React, { useState } from 'react';
import { PieChart, TrendingUp, BarChart3, Bot, Target, Shield, Zap } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { MultiStrategyProjectionChart } from './components/MultiStrategyProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { PACManager } from './components/PACManager';
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
  const [pacPlans, setPacPlans] = useState<PACPlan[]>([]);

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
    setAiStrategies(prev => [...prev, strategy]);
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

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets);
  const selectedStrategyList = aiStrategies.filter(s => selectedStrategies.has(s.id));
  
  // Always include current strategy in comparisons
  const strategiesForComparison = [currentStrategy, ...selectedStrategyList];

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
            {[
              { id: 'portfolio', label: t('portfolio'), icon: PieChart },
              { id: 'strategies', label: t('strategies'), icon: BarChart3 },
              { id: 'ai', label: t('aiAssistant'), icon: Bot }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
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
            <AssetForm onAddAsset={handleAddAsset} language={language} />

            {/* Assets List */}
            {assets.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Asset del Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                            />
                            <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveAsset(asset.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Allocazione:</span>
                          <span className="font-semibold text-primary-600">
                            {((asset.currentValue / metrics.totalValue) * 100).toFixed(1)}%
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

                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} />
                </div>
              </div>
            )}

            {/* PAC Manager */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-warning-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-warning-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('pacTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('pacDescription')}</p>
                </div>
              </div>
              <PACManager
                assets={assets}
                pacPlans={pacPlans}
                onAddPAC={handleAddPAC}
                onRemovePAC={handleRemovePAC}
                language={language}
              />
            </div>
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
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun Asset</h3>
                <p className="text-gray-600">{t('noAssetsMessage')}</p>
              </div>
            ) : (
              <>
                {/* Strategies List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategie Disponibili</h3>
                  <div className="space-y-6">
                    {/* Current Strategy */}
                    <div className="card">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Strategy Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Target className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{currentStrategy.name}</h4>
                              <p className="text-sm text-gray-600">{currentStrategy.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="metric-card">
                              <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                              <p className="text-lg font-bold text-success-600">
                                {formatPercentage(currentStrategy.expectedReturn)}
                              </p>
                            </div>
                            <div className="metric-card">
                              <p className="text-sm text-gray-600">{t('riskScore')}</p>
                              <p className={`text-lg font-bold ${
                                currentStrategy.riskScore < 2 ? 'text-success-600' :
                                currentStrategy.riskScore < 3 ? 'text-warning-600' : 'text-error-600'
                              }`}>
                                {currentStrategy.riskScore.toFixed(1)}/5
                              </p>
                            </div>
                            <div className="metric-card">
                              <p className="text-sm text-gray-600">Sharpe Ratio</p>
                              <p className="text-sm font-semibold text-primary-600">
                                {currentStrategy.sharpeRatio.toFixed(2)}
                              </p>
                            </div>
                            <div className="metric-card">
                              <p className="text-sm text-gray-600">{t('volatility')}</p>
                              <p className="text-sm font-semibold text-warning-600">
                                {formatPercentage(currentStrategy.volatility)}
                              </p>
                            </div>
                          </div>

                          {Object.keys(currentStrategy.targetAllocations).length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Allocazione Attuale:</p>
                              <div className="space-y-1 max-h-32 overflow-y-auto">
                                {Object.entries(currentStrategy.targetAllocations).map(([assetId, allocation]) => {
                                  const asset = assets.find(a => a.id === assetId);
                                  if (!asset) return null;
                                  
                                  return (
                                    <div key={assetId} className="flex items-center justify-between text-xs">
                                      <span className="text-gray-600 truncate flex-1 mr-2">
                                        {asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name}
                                      </span>
                                      <span className="font-medium text-gray-900">{allocation}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Strategy Chart */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Allocazione Attuale</h5>
                          <div className="h-64">
                            <PortfolioChart 
                              assets={assets} 
                              language={language}
                              targetAllocations={currentStrategy.targetAllocations}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Generated Strategies */}
                    {aiStrategies.map((strategy) => (
                      <div key={strategy.id} className="card">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Strategy Info */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-100 rounded-lg">
                                  <Bot className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{strategy.name}</h4>
                                  <p className="text-sm text-gray-600">{strategy.description}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                  AI
                                </div>
                                <button
                                  onClick={() => handleToggleStrategy(strategy.id)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    selectedStrategies.has(strategy.id)
                                      ? 'bg-primary-600 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {selectedStrategies.has(strategy.id) ? 'Deseleziona' : 'Seleziona'}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
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
                                <p className="text-sm font-semibold text-primary-600">
                                  {strategy.sharpeRatio.toFixed(2)}
                                </p>
                              </div>
                              <div className="metric-card">
                                <p className="text-sm text-gray-600">{t('volatility')}</p>
                                <p className="text-sm font-semibold text-warning-600">
                                  {formatPercentage(strategy.volatility)}
                                </p>
                              </div>
                            </div>

                            {Object.keys(strategy.targetAllocations).length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Allocazione Target:</p>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {Object.entries(strategy.targetAllocations).map(([assetId, allocation]) => {
                                    const asset = assets.find(a => a.id === assetId);
                                    if (!asset) return null;
                                    
                                    return (
                                      <div key={assetId} className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600 truncate flex-1 mr-2">
                                          {asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name}
                                        </span>
                                        <span className="font-medium text-gray-900">{allocation}%</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
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
                    ))}

                    {aiStrategies.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Nessuna strategia AI generata. Vai alla sezione AI Assistant per crearne una.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Strategy Comparison */}
                {strategiesForComparison.length > 1 && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Confronto Strategie Selezionate ({strategiesForComparison.length})
                    </h3>
                    
                    <div className="space-y-8">
                      {/* Multi-Strategy Projection Chart */}
                      <div className="card">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Proiezione Crescita Comparativa</h4>
                        <MultiStrategyProjectionChart
                          strategies={strategiesForComparison}
                          assets={assets}
                          language={language}
                        />
                      </div>

                      {/* Strategy Comparison */}
                      <StrategyComparison strategies={strategiesForComparison} language={language} />
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