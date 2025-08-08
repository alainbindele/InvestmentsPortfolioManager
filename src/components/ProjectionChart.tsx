import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Asset, Strategy } from '../types/portfolio';
import { Language } from '../types/language';
import { projectPortfolioGrowth, formatCurrency } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface ProjectionChartProps {
  assets: Asset[];
  language: Language;
  strategies?: Strategy[];
  years?: number;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({ 
  assets, 
  language,
  strategies = [], 
  years = 10 
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const currentReturn = assets.reduce((sum, asset) => {
    const weight = asset.currentValue / totalValue;
    return sum + (asset.expectedReturn * weight);
  }, 0);

  // Generate projections for current portfolio
  const currentProjection = projectPortfolioGrowth(totalValue, currentReturn, years);
  
  // Generate projections for strategies
  const strategyProjections = strategies.map(strategy => 
    projectPortfolioGrowth(totalValue, strategy.expectedReturn, years)
  );

  // Combine data for chart
  const chartData = currentProjection.map((point, index) => {
    const dataPoint: any = {
      year: point.year,
      current: point.value
    };
    
    strategies.forEach((strategy, strategyIndex) => {
      dataPoint[strategy.name] = strategyProjections[strategyIndex][index].value;
    });
    
    return dataPoint;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{t('years')} {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'current' ? t('currentPortfolio') : entry.dataKey}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('portfolioProjection')} ({years} {t('years')})
      </h3>
      
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
              dot={{ r: 4 }}
              name={t('currentPortfolio')}
            />
            
            {strategies.map((strategy, index) => (
              <Line
                key={strategy.id}
                type="monotone"
                dataKey={strategy.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                name={strategy.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('currentValue')}</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(totalValue)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('projection')} {years} {t('years')}</p>
          <p className="text-xl font-bold text-success-600">
            {formatCurrency(currentProjection[years].value)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('totalGrowth')}</p>
          <p className="text-xl font-bold text-primary-600">
            +{((currentProjection[years].value / totalValue - 1) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};