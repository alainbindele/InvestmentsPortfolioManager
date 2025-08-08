import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, TrendingUp, Bot, Target } from 'lucide-react';
import { Asset, Strategy } from './types/portfolio';
import { AssetForm } from './components/AssetForm';
import { PortfolioChart } from './components/PortfolioChart';
import { ProjectionChart } from './components/ProjectionChart';
import { StrategyCard } from './components/StrategyCard';
import { StrategyComparison } from './components/StrategyComparison';
import { ChatGPTIntegration } from './components/ChatGPTIntegration';
import { mockAssets, mockStrategies } from './utils/mockData';
import { calculatePortfolioMetrics, formatCurrency, formatPercentage } from './utils/calculations';

function App() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'strategies' | 'comparison' | 'ai'>('portfolio');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

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

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'strategies', label: 'Strategie', icon: Target },
    { id: 'comparison', label: 'Confronto', icon: TrendingUp },
    { id: 'ai', label: 'AI Assistant', icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portfolio Rebalancer</h1>
                <p className="text-sm text-gray-600">Ottimizza i tuoi investimenti con l'AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Valore Totale</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(portfolioMetrics.totalValue)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Rendimento Atteso</p>
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
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PortfolioChart assets={assets} />
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Metriche Portfolio</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">Rendimento Atteso</p>
                      <p className="text-xl font-bold text-success-600">
                        {formatPercentage(portfolioMetrics.expectedReturn)}
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">Livello Rischio</p>
                      <p className="text-xl font-bold text-warning-600">
                        {portfolioMetrics.riskScore.toFixed(1)}/5
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">Diversificazione</p>
                      <p className="text-xl font-bold text-primary-600">
                        {portfolioMetrics.diversificationScore}/100
                      </p>
                    </div>
                    <div className="metric-card">
                      <p className="text-sm text-gray-600">Asset Totali</p>
                      <p className="text-xl font-bold text-gray-900">
                        {assets.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ProjectionChart assets={assets} />
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Strategie di Investimento</h2>
                <p className="text-gray-600">Confronta diverse strategie per ottimizzare il tuo portafoglio</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  assets={assets}
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
                  strategies={strategies.filter(s => s.id === selectedStrategy)} 
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Confronto Strategie</h2>
              <p className="text-gray-600">Analizza e confronta le performance delle diverse strategie</p>
            </div>
            
            <StrategyComparison strategies={strategies} />
            
            <ProjectionChart assets={assets} strategies={strategies} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
              <p className="text-gray-600">Utilizza l'intelligenza artificiale per ottimizzare il tuo portafoglio</p>
            </div>
            
            <ChatGPTIntegration 
              assets={assets}
              onStrategyGenerated={handleStrategyGenerated}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;