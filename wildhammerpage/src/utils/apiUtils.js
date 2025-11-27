/**
 * API Utility Functions
 * ฟังก์ชันช่วยเหลือสำหรับการจัดการ API calls
 */

/**
 * Handle API errors with user-friendly messages
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {object} Formatted error response
 */
export function handleApiError(error, context = 'API call') {
  console.error(`${context} error:`, error);
  
  // Network errors
  if (!navigator.onLine) {
    return {
      success: false,
      message: 'ไม่มีการเชื่อมต่ออินเทอร์เน็ต กรุณาตรวจสอบการเชื่อมต่อ',
      error: 'NETWORK_ERROR'
    };
  }

  // HTTP errors
  if (error.message.includes('HTTP error!')) {
    const statusMatch = error.message.match(/status: (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : null;

    switch (status) {
      case 401:
        return {
          success: false,
          message: 'ไม่ได้รับอนุญาตในการเข้าถึง กรุณาตรวจสอบ Token',
          error: 'UNAUTHORIZED'
        };
      case 403:
        return {
          success: false,
          message: 'ไม่มีสิทธิ์ในการเข้าถึงข้อมูลนี้',
          error: 'FORBIDDEN'
        };
      case 404:
        return {
          success: false,
          message: 'ไม่พบข้อมูลที่ต้องการ',
          error: 'NOT_FOUND'
        };
      case 500:
        return {
          success: false,
          message: 'เกิดข้อผิดพลาดในระบบเซิร์ฟเวอร์',
          error: 'SERVER_ERROR'
        };
      default:
        return {
          success: false,
          message: `เกิดข้อผิดพลาด (${status})`,
          error: 'HTTP_ERROR'
        };
    }
  }

  // Generic errors
  return {
    success: false,
    message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
    error: 'UNKNOWN_ERROR',
    details: error.message
  };
}

/**
 * Create a standardized API response
 * @param {any} data - Response data
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @returns {object} Standardized response
 */
export function createApiResponse(data = null, success = true, message = '') {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Validate API configuration
 * @returns {object} Validation result
 */
export function validateApiConfig() {
  const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  const TOKEN = process.env.TOKEN || process.env.NEXT_PUBLIC_TOKEN;

  const errors = [];

  if (!BASE_URL) {
    errors.push('BASE_URL is not configured in environment variables');
  }

  if (!TOKEN) {
    errors.push('TOKEN is not configured in environment variables');
  }

  // Validate BASE_URL format
  if (BASE_URL) {
    try {
      new URL(BASE_URL);
    } catch (e) {
      errors.push('BASE_URL is not a valid URL format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: {
      baseUrl: BASE_URL,
      hasToken: !!TOKEN
    }
  };
}

/**
 * Add request timeout to fetch
 * @param {string} url - Request URL
 * @param {object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise} Fetch promise with timeout
 */
export function fetchWithTimeout(url, options = {}, timeout = 10000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

/**
 * Retry API call with exponential backoff
 * @param {Function} apiCall - API call function
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} baseDelay - Base delay in milliseconds (default: 1000)
 * @returns {Promise} API call result
 */
export async function retryApiCall(apiCall, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }

      // Don't retry for certain error types
      if (error.message.includes('401') || error.message.includes('403')) {
        break;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`API call failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
