import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy, Asset, ASSET_COLORS, ASSET_TYPE_LABELS } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, formatPercentage, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { CHART, SERIES_COLORS } from '../theme/chartTheme';

interface ProjectionChartProps {
  strategies: Strategy[];
  assets: Asset[];
  currency: Currency;
  language: Language;
  showAssetSelection?: boolean;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  strategies,
  assets,
  currency,
  language,
  showAssetSelection = true
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [selectedAsset, setSelectedAsset] = useState<string>('portfolio');
  const [chartKey, setChartKey] = useState(0);

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  // Force chart re-render when assets change
  React.useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [assets, strategies, timeHorizon, selectedAsset]);

  // Helper function for single asset projection
  const projectAssetGrowth = (
    initialValue: number,
    asset: Asset,
    years: number
  ): Array<{ year: number; value: number }> => {
    const projections = [];
    let currentValue = initialValue;

    // Use asset's own return rate
    const annualReturn = asset.expectedReturn;
    const monthlyReturn = annualReturn / 100 / 12;

    // Map frequency to number of months between contributions
    const frequencyToMonths: Record<'monthly' | 'quarterly' | 'yearly', number> = {
      monthly: 1,
      quarterly: 3,
      yearly: 12
    };

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        projections.push({ year, value: Math.round(currentValue) });
      } else {
        for (let month = 1; month <= 12; month++) {
          // Add PAC contribution if enabled
          if (asset.isPAC && asset.pacAmount && asset.pacAmount > 0) {
            const frequency = asset.pacFrequency || 'monthly';
            const monthsBetweenContributions = frequencyToMonths[frequency];

            // Add contribution only on the appropriate months
            if (month % monthsBetweenContributions === 0) {
              currentValue += asset.pacAmount;
            }
          }

          // Apply monthly compound growth
          currentValue *= (1 + monthlyReturn);
        }
        projections.push({ year, value: Math.round(currentValue) });
      }
    }

    return projections;
  };

  // Generate projection data for all strategies
  const allProjections = strategies.map((strategy, index) => {
    if (selectedAsset === 'portfolio') {
      // Use strategy-specific calculation that considers target allocations
      return {
        strategy,
        data: projectPortfolioGrowth(
          totalValue,
          strategy.expectedReturn,
          timeHorizon,
          assets,
          strategy
        ),
        color: SERIES_COLORS[index] ?? `hsl(${(index - 1) * 60 + 30}, 75%, 65%)`,
        initialValue: totalValue
      };
    } else {
      // Single asset projection
      const asset = assets.find(a => a.id === selectedAsset);
      if (asset) {
        // Calculate initial value based on strategy allocation
        let initialValue: number;
        const targetAllocation = strategy.targetAllocations[asset.id] || 0;

        if (strategy.id === 'current-strategy') {
          // For current strategy, use actual current value
          initialValue = asset.currentValue;
        } else {
          // For AI strategies, use the allocated portion
          initialValue = targetAllocation > 0 ? (targetAllocation / 100) * totalValue : 0;
        }

        // Create modified strategy name with allocation info
        const strategyName = strategy.id === 'current-strategy'
          ? `${strategy.name} - ${asset.name} (${((asset.currentValue / totalValue) * 100).toFixed(1)}%)`
          : `${strategy.name} - ${asset.name} (${targetAllocation.toFixed(1)}%)`;

        const modifiedStrategy = {
          ...strategy,
          name: strategyName,
          expectedReturn: asset.expectedReturn // Use asset's own return
        };

        return {
          strategy: modifiedStrategy,
          data: projectAssetGrowth(initialValue, asset, timeHorizon),
          color: ASSET_COLORS[asset.type] || CHART.fallback,
          initialValue: initialValue
        };
      }
      return null;
    }
  }).filter(Boolean) as Array<{
    strategy: Strategy;
    data: Array<{ year: number; value: number }>;
    color: string;
    initialValue: number;
  }>;

  // Combine data for chart
  const chartData = allProjections.length > 0 ? allProjections[0].data.map((_, yearIndex) => {
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
  }) : [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-popover p-4">
          <p className="font-medium text-ink mb-2">{t('anno')} {label}</p>
          {payload.map((entry: any, index: number) => {
            const strategyIndex = parseInt(entry.dataKey.split('_')[1]);
            const projection = allProjections[strategyIndex];
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                <strong>{projection?.strategy.name}:</strong> {formatCurrency(entry.value, currency)}
                {projection && (
                  <span className="ml-2 text-xs text-ink-subtle">
                    ({formatPercentage(projection.strategy.expectedReturn)} annuo)
                  </span>
                )}
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
            <span className="text-sm text-ink-muted">
              {projection.strategy.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (strategies.length === 0) {
    return (
      <div className="text-center py-8 text-ink-subtle">
        <p>Nessuna strategia disponibile per il confronto</p>
      </div>
    );
  }

  const selectedAssetData = assets.find(a => a.id === selectedAsset);

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <span className="icon-tile icon-tile-primary">
          <TrendingUp className="w-5 h-5" />
        </span>
        <div>
          <h3 className="section-title">{t('portfolioProjection')}</h3>
          <p className="text-sm text-ink-muted">
            {selectedAsset === 'portfolio' ?
              t('growthProjectionComparison') :
              `${t('singleAssetProjection')} ${selectedAssetData?.name}`
            }
          </p>
        </div>
      </div>

      {/* Asset Selector */}
      {showAssetSelection && (
        <div className="mb-6">
          <label className="field-label">
            {t('selectAssetToAnalyze')}
          </label>
          <div className="relative">
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="input-field appearance-none pr-10 cursor-pointer"
            >
              <option value="portfolio">{t('entirePortfolio')}</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({t(asset.type)}) - {formatCurrency(asset.currentValue, currency)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
          </div>
        </div>
      )}

      {/* Time Horizon Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-ink-soft">
            {t('timeHorizon')}: {timeHorizon} {t('years')}
          </label>
          {assets.some(asset => asset.isPAC) && (
            <div className="badge badge-accent">
              <TrendingUp className="w-3 h-3" /> PAC attivo
            </div>
          )}
          <div className="text-xs text-ink-subtle">
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
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${CHART.trackFill} 0%, ${CHART.trackFill} ${(timeHorizon - 1) / 49 * 100}%, ${CHART.track} ${(timeHorizon - 1) / 49 * 100}%, ${CHART.track} 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-ink-subtle mt-1">
            <span>1</span>
            <span>25</span>
            <span>50</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div key={chartKey} className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
            <XAxis
              dataKey="year"
              stroke={CHART.axis}
              tick={{ fontSize: 12, fill: CHART.tick }}
            />
            <YAxis
              stroke={CHART.axis}
              tick={{ fontSize: 12, fill: CHART.tick }}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: CHART.axis, strokeDasharray: '3 3' }} />
            <Legend content={<CustomLegend />} />
            {allProjections.map((projection, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`strategy_${index}`}
                stroke={projection.color}
                strokeWidth={index === 0 ? 2 : 3}
                strokeDasharray={index === 0 ? "5 5" : "0"}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name={projection.strategy.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjections.map((projection, index) => {
          const finalValue = projection.data[projection.data.length - 1]?.value || 0;
          const initialValue = projection.initialValue;
          const totalGrowth = finalValue - initialValue;
          const growthPercentage = initialValue > 0 ? (totalGrowth / initialValue) * 100 : 0;

          return (
            <div key={index} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: projection.color }}
                />
                <p className="text-sm text-ink-muted font-medium truncate">
                  {projection.strategy.name}
                </p>
              </div>
              <p className="text-lg font-semibold text-ink num">
                {formatCurrency(finalValue, currency)}
              </p>
              <p className={`text-sm font-medium ${
                totalGrowth > 0 ? 'text-success-400 num' : 'text-error-400 num'
              }`}>
                {totalGrowth > 0 ? '+' : ''}{formatCurrency(totalGrowth, currency)} ({growthPercentage > 0 ? '+' : ''}{growthPercentage.toFixed(1)}%)
              </p>
              <p className="text-xs text-ink-subtle mt-1">
                Valore iniziale: {formatCurrency(initialValue, currency)}
              </p>
              <p className="text-xs text-ink-subtle">
                Rendimento: {formatPercentage(projection.strategy.expectedReturn)} annuo
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};