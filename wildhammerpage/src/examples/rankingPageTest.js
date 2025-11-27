/**
 * Test Script for Ranking Page API Integration
 * สคริปต์สำหรับทดสอบการทำงานของ API ในหน้า Ranking
 */

import { gameRankService, validateApiConfig } from '../services/index.js';

/**
 * ทดสอบการเชื่อมต่อ API สำหรับหน้า Ranking
 */
export async function testRankingPageAPI() {
  console.log('=== Testing Ranking Page API Integration ===\n');

  // 1. ตรวจสอบ API Configuration
  console.log('1. Validating API Configuration...');
  const configValidation = validateApiConfig();
  
  if (!configValidation.isValid) {
    console.error('❌ API Configuration Error:');
    configValidation.errors.forEach(error => console.error(`   - ${error}`));
    console.log('\n📋 Required Environment Variables:');
    console.log('   BASE_URL=https://your-api-base-url.com');
    console.log('   TOKEN=your-api-token-here');
    console.log('\n   Or for Next.js:');
    console.log('   NEXT_PUBLIC_BASE_URL=https://your-api-base-url.com');
    console.log('   NEXT_PUBLIC_TOKEN=your-api-token-here');
    return false;
  }

  console.log('✅ API Configuration is valid');
  console.log(`   Base URL: ${configValidation.config.baseUrl}`);
  console.log(`   Has Token: ${configValidation.config.hasToken}`);

  // 2. ทดสอบ Level Ranking API
  console.log('\n2. Testing Level Ranking API...');
  try {
    const levelData = await gameRankService.getLevelRanking();
    console.log('✅ Level Ranking API works');
    console.log(`   Data type: ${typeof levelData}`);
    console.log(`   Is Array: ${Array.isArray(levelData)}`);
    
    if (Array.isArray(levelData) && levelData.length > 0) {
      console.log(`   Records count: ${levelData.length}`);
      console.log(`   Sample record:`, JSON.stringify(levelData[0], null, 2));
    } else if (levelData) {
      console.log(`   Data structure:`, Object.keys(levelData));
    }
  } catch (error) {
    console.error('❌ Level Ranking API failed:', error.message);
  }

  // 3. ทดสอบ Arena Ranking API
  console.log('\n3. Testing Arena Ranking API...');
  try {
    const arenaData = await gameRankService.getArenaRanking();
    console.log('✅ Arena Ranking API works');
    console.log(`   Data type: ${typeof arenaData}`);
    console.log(`   Is Array: ${Array.isArray(arenaData)}`);
    
    if (Array.isArray(arenaData) && arenaData.length > 0) {
      console.log(`   Records count: ${arenaData.length}`);
      console.log(`   Sample record:`, JSON.stringify(arenaData[0], null, 2));
    } else if (arenaData) {
      console.log(`   Data structure:`, Object.keys(arenaData));
    }
  } catch (error) {
    console.error('❌ Arena Ranking API failed:', error.message);
  }

  // 4. ทดสอบการดึงข้อมูลทั้งสอง API พร้อมกัน
  console.log('\n4. Testing Combined API Call...');
  try {
    const allData = await gameRankService.getAllRankings();
    console.log('✅ Combined API call works');
    console.log(`   Arena data available: ${!!allData.arena}`);
    console.log(`   Level data available: ${!!allData.level}`);
    
    if (allData.arena && Array.isArray(allData.arena)) {
      console.log(`   Arena records: ${allData.arena.length}`);
    }
    if (allData.level && Array.isArray(allData.level)) {
      console.log(`   Level records: ${allData.level.length}`);
    }
  } catch (error) {
    console.error('❌ Combined API call failed:', error.message);
  }

  console.log('\n=== Test Complete ===');
  return true;
}

/**
 * ตรวจสอบรูปแบบข้อมูลที่ต้องการสำหรับหน้า Ranking
 */
