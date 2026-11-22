import React, { useState, useEffect } from 'react';
import { Sliders, Check, X, TrendingUp, AlertTriangle, Lock, Unlock, Lightbulb } from 'lucide-react';
import { Asset, Strategy, ASSET_COLORS } from '../types/portfolio';
import { CHART } from '../theme/chartTheme';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatCurrency, formatPercentage, projectPortfolioGrowth } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { ProjectionChart } from './ProjectionChart';

interface AllocationEditorProps {
  strategy: Strategy;
  assets: Asset[];
  currency: Currency;
  language: Language;
  onSaveAllocation: (newStrategy: Strategy) => void;
  onCancel: () => void;
}

export const AllocationEditor: React.FC<AllocationEditorProps> = ({
  strategy,
  assets,
  currency,
  language,
  onSaveAllocation,
  onCancel
}) => {
  const t = (key: string) => getTranslation(language, key);

  const [allocations, setAllocations] = useState<{ [assetId: string]: number }>({});
  const [lockedAssets, setLockedAssets] = useState<Set<string>>(new Set());
  const [isValid, setIsValid] = useState(true);
  const [projectionKey, setProjectionKey] = useState(0);

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  // Initialize allocations from strategy
  useEffect(() => {
    const initialAllocations: { [assetId: string]: number } = {};
    assets.forEach(asset => {
      initialAllocations[asset.id] = strategy.targetAllocations[asset.id] || 0;
    });
    setAllocations(initialAllocations);
    setProjectionKey(prev => prev + 1);
  }, [strategy, assets]);

  // Check if total allocation is valid (equals 100%)
  useEffect(() => {
    const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    setIsValid(Math.abs(total - 100) < 0.1);
    setProjectionKey(prev => prev + 1);
  }, [allocations]);

  const toggleAssetLock = (assetId: string) => {
    setLockedAssets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        newSet.add(assetId);
      }
      return newSet;
    });
  };
  const handleAllocationChange = (assetId: string, newValue: number) => {
    const oldValue = allocations[assetId] || 0;
    const difference = newValue - oldValue;

    const currentTotal = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const newTotal = currentTotal - oldValue + newValue;

    if (newTotal <= 100) {
      // If new total is 100% or less, just update this asset (don't touch others)
      setAllocations({ ...allocations, [assetId]: Math.max(0, newValue) });
    } else {
      // If new total would exceed 100%, we need to decrease unlocked assets proportionally
      const excess = newTotal - 100;
      const unlockableAssets = assets.filter(a => a.id !== assetId && !lockedAssets.has(a.id));
      const unlockableTotal = unlockableAssets.reduce((sum, asset) => sum + (allocations[asset.id] || 0), 0);

      if (unlockableTotal >= excess) {
        const newAllocations = { ...allocations };
        newAllocations[assetId] = newValue;

        // Distribute the excess decrease proportionally among unlocked assets
        unlockableAssets.forEach(asset => {
          const currentAllocation = allocations[asset.id] || 0;
          if (unlockableTotal > 0) {
            const proportion = currentAllocation / unlockableTotal;
            const decrease = excess * proportion;
            newAllocations[asset.id] = Math.max(0, currentAllocation - decrease);
          }
        });

        setAllocations(newAllocations);
      } else {
        // If unlocked assets can't provide enough, set this asset to maximum possible
        const lockedTotal = assets
          .filter(a => a.id !== assetId && lockedAssets.has(a.id))
          .reduce((sum, asset) => sum + (allocations[asset.id] || 0), 0);
        const maxPossible = 100 - lockedTotal - unlockableTotal;
        setAllocations({ ...allocations, [assetId]: Math.max(0, maxPossible) });
      }
    }
  };

  // Calculate available margin for each asset
  const getAvailableMargin = (assetId: string): number => {
    const currentAllocation = allocations[assetId] || 0;
    const currentTotal = Object.values(allocations).reduce((sum, val) => sum + val, 0);

    // Calculate how much locked assets are using
    const lockedTotal = assets
      .filter(a => a.id !== assetId && lockedAssets.has(a.id))
      .reduce((sum, asset) => sum + (allocations[asset.id] || 0), 0);

    // Calculate how much unlocked assets (excluding current) can give up
    const unlockableAssets = assets.filter(a => a.id !== assetId && !lockedAssets.has(a.id));
    const unlockableTotal = unlockableAssets.reduce((sum, asset) => sum + (allocations[asset.id] || 0), 0);

    // Maximum this asset can have is current allocation + what unlocked assets can give up
    const maxPossible = currentAllocation + unlockableTotal + (100 - currentTotal);

    return Math.min(100, maxPossible);
  };
  const handleSave = () => {
    if (!isValid) return;

    // Calculate new expected return based on allocations
    let newExpectedReturn = 0;
    Object.entries(allocations).forEach(([assetId, allocation]) => {
      const asset = assets.find(a => a.id === assetId);
      if (asset) {
        newExpectedReturn += (asset.expectedReturn * allocation / 100);
      }
    });

    const newStrategy: Strategy = {
      ...strategy,
      id: `edited-${strategy.id}-${Date.now()}`,
      name: strategy.name.includes(t('currentStrategyName')) ? t('modifiedStrategy') : `${strategy.name} (${t('modified')})`,
      description: strategy.name.includes(t('currentStrategyName')) ? t('modifiedStrategyDescription') : `${t('modifiedStrategyPrefix')} ${strategy.name}`,
      targetAllocations: { ...allocations },
      expectedReturn: Math.round(newExpectedReturn * 10) / 10, // Update expected return based on new allocations
      createdAt: new Date(),
      isAIGenerated: false
    };

    onSaveAllocation(newStrategy);
  };

  const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const totalLocked = assets
    .filter(asset => lockedAssets.has(asset.id))
    .reduce((sum, asset) => sum + (allocations[asset.id] || 0), 0);

  // Create a temporary strategy for projection
  const tempStrategy: Strategy = {
    ...strategy,
    targetAllocations: allocations
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="icon-tile icon-tile-primary">
            <Sliders className="w-5 h-5" />
          </span>
          <div>
            <h3 className="section-title">
              {t('editAllocation')}
            </h3>
            <p className="text-sm text-ink-muted">
              {strategy.name}
            </p>
          </div>
        </div>

        {/* Total Allocation and Lock Status */}
        <div className="flex items-center gap-3">
          {lockedAssets.size > 0 && (
            <div className="badge badge-primary !text-sm !px-3 !py-1.5">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">
                  {lockedAssets.size} bloccati ({totalLocked.toFixed(1)}%)
                </span>
              </div>
            </div>
          )}
          <div className={`badge !text-sm !px-3 !py-1.5 num ${
            isValid
              ? 'badge-success'
              : 'badge-error'
          }`}>
            <div className="flex items-center gap-2">
              {isValid ? (
                <Check className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <span className="text-sm">
                {totalAllocation.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Sliders */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="section-title">{t('adjustAllocations')}</h4>
          {lockedAssets.size > 0 && (
            <button
              onClick={() => setLockedAssets(new Set())}
              className="text-sm text-primary-300 hover:text-primary-200 underline underline-offset-4 flex items-center gap-1"
            >
              <Unlock className="w-3 h-3" />
              Sblocca tutti
            </button>
          )}
        </div>
        <div className="space-y-4">
          {assets.map((asset) => {
            const allocation = allocations[asset.id] || 0;
            const monetaryValue = (allocation / 100) * totalValue;
            const isLocked = lockedAssets.has(asset.id);
            const availableMargin = getAvailableMargin(asset.id);

            return (
              <div key={asset.id} className="space-y-3 panel-inset p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: ASSET_COLORS[asset.type], boxShadow: `0 0 10px ${ASSET_COLORS[asset.type]}66` }}
                    />
                    <span className="font-medium text-ink">{asset.name}</span>
                    <button
                      onClick={() => toggleAssetLock(asset.id)}
                      className={`btn-icon !w-7 !h-7 ${
                        isLocked
                          ? '!text-primary-300 bg-primary-500/15 hover:!bg-primary-500/25'
                          : ''
                      }`}
                      title={isLocked ? 'Sblocca asset' : 'Blocca asset'}
                    >
                      {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold num flex items-center justify-end gap-1 ${isLocked ? 'text-primary-300' : 'text-ink'}`}>
                      {allocation.toFixed(1)}%
                      {isLocked && <Lock className="w-3 h-3" />}
                    </div>
                    <div className="text-xs text-ink-subtle">
                      {formatCurrency(monetaryValue, currency)}
                    </div>
                  </div>
                </div>

                <div className={`relative ${isLocked ? 'opacity-60' : ''}`}>
                  <input
                    type="range"
                    min="0"
                    max={availableMargin}
                    value={allocation}
                    onChange={(e) => handleAllocationChange(asset.id, parseFloat(e.target.value))}
                    className={`w-full h-1.5 rounded-full appearance-none ${
                      isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    disabled={isLocked}
                    style={{
                      background: `linear-gradient(to right, ${
                        ASSET_COLORS[asset.type]
                      } 0%, ${isLocked ? CHART.lockedFill :
                        ASSET_COLORS[asset.type]
                      } ${(allocation / availableMargin) * 100}%, ${CHART.track} ${(allocation / availableMargin) * 100}%, ${CHART.track} 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-ink-subtle mt-1">
                    <span>0%</span>
                    <span>{(availableMargin / 2).toFixed(0)}%</span>
                    <span>{availableMargin.toFixed(0)}%</span>
                  </div>
                  {availableMargin < 100 && !isLocked && (
                    <div className="text-xs text-warning-300 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Margine limitato: max {availableMargin.toFixed(1)}%
                    </div>
                  )}
                </div>

                {/* Manual input */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={allocation.toFixed(1)}
                    onChange={(e) => handleAllocationChange(asset.id, parseFloat(e.target.value) || 0)}
                    className={`input-field !w-20 !px-2 !py-1 !text-sm text-center num ${
                      isLocked
                        ? '!border-primary-400/40 !bg-primary-500/10 !text-primary-300 cursor-not-allowed'
                        : ''
                    }`}
                    min="0"
                    max={availableMargin}
                    step="0.1"
                    disabled={isLocked}
                  />
                  <span className="text-sm text-ink-subtle">%</span>
                  <span className="text-sm text-ink-muted ml-2">
                    = {formatCurrency(monetaryValue, currency)}
                  </span>
                  {/* Quick allocation buttons */}
                  <div className={`flex gap-1 ml-2 ${isLocked ? 'opacity-50' : ''}`}>
                    <button
                      type="button"
                      onClick={() => handleAllocationChange(asset.id, 0)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        isLocked
                          ? 'bg-white/[0.06] text-ink-faint cursor-not-allowed'
                          : 'bg-white/[0.06] hover:bg-white/10 text-ink-soft'
                      }`}
                      title={t('azzera')}
                      disabled={isLocked}
                    >
                      0%
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleAllocationChange(asset.id, availableMargin);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        isLocked
                          ? 'bg-white/[0.06] text-ink-faint cursor-not-allowed'
                          : 'bg-primary-500/15 hover:bg-primary-500/25 text-primary-300'
                      }`}
                      title={t('usaRimanente')}
                      disabled={isLocked}
                    >
                      {t('max')}
                    </button>
                  </div>
                </div>

                {isLocked && (
                  <div className="text-xs text-primary-200 bg-primary-500/10 border border-primary-400/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Lock className="w-3 h-3 flex-shrink-0" /> Asset bloccato - l'allocazione non cambierà automaticamente
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Total Validation */}
        <div className={`mt-4 p-3 sm:p-4 rounded-xl border ${
          isValid
            ? 'bg-success-500/10 border-success-400/25'
            : 'bg-error-500/10 border-error-400/25'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-ink">
              {t('totalAllocation')}:
            </span>
            <span className={`font-semibold num ${
              isValid ? 'text-success-300' : 'text-error-300'
            }`}>
              {totalAllocation.toFixed(1)}%
            </span>
          </div>
          {lockedAssets.size > 0 && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-primary-400">
                Asset bloccati:
              </span>
              <span className="text-sm font-medium text-primary-300">
                {totalLocked.toFixed(1)}%
              </span>
            </div>
          )}
          {!isValid && (
            <p className="text-sm text-error-400 mt-1">
              {totalAllocation > 100
                ? t('allocationTooHigh')
                : `${t('allocationTooLow')} Mancano ${(100 - totalAllocation).toFixed(1)}% da distribuire.`
              }
            </p>
          )}
          {isValid && (
            <p className="text-sm text-success-300 mt-1 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Allocazione perfettamente bilanciata al 100%
            </p>
          )}
          {lockedAssets.size > 0 && (
            <p className="text-xs text-primary-300 mt-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" /> Suggerimento: Gli asset bloccati mantengono la loro allocazione fissa durante le modifiche
            </p>
          )}
        </div>
      </div>

      {/* Live Projection Preview */}
      <div key={projectionKey} className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="icon-tile icon-tile-success">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h4 className="section-title">{t('liveProjection')}</h4>
        </div>

        <ProjectionChart
          strategies={[{
            ...strategy,
            targetAllocations: allocations
          }]}
          assets={assets}
          currency={currency}
          language={language}
          showAssetSelection={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          <X className="w-4 h-4" />
          {t('cancel')}
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="btn-primary flex-1"
        >
          <Check className="w-4 h-4" />
          {t('saveAllocation')}
        </button>
      </div>
    </div>
  );
};