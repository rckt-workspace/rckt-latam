/**
 * Feature Flags and Configuration for RCKT LATAM
 * Regional feature toggles and availability settings
 */

export const featureConfig = {
  // AI Chat features
  chat: {
    enabled: true,
    streaming: true,
    multiLanguage: true,
  },

  // Admin features
  admin: {
    enabled: true,
    analytics: true,
    userManagement: true,
    contentManagement: true,
  },

  // Regional specific features
  regional: {
    multiCurrency: true,
    taxCalculation: true,
    localization: true,
  },

  // Analytics and tracking
  analytics: {
    googleAnalytics: true,
    customTracking: true,
  },

  // Payment features (to be configured)
  payments: {
    enabled: false,
    methods: ["credit_card", "bank_transfer"],
  },

  // Beta features
  beta: {
    advancedAI: false,
    customReporting: false,
  },
};

export default featureConfig;