export function validateRankingDataFormat(data, type = 'level') {
  console.log(`\n=== Validating ${type} Data Format ===`);

  if (!Array.isArray(data)) {
    console.error('❌ Data should be an array');
    return false;
  }

  if (data.length === 0) {
    console.warn('⚠️ Data array is empty');
    return true;
  }

  const sampleItem = data[0];
  
  // ตรวจสอบ API format (raw data จาก API)
  const apiRequiredFields = {
    level: ['id', 'roleid', 'info', 'val'],
    arena: ['id', 'roleid', 'info', 'val']
  };

  // ตรวจสอบ Transformed format (data หลังจากแปลงแล้ว)
  const transformedRequiredFields = {
    level: ['rank', 'name', 'level', 'roleId'],
    arena: ['rank', 'name', 'level', 'wins', 'losses', 'winRate']
  };

  // ตรวจสอบว่าเป็น API format หรือ transformed format
  const hasApiFormat = apiRequiredFields[type]?.some(field => field in sampleItem);
  const hasTransformedFormat = transformedRequiredFields[type]?.some(field => field in sampleItem);

  let required = [];
  let formatType = '';

  if (hasApiFormat) {
    required = apiRequiredFields[type] || [];
    formatType = 'API format';
  } else if (hasTransformedFormat) {
    required = transformedRequiredFields[type] || [];
    formatType = 'Transformed format';
  } else {
    console.error('❌ Unknown data format');
    console.log('Available fields:', Object.keys(sampleItem));
    return false;
  }

  const missing = required.filter(field => {
    if (field === 'info') {
      return !(field in sampleItem) || !sampleItem[field]?.n;
    }
    return !(field in sampleItem);
  });

  if (missing.length > 0) {
    console.error(`❌ Missing required fields for ${formatType}: ${missing.join(', ')}`);
    console.log('Available fields:', Object.keys(sampleItem));
    return false;
  }

  console.log(`✅ Data format is valid (${formatType})`);
  console.log(`   Sample item structure: ${Object.keys(sampleItem).join(', ')}`);
  
  if (formatType === 'API format' && sampleItem.info) {
    console.log(`   Player name: ${sampleItem.info.n}`);
    console.log(`   Level: ${sampleItem.val}`);
    console.log(`   Role ID: ${sampleItem.roleid}`);
  }
  
  return true;
}

/**
 * สร้างข้อมูลตัวอย่างในรูปแบบที่ถูกต้อง
 */
export function generateSampleData() {
  return {
    // API format (raw data from gameRank/level endpoint)
    apiFormat: {
      level: [
        {
          id: 1,
          roleid: "role_001",
          info: { n: "DragonSlayer99" },
          val: 85
        },
        {
          id: 2,
          roleid: "role_002",
          info: { n: "ShadowMage" },
          val: 84
        }
      ],
      arena: [
        {
          id: 1,
          roleid: "role_001",
          info: { n: "PvPKing" },
          val: 1250
        },
        {
          id: 2,
          roleid: "role_002",
          info: { n: "ArenaChamp" },
          val: 1180
        }
      ]
    },
    
    // Transformed format (after processing for UI)
    transformedFormat: {
      level: [
        {
          rank: 1,
          name: "DragonSlayer99",
          level: 85,
          roleId: "role_001",
          // avatar: "⭐",
          class: "Adventurer",
          guild: "-",
          power: 85000
        },
        {
          rank: 2,
          name: "ShadowMage",
          level: 84,
          roleId: "role_002",
          // avatar: "⭐",
          class: "Adventurer",
          guild: "-",
          power: 84000
        }
      ],
      arena: [
        {
          rank: 1,
          name: "PvPKing",
          level: 80,
          roleId: "role_001",
          wins: 1250,
          losses: 45,
          winRate: 96.5
        },
        {
          rank: 2,
          name: "ArenaChamp",
          level: 79,
          roleId: "role_002",
          wins: 1180,
          losses: 78,
          winRate: 93.8
        }
      ]
    }
  };
}

// Export สำหรับการใช้งานง่าย
export const rankingTests = {
  testAPI: testRankingPageAPI,
  validateFormat: validateRankingDataFormat,
  sampleData: generateSampleData
};
