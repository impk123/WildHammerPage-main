'use client';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomCursor from '@/components/CustomCursor';
import { 
  Package, 
  Sword, 
  Shirt, 
  Zap, 
  Crown, 
  Gem, 
  Star, 
  Filter,
  Search,
  Grid,
  List,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Shield,
  Award
} from 'lucide-react';

const ItemsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('item');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name_asc'); // 'name_asc', 'name_desc', 'name_th_asc', 'name_th_desc', 'level_asc', 'level_desc', 'quality_asc', 'quality_desc'
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [categories, setCategories] = useState([]);
  const [selectedItemStats, setSelectedItemStats] = useState(null);

  // Icon mapping for categories
  const iconMap = {
    Package, Sword, Shirt, Shield, Zap, Crown, Gem, Star, Award
  };

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Load items when category, search, sort, or page changes
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setItems([]);

      try {
        const params = new URLSearchParams({
          category: selectedCategory,
          page: pagination.page.toString(),
          limit: '20',
          search: searchTerm,
          sort: sortBy
        });

        const response = await fetch(`/api/items?${params}`);
        const data = await response.json();
        
        setItems(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error loading items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedCategory, searchTerm, sortBy, pagination.page]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCategoryDropdownOpen && !event.target.closest('.category-dropdown')) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  // Close stats modal when clicking outside or pressing escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedItemStats) {
        setSelectedItemStats(null);
      }
    };

    if (selectedItemStats) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedItemStats]);

  // Reset page when filters change
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [selectedCategory, searchTerm, sortBy]);

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page }));
    }
  };

  const goToNextPage = () => {
    if (pagination.hasNext) {
      goToPage(pagination.page + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.hasPrev) {
      goToPage(pagination.page - 1);
    }
  };

  const getImagePath = (icon, category) => {
    if (category === 'item') {
      return `/assets/img/atlas/item/${icon}.png`;
    } else if (category === 'weapon') {
      return `/assets/img/atlas/wuqi/${icon}.png`;
    } else if (category === 'armor') {
      return `/assets/img/atlas/yifu/${icon}.png`;
    } else if (category === 'pants') {
      return `/assets/img/atlas/kuzi/${icon}.png`;
    } else if (category === 'shoes') {
      return `/assets/img/atlas/xiezi/${icon}.png`;
    } else if (category === 'hat') {
      return `/assets/img/atlas/maozi/${icon}.png`;
    } else if (category === 'ring') {
      return `/assets/img/atlas/jiezhi/${icon}.png`;
    } else if (category === 'skill') {
      return `/assets/img/atlas/skill/${icon}.png`;
    } else if (category === 'buff') {
      return `/assets/img/atlas/buff/${icon}.png`;
    }
    return `/assets/img/atlas/item/${icon}.png`;
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 1: return 'border-gray-600 bg-gradient-to-br from-slate-700 to-slate-800 text-gray-300';
      case 2: return 'border-green-500 bg-gradient-to-br from-green-900/50 to-green-800/50 text-green-300';
      case 3: return 'border-blue-500 bg-gradient-to-br from-blue-900/50 to-blue-800/50 text-blue-300';
      case 4: return 'border-purple-500 bg-gradient-to-br from-purple-900/50 to-purple-800/50 text-purple-300';
      case 5: return 'border-yellow-500 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 text-yellow-300';
      default: return 'border-gray-600 bg-gradient-to-br from-slate-700 to-slate-800 text-gray-300';
    }
  };

  const getQualityName = (quality) => {
    switch (quality) {
      case 1: return 'ธรรมดา';
      case 2: return 'หายาก';
      case 3: return 'มหัศจรรย์';
      case 4: return 'ตำนาน';
      case 5: return 'เทพนิยาย';
      default: return 'ธรรมดา';
    }
  };


  const renderItems = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <p className="text-gray-300 font-medium">กำลังโหลดไอเท็ม...</p>
            <p className="text-sm text-gray-400">กรุณารอสักครู่</p>
          </div>
        </div>
      );
    }


    if (items.length === 0 && !loading) {
      return (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <Search className="w-16 h-16 text-gray-400" />
          <div className="text-center">
            <p className="text-gray-300 font-medium">
              {searchTerm ? 'ไม่พบไอเท็มที่ค้นหา' : 'ไม่พบไอเท็มในหมวดหมู่นี้'}
            </p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'ลองค้นหาด้วยคำอื่น' : 'ลองเลือกหมวดหมู่อื่น'}
            </p>
          </div>
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {items.map((item, index) => {
            const categoryData = categories.find(cat => cat.id === item.category);
            const IconComponent = categoryData ? iconMap[categoryData.icon] : Package;
            return (
              <div
                key={`${item.id}-${index}-${item.category}`}
                className={`bg-slate-800 rounded-xl border-2 ${getQualityColor(item.quality)} p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                onClick={() => setSelectedItemStats(item)}
              >
                <div className="flex items-center gap-6">
                  {/* Item Image */}
                  <div className="w-20 h-20 relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getImagePath(item.icon, item.category)}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300 p-2"
                      onError={(e) => {
                        e.target.src = '/assets/img/atlas/item/1001.png';
                      }}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <IconComponent className="w-4 h-4 text-gray-500" />
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getQualityColor(item.quality)}`}>
                            <Sparkles className="w-3 h-3 mr-1" />
                            {getQualityName(item.quality)}
                          </span>
                          {item.level && (
                            <span className="flex items-center gap-1 text-sm text-gray-300">
                              <Crown className="w-4 h-4" />
                              เลเวล {item.level}
                            </span>
                          )}
                        </div>
                        {item.dec && (
                          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                            {item.dec}
                          </p>
                        )}
                      </div>

                      {/* Stats Summary */}
                      {item.category !== 'item' && (
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>ค่าพลัง</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            กดเพื่อดูรายละเอียด
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {items.map((item, index) => {
          const categoryData = categories.find(cat => cat.id === item.category);
          const IconComponent = categoryData ? iconMap[categoryData.icon] : Package;
          return (
            <div
              key={`${item.id}-${index}-${item.category}`}
              className={`relative bg-slate-800 rounded-2xl border-2 ${getQualityColor(item.quality)} p-3 sm:p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 backdrop-blur-sm`}
              onClick={() => setSelectedItemStats(item)}
            >
              {/* Quality Indicator */}
              <div className="absolute top-3 right-3">
                <div className={`w-3 h-3 rounded-full ${item.quality >= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-400'} shadow-lg`}></div>
              </div>

              {/* Item Image */}
              <div className="aspect-square relative mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden">
                <Image
                  src={getImagePath(item.icon, item.category)}
                  alt={item.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                  onError={(e) => {
                    e.target.src = '/assets/img/atlas/item/1001.png';
                  }}
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Item Info */}
              <div className="text-center space-y-2 sm:space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getQualityColor(item.quality)}`}>
                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    <span className="hidden xs:inline">{getQualityName(item.quality)}</span>
                    <span className="xs:hidden">{getQualityName(item.quality).charAt(0)}</span>
                  </span>
                </div>

                {item.level && (
                  <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-gray-300">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">เลเวล {item.level}</span>
                    <span className="xs:hidden">Lv.{item.level}</span>
                  </div>
                )}

                {item.dec && (
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed hidden xs:block">
                    {item.dec}
                  </p>
                )}

                {/* Equipment Stats */}
                {item.category !== 'item' && (
                  <>
                    {/* Desktop Stats */}
                    <div className="space-y-1 pt-2 border-t border-slate-600 hidden xs:block">
                      {item.hp && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-red-500 font-medium">HP</span>
                          <span className="text-red-600 font-bold">{item.hp.toLocaleString()}</span>
                        </div>
                      )}
                      {item.atk && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-orange-500 font-medium">ATK</span>
                          <span className="text-orange-600 font-bold">{item.atk.toLocaleString()}</span>
                        </div>
                      )}
                      {item.def && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-500 font-medium">DEF</span>
                          <span className="text-blue-600 font-bold">{item.def.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Mobile Stats Button */}
                    <div className="xs:hidden pt-2 border-t border-slate-600">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItemStats(item);
                        }}
                        className="w-full bg-slate-700/50 hover:bg-slate-600/50 rounded-lg py-2 px-3 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-300 font-medium group-hover:text-blue-200">
                            ดูค่าพลัง
                          </span>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Stats Modal Component
  const StatsModal = () => {
    if (!selectedItemStats) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedItemStats(null);
          }
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto" style={{ pointerEvents: 'none' }}>
          <div className="p-6" style={{ pointerEvents: 'auto' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">รายละเอียดไอเท็ม</h3>
              <button
                onClick={() => setSelectedItemStats(null)}
                className="text-gray-400 hover:text-white transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Item Image */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden">
                <Image
                  src={getImagePath(selectedItemStats.icon, selectedItemStats.category)}
                  alt={selectedItemStats.name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    e.target.src = '/assets/img/atlas/item/1001.png';
                  }}
                />
              </div>
            </div>

            {/* Item Name */}
            <h2 className="text-xl font-bold text-white text-center mb-2">
              {selectedItemStats.name}
            </h2>

            {/* Quality and Level */}
            <div className="flex justify-center gap-2 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getQualityColor(selectedItemStats.quality)}`}>
                <Sparkles className="w-3 h-3 mr-1" />
                {getQualityName(selectedItemStats.quality)}
              </span>
              {selectedItemStats.level && (
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Crown className="w-4 h-4" />
                  เลเวล {selectedItemStats.level}
                </span>
              )}
            </div>

            {/* Description */}
            {selectedItemStats.dec && (
              <p className="text-sm text-gray-300 mb-4 text-center">
                {selectedItemStats.dec}
              </p>
            )}

            {/* Stats */}
            {selectedItemStats.category !== 'item' && (selectedItemStats.hp || selectedItemStats.atk || selectedItemStats.def) && (
              <div className="bg-slate-700/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3 text-center">ค่าพลัง</h4>
                <div className="space-y-2">
                  {selectedItemStats.hp && (
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 font-medium">HP</span>
                      <span className="text-red-300 font-bold">{selectedItemStats.hp.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedItemStats.atk && (
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-medium">ATK</span>
                      <span className="text-orange-300 font-bold">{selectedItemStats.atk.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedItemStats.def && (
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 font-medium">DEF</span>
                      <span className="text-blue-300 font-bold">{selectedItemStats.def.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900">
      <CustomCursor />
      <StatsModal />
      
        {/* Header */}
        <header className="relative bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2 flex items-center gap-2 sm:gap-4">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400 flex-shrink-0" />
                  <span className="break-words">คลังไอเท็ม</span>
                </h1>
                <div className="text-gray-300 text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span>สำหรับ WildHammer</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    <Sparkles className="w-3 h-3" />
                    {selectedCategoryData?.desc || 'ดูไอเท็มทั้งหมด'}
                  </span>
                </div>
              </div>
              <div className="flex sm:hidden items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-300">หมวดหมู่:</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  {selectedCategoryData && (
                    <>
                      {React.createElement(iconMap[selectedCategoryData.icon] || Package, { className: "w-4 h-4 text-yellow-400" })}
                      <span className="truncate">{selectedCategoryData.name}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-300">หมวดหมู่ที่เลือก</div>
                  <div className="text-lg font-semibold text-white flex items-center gap-2">
                    {selectedCategoryData && (
                      <>
                        {React.createElement(iconMap[selectedCategoryData.icon] || Package, { className: "w-5 h-5 text-yellow-400" })}
                        {selectedCategoryData.name}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-8">

        {/* Search and Controls */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-700 mb-4 sm:mb-6 relative z-40">
          <div className="flex flex-col gap-4">
            {/* Top Row - Search and Category */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหาไอเท็ม..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative category-dropdown">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border border-slate-600 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-full sm:min-w-[200px]"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-sm sm:text-base truncate">
                      {selectedCategoryData?.name || 'เลือกหมวดหมู่'}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {selectedCategoryData?.desc || 'เลือกประเภทไอเท็ม'}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-[9999] mt-1">
                    <div className="p-2 space-y-1 max-h-80 overflow-y-auto ">
                      {categories.map((category) => {
                        const IconComponent = iconMap[category.icon];
                        const isSelected = selectedCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-slate-700/50 ${
                              isSelected 
                                ? 'bg-yellow-500/20 border border-yellow-500/50' 
                                : ''
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              isSelected 
                                ? 'bg-yellow-500/30' 
                                : 'bg-slate-700'
                            }`}>
                              <IconComponent className={`w-4 h-4 ${
                                isSelected 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className={`font-medium text-sm ${
                                isSelected 
                                  ? 'text-yellow-300' 
                                  : 'text-white'
                              }`}>
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {category.desc}
                              </div>
                            </div>
                            {isSelected && (
                              <ChevronRight className="w-4 h-4 text-yellow-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row - Sort and View Mode */}
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-between">
              {/* Sort Dropdown */}
              <div className="relative flex-1 xs:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-700 border border-slate-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-8 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 w-full xs:w-auto text-sm sm:text-base"
                >
                  <option value="name_asc">ชื่อ A-Z</option>
                  <option value="name_desc">ชื่อ Z-A</option>
                  <option value="name_th_asc">ชื่อ ก-ฮ</option>
                  <option value="name_th_desc">ชื่อ ฮ-ก</option>
                  <option value="level_asc">เลเวล น้อย→มาก</option>
                  <option value="level_desc">เลเวล มาก→น้อย</option>
                  <option value="quality_asc">คุณภาพ น้อย→มาก</option>
                  <option value="quality_desc">คุณภาพ มาก→น้อย</option>
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-700 rounded-xl p-1 self-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-slate-600 text-yellow-400 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden xs:inline text-sm sm:text-base">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-slate-600 text-yellow-400 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden xs:inline text-sm sm:text-base">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
              {selectedCategoryData && (
                <>
                  <div className="flex items-center gap-2 xs:gap-3">
                    {React.createElement(iconMap[selectedCategoryData.icon] || Package, { className: "w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" })}
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedCategoryData.name}
                    </h2>
                  </div>
                  {searchTerm && (
                    <span className="text-xs sm:text-sm text-gray-400">
                      (ค้นหา: "{searchTerm}")
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 self-start xs:self-center">
              {viewMode === 'grid' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              <span className="hidden xs:inline">แสดงในรูปแบบ {viewMode === 'grid' ? 'Grid' : 'List'}</span>
              <span className="xs:hidden">{viewMode === 'grid' ? 'Grid' : 'List'}</span>
            </div>
          </div>
          
          {renderItems()}
          
          {/* Pagination Controls */}
          {!loading && items.length > 0 && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 sm:gap-4 py-6 sm:py-8">
              {/* Pagination Info */}
              <div className="text-xs sm:text-sm text-gray-400 text-center px-4">
                <div className="hidden xs:block">
                  แสดงหน้า {pagination.page} จาก {pagination.totalPages} หน้า 
                  (ทั้งหมด {pagination.total} รายการ)
                </div>
                <div className="xs:hidden">
                  หน้า {pagination.page}/{pagination.totalPages} ({pagination.total} รายการ)
                </div>
              </div>
              
              {/* Pagination Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={!pagination.hasPrev}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    pagination.hasPrev
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span className="hidden xs:inline">ก่อนหน้า</span>
                  <span className="xs:hidden">ก่อน</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const currentPage = pagination.page;
                    const totalPages = pagination.totalPages;
                    
                    // Show first page
                    if (currentPage > 3) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => goToPage(1)}
                          className="px-2 sm:px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200 text-sm"
                        >
                          1
                        </button>
                      );
                      if (currentPage > 4) {
                        pages.push(
                          <span key="ellipsis1" className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                    }
                    
                    // Show pages around current page
                    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => goToPage(i)}
                          className={`px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                            i === currentPage
                              ? 'bg-yellow-500 text-black font-bold'
                              : 'bg-slate-700 hover:bg-slate-600 text-white'
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    
                    // Show last page
                    if (currentPage < totalPages - 2) {
                      if (currentPage < totalPages - 3) {
                        pages.push(
                          <span key="ellipsis2" className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => goToPage(totalPages)}
                          className="px-2 sm:px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200 text-sm"
                        >
                          {totalPages}
                        </button>
                      );
                    }
                    
                    return pages;
                  })()}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={!pagination.hasNext}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    pagination.hasNext
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden xs:inline">ถัดไป</span>
                  <span className="xs:hidden">ถัด</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Results Info for single page */}
          {!loading && items.length > 0 && pagination.totalPages <= 1 && (
            <div className="flex justify-center items-center py-6 sm:py-8">
              <span className="text-xs sm:text-sm text-gray-400 text-center px-4">
                แสดงผลทั้งหมด {pagination.total} รายการ
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ItemsPage;
