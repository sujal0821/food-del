/**
 * Environment detection utility
 */

export const isProduction = () => {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1';
};

export const isDevelopment = () => {
  return !isProduction();
};

export const getEnvironmentInfo = () => {
  return {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    isProduction: isProduction(),
    isDevelopment: isDevelopment(),
    fullUrl: window.location.href,
  };
};

// Log environment info when this module is loaded
console.log('Environment info:', getEnvironmentInfo()); 