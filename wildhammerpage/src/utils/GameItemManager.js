import GameItemData from '../../public/bundle/config/game/GameItem.json'

/**
 * GameItemManager - คลาสสำหรับจัดการข้อมูล Game Items
 * รับ id และดึงข้อมูลจาก GameItem.json
 */
class GameItemManager {
  constructor() {
    this.itemData = GameItemData
  }

  /**
   * ดึงข้อมูล item ตาม ID
   * @param {string|number} id - ID ของ item
   * @returns {Object|null} ข้อมูล item หรือ null ถ้าไม่พบ
   */
  getItemById(id) {
    const itemId = String(id)
    return this.itemData[itemId] || null
  }

  /**
   * ดึงข้อมูล item หลายตัวตาม array ของ IDs
   * @param {Array} ids - Array ของ item IDs
   * @returns {Array} Array ของข้อมูล item
   */
  getItemsByIds(ids) {
    if (!Array.isArray(ids)) {
      return []
    }

    return ids.map(id => {
      const item = this.getItemById(id)
      return item ? { id, ...item } : null
    }).filter(Boolean)
  }

  /**
   * ค้นหา item ตามชื่อ
   * @param {string} name - ชื่อ item ที่ต้องการค้นหา
   * @returns {Array} Array ของ item ที่ตรงกับชื่อ
   */
  searchItemByName(name) {
    if (!name || typeof name !== 'string') {
      return []
    }

    const results = []
    const searchTerm = name.toLowerCase()

    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.name && item.name.toLowerCase().includes(searchTerm)) {
        results.push({ id, ...item })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล item ตาม type
   * @param {string} type - Type ที่ต้องการค้นหา
   * @returns {Array} Array ของ item ที่มี type ตรงกัน
   */
  getItemsByType(type) {
    if (!type || typeof type !== 'string') {
      return []
    }

    const results = []
    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.type === type) {
        results.push({ id, ...item })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล item ตาม category
   * @param {string} category - Category ที่ต้องการค้นหา
   * @returns {Array} Array ของ item ที่มี category ตรงกัน
   */
  getItemsByCategory(category) {
    if (!category || typeof category !== 'string') {
      return []
    }

    const results = []
    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.category === category) {
        results.push({ id, ...item })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล item ตาม rarity
   * @param {string} rarity - Rarity ที่ต้องการค้นหา
   * @returns {Array} Array ของ item ที่มี rarity ตรงกัน
   */
  getItemsByRarity(rarity) {
    if (!rarity || typeof rarity !== 'string') {
      return []
    }

    const results = []
    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.rarity === rarity) {
        results.push({ id, ...item })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล item ทั้งหมด
   * @returns {Array} Array ของ item ทั้งหมด
   */
  getAllItems() {
    return Object.keys(this.itemData).map(id => ({
      id,
      ...this.itemData[id]
    }))
  }

  /**
   * นับจำนวน item ทั้งหมด
   * @returns {number} จำนวน item ทั้งหมด
   */
  getTotalItems() {
    return Object.keys(this.itemData).length
  }

  /**
   * ตรวจสอบว่า item ID มีอยู่หรือไม่
   * @param {string|number} id - Item ID
   * @returns {boolean} true ถ้ามีอยู่, false ถ้าไม่มี
   */
  hasItem(id) {
    const itemId = String(id)
    return itemId in this.itemData
  }

  /**
   * ดึงข้อมูล item พร้อมกับข้อมูลเพิ่มเติม
   * @param {string|number} id - Item ID
   * @returns {Object|null} ข้อมูล item พร้อมข้อมูลเพิ่มเติม
   */
  getItemWithDetails(id) {
    const item = this.getItemById(id)
    if (!item) {
      return null
    }

    return {
      id: String(id),
      ...item,
      // เพิ่มข้อมูลที่คำนวณได้
      isStackable: item.stackable !== false, // default true ถ้าไม่ระบุ
      displayName: item.name || `Item ${id}`,
      description: item.description || 'No description available'
    }
  }

  /**
   * ดึงข้อมูล item ตาม value range
   * @param {number} minValue - Value ต่ำสุด
   * @param {number} maxValue - Value สูงสุด
   * @returns {Array} Array ของ item ที่อยู่ใน range
   */
  getItemsByValueRange(minValue, maxValue) {
    if (typeof minValue !== 'number' || typeof maxValue !== 'number') {
      return []
    }

    const results = []
    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.value && item.value >= minValue && item.value <= maxValue) {
        results.push({ id, ...item })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล item ที่มี value สูงสุด
   * @returns {Object|null} item ที่มี value สูงสุด
   */
  getItemWithMaxValue() {
    let maxItem = null
    let maxValue = -1

    Object.keys(this.itemData).forEach(id => {
      const item = this.itemData[id]
      if (item.value && item.value > maxValue) {
        maxValue = item.value
        maxItem = { id, ...item }
      }
    })

    return maxItem
  }

  /**
   * ดึงรายการ categories ทั้งหมดที่มี
   * @returns {Array} Array ของ categories
   */
  getAllCategories() {
    const categories = new Set()
    Object.values(this.itemData).forEach(item => {
      if (item.category) {
        categories.add(item.category)
      }
    })
    return Array.from(categories).sort()
  }

  /**
   * ดึงรายการ types ทั้งหมดที่มี
   * @returns {Array} Array ของ types
   */
  getAllTypes() {
    const types = new Set()
    Object.values(this.itemData).forEach(item => {
      if (item.type) {
        types.add(item.type)
      }
    })
    return Array.from(types).sort()
  }

  /**
   * ดึงรายการ rarities ทั้งหมดที่มี
   * @returns {Array} Array ของ rarities
   */
  getAllRarities() {
    const rarities = new Set()
    Object.values(this.itemData).forEach(item => {
      if (item.rarity) {
        rarities.add(item.rarity)
      }
    })
    return Array.from(rarities).sort()
  }

  /**
   * ดึง icon URL สำหรับ item
   * @param {string|number} id - Item ID
   * @returns {string|null} URL ของ icon หรือ null
   */
  getItemIcon(id) {
    const item = this.getItemById(id)
    if (!item || !item.icon) {
      return null
    }
    
    // ลองหลาย path ที่เป็นไปได้
    const possiblePaths = [
      `/bundle/gui/main/atlas/item/${item.icon}.png`,
      `/bundle/gui/main/atlas/items/${item.icon}.png`,
      `/public/bundle/gui/main/atlas/item/${item.icon}.png`
    ]
    
    // ใช้ path แรก (ที่น่าจะถูกต้องที่สุด)
    return possiblePaths[0]
  }

  /**
   * ดึงข้อมูล item สำหรับแสดงใน UI
   * @param {string|number} id - Item ID
   * @returns {Object|null} ข้อมูล item สำหรับ UI
   */
  getItemForUI(id) {
    try {
      const item = this.getItemWithDetails(id)
      if (!item) {
        return null
      }

      return {
        id: item.id,
        name: item.displayName,
        description: item.description,
        type: item.type || 'Unknown',
        category: item.category || 'General',
        rarity: item.rarity || 'Common',
        value: item.value || 0,
        stackable: item.isStackable,
        icon_url: this.getItemIcon(id),
        original_data: item
      }
    } catch (error) {
      console.error('Error getting item for UI:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล item หลายตัวสำหรับแสดงใน UI
   * @param {Array} ids - Array ของ item IDs
   * @returns {Array} Array ของข้อมูล item สำหรับ UI
   */
  getItemsForUI(ids) {
    try {
      return ids.map(id => this.getItemForUI(id)).filter(Boolean)
    } catch (error) {
      console.error('Error getting items for UI:', error)
      return []
    }
  }
}

// สร้าง instance เดียวสำหรับใช้ทั่วทั้งแอป
const gameItemManager = new GameItemManager()

export default gameItemManager
export { GameItemManager }