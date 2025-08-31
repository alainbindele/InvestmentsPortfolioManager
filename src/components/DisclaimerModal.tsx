import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';

interface DisclaimerModalProps {
  language: Language;
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  language,
  isOpen,
  onAccept,
  onDecline
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [hasReadDisclaimer, setHasReadDisclaimer] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 disclaimer-modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto disclaimer-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('disclaimerTitle')}</h2>
              <p className="text-sm text-gray-600">{t('disclaimerSubtitle')}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              Le analisi e simulazioni mostrate da Portfolio Balancer sono generate anche con sistemi di IA e hanno finalità informative e comparative. Non costituiscono consulenza finanziaria, fiscale o legale, non sono raccomandazioni personalizzate, non rappresentano offerta o sollecitazione all'acquisto/vendita di strumenti finanziari. Portfolio Balancer non effettua valutazioni di adeguatezza/appropriatezza ai sensi della normativa MiFID II/TUF e non gestisce portafogli. Le performance passate non garantiscono risultati futuri. I mercati comportano rischi inclusa la perdita del capitale. Dati e output possono contenere errori o essere incompleti.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mt-4 font-medium">
              Procedendo, confermi di aver compreso quanto sopra e di essere l'unico responsabile delle tue decisioni d'investimento. Per scelte operative rivolgiti a un consulente finanziario abilitato.
            </p>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="disclaimer-checkbox"
              checked={hasReadDisclaimer}
              onChange={(e) => setHasReadDisclaimer(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
            />
            <label htmlFor="disclaimer-checkbox" className="text-sm text-gray-700 cursor-pointer">
              {t('disclaimerAcceptance')}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              {t('cancel')}
            </button>
            <button
              onClick={onAccept}
              disabled={!hasReadDisclaimer}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                hasReadDisclaimer
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              {t('continue')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};