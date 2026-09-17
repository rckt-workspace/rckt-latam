/**
 * Configuration barrel export
 * Central configuration for RCKT LATAM
 */

import { marketConfig } from "./market";
import { seoConfig } from "./seo";
import { contactConfig } from "./contact";
import { featureConfig } from "./features";

export { marketConfig };
export { seoConfig };
export { contactConfig };
export { featureConfig };

// Combined config object
export const config = {
  market: marketConfig,
  seo: seoConfig,
  contact: contactConfig,
  features: featureConfig,
};

export default config;
