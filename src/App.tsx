import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, Bot, TrendingUp } from 'lucide-react';
import { Asset, Strategy } from './types/portfolio';
import { Language } from './types/language';
import { Currency } from './types/currency';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { AllocationEditor } from './components/AllocationEditor';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { LanguageSelector } from './components/LanguageSelector';
import { CurrencySelector } from './components/CurrencySelector';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CookieConsent } from './components/CookieConsent';
import { ResetButton } from './components/ResetButton';
import { SEOHead } from './components/SEOHead';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency } from './utils/calculations';
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
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'ai'>('portfolio');
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
    setActiveTab(savedActiveTab as 'portfolio' | 'strategies' | 'ai');
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
      asset.id === editingAsset.id 
        ? { ...assetData, id: editingAsset.id }
        : asset
    );
    setAssets(updatedAssets);
    setEditingAsset(null);
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    // Scroll to top smoothly when editing an asset
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
    setAIStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, name: newName }
        : strategy
    ));
    
    if (selectedStrategy?.id === strategyId) {
      setSelectedStrategy(prev => prev ? { ...prev, name: newName } : null);
    }
  };

  const handleDeleteStrategy = (strategyId: string) => {
    setAIStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
    
    if (selectedStrategy?.id === strategyId) {
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
      
      {/* Disclaimer Modal */}
      <DisclaimerModal
        language={language}
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      {/* Cookie Consent */}
      <CookieConsent language={language} />

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
                <p className="text-sm text-gray-600 hidden sm:block">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ResetButton language={language} />
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <CurrencySelector
                currentCurrency={currency}
                onCurrencyChange={setCurrency}
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
                className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
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
              <>
                {/* Assets List */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('portfolioAssets')}</h2>
                  <div className="space-y-4">
                    {assets.map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
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
                            <p className="text-sm text-gray-600">{t(asset.type)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(asset.currentValue, currency)}
                          </p>
                          {asset.isPAC && asset.pacAmount && (
                            <p className="text-sm text-blue-600">
                              PAC {t(asset.pacFrequency || 'monthly')}: {formatCurrency(asset.pacAmount, currency)}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            {t('expectedReturnLabel')}: {asset.expectedReturn}%
                          </p>
                          <p className="text-sm text-gray-600">
                            {t('riskLevel')}: {t(asset.riskLevel)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
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

                {/* Portfolio Metrics and Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Metrics */}
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
                          {metrics.expectedReturn.toFixed(1)}%
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

                  {/* Chart */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('currentAllocation')}</h3>
                    <PortfolioChart 
                      assets={assets} 
                      language={language}
                      currency={currency}
                    />
                  </div>
                </div>

                {/* Portfolio Projection */}
                <ProjectionChart
                  strategies={[currentStrategy]}
                  assets={assets}
                  currency={currency}
                  language={language}
                />
              </>
            )}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('investmentStrategies')}</h2>
              <p className="text-gray-600">{t('strategiesDescription')}</p>
            </div>

            {assets.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noStrategiesAvailable')}</h3>
                  <p className="text-gray-600 mb-6">{t('addAssetsToCompareStrategies')}</p>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="btn-primary"
                  >
                    {t('addAsset')}
                  </button>
                </div>
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
                      onCloneAndEdit={() => handleCloneAndEdit(strategy)}
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
                    strategies={[currentStrategy, selectedStrategy].filter((s, i, arr) => 
                      arr.findIndex(strategy => strategy.id === s.id) === i
                    )}
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