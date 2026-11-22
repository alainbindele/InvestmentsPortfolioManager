import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { Language, LANGUAGES } from '../types/language';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="control-chip min-w-[70px] sm:min-w-0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-ink-muted" />
        <span className="text-sm sm:text-base leading-none">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {currentLang.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-ink-subtle transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div
          className="glass-popover absolute right-0 mt-2 w-44 sm:w-52 animate-slide-up overflow-hidden"
          style={{
            zIndex: 999999
          }}
          role="listbox"
        >
          <div className="p-1.5">
            {LANGUAGES.map((language) => {
              const isCurrent = currentLanguage === language.code;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  role="option"
                  aria-selected={isCurrent}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors duration-150 ${
                    isCurrent ? 'bg-primary-500/15 text-primary-200' : 'text-ink-soft hover:bg-white/[0.06] hover:text-ink'
                  }`}
                >
                  <span className="text-base leading-none">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {isCurrent && (
                    <Check className="ml-auto w-4 h-4 text-primary-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
