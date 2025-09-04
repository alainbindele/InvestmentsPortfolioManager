import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, TrendingUp, Target, Trash2, Bot, Edit } from 'lucide-react';
import { Asset, Strategy, ASSET_COLORS } from './types/portfolio';
import { Language } from './types/language';
import { Currency } from './types/currency';
import { LanguageSelector } from './components/LanguageSelector';
import { CurrencySelector } from './components/CurrencySelector';
import { ResetButton } from './components/ResetButton';
import { SEOHead } from './components/SEOHead';
import { DisclaimerModal } from './components/DisclaimerModal';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage, generateCurrentStrategy } from './utils/calculations';
import { 
  saveAssets, 
  loadAssets, 
  saveAIStrategies, 
  loadAIStrategies, 
  saveLanguage, 
  loadLanguage, 
  saveCurrency, 
  loadCurrency, 
  saveActiveTab, 
  loadActiveTab,
  saveDisclaimerAccepted,
  loadDisclaimerAccepted
} from './utils/storage';
import { getTranslation } from './utils/translations';

// Lazy load components for code splitting
const AssetForm = React.lazy(() => import('./components/AssetForm').then(m => ({ default: m.AssetForm })));
const PortfolioChart = React.lazy(() => import('./components/PortfolioChart').then(m => ({ default: m.PortfolioChart })));
const StrategyCard = React.lazy(() => import('./components/StrategyCard').then(m => ({ default: m.StrategyCard })));
const AllocationEditor = React.lazy(() => import('./components/AllocationEditor').then(m => ({ default: m.AllocationEditor })));
const StrategyComparison = React.lazy(() => import('./components/StrategyComparison').then(m => ({ default: m.StrategyComparison })));
const ChatGPTIntegration = React.lazy(() => import('./components/ChatGPTIntegration').then(m => ({ default: m.ChatGPTIntegration })));
const ProjectionChart = React.lazy(() => import('./components/ProjectionChart').then(m => ({ default: m.ProjectionChart })));

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(loadLanguage());
  const [currency, setCurrency] = useState<Currency>(loadCurrency());
  const [assets, setAssets] = useState<Asset[]>(loadAssets());
  const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set());
  const [aiStrategies, setAiStrategies] = useState<Strategy[]>(loadAIStrategies());
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai'>(loadActiveTab() as any);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(!loadDisclaimerAccepted());
  const [isRebalancing, setIsRebalancing] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  // Save data to cookies whenever state changes
  useEffect(() => {
    saveAssets(assets);
  }, [assets]);

  useEffect(() => {
    saveAIStrategies(aiStrategies);
  }, [aiStrategies]);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    saveCurrency(currency);
  }, [currency]);

  useEffect(() => {
    saveActiveTab(activeTab);
  }, [activeTab]);

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
    
    // Force re-render of components that depend on PAC calculations
    // This will trigger useEffect hooks in child components
    setTimeout(() => {
      // Trigger a state update to force component re-renders
      setAssets(current => [...current]);
    }, 0);
  };

  const handleToggleAssetLock = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId 
        ? { ...asset, isLocked: !asset.isLocked }
        : asset
    ));
    
    // Force re-render
    setTimeout(() => {
      setAssets(current => [...current]);
    }, 0);
  };

  const handleRequestAIRebalance = async () => {
    const lockedAssets = assets.filter(asset => asset.isLocked);
    const unlockedAssets = assets.filter(asset => !asset.isLocked);
    
    if (unlockedAssets.length === 0) {
      alert(t('noUnlockedAssets'));
      return;
    }
    
    setIsRebalancing(true);
    
    try {
      // Import ChatGPTService dynamically
      const { ChatGPTService } = await import('./services/chatgpt');
      const chatGPTService = new ChatGPTService();
      
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY_PFB;
      if (apiKey) {
        chatGPTService.setApiKey(apiKey);
      }
      
      const lockedAssetIds = lockedAssets.map(asset => asset.id);
      const strategy = await chatGPTService.generateStrategy(
        assets, 
        'balanced', // Default to balanced for rebalancing
        ['diversificazione', 'ottimizzazione_rischio_rendimento'], 
        language,
        lockedAssetIds
      );
      
      handleStrategyGenerated(strategy);
      setActiveTab('strategies');
    } catch (error) {
      console.error('Errore nel ribilanciamento AI:', error);
      alert(t('rebalanceError'));
    } finally {
      setIsRebalancing(false);
    }
  };
  const handleCancelAssetEdit = () => {
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

  const handleCloneAndEdit = (strategy: Strategy) => {
    setEditingStrategy(strategy);
  };

  const handleSaveAllocation = (newStrategy: Strategy) => {
    setAiStrategies(prev => [...prev, newStrategy]);
    setEditingStrategy(null);
    
    // Force re-render of comparison components
    setTimeout(() => {
      setAiStrategies(current => [...current]);
    }, 0);
  };

  const handleCancelAllocationEdit = () => {
    setEditingStrategy(null);
  };

  const handleUpdateStrategyName = (strategyId: string, newName: string) => {
    setAiStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, name: newName }
        : strategy
    ));
    
    // Force re-render to update comparison
    setTimeout(() => {
      setAiStrategies(current => [...current]);
    }, 0);
  };

  const handleDeleteStrategy = (strategyId: string) => {
    setAiStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
    // Remove from selected strategies if it was selected
    setSelectedStrategies(prev => {
      const newSet = new Set(prev);
      newSet.delete(strategyId);
      return newSet;
    });
    
    // Force re-render after deletion
    setTimeout(() => {
      setAiStrategies(current => [...current]);
    }, 0);
  };
  const handleDisclaimerAccept = () => {
    saveDisclaimerAccepted();
    setShowDisclaimer(false);
  };

  const handleDisclaimerDecline = () => {
    // Redirect to a safe page or show alternative content
    window.location.href = 'https://www.google.com';
  };

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets, language);
  const selectedStrategyList = aiStrategies.filter(s => selectedStrategies.has(s.id));
  const strategiesForComparison = selectedStrategyList.length > 0 ? [currentStrategy, ...selectedStrategyList] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead language={language} />
      <SEOHead 
        language={language} 
        assets={assets}
        strategies={aiStrategies}
        activeTab={activeTab}
      />
      
      {/* Disclaimer Modal */}
      <DisclaimerModal
        language={language}
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:h-16 min-h-[64px] gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              {/* Mobile metrics - more compact */}
              {assets.length > 0 && (
                <div className="hidden sm:flex lg:flex items-center gap-4 lg:gap-6 text-sm">
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
              {assets.length > 0 && (
                <div className="flex sm:hidden items-center text-xs mr-2">
                  <div className="text-right">
                    <p className="text-gray-600 text-xs leading-tight">{formatCurrency(metrics.totalValue, currency)}</p>
                    <p className="text-success-600 font-medium leading-tight">{formatPercentage(metrics.expectedReturn)}</p>
                  </div>
                </div>
              )}
              
              {/* Controls - responsive layout */}
              <div className="flex items-center gap-1 sm:gap-2">
                <CurrencySelector currentCurrency={currency} onCurrencyChange={setCurrency} />
                <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                <ResetButton language={language} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'portfolio', label: t('portfolio'), icon: PieChart },
              { id: 'strategies', label: t('strategies'), icon: Target },
              { id: 'ai', label: t('aiAssistant'), icon: Bot }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center sm:justify-start ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <React.Suspense fallback={<div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          {activeTab === 'portfolio' && (
          <div className="space-y-8">
            {/* Asset Form */}
            <AssetForm 
              onAddAsset={handleAddAsset} 
              onUpdateAsset={handleUpdateAsset}
              onCancelEdit={handleCancelAssetEdit}
              editingAsset={editingAsset}
              language={language} 
            />

            {/* Asset Lock Manager */}
            {assets.length > 0 && (
              <AssetLockManager
                assets={assets}
                onToggleAssetLock={handleToggleAssetLock}
                onRequestAIRebalance={handleRequestAIRebalance}
                language={language}
                currency={currency}
                isRebalancing={isRebalancing}
              />
            )}
            {/* Assets List */}
            {assets.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('portfolioAssets')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                              {asset.isLocked && (
                                <div className="p-1 bg-blue-100 rounded">
                                  <Lock className="w-3 h-3 text-blue-600" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 capitalize">{t(asset.type)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditAsset(asset)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title={t('edit')}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveAsset(asset.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title={t('delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
                            asset.riskLevel === 'very_low' || asset.riskLevel === 'low' ? 'text-success-600' :
                            asset.riskLevel === 'medium' ? 'text-warning-600' : 'text-error-600'
                          }`}>
                            {t(asset.riskLevel)}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalValue')}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(metrics.totalValue, currency)}</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                      <p className="text-lg sm:text-xl font-bold text-success-600">{formatPercentage(metrics.expectedReturn)}</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-lg sm:text-xl font-bold text-warning-600">{metrics.riskScore.toFixed(1)}/5</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-lg sm:text-xl font-bold text-primary-600">{metrics.diversificationScore}/100</p>
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
                  strategies={[currentStrategy]}
                  assets={assets}
                  currency={currency}
                  language={language}
                />
              </div>
            )}
          </div>
          )}

          {activeTab === 'strategies' && (
          <div className="space-y-8">
            {/* Allocation Editor */}
            {editingStrategy && (
              <div className="border-2 border-primary-200 rounded-xl p-6 bg-primary-50 allocation-editor">
                <AllocationEditor
                  strategy={editingStrategy}
                  assets={assets}
                  currency={currency}
                  language={language}
                  onSaveAllocation={handleSaveAllocation}
                  onCancel={handleCancelAllocationEdit}
                />
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>

            {/* Current Strategy */}
            {assets.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentStrategy')}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <StrategyCard
                    strategy={currentStrategy}
                    assets={assets}
                    currency={currency}
                    isSelected={false}
                    onSelect={() => {}}
                    onCloneAndEdit={() => handleCloneAndEdit(currentStrategy)}
                    language={language}
                  />
                  <div className="card">
                    <h4 className="font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h4>
                    <PortfolioChart assets={assets} language={language} currency={currency} />
                  </div>
                </div>
              </div>
            )}

            {/* AI Generated Strategies */}
            {aiStrategies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('aiGeneratedStrategies')} ({aiStrategies.length})
                </h3>
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>{t('suggestionPrefix')}</strong> {t('clickAiStrategiesMessage')}
                  </p>
                </div>
                <div className="space-y-6">
                  {aiStrategies.map((strategy) => (
                    <div key={strategy.id} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <StrategyCard
                        strategy={strategy}
                        assets={assets}
                        currency={currency}
                        isSelected={selectedStrategies.has(strategy.id)}
                        onSelect={() => handleToggleStrategy(strategy.id)}
                        onCloneAndEdit={() => handleCloneAndEdit(strategy)}
                        onUpdateName={handleUpdateStrategyName}
                        onDelete={handleDeleteStrategy}
                        language={language}
                        showSelectionCheckbox={true}
                      />
                      <div className="card">
                        <h4 className="font-semibold text-gray-900 mb-4">{t('targetAllocation')}</h4>
                        <PortfolioChart 
                          assets={assets} 
                          language={language} 
                          currency={currency}
                          targetAllocations={strategy.targetAllocations}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Comparison */}
            {aiStrategies.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {t('compareStrategies')} 
                      {strategiesForComparison.length > 1 && (
                        <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                          {strategiesForComparison.length} strategie
                        </span>
                      )}
                    </h3>
                    {selectedStrategies.size > 0 && (
                      <button
                        onClick={() => setSelectedStrategies(new Set())}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                      >
                        {t('deselectAll')}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {selectedStrategies.size === 0 
                      ? t('selectOneOrMoreStrategies')
                      : `${t('comparisonBetween')} ${selectedStrategies.size} ${selectedStrategies.size > 1 ? t('selectedStrategiesPlural') : t('selectedStrategySingular')}`
                    }
                  </p>
                </div>

                {strategiesForComparison.length > 1 ? (
                  <div className="space-y-8">
                    <ProjectionChart
                      strategies={strategiesForComparison}
                      assets={assets}
                      currency={currency}
                      language={language}
                      showAssetSelection={true}
                    />

                    <StrategyComparison 
                      key={`comparison-${strategiesForComparison.map(s => s.id).join('-')}-${strategiesForComparison.length}`}
                      strategies={strategiesForComparison} 
                      language={language} 
                    />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{t('noStrategySelected')}</h4>
                    <p className="text-gray-600 mb-4">
                      {t('clickStrategiesAbove')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {assets.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noStrategiesAvailable')}</h3>
                <p className="text-gray-600 mb-4">{t('addAssetsToCompareStrategies')}</p>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-primary"
                >
                  {t('addAsset')}
                </button>
              </div>
            )}
          </div>
          )}

          {activeTab === 'pac' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pac')}</h2>
              <p className="text-gray-600">{t('pacDescription')}</p>
            </div>

            <PACManager
              assets={assets}
              pacPlans={pacPlans}
              onAddPAC={handleAddPAC}
              onRemovePAC={handleRemovePAC}
              language={language}
            />
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
        </React.Suspense>
      </main>
    </div>
  );
};

export default App;