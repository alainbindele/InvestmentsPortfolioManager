import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Strategy, Asset } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';
import { formatPercentage, formatCurrency } from '../utils/calculations';
import { ASSET_COLORS } from '../types/portfolio';
import { CHART, COLOR_PICKER_PALETTE } from '../theme/chartTheme';
import { getTranslation } from '../utils/translations';
import { saveColorSchemes, loadColorSchemes } from '../utils/storage';
import { Target, TrendingUp, Shield, Zap, Bot, Copy, Check, Pencil, X, Trash2, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

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
  const [customColors, setCustomColors] = useState<{ [assetId: string]: string }>({});
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  
  // Load color schemes on component mount
  useEffect(() => {
    const savedColorSchemes = loadColorSchemes();
    setCustomColors(savedColorSchemes);
  }, []);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  
  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get color for asset (custom or default)
  const getAssetColor = (assetId: string, assetType: string): string => {
    return customColors[assetId] || ASSET_COLORS[assetType as keyof typeof ASSET_COLORS] || CHART.fallback;
  };

  // Handle color change
  const handleColorChange = (assetId: string, color: string) => {
    setCustomColors(prev => ({
      ...prev,
      [assetId]: color
    }));
    
    // Save to cookies immediately
    const newColorSchemes = {
      ...customColors,
      [assetId]: color
    };
    saveColorSchemes(newColorSchemes);
  };

  // Predefined color palette
  const colorPalette = COLOR_PICKER_PALETTE;

  // Prepare pie chart data
  const pieChartData = Object.entries(strategy.targetAllocations)
    .map(([assetId, allocation]) => {
      const asset = assets.find(a => a.id === assetId);
      if (!asset || allocation === 0) return null;
      
      return {
        name: asset.name,
        value: allocation,
        color: getAssetColor(assetId, asset.type)
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
        <div className="glass-popover p-3 max-w-xs transform -translate-y-full -mt-2">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <p className="font-medium text-ink">{asset.name}</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-ink-muted">
              <span className="font-medium">{t('type')}:</span> {t(asset.type)}
            </p>
            <p className="text-ink-muted">
              <span className="font-medium">{t('allocation')}:</span> {data.value.toFixed(1)}%
            </p>
            <p className="text-ink-muted">
              <span className="font-medium">{t('value')}:</span> {formatCurrency(monetaryValue, currency)}
            </p>
            <p className="text-ink-muted">
              <span className="font-medium">{t('expectedReturn')}:</span> {formatPercentage(asset.expectedReturn)}
            </p>
            <p className="text-ink-muted">
              <span className="font-medium">{t('riskLevel')}:</span> {t(asset.riskLevel)}
            </p>
            {asset.isPAC && (
              <p className="text-accent-300 text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> PAC: {formatCurrency(asset.pacAmount || 0, currency)}/{t(asset.pacFrequency || 'monthly')}
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
    <div className="relative hover:z-20 focus-within:z-20">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 glass-modal !rounded-2xl flex items-center justify-center z-10 !border-error-400/40 animate-fade-in">
          <div className="text-center p-4">
            <div className="flex justify-center mb-3">
              <span className="icon-tile icon-tile-error w-12 h-12">
                <AlertTriangle className="w-6 h-6" />
              </span>
            </div>
            <h4 className="font-semibold text-ink mb-2">{t('confirmDeleteStrategy')}</h4>
            <p className="text-sm text-ink-muted mb-4">{t('deleteStrategyWarning')}</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(false);
                }}
                className="btn-secondary !text-sm !py-1.5"
              >
                {t('cancel')}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="btn-danger !py-1.5"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={strategy.isAIGenerated ? onSelect : undefined}
        className={`card h-full transition-all duration-300 ${
          showSelectionCheckbox || strategy.isAIGenerated ? 'cursor-pointer hover:-translate-y-0.5 hover:border-primary-400/30' : ''
        } ${
          isSelected
            ? '!border-primary-400/60 ring-1 ring-primary-400/40 shadow-glow bg-primary-500/[0.08]'
            : isCurrentStrategy
            ? 'border-line-strong'
            : ''
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
                  className="w-4 h-4 rounded cursor-pointer"
                />
              </div>
            )}
            <span className={`icon-tile ${
              colorClass === 'primary' ? 'icon-tile-primary' :
              colorClass === 'success' ? 'icon-tile-success' :
              colorClass === 'warning' ? 'icon-tile-warning' : 'icon-tile-neutral'
            }`}>
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                {!isEditingName ? (
                  <>
                    <h3 className="font-semibold text-ink">{strategy.name}</h3>
                    {onUpdateName && !isCurrentStrategy && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNameEdit();
                          }}
                          className="btn-icon !w-6 !h-6 hover:!text-primary-300"
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
                            className="btn-icon !w-6 !h-6 hover:!text-error-400"
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
                      className="input-field !py-1 !px-2 !text-sm font-semibold flex-1"
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
                      className="btn-icon !w-6 !h-6 !text-success-400 hover:!text-success-300"
                      title={t('save')}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNameCancel();
                      }}
                      className="btn-icon !w-6 !h-6 hover:!text-error-400"
                      title={t('cancel')}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-ink-muted">{strategy.description}</p>
            </div>
          </div>
          
          {isSelected && (
            <div className="px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-accent-500 shadow-glow whitespace-nowrap">
              {showSelectionCheckbox ? t('selectedForComparison') : t('selectedStrategy')}
            </div>
          )}
          
          {strategy.isAIGenerated && !isSelected && (
            <div className="badge badge-accent">
              AI
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="metric-card text-center">
            <p className="eyebrow">{t('expectedReturn')}</p>
            <p className="mt-1 text-lg font-semibold text-success-400 num">
              {formatPercentage(strategy.expectedReturn)}
            </p>
          </div>
          
          <div className="metric-card text-center">
            <p className="eyebrow">{t('riskScore')}</p>
            <p className={`mt-1 text-lg font-semibold num ${
              strategy.riskScore < 2 ? 'text-success-400' :
              strategy.riskScore < 3 ? 'text-warning-400' : 'text-error-400'
            }`}>
              {strategy.riskScore.toFixed(1)}/5
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center gap-1">
              <p className="eyebrow">Sharpe Ratio</p>
              <div className="relative group">
                <Info className="w-3.5 h-3.5 text-primary-300 cursor-help" />
                <div className="glass-popover absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 sm:w-80 text-ink-soft text-xs text-left p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                  <div className="space-y-2">
                    <p><strong>{t('sharpeRatioTitle')}:</strong> {t('sharpeRatioDescription')}</p>
                    <div className="space-y-1">
                      <p><strong>{t('interpretation')}:</strong></p>
                      <p>• <strong>&gt; 1.0:</strong> {t('sharpeExcellent')}</p>
                      <p>• <strong>0.5 - 1.0:</strong> {t('sharpeGood')}</p>
                      <p>• <strong>0 - 0.5:</strong> {t('sharpeAcceptable')}</p>
                      <p>• <strong>&lt; 0:</strong> {t('sharpePoor')}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-line-strong">
                      <p className="text-warning-300"><strong>{t('example')}:</strong></p>
                      <p>{t('sharpeExample')}</p>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy-850"></div>
                </div>
              </div>
            </div>
            <p className="mt-1 text-base font-semibold text-primary-300 num">
              {strategy.sharpeRatio.toFixed(2)}
            </p>
          </div>
          
          <div className="metric-card text-center">
            <p className="eyebrow">{t('volatility')}</p>
            <p className="mt-1 text-base font-semibold text-warning-400 num">
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
                    innerRadius={34}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke={CHART.pieStroke}
                    strokeWidth={2}
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
            <p className="eyebrow">{t('allocationTarget')}</p>
            <div className="space-y-1">
              {Object.entries(strategy.targetAllocations).map(([assetId, allocation]) => {
                const asset = assets.find(a => a.id === assetId);
                if (!asset) return null;
                
                const monetaryValue = (allocation / 100) * totalValue;
                const assetColor = getAssetColor(assetId, asset.type);
                
                return (
                  <div key={assetId} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowColorPicker(showColorPicker === assetId ? null : assetId);
                          }}
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-offset-2 ring-offset-navy-900 hover:ring-2 hover:ring-white/40 transition-all cursor-pointer"
                          style={{ backgroundColor: assetColor }}
                          title="Cambia colore"
                        />
                        
                        {/* Color Picker Dropdown */}
                        {showColorPicker === assetId && (
                          <div 
                            ref={colorPickerRef}
                            className="glass-popover absolute top-full left-0 mt-2 p-3 z-50 animate-slide-up"
                            style={{ minWidth: '200px' }}
                          >
                            <div className="grid grid-cols-6 gap-2 mb-3">
                              {colorPalette.map((color) => (
                                <button
                                  key={color}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleColorChange(assetId, color);
                                    setShowColorPicker(null);
                                  }}
                                  className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
                                    assetColor === color ? 'border-white' : 'border-white/10'
                                  }`}
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                            
                            {/* Custom Color Input */}
                            <div className="border-t border-line pt-2">
                              <label className="block text-xs text-ink-muted mb-1">Colore personalizzato:</label>
                              <input
                                type="color"
                                value={assetColor}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleColorChange(assetId, e.target.value);
                                }}
                                className="w-full h-8 rounded-lg border border-line-strong bg-transparent cursor-pointer"
                              />
                            </div>
                            
                            {/* Reset Button */}
                            {customColors[assetId] && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCustomColors(prev => {
                                    const newColors = { ...prev };
                                    delete newColors[assetId];
                                    saveColorSchemes(newColors);
                                    return newColors;
                                  });
                                  setShowColorPicker(null);
                                }}
                                className="btn-secondary w-full mt-2 !text-xs !py-1.5"
                              >
                                Ripristina colore originale
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-ink-muted truncate">
                        {asset.name.length > 20 ? asset.name.substring(0, 20) + '...' : asset.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-ink num">{allocation.toFixed(3)}%</div>
                      <div className="text-xs text-ink-subtle">
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
            <div className="pt-2 mt-2 border-t border-line">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink-soft">{t('totalPortfolio')}</span>
                <span className="font-semibold text-ink num">
                  {formatCurrency(totalValue, currency)}
                </span>
              </div>
            </div>
          </div>
        )}

        {strategy.isAIGenerated && !isSelected && (
          <div className="mt-4 pt-3 border-t border-line">
            <p className="text-xs text-ink-subtle text-center">
              {showSelectionCheckbox ? 'Seleziona per confrontare' : 'Clicca per selezionare e vedere il confronto'}
            </p>
          </div>
        )}

        {isSelected && !showSelectionCheckbox && (
          <div className="mt-4 pt-3 border-t border-primary-400/30">
            <p className="text-xs text-primary-300 text-center font-medium flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('selectedForComparison')}
            </p>
          </div>
        )}

        {/* Clone & Edit Button */}
        {Object.keys(strategy.targetAllocations).length > 0 && onCloneAndEdit && (
          <div className="mt-4 pt-3 border-t border-line">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloneAndEdit();
              }}
              className="btn-secondary w-full !text-sm"
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