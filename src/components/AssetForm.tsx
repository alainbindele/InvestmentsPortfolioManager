import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Asset, AssetType, RiskLevel, ASSET_TYPE_LABELS, RISK_LEVEL_LABELS } from '../types/portfolio';

interface AssetFormProps {
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
  onRemoveAsset: (assetId: string) => void;
  assets: Asset[];
}

export const AssetForm: React.FC<AssetFormProps> = ({ onAddAsset, onRemoveAsset, assets }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'etf' as AssetType,
    currentValue: '',
    expectedReturn: '',
    riskLevel: 'medium' as RiskLevel
  });

  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">I Tuoi Asset</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Aggiungi Asset
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Asset
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
                  Tipo Asset
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
                  Valore Attuale (€)
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
                  Rendimento Atteso (% annuo)
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
                  Livello di Rischio
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
                Aggiungi Asset
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      )}

      {assets.length > 0 && (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
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
          <p>Nessun asset aggiunto. Inizia creando il tuo portafoglio!</p>
        </div>
      )}
    </div>
  );
};