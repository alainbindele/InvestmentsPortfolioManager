import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';

interface CookieConsentProps {
  language: Language;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
  const t = (key: string) => getTranslation(language, key);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('portfolio_balancer_cookie_consent');
    if (!cookieConsent) {
      // Show popup after a short delay
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('portfolio_balancer_cookie_consent', 'accepted');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('portfolio_balancer_cookie_consent', 'declined');
    // Redirect to a safe page
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[999999] p-3 sm:p-4 transition-transform duration-300 ease-in-out ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="glass-modal max-w-5xl mx-auto">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-start gap-3 flex-1">
              <span className="icon-tile icon-tile-primary">
                <Cookie className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-ink mb-1">
                  {t('cookieConsentTitle')}
                </h4>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {t('cookieConsentMessage')}
                </p>
                <p className="text-xs text-ink-subtle mt-1">
                  {t('cookieConsentDetails')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="btn-secondary flex-1 sm:flex-none !text-sm"
              >
                <X className="w-4 h-4" />
                {t('decline')}
              </button>
              <button
                onClick={handleAccept}
                className="btn-primary flex-1 sm:flex-none !text-sm"
              >
                <Check className="w-4 h-4" />
                {t('acceptCookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
