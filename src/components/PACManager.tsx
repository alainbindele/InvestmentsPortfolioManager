import React, { useState } from 'react';
import { Plus, X, Calendar, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Asset, PACPlan, PACProjection } from '../types/portfolio';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';
import { formatCurrency, calculatePACProjection } from '../utils/calculations';

interface PACManagerProps {
  assets: Asset[];
  pacs: PACPlan[];
  onAddPAC: (pac: Omit<PACPlan, 'id'>) => void;
  onRemovePAC: (pacId: string) => void;
  language: Language;
}

export const PACManager: React.FC<PACManagerProps> = ({
  assets,
  pacs,
  onAddPAC,
  onRemovePAC,
  language
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedPAC, setSelectedPAC] = useState<PACPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    monthlyAmount: '',
    frequency: 'monthly' as const,
    duration: '10',
    expectedReturn: '6.5'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.monthlyAmount || !formData.duration) {
      return;
    }

    // Create simple allocation (equal distribution among assets)
    const targetAllocations: { [assetId: string]: number } = {};
    if (assets.length > 0) {
      const equalAllocation = Math.floor(100 / assets.length);
      assets.forEach((asset, index) => {
        targetAllocations[asset.id] = index === 0 ? 
          100 - (equalAllocation * (assets.length - 1)) : // First asset gets remainder
          equalAllocation;
      });
    }

    const newPAC: Omit<PACPlan, 'id'> = {
      name: formData.name,
      monthlyAmount: parseFloat(formData.monthlyAmount),
      frequency: formData.frequency,
      duration: parseInt(formData.duration),
      targetAllocations,
      expectedReturn: parseFloat(formData.expectedReturn),
      startDate: new Date(),
      isActive: true,
      asAsset: false
    };

    onAddPAC(newPAC);
    
    // Reset form
    setFormData({
      name: '',
      monthlyAmount: '',
      frequency: 'monthly',
      duration: '10',
      expectedReturn: '6.5'
    });
    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return t('monthly');
      case 'quarterly': return t('quarterly');
      case 'biannual': return t('biannual');
      case 'annual': return t('annual');
      default: return frequency;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Mese {label}</p>
          <p className="text-sm text-primary-600">
            {t('totalInvested')}: {formatCurrency(data.totalInvested)}
          </p>
          <p className="text-sm text-success-600">
            {t('portfolioValue')}: {formatCurrency(data.portfolioValue)}
          </p>
          <p className="text-sm text-warning-600">
            {t('totalGain')}: {formatCurrency(data.totalGain)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* PAC Form */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('activePacs')}</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            {t('createPac')}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('pacName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="es. PAC ETF Globale"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('monthlyAmount')}
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyAmount}
                    onChange={(e) => handleInputChange('monthlyAmount', e.target.value)}
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
                    onChange={(e) => handleInputChange('frequency', e.target.value)}
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
                    {t('duration')}
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="input-field"
                    placeholder="10"
                    min="1"
                    max="50"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('expectedReturnLabel')}
                  </label>
                  <input
                    type="number"
                    value={formData.expectedReturn}
                    onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                    className="input-field"
                    placeholder="6.5"
                    min="0"
                    max="50"
                    step="0.1"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">
                  {t('createPac')}
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

        {/* PAC List */}
        {pacs.length > 0 ? (
          <div className="space-y-3">
            {pacs.map((pac) => (
              <div 
                key={pac.id} 
                className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                  selectedPAC?.id === pac.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                }`}
                onClick={() => setSelectedPAC(selectedPAC?.id === pac.id ? null : pac)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{pac.name}</h3>
                        {pac.asAsset && (
                          <span className="px-2 py-1 bg-success-100 text-success-700 rounded-full text-xs font-medium">
                            In Portfolio
                          </span>
                        )}
                        {!pac.isActive && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            Inattivo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(pac.monthlyAmount)} • {getFrequencyLabel(pac.frequency)} • {pac.duration} anni • {pac.expectedReturn}% annuo
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(pac.monthlyAmount * (
                          pac.frequency === 'monthly' ? 12 :
                          pac.frequency === 'quarterly' ? 4 :
                          pac.frequency === 'biannual' ? 2 : 1
                        ))}/anno
                      </p>
                      <p className="text-sm text-gray-600">
                        Totale: {formatCurrency(pac.monthlyAmount * (
                          pac.frequency === 'monthly' ? 12 :
                          pac.frequency === 'quarterly' ? 4 :
                          pac.frequency === 'biannual' ? 2 : 1
                        ) * pac.duration)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePAC(pac.id);
                  }}
                  className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>{t('noPacsMessage')}</p>
          </div>
        )}
      </div>

      {/* PAC Projection Chart */}
      {selectedPAC && (
        <div className="card animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('pacProjection')}: {selectedPAC.name}
          </h3>
          
          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calculatePACProjection(selectedPAC, assets)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Line
                  type="monotone"
                  dataKey="totalInvested"
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  name={t('totalInvested')}
                />
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  name={t('portfolioValue')}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PAC Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(() => {
              const projection = calculatePACProjection(selectedPAC, assets);
              const finalProjection = projection[projection.length - 1];
              return (
                <>
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">{t('totalInvested')}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(finalProjection.totalInvested)}
                    </p>
                  </div>
                  
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">{t('portfolioValue')}</p>
                    <p className="text-xl font-bold text-success-600">
                      {formatCurrency(finalProjection.portfolioValue)}
                    </p>
                  </div>
                  
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">{t('totalGain')}</p>
                    <p className="text-xl font-bold text-primary-600">
                      {formatCurrency(finalProjection.totalGain)}
                    </p>
                  </div>
                  
                  <div className="metric-card">
                    <p className="text-sm text-gray-600">{t('compoundEffect')}</p>
                    <p className="text-xl font-bold text-warning-600">
                      +{finalProjection.gainPercentage.toFixed(1)}%
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};