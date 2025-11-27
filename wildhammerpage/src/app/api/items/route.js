import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache for loaded data
let itemsCache = null;
let equipCache = null;
let lastModified = null;

async function loadData() {
  const now = Date.now();
  
  // Return cached data if less than 5 minutes old
  if (itemsCache && equipCache && lastModified && (now - lastModified) < 5 * 60 * 1000) {
    return { items: itemsCache, equip: equipCache };
  }

  try {
    const itemsPath = path.join(process.cwd(), 'public/bundle/config/game/GameItem.json');
    const equipPath = path.join(process.cwd(), 'public/bundle/config/game/GameEquip.json');

    const [itemsData, equipData] = await Promise.all([
      fs.promises.readFile(itemsPath, 'utf8'),
      fs.promises.readFile(equipPath, 'utf8')
    ]);

    const items = JSON.parse(itemsData);
    const equip = JSON.parse(equipData);

    // Cache the data
    itemsCache = items;
    equipCache = equip;
    lastModified = now;

    return { items, equip };
  } catch (error) {
    console.error('Error loading game data:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'item';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'name';

    const { items, equip } = await loadData();

    let data = [];

    // Filter data based on category
    if (category === 'item') {
      data = Object.entries(items).map(([id, item]) => ({
        id,
        ...item,
        category: 'item'
      }));
    } else {
      data = Object.entries(equip)
        .filter(([id, item]) => {
          if (category === 'weapon') return item.pos === 1;
          if (category === 'armor') return item.pos === 2;
          if (category === 'hat') return item.pos === 3;
          if (category === 'ring') return item.pos === 4;
          if (category === 'pants') return item.pos === 5;
          if (category === 'shoes') return item.pos === 6;
          return false;
        })
        .map(([id, item]) => ({
          id,
          ...item,
          category
        }));
    }

    // Apply search filter
    if (search) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.dec && item.dec.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply sorting
    data.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name, 'th');
        case 'level':
          return (b.level || 0) - (a.level || 0);
        case 'quality':
          return (b.quality || 0) - (a.quality || 0);
        default:
          return 0;
      }
    });

    // Apply pagination
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      category,
      search,
      sort
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}
