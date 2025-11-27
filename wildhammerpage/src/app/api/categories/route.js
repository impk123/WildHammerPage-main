import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = [
      { id: 'item', name: 'ไอเท็ม', folder: 'item', icon: 'Package', color: 'blue', desc: 'วัสดุและไอเท็มทั่วไป' },
      { id: 'weapon', name: 'อาวุธ', folder: 'wuqi', icon: 'Sword', color: 'red', desc: 'อาวุธสำหรับการต่อสู้' },
      { id: 'armor', name: 'เสื้อผ้า', folder: 'yifu', icon: 'Shirt', color: 'purple', desc: 'เสื้อผ้าป้องกัน' },
      { id: 'pants', name: 'กางเกง', folder: 'kuzi', icon: 'Shield', color: 'green', desc: 'กางเกงป้องกัน' },
      { id: 'shoes', name: 'รองเท้า', folder: 'xiezi', icon: 'Zap', color: 'orange', desc: 'รองเท้าเพิ่มความเร็ว' },
      { id: 'hat', name: 'หมวก', folder: 'maozi', icon: 'Crown', color: 'yellow', desc: 'หมวกปกป้องศีรษะ' },
      { id: 'ring', name: 'แหวน', folder: 'jiezhi', icon: 'Gem', color: 'pink', desc: 'แหวนเพิ่มพลัง' },
      { id: 'skill', name: 'สกิล', folder: 'skill', icon: 'Star', color: 'indigo', desc: 'ทักษะพิเศษ' },
      { id: 'buff', name: 'บัฟ', folder: 'buff', icon: 'Award', color: 'teal', desc: 'เอฟเฟกต์เสริม' }
    ];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
