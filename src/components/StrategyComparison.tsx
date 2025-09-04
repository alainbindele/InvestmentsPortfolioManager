import React from 'react';
import { useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy } from '../types/portfolio';
import { Language } from '../types/language';
import { formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { Trophy, TrendingUp, Shield, Target } from 'lucide-react';

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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('strategyComparison')}</h3>
        <div className="text-center py-8 text-gray-500">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('strategyComparison')}</h3>
        <div className="text-center py-8 text-gray-500">
          <p>{t('noAssetsMessage')}</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.fullName}</p>
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
        <div className="card bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-success-700 font-medium">{t('bestReturn')}</p>
              <p className="text-lg font-bold text-success-800">{bestReturn.name}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-success-600">
            {formatPercentage(bestReturn.expectedReturn)}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-500 rounded-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-700 font-medium">{t('lowestRisk')}</p>
              <p className="text-lg font-bold text-primary-800">{bestRisk.name}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-600">
            {bestRisk.riskScore.toFixed(1)}/5
          </p>
        </div>

        <div className="card bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-warning-500 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-warning-700 font-medium">{t('bestSharpe')}</p>
              <p className="text-lg font-bold text-warning-800">{bestSharpe.name}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-warning-600">
            {bestSharpe.sharpeRatio.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('comparisonMetrics')}
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Bar 
                dataKey="rendimento" 
                fill="#10b981" 
               name={`${t('return')} (%)`}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="sharpe" 
                fill="#3b82f6" 
               name={`${t('sharpeRatio')}`}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('detailedComparison')}
        </h3>
        
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <div className="sm:hidden text-xs text-gray-500 p-2 bg-gray-50 border-b border-gray-200 flex items-center gap-1">
            <span>👈</span>
            <span>{t('swipeToSeeMore') || 'Scorri per vedere tutti i dati'}</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">{t('strategy')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">{t('return')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">{t('risk')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">{t('sharpe')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">{t('volatility')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">{t('maxDrawdown')}</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, index) => (
                <tr key={strategy.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 whitespace-nowrap">{strategy.name}</span>
                      {strategy.isAIGenerated && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                          AI
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-success-600 whitespace-nowrap">
                    {formatPercentage(strategy.expectedReturn)}
                  </td>
                  <td className="text-right py-3 px-4 whitespace-nowrap">
                    <span className={`font-semibold ${
                      strategy.riskScore < 2 ? 'text-success-600' : 
                      strategy.riskScore < 2.5 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {strategy.riskScore.toFixed(1)}/5
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-primary-600 whitespace-nowrap">
                    {strategy.sharpeRatio.toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-warning-600 whitespace-nowrap">
                    {formatPercentage(strategy.volatility)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-error-600 whitespace-nowrap">
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