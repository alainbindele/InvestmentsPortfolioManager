import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Strategy, Asset, ASSET_COLORS, ASSET_TYPE_LABELS } from '../types/portfolio';
import { Language } from '../types/language';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { TrendingUp, Shield, Target, BarChart3, Bot } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  assets: Asset[];
  language: Language;
  isActive?: boolean;
  onClick?: () => void;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ 
  strategy, 
  assets, 
  language,
  isActive = false, 
  onClick 
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Create chart data for target allocation
  const chartData = Object.entries(strategy.targetAllocations)
    .filter(([assetId, allocation]) => allocation > 0)
    .map(([assetId, allocation]) => {
      const asset = assets.find(a => a.id === assetId);
      if (!asset) return null;
      return {
        name: asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name,
        fullName: asset.name,
        value: allocation,
        color: ASSET_COLORS[asset.type],
        type: asset.type
      };
    })
    .filter(Boolean);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.fullName}</p>
          <p className="text-sm text-gray-600">{ASSET_TYPE_LABELS[data.type]}</p>
          <p className="text-sm font-semibold text-primary-600">
            {data.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {payload.slice(0, 3).map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600">
              {entry.payload.value}%
            </span>
          </div>
        ))}
        {payload.length > 3 && (
          <span className="text-xs text-gray-500">+{payload.length - 3} altri</span>
        )}
      </div>
    );
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore < 2) return 'text-success-600';
    if (riskScore < 2.5) return 'text-warning-600';
    return 'text-error-600';
  };

  const getRiskLabel = (riskScore: number) => {
    if (riskScore < 2) return 'Basso';
    if (riskScore < 2.5) return 'Medio';
    return 'Alto';
  };

  return (
    <div 
      className={`card cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive ? 'ring-2 ring-primary-500 bg-primary-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
            {strategy.isAIGenerated && (
              <div className="flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                <Bot className="w-3 h-3" />
                AI
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-40">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={20}
                  outerRadius={45}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Nessuna allocazione
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success-600" />
            <div>
              <p className="text-xs text-gray-600">{t('expectedReturn')}</p>
              <p className="font-semibold text-success-600">
                {formatPercentage(strategy.expectedReturn)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className={`w-4 h-4 ${getRiskColor(strategy.riskScore)}`} />
            <div>
              <p className="text-xs text-gray-600">{t('risk')}</p>
              <p className={`font-semibold ${getRiskColor(strategy.riskScore)}`}>
                {getRiskLabel(strategy.riskScore)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary-600" />
            <div>
              <p className="text-xs text-gray-600">{t('sharpe')}</p>
              <p className="font-semibold text-primary-600">
                {strategy.sharpeRatio.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600">{t('maxDrawdown')}</p>
          <p className="font-semibold text-error-600">
            -{formatPercentage(strategy.maxDrawdown)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">{t('volatility')}</p>
          <p className="font-semibold text-warning-600">
            {formatPercentage(strategy.volatility)}
          </p>
        </div>
      </div>

      {isActive && (
        <div className="mt-4 pt-4 border-t border-primary-200">
          <p className="text-sm text-primary-700 font-medium">
            {t('selectedStrategy')}
          </p>
        </div>
      )}
    </div>
  );
};