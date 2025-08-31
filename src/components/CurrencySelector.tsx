import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, DollarSign, Search } from 'lucide-react';
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm min-w-[80px] sm:min-w-[120px]"
      >
        <DollarSign className="w-4 h-4 text-gray-600" />
        <span className="text-sm sm:text-lg">{currentCurrencyData.flag}</span>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700">
            {currentCurrencyData.code}
          </span>
          <span className="text-xs text-gray-500 hidden sm:block">
            {currentCurrencyData.symbol}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] animate-slide-up max-h-96 overflow-hidden">
          {/* Search and Filter Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  selectedRegion === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {CURRENCY_REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedRegion === region
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto">
            {selectedRegion !== 'all' && (
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-700">{selectedRegion}</h4>
              </div>
            )}
            
            {filteredCurrencies.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No currencies found
              </div>
            ) : (
              <div className="py-2">
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
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                          <h4 className="text-sm font-medium text-gray-700">{region}</h4>
                        </div>
                        {regionCurrencies.map((currency) => (
                          <button
                            key={currency.code}
                            onClick={() => handleCurrencySelect(currency.code)}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                              currentCurrency === currency.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                            }`}
                          >
                            <span className="text-lg">{currency.flag}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{currency.code}</span>
                                <span className="text-sm text-gray-500">{currency.symbol}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{currency.name}</p>
                            </div>
                            {currentCurrency === currency.code && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    );
                  })
                ) : (
                  // Show filtered currencies for selected region
                  filteredCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        currentCurrency === currency.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{currency.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-sm text-gray-500">{currency.symbol}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{currency.name}</p>
                      </div>
                      {currentCurrency === currency.code && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};