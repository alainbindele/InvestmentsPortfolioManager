import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, X, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Asset, PACPlan, PACProjection } from '../types/portfolio';
import { Language } from '../types/language';
import { formatCurrency, formatPercentage, calculatePACProjection } from '../utils/calculations';
import { getTranslation } from '../utils/translations';

interface PACManagerProps {
  assets: Asset[];
  pacPlans: PACPlan[];
  onAddPAC: (pac: Omit<PACPlan, 'id'>) => void;
  onRemovePAC: (pacId: string) => void;
  language: Language;
}

export const PACManager: React.FC<PACManagerProps> = ({
  assets,
  pacPlans,
  onAddPAC,
  onRemovePAC,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPAC, setSelectedPAC] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    monthlyAmount: '',
    frequency: 'monthly' as 'monthly' | 'quarterly' | 'biannual' | 'annual',
    duration: '20',
    expectedReturn: '7',
    targetAllocations: {} as { [assetId: string]: number }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.monthlyAmount || !formData.duration) {
      alert('Compila tutti i campi obbligatori');
      return;
    }

    // Default equal allocation if no specific allocation is set
    const defaultAllocations: { [assetId: string]: number } = {};
    if (Object.keys(formData.targetAllocations).length === 0 && assets.length > 0) {
      const equalPercentage = Math.floor(100 / assets.length);
      assets.forEach((asset, index) => {
        defaultAllocations[asset.id] = index === 0 ? 100 - (equalPercentage * (assets.length - 1)) : equalPercentage;
      });
    }

    const pac: Omit<PACPlan, 'id'> = {
      name: formData.name,
      monthlyAmount: parseFloat(formData.monthlyAmount),
      frequency: formData.frequency,
      duration: parseInt(formData.duration),
      targetAllocations: Object.keys(formData.targetAllocations).length > 0 ? formData.targetAllocations : defaultAllocations,
      expectedReturn: parseFloat(formData.expectedReturn),
      startDate: new Date(),
      isActive: true
    };

    onAddPAC(pac);
    
    // Reset form
    setFormData({
      name: '',
      monthlyAmount: '',
      frequency: 'monthly',
      duration: '20',
      expectedReturn: '7',
      targetAllocations: {}
    });
    setIsCreating(false);
  };

  const handleAllocationChange = (assetId: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      targetAllocations: {
        ...prev.targetAllocations,
        [assetId]: value
      }
    }));
  };

  const selectedPACData = selectedPAC ? pacPlans.find(p => p.id === selectedPAC) : null;
  const pacProjection = selectedPACData ? calculatePACProjection(selectedPACData, assets) : null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">Mese {label}</p>
          <p className="text-sm text-gray-600">
            Investito: {formatCurrency(data.totalInvested)}
          </p>
          <p className="text-sm text-success-600">
            Valore Portfolio: {formatCurrency(data.portfolioValue)}
          </p>
          <p className="text-sm text-primary-600">
            Guadagno: {formatCurrency(data.totalGain)} ({data.gainPercentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Create PAC Form */}
      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          {t('createPac')}
        </button>
      ) : (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('createPac')}</h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('pacName')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="es. PAC Diversificato"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('monthlyAmount')} *
                </label>
                <input
                  type="number"
                  value={formData.monthlyAmount}
                  onChange={(e) => setFormData({ ...formData, monthlyAmount: e.target.value })}
                  className="input-field"
                  placeholder="500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('frequency')}
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                  className="select-field"
                >
                  <option value="monthly">{t('monthly')}</option>
                  <option value="quarterly">{t('quarterly')}</option>
                  <option value="biannual">{t('biannual')}</option>
                  <option value="annual">{t('annual')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('duration')} *
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="input-field"
                  placeholder="20"
                  min="1"
                  max="50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rendimento Atteso (% annuo)
              </label>
              <input
                type="number"
                value={formData.expectedReturn}
                onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                className="input-field"
                placeholder="7"
                min="0"
                max="50"
                step="0.1"
              />
            </div>

            {/* Asset Allocation */}
            {assets.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('pacAllocation')} (Opzionale - default: allocazione equa)
                </label>
                <div className="space-y-2">
                  {assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{asset.name}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={formData.targetAllocations[asset.id] || ''}
                          onChange={(e) => handleAllocationChange(asset.id, parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder={Math.floor(100 / assets.length).toString()}
                          min="0"
                          max="100"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="btn-secondary flex-1"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                <Plus className="w-4 h-4" />
                Crea PAC
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active PACs */}
      {pacPlans.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('activePacs')} ({pacPlans.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pacPlans.map((pac) => (
              <div
                key={pac.id}
                className={`card cursor-pointer transition-all ${
                  selectedPAC === pac.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPAC(selectedPAC === pac.id ? null : pac.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{pac.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(pac.monthlyAmount)}/{
                        pac.frequency === 'monthly' ? 'mese' :
                        pac.frequency === 'quarterly' ? 'trimestre' :
                        pac.frequency === 'biannual' ? 'semestre' : 'anno'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPAC === pac.id && (
                      <div className="px-2 py-1 bg-primary-600 text-white rounded-full text-xs">
                        Selezionato
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemovePAC(pac.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Durata:</span>
                    <span className="font-semibold">{pac.duration} anni</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rendimento:</span>
                    <span className="font-semibold text-success-600">
                      {formatPercentage(pac.expectedReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Investimento totale:</span>
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(pac.monthlyAmount * 12 * pac.duration)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pacPlans.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun PAC</h3>
          <p className="text-gray-600">{t('noPacsMessage')}</p>
        </div>
      )}

      {/* PAC Projection Chart */}
      {selectedPACData && pacProjection && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('pacProjection')}</h3>
              <p className="text-sm text-gray-600">
                Simulazione per: {selectedPACData.name}
              </p>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('totalInvested')}</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(pacProjection[pacProjection.length - 1]?.totalInvested || 0)}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('portfolioValue')}</p>
              <p className="text-lg font-bold text-success-600">
                {formatCurrency(pacProjection[pacProjection.length - 1]?.portfolioValue || 0)}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('totalGain')}</p>
              <p className="text-lg font-bold text-primary-600">
                {formatCurrency(pacProjection[pacProjection.length - 1]?.totalGain || 0)}
              </p>
            </div>
            <div className="metric-card">
              <p className="text-sm text-gray-600">{t('compoundEffect')}</p>
              <p className="text-lg font-bold text-warning-600">
                {formatPercentage(pacProjection[pacProjection.length - 1]?.gainPercentage || 0)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pacProjection} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Line
                  type="monotone"
                  dataKey="totalInvested"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Totale Investito"
                />
                
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  name="Valore Portfolio"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};