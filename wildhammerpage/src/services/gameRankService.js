/**
 * Game Rank Service
 * Service สำหรับดึงข้อมูลจาก API endpoints
 */

// ตรวจสอบและดึงค่า environment variables
const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const TOKEN = process.env.TOKEN || process.env.NEXT_PUBLIC_TOKEN || "bigohm";

if (!BASE_URL) {
  console.warn('BASE_URL is not defined in environment variables');
}

if (!TOKEN) {
  console.warn('TOKEN is not defined in environment variables');
}

/**
 * Base API configuration
 */
const API_CONFIG = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'token': TOKEN,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, token'
  }
};

/**
 * Generic API call function
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Additional fetch options
 * @returns {Promise<any>} API response data
 */
async function apiCall(endpoint, options = {}) {
  try {
    // เพิ่ม timestamp เพื่อป้องกัน cache
    const timestamp = new Date().getTime();
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${API_CONFIG.baseURL}${endpoint}${separator}_t=${timestamp}`;
    
    const config = {
      method: 'GET',
      mode: 'cors', // เปิดใช้งาน CORS
      credentials: 'omit', // ไม่ส่ง cookies
      headers: {        
        ...API_CONFIG.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...options.headers
      },
      cache: 'no-store', // ป้องกันการ cache
      ...options
    };

    console.log(`Making API call to: ${url}`);
    
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Game Rank Service Object
 */
const gameRankService = {
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
      console.log('Arena ranking data retrieved successfully');
      return data;
    } catch (error) {
      console.error('Failed to fetch arena ranking:', error);
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
      console.log('Level ranking data retrieved successfully');
      return data;
    } catch (error) {
      console.error('Failed to fetch level ranking:', error);
      throw new Error('ไม่สามารถดึงข้อมูล Level Ranking ได้');
    }
  },

  /**
   * ดึงข้อมูลทั้งสอง endpoints พร้อมกัน
   * @returns {Promise<{arena: any, level: any}>} Combined ranking data
   */
  async getAllRankings() {
    try {
      console.log('Fetching all rankings...');
      
      const [arenaData, levelData] = await Promise.all([
        this.getArenaRanking(),
        this.getLevelRanking()
      ]);

      return {
        arena: arenaData,
        level: levelData
      };
    } catch (error) {
      console.error('Failed to fetch all rankings:', error);
      throw new Error('ไม่สามารถดึงข้อมูล Ranking ทั้งหมดได้');
    }
  }
};

export default gameRankService;
