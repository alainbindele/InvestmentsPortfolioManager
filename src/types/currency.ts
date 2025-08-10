export type Currency = 
  | 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'NZD' | 'SEK' | 'NOK' | 'DKK'
  | 'CNY' | 'HKD' | 'SGD' | 'KRW' | 'INR' | 'THB' | 'MYR' | 'IDR' | 'PHP' | 'VND'
  | 'BRL' | 'ARS' | 'CLP' | 'COP' | 'PEN' | 'UYU' | 'MXN'
  | 'ZAR' | 'EGP' | 'MAD' | 'NGN' | 'KES' | 'GHS'
  | 'RUB' | 'PLN' | 'CZK' | 'HUF' | 'RON' | 'BGN' | 'HRK' | 'RSD' | 'UAH' | 'TRY'
  | 'ILS' | 'SAR' | 'AED' | 'QAR' | 'KWD' | 'BHD' | 'OMR' | 'JOD' | 'LBP' | 'IRR';

export interface CurrencyOption {
  code: Currency;
  name: string;
  symbol: string;
  flag: string;
  region: string;
}

export const CURRENCIES: CurrencyOption[] = [
  // Europe
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', region: 'Europe' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', region: 'Europe' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', region: 'Europe' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', region: 'Europe' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', region: 'Europe' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', region: 'Europe' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱', region: 'Europe' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', region: 'Europe' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', region: 'Europe' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', region: 'Europe' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', region: 'Europe' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', region: 'Europe' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸', region: 'Europe' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', region: 'Europe' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', region: 'Europe' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', region: 'Europe' },

  // Americas
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', region: 'Americas' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', region: 'Americas' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', region: 'Americas' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', region: 'Americas' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', region: 'Americas' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', region: 'Americas' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', region: 'Americas' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', region: 'Americas' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', region: 'Americas' },

  // Asia-Pacific
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', region: 'Asia-Pacific' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', region: 'Asia-Pacific' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', region: 'Asia-Pacific' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', region: 'Asia-Pacific' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', region: 'Asia-Pacific' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', region: 'Asia-Pacific' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', region: 'Asia-Pacific' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', region: 'Asia-Pacific' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', region: 'Asia-Pacific' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', region: 'Asia-Pacific' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', region: 'Asia-Pacific' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', region: 'Asia-Pacific' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', region: 'Asia-Pacific' },

  // Middle East
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', region: 'Middle East' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', region: 'Middle East' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', region: 'Middle East' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦', region: 'Middle East' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', region: 'Middle East' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', region: 'Middle East' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲', region: 'Middle East' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', region: 'Middle East' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£', flag: '🇱🇧', region: 'Middle East' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷', region: 'Middle East' },

  // Africa
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', region: 'Africa' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬', region: 'Africa' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦', region: 'Africa' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', region: 'Africa' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', region: 'Africa' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', region: 'Africa' }
];

export const CURRENCY_REGIONS = [
  'Europe',
  'Americas', 
  'Asia-Pacific',
  'Middle East',
  'Africa'
] as const;

export const getCurrencyByCode = (code: Currency): CurrencyOption | undefined => {
  return CURRENCIES.find(currency => currency.code === code);
};

export const getCurrenciesByRegion = (region: string): CurrencyOption[] => {
  return CURRENCIES.filter(currency => currency.region === region);
};