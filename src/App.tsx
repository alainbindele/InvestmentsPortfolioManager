import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, Bot, Briefcase, TrendingUp, Edit, Trash2, Lock, Unlock } from 'lucide-react';
import { Asset, Strategy } from './types/portfolio';
import { Language } from './types/language';
import { Currency } from './types/currency';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { AllocationEditor } from './components/AllocationEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { CurrencySelector } from './components/CurrencySelector';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ResetButton } from './components/ResetButton';
import { SEOHead } from './components/SEOHead';
import { CookieConsent } from './components/CookieConsent';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency, formatPercentage } from './utils/calculations';
import { getTranslation } from './utils/translations';
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

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [aiStrategies, setAIStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [language, setLanguage] = useState<Language>('it');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  // Load data on component mount
  useEffect(() => {
    const savedAssets = loadAssets();
    const savedStrategies = loadAIStrategies();
    const savedLanguage = loadLanguage();
    const savedCurrency = loadCurrency();
    const savedActiveTab = loadActiveTab();
    const disclaimerAccepted = loadDisclaimerAccepted();

    setAssets(savedAssets);
    setAIStrategies(savedStrategies);
    setLanguage(savedLanguage);
    setCurrency(savedCurrency);
    setActiveTab(savedActiveTab);
    setShowDisclaimer(!disclaimerAccepted);
  }, []);

  // Save data when it changes
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
    setAssets([...assets, newAsset]);
  };

  const handleUpdateAsset = (assetData: Omit<Asset, 'id'>) => {
    if (!editingAsset) return;
    
    const updatedAssets = assets.map(asset =>
      asset.id === editingAsset.id ? { ...assetData, id: editingAsset.id } : asset
    );
    setAssets(updatedAssets);
    setEditingAsset(null);
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    // Scroll to top when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAsset = (assetId: string) => {
    if (confirm(t('confirmDeleteAsset'))) {
      setAssets(assets.filter(asset => asset.id !== assetId));
    }
  };

  const handleToggleAssetLock = (assetId: string) => {
    setAssets(assets.map(asset =>
      asset.id === assetId ? { ...asset, isLocked: !asset.isLocked } : asset
    ));
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
  };

  const handleStrategyGenerated = (strategy: Strategy) => {
    setAIStrategies([...aiStrategies, strategy]);
    setSelectedStrategy(strategy);
    setActiveTab('strategies');
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleCloneAndEdit = (strategy: Strategy) => {
    setEditingStrategy(strategy);
  };

  const handleSaveAllocation = (newStrategy: Strategy) => {
    setAIStrategies([...aiStrategies, newStrategy]);
    setSelectedStrategy(newStrategy);
    setEditingStrategy(null);
  };

  const handleCancelAllocationEdit = () => {
    setEditingStrategy(null);
  };

  const handleUpdateStrategyName = (strategyId: string, newName: string) => {
    setAIStrategies(aiStrategies.map(strategy =>
      strategy.id === strategyId ? { ...strategy, name: newName } : strategy
    ));
    
    if (selectedStrategy && selectedStrategy.id === strategyId) {
      setSelectedStrategy({ ...selectedStrategy, name: newName });
    }
  };

  const handleDeleteStrategy = (strategyId: string) => {
    setAIStrategies(aiStrategies.filter(strategy => strategy.id !== strategyId));
    
    if (selectedStrategy && selectedStrategy.id === strategyId) {
      setSelectedStrategy(null);
    }
  };

  const handleDisclaimerAccept = () => {
    saveDisclaimerAccepted();
    setShowDisclaimer(false);
  };

  const handleDisclaimerDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets, language);
  
  // Combine current strategy with AI strategies for comparison
  const allStrategies = assets.length > 0 ? [currentStrategy, ...aiStrategies] : aiStrategies;

  const tabs = [
    { id: 'portfolio', label: t('portfolio'), icon: Briefcase },
    { id: 'strategies', label: t('strategies'), icon: BarChart3 },
    { id: 'ai', label: t('aiAssistant'), icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        language={language}
        assets={assets}
        strategies={aiStrategies}
        activeTab={activeTab}
      />
      
      <DisclaimerModal
        language={language}
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      <CookieConsent language={language} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <PieChart className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portfolio Balancer</h1>
                <p className="text-sm text-gray-600 hidden sm:block">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <ResetButton language={language} />
              <CurrencySelector 
                currentCurrency={currency}
                onCurrencyChange={setCurrency}
              />
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Asset Form */}
            <AssetForm
              onAddAsset={handleAddAsset}
              onUpdateAsset={handleUpdateAsset}
              onCancelEdit={handleCancelEdit}
              editingAsset={editingAsset}
              language={language}
            />

            {/* Portfolio Overview */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} currency={currency} />
                </div>

                {/* Portfolio Metrics */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalValue')}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(metrics.totalValue, currency)}
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
                      <p className={`text-xl font-bold ${
                        metrics.riskScore < 2 ? 'text-success-600' :
                        metrics.riskScore < 3 ? 'text-warning-600' : 'text-error-600'
                      }`}>
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

            {/* Assets List */}
            {assets.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('assetsList')}</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <div className="sm:hidden text-xs text-gray-500 p-2 bg-gray-50 border-b border-gray-200 flex items-center gap-1">
                    <span>👈</span>
                    <span>{t('swipeToSeeMore') || 'Scorri per vedere tutti i dati'}</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">{t('asset')}</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">{t('type')}</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">{t('value')}</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">{t('allocation')}</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">{t('expectedReturn')}</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-900">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset, index) => {
                        const allocation = metrics.totalValue > 0 ? (asset.currentValue / metrics.totalValue) * 100 : 0;
                        return (
                          <tr key={asset.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 whitespace-nowrap">{asset.name}</span>
                                {asset.isPAC && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    PAC
                                  </span>
                                )}
                                {asset.isLocked && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    🔒
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                              {t(asset.type)}
                            </td>
                            <td className="text-right py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                              {formatCurrency(asset.currentValue, currency)}
                            </td>
                            <td className="text-right py-3 px-4 font-semibold text-primary-600 whitespace-nowrap">
                              {allocation.toFixed(1)}%
                            </td>
                            <td className="text-right py-3 px-4 font-semibold text-success-600 whitespace-nowrap">
                              {formatPercentage(asset.expectedReturn)}
                            </td>
                            <td className="text-center py-3 px-4 whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleToggleAssetLock(asset.id)}
                                  className={`p-1 rounded transition-colors ${
                                    asset.isLocked 
                                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                                  }`}
                                  title={asset.isLocked ? t('unlockAsset') : t('lockAsset')}
                                >
                                  {asset.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => handleEditAsset(asset)}
                                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                  title={t('editAsset')}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAsset(asset.id)}
                                  className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                  title={t('deleteAsset')}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-6 sm:space-y-8">
            {editingStrategy ? (
              <AllocationEditor
                strategy={editingStrategy}
                assets={assets}
                currency={currency}
                language={language}
                onSaveAllocation={handleSaveAllocation}
                onCancel={handleCancelAllocationEdit}
              />
            ) : (
              <>
                {/* Strategy Cards */}
                {allStrategies.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">{t('investmentStrategies')}</h2>
                      {selectedStrategy && (
                        <div className="text-sm text-gray-600">
                          {t('selectedStrategy')}: <span className="font-medium">{selectedStrategy.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allStrategies.map((strategy) => (
                        <StrategyCard
                          key={strategy.id}
                          strategy={strategy}
                          assets={assets}
                          currency={currency}
                          isSelected={selectedStrategy?.id === strategy.id}
                          onSelect={() => handleStrategySelect(strategy)}
                          onCloneAndEdit={() => handleCloneAndEdit(strategy)}
                          onUpdateName={handleUpdateStrategyName}
                          onDelete={handleDeleteStrategy}
                          language={language}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Strategy Comparison */}
                {allStrategies.length > 1 && (
                  <StrategyComparison strategies={allStrategies} language={language} />
                )}

                {/* Projection Chart */}
                {allStrategies.length > 0 && (
                  <ProjectionChart
                    strategies={allStrategies}
                    assets={assets}
                    currency={currency}
                    language={language}
                  />
                )}

                {assets.length === 0 && (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noAssetsTitle')}</h3>
                    <p className="text-gray-600 mb-4">{t('noAssetsMessage')}</p>
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className="btn-primary"
                    >
                      {t('addFirstAsset')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('aiAssistant')}</h2>
              <p className="text-gray-600">{t('aiAssistantDescription')}</p>
            </div>

            {assets.length > 0 ? (
              <ChatGPTIntegration
                assets={assets}
                language={language}
                onStrategyGenerated={handleStrategyGenerated}
              />
            ) : (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noAssetsForAI')}</h3>
                <p className="text-gray-600 mb-4">{t('addAssetsForAI')}</p>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-primary"
                >
                  {t('addFirstAsset')}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;