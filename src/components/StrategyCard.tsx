import React from 'react';
import { Strategy, Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatPercentage, formatCurrency } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { Target, TrendingUp, Shield, Zap, Bot, Copy, Edit } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  assets: Asset[];
  currency: Currency;
  isSelected: boolean;
  onSelect: () => void;
  onCloneAndEdit?: () => void;
  language: Language;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({
  strategy,
  assets,
  currency,
  isSelected,
  onSelect,
  onCloneAndEdit,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Calculate strategy metrics
  const getStrategyIcon = () => {
    if (strategy.isAIGenerated) return Bot;
    if (strategy.riskScore < 2) return Shield;
    if (strategy.riskScore > 3) return Zap;
    return Target;
  };

  const getStrategyColor = () => {
    if (strategy.isAIGenerated) return 'primary';
    if (strategy.riskScore < 2) return 'success';
    if (strategy.riskScore > 3) return 'warning';
    return 'gray';
  };

  const Icon = getStrategyIcon();
  const colorClass = getStrategyColor();

  const isCurrentStrategy = strategy.id === 'current-strategy';

  return (
    <div
      onClick={strategy.isAIGenerated ? onSelect : undefined}
      className={`card transition-all duration-200 ${
        strategy.isAIGenerated ? 'cursor-pointer hover:shadow-lg' : ''
      } ${
        isSelected
          ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
          : isCurrentStrategy
          ? 'bg-gray-50 border-gray-300'
          : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            colorClass === 'primary' ? 'bg-primary-100' :
            colorClass === 'success' ? 'bg-success-100' :
            colorClass === 'warning' ? 'bg-warning-100' : 'bg-gray-100'
          }`}>
            <Icon className={`w-5 h-5 ${
              colorClass === 'primary' ? 'text-primary-600' :
              colorClass === 'success' ? 'text-success-600' :
              colorClass === 'warning' ? 'text-warning-600' : 'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
            <p className="text-sm text-gray-600">{strategy.description}</p>
          </div>
        </div>
        
        {isSelected && (
          <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
            {t('selectedStrategy')}
          </div>
        )}
        
        {strategy.isAIGenerated && !isSelected && (
          <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
            AI
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
          <p className="text-lg font-bold text-success-600">
            {formatPercentage(strategy.expectedReturn)}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">{t('riskScore')}</p>
          <p className={`text-lg font-bold ${
            strategy.riskScore < 2 ? 'text-success-600' :
            strategy.riskScore < 3 ? 'text-warning-600' : 'text-error-600'
          }`}>
            {strategy.riskScore.toFixed(1)}/5
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Sharpe Ratio</p>
          <p className="text-sm font-semibold text-primary-600">
            {strategy.sharpeRatio.toFixed(2)}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">{t('volatility')}</p>
          <p className="text-sm font-semibold text-warning-600">
            {formatPercentage(strategy.volatility)}
          </p>
        </div>
      </div>

      {/* Asset Allocations */}
      {Object.keys(strategy.targetAllocations).length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Allocazione Target:</p>
          <div className="space-y-1">
            {Object.entries(strategy.targetAllocations).map(([assetId, allocation]) => {
              const asset = assets.find(a => a.id === assetId);
              if (!asset) return null;
              
              const monetaryValue = (allocation / 100) * totalValue;
              
              return (
                <div key={assetId} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate flex-1 mr-2">
                    {asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name}
                  </span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{allocation}%</div>
                    <div className="text-xs text-gray-500">
                      {new Intl.NumberFormat('it-IT', {
                        style: 'currency',
                        currency: currency,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(monetaryValue)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Portfolio Total */}
          <div className="pt-2 mt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Totale Portfolio:</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(totalValue, currency)}
              </span>
            </div>
          </div>
        </div>
      )}

      {strategy.isAIGenerated && !isSelected && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Clicca per selezionare e vedere il confronto
          </p>
        </div>
      )}

      {isSelected && (
        <div className="mt-4 pt-3 border-t border-primary-200">
          <p className="text-xs text-primary-600 text-center font-medium">
            ✓ Strategia selezionata per il confronto
          </p>
        </div>
      )}

      {/* Clone & Edit Button */}
      {Object.keys(strategy.targetAllocations).length > 0 && onCloneAndEdit && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloneAndEdit();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            {t('cloneAndEdit')}
          </button>
        </div>
      )}
    </div>
  );
};