import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Asset, ASSET_TYPE_LABELS, ASSET_COLORS } from '../types/portfolio';
import { Language } from '../types/language';
import { formatCurrency } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface PortfolioChartProps {
  assets: Asset[];
  language: Language;
  title?: string;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ assets, language, title }) => {
  const t = (key: string) => getTranslation(language, key);
  const chartTitle = title || t('currentAllocation');
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  const chartData = assets.map(asset => ({
    name: asset.name,
    value: asset.currentValue,
    percentage: ((asset.currentValue / totalValue) * 100).toFixed(1),
    type: asset.type,
    color: ASSET_COLORS[asset.type]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{ASSET_TYPE_LABELS[data.type]}</p>
          <p className="text-sm font-semibold text-primary-600">
            {formatCurrency(data.value)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">
              {ASSET_TYPE_LABELS[entry.payload.type]} ({entry.payload.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (assets.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartTitle}</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>{t('noAssetsMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartTitle}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
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
      </div>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(totalValue)}
        </p>
        <p className="text-sm text-gray-600">{t('totalPortfolioValue')}</p>
      </div>
    </div>
  );
};