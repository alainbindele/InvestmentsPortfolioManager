import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Bot,
  Target,
  Calendar,
} from 'lucide-react';
import { Asset, Strategy, PACPlan } from './types/portfolio';
import { Language } from './types/language';
import { mockAssets, mockStrategies } from './utils/mockData';
import { calculatePortfolioMetrics } from './utils/calculations';
import { getTranslation } from './utils/translations';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

type ActiveTab = 'portfolio' | 'strategies' | 'comparison' | 'pac' | 'ai';

function App() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [pacs, setPacs] = useState<PACPlan[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('portfolio');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('it');

  const portfolioMetrics = calculatePortfolioMetrics(assets);

  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
    };
    setAssets((prev) => [...prev, asset]);
  };

  const handleRemoveAsset = (assetId: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  const handleStrategyGenerated = (newStrategy: Strategy) => {
    setStrategies((prev) => [...prev, newStrategy]);
    setActiveTab('strategies');
  };

  const handleAddPAC = (newPAC: Omit<PACPlan, 'id'>) => {
    const pac: PACPlan = {
      ...newPAC,
      id: Date.now().toString(),
    };
    setPacs((prev) => [...prev, pac]);
  };

  const handleRemovePAC = (pacId: string) => {
    setPacs((prev) => prev.filter((pac) => pac.id !== pacId));
  };

  const t = (key: string) => getTranslation(language, key);

  const tabs = [
    { id: 'portfolio', label: t('portfolio'), icon: BarChart3 },
    { id: 'strategies', label: t('strategies'), icon: Target },
    { id: 'comparison', label: t('comparison'), icon: TrendingUp },
    { id: 'pac', label: t('pac'), icon: Calendar },
    { id: 'ai', label: t('aiAssistant'), icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        portfolioMetrics={portfolioMetrics}
        t={t}
      />

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
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

      <Dashboard
        activeTab={activeTab}
        assets={assets}
        strategies={strategies}
        pacs={pacs}
        language={language}
        portfolioMetrics={portfolioMetrics}
        selectedStrategy={selectedStrategy}
        t={t}
        handleAddAsset={handleAddAsset}
        handleRemoveAsset={handleRemoveAsset}
        handleStrategyGenerated={handleStrategyGenerated}
        handleAddPAC={handleAddPAC}
        handleRemovePAC={handleRemovePAC}
        setSelectedStrategy={setSelectedStrategy}
      />
    </div>
  );
}

export default App;
