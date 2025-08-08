import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Asset, Strategy } from '../types/portfolio';
import { Language } from '../types/language';
import { projectPortfolioGrowth, calculatePortfolioMetrics, formatCurrency } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { TrendingUp, Target } from 'lucide-react';

interface ProjectionChartProps {
  assets: Asset[];
  selectedStrategy?: Strategy | null;
  language: Language;
  title?: string;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({ 
  assets, 
  selectedStrategy, 
  language, 
  title 
}) => {
  const [timeHorizon, setTimeHorizon] = useState(10);
  const t = (key: string) => getTranslation(language, key);
  
  if (assets.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title || t('portfolioProjection')}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>{t('noAssetsMessage')}</p>
        </div>
      </div>
    );
  }

  const metrics = calculatePortfolioMetrics(assets);
  const currentProjection = projectPortfolioGrowth(
    metrics.totalValue,
    metrics.expectedReturn,
    timeHorizon,
    assets
  );

  let strategyProjection = null;
  if (selectedStrategy) {
    strategyProjection = projectPortfolioGrowth(
      metrics.totalValue,
      selectedStrategy.expectedReturn,
      timeHorizon,
      assets
    );
  }

  // Combine data for chart
  const chartData = currentProjection.map((point, index) => {
    const data: any = {
      year: point.year,
      current: point.value,
    };
    
    if (strategyProjection) {
      data.strategy = strategyProjection[index].value;
    }
    
    return data;
  });

  const finalCurrentValue = currentProjection[currentProjection.length - 1].value;
  const finalStrategyValue = strategyProjection ? strategyProjection[strategyProjection.length - 1].value : 0;
  const difference = finalStrategyValue - finalCurrentValue;
  const differencePercentage = finalCurrentValue > 0 ? (difference / finalCurrentValue) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{t('years')}: {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'current' && `${t('currentPortfolio')}: ${formatCurrency(entry.value)}`}
              {entry.dataKey === 'strategy' && `${selectedStrategy?.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {title || t('portfolioProjection')}
        </h3>
        
        {selectedStrategy && (
          <div className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-primary-600" />
            <span className="text-gray-600">vs</span>
            <span className="font-medium text-primary-600">{selectedStrategy.name}</span>
          </div>
        )}
      </div>

      {/* Time Horizon Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Orizzonte Temporale: {timeHorizon} {t('years')}
          </label>
          <span className="text-xs text-gray-500">1-50 anni</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(timeHorizon - 1) / 49 * 100}%, #e5e7eb ${(timeHorizon - 1) / 49 * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <p className="text-sm text-gray-600">{t('currentValue')}</p>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(metrics.totalValue)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('projection')} ({timeHorizon} {t('years')})</p>
          <p className="text-xl font-bold text-success-600">
            {formatCurrency(finalCurrentValue)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('totalGrowth')}</p>
          <p className="text-xl font-bold text-primary-600">
            {formatCurrency(finalCurrentValue - metrics.totalValue)}
          </p>
        </div>
      </div>

      {/* Strategy Comparison Metrics */}
      {selectedStrategy && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-700 font-medium">{selectedStrategy.name}</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(finalStrategyValue)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Differenza</p>
            <p className={`text-xl font-bold ${difference >= 0 ? 'text-success-600' : 'text-error-600'}`}>
              {difference >= 0 ? '+' : ''}{formatCurrency(difference)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Variazione %</p>
            <p className={`text-xl font-bold ${differencePercentage >= 0 ? 'text-success-600' : 'text-error-600'}`}>
              {differencePercentage >= 0 ? '+' : ''}{differencePercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line
              type="monotone"
              dataKey="current"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
              name={t('currentPortfolio')}
            />
            
            {selectedStrategy && (
              <Line
                type="monotone"
                dataKey="strategy"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name={selectedStrategy.name}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!selectedStrategy && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 Seleziona una strategia AI dalla sezione "Strategie" per vedere il confronto
          </p>
        </div>
      )}
    </div>
  );
};