import { Language } from '../types/language';
import { Asset, Strategy } from '../types/portfolio';
import { getTranslation } from '../translations';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  structuredData: any;
}

export const generateSEOData = (
  language: Language,
  activeTab: string,
  assets: Asset[] = [],
  strategies: Strategy[] = []
): SEOData => {
  const t = (key: string) => getTranslation(language, key);
  const baseUrl = 'https://portfolio-balancer.netlify.app';
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const assetTypes = [...new Set(assets.map(a => a.type))];
  
  let title = t('appTitle');
  let description = t('seoDescription');
  let keywords = t('seoKeywords');
  let canonicalUrl = baseUrl;
  
  // Customize based on active tab
  switch (activeTab) {
    case 'portfolio':
      if (assets.length > 0) {
        title = `${t('portfolio')} - ${assets.length} Asset (€${totalValue.toLocaleString('it-IT')}) | ${t('appTitle')}`;
        description = `Gestisci il tuo portfolio di ${assets.length} asset per un valore di €${totalValue.toLocaleString('it-IT')}. Include ${assetTypes.join(', ')}.`;
        keywords = `portfolio, ${assetTypes.join(', ')}, investimenti, ${t('seoKeywords')}`;
      } else {
        title = `${t('portfolio')} - Crea il tuo Portfolio | ${t('appTitle')}`;
        description = `Inizia a costruire il tuo portfolio di investimenti. Aggiungi asset, analizza rischi e ottimizza le allocazioni.`;
      }
      canonicalUrl = `${baseUrl}/#portfolio`;
      break;
      
    case 'strategies':
      title = `${t('strategies')} - ${strategies.length} Strategie AI | ${t('appTitle')}`;
      description = strategies.length > 0 
        ? `Confronta ${strategies.length} strategie di investimento generate dall'AI. Analizza rendimenti, rischi e allocazioni ottimali.`
        : `Genera strategie di investimento personalizzate con l'intelligenza artificiale. Confronta rendimenti e ottimizza il tuo portfolio.`;
      keywords = `strategie investimento, AI, confronto strategie, ${t('seoKeywords')}`;
      canonicalUrl = `${baseUrl}/#strategies`;
      break;
      
    case 'ai':
      title = `${t('aiAssistant')} - Analisi Portfolio AI | ${t('appTitle')}`;
      description = `Utilizza l'intelligenza artificiale per analizzare il tuo portfolio. Ricevi raccomandazioni personalizzate e insights di mercato.`;
      keywords = `AI assistant, analisi portfolio, intelligenza artificiale, ${t('seoKeywords')}`;
      canonicalUrl = `${baseUrl}/#ai`;
      break;
  }
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "inLanguage": language,
    "isPartOf": {
      "@type": "WebSite",
      "name": t('appTitle'),
      "url": baseUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t(activeTab),
          "item": canonicalUrl
        }
      ]
    }
  };
  
  // Add specific structured data based on content
  if (activeTab === 'portfolio' && assets.length > 0) {
    structuredData["mainEntity"] = {
      "@type": "FinancialProduct",
      "name": "Portfolio di Investimenti",
      "description": `Portfolio con ${assets.length} asset`,
      "provider": {
        "@type": "Organization",
        "name": t('appTitle')
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    };
  }
  
  return {
    title,
    description,
    keywords,
    canonicalUrl,
    structuredData
  };
};

export const updatePageSEO = (seoData: SEOData) => {
  // Update document title
  document.title = seoData.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seoData.description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', seoData.keywords);
  }
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seoData.canonicalUrl);
  
  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seoData.title);
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', seoData.description);
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', seoData.canonicalUrl);
  
  // Update Twitter Cards
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', seoData.title);
  
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', seoData.description);
  
  // Update structured data
  const existingStructuredData = document.querySelector('#dynamic-seo-data');
  if (existingStructuredData) {
    existingStructuredData.remove();
  }
  
  const script = document.createElement('script');
  script.id = 'dynamic-seo-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(seoData.structuredData);
  document.head.appendChild(script);
};

export const generateSitemap = (languages: string[] = ['it', 'en', 'es', 'fr', 'de', 'zh']) => {
  const baseUrl = 'https://portfolio-balancer.netlify.app';
  const pages = ['', '#portfolio', '#strategies', '#ai'];
  const lastmod = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach(page => {
    const url = `${baseUrl}/${page}`;
    const priority = page === '' ? '1.0' : page === '#portfolio' ? '0.9' : '0.8';
    
    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>`;
    
    // Add hreflang for each language
    languages.forEach(lang => {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}?lang=${lang}"/>`;
    });
    
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
  </url>`;
  });
  
  sitemap += `
</urlset>`;
  
  return sitemap;
};