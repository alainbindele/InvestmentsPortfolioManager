import React, { useState, useEffect } from 'react';
import { Sliders, Check, X, Copy, TrendingUp, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { Asset, Strategy } from '../types/portfolio';
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
    
    const newStrategy: Strategy = {
      ...strategy,
      id: `edited-${strategy.id}-${Date.now()}`,
      name: strategy.name.includes(t('currentStrategyName')) ? t('modifiedStrategy') : `${strategy.name} (${t('modified')})`,
      description: strategy.name.includes(t('currentStrategyName')) ? t('modifiedStrategyDescription') : `${t('modifiedStrategyPrefix')} ${strategy.name}`,
      targetAllocations: { ...allocations },
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Sliders className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('editAllocation')}
            </h3>
            <p className="text-sm text-gray-600">
              {strategy.name}
            </p>
          </div>
        </div>
        
        {/* Total Allocation and Lock Status */}
        <div className="flex items-center gap-3">
          {lockedAssets.size > 0 && (
            <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">
                  {lockedAssets.size} bloccati ({totalLocked.toFixed(1)}%)
                </span>
              </div>
            </div>
          )}
          <div className={`px-3 py-2 rounded-lg font-medium ${
            isValid 
              ? 'bg-success-100 text-success-700' 
              : 'bg-error-100 text-error-700'
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
          <h4 className="font-semibold text-gray-900">{t('adjustAllocations')}</h4>
          {lockedAssets.size > 0 && (
            <button
              onClick={() => setLockedAssets(new Set())}
              className="text-sm text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
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
              <div key={asset.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: asset.type === 'stocks' ? '#3B82F6' : 
                                                asset.type === 'bonds' ? '#10B981' :
                                                asset.type === 'etf' ? '#8B5CF6' :
                                                asset.type === 'crypto' ? '#F59E0B' :
                                                asset.type === 'real_estate' ? '#EF4444' :
                                                asset.type === 'cash' ? '#6B7280' :
                                                asset.type === 'commodities' ? '#F97316' : '#84CC16' }}
                    />
                    <span className="font-medium text-gray-900">{asset.name}</span>
                    <button
                      onClick={() => toggleAssetLock(asset.id)}
                      className={`p-1 rounded transition-colors ${
                        isLocked 
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                      }`}
                      title={isLocked ? 'Sblocca asset' : 'Blocca asset'}
                    >
                      {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${isLocked ? 'text-blue-600' : 'text-gray-900'}`}>
                      {allocation.toFixed(1)}%
                      {isLocked && <span className="ml-1 text-xs">🔒</span>}
                    </div>
                    <div className="text-xs text-gray-500">
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
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${
                      isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    disabled={isLocked}
                    style={{
                      background: `linear-gradient(to right, ${
                        asset.type === 'stocks' ? '#3B82F6' : 
                        asset.type === 'bonds' ? '#10B981' :
                        asset.type === 'etf' ? '#8B5CF6' :
                        asset.type === 'crypto' ? '#F59E0B' :
                        asset.type === 'real_estate' ? '#EF4444' :
                        asset.type === 'cash' ? '#6B7280' :
                        asset.type === 'commodities' ? '#F97316' : '#84CC16'
                      } 0%, ${isLocked ? '#94a3b8' : 
                        asset.type === 'stocks' ? '#3B82F6' : 
                        asset.type === 'bonds' ? '#10B981' :
                        asset.type === 'etf' ? '#8B5CF6' :
                        asset.type === 'crypto' ? '#F59E0B' :
                        asset.type === 'real_estate' ? '#EF4444' :
                        asset.type === 'cash' ? '#6B7280' :
                        asset.type === 'commodities' ? '#F97316' : '#84CC16'
                      } ${(allocation / availableMargin) * 100}%, #e5e7eb ${(allocation / availableMargin) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{(availableMargin / 2).toFixed(0)}%</span>
                    <span>{availableMargin.toFixed(0)}%</span>
                  </div>
                  {availableMargin < 100 && !isLocked && (
                    <div className="text-xs text-warning-600 mt-1">
                      ⚠️ Margine limitato: max {availableMargin.toFixed(1)}%
                    </div>
                  )}
                </div>
                
                {/* Manual input */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={allocation.toFixed(1)}
                    onChange={(e) => handleAllocationChange(asset.id, parseFloat(e.target.value) || 0)}
                    className={`w-20 px-2 py-1 border rounded text-sm text-center ${
                      isLocked 
                        ? 'border-blue-300 bg-blue-50 text-blue-600 cursor-not-allowed' 
                        : 'border-gray-300 bg-white'
                    }`}
                    min="0"
                    max={availableMargin}
                    step="0.1"
                    disabled={isLocked}
                  />
                  <span className="text-sm text-gray-500">%</span>
                  <span className="text-sm text-gray-600 ml-2">
                    = {formatCurrency(monetaryValue, currency)}
                  </span>
                  {/* Quick allocation buttons */}
                  <div className={`flex gap-1 ml-2 ${isLocked ? 'opacity-50' : ''}`}>
                    <button
                      type="button"
                      onClick={() => handleAllocationChange(asset.id, 0)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        isLocked 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
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
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        isLocked 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-primary-100 hover:bg-primary-200 text-primary-600'
                      }`}
                      title={t('usaRimanente')}
                      disabled={isLocked}
                    >
                      {t('max')}
                    </button>
                  </div>
                </div>
                
                {isLocked && (
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    🔒 Asset bloccato - l'allocazione non cambierà automaticamente
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Total Validation */}
        <div className={`mt-4 p-3 rounded-lg border ${
          isValid 
            ? 'bg-success-50 border-success-200' 
            : 'bg-error-50 border-error-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">
              {t('totalAllocation')}:
            </span>
            <span className={`font-bold ${
              isValid ? 'text-success-700' : 'text-error-700'
            }`}>
              {totalAllocation.toFixed(1)}%
            </span>
          </div>
          {lockedAssets.size > 0 && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-blue-600">
                Asset bloccati:
              </span>
              <span className="text-sm font-medium text-blue-700">
                {totalLocked.toFixed(1)}%
              </span>
            </div>
          )}
          {!isValid && (
            <p className="text-sm text-error-600 mt-1">
              {totalAllocation > 100 
                ? t('allocationTooHigh') 
                : `${t('allocationTooLow')} Mancano ${(100 - totalAllocation).toFixed(1)}% da distribuire.`
              }
            </p>
          )}
          {isValid && (
            <p className="text-sm text-success-600 mt-1">
              ✓ Allocazione perfettamente bilanciata al 100%
            </p>
          )}
          {lockedAssets.size > 0 && (
            <p className="text-xs text-blue-600 mt-1">
              💡 Suggerimento: Gli asset bloccati mantengono la loro allocazione fissa durante le modifiche
            </p>
          )}
        </div>
      </div>

      {/* Live Projection Preview */}
      <div key={projectionKey} className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-success-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
          <h4 className="font-semibold text-gray-900">{t('liveProjection')}</h4>
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
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isValid
              ? 'bg-success-600 hover:bg-success-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          {t('saveAllocation')}
        </button>
      </div>
    </div>
  );
};