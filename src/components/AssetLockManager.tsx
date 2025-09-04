import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface AssetLockManagerProps {
  assets: Asset[];
  onToggleAssetLock: (assetId: string) => void;
  language: Language;
  currency: Currency;
}

export const AssetLockManager: React.FC<AssetLockManagerProps> = ({
  assets,
  onToggleAssetLock,
  language,
  currency
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const lockedAssets = assets.filter(asset => asset.isLocked);
  const unlockedAssets = assets.filter(asset => !asset.isLocked);
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const lockedValue = lockedAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const unlockedValue = unlockedAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  const lockedPercentage = totalValue > 0 ? (lockedValue / totalValue) * 100 : 0;
  const unlockedPercentage = totalValue > 0 ? (unlockedValue / totalValue) * 100 : 0;

  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('assetLockManager')}</h3>
          <p className="text-sm text-gray-600">{t('assetLockDescription')}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">{t('lockedAssets')}</span>
          </div>
          <p className="text-lg font-bold text-blue-700">
            {lockedAssets.length} / {assets.length}
          </p>
          <p className="text-sm text-blue-600">
            {formatCurrency(lockedValue, currency)} ({lockedPercentage.toFixed(1)}%)
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Unlock className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-900">{t('unlockedAssets')}</span>
          </div>
          <p className="text-lg font-bold text-green-700">
            {unlockedAssets.length} / {assets.length}
          </p>
          <p className="text-sm text-green-600">
            {formatCurrency(unlockedValue, currency)} ({unlockedPercentage.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Asset List with Lock Controls */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900">{t('assetLockControls')}</h4>
        {assets.map((asset) => {
          const allocation = totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0;
          
          return (
            <div
              key={asset.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                asset.isLocked
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: asset.type === 'stocks' ? '#3B82F6' : 
                                            asset.type === 'bonds' ? '#10B981' :
                                            asset.type === 'etf' ? '#8B5CF6' :
                                            asset.type === 'crypto' ? '#F59E0B' :
                                            asset.type === 'real_estate' ? '#EF4444' :
                                            asset.type === 'cash' ? '#6B7280' :
                                            asset.type === 'commodities' ? '#F97316' : '#84CC16' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{asset.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(asset.currentValue, currency)} ({allocation.toFixed(1)}%)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {asset.isLocked && (
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {t('locked')}
                  </div>
                )}
                <button
                  onClick={() => onToggleAssetLock(asset.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    asset.isLocked
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={asset.isLocked ? t('unlockAsset') : t('lockAsset')}
                >
                  {asset.isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Rebalance Button */}
    </div>
  );
};