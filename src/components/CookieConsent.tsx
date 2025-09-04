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
      className={`fixed bottom-0 left-0 right-0 z-[999999] transition-transform duration-300 ease-in-out ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Cookie className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {t('cookieConsentTitle')}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('cookieConsentMessage')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('cookieConsentDetails')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                {t('decline')}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
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