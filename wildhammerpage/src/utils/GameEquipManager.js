import GameEquipData from '../../public/bundle/config/game/GameEquip.json'
import GameEquipPosData from '../../public/bundle/config/game/GameEquipPos.json'

/**
 * GameEquipManager - คลาสสำหรับจัดการข้อมูล Game Equipment
 * รับ id และดึงข้อมูลจาก GameEquip.json
 */
class GameEquipManager {
  constructor() {
    this.equipData = GameEquipData
    this.equipPosData = GameEquipPosData
  }

  /**
   * ดึงข้อมูล equipment ตาม ID
   * @param {string|number} id - ID ของ equipment
   * @returns {Object|null} ข้อมูล equipment หรือ null ถ้าไม่พบ
   */
  getEquipById(id) {
    const equipId = String(id)
    return this.equipData[equipId] || null
  }
  
  getEquipPosById(id) {
    const equipPosId = String(id)
    return this.equipPosData[equipPosId] || null
  }

  getEquipBGByIdq(qid) {
    if (qid && qid > 0 && qid < 11) {
      // ใช้ไฟล์ที่มีอยู่จริงในโฟลเดอร์
      const bgFiles = {
        1: "/bundle/common/texture/img_zbtb_1.png",
        2: "/bundle/common/texture/img_zbtb_2.png", 
        3: "/bundle/common/texture/img_zbtb_3.png",
        4: "/bundle/common/texture/img_zbtb_4.png",
        5: "/bundle/common/texture/img_zbtb_5.png",
        6: "/bundle/common/texture/img_zbtb_6.png",
        7: "/bundle/common/texture/img_zbtb_7.png",
        8: "/bundle/common/texture/img_zbtb_8.png",
        9: "/bundle/common/texture/img_zbtb_9.png",
        10: "/bundle/common/texture/img_zbtb_9.png"
      }
      return bgFiles[qid] || null
    }
    return null
  }

