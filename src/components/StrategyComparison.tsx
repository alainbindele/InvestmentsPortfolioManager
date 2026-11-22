import React from 'react';
import { useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy } from '../types/portfolio';
import { Language } from '../types/language';
import { formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { Trophy, TrendingUp, Shield, Target, MoveHorizontal } from 'lucide-react';
import { CHART, SERIES_COLORS } from '../theme/chartTheme';

interface StrategyComparisonProps {
  strategies: Strategy[];
  language: Language;
}

export const StrategyComparison: React.FC<StrategyComparisonProps> = ({ strategies, language }) => {
  const t = (key: string) => getTranslation(language, key);

  // Debug logging and force re-calculation when strategies change
  useEffect(() => {
    console.log('StrategyComparison: Strategies updated', {
      count: strategies.length,
      strategies: strategies.map(s => ({
        id: s.id,
        name: s.name,
        expectedReturn: s.expectedReturn,
        riskScore: s.riskScore,
        sharpeRatio: s.sharpeRatio
      }))
    });
  }, [strategies]);

  // Force re-calculation when strategies change
  useEffect(() => {
    console.log('StrategyComparison: Strategies updated', strategies.map(s => ({ id: s.id, name: s.name })));
  }, [strategies]);

  if (strategies.length === 0) {
    return (
      <div className="card">
        <h3 className="section-title mb-4">{t('strategyComparison')}</h3>
        <div className="text-center py-8 text-ink-subtle">
          <p>{t('noAssetsMessage')}</p>
        </div>
      </div>
    );
  }

  // Memoize calculations to ensure they update when strategies change
  const comparisonData = useMemo(() => {
    return strategies.map(strategy => ({
      name: strategy.name.length > 15 ? strategy.name.substring(0, 15) + '...' : strategy.name,
      fullName: strategy.name,
      rendimento: strategy.expectedReturn,
      rischio: strategy.riskScore,
      sharpe: strategy.sharpeRatio,
      volatilita: strategy.volatility
    }));
  }, [strategies]);

  // Memoize best performers calculation
  const bestPerformers = useMemo(() => {
    if (strategies.length === 0) {
      return { bestReturn: null, bestRisk: null, bestSharpe: null };
    }

    const bestReturn = strategies.reduce((best, current) =>
      current.expectedReturn > best.expectedReturn ? current : best
    );
    const bestRisk = strategies.reduce((best, current) =>
      current.riskScore < best.riskScore ? current : best
    );
    const bestSharpe = strategies.reduce((best, current) =>
      current.sharpeRatio > best.sharpeRatio ? current : best
    );

    return { bestReturn, bestRisk, bestSharpe };
  }, [strategies]);

  const { bestReturn, bestRisk, bestSharpe } = bestPerformers;

  if (!bestReturn || !bestRisk || !bestSharpe) {
    return (
      <div className="card">
        <h3 className="section-title mb-4">{t('strategyComparison')}</h3>
        <div className="text-center py-8 text-ink-subtle">
          <p>{t('noAssetsMessage')}</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-popover p-4">
          <p className="font-medium text-ink mb-2">{data.fullName}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'rendimento' && `${t('rendimento')}: ${formatPercentage(entry.value)}`}
              {entry.dataKey === 'rischio' && `${t('rischio')}: ${entry.value.toFixed(1)}/5`}
              {entry.dataKey === 'sharpe' && `${t('sharpeRatio')}: ${entry.value.toFixed(2)}`}
              {entry.dataKey === 'volatilita' && `${t('volatilita')}: ${formatPercentage(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Best Performers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-success-500/15 to-success-500/[0.04] border-success-400/25">
          <div className="flex items-center gap-3 mb-2">
            <span className="icon-tile icon-tile-success">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-success-300 font-medium">{t('bestReturn')}</p>
              <p className="text-base font-semibold text-ink">{bestReturn.name}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-success-300 num">
            {formatPercentage(bestReturn.expectedReturn)}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-primary-500/15 to-primary-500/[0.04] border-primary-400/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="icon-tile icon-tile-primary">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-primary-300 font-medium">{t('lowestRisk')}</p>
              <p className="text-base font-semibold text-ink">{bestRisk.name}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-primary-300 num">
            {bestRisk.riskScore.toFixed(1)}/5
          </p>
        </div>

        <div className="card bg-gradient-to-br from-warning-500/15 to-warning-500/[0.04] border-warning-400/25">
          <div className="flex items-center gap-3 mb-2">
            <span className="icon-tile icon-tile-warning">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-warning-300 font-medium">{t('bestSharpe')}</p>
              <p className="text-base font-semibold text-ink">{bestSharpe.name}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-warning-300 num">
            {bestSharpe.sharpeRatio.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="card">
        <h3 className="section-title mb-4">
          {t('comparisonMetrics')}
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
              <XAxis
                dataKey="name"
                stroke={CHART.axis}
                tick={{ fontSize: 12, fill: CHART.tick }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke={CHART.axis} tick={{ fontSize: 12, fill: CHART.tick }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: CHART.cursor }} />
              <Legend />

              <Bar
                dataKey="rendimento"
                fill={SERIES_COLORS[1]}
               name={`${t('return')} (%)`}
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="sharpe"
                fill={SERIES_COLORS[2]}
               name={`${t('sharpeRatio')}`}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="card">
        <h3 className="section-title mb-4">
          {t('detailedComparison')}
        </h3>

        <div className="table-shell">
          <div className="sm:hidden text-xs text-ink-subtle px-3 py-2 border-b border-line flex items-center gap-1.5">
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>{t('swipeToSeeMore') || 'Scorri per vedere tutti i dati'}</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-left">{t('strategy')}</th>
                <th className="text-right">{t('return')}</th>
                <th className="text-right">{t('risk')}</th>
                <th className="text-right">{t('sharpe')}</th>
                <th className="text-right">{t('volatility')}</th>
                <th className="text-right">{t('maxDrawdown')}</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <tr key={strategy.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink whitespace-nowrap num">{strategy.name}</span>
                      {strategy.isAIGenerated && (
                        <span className="badge badge-accent">
                          AI
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-success-400 whitespace-nowrap num">
                    {formatPercentage(strategy.expectedReturn)}
                  </td>
                  <td className="text-right py-3 px-4 whitespace-nowrap num">
                    <span className={`font-semibold ${
                      strategy.riskScore < 2 ? 'text-success-400' :
                      strategy.riskScore < 2.5 ? 'text-warning-400' : 'text-error-400'
                    }`}>
                      {strategy.riskScore.toFixed(1)}/5
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-primary-400 whitespace-nowrap num">
                    {strategy.sharpeRatio.toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-warning-400 whitespace-nowrap num">
                    {formatPercentage(strategy.volatility)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-error-400 whitespace-nowrap num">
                    -{formatPercentage(strategy.maxDrawdown)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};