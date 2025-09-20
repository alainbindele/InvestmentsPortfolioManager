import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, Bot, TrendingUp, Settings, Wallet } from 'lucide-react';
import { Asset, Strategy } from './types/portfolio';
import { Language } from './types/language';
import { Currency } from './types/currency';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { ProjectionChart } from './components/ProjectionChart';
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
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai'>('portfolio');
  const [language, setLanguage] = useState<Language>('it');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

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
    setActiveTab(savedActiveTab as 'portfolio' | 'strategies' | 'ai');
    
    if (!disclaimerAccepted) {
      setShowDisclaimerModal(true);
    }
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
    // Scroll to top when editing an asset
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
    if (editingAsset?.id === assetId) {
      setEditingAsset(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
  };

  const handleToggleAssetLock = (assetId: string) => {
    setAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === assetId
          ? { ...asset, isLocked: !asset.isLocked }
          : asset
      )
    );
  };

  const handleStrategyGenerated = (strategy: Strategy) => {
    setAIStrategies([...aiStrategies, strategy]);
    setSelectedStrategy(strategy);
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleCloneAndEditStrategy = (strategy: Strategy) => {
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
    setAIStrategies(prevStrategies =>
      prevStrategies.map(strategy =>
        strategy.id === strategyId
          ? { ...strategy, name: newName }
          : strategy
      )
    );
    
    if (selectedStrategy?.id === strategyId) {
      setSelectedStrategy(prev => prev ? { ...prev, name: newName } : null);
    }
  };

  const handleDeleteStrategy = (strategyId: string) => {
    setAIStrategies(prevStrategies =>
      prevStrategies.filter(strategy => strategy.id !== strategyId)
    );
    
    if (selectedStrategy?.id === strategyId) {
      setSelectedStrategy(null);
    }
  };

  const handleDisclaimerAccept = () => {
    saveDisclaimerAccepted();
    setShowDisclaimerModal(false);
  };

  const handleDisclaimerDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  const metrics = calculatePortfolioMetrics(assets);
  const currentStrategy = generateCurrentStrategy(assets, language);
  
  // Combine current strategy with AI strategies for comparison
  const allStrategies = assets.length > 0 ? [currentStrategy, ...aiStrategies] : [];

  if (editingStrategy) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SEOHead 
          language={language}
          assets={assets}
          strategies={aiStrategies}
          activeTab={activeTab}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AllocationEditor
            strategy={editingStrategy}
            assets={assets}
            currency={currency}
            language={language}
            onSaveAllocation={handleSaveAllocation}
            onCancel={handleCancelAllocationEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        language={language}
        assets={assets}
        strategies={aiStrategies}
        activeTab={activeTab}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-sm text-gray-600 hidden sm:block">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
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

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'portfolio', label: t('portfolio'), icon: Wallet },
              { id: 'strategies', label: t('strategies'), icon: TrendingUp },
              { id: 'ai', label: t('aiAssistant'), icon: Bot }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
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

            {/* Portfolio Overview */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Assets List */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('portfolioAssets')}
                  </h3>
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: asset.type === 'stocks' ? '#3B82F6' : 
                                                      asset.type === 'bonds' ? '#10B981' :
                                                      asset.type === 'etf' ? '#8B5CF6' :
                                                      asset.type === 'crypto' ? '#F59E0B' :
                                                      asset.type === 'real_estate' ? '#EF4444' :
                                                      asset.type === 'cash' ? '#6B7280' :
                                                      asset.type === 'commodities' ? '#F97316' : '#84CC16' }}
                          />
                          <div>
                            <p className="font-medium text-gray-900">{asset.name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{formatCurrency(asset.currentValue, currency)}</span>
                              <span>{formatPercentage(asset.expectedReturn)}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                asset.riskLevel === 'very_low' || asset.riskLevel === 'low' ? 'bg-success-100 text-success-700' :
                                asset.riskLevel === 'medium' ? 'bg-warning-100 text-warning-700' :
                                'bg-error-100 text-error-700'
                              }`}>
                                {t(asset.riskLevel)}
                              </span>
                              {asset.isPAC && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  PAC {formatCurrency(asset.pacAmount || 0, currency)}/{t(asset.pacFrequency || 'monthly')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditAsset(asset)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title={t('editAsset')}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title={t('delete')}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('currentAllocation')}
                  </h3>
                  <PortfolioChart 
                    assets={assets} 
                    language={language}
                    currency={currency}
                  />
                </div>
              </div>
            )}

            {/* Portfolio Metrics */}
            {assets.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('portfolioMetrics')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">{t('totalValue')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(metrics.totalValue, currency)}
                    </p>
                  </div>
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
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('investmentStrategies')}
              </h2>
              <p className="text-gray-600">
                {t('strategiesDescription')}
              </p>
            </div>

            {assets.length === 0 ? (
              <div className="text-center py-12">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('noStrategiesAvailable')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('addAssetsToCompareStrategies')}
                </p>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-primary"
                >
                  {t('addAsset')}
                </button>
              </div>
            ) : (
              <>
                {/* Strategy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allStrategies.map((strategy) => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      assets={assets}
                      currency={currency}
                      isSelected={selectedStrategy?.id === strategy.id}
                      onSelect={() => handleStrategySelect(strategy)}
                      onCloneAndEdit={() => handleCloneAndEditStrategy(strategy)}
                      onUpdateName={handleUpdateStrategyName}
                      onDelete={handleDeleteStrategy}
                      language={language}
                    />
                  ))}
                </div>

                {/* Strategy Comparison */}
                {allStrategies.length > 1 && (
                  <StrategyComparison 
                    strategies={allStrategies}
                    language={language}
                  />
                )}

                {/* Projection Chart */}
                {selectedStrategy && (
                  <ProjectionChart
                    strategies={[selectedStrategy]}
                    assets={assets}
                    currency={currency}
                    language={language}
                  />
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('aiAssistantTitle')}
              </h2>
              <p className="text-gray-600">
                {t('aiDescription')}
              </p>
            </div>

            <ChatGPTIntegration
              assets={assets}
              language={language}
              onStrategyGenerated={handleStrategyGenerated}
            />
          </div>
        )}
      </main>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        language={language}
        isOpen={showDisclaimerModal}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      {/* Cookie Consent */}
      <CookieConsent language={language} />
    </div>
  );
}

export default App;