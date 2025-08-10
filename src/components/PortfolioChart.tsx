import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { ASSET_COLORS } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface PortfolioChartProps {
  assets: Asset[];
  language: Language;
  currency: Currency;
  targetAllocations?: { [assetId: string]: number };
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  assets, 
  language, 
  currency,
  targetAllocations 
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  if (assets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>{t('noAssetsMessage')}</p>
      </div>
    );
  }

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Prepare data for pie chart
  const chartData = assets.map(asset => {
    const currentAllocation = (asset.currentValue / totalValue) * 100;
    const targetAllocation = targetAllocations ? targetAllocations[asset.id] || 0 : currentAllocation;
    
    return {
      name: asset.name,
      value: targetAllocations ? targetAllocation : currentAllocation,
      actualValue: asset.currentValue,
      color: ASSET_COLORS[asset.type] || '#6b7280',
      type: asset.type
    };
  }).filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {targetAllocations ? 'Target: ' : 'Attuale: '}{data.value.toFixed(1)}%
          </p>
          {!targetAllocations && (
            <p className="text-sm text-gray-600">
              Valore: {formatCurrency(data.actualValue, currency)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-1 gap-2">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700 truncate">
                {entry.name.length > 20 ? entry.name.substring(0, 20) + '...' : entry.name}
              </span>
            </div>
            <span className="font-medium text-gray-900">
              {entry.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};