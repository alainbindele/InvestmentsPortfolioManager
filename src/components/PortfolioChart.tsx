import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { ASSET_COLORS } from '../types/portfolio';
import { CHART } from '../theme/chartTheme';
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
      <div className="flex items-center justify-center h-64 text-ink-subtle">
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
      color: ASSET_COLORS[asset.type] || CHART.fallback,
      type: asset.type
    };
  }).filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-popover p-3">
          <p className="font-medium text-ink">{data.name}</p>
          <p className="text-sm text-ink-muted">
            {targetAllocations ? `${t('target')}: ` : `${t('current')}: `}{data.value.toFixed(1)}%
          </p>
          {!targetAllocations && (
            <p className="text-sm text-ink-muted">
              {t('value')}: {formatCurrency(data.actualValue, currency)}
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
        fill={CHART.pieStroke}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:items-center">
      <div className="relative h-64">
        {!targetAllocations && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="eyebrow">{t('totalValue')}</span>
            <span className="mt-1 text-lg font-semibold text-ink num">{formatCurrency(totalValue, currency)}</span>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              innerRadius={68}
              outerRadius={100}
              paddingAngle={2}
              fill={CHART.fallback}
              stroke={CHART.pieStroke}
              strokeWidth={2}
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
      <div className="grid grid-cols-1 gap-1">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}66` }}
              />
              <span className="text-ink-soft truncate">
                {entry.name.length > 20 ? entry.name.substring(0, 20) + '...' : entry.name}
              </span>
            </div>
            <span className="font-medium text-ink num">
              {entry.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};