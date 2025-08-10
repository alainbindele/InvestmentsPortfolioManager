import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy, Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { TrendingUp } from 'lucide-react';

interface ProjectionChartProps {
  currentStrategy: Strategy;
  selectedStrategy: Strategy | null;
  assets: Asset[];
  currency: Currency;
  language: Language;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  currentStrategy,
  selectedStrategy,
  assets,
  currency,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [timeHorizon, setTimeHorizon] = useState(20);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Generate projection data
  const currentProjection = projectPortfolioGrowth(
    totalValue,
    currentStrategy.expectedReturn,
    timeHorizon,
    assets
  );
  
  const selectedProjection = selectedStrategy ? projectPortfolioGrowth(
    totalValue,
    selectedStrategy.expectedReturn,
    timeHorizon,
    assets
  ) : null;
  
  // Combine data for chart
  const chartData = currentProjection.map((current, index) => {
    const data: any = {
      year: current.year,
      current: current.value,
      currentLabel: currentStrategy.name
    };
    
    if (selectedProjection && selectedProjection[index]) {
      data.selected = selectedProjection[index].value;
      data.selectedLabel = selectedStrategy!.name;
    }
    
    return data;
  });
  
  const finalCurrentValue = currentProjection[currentProjection.length - 1]?.value || 0;
  const finalSelectedValue = selectedProjection ? selectedProjection[selectedProjection.length - 1]?.value || 0 : 0;
  const difference = finalSelectedValue - finalCurrentValue;
  const differencePercentage = finalCurrentValue > 0 ? (difference / finalCurrentValue) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">Anno {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'current' ? currentStrategy.name : selectedStrategy?.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('portfolioProjection')}</h3>
          <p className="text-sm text-gray-600">
            Confronto crescita portfolio nel tempo
          </p>
        </div>
      </div>

      {/* Time Horizon Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Orizzonte Temporale: {timeHorizon} {t('years')}
          </label>
          <div className="text-xs text-gray-500">
            1 - 100 anni
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="100"
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(timeHorizon - 1) / 99 * 100}%, #e5e7eb ${(timeHorizon - 1) / 99 * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
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
            <Legend />
            
            <Line
              type="monotone"
              dataKey="current"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name={currentStrategy.name}
            />
            
            {selectedStrategy && (
              <Line
                type="monotone"
                dataKey="selected"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name={selectedStrategy.name}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('currentValue')}</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(totalValue, currency)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">{currentStrategy.name}</p>
          <p className="text-lg font-bold text-gray-600">
            {formatCurrency(finalCurrentValue, currency)}
          </p>
        </div>
        
        {selectedStrategy && (
          <div className="metric-card">
            <p className="text-sm text-gray-600">{selectedStrategy.name}</p>
            <p className="text-lg font-bold text-primary-600">
              {formatCurrency(finalSelectedValue, currency)}
            </p>
            {difference !== 0 && (
              <p className={`text-sm font-medium ${difference > 0 ? 'text-success-600' : 'text-error-600'}`}>
                {difference > 0 ? '+' : ''}{formatCurrency(difference, currency)} ({differencePercentage > 0 ? '+' : ''}{differencePercentage.toFixed(1)}%)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};