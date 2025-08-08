import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy } from '../types/portfolio';
import { formatPercentage } from '../utils/calculations';
import { Trophy, TrendingUp, Shield, Target } from 'lucide-react';

interface StrategyComparisonProps {
  strategies: Strategy[];
}

export const StrategyComparison: React.FC<StrategyComparisonProps> = ({ strategies }) => {
  if (strategies.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confronto Strategie</h3>
        <div className="text-center py-8 text-gray-500">
          <p>Nessuna strategia da confrontare</p>
        </div>
      </div>
    );
  }

  // Prepare data for comparison chart
  const comparisonData = strategies.map(strategy => ({
    name: strategy.name.length > 15 ? strategy.name.substring(0, 15) + '...' : strategy.name,
    fullName: strategy.name,
    rendimento: strategy.expectedReturn,
    rischio: strategy.riskScore,
    sharpe: strategy.sharpeRatio,
    volatilita: strategy.volatility
  }));

  // Find best performers
  const bestReturn = strategies.reduce((best, current) => 
    current.expectedReturn > best.expectedReturn ? current : best
  );
  const bestRisk = strategies.reduce((best, current) => 
    current.riskScore < best.riskScore ? current : best
  );
  const bestSharpe = strategies.reduce((best, current) => 
    current.sharpeRatio > best.sharpeRatio ? current : best
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.fullName}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'rendimento' && `Rendimento: ${formatPercentage(entry.value)}`}
              {entry.dataKey === 'rischio' && `Rischio: ${entry.value.toFixed(1)}/5`}
              {entry.dataKey === 'sharpe' && `Sharpe: ${entry.value.toFixed(2)}`}
              {entry.dataKey === 'volatilita' && `Volatilità: ${formatPercentage(entry.value)}`}
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
              <p className="text-sm text-success-700 font-medium">Miglior Rendimento</p>
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
              <p className="text-sm text-primary-700 font-medium">Minor Rischio</p>
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
              <p className="text-sm text-warning-700 font-medium">Miglior Sharpe</p>
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
          Confronto Metriche Strategie
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
                name="Rendimento (%)"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="sharpe" 
                fill="#3b82f6" 
                name="Sharpe Ratio"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tabella Comparativa Dettagliata
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Strategia</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Rendimento</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Rischio</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Sharpe</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Volatilità</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Max Drawdown</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, index) => (
                <tr key={strategy.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{strategy.name}</span>
                      {strategy.isAIGenerated && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                          AI
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-success-600">
                    {formatPercentage(strategy.expectedReturn)}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={`font-semibold ${
                      strategy.riskScore < 2 ? 'text-success-600' : 
                      strategy.riskScore < 2.5 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {strategy.riskScore.toFixed(1)}/5
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-primary-600">
                    {strategy.sharpeRatio.toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-warning-600">
                    {formatPercentage(strategy.volatility)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-error-600">
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