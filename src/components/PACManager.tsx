import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, DollarSign, X, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Asset, PACPlan, PACProjection } from '../types/portfolio';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';
import { calculatePACProjection, formatCurrency, getContributionFrequencyMultiplier } from '../utils/calculations';

interface PACManagerProps {
  assets: Asset[];
  language: Language;
  pacs: PACPlan[];
  onAddPAC: (pac: Omit<PACPlan, 'id'>) => void;
  onRemovePAC: (pacId: string) => void;
}

export const PACManager: React.FC<PACManagerProps> = ({
  assets,
  language,
  pacs,
  onAddPAC,
  onRemovePAC
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedPAC, setSelectedPAC] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    monthlyAmount: '',
    frequency: 'monthly' as PACPlan['frequency'],
    duration: '10',
    targetAllocations: {} as { [assetId: string]: number }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.monthlyAmount || !formData.duration) {
      return;
    }

    // Initialize equal allocation if none set
    let allocations = formData.targetAllocations;
    if (Object.keys(allocations).length === 0 && assets.length > 0) {
      const equalAllocation = Math.floor(100 / assets.length);
      allocations = assets.reduce((acc, asset, index) => {
        acc[asset.id] = index === assets.length - 1 
          ? 100 - (equalAllocation * (assets.length - 1)) // Last asset gets remainder
          : equalAllocation;
        return acc;
      }, {} as { [assetId: string]: number });
    }

    const newPAC: Omit<PACPlan, 'id'> = {
      name: formData.name,
      monthlyAmount: parseFloat(formData.monthlyAmount),
      frequency: formData.frequency,
      duration: parseInt(formData.duration),
      targetAllocations: allocations,
      expectedReturn: calculateWeightedReturn(allocations),
      startDate: new Date(),
      isActive: true
    };

    onAddPAC(newPAC);
    
    // Reset form
    setFormData({
      name: '',
      monthlyAmount: '',
      frequency: 'monthly',
      duration: '10',
      targetAllocations: {}
    });
    setShowForm(false);
  };

  const calculateWeightedReturn = (allocations: { [assetId: string]: number }): number => {
    return Object.entries(allocations).reduce((sum, [assetId, allocation]) => {
      const asset = assets.find(a => a.id === assetId);
      if (!asset) return sum;
      return sum + (asset.expectedReturn * allocation / 100);
    }, 0);
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

  const normalizeAllocations = () => {
    const total = Object.values(formData.targetAllocations).reduce((sum, val) => sum + val, 0);
    if (total === 0) return;
    
    const normalized = Object.entries(formData.targetAllocations).reduce((acc, [assetId, value]) => {
      acc[assetId] = Math.round((value / total) * 100);
      return acc;
    }, {} as { [assetId: string]: number });
    
    setFormData(prev => ({ ...prev, targetAllocations: normalized }));
  };

  const selectedPACData = selectedPAC ? pacs.find(p => p.id === selectedPAC) : null;
  const projectionData = selectedPACData ? calculatePACProjection(selectedPACData, assets) : [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">Mese {label}</p>
          <p className="text-sm text-primary-600">
            {t('totalInvested')}: {formatCurrency(data.totalInvested)}
          </p>
          <p className="text-sm text-success-600">
            {t('portfolioValue')}: {formatCurrency(data.portfolioValue)}
          </p>
          <p className="text-sm text-warning-600">
            {t('totalGain')}: {formatCurrency(data.totalGain)} ({data.gainPercentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('pacTitle')}</h2>
          <p className="text-gray-600">{t('pacDescription')}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          {t('createPac')}
        </button>
      </div>

      {/* PAC Form */}
      {showForm && (
        <div className="card animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('pacName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="PAC ETF Mondo"
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
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlyAmount: e.target.value }))}
                  className="input-field"
                  placeholder="500"
                  min="1"
                  step="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('frequency')}
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as PACPlan['frequency'] }))}
                  className="select-field"
                >
                  <option value="monthly">{t('monthly')}</option>
                  <option value="quarterly">{t('quarterly')}</option>
                  <option value="biannual">{t('biannual')}</option>
                  <option value="annual">{t('annual')}</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">{t('pacFrequencyDesc')}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('duration')}
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="input-field"
                  placeholder="10"
                  min="1"
                  max="50"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{t('pacDurationDesc')}</p>
              </div>
            </div>

            {/* Asset Allocation */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {t('pacAllocation')}
                </label>
                <button
                  type="button"
                  onClick={normalizeAllocations}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Normalizza al 100%
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">{t('pacAllocationDesc')}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{asset.name}</p>
                      <p className="text-xs text-gray-600">{asset.expectedReturn}% annuo</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.targetAllocations[asset.id] || 0}
                        onChange={(e) => handleAllocationChange(asset.id, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                Totale: {Object.values(formData.targetAllocations).reduce((sum, val) => sum + val, 0)}%
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

      {/* Active PACs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('activePacs')}</h3>
        
        {pacs.length > 0 ? (
          <div className="space-y-3">
            {pacs.map((pac) => {
              const totalAnnualContribution = pac.monthlyAmount * getContributionFrequencyMultiplier(pac.frequency);
              const totalContribution = totalAnnualContribution * pac.duration;
              const projections = calculatePACProjection(pac, assets);
              const finalProjection = projections[projections.length - 1];
              
              return (
                <div 
                  key={pac.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPAC === pac.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPAC(selectedPAC === pac.id ? null : pac.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{pac.name}</h4>
                        <span className="px-2 py-1 bg-success-100 text-success-700 rounded-full text-xs">
                          {t(pac.frequency)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">{t('monthlyAmount')}</p>
                          <p className="font-semibold">{formatCurrency(pac.monthlyAmount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{t('duration')}</p>
                          <p className="font-semibold">{pac.duration} {t('years')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{t('totalInvested')}</p>
                          <p className="font-semibold text-primary-600">{formatCurrency(totalContribution)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{t('portfolioValue')}</p>
                          <p className="font-semibold text-success-600">
                            {formatCurrency(finalProjection?.portfolioValue || 0)}
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
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>{t('noPacsMessage')}</p>
          </div>
        )}
      </div>

      {/* PAC Projection Chart */}
      {selectedPACData && projectionData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('pacProjection')}: {selectedPACData.name}
          </h3>
          
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${Math.floor(value / 12)}a`}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                <Area
                  type="monotone"
                  dataKey="totalInvested"
                  stackId="1"
                  stroke="#6b7280"
                  fill="#6b7280"
                  fillOpacity={0.6}
                  name={t('totalInvested')}
                />
                <Area
                  type="monotone"
                  dataKey="totalGain"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name={t('compoundEffect')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="metric-card">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">{t('totalInvested')}</p>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(projectionData[projectionData.length - 1]?.totalInvested || 0)}
              </p>
            </div>
            
            <div className="metric-card">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-success-600" />
                <p className="text-sm text-gray-600">{t('portfolioValue')}</p>
              </div>
              <p className="text-xl font-bold text-success-600">
                {formatCurrency(projectionData[projectionData.length - 1]?.portfolioValue || 0)}
              </p>
            </div>
            
            <div className="metric-card">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary-600" />
                <p className="text-sm text-gray-600">{t('totalGain')}</p>
              </div>
              <p className="text-xl font-bold text-primary-600">
                {formatCurrency(projectionData[projectionData.length - 1]?.totalGain || 0)}
              </p>
            </div>
            
            <div className="metric-card">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-warning-600" />
                <p className="text-sm text-gray-600">Rendimento %</p>
              </div>
              <p className="text-xl font-bold text-warning-600">
                +{projectionData[projectionData.length - 1]?.gainPercentage.toFixed(1) || 0}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};