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
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4" style={{ zIndex: 1000000 }}>
      <div className="glass-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto disclaimer-modal" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="icon-tile icon-tile-warning w-11 h-11">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h2 id="disclaimer-title" className="text-lg sm:text-xl font-semibold text-ink">{t('disclaimerTitle')}</h2>
              <p className="text-sm text-ink-muted">{t('disclaimerSubtitle')}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="panel-inset p-4 mb-6">
            <p className="text-sm text-ink-soft leading-relaxed">
              Le analisi e simulazioni mostrate da Portfolio Balancer sono generate anche con sistemi di IA e hanno finalità informative e comparative. Non costituiscono consulenza finanziaria, fiscale o legale, non sono raccomandazioni personalizzate, non rappresentano offerta o sollecitazione all'acquisto/vendita di strumenti finanziari. Portfolio Balancer non effettua valutazioni di adeguatezza/appropriatezza ai sensi della normativa MiFID II/TUF e non gestisce portafogli. Le performance passate non garantiscono risultati futuri. I mercati comportano rischi inclusa la perdita del capitale. Dati e output possono contenere errori o essere incompleti.
            </p>
            <p className="text-sm text-ink-soft leading-relaxed mt-4 font-medium">
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
              className="w-5 h-5 rounded cursor-pointer mt-0.5 flex-shrink-0"
            />
            <label htmlFor="disclaimer-checkbox" className="text-sm text-ink-soft cursor-pointer">
              {t('disclaimerAcceptance')}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="btn-secondary flex-1"
            >
              {t('cancel')}
            </button>
            <button
              onClick={onAccept}
              disabled={!hasReadDisclaimer}
              className="btn-primary flex-1"
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