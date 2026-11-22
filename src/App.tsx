import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, Bot, Briefcase, TrendingUp, Edit, Trash2, Lock, Unlock, ArrowRight, Wallet, Gauge, Layers, Flame, MoveHorizontal, BookOpen, Sparkles } from 'lucide-react';
import { Asset, Strategy, ASSET_COLORS } from './types/portfolio';
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
    <div className="relative min-h-screen text-ink">
      {/* Ambient background */}
      <div className="app-bg" aria-hidden="true">
        <div className="app-orb app-orb--blue" />
        <div className="app-orb app-orb--cyan" />
        <div className="app-orb app-orb--indigo" />
      </div>

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

      {/* Header + navigation */}
      <header className="glass-bar sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-16">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow flex-shrink-0">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 sr-only sm:not-sr-only">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight text-ink leading-tight truncate">
                  Portfolio Balancer
                </h1>
                <p className="text-xs text-ink-subtle hidden sm:block truncate">{t('appSubtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
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

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 pb-3 scroll-row">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* FIRE Calculator Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <a
          href="https://firecalculator.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-xl px-3 sm:px-4 py-2.5 border border-accent-400/20 bg-gradient-to-r from-primary-500/15 via-accent-500/[0.07] to-transparent hover:border-accent-400/40 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="icon-tile icon-tile-accent w-8 h-8">
              <Flame className="w-4 h-4" />
            </span>
            <p className="text-sm font-medium text-ink-soft group-hover:text-ink transition-colors">
              {language === 'it'
                ? 'Quanti anni ti separano dalla libertà finanziaria? Scoprilo con FIRE Calculator.'
                : 'How many years until financial freedom? Find out with FIRE Calculator.'}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-accent-300 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Portfolio Metrics */}
            {assets.length > 0 && (
              <section aria-label={t('portfolioMetrics')} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="card relative overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="eyebrow">{t('totalValue')}</p>
                      <p className="mt-2 text-lg sm:text-2xl font-semibold text-ink num truncate">
                        {formatCurrency(metrics.totalValue, currency)}
                      </p>
                    </div>
                    <span className="icon-tile icon-tile-primary hidden sm:inline-flex">
                      <Wallet className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent" />
                </div>

                <div className="card relative overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="eyebrow">{t('expectedReturn')}</p>
                      <p className="mt-2 text-lg sm:text-2xl font-semibold text-success-400 num">
                        {formatPercentage(metrics.expectedReturn)}
                      </p>
                    </div>
                    <span className="icon-tile icon-tile-success hidden sm:inline-flex">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-success-400/60 to-transparent" />
                </div>

                <div className="card relative overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="eyebrow">{t('riskScore')}</p>
                      <p className={`mt-2 text-lg sm:text-2xl font-semibold num ${
                        metrics.riskScore < 2 ? 'text-success-400' :
                        metrics.riskScore < 3 ? 'text-warning-400' : 'text-error-400'
                      }`}>
                        {metrics.riskScore.toFixed(1)}<span className="text-sm text-ink-subtle font-medium">/5</span>
                      </p>
                    </div>
                    <span className={`icon-tile hidden sm:inline-flex ${
                      metrics.riskScore < 2 ? 'icon-tile-success' :
                      metrics.riskScore < 3 ? 'icon-tile-warning' : 'icon-tile-error'
                    }`}>
                      <Gauge className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        metrics.riskScore < 2 ? 'bg-success-400' :
                        metrics.riskScore < 3 ? 'bg-warning-400' : 'bg-error-400'
                      }`}
                      style={{ width: `${Math.min(100, (metrics.riskScore / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="card relative overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="eyebrow">{t('diversification')}</p>
                      <p className="mt-2 text-lg sm:text-2xl font-semibold text-accent-300 num">
                        {metrics.diversificationScore}<span className="text-sm text-ink-subtle font-medium">/100</span>
                      </p>
                    </div>
                    <span className="icon-tile icon-tile-accent hidden sm:inline-flex">
                      <Layers className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
                      style={{ width: `${Math.min(100, metrics.diversificationScore)}%` }}
                    />
                  </div>
                </div>
              </section>
            )}

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
              <div className="space-y-6 sm:space-y-8">
                {/* Portfolio Chart */}
                <div className="card">
                  <h3 className="section-title mb-4">{t('portfolioAllocation')}</h3>
                  <PortfolioChart assets={assets} language={language} currency={currency} />
                </div>

                {/* Assets List */}
                <div className="card min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="section-title">{t('assetsList')}</h3>
                    <span className="badge badge-neutral num">{assets.length}</span>
                  </div>
                  <div className="table-shell">
                    <div className="sm:hidden text-xs text-ink-subtle px-3 py-2 border-b border-line flex items-center gap-1.5">
                      <MoveHorizontal className="w-3.5 h-3.5" />
                      <span>{t('swipeToSeeMore') || 'Scorri per vedere tutti i dati'}</span>
                    </div>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th className="text-left">{t('asset')}</th>
                          <th className="text-left">{t('type')}</th>
                          <th className="text-right">{t('value')}</th>
                          <th className="text-right">{t('allocation')}</th>
                          <th className="text-right">{t('expectedReturn')}</th>
                          <th className="text-center">{t('actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset) => {
                          const allocation = metrics.totalValue > 0 ? (asset.currentValue / metrics.totalValue) * 100 : 0;
                          return (
                            <tr key={asset.id}>
                              <td>
                                <div className="flex items-center gap-2.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                                  />
                                  <span className="font-medium text-ink whitespace-nowrap">{asset.name}</span>
                                  {asset.isPAC && (
                                    <span className="badge badge-accent">PAC</span>
                                  )}
                                  {asset.isLocked && (
                                    <span className="badge badge-primary" title={t('unlockAsset')}>
                                      <Lock className="w-3 h-3" />
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="text-ink-muted whitespace-nowrap">
                                {t(asset.type)}
                              </td>
                              <td className="text-right font-semibold text-ink whitespace-nowrap num">
                                {formatCurrency(asset.currentValue, currency)}
                              </td>
                              <td className="text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="hidden md:block w-14 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
                                      style={{ width: `${Math.min(100, allocation)}%` }}
                                    />
                                  </div>
                                  <span className="font-semibold text-primary-300 num">{allocation.toFixed(1)}%</span>
                                </div>
                              </td>
                              <td className="text-right font-semibold text-success-400 whitespace-nowrap num">
                                {formatPercentage(asset.expectedReturn)}
                              </td>
                              <td className="text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => handleToggleAssetLock(asset.id)}
                                    className={`btn-icon ${
                                      asset.isLocked
                                        ? 'text-primary-300 bg-primary-500/15 hover:bg-primary-500/25 hover:text-primary-200'
                                        : ''
                                    }`}
                                    title={asset.isLocked ? t('unlockAsset') : t('lockAsset')}
                                    aria-label={asset.isLocked ? t('unlockAsset') : t('lockAsset')}
                                  >
                                    {asset.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={() => handleEditAsset(asset)}
                                    className="btn-icon hover:!text-primary-300"
                                    title={t('editAsset')}
                                    aria-label={t('editAsset')}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAsset(asset.id)}
                                    className="btn-icon hover:!text-error-400 hover:!bg-error-500/10"
                                    title={t('deleteAsset')}
                                    aria-label={t('deleteAsset')}
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
              </div>
            )}
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
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
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">{t('investmentStrategies')}</h2>
                      {selectedStrategy && (
                        <div className="badge badge-primary text-sm px-3 py-1">
                          <span className="text-ink-muted">{t('selectedStrategy')}:</span>
                          <span className="font-semibold">{selectedStrategy.name}</span>
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
                  <div className="card text-center py-12 sm:py-16">
                    <div className="icon-tile icon-tile-primary w-14 h-14 mx-auto mb-4">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">{t('noAssetsTitle')}</h3>
                    <p className="text-ink-muted mb-6 max-w-md mx-auto">{t('noAssetsMessage')}</p>
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
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="icon-tile icon-tile-accent w-12 h-12 mx-auto mb-4 shadow-glow-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gradient mb-2">{t('aiAssistant')}</h2>
              <p className="text-ink-muted max-w-2xl mx-auto">{t('aiAssistantDescription')}</p>
            </div>

            {assets.length > 0 ? (
              <ChatGPTIntegration
                assets={assets}
                language={language}
                onStrategyGenerated={handleStrategyGenerated}
              />
            ) : (
              <div className="card text-center py-12 sm:py-16">
                <div className="icon-tile icon-tile-accent w-14 h-14 mx-auto mb-4">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{t('noAssetsForAI')}</h3>
                <p className="text-ink-muted mb-6 max-w-md mx-auto">{t('addAssetsForAI')}</p>
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

        {/* Educational Section - Portfolio Rebalancing */}
        <section className="mt-12 card">
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-tile icon-tile-neutral">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">{t('rebalancingTitle')}</h2>
          </div>
          <div className="space-y-4 text-ink-muted leading-relaxed max-w-4xl">
            <p>{t('rebalancingIntro')}</p>
            <p>{t('rebalancingBuyHold')}</p>
            <p>{t('rebalancingChallenge')}</p>
            <p>{t('rebalancingAction')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
