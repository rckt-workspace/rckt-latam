/**
 * Market Configuration for RCKT LATAM
 * Regional-specific market settings and metadata
 */

export const marketConfig = {
  // Region identifier
  region: 'LATAM',
  
  // Supported countries in LATAM
  countries: [
    { code: 'MX', name: 'Mexico', currency: 'MXN' },
    { code: 'CO', name: 'Colombia', currency: 'COP' },
    { code: 'AR', name: 'Argentina', currency: 'ARS' },
    { code: 'CL', name: 'Chile', currency: 'CLP' },
    { code: 'PE', name: 'Peru', currency: 'PEN' },
    { code: 'BR', name: 'Brazil', currency: 'BRL' },
  ],
  
  // Default language
  defaultLanguage: 'es',
  
  // Supported languages
  supportedLanguages: ['es', 'pt', 'en'],
  
  // Timezone
  timezone: 'America/Mexico_City',
  
  // Contact information
  supportEmail: 'support@rcktlatam.com',
  salesEmail: 'sales@rcktlatam.com',
  
  // Regional settings
  dateFormat: 'DD/MM/YYYY',
  numberFormat: {
    decimal: ',',
    thousands: '.',
  },
};

export default marketConfig;
