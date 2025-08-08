import React, { useState } from 'react';
import { X, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { Asset, ASSET_TYPE_LABELS, RISK_LEVEL_LABELS } from '../types/portfolio';
import { Language } from '../types/language';
import { formatCurrency, formatPercentage, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AssetModalProps {
  asset: Asset;
  onClose: () => void;
  language: Language;
}

export const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose, language }) => {
  const [timeHorizon, setTimeHorizon] = useState(10);
  const t = (key: string) => getTranslation(language, key);

  const projectionData = projectPortfolioGrowth(
    asset.currentValue,
    asset.expectedReturn,
    timeHorizon,
    [asset]
  );

  const finalValue = projectionData[projectionData.length - 1].value;
  const totalGrowth = finalValue - asset.currentValue;
  const totalGrowthPercentage = (totalGrowth / asset.currentValue) * 100;

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-error-600 bg-error-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '🛡️';
      case 'medium': return '⚖️';
      case 'high': return '⚡';
      default: return '❓';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">Anno {label}</p>
          <p className="text-sm text-primary-600">
            Valore: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{asset.name}</h2>
            <p className="text-gray-600">{ASSET_TYPE_LABELS[asset.type]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Asset Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-success-600" />
                <p className="text-sm font-medium text-gray-700">Valore Attuale</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(asset.currentValue)}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-primary-600" />
                <p className="text-sm font-medium text-gray-700">{t('expectedReturn')}</p>
              </div>
              <p className="text-2xl font-bold text-success-600">
                {formatPercentage(asset.expectedReturn)}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
                <p className="text-sm font-medium text-gray-700">{t('riskLevel')}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{getRiskIcon(asset.riskLevel)}</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(asset.riskLevel)}`}>
                  {RISK_LEVEL_LABELS[asset.riskLevel]}
                </span>
              </div>
            </div>
          </div>

          {/* PAC Information */}
          {asset.isPAC && (
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                📅 Piano di Accumulo (PAC)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-blue-700">Importo Versamento</p>
                  <p className="font-bold text-blue-900">
                    €{asset.pacAmount?.toLocaleString('it-IT')}/
                    {asset.pacFrequency === 'monthly' ? 'mese' :
                     asset.pacFrequency === 'quarterly' ? 'trimestre' :
                     asset.pacFrequency === 'biannual' ? 'semestre' : 'anno'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Contributo Annuale</p>
                  <p className="font-bold text-blue-900">
                    €{((asset.pacAmount || 0) * 
                      (asset.pacFrequency === 'monthly' ? 12 :
                       asset.pacFrequency === 'quarterly' ? 4 :
                       asset.pacFrequency === 'biannual' ? 2 : 1)
                    ).toLocaleString('it-IT')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Valore di Partenza</p>
                  <p className="font-bold text-blue-900">
                    €{(asset.pacStartingValue || 0).toLocaleString('it-IT')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Time Horizon Slider */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Proiezione di Crescita</h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Orizzonte Temporale: {timeHorizon} {t('years')}
                </label>
                <span className="text-xs text-gray-500">1-50 anni</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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

            {/* Projection Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Valore Finale</p>
                <p className="text-xl font-bold text-primary-600">
                  {formatCurrency(finalValue)}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Crescita Totale</p>
                <p className="text-xl font-bold text-success-600">
                  {formatCurrency(totalGrowth)}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Crescita %</p>
                <p className="text-xl font-bold text-success-600">
                  +{totalGrowthPercentage.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Details */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Dettagli Asset</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo Asset:</span>
                <span className="font-medium">{ASSET_TYPE_LABELS[asset.type]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livello di Rischio:</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(asset.riskLevel)}`}>
                  {RISK_LEVEL_LABELS[asset.riskLevel]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rendimento Atteso Annuo:</span>
                <span className="font-medium text-success-600">{formatPercentage(asset.expectedReturn)}</span>
              </div>
              {asset.isPAC && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Piano di Accumulo:</span>
                    <span className="font-medium text-blue-600">Attivo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequenza Versamenti:</span>
                    <span className="font-medium">
                      {asset.pacFrequency === 'monthly' ? 'Mensile' :
                       asset.pacFrequency === 'quarterly' ? 'Trimestrale' :
                       asset.pacFrequency === 'biannual' ? 'Semestrale' : 'Annuale'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};