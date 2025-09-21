import React from 'react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Strategy, Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatPercentage, formatCurrency } from '../utils/calculations';
import { ASSET_COLORS } from '../types/portfolio';
import { getTranslation } from '../utils/translations';
import { Target, TrendingUp, Shield, Zap, Bot, Copy, Edit, Check, Pencil, X, Trash2, AlertTriangle } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  assets: Asset[];
  currency: Currency;
  isSelected: boolean;
  onSelect: () => void;
  onCloneAndEdit?: () => void;
  onUpdateName?: (strategyId: string, newName: string) => void;
  onDelete?: (strategyId: string) => void;
  language: Language;
  showSelectionCheckbox?: boolean;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({
  strategy,
  assets,
  currency,
  isSelected,
  onSelect,
  onCloneAndEdit,
  onUpdateName,
  onDelete,
  language,
  showSelectionCheckbox = false
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(strategy.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Prepare pie chart data
  const pieChartData = Object.entries(strategy.targetAllocations)
    .map(([assetId, allocation]) => {
      const asset = assets.find(a => a.id === assetId);
      if (!asset || allocation === 0) return null;
      
      return {
        name: asset.name,
        value: allocation,
        color: ASSET_COLORS[asset.type] || '#6b7280'
      };
    })
    .filter(Boolean) as Array<{ name: string; value: number; color: string }>;

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

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const asset = assets.find(a => a.name === data.name);
      
      if (!asset) return null;
      
      const monetaryValue = (data.value / 100) * totalValue;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <p className="font-medium text-gray-900">{asset.name}</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">{t('type')}:</span> {t(asset.type)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">{t('allocation')}:</span> {data.value.toFixed(1)}%
            </p>
            <p className="text-gray-600">
              <span className="font-medium">{t('value')}:</span> {formatCurrency(monetaryValue, currency)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">{t('expectedReturn')}:</span> {formatPercentage(asset.expectedReturn)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">{t('riskLevel')}:</span> {t(asset.riskLevel)}
            </p>
            {asset.isPAC && (
              <p className="text-blue-600 text-xs font-medium">
                📈 PAC: {formatCurrency(asset.pacAmount || 0, currency)}/{t(asset.pacFrequency || 'monthly')}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setEditedName(strategy.name);
  };

  const handleNameSave = () => {
    if (editedName.trim() && editedName !== strategy.name && onUpdateName) {
      onUpdateName(strategy.id, editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(strategy.name);
    setIsEditingName(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(strategy.id);
      setShowDeleteConfirm(false);
    }
  };
  return (
    <div className="relative">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex items-center justify-center z-10 border-2 border-red-200">
          <div className="text-center p-4">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('confirmDeleteStrategy')}</h4>
            <p className="text-sm text-gray-600 mb-4">{t('deleteStrategyWarning')}</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(false);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={strategy.isAIGenerated ? onSelect : undefined}
        className={`card transition-all duration-200 ${
          showSelectionCheckbox || strategy.isAIGenerated ? 'cursor-pointer hover:shadow-lg' : ''
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
            {showSelectionCheckbox && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={onSelect}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>
            )}
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
              <div className="flex items-center gap-2">
                {!isEditingName ? (
                  <>
                    <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
                    {onUpdateName && !isCurrentStrategy && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNameEdit();
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title={t('editName')}
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        {onDelete && !isCurrentStrategy && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(true);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title={t('deleteStrategy')}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNameSave();
                        if (e.key === 'Escape') handleNameCancel();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNameSave();
                      }}
                      className="p-1 text-green-600 hover:text-green-700 transition-colors"
                      title={t('save')}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNameCancel();
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title={t('cancel')}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{strategy.description}</p>
            </div>
          </div>
          
          {isSelected && (
            <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
              {showSelectionCheckbox ? t('selectedForComparison') : t('selectedStrategy')}
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
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="text-sm text-gray-600">Sharpe Ratio</p>
              <div className="relative group">
                <div className="w-3 h-3 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold cursor-help">
                  i
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                  <div className="space-y-2">
                    <p><strong>{t('sharpeRatioTitle')}:</strong> {t('sharpeRatioDescription')}</p>
                    <div className="space-y-1">
                      <p><strong>{t('interpretation')}:</strong></p>
                      <p>• <strong>&gt; 1.0:</strong> {t('sharpeExcellent')}</p>
                      <p>• <strong>0.5 - 1.0:</strong> {t('sharpeGood')}</p>
                      <p>• <strong>0 - 0.5:</strong> {t('sharpeAcceptable')}</p>
                      <p>• <strong>&lt; 0:</strong> {t('sharpePoor')}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-600">
                      <p className="text-yellow-300"><strong>{t('example')}:</strong></p>
                      <p>{t('sharpeExample')}</p>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
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

        {/* Pie Chart */}
        {pieChartData.length > 0 && (
          <div className="mb-4">
            <div className="h-32 w-32 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Asset Allocations */}
        {Object.keys(strategy.targetAllocations).length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{t('allocationTarget')}</p>
            <div className="space-y-1">
              {Object.entries(strategy.targetAllocations).map(([assetId, allocation]) => {
                const asset = assets.find(a => a.id === assetId);
                if (!asset) return null;
                
                const monetaryValue = (allocation / 100) * totalValue;
                
                return (
                  <div key={assetId} className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2 flex-1 mr-2">
                     <div 
                       className="w-2 h-2 rounded-full flex-shrink-0" 
                       style={{ backgroundColor: ASSET_COLORS[asset.type] || '#6b7280' }}
                     />
                     <span className="text-gray-600 truncate">
                      {asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name}
                    </span>
                   </div>
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
                <span className="font-medium text-gray-700">{t('totalPortfolio')}</span>
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
              {showSelectionCheckbox ? 'Seleziona per confrontare' : 'Clicca per selezionare e vedere il confronto'}
            </p>
          </div>
        )}

        {isSelected && !showSelectionCheckbox && (
          <div className="mt-4 pt-3 border-t border-primary-200">
            <p className="text-xs text-primary-600 text-center font-medium">
              ✓ {t('selectedForComparison')}
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
    </div>
  );
};