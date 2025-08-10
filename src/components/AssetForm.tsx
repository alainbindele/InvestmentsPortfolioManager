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
  
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize form with editing asset data if provided
  const initializeFormData = (asset?: Asset | null) => ({
    name: asset?.name || '',
    type: asset?.type || 'stocks' as AssetType,
    currentValue: asset?.currentValue?.toString() || '',
    expectedReturn: asset?.expectedReturn?.toString() || '',
    riskLevel: asset?.riskLevel || 'medium' as RiskLevel,
    isPAC: asset?.isPAC || false,
    pacAmount: asset?.pacAmount?.toString() || '',
    pacFrequency: asset?.pacFrequency || 'monthly' as 'monthly' | 'quarterly' | 'biannual' | 'annual'
  });
  
  const [formData, setFormData] = useState({
    ...initializeFormData()
  });

  // Update form when editingAsset changes
  React.useEffect(() => {
    if (editingAsset) {
      setFormData(initializeFormData(editingAsset));
      setIsOpen(true);
    } else {
      setFormData(initializeFormData());
    }
  }, [editingAsset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.currentValue || !formData.expectedReturn) {
      alert(t('fillRequiredFields'));
      return;
    }

    const asset: Omit<Asset, 'id'> = {
      name: formData.name,
      type: formData.type,
      currentValue: parseFloat(formData.currentValue),
      expectedReturn: parseFloat(formData.expectedReturn),
      riskLevel: formData.riskLevel,
      isPAC: formData.isPAC,
      pacAmount: formData.isPAC ? parseFloat(formData.pacAmount) : undefined,
      pacFrequency: formData.isPAC ? formData.pacFrequency : undefined
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingAsset ? t('editAsset') : t('addAsset')}
        </h3>
        <button
          onClick={handleCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('assetCurrentValue')} *
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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

        {/* PAC Configuration */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="isPAC"
              checked={formData.isPAC}
              onChange={(e) => setFormData({ ...formData, isPAC: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isPAC" className="text-sm font-medium text-gray-700">
              {t('isPAC')}
            </label>
          </div>
          
          <p className="text-xs text-gray-500 mb-3">
            {t('pacDescription')}
          </p>

          {formData.isPAC && (
            <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('pacAmount')} (€) *
                </label>
                <input
                  type="number"
                  value={formData.pacAmount}
                  onChange={(e) => setFormData({ ...formData, pacAmount: e.target.value })}
                  className="input-field"
                  placeholder="500"
                  min="0"
                  step="0.01"
                  required={formData.isPAC}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('pacFrequency')}
                </label>
                <select
                  value={formData.pacFrequency}
                  onChange={(e) => setFormData({ ...formData, pacFrequency: e.target.value as any })}
                  className="select-field"
                >
                  <option value="monthly">{t('monthly')}</option>
                  <option value="quarterly">{t('quarterly')}</option>
                  <option value="biannual">{t('biannual')}</option>
                  <option value="annual">{t('annual')}</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
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