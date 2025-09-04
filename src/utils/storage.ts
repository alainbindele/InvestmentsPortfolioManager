import { Asset, Strategy } from '../types/portfolio';
import { Language } from '../types/language';
import { Currency } from '../types/currency';

const STORAGE_KEYS = {
  ASSETS: 'portfolio_balancer_assets',
  AI_STRATEGIES: 'portfolio_balancer_ai_strategies',
  LANGUAGE: 'portfolio_balancer_language',
  CURRENCY: 'portfolio_balancer_currency',
  ACTIVE_TAB: 'portfolio_balancer_active_tab',
  DISCLAIMER_ACCEPTED: 'portfolio_balancer_disclaimer_accepted'
};

// Cookie utilities
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Storage functions
export const saveAssets = (assets: Asset[]) => {
  try {
    setCookie(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  } catch (error) {
    console.error('Error saving assets to cookies:', error);
  }
};

export const loadAssets = (): Asset[] => {
  try {
    const saved = getCookie(STORAGE_KEYS.ASSETS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading assets from cookies:', error);
  }
  return [];
};

export const saveAIStrategies = (strategies: Strategy[]) => {
  try {
    setCookie(STORAGE_KEYS.AI_STRATEGIES, JSON.stringify(strategies));
  } catch (error) {
    console.error('Error saving AI strategies to cookies:', error);
  }
};

export const loadAIStrategies = (): Strategy[] => {
  try {
    const saved = getCookie(STORAGE_KEYS.AI_STRATEGIES);
    if (saved) {
      const strategies = JSON.parse(saved);
      // Convert date strings back to Date objects
      return strategies.map((strategy: any) => ({
        ...strategy,
        createdAt: new Date(strategy.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading AI strategies from cookies:', error);
  }
  return [];
};

export const saveLanguage = (language: Language) => {
  try {
    setCookie(STORAGE_KEYS.LANGUAGE, language);
  } catch (error) {
    console.error('Error saving language to cookies:', error);
  }
};

export const loadLanguage = (): Language => {
  try {
    const saved = getCookie(STORAGE_KEYS.LANGUAGE);
    if (saved && ['it', 'en', 'es', 'fr', 'de', 'zh'].includes(saved)) {
      return saved as Language;
    }
  } catch (error) {
    console.error('Error loading language from cookies:', error);
  }
  return 'it'; // Default language
};

export const saveCurrency = (currency: Currency) => {
  try {
    setCookie(STORAGE_KEYS.CURRENCY, currency);
  } catch (error) {
    console.error('Error saving currency to cookies:', error);
  }
};

export const loadCurrency = (): Currency => {
  try {
    const saved = getCookie(STORAGE_KEYS.CURRENCY);
    if (saved) {
      return saved as Currency;
    }
  } catch (error) {
    console.error('Error loading currency from cookies:', error);
  }
  return 'EUR'; // Default currency
};

export const saveActiveTab = (tab: string) => {
  try {
    setCookie(STORAGE_KEYS.ACTIVE_TAB, tab);
  } catch (error) {
    console.error('Error saving active tab to cookies:', error);
  }
};

export const loadActiveTab = (): string => {
  try {
    const saved = getCookie(STORAGE_KEYS.ACTIVE_TAB);
    if (saved && ['portfolio', 'strategies', 'ai'].includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.error('Error loading active tab from cookies:', error);
  }
  return 'portfolio'; // Default tab
};

export const saveDisclaimerAccepted = () => {
  try {
    setCookie(STORAGE_KEYS.DISCLAIMER_ACCEPTED, 'true', 365); // Store for 1 year
  } catch (error) {
    console.error('Error saving disclaimer acceptance to cookies:', error);
  }
};

export const loadDisclaimerAccepted = (): boolean => {
  try {
    const saved = getCookie(STORAGE_KEYS.DISCLAIMER_ACCEPTED);
    return saved === 'true';
  } catch (error) {
    console.error('Error loading disclaimer acceptance from cookies:', error);
  }
  return false;
};

export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      deleteCookie(key);
    });
    // Force page reload to reset state
    window.location.reload();
  } catch (error) {
    console.error('Error clearing data from cookies:', error);
  }
};

export const getStorageInfo = () => {
  const assets = loadAssets();
  const strategies = loadAIStrategies();
  const language = loadLanguage();
  const currency = loadCurrency();
  
  return {
    assetsCount: assets.length,
    strategiesCount: strategies.length,
    language,
    currency,
    hasData: assets.length > 0 || strategies.length > 0
  };
};