export type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];
