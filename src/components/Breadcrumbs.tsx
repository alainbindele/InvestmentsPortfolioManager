import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  language: Language;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, language }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        <li>
          <a 
            href="/" 
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('home')}
          >
            <Home className="w-4 h-4" />
          </a>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            {item.href && !item.active ? (
              <a 
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span 
                className={`${item.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};