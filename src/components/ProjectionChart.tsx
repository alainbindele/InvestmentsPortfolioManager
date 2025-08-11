import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Strategy, Asset, ASSET_COLORS } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { TrendingUp, ChevronDown } from 'lucide-react';

interface ProjectionChartProps {
  currentStrategy: Strategy;
  selectedStrategy: Strategy | null;
  assets: Asset[];
  currency: Currency;
  language: Language;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  currentStrategy,
  selectedStrategy,
  assets,
  currency,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [selectedAsset, setSelectedAsset] = useState<string>('portfolio');
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Helper function for single asset projection
  const projectAssetGrowth = (
    initialValue: number,
    annualReturn: number,
    years: number,
    asset: Asset
  ): Array<{ year: number; value: number }> => {
    const projections = [];
    let currentValue = initialValue;
    
    // Add PAC contributions if enabled
    const pacContribution = asset.isPAC && asset.pacAmount ? 
      asset.pacAmount * (
        asset.pacFrequency === 'monthly' ? 12 :
        asset.pacFrequency === 'quarterly' ? 4 :
        asset.pacFrequency === 'biannual' ? 2 : 1
      ) : 0;

    for (let year = 0; year <= years; year++) {
      projections.push({
        year,
        value: Math.round(currentValue)
      });
      
      if (year < years) {
        // Apply annual return
        currentValue *= (1 + annualReturn / 100);
        
        // Add PAC contributions
        currentValue += pacContribution;
      }
    }
    
    return projections;
  };

  // Generate projection data based on selection
  let currentProjection: Array<{ year: number; value: number }> = [];
  let selectedProjection: Array<{ year: number; value: number }> | null = null;
  
  if (selectedAsset === 'portfolio') {
    // Portfolio projection
    currentProjection = projectPortfolioGrowth(
      totalValue,
      currentStrategy.expectedReturn,
      timeHorizon,
      assets
    );
    
    selectedProjection = selectedStrategy ? projectPortfolioGrowth(
      totalValue,
      selectedStrategy.expectedReturn,
      timeHorizon,
      assets
    ) : null;
  } else {
    // Single asset projection
    const asset = assets.find(a => a.id === selectedAsset);
    if (asset) {
      currentProjection = projectAssetGrowth(
        asset.currentValue,
        asset.expectedReturn,
        timeHorizon,
        asset
      );
    }
    selectedProjection = null; // No strategy comparison for single assets
  }
  
  // Combine data for chart
  const chartData = currentProjection.map((current, index) => {
    const data: any = {
      year: current.year,
      current: current.value,
      currentLabel: currentStrategy.name
    };
    
    if (selectedProjection && selectedProjection[index]) {
      data.selected = selectedProjection[index].value;
      data.selectedLabel = selectedStrategy!.name;
    }
    
    return data;
  });
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const selectedAssetData = assets.find(a => a.id === selectedAsset);
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">Anno {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'current' ? 
                (selectedAsset === 'portfolio' ? currentStrategy.name : selectedAssetData?.name) : 
                selectedStrategy?.name
              }: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const finalCurrentValue = currentProjection[currentProjection.length - 1]?.value || 0;
  const finalSelectedValue = selectedProjection ? selectedProjection[selectedProjection.length - 1]?.value || 0 : 0;
  const difference = finalSelectedValue - finalCurrentValue;
  const differencePercentage = finalCurrentValue > 0 ? (difference / finalCurrentValue) * 100 : 0;
  
  const selectedAssetData = assets.find(a => a.id === selectedAsset);
  const initialValue = selectedAsset === 'portfolio' ? totalValue : selectedAssetData?.currentValue || 0;
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('portfolioProjection')}</h3>
          <p className="text-sm text-gray-600">
            {selectedAsset === 'portfolio' ? 
              t('portfolioGrowthDescription') : 
              `Proiezione di crescita per: ${selectedAssetData?.name}`
            }
          </p>
        </div>
      </div>

      {/* Asset Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('selectAssetToAnalyze')}
        </label>
        <div className="relative">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="portfolio">{t('entirePortfolio')}</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({t(asset.type)}) - {formatCurrency(asset.currentValue, currency)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      {/* Time Horizon Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Orizzonte Temporale: {timeHorizon} {t('years')}
          </label>
          <div className="text-xs text-gray-500">
            1 - 100 anni
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="100"
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(timeHorizon - 1) / 99 * 100}%, #e5e7eb ${(timeHorizon - 1) / 99 * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line
              type="monotone"
              dataKey="current"
              stroke={selectedAsset === 'portfolio' ? "#6b7280" : (ASSET_COLORS[selectedAssetData?.type || 'other'] || '#6b7280')}
              strokeWidth={2}
              strokeDasharray={selectedAsset === 'portfolio' ? "5 5" : "0"}
              dot={false}
              name={selectedAsset === 'portfolio' ? currentStrategy.name : selectedAssetData?.name}
            />
            
            {selectedStrategy && selectedAsset === 'portfolio' && (
              <Line
                type="monotone"
                dataKey="selected"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name={selectedStrategy.name}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card">
          <p className="text-sm text-gray-600">{t('currentValue')}</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(initialValue, currency)}
          </p>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-600">
            {selectedAsset === 'portfolio' ? currentStrategy.name : selectedAssetData?.name}
          </p>
          <p className="text-lg font-bold" style={{ 
            color: selectedAsset === 'portfolio' ? '#6b7280' : (ASSET_COLORS[selectedAssetData?.type || 'other'] || '#6b7280')
          }}>
            {formatCurrency(finalCurrentValue, currency)}
          </p>
        </div>
        
        {selectedStrategy && selectedAsset === 'portfolio' && (
          <div className="metric-card">
            <p className="text-sm text-gray-600">{selectedStrategy.name}</p>
            <p className="text-lg font-bold text-primary-600">
              {formatCurrency(finalSelectedValue, currency)}
            </p>
            {difference !== 0 && (
              <p className={`text-sm font-medium ${difference > 0 ? 'text-success-600' : 'text-error-600'}`}>
                {difference > 0 ? '+' : ''}{formatCurrency(difference, currency)} ({differencePercentage > 0 ? '+' : ''}{differencePercentage.toFixed(1)}%)
              </p>
            )}
          </div>
        )}
        
        {selectedAsset !== 'portfolio' && selectedAssetData && (
          <div className="metric-card">
            <p className="text-sm text-gray-600">{t('assetDetails')}</p>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                {t('expectedReturn')}: <span className="font-semibold text-success-600">{selectedAssetData.expectedReturn}%</span>
              </p>
              <p className="text-sm text-gray-700">
                {t('riskLevel')}: <span className="font-semibold">{t(selectedAssetData.riskLevel)}</span>
              </p>
              {selectedAssetData.isPAC && (
                <p className="text-sm text-primary-600">
                  PAC: {formatCurrency(selectedAssetData.pacAmount || 0, currency)}/{t(selectedAssetData.pacFrequency || 'monthly')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};