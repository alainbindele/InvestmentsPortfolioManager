import React, { useState } from 'react';
import { Plus, X, Edit } from 'lucide-react';
import { Asset, AssetType, RiskLevel, ASSET_TYPE_LABELS, RISK_LEVEL_LABELS } from '../types/portfolio';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';

interface AssetFormProps {
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
  onUpdateAsset?: (asset: Omit<Asset, 'id'>) => void;
  onCancelEdit?: () => void;
  editingAsset?: Asset | null;
  language: Language;
}

export const AssetForm: React.FC<AssetFormProps> = ({ 
  onAddAsset, 
  onUpdateAsset, 
  onCancelEdit, 
  editingAsset, 
  language 
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const [isOpen, setIsOpen] = useState(true);
  
  // Initialize form with editing asset data if provided
  const initializeFormData = (asset?: Asset | null) => ({
    name: asset?.name || '',
    type: asset?.type || 'stocks' as AssetType,
    currentValue: asset?.currentValue?.toString() || '',
    expectedReturn: asset?.expectedReturn?.toString() || '',
    rateType: asset?.rateType || 'effective' as 'nominal' | 'effective',
    riskLevel: asset?.riskLevel || 'medium' as RiskLevel,
    pacAmount: asset?.pacAmount?.toString() || '',
    pacFrequency: asset?.pacFrequency || 'monthly' as 'monthly' | 'quarterly' | 'yearly',
  });
  
  const [formData, setFormData] = useState({
    ...initializeFormData()
  });
  const [isPACEnabled, setIsPACEnabled] = useState(false);

  // Update form when editingAsset changes
  React.useEffect(() => {
    if (editingAsset) {
      setFormData(initializeFormData(editingAsset));
      setIsPACEnabled(!!editingAsset.isPAC);
      setIsOpen(true);
    } else {
      setFormData(initializeFormData());
      setIsPACEnabled(false);
    }
  }, [editingAsset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.currentValue || !formData.expectedReturn) {
      alert(t('fillAllRequiredFields'));
      return;
    }

    const asset: Omit<Asset, 'id'> = {
      name: formData.name,
      type: formData.type,
      currentValue: parseFloat(formData.currentValue),
      expectedReturn: parseFloat(formData.expectedReturn),
      rateType: formData.rateType,
      riskLevel: formData.riskLevel,
      isPAC: isPACEnabled,
      pacAmount: isPACEnabled ? parseFloat(formData.pacAmount || '0') : undefined,
      pacFrequency: isPACEnabled ? (formData.pacFrequency as 'monthly' | 'quarterly' | 'yearly') : undefined,
    };

    if (editingAsset && onUpdateAsset) {
      onUpdateAsset(asset);
    } else {
      onAddAsset(asset);
    }
    
    // Reset form
    setFormData(initializeFormData());
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (editingAsset && onCancelEdit) {
      onCancelEdit();
    }
    setFormData(initializeFormData());
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary w-full"
        disabled={!!editingAsset}
      >
        <Plus className="w-4 h-4" />
        {t('addAsset')}
      </button>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="icon-tile icon-tile-primary">
            {editingAsset ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </span>
          <h3 className="section-title">
            {editingAsset ? t('editAsset') : t('addAsset')}
          </h3>
        </div>
        <button
          onClick={handleCancel}
          className="btn-icon"
          aria-label={t('cancel')}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="field-label">
            {t('assetName')} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
            placeholder="es. VWCE ETF"
            required
          />
        </div>

        <div>
          <label className="field-label">
            {t('assetType')}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as AssetType })}
            className="select-field"
          >
            {Object.entries(ASSET_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {t(key) || label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label">
            Valore attualmente investito (€) *
          </label>
          <input
            type="number"
            value={formData.currentValue}
            onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
            className="input-field"
            placeholder="10000"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="field-label">
            {t('expectedReturnLabel')} *
          </label>
          <input
            type="number"
            value={formData.expectedReturn}
            onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
            className="input-field"
            placeholder="7.5"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="field-label">
            {t('riskLevel')}
          </label>
          <select
            value={formData.riskLevel}
            onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as RiskLevel })}
            className="select-field"
          >
            {Object.entries(RISK_LEVEL_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {t(key) || label}
              </option>
            ))}
          </select>
        </div>

        </div>

        {/* PAC Toggle */}
        <div className="border-t border-line pt-4">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="pac-enabled"
              checked={isPACEnabled}
              onChange={(e) => setIsPACEnabled(e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="pac-enabled" className="text-sm font-medium text-ink-soft cursor-pointer">
              {t('enablePAC')} ({t('pacFullName')})
            </label>
          </div>
          
          {isPACEnabled && (
            <div className="space-y-4 rounded-xl p-4 bg-primary-500/[0.07] border border-primary-400/20 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label">
                    {t('pacAmount')} (€) *
                  </label>
                  <input
                    type="number"
                    value={formData.pacAmount || ''}
                    onChange={(e) => setFormData({ ...formData, pacAmount: e.target.value })}
                    className="input-field"
                    placeholder="500"
                    min="0"
                    step="0.01"
                    required={isPACEnabled}
                  />
                </div>
                
                <div>
                  <label className="field-label">
                    {t('pacFrequency')}
                  </label>
                  <select
                    value={formData.pacFrequency || 'monthly'}
                    onChange={(e) => setFormData({ ...formData, pacFrequency: e.target.value as 'monthly' | 'quarterly' | 'yearly' })}
                    className="select-field"
                  >
                    <option value="monthly">{t('monthly')}</option>
                    <option value="quarterly">{t('quarterly')}</option>
                    <option value="yearly">{t('yearly')}</option>
                  </select>
                </div>
              </div>
              
              <div className="text-xs text-primary-200 bg-primary-500/10 border border-primary-400/20 px-3 py-2 rounded-lg">
                <p><strong>{t('pacNote')}:</strong> {t('pacDescription')}</p>
              </div>
            </div>
          )}
        </div>


        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary flex-1"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            {editingAsset ? (
              <>
                <Edit className="w-4 h-4" />
                {t('updateAsset')}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {t('addAssetButton')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};