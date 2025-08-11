import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, Trash2 } from 'lucide-react';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';
import { clearAllData, getStorageInfo } from '../utils/storage';

interface ResetButtonProps {
  language: Language;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ language }) => {
  const t = (key: string) => getTranslation(language, key);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const storageInfo = getStorageInfo();

  const handleReset = () => {
    clearAllData();
  };

  if (!storageInfo.hasData) {
    return null; // Don't show reset button if no data
  }

  return (
    <div className="relative">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm"
          title={t('resetData')}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">{t('reset')}</span>
        </button>
      ) : (
        <div className="absolute top-0 right-0 bg-white border border-red-300 rounded-lg shadow-lg p-4 z-50 min-w-80">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900">{t('confirmReset')}</h4>
              <p className="text-sm text-red-700">{t('resetWarning')}</p>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800 mb-2">{t('dataToDelete')}:</p>
            <ul className="text-xs text-red-700 space-y-1">
              <li>• {storageInfo.assetsCount} {t('assets')}</li>
              <li>• {storageInfo.strategiesCount} {t('aiStrategies')}</li>
              <li>• {t('languageAndCurrency')}: {storageInfo.language.toUpperCase()}, {storageInfo.currency}</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              {t('resetConfirm')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};