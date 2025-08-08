import React, { useState } from 'react';
import { X, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';
import { formatCurrency } from '../utils/calculations';

interface AssetModalProps {
  asset: Asset;
  language: Language;
  onClose: () => void;
}

export const AssetModal: React.FC<AssetModalProps> = ({ asset, language, onClose }) => {
  const t = (key: string) => getTranslation(language, key);
  const [selectedYears, setSelectedYears] = useState(10);

  // Time scale options: 5, 10, 15, ..., 100 years (5-year increments)
  const timeScaleOptions = Array.from({ length: 20 }, (_, i) => ({
    value: (i + 1) * 5,
    label: `${(i + 1) * 5}`
  }));

  // Generate projection data for the asset
  const generateAssetProjection = (years: number) => {
    const projections = [];
    let currentValue = asset.pacStartingValue || asset.currentValue;
    const monthlyContribution = asset.isPAC ? (asset.pacMonthlyAmount || 0) : 0;
    const monthlyReturn = asset.expectedReturn / 100 / 12;
    
    for (let year = 0; year <= years; year++) {
      // For PAC assets, add monthly contributions throughout the year
      if (asset.isPAC && year > 0) {
        for (let month = 1; month <= 12; month++) {
          currentValue += monthlyContribution;
          currentValue *= (1 + monthlyReturn);
        }
      } else if (!asset.isPAC) {
        // For non-PAC assets, simple compound growth
        currentValue *= (1 + asset.expectedReturn / 100);
      }
      
      projections.push({
        year,
        value: Math.round(currentValue)
      });
    }
    
    return projections;
  };

  const projectionData = generateAssetProjection(selectedYears);
  const finalValue = projectionData[selectedYears].value;
  const totalGrowth = ((finalValue / asset.currentValue - 1) * 100);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{t('years')} {label}</p>
          <p className="text-sm text-primary-600">
            {t('portfolioValue')}: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{asset.name}</h2>
              <p className="text-sm text-gray-600">
                {t('currentValue')}: {formatCurrency(asset.currentValue)} • {asset.expectedReturn}% {t('expectedReturn')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Time Scale Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('portfolioProjection')} ({selectedYears} {t('years')})
              </h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">{t('years')}</span>
              </div>
            </div>
            
            {/* Custom Slider */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="19"
                  value={timeScaleOptions.findIndex(option => option.value === selectedYears)}
                  onChange={(e) => setSelectedYears(timeScaleOptions[parseInt(e.target.value)].value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(timeScaleOptions.findIndex(option => option.value === selectedYears) / 19) * 100}%, #e5e7eb ${(timeScaleOptions.findIndex(option => option.value === selectedYears) / 19) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1 overflow-hidden">
                  {timeScaleOptions.filter((_, index) => index % 4 === 0 || index === timeScaleOptions.length - 1).map((option) => (
                    <span key={option.value} className="text-center flex-shrink-0">
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
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
                  dot={{ r: 4, fill: '#3b82f6' }}
                  activeDot={{ r: 6, fill: '#1d4ed8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('currentValue')}</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(asset.currentValue)}
              </p>
            </div>
            
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('projection')} {selectedYears} {t('years')}</p>
              <p className="text-xl font-bold text-success-600">
                {formatCurrency(finalValue)}
              </p>
            </div>
            
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('totalGrowth')}</p>
              <p className="text-xl font-bold text-primary-600">
                +{totalGrowth.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Asset Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Dettagli Asset</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Tipo</p>
                <p className="font-semibold text-gray-900">{asset.type.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Rendimento Atteso</p>
                <p className="font-semibold text-success-600">{asset.expectedReturn}%</p>
              </div>
              <div>
                <p className="text-gray-600">Livello Rischio</p>
                <p className={`font-semibold ${
                  asset.riskLevel === 'low' ? 'text-success-600' :
                  asset.riskLevel === 'medium' ? 'text-warning-600' : 'text-error-600'
                }`}>
                  {asset.riskLevel === 'low' ? 'Basso' :
                   asset.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Valore Finale</p>
                <p className="font-semibold text-primary-600">
                  {formatCurrency(finalValue)}
                </p>
              </div>
              {asset.isPAC && (
                <div>
                  <p className="text-gray-600">PAC Mensile</p>
                  <p className="font-semibold text-blue-600">
                    €{asset.pacMonthlyAmount?.toLocaleString('it-IT') || 0}
                  </p>
                </div>
              )}
            </div>
            
            {asset.isPAC && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">Informazioni PAC</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700">Valore di Partenza</p>
                    <p className="font-semibold text-blue-900">
                      €{asset.pacStartingValue?.toLocaleString('it-IT') || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700">Contributi Annuali</p>
                    <p className="font-semibold text-blue-900">
                      €{((asset.pacMonthlyAmount || 0) * 12).toLocaleString('it-IT')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};