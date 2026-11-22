import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, DollarSign, Search, Check } from 'lucide-react';
import { Currency, CURRENCIES, CURRENCY_REGIONS, getCurrenciesByRegion } from '../types/currency';

interface CurrencySelectorProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onCurrencyChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCurrencyData = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setSelectedRegion('all');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
    setSearchTerm('');
    setSelectedRegion('all');
  };

  const filteredCurrencies = CURRENCIES.filter(currency => {
    const matchesSearch = searchTerm === '' ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === 'all' || currency.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const regionChipClass = (active: boolean) =>
    `px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
      active
        ? 'bg-primary-500 text-white shadow-glow'
        : 'bg-white/[0.06] text-ink-muted hover:bg-white/10 hover:text-ink'
    }`;

  const renderCurrencyRow = (currency: typeof CURRENCIES[number]) => {
    const isCurrent = currentCurrency === currency.code;
    return (
      <button
        key={currency.code}
        onClick={() => handleCurrencySelect(currency.code)}
        role="option"
        aria-selected={isCurrent}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
          isCurrent ? 'bg-primary-500/15 text-primary-200' : 'text-ink-soft hover:bg-white/[0.06] hover:text-ink'
        }`}
      >
        <span className="text-lg leading-none">{currency.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium">{currency.code}</span>
            <span className="text-sm text-ink-subtle">{currency.symbol}</span>
          </div>
          <p className="text-sm text-ink-muted truncate">{currency.name}</p>
        </div>
        {isCurrent && (
          <Check className="w-4 h-4 text-primary-300 flex-shrink-0" />
        )}
      </button>
    );
  };

  const regionHeader = (region: string) => (
    <div className="px-3 pt-3 pb-1">
      <h4 className="eyebrow">{region}</h4>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="control-chip min-w-[80px] sm:min-w-[110px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <DollarSign className="w-4 h-4 text-ink-muted" />
        <span className="text-sm sm:text-base leading-none">{currentCurrencyData.flag}</span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-medium">
            {currentCurrencyData.code}
          </span>
          <span className="text-[11px] text-ink-subtle hidden sm:block">
            {currentCurrencyData.symbol}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-ink-subtle transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div
          className="glass-popover absolute right-0 mt-2 w-72 sm:w-80 animate-slide-up max-h-96 overflow-hidden"
          style={{
            zIndex: 999999
          }}
        >
          {/* Search and Filter Header */}
          <div className="p-3 sm:p-4 border-b border-line">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-faint" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field !py-2 pl-9 text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedRegion('all')}
                className={regionChipClass(selectedRegion === 'all')}
              >
                All
              </button>
              {CURRENCY_REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={regionChipClass(selectedRegion === region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto p-1.5" role="listbox">
            {selectedRegion !== 'all' && regionHeader(selectedRegion)}

            {filteredCurrencies.length === 0 ? (
              <div className="p-4 text-center text-ink-subtle text-sm">
                No currencies found
              </div>
            ) : (
              <div className="pb-1">
                {selectedRegion === 'all' ? (
                  // Group by region when showing all
                  CURRENCY_REGIONS.map((region) => {
                    const regionCurrencies = getCurrenciesByRegion(region).filter(currency =>
                      searchTerm === '' ||
                      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (regionCurrencies.length === 0) return null;

                    return (
                      <div key={region}>
                        {regionHeader(region)}
                        {regionCurrencies.map(renderCurrencyRow)}
                      </div>
                    );
                  })
                ) : (
                  // Show filtered currencies for selected region
                  filteredCurrencies.map(renderCurrencyRow)
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
