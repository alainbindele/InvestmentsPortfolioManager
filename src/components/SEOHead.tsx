import React from 'react';
import { Language } from '../types/language';
import { getTranslation } from '../utils/translations';
import { Asset, Strategy } from '../types/portfolio';

interface SEOHeadProps {
  language: Language;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  assets?: Asset[];
  strategies?: Strategy[];
  activeTab?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  language,
  title,
  description,
  keywords,
  canonicalUrl,
  assets = [],
  strategies = [],
  activeTab = 'portfolio'
}) => {
  const t = (key: string) => getTranslation(language, key);
  
  const defaultTitle = t('appTitle') + ' - ' + t('appSubtitle');
  const defaultDescription = t('seoDescription');
  const defaultKeywords = t('seoKeywords');
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonicalUrl = canonicalUrl || 'https://portfolio-balancer.netlify.app/';

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  React.useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    }
    
    // Update page description based on content
    const dynamicDescription = assets.length > 0 
      ? `Gestisci ${assets.length} asset per un valore di €${totalValue.toLocaleString('it-IT')}. ${finalDescription}`
      : finalDescription;
    
    // Update language
    document.documentElement.lang = language;
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', finalTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', dynamicDescription);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', finalCanonicalUrl);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', finalTitle);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', dynamicDescription);
    }
    
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', finalCanonicalUrl);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonicalUrl);
    
    // Add structured data for current page state
    const existingStructuredData = document.querySelector('#dynamic-structured-data');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": finalTitle,
      "description": dynamicDescription,
      "url": finalCanonicalUrl,
      "inLanguage": language,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Portfolio Balancer",
        "url": "https://portfolio-balancer.netlify.app/"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://portfolio-balancer.netlify.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": t(activeTab),
            "item": `https://portfolio-balancer.netlify.app/#${activeTab}`
          }
        ]
      },
      "mainEntity": assets.length > 0 ? {
        "@type": "FinancialProduct",
        "name": "Portfolio di Investimenti",
        "description": `Portfolio con ${assets.length} asset per un valore totale di €${totalValue.toLocaleString('it-IT')}`,
        "provider": {
          "@type": "Organization",
          "name": "Portfolio Balancer"
        }
      } : undefined
    };
    
    const script = document.createElement('script');
    script.id = 'dynamic-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
  }, [language, finalTitle, finalDescription, finalKeywords, finalCanonicalUrl, assets, strategies, activeTab, totalValue]);

  return null;
};