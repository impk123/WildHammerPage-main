/**
 * Pre-registration Service
 * Handles pre-registration email functionality
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

class PreRegisterService {
  /**
   * Get pre-registration statistics
   * @returns {Promise<Object>} Statistics data
   */
  async getStatistics() {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('getStatistics can only be called from client-side');
      }

      const response = await fetch(`${API_BASE_URL}/api/preregister`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch statistics');
      }

      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('Error fetching pre-registration statistics:', error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to fetch statistics';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to server';
      } else if (error.message.includes('HTTP error')) {
        errorMessage = `Server error: ${error.message}`;
      } else {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Register email for pre-registration
   * @param {Object} registrationData - Registration data
   * @param {string} registrationData.email - User email
   * @param {string} [registrationData.ip_address] - User IP address
   * @param {string} [registrationData.user_agent] - User agent string
   * @param {string} [registrationData.referral_source] - Referral source
   * @returns {Promise<Object>} Registration result
   */
  async registerEmail({ email, ip_address, user_agent, referral_source }) {
    try {
      // Get client info if not provided
      const clientInfo = {
        email: email,
        ip_address: ip_address || await this.getClientIP(),
        user_agent: user_agent || (typeof window !== 'undefined' ? window.navigator.userAgent : null),
        referral_source: referral_source || this.getReferralSource()
      };

      const response = await fetch(`${API_BASE_URL}/api/preregister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientInfo),
      });

      const data = await response.json();
      
      // Return the response as-is, don't throw error
      return {
        success: data.success,
        data: data.data,
        message: data.message,
        error: data.error
      };
    } catch (error) {
      console.error('Error registering email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification result
   */
  async verifyEmail(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/preregister/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email');
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('Error verifying email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get client IP address (simplified version)
   * @returns {Promise<string|null>} Client IP or null
   */
  async getClientIP() {
    try {
      // For client-side, we can't get real IP, so return null
      // In production, you might want to use a service like ipify.org
      if (typeof window !== 'undefined') {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      }
      return null;
    } catch (error) {
      console.warn('Could not fetch client IP:', error);
      return null;
    }
  }

  /**
   * Get referral source from URL parameters or document referrer
   * @returns {string|null} Referral source
   */
  getReferralSource() {
    if (typeof window === 'undefined') return null;

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source');
    if (utm_source) return utm_source;

    // Check document referrer
    const referrer = document.referrer;
    if (referrer) {
      try {
        const referrerHost = new URL(referrer).hostname;
        if (referrerHost !== window.location.hostname) {
          return referrerHost;
        }
      } catch (error) {
        console.warn('Could not parse referrer:', error);
      }
    }

    return 'direct';
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Create and export singleton instance
const preRegisterService = new PreRegisterService();
export default preRegisterService;
