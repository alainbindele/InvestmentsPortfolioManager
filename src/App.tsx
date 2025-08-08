import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Target, Bot, Calendar, Globe } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { calculatePortfolioMetrics, generateCurrentStrategy, formatCurrency } from './utils/calculations';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ProjectionChart } from './components/ProjectionChart';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { PACManager } from './components/PACManager';
import { SEOHead } from './components/SEOHead';
import { AssetModal } from './components/AssetModal';
import { LanguageSelector } from './components/LanguageSelector';
import { getTranslation } from './utils/translations';

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [pacs, setPacs] = useState<PACPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'comparison' | 'ai' | 'pac'>('portfolio');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string) => getTranslation(language, key);

  // Update strategies when assets change
  useEffect(() => {
    const currentStrategy = generateCurrentStrategy(assets);
    const aiStrategies = strategies.filter(s => s.isAIGenerated);
    setStrategies([currentStrategy, ...aiStrategies]);
  }, [assets]);

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

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleStrategyGenerated = (strategy: Strategy) => {
    setStrategies(prev => {
      const currentStrategy = prev.find(s => !s.isAIGenerated);
      const otherAIStrategies = prev.filter(s => s.isAIGenerated && s.id !== strategy.id);
      return currentStrategy ? [currentStrategy, ...otherAIStrategies, strategy] : [strategy];
    });
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategy(strategy.isAIGenerated ? strategy : null);
  };

  const handleAddPAC = (pacData: Omit<PACPlan, 'id' | 'startDate' | 'isActive'>) => {
    const newPAC: PACPlan = {
      ...pacData,
      id: `pac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startDate: new Date(),
      isActive: true
    };
    setPacs(prev => [...prev, newPAC]);
  };

  const handleRemovePAC = (pacId: string) => {
    setPacs(prev => prev.filter(pac => pac.id !== pacId));
  };

  const handleAddPACAsAsset = (pacId: string, customReturn: number) => {
    const pac = pacs.find(p => p.id === pacId);
    if (!pac) return;

    const pacAsset: Asset = {
      id: `pac-asset-${Date.now()}`,
      name: `PAC: ${pac.name}`,
      type: 'other',
      currentValue: pac.monthlyAmount * 12, // Annual contribution as current value
      expectedReturn: customReturn,
      riskLevel: 'medium',
      isPAC: true,
      pacAmount: pac.monthlyAmount,
      pacFrequency: pac.frequency === 'monthly' ? 'monthly' : 
                   pac.frequency === 'quarterly' ? 'quarterly' :
                   pac.frequency === 'biannual' ? 'biannual' : 'annual'
    };

    setAssets(prev => [...prev, pacAsset]);
    
    // Mark PAC as added to portfolio
    setPacs(prev => prev.map(p => 
      p.id === pacId ? { ...p, asAsset: true } : p
    ));
  };

  const metrics = calculatePortfolioMetrics(assets);

  const tabs = [
    { id: 'portfolio' as const, label: t('portfolio'), icon: TrendingUp },
    { id: 'strategies' as const, label: t('strategies'), icon: Target },
    { id: 'comparison' as const, label: t('comparison'), icon: BarChart3 },
    { id: 'ai' as const, label: t('aiAssistant'), icon: Bot },
    { id: 'pac' as const, label: t('pac'), icon: Calendar }
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
                    <p className="font-semibold text-gray-900">{formatCurrency(metrics.totalValue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">{t('expectedReturn')}</p>
                    <p className="font-semibold text-success-600">{metrics.expectedReturn.toFixed(1)}%</p>
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
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
            <AssetForm
              onAddAsset={handleAddAsset}
              onRemoveAsset={handleRemoveAsset}
              onAssetClick={handleAssetClick}
              assets={assets}
              pacs={pacs}
              onAddPACAsAsset={handleAddPACAsAsset}
              language={language}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PortfolioChart assets={assets} language={language} />
              
              {assets.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-2xl font-bold text-warning-600">{metrics.riskScore.toFixed(1)}/5</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-2xl font-bold text-primary-600">{metrics.diversificationScore}/100</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalAssets')}</p>
                      <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">Sharpe Ratio</p>
                      <p className="text-2xl font-bold text-success-600">{metrics.sharpeRatio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {assets.length > 0 && (
              <ProjectionChart 
                assets={assets} 
                selectedStrategy={selectedStrategy}
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

            {selectedStrategy && (
              <div className="mt-8">
                <ProjectionChart 
                  assets={assets} 
                  selectedStrategy={selectedStrategy}
                  language={language}
                  title={`${t('portfolioProjection')} - ${selectedStrategy.name}`}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('strategyComparison')}</h2>
              <p className="text-gray-600">{t('comparisonDescription')}</p>
            </div>
            
            <StrategyComparison strategies={strategies} language={language} />
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

        {activeTab === 'pac' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('pacTitle')}</h2>
              <p className="text-gray-600">{t('pacDescription')}</p>
            </div>
            
            <PACManager
              pacs={pacs}
              assets={assets}
              onAddPAC={handleAddPAC}
              onRemovePAC={handleRemovePAC}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Asset Modal */}
      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          language={language}
        />
      )}
    </div>
  );
}

export default App;