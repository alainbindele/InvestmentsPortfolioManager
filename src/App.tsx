import React, { useState } from 'react';
import { PieChart, BarChart3, TrendingUp, Target, Trash2, Bot, Edit } from 'lucide-react';
import { Asset, Strategy, ASSET_COLORS } from './types/portfolio';
import { Language } from './types/language';
import { Currency } from './types/currency';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { MultiStrategyProjectionChart } from './components/MultiStrategyProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { ProjectionChart } from './components/ProjectionChart';
import { LanguageSelector } from './components/LanguageSelector';
import { CurrencySelector } from './components/CurrencySelector';
import { SEOHead } from './components/SEOHead';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage, generateCurrentStrategy } from './utils/calculations';
import { getTranslation } from './utils/translations';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set());
  const [aiStrategies, setAiStrategies] = useState<Strategy[]>([]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai'>('portfolio');
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

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
    // If we're editing this asset, cancel the edit
    if (editingAsset && editingAsset.id === assetId) {
      setEditingAsset(null);
    }
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
  };

  const handleUpdateAsset = (assetData: Omit<Asset, 'id'>) => {
    if (!editingAsset) return;
    
    const updatedAsset: Asset = {
      ...assetData,
      id: editingAsset.id
    };
    
    setAssets(prev => prev.map(asset => 
      asset.id === editingAsset.id ? updatedAsset : asset
    ));
    setEditingAsset(null);
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
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

  const handleStrategyGenerated = (strategy: Strategy) => {
    setAiStrategies(prev => [...prev, strategy]);
    setActiveTab('strategies');
  };

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets);
  const selectedStrategyList = aiStrategies.filter(s => selectedStrategies.has(s.id));
  const strategiesForComparison = selectedStrategyList.length > 0 ? [currentStrategy, ...selectedStrategyList] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead language={language} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
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
                    <p className="font-bold text-gray-900">{formatCurrency(metrics.totalValue, currency)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-bold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
                  </div>
                </div>
              )}
              <CurrencySelector currentCurrency={currency} onCurrencyChange={setCurrency} />
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
              { id: 'strategies', label: t('strategies'), icon: Target },
              { id: 'ai', label: t('aiAssistant'), icon: Bot }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
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
            <AssetForm 
              onAddAsset={handleAddAsset} 
              onUpdateAsset={handleUpdateAsset}
              onCancelEdit={handleCancelEdit}
              editingAsset={editingAsset}
              language={language} 
            />

            {/* Assets List */}
            {assets.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('portfolioAssets')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            currency={currency}
                            style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAsset(asset.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title={t('delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditAsset(asset)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors ml-1"
                          title={t('edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('currentValue')}:</span>
                          <span className="font-semibold">{formatCurrency(asset.currentValue, currency)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('expectedReturn')}:</span>
                          <span className="font-semibold text-success-600">{formatPercentage(asset.expectedReturn)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('risk')}:</span>
                          <span className={`font-semibold capitalize ${
                            asset.riskLevel === 1 ? 'text-success-600' :
                            asset.riskLevel <= 3 ? 'text-warning-600' : 'text-error-600'
                          }`}>
                            {asset.riskLevel}/5
                          </span>
                        </div>
                        {asset.isPAC && (
                          <div className="pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-primary-500 rounded-full" />
                              <span className="text-xs font-medium text-primary-700">{t('pacActive')}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {formatCurrency(asset.pacAmount || 0, currency)}/{
                                asset.pacFrequency === 'monthly' ? t('monthly') :
                                asset.pacFrequency === 'quarterly' ? t('quarterly') :
                                asset.pacFrequency === 'biannual' ? t('biannual') : t('annual')
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Metrics */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalValue')}</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(metrics.totalValue, currency)}</p>
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

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} currency={currency} />
                </div>
              </div>
            )}

            {/* Portfolio Growth Projection */}
            {assets.length > 0 && (
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('portfolioGrowthProjection')}</h3>
                    <p className="text-sm text-gray-600">
                      {t('portfolioGrowthDescription')}
                    </p>
                  </div>
                </div>
                <ProjectionChart
                  currentStrategy={currentStrategy}
                  selectedStrategy={null}
                  assets={assets}
                  language={language}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>

            {/* Current Strategy */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentStrategy')}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StrategyCard
                  strategy={currentStrategy}
                  assets={assets}
                  currency={currency}
                  isSelected={false}
                  onSelect={() => {}}
                  language={language}
                />
                <div className="card">
                  <h4 className="font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h4>
                  <PortfolioChart assets={assets} language={language} />
                </div>
              </div>
            </div>

            {/* AI Generated Strategies */}
            {aiStrategies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('aiGeneratedStrategies')} ({aiStrategies.length})
                </h3>
                <div className="space-y-6">
                  {aiStrategies.map((strategy) => (
                    <div key={strategy.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <StrategyCard
                        strategy={strategy}
                        assets={assets}
                        currency={currency}
                        isSelected={selectedStrategies.has(strategy.id)}
                        onSelect={() => handleToggleStrategy(strategy.id)}
                        language={language}
                      />
                      <div className="card">
                        <h4 className="font-semibold text-gray-900 mb-4">{t('targetAllocation')}</h4>
                        <PortfolioChart assets={assets} language={language} currency={currency} />
                          assets={assets} 
                          language={language} 
                          targetAllocations={strategy.targetAllocations}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Comparison */}
            {strategiesForComparison.length > 1 && (
              <div className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('compareStrategies')} ({strategiesForComparison.length})
                  </h3>
                  <p className="text-gray-600">
                    {t('strategiesDescription')}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="card">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      <TrendingUp className="w-5 h-5 inline mr-2" />
                      {t('portfolioProjection')}
                    </h4>
                    <MultiStrategyProjectionChart
                      strategies={strategiesForComparison}
                      assets={assets}
                      language={language}
                    />
                  </div>

                  <StrategyComparison strategies={strategiesForComparison} language={language} />
                </div>
              </div>
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