# Game Rank Service

Service สำหรับดึงข้อมูลจาก Game Ranking API

## การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ root ของโปรเจค และเพิ่มค่าต่อไปนี้:

```env
# API Configuration
BASE_URL=https://your-api-base-url.com
TOKEN=your-api-token-here
```

หรือสำหรับ Next.js สามารถใช้ `NEXT_PUBLIC_` prefix ได้:

```env
NEXT_PUBLIC_BASE_URL=https://your-api-base-url.com
NEXT_PUBLIC_TOKEN=your-api-token-here
```

## API Endpoints

Service นี้รองรับ 2 endpoints:

- `/api/gameRank/arena` - Arena Ranking
- `/api/gameRank/level` - Level Ranking

## การใช้งาน

### Basic Usage

```javascript
import { gameRankService } from '../services/index.js';

// ดึงข้อมูล Arena Ranking
const arenaData = await gameRankService.getArenaRanking();

// ดึงข้อมูล Level Ranking
const levelData = await gameRankService.getLevelRanking();

// ดึงข้อมูลทั้งสองพร้อมกัน
const allData = await gameRankService.getAllRankings();
```

### Error Handling

```javascript
import { gameRankService, handleApiError } from '../services/index.js';

try {
  const data = await gameRankService.getArenaRanking();
  console.log('Success:', data);
} catch (error) {
  const errorResponse = handleApiError(error, 'Arena Ranking');
  console.error('Error:', errorResponse);
}
```

### Configuration Validation

```javascript
import { validateApiConfig } from '../services/index.js';

const validation = validateApiConfig();
if (!validation.isValid) {
  console.error('Configuration errors:', validation.errors);
}
```

## API Methods

### gameRankService.getArenaRanking()

ดึงข้อมูล Arena Ranking

**Returns:** `Promise<any>` - Arena ranking data

**Throws:** Error ถ้าไม่สามารถดึงข้อมูลได้

### gameRankService.getLevelRanking()

ดึงข้อมูล Level Ranking

**Returns:** `Promise<any>` - Level ranking data

**Throws:** Error ถ้าไม่สามารถดึงข้อมูลได้

### gameRankService.getAllRankings()

ดึงข้อมูลทั้งสอง endpoints พร้อมกัน

**Returns:** `Promise<{arena: any, level: any}>` - Combined ranking data

**Throws:** Error ถ้าไม่สามารถดึงข้อมูลได้

## Utility Functions

### handleApiError(error, context)

จัดการ API errors และแปลงเป็น user-friendly messages

**Parameters:**
- `error` (Error) - Error object
- `context` (string) - Context where error occurred

**Returns:** `{success: boolean, message: string, error: string}`

### validateApiConfig()

ตรวจสอบการตั้งค่า API configuration

**Returns:** `{isValid: boolean, errors: string[], config: object}`

### fetchWithTimeout(url, options, timeout)

Fetch with timeout support

**Parameters:**
- `url` (string) - Request URL
- `options` (object) - Fetch options
- `timeout` (number) - Timeout in milliseconds (default: 10000)

### retryApiCall(apiCall, maxRetries, baseDelay)

Retry API call with exponential backoff

**Parameters:**
- `apiCall` (Function) - API call function
- `maxRetries` (number) - Maximum retries (default: 3)
- `baseDelay` (number) - Base delay in ms (default: 1000)

## Error Types

- `NETWORK_ERROR` - ไม่มีการเชื่อมต่ออินเทอร์เน็ต
- `UNAUTHORIZED` - ไม่ได้รับอนุญาต (401)
- `FORBIDDEN` - ไม่มีสิทธิ์เข้าถึง (403)
- `NOT_FOUND` - ไม่พบข้อมูล (404)
- `SERVER_ERROR` - ข้อผิดพลาดเซิร์ฟเวอร์ (500)
- `HTTP_ERROR` - HTTP error อื่นๆ
- `UNKNOWN_ERROR` - ข้อผิดพลาดที่ไม่ทราบสาเหตุ

## Examples

ดูตัวอย่างการใช้งานเพิ่มเติมได้ที่ `src/examples/gameRankUsage.js`

```javascript
import { examples } from '../examples/gameRankUsage.js';

// ทดสอบการดึงข้อมูล Arena Ranking
await examples.arenaRanking();

// ทดสอบ workflow ทั้งหมด
await examples.completeWorkflow();
```
