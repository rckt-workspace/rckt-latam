/**
 * SEO Configuration for RCKT LATAM
 * Search engine optimization settings
 */

export const seoConfig = {
  // Site metadata
  siteName: 'RCKT LATAM',
  siteUrl: 'https://rcktlatam.com',
  
  // Default meta tags
  defaultMeta: {
    title: 'RCKT LATAM - Soluciones de Marketing Digital',
    description: 'Plataforma integral de marketing digital y asesoría empresarial para América Latina',
    keywords: 'marketing digital, asesoría empresarial, LATAM',
  },
  
  // Open Graph settings
  ogImage: '/images/og-image.png',
  ogType: 'website',
  
  // Twitter Card settings
  twitterHandle: '@rckt_latam',
  twitterCardType: 'summary_large_image',
  
  // Canonical URL configuration
  canonicalUrl: true,
  
  // Robots settings
  robots: {
    index: true,
    follow: true,
  },
};

export default seoConfig;
