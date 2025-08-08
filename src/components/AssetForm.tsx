import React, { useState } from 'react';
import { Plus, X, Calendar } from 'lucide-react';
import { Asset, AssetType, RiskLevel, ASSET_TYPE_LABELS, RISK_LEVEL_LABELS } from '../types/portfolio';
import { PACPlan } from '../types/portfolio';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';

interface AssetFormProps {
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
  onRemoveAsset: (assetId: string) => void;
  onAssetClick: (asset: Asset) => void;
  assets: Asset[];
  pacs: PACPlan[];
  onAddPACAsAsset: (pacId: string, customReturn: number) => void;
  language: Language;
}

export const AssetForm: React.FC<AssetFormProps> = ({ 
  onAddAsset, 
  onRemoveAsset, 
  onAssetClick,
  assets, 
  pacs, 
  onAddPACAsAsset, 
  language 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'etf' as AssetType,
    currentValue: '',
    expectedReturn: '',
    riskLevel: 'medium' as RiskLevel
  });

  const [showForm, setShowForm] = useState(false);
  const [showPACForm, setShowPACForm] = useState(false);
  const [selectedPAC, setSelectedPAC] = useState<string>('');
  const [pacCustomReturn, setPacCustomReturn] = useState<string>('');

  const t = (key: string) => getTranslation(language, key);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.currentValue || !formData.expectedReturn) {
      return;
    }

    const newAsset: Omit<Asset, 'id'> = {
      name: formData.name,
      type: formData.type,
      currentValue: parseFloat(formData.currentValue),
      expectedReturn: parseFloat(formData.expectedReturn),
      riskLevel: formData.riskLevel
    };

    onAddAsset(newAsset);
    
    // Reset form
    setFormData({
      name: '',
      type: 'etf',
      currentValue: '',
      expectedReturn: '',
      riskLevel: 'medium'
    });
    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPACAsAsset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPAC || !pacCustomReturn) {
      return;
    }

    onAddPACAsAsset(selectedPAC, parseFloat(pacCustomReturn));
    
    // Reset form
    setSelectedPAC('');
    setPacCustomReturn('');
    setShowPACForm(false);
  };

  // Filtra i PAC che non sono già stati aggiunti come asset
  const availablePACs = pacs.filter(pac => !pac.asAsset);
  const pacAssets = assets.filter(asset => asset.type === 'other' && asset.name.includes('PAC'));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('yourAssets')}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          {t('addAsset')}
        </button>
        {availablePACs.length > 0 && (
          <button
            onClick={() => setShowPACForm(!showPACForm)}
            className="btn-secondary ml-2"
          >
            <Calendar className="w-4 h-4" />
            Aggiungi PAC come Asset
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('assetName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="es. VWCE - Vanguard FTSE All-World"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('assetType')}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="select-field"
                >
                  {Object.entries(ASSET_TYPE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('assetCurrentValue')}
                </label>
                <input
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) => handleInputChange('currentValue', e.target.value)}
                  className="input-field"
                  placeholder="50000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('expectedReturnLabel')}
                </label>
                <input
                  type="number"
                  value={formData.expectedReturn}
                  onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                  className="input-field"
                  placeholder="7.5"
                  min="0"
                  max="50"
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
                  onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                  className="select-field"
                >
                  {Object.entries(RISK_LEVEL_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                {t('addAssetButton')}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {showPACForm && availablePACs.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg animate-slide-up border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Aggiungi PAC come Asset nel Portfolio
          </h4>
          <p className="text-sm text-blue-700 mb-4">
            Trasforma un piano PAC in un asset del portfolio per includerlo nelle analisi e strategie.
          </p>
          
          <form onSubmit={handleAddPACAsAsset} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleziona PAC
                </label>
                <select
                  value={selectedPAC}
                  onChange={(e) => setSelectedPAC(e.target.value)}
                  className="select-field"
                  required
                >
                  <option value="">Scegli un PAC...</option>
                  {availablePACs.map((pac) => (
                    <option key={pac.id} value={pac.id}>
                      {pac.name} - €{pac.monthlyAmount}/mese
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rendimento Atteso (% annuo)
                </label>
                <input
                  type="number"
                  value={pacCustomReturn}
                  onChange={(e) => setPacCustomReturn(e.target.value)}
                  className="input-field"
                  placeholder="6.5"
                  min="0"
                  max="50"
                  step="0.1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Rendimento personalizzato per questo PAC
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Aggiungi PAC come Asset
              </button>
              <button
                type="button"
                onClick={() => setShowPACForm(false)}
                className="btn-secondary"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {assets.length > 0 && (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div 
              key={asset.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onAssetClick(asset)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{asset.name}</h3>
                      {asset.name.includes('PAC') && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          PAC
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {ASSET_TYPE_LABELS[asset.type]} • {RISK_LEVEL_LABELS[asset.riskLevel]} Rischio
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      €{asset.currentValue.toLocaleString('it-IT')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {asset.expectedReturn}% annuo
                    </p>
                  </div>
                </div>
              </div>
                  e.stopPropagation();
              <button
                onClick={() => onRemoveAsset(asset.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {assets.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-500">
          <p>{t('noAssetsMessage')}</p>
        </div>
      )}
    </div>
  );
};