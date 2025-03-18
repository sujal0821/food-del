/**
 * Application configuration
 */
import { isProduction } from './utils/environment';

// Determine the API URL based on environment
const determineApiUrl = () => {
  // Production API URL
  if (isProduction()) {
    return "https://food-del-backend-hjel.onrender.com";
  }
  
  // Development API URL
  return "http://localhost:4000";
};

// API base URL - automatically determined based on environment
const API_BASE_URL = determineApiUrl();

// Log the selected API URL
console.log('Using API URL:', API_BASE_URL);

export { API_BASE_URL }; 