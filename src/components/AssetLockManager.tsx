import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Asset, ASSET_COLORS } from '../types/portfolio';
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
        <span className="icon-tile icon-tile-primary">
          <Lock className="w-5 h-5" />
        </span>
        <div>
          <h3 className="section-title">{t('assetLockManager')}</h3>
          <p className="text-sm text-ink-muted">{t('assetLockDescription')}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-primary-500/10 border border-primary-400/25 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-primary-400" />
            <span className="font-medium text-primary-200">{t('lockedAssets')}</span>
          </div>
          <p className="text-lg font-bold text-primary-300">
            {lockedAssets.length} / {assets.length}
          </p>
          <p className="text-sm text-primary-400">
            {formatCurrency(lockedValue, currency)} ({lockedPercentage.toFixed(1)}%)
          </p>
        </div>

        <div className="bg-success-500/10 border border-success-400/25 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Unlock className="w-4 h-4 text-success-400" />
            <span className="font-medium text-success-200">{t('unlockedAssets')}</span>
          </div>
          <p className="text-lg font-bold text-success-300">
            {unlockedAssets.length} / {assets.length}
          </p>
          <p className="text-sm text-success-400">
            {formatCurrency(unlockedValue, currency)} ({unlockedPercentage.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Asset List with Lock Controls */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-ink">{t('assetLockControls')}</h4>
        {assets.map((asset) => {
          const allocation = totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0;

          return (
            <div
              key={asset.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                asset.isLocked
                  ? 'bg-primary-500/10 border-primary-400/25'
                  : 'bg-white/[0.03] border-line hover:bg-white/[0.08]'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: ASSET_COLORS[asset.type] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{asset.name}</p>
                  <p className="text-sm text-ink-muted">
                    {formatCurrency(asset.currentValue, currency)} ({allocation.toFixed(1)}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {asset.isLocked && (
                  <div className="px-2 py-1 bg-primary-500/15 text-primary-300 rounded text-xs font-medium">
                    {t('locked')}
                  </div>
                )}
                <button
                  onClick={() => onToggleAssetLock(asset.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    asset.isLocked
                      ? 'bg-primary-500/15 text-primary-400 hover:bg-primary-500/25'
                      : 'bg-white/[0.06] text-ink-muted hover:bg-white/10'
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