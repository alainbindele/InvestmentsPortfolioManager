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
          className="control-chip !text-error-300 hover:!text-error-200 !border-error-400/25 hover:!border-error-400/45 !bg-error-500/10 hover:!bg-error-500/15 text-sm min-w-[44px] sm:min-w-0 justify-center"
          title={t('resetData')}
          aria-label={t('resetData')}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">{t('reset')}</span>
        </button>
      ) : (
        <div className="glass-popover fixed p-4 w-80 max-w-[calc(100vw-2rem)] sm:min-w-80 animate-slide-up !border-error-400/30" style={{
            zIndex: 999999,
            top: '120px',
            right: '16px'
          }}
          role="alertdialog"
          aria-labelledby="reset-title"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="icon-tile icon-tile-error">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h4 id="reset-title" className="font-semibold text-ink">{t('confirmReset')}</h4>
              <p className="text-sm text-ink-muted">{t('resetWarning')}</p>
            </div>
          </div>

          <div className="callout callout-error mb-4">
            <p className="text-sm text-error-200 mb-2">{t('dataToDelete')}:</p>
            <ul className="text-xs text-error-300 space-y-1">
              <li>• {storageInfo.assetsCount} {t('assets')}</li>
              <li>• {storageInfo.strategiesCount} {t('aiStrategies')}</li>
              <li>• {t('languageAndCurrency')}: {storageInfo.language.toUpperCase()}, {storageInfo.currency}</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="btn-secondary flex-1 !text-sm"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleReset}
              className="btn-danger flex-1"
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
