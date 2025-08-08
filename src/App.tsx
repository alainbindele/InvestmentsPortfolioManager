import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart3, Bot, Trash2 } from 'lucide-react';
import { Asset, Strategy, ASSET_TYPE_LABELS } from './types/portfolio';
import { Language } from './types/language';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency, formatPercentage, projectPortfolioGrowth } from './utils/calculations';
import { getTranslation } from './utils/translations';
import { SEOHead } from './components/SEOHead';
import { LanguageSelector } from './components/LanguageSelector';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';

type Tab = 'portfolio' | 'strategies' | 'comparison' | 'ai';

function App() {
  const [language, setLanguage] = useState<Language>('it');
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  const t = (key: string) => getTranslation(language, key);

  // Generate predefined strategies when assets change
  useEffect(() => {
    if (assets.length > 0) {
      const currentStrategy = generateCurrentStrategy(assets);
      const conservativeStrategy: Strategy = {
        id: 'conservative',
        name: t('conservativeStrategy'),
        description: 'Strategia a basso rischio con focus sulla preservazione del capitale',
        targetAllocations: generateConservativeAllocations(assets),
        expectedReturn: 4.5,
        riskScore: 1.5,
        sharpeRatio: 1.2,
        maxDrawdown: 12,
        volatility: 8.5,
        createdAt: new Date(),
        isAIGenerated: false
      };

      const balancedStrategy: Strategy = {
        id: 'balanced',
        name: t('balancedStrategy'),
        description: 'Strategia equilibrata tra crescita e stabilità',
        targetAllocations: generateBalancedAllocations(assets),
        expectedReturn: 6.8,
        riskScore: 2.2,
        sharpeRatio: 1.8,
        maxDrawdown: 18,
        volatility: 12.3,
        createdAt: new Date(),
        isAIGenerated: false
      };

      const aggressiveStrategy: Strategy = {
        id: 'aggressive',
        name: t('aggressiveStrategy'),
        description: 'Strategia ad alto rendimento con maggiore esposizione al rischio',
        targetAllocations: generateAggressiveAllocations(assets),
        expectedReturn: 9.2,
        riskScore: 2.8,
        sharpeRatio: 2.1,
        maxDrawdown: 25,
        volatility: 16.8,
        createdAt: new Date(),
        isAIGenerated: false
      };

      setStrategies(prev => {
        const aiStrategies = prev.filter(s => s.isAIGenerated);
        return [currentStrategy, conservativeStrategy, balancedStrategy, aggressiveStrategy, ...aiStrategies];
      });
    } else {
      setStrategies([]);
      setSelectedStrategy(null);
    }
  }, [assets, language]);

  const generateConservativeAllocations = (assets: Asset[]): { [assetId: string]: number } => {
    const allocations: { [assetId: string]: number } = {};
    assets.forEach(asset => {
      switch (asset.type) {
        case 'bonds':
        case 'cash':
          allocations[asset.id] = 35;
          break;
        case 'etf':
        case 'stocks':
          allocations[asset.id] = 25;
          break;
        case 'real_estate':
          allocations[asset.id] = 20;
          break;
        default:
          allocations[asset.id] = 5;
      }
    });
    return normalizeAllocations(allocations);
  };

  const generateBalancedAllocations = (assets: Asset[]): { [assetId: string]: number } => {
    const allocations: { [assetId: string]: number } = {};
    assets.forEach(asset => {
      switch (asset.type) {
        case 'etf':
        case 'stocks':
          allocations[asset.id] = 40;
          break;
        case 'bonds':
          allocations[asset.id] = 25;
          break;
        case 'real_estate':
          allocations[asset.id] = 20;
          break;
        case 'cash':
          allocations[asset.id] = 10;
          break;
        default:
          allocations[asset.id] = 5;
      }
    });
    return normalizeAllocations(allocations);
  };

  const generateAggressiveAllocations = (assets: Asset[]): { [assetId: string]: number } => {
    const allocations: { [assetId: string]: number } = {};
    assets.forEach(asset => {
      switch (asset.type) {
        case 'etf':
        case 'stocks':
          allocations[asset.id] = 55;
          break;
        case 'crypto':
          allocations[asset.id] = 15;
          break;
        case 'real_estate':
          allocations[asset.id] = 15;
          break;
        case 'bonds':
          allocations[asset.id] = 10;
          break;
        default:
          allocations[asset.id] = 5;
      }
    });
    return normalizeAllocations(allocations);
  };

  const normalizeAllocations = (allocations: { [assetId: string]: number }): { [assetId: string]: number } => {
    const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const normalized: { [assetId: string]: number } = {};
    Object.entries(allocations).forEach(([key, value]) => {
      normalized[key] = Math.round((value / total) * 100);
    });
    return normalized;
  };

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

  const handleStrategySelect = (strategy: Strategy) => {
    if (strategy.isAIGenerated) {
      setSelectedStrategy(selectedStrategy?.id === strategy.id ? null : strategy);
      setActiveTab('comparison');
    }
  };

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = strategies.find(s => s.id === 'current-strategy');

  const tabs = [
    { id: 'portfolio' as Tab, label: t('portfolio'), icon: PieChart },
    { id: 'strategies' as Tab, label: t('strategies'), icon: TrendingUp },
    { id: 'comparison' as Tab, label: t('comparison'), icon: BarChart3 },
    { id: 'ai' as Tab, label: t('aiAssistant'), icon: Bot }
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
                  className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('yourAssets')}</h2>
                    <AssetForm onAddAsset={handleAddAsset} language={language} />
                  </div>

                  {assets.length > 0 && (
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset List</h3>
                      <div className="space-y-3">
                        {assets.map((asset) => (
                          <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">{asset.name}</h4>
                                {asset.isPAC && (
                                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                                    PAC
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {ASSET_TYPE_LABELS[asset.type]} • {formatCurrency(asset.currentValue)}
                              </p>
                              {asset.isPAC && asset.pacAmount && (
                                <p className="text-xs text-primary-600">
                                  {formatCurrency(asset.pacAmount)}/{asset.pacFrequency}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveAsset(asset.id)}
                              className="p-2 text-gray-400 hover:text-error-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {assets.length > 0 ? (
                    <>
                      <PortfolioChart assets={assets} language={language} />
                      
                      {/* Portfolio Metrics */}
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="metric-card">
                            <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                            <p className="text-2xl font-bold text-success-600">
                              {formatPercentage(metrics.expectedReturn)}
                            </p>
                          </div>
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
                        </div>
                      </div>

                      {/* Portfolio Projection */}
                      {currentStrategy && (
                        <ProjectionChart
                          currentStrategy={currentStrategy}
                          selectedStrategy={selectedStrategy}
                          assets={assets}
                          language={language}
                        />
                      )}
                    </>
                  ) : (
                    <div className="card">
                      <div className="text-center py-12">
                        <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {t('noAssetsMessage')}
                        </h3>
                        <p className="text-gray-600">
                          Aggiungi il tuo primo asset per iniziare l'analisi del portafoglio.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>

            {strategies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategies.map((strategy) => (
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
              <div className="card">
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nessuna strategia disponibile
                  </h3>
                  <p className="text-gray-600">
                    {t('noAssetsMessage')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('strategyComparison')}</h2>
              <p className="text-gray-600">{t('comparisonDescription')}</p>
            </div>

            {selectedStrategy && currentStrategy ? (
              <div className="space-y-6">
                <ProjectionChart
                  currentStrategy={currentStrategy}
                  selectedStrategy={selectedStrategy}
                  assets={assets}
                  language={language}
                />
                <StrategyComparison 
                  strategies={[currentStrategy, selectedStrategy]} 
                  language={language} 
                />
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Seleziona una strategia per il confronto
                  </h3>
                  <p className="text-gray-600">
                    Vai alla sezione Strategie e clicca su una strategia AI per visualizzare il confronto.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div className="text-center">
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
}

export default App;