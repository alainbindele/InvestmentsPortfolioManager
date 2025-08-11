import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy, Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface MultiStrategyProjectionChartProps {
  strategies: Strategy[];
  assets: Asset[];
  currency: Currency;
  language: Language;
}

const STRATEGY_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#f97316', // Orange
  '#06b6d4', // Cyan
  '#84cc16', // Lime
];

export const MultiStrategyProjectionChart: React.FC<MultiStrategyProjectionChartProps> = ({
  strategies,
  assets,
  currency,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [timeHorizon, setTimeHorizon] = useState(20);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Generate projection data for all strategies
  const allProjections = strategies.map((strategy, index) => ({
    strategy,
    color: STRATEGY_COLORS[index % STRATEGY_COLORS.length],
    data: projectPortfolioGrowth(
      totalValue,
      strategy.expectedReturn,
      timeHorizon,
      assets
    )
  }));
  
  // Combine data for chart
  const chartData = allProjections[0]?.data.map((_, yearIndex) => {
    const yearData: any = {
      year: yearIndex
    };
    
    allProjections.forEach((projection, strategyIndex) => {
      const key = `strategy_${strategyIndex}`;
      yearData[key] = projection.data[yearIndex]?.value || 0;
      yearData[`${key}_name`] = projection.strategy.name;
      yearData[`${key}_color`] = projection.color;
    });
    
    return yearData;
  }) || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">Anno {label}</p>
          {payload.map((entry: any, index: number) => {
            const strategyIndex = parseInt(entry.dataKey.split('_')[1]);
            const strategy = allProjections[strategyIndex]?.strategy;
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {strategy?.name}: {formatCurrency(entry.value)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {allProjections.map((projection, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: projection.color }}
            />
            <span className="text-sm text-gray-600">
              {projection.strategy.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (strategies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Seleziona almeno una strategia per vedere il confronto</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Horizon Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Orizzonte Temporale: {timeHorizon} {t('years')}
          </label>
          <div className="text-xs text-gray-500">
            1 - 50 anni
          </div>
        </div>
        <div className="relative">
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
      </div>

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
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            
            {allProjections.map((projection, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`strategy_${index}`}
                stroke={projection.color}
                strokeWidth={3}
                dot={false}
                name={projection.strategy.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Final Values Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjections.map((projection, index) => {
          const finalValue = projection.data[projection.data.length - 1]?.value || 0;
          const totalGrowth = finalValue - totalValue;
          const growthPercentage = totalValue > 0 ? (totalGrowth / totalValue) * 100 : 0;
          
          return (
            <div key={index} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: projection.color }}
                />
                <p className="text-sm text-gray-600 font-medium">
                  {strategy?.name}: {formatCurrency(entry.value, currency)}
                {projection.strategy.name}
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(finalValue, currency)}
              </p>
              <p className={`text-sm font-medium ${
                totalGrowth > 0 ? 'text-success-600' : 'text-error-600'
              }`}>
                {totalGrowth > 0 ? '+' : ''}{formatCurrency(totalGrowth, currency)} ({growthPercentage > 0 ? '+' : ''}{growthPercentage.toFixed(1)}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};