/**
 * Services Index
 * Export all services from a single entry point
 */

export { default as gameRankService } from './gameRankService.js';
export { default as gameRankProxyService } from './gameRankProxyService.js';
export { default as preRegisterService } from './preregisterService.js';
// Note: emailService is server-side only, imported directly in API routes

// Re-export utility functions for convenience
export {
  handleApiError,
  createApiResponse,
  validateApiConfig,
  fetchWithTimeout,
  retryApiCall
} from '../utils/apiUtils.js';
