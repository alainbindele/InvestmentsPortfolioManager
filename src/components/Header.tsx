import React from 'react';
import { BarChart3 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { getTranslation } from '../utils/translations';
import { Language } from '../types/language';
import { PortfolioMetrics } from '../types/portfolio';

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  portfolioMetrics: PortfolioMetrics;
  t: (key: string) => string;
};

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  portfolioMetrics,
  t,
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {t('appTitle')}
              </h1>
              <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />

            <div className="text-right">
              <p className="text-sm text-gray-600">{t('totalValue')}</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(portfolioMetrics.totalValue)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{t('expectedReturn')}</p>
              <p className="text-lg font-bold text-success-600">
                {formatPercentage(portfolioMetrics.expectedReturn)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
