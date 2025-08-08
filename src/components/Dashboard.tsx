import React from 'react';
import { Asset, Strategy, PACPlan } from '../types/portfolio';
import { Language } from '../types/language';
import { AssetForm } from './AssetForm';
import { PortfolioChart } from './PortfolioChart';
import { ProjectionChart } from './ProjectionChart';
import { StrategyCard } from './StrategyCard';
import { StrategyComparison } from './StrategyComparison';
import { ChatGPTIntegration } from './ChatGPTIntegration';
import { PACManager } from './PACManager';
import { formatPercentage } from '../utils/calculations';

type DashboardProps = {
  activeTab: 'portfolio' | 'strategies' | 'comparison' | 'pac' | 'ai';
  assets: Asset[];
  strategies: Strategy[];
  pacs: PACPlan[];
  language: Language;
  portfolioMetrics: {
    totalValue: number;
    expectedReturn: number;
    riskScore: number;
    diversificationScore: number;
  };
  selectedStrategy: string | null;
  t: (key: string) => string;
  handleAddAsset: (newAsset: Omit<Asset, 'id'>) => void;
  handleRemoveAsset: (assetId: string) => void;
  handleStrategyGenerated: (newStrategy: Strategy) => void;
  handleAddPAC: (newPAC: Omit<PACPlan, 'id'>) => void;
  handleRemovePAC: (pacId: string) => void;
  setSelectedStrategy: (strategyId: string | null) => void;
};

export const Dashboard: React.FC<DashboardProps> = ({
  activeTab,
  assets,
  strategies,
  pacs,
  language,
  portfolioMetrics,
  selectedStrategy,
  t,
  handleAddAsset,
  handleRemoveAsset,
  handleStrategyGenerated,
  handleAddPAC,
  handleRemovePAC,
  setSelectedStrategy,
}) => {
  return (
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('portfolioMetrics')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">
                      {t('expectedReturn')}
                    </p>
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
                    <p className="text-sm text-gray-600">
                      {t('diversification')}
                    </p>
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
              <h2 className="text-2xl font-bold text-gray-900">
                {t('investmentStrategies')}
              </h2>
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
                onClick={() =>
                  setSelectedStrategy(
                    selectedStrategy === strategy.id ? null : strategy.id
                  )
                }
              />
            ))}
          </div>

          {selectedStrategy && (
            <div className="space-y-6">
              <ProjectionChart
                assets={assets}
                language={language}
                strategies={strategies.filter(
                  (s) => s.id === selectedStrategy
                )}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('strategyComparison')}
            </h2>
            <p className="text-gray-600">{t('comparisonDescription')}</p>
          </div>

          <StrategyComparison strategies={strategies} language={language} />

          <ProjectionChart
            assets={assets}
            language={language}
            strategies={strategies}
          />
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
            <h2 className="text-2xl font-bold text-gray-900">
              {t('aiAssistantTitle')}
            </h2>
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
  );
};
