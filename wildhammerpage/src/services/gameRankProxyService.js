/**
 * Game Rank Proxy Service
 * Service สำหรับดึงข้อมูลจาก API ผ่าน Next.js proxy เพื่อแก้ปัญหา CORS
 */

/**
 * Base API configuration
 */
const API_CONFIG = {
  baseURL: '/api/proxy', // ใช้ Next.js API route เป็น proxy
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Generic API call function with proxy
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Additional fetch options
 * @returns {Promise<any>} API response data
 */
async function apiCall(endpoint, options = {}) {
  try {
    // เพิ่ม timestamp เพื่อป้องกัน cache
    const timestamp = new Date().getTime();
    const separator = endpoint.includes('?') ? '&' : '?';
    const proxyUrl = `${API_CONFIG.baseURL}?endpoint=${encodeURIComponent(endpoint)}&_t=${timestamp}`;
    
    const config = {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        ...API_CONFIG.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...options.headers
      },
      cache: 'no-store',
      ...options
    };

    // console.log(`Making proxy API call to: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Proxy API call failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Game Rank Proxy Service Object
 */
const gameRankProxyService = {
  /**
   * ดึงข้อมูล Arena Ranking
   * @returns {Promise<any>} Arena ranking data
   */
  async getArenaRanking() {
    try {
      const data = await apiCall('/api/gameRank/arena', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      // console.log('Arena ranking data retrieved successfully via proxy');
      return data;
    } catch (error) {
      console.error('Failed to fetch arena ranking via proxy:', error);
      throw new Error('ไม่สามารถดึงข้อมูล Arena Ranking ได้');
    }
  },

  /**
   * ดึงข้อมูล Level Ranking
   * @returns {Promise<any>} Level ranking data
   */
  async getLevelRanking() {
    try {
      const data = await apiCall('/api/gameRank/level', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      // console.log('Level ranking data retrieved successfully via proxy');
      return data;
    } catch (error) {
      console.error('Failed to fetch level ranking via proxy:', error);
      throw new Error('ไม่สามารถดึงข้อมูล Level Ranking ได้');
    }
  },

  /**
   * ดึงข้อมูลทั้งสอง endpoints พร้อมกัน
   * @returns {Promise<{arena: any, level: any}>} Combined ranking data
   */
  async getAllRankings() {
    try {
      // console.log('Fetching all rankings via proxy...');
      
      const [arenaData, levelData] = await Promise.all([
        this.getArenaRanking(),
        this.getLevelRanking()
      ]);

      return {
        arena: arenaData,
        level: levelData
      };
    } catch (error) {
      console.error('Failed to fetch all rankings via proxy:', error);
      throw new Error('ไม่สามารถดึงข้อมูล Ranking ทั้งหมดได้');
    }
  }
};

export default gameRankProxyService;
