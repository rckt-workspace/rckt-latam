/**
 * Configuration barrel export
 * Central configuration for RCKT LATAM
 */

export { marketConfig, default as market } from './market';
export { seoConfig, default as seo } from './seo';
export { contactConfig, default as contact } from './contact';
export { featureConfig, default as features } from './features';

// Combined config object
export const config = {
  market: require('./market').marketConfig,
  seo: require('./seo').seoConfig,
  contact: require('./contact').contactConfig,
  features: require('./features').featureConfig,
};

export default config;