  getEquipIconByIdq(id,q) {
    try {
      const equipId = String(id)
      const data = this.equipData[equipId]
      
      if (!data || !data.pos || !data.icon) {
        return null
      }
      
      const pos = this.getEquipPosById(data.pos)
      
      if (!pos || !pos.iconFmt) {
        return null
      }
      
      return "/bundle/gui/main/atlas/" + pos.iconFmt + data.icon + ".png"
    } catch (error) {
      console.error('Error getting equip icon:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล equipment หลายตัวตาม array ของ IDs
   * @param {Array} ids - Array ของ equipment IDs
   * @returns {Array} Array ของข้อมูล equipment
   */
  getEquipsByIds(ids) {
    if (!Array.isArray(ids)) {
      return []
    }

    return ids.map(id => {
      const equip = this.getEquipById(id)
      return equip ? { id, ...equip } : null
    }).filter(Boolean)
  }

  /**
   * ค้นหา equipment ตามชื่อ
   * @param {string} name - ชื่อ equipment ที่ต้องการค้นหา
   * @returns {Array} Array ของ equipment ที่ตรงกับชื่อ
   */
  searchEquipByName(name) {
    if (!name || typeof name !== 'string') {
      return []
    }

    const results = []
    const searchTerm = name.toLowerCase()

    Object.keys(this.equipData).forEach(id => {
      const equip = this.equipData[id]
      if (equip.name && equip.name.toLowerCase().includes(searchTerm)) {
        results.push({ id, ...equip })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล equipment ตาม level
   * @param {number} level - Level ที่ต้องการค้นหา
   * @returns {Array} Array ของ equipment ที่มี level ตรงกัน
   */
  getEquipsByLevel(level) {
    if (typeof level !== 'number') {
      return []
    }

    const results = []
    Object.keys(this.equipData).forEach(id => {
      const equip = this.equipData[id]
      if (equip.level === level) {
        results.push({ id, ...equip })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล equipment ตาม position
   * @param {number} pos - Position ที่ต้องการค้นหา
   * @returns {Array} Array ของ equipment ที่มี position ตรงกัน
   */
  getEquipsByPosition(pos) {
    if (typeof pos !== 'number') {
      return []
    }

    const results = []
    Object.keys(this.equipData).forEach(id => {
      const equip = this.equipData[id]
      if (equip.pos === pos) {
        results.push({ id, ...equip })
      }
    })

    return results
  }

  /**
   * ดึงข้อมูล equipment ทั้งหมด
   * @returns {Array} Array ของ equipment ทั้งหมด
   */
  getAllEquips() {
    return Object.keys(this.equipData).map(id => ({
      id,
      ...this.equipData[id]
    }))
  }

  /**
   * นับจำนวน equipment ทั้งหมด
   * @returns {number} จำนวน equipment ทั้งหมด
   */
  getTotalEquips() {
    return Object.keys(this.equipData).length
  }

  /**
   * ดึงข้อมูล equipment ที่มี stats สูงสุด
   * @param {string} stat - ชื่อ stat ที่ต้องการ (hp, atk, def, atkspeed)
   * @returns {Object|null} equipment ที่มี stat สูงสุด
   */
  getEquipWithMaxStat(stat) {
    if (!['hp', 'atk', 'def', 'atkspeed'].includes(stat)) {
      return null
    }

    let maxEquip = null
    let maxValue = -1

    Object.keys(this.equipData).forEach(id => {
      const equip = this.equipData[id]
      if (equip[stat] && equip[stat] > maxValue) {
        maxValue = equip[stat]
        maxEquip = { id, ...equip }
      }
    })

    return maxEquip
  }

  /**
   * ดึงข้อมูล equipment ตาม range ของ level
   * @param {number} minLevel - Level ต่ำสุด
   * @param {number} maxLevel - Level สูงสุด
   * @returns {Array} Array ของ equipment ที่อยู่ใน range
   */
  getEquipsByLevelRange(minLevel, maxLevel) {
    if (typeof minLevel !== 'number' || typeof maxLevel !== 'number') {
      return []
    }

    const results = []
    Object.keys(this.equipData).forEach(id => {
      const equip = this.equipData[id]
      if (equip.level >= minLevel && equip.level <= maxLevel) {
        results.push({ id, ...equip })
      }
    })

    return results
  }

  /**
   * ตรวจสอบว่า equipment ID มีอยู่หรือไม่
   * @param {string|number} id - Equipment ID
   * @returns {boolean} true ถ้ามีอยู่, false ถ้าไม่มี
   */
  hasEquip(id) {
    const equipId = String(id)
    return equipId in this.equipData
  }

  /**
   * ดึงข้อมูล equipment พร้อมกับข้อมูลเพิ่มเติม
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment พร้อมข้อมูลเพิ่มเติม
   */
  getEquipWithDetails(id) {
    const equip = this.getEquipById(id)
    if (!equip) {
      return null
    }

    return {
      id: String(id),
      ...equip,
      // เพิ่มข้อมูลที่คำนวณได้
      totalStats: (equip.hp || 0) + (equip.atk || 0) + (equip.def || 0),
      isHighLevel: equip.level >= 10,
      rarity: this.getRarityByLevel(equip.level),
      category: this.getCategoryByPosition(equip.pos)
    }
  }

  /**
   * กำหนด rarity ตาม level
   * @param {number} level - Level ของ equipment
   * @returns {string} Rarity level
   */
  getRarityByLevel(level) {
    if (level >= 20) return 'Legendary'
    if (level >= 15) return 'Epic'
    if (level >= 10) return 'Rare'
    if (level >= 5) return 'Uncommon'
    return 'Common'
  }

  /**
   * กำหนด category ตาม position
   * @param {number} pos - Position ของ equipment
   * @returns {string} Category name
   */
  getCategoryByPosition(pos) {
    const categories = {
      1: 'Weapon',
      2: 'Armor',
      3: 'Accessory',
      4: 'Shield',
      5: 'Helmet'
    }
    return categories[pos] || 'Unknown'
  }
}

// สร้าง instance เดียวสำหรับใช้ทั่วทั้งแอป
const gameEquipManager = new GameEquipManager()

export default gameEquipManager
export { GameEquipManager }
