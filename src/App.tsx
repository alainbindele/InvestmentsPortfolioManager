import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, TrendingUp, Bot, Target, Calendar } from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { SEOHead } from './components/SEOHead';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { ProjectionChart } from './components/ProjectionChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { PACManager } from './components/PACManager';
import { LanguageSelector } from './components/LanguageSelector';
import { mockAssets, mockStrategies } from './utils/mockData';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage } from './utils/calculations';
import { getTranslation } from './utils/translations';

function App() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [pacs, setPacs] = useState<PACPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'comparison' | 'pac' | 'ai'>('portfolio');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('it');

  const portfolioMetrics = calculatePortfolioMetrics(assets);

  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString()
    };
    setAssets(prev => [...prev, asset]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  const handleStrategyGenerated = (newStrategy: Strategy) => {
    setStrategies(prev => [...prev, newStrategy]);
    setActiveTab('strategies');
  };

  const handleAddPAC = (newPAC: Omit<PACPlan, 'id'>) => {
    const pac: PACPlan = {
      ...newPAC,
      id: Date.now().toString()
    };
    setPacs(prev => [...prev, pac]);
  };

  const handleRemovePAC = (pacId: string) => {
    setPacs(prev => prev.filter(pac => pac.id !== pacId));
  };

  const t = (key: string) => getTranslation(language, key);

  const tabs = [
    { id: 'portfolio', label: t('portfolio'), icon: BarChart3 },
    { id: 'strategies', label: t('strategies'), icon: Target },
    { id: 'comparison', label: t('comparison'), icon: TrendingUp },
    { id: 'pac', label: t('pac'), icon: Calendar },
    { id: 'ai', label: t('aiAssistant'), icon: Bot }
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
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              
              <div className="text-right">
                <p className="text-sm text-gray-600">{t('totalValue')}</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(portfolioMetrics.totalValue)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                <p className="text-lg font-bold text-success-600">
                  {formatPercentage(portfolioMetrics.expectedReturn)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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
            <AssetForm 
              assets={assets}
              onAddAsset={handleAddAsset}
              onRemoveAsset={handleRemoveAsset}
              language={language}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PortfolioChart assets={assets} language={language} />
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('portfolioMetrics')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
                      <p className="text-xl font-bold text-success-600">
                        {formatPercentage(portfolioMetrics.expectedReturn)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('riskScore')}</p>
                      <p className="text-xl font-bold text-warning-600">
                        {portfolioMetrics.riskScore.toFixed(1)}/5
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('diversification')}</p>
                      <p className="text-xl font-bold text-primary-600">
                        {portfolioMetrics.diversificationScore}/100
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">{t('totalAssets')}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {assets.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ProjectionChart assets={assets} language={language} />
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('investmentStrategies')}</h2>
                <p className="text-gray-600">{t('strategiesDescription')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  assets={assets}
                  language={language}
                  isActive={selectedStrategy === strategy.id}
                  onClick={() => setSelectedStrategy(
                    selectedStrategy === strategy.id ? null : strategy.id
                  )}
                />
              ))}
            </div>

            {selectedStrategy && (
              <div className="space-y-6">
                <ProjectionChart 
                  assets={assets} 
                  language={language}
                  strategies={strategies.filter(s => s.id === selectedStrategy)} 
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('strategyComparison')}</h2>
              <p className="text-gray-600">{t('comparisonDescription')}</p>
            </div>
            
            <StrategyComparison strategies={strategies} language={language} />
            
            <ProjectionChart assets={assets} language={language} strategies={strategies} />
          </div>
        )}

        {activeTab === 'pac' && (
          <PACManager
            assets={assets}
            language={language}
            pacs={pacs}
            onAddPAC={handleAddPAC}
            onRemovePAC={handleRemovePAC}
          />
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('aiAssistantTitle')}</h2>
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