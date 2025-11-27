'use client';

import React, { useState, useEffect } from 'react';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Sword, 
  Shield, 
  Star, 
  Medal, 
  Zap, 
  Flame,
  Target,
  Users,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import CustomCursor from '../../components/CustomCursor';
import { gameRankProxyService, handleApiError } from '../../services/index.js';
import { getPrizeByRank } from '../../services/rank/prizebyrank.js';

// Mock data for rankings
const mockRankingData = {
  level: [
    { rank: 1, name: "DragonSlayer99", level: 85, class: "Warrior", guild: "Thunder Legion", avatar: "🛡️", power: 125000 },
    { rank: 2, name: "ShadowMage", level: 84, class: "Mage", guild: "Dark Order", avatar: "🔮", power: 118000 },
    { rank: 3, name: "ElvenArcher", level: 83, class: "Archer", guild: "Forest Guardians", avatar: "🏹", power: 112000 },
    { rank: 4, name: "BeastTamer", level: 82, class: "Hunter", guild: "Wild Pack", avatar: "🐺", power: 108000 },
    { rank: 5, name: "HolyPriest", level: 81, class: "Priest", guild: "Divine Light", avatar: "✨", power: 105000 },
    { rank: 6, name: "RogueAssassin", level: 80, class: "Rogue", guild: "Shadow Syndicate", avatar: "🗡️", power: 102000 },
    { rank: 7, name: "PaladinKing", level: 79, class: "Paladin", guild: "Holy Knights", avatar: "⚔️", power: 98000 },
    { rank: 8, name: "Necromancer", level: 78, class: "Necromancer", guild: "Death Cult", avatar: "💀", power: 95000 },
    { rank: 9, name: "Elementalist", level: 77, class: "Elementalist", guild: "Storm Riders", avatar: "⚡", power: 92000 },
    { rank: 10, name: "Berserker", level: 76, class: "Berserker", guild: "Rage Warriors", avatar: "🔥", power: 89000 }
  ],
  pvp: [
    { rank: 1, name: "PvPKing", level: 80, class: "Warrior", guild: "Battle Masters", avatar: "👑", wins: 1250, losses: 45, winRate: 96.5 },
    { rank: 2, name: "ArenaChamp", level: 79, class: "Mage", guild: "Magic Circle", avatar: "🏆", wins: 1180, losses: 78, winRate: 93.8 },
    { rank: 3, name: "CombatLord", level: 78, class: "Archer", guild: "Precision Squad", avatar: "🎯", wins: 1100, losses: 95, winRate: 92.1 },
    { rank: 4, name: "BattleBeast", level: 77, class: "Hunter", guild: "Wild Pack", avatar: "🐻", wins: 1050, losses: 120, winRate: 89.7 },
    { rank: 5, name: "FightMaster", level: 76, class: "Rogue", guild: "Shadow Syndicate", avatar: "🥷", wins: 980, losses: 145, winRate: 87.1 },
    { rank: 6, name: "WarriorElite", level: 75, class: "Paladin", guild: "Holy Knights", avatar: "⚔️", wins: 920, losses: 165, winRate: 84.8 },
    { rank: 7, name: "DuelChampion", level: 74, class: "Necromancer", guild: "Death Cult", avatar: "💀", wins: 880, losses: 180, winRate: 83.0 },
    { rank: 8, name: "ArenaGladiator", level: 73, class: "Elementalist", guild: "Storm Riders", avatar: "⚡", wins: 840, losses: 195, winRate: 81.2 },
    { rank: 9, name: "BattleTitan", level: 72, class: "Berserker", guild: "Rage Warriors", avatar: "🔥", wins: 800, losses: 210, winRate: 79.2 },
    { rank: 10, name: "CombatElite", level: 71, class: "Priest", guild: "Divine Light", avatar: "✨", wins: 760, losses: 225, winRate: 77.1 }
  ],
  guild: [
    { rank: 1, name: "Thunder Legion", level: 15, members: 50, power: 2500000, leader: "DragonSlayer99", server: "Asia-1" },
    { rank: 2, name: "Dark Order", level: 14, members: 48, power: 2300000, leader: "ShadowMage", server: "Asia-1" },
    { rank: 3, name: "Forest Guardians", level: 14, members: 45, power: 2100000, leader: "ElvenArcher", server: "Asia-2" },
    { rank: 4, name: "Wild Pack", level: 13, members: 42, power: 1950000, leader: "BeastTamer", server: "Asia-1" },
    { rank: 5, name: "Divine Light", level: 13, members: 40, power: 1800000, leader: "HolyPriest", server: "Asia-2" },
    { rank: 6, name: "Shadow Syndicate", level: 12, members: 38, power: 1650000, leader: "RogueAssassin", server: "Asia-1" },
    { rank: 7, name: "Holy Knights", level: 12, members: 35, power: 1500000, leader: "PaladinKing", server: "Asia-2" },
    { rank: 8, name: "Death Cult", level: 11, members: 32, power: 1350000, leader: "Necromancer", server: "Asia-1" },
    { rank: 9, name: "Storm Riders", level: 11, members: 30, power: 1200000, leader: "Elementalist", server: "Asia-2" },
    { rank: 10, name: "Rage Warriors", level: 10, members: 28, power: 1050000, leader: "Berserker", server: "Asia-1" }
  ]
};

const RankingPage = () => {
  const [activeTab, setActiveTab] = useState('arena');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState('1');
  const [rankingData, setRankingData] = useState({
    level: [],
    arena: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prizeData, setPrizeData] = useState([]);
  const [prizeLoading, setPrizeLoading] = useState(false);

  // Available servers - แยกรางวัลตามเซิร์ฟเวอร์
  const availableServers = [
    { id: '1', name: 'Server 1', icon: '⚔️' },
    { id: '2', name: 'Server 2', icon: '⚔️' },
    { id: '3', name: 'Server 3', icon: '⚔️' },
    { id: '4', name: 'Coming Soon', icon: '🌟', disabled: true }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-500/30";
    if (rank === 3) return "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30";
    return "bg-slate-800/50 border-slate-700";
  };

  // ฟังก์ชันหารางวัลตามอันดับ
  const getPrizeForRank = (rank) => {
    if (!prizeData || prizeData.length === 0) return null;
    
    return prizeData.find(prize => {
      if (prize.from_rank === prize.to_rank) {
        return prize.from_rank === rank;
      } else {
        return rank >= prize.from_rank && rank <= prize.to_rank;
      }
    });
  };

  // ฟังก์ชันแปลงข้อมูลจาก API format เป็น display format
  const transformApiData = (apiData, type = 'level', serverId = selectedServer) => {
    if (!Array.isArray(apiData)) return [];
    
    // กรองข้อมูลตาม server ที่เลือกก่อน
    const filteredData = apiData.filter(item => 
      item.serverid === parseInt(serverId)
    );
    

    
    return filteredData.map((item, index) => {
      // กำหนด rank ตามลำดับของข้อมูลที่กรองแล้ว (เรียงมาแล้วจาก API)
      const displayRank = index + 1;
      
      if (type === 'level') {
        return {
          rank: displayRank, // ใช้ลำดับจากการเรียงของ API
          name: item.info?.n || 'Unknown Player',
          level: item.val || 0,
          roleId: item.roleid || '',
          serverId: item.serverid || 0,
          // เพิ่มข้อมูลสำหรับการแสดงผล
          // avatar: '⭐', // default avatar
          class: 'Adventurer', // default class
          guild: '-', // ไม่มีข้อมูล guild
          power: item.val * 1000 || 0 // คำนวณ power จาก level
        };
      } else if (type === 'arena') {
        return {
          rank: displayRank, // ใช้ลำดับจากการเรียงของ API
          name: item.info?.n || 'Unknown Player',
          level: item.info?.lv || 0,
          roleId: item.id || '',
          serverId: item.serverid || 0,
          power: item.p || 0, // power/points
          // เพิ่มข้อมูลสำหรับการแสดงผล
          avatar: '🏆', // arena avatar
          class: 'Gladiator', // arena class
          guild: '-', // ไม่มีข้อมูล guild
          // ข้อมูลเพิ่มเติมสำหรับ arena
          wins: Math.floor(Math.random() * 100) + 50, // mock data สำหรับ wins
          losses: Math.floor(Math.random() * 20) + 5, // mock data สำหรับ losses
          winRate: 0 // จะคำนวณจาก wins/losses
        };
      }
      return item;
    }).map(item => {
      // คำนวณ winRate สำหรับ arena
      if (type === 'arena' && item.wins && item.losses) {
        const totalGames = item.wins + item.losses;
        item.winRate = totalGames > 0 ? ((item.wins / totalGames) * 100).toFixed(1) : 0;
      }
      return item;
    });
  };

  // ฟังก์ชันดึงข้อมูลรางวัล - ใช้ข้อมูลจาก API โดยตรง
  const fetchPrizeData = async (serverId = selectedServer) => {
    setPrizeLoading(true);
    try {
      const result = await getPrizeByRank();
      
      if (result && result.success) {
        // ใช้ข้อมูลรางวัลจาก API โดยตรง ไม่ปรับแต่งอะไร
        const prizeDataFromAPI = result.data.map(prize => ({
          ...prize,
          server_id: serverId
        }));

        setPrizeData(prizeDataFromAPI);
      } else {
        // ใช้ mock data เป็น fallback
        const fallbackPrizes = [
          { id: 1, from_rank: 1, to_rank: 1, percent_prize: "60000.00" },
          { id: 2, from_rank: 2, to_rank: 2, percent_prize: "20000.00" },
          { id: 3, from_rank: 3, to_rank: 3, percent_prize: "15000.00" },
          { id: 4, from_rank: 4, to_rank: 200, percent_prize: "5000.00" }
        ];

        const fallbackPrizeData = fallbackPrizes.map(prize => ({
          ...prize,
          server_id: serverId
        }));

        setPrizeData(fallbackPrizeData);
      }
    } catch (err) {
      console.error('Failed to fetch prize data:', err);
      // ใช้ mock data เป็น fallback
      const fallbackPrizes = [
        { id: 1, from_rank: 1, to_rank: 1, percent_prize: "60000.00" },
        { id: 2, from_rank: 2, to_rank: 2, percent_prize: "20000.00" },
        { id: 3, from_rank: 3, to_rank: 3, percent_prize: "15000.00" },
        { id: 4, from_rank: 4, to_rank: 200, percent_prize: "5000.00" }
      ];

      const fallbackPrizeData = fallbackPrizes.map(prize => ({
        ...prize,
        server_id: serverId
      }));

      setPrizeData(fallbackPrizeData);
    } finally {
      setPrizeLoading(false);
    }
  };

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchRankingData = async () => {
    setLoading(true);
    setError(null);

    try {
      // ดึงข้อมูลจาก API ผ่าน proxy
      const [levelApiData, arenaApiData] = await Promise.all([
        gameRankProxyService.getLevelRanking(),
        gameRankProxyService.getArenaRanking()
      ]);
      
      // แปลงข้อมูลให้อยู่ในรูปแบบที่ UI ต้องการ - กรองตาม server ที่เลือก
      const transformedLevelData = transformApiData(levelApiData, 'level', selectedServer);
      const transformedArenaData = transformApiData(arenaApiData, 'arena', selectedServer);

      setRankingData(prev => ({
        ...prev,      
        level: transformedLevelData,
        arena: transformedArenaData,        
      }));
    } catch (err) {
      console.error('Failed to fetch ranking data:', err);
      const errorResponse = handleApiError(err, 'Ranking Data');
      setError(errorResponse.message);
      
      // ใช้ mock data เป็น fallback
      setRankingData(prev => ({
        ...prev,
        level: mockRankingData.level,
        arena: mockRankingData.pvp
      }));
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchRankingData();
    fetchPrizeData();
  }, []);

  // ดึงข้อมูลใหม่เมื่อเปลี่ยน tab
  useEffect(() => {
    if (activeTab === 'level' || activeTab === 'arena') {
      fetchRankingData();
    }
  }, [activeTab]);

  // รีเฟรชข้อมูลเมื่อเปลี่ยน Server
  useEffect(() => {
    fetchPrizeData(selectedServer);
    fetchRankingData(); // รีเฟรช ranking data เพื่อให้ใช้ filter ตาม server ใหม่
  }, [selectedServer]);

  // ฟังก์ชันสำหรับ retry
  const handleRetry = () => {
    fetchRankingData();
  };

  const currentData = activeTab === 'level' ? rankingData.level : 
                     rankingData[activeTab] || [];

  const filteredData = currentData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      item.name?.toLowerCase().includes(searchLower) ||
      (item.roleId && item.roleId.toLowerCase().includes(searchLower)) ||
      (item.guild && item.guild.toLowerCase().includes(searchLower)) ||
      (item.level && item.level.toString().includes(searchTerm)) ||
      (item.serverId && item.serverId.toString().includes(searchTerm))
    );

    // ข้อมูลถูกกรองตาม server แล้วใน transformApiData ไม่ต้องกรองอีก
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Ranking
              </h1>
              <Trophy className="w-12 h-12 text-yellow-400 ml-4" />
            </div>
            <p className="text-xl text-gray-300">อันดับผู้เล่น WildHammer</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prize Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white">รางวัลตามอันดับ</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {availableServers.find(s => s.id === selectedServer)?.icon} {availableServers.find(s => s.id === selectedServer)?.name} - รางวัลตามอันดับ
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {prizeLoading && (
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {prizeLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-4" />
                    <p className="text-gray-300">กำลังโหลดข้อมูลรางวัล...</p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Podium for Top 3 */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-6 text-center">🏆 โพเดี้ยมแชมป์ 🏆</h4>
                    <div className="flex items-end justify-center space-x-4 max-w-2xl mx-auto">
                      {/* 2nd Place */}
                      {prizeData.find(p => p.from_rank === 2) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-gray-500/30 rounded-xl p-4 w-32 h-24 flex flex-col items-center justify-center relative">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              2nd
                            </div>
                            <Medal className="w-6 h-6 text-gray-300 mb-2" />
                            <div className="text-sm font-bold text-white">
                              {parseFloat(prizeData.find(p => p.from_rank === 2)?.percent_prize || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">บาท</div>
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-sm font-bold text-white">
                              {rankingData.arena.find(player => player.rank === 2)?.name || 'รอผู้เล่น'}
                            </div>
                            <div className="text-xs text-gray-400">Silver Medal</div>
                          </div>
                        </motion.div>
                      )}

                      {/* 1st Place */}
                      {prizeData.find(p => p.from_rank === 1) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 w-36 h-32 flex flex-col items-center justify-center relative">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              1st
                            </div>
                            <Crown className="w-8 h-8 text-yellow-400 mb-2" />
                            <div className="text-lg font-bold text-white">
                              {parseFloat(prizeData.find(p => p.from_rank === 1)?.percent_prize || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">บาท</div>
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-sm font-bold text-white">
                              {rankingData.arena.find(player => player.rank === 1)?.name || 'รอผู้เล่น'}
                            </div>
                            <div className="text-xs text-gray-400">Gold Crown</div>
                          </div>
                        </motion.div>
                      )}

                      {/* 3rd Place */}
                      {prizeData.find(p => p.from_rank === 3) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 w-32 h-20 flex flex-col items-center justify-center relative">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              3rd
                            </div>
                            <Medal className="w-6 h-6 text-orange-400 mb-2" />
                            <div className="text-sm font-bold text-white">
                              {parseFloat(prizeData.find(p => p.from_rank === 3)?.percent_prize || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">บาท</div>
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-sm font-bold text-white">
                              {rankingData.arena.find(player => player.rank === 3)?.name || 'รอผู้เล่น'}
                            </div>
                            <div className="text-xs text-gray-400">Bronze Medal</div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Other Prizes */}
                  <div className="space-y-3">
                    {prizeData.filter(prize => prize.from_rank > 3).map((prize, index) => (
                      <motion.div
                        key={prize.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-5 h-5 text-blue-400" />
                              <span className="text-sm font-bold text-white">
                                อันดับ {prize.from_rank}
                                {prize.to_rank !== prize.from_rank && ` - ${prize.to_rank}`}
                              </span>
                            </div>
                            
                            {prize.to_rank !== prize.from_rank && (
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-orange-300 bg-orange-500/20 px-2 py-1 rounded-full">
                                  🎲 สุ่มแจก
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                {parseFloat(prize.percent_prize).toLocaleString()} บาท
                              </div>
                              <div className="text-xs text-gray-400">รางวัลที่จะได้รับ</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-1 flex space-x-1">
            {[
              { id: 'level', label: 'Level Ranking', icon: Star },
              { id: 'arena', label: 'Arena Ranking', icon: Sword }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                disabled={loading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <div>
                  <p className="text-red-400 font-medium">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={handleRetry}
                disabled={loading}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    กำลังโหลด...
                  </div>
                ) : (
                  'ลองใหม่'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Server Selection Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              disabled={loading}
              className="appearance-none bg-slate-800/50 border border-slate-600 rounded-xl text-white px-4 py-3 pr-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {availableServers.map((server) => (
                <option 
                  key={server.id} 
                  value={server.id} 
                  className="bg-slate-800 text-white"
                  disabled={server.disabled}
                >
                  {server.icon} {server.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาชื่อผู้เล่น, รหัสตัวละคร, Level..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              />
            </div>

            {/* Active Filters Display */}
            {searchTerm && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-gray-400">กรองข้อมูล:</span>
                
                <div className="flex items-center bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm text-yellow-300 mr-2">
                    🔍 "{searchTerm}"
                  </span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-yellow-300 hover:text-yellow-100 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden"
        >
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-4" />
                <p className="text-gray-300">กำลังโหลดข้อมูลอันดับ...</p>
              </div>
            </div>
          )}

          {!loading && filteredData.length === 0 && !error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">ไม่พบข้อมูลที่ค้นหา</p>
                <p className="text-gray-400 text-sm mt-2">ลองเปลี่ยนคำค้นหาหรือเลือกแท็บอื่น</p>
              </div>
            </div>
          )}

          {!loading && filteredData.length > 0 && (
            <>
              {/* Results Summary */}
              <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-400 mr-2" />
                      {/* <span className="text-white font-medium">
                        แสดงผลลัพธ์ {filteredData.length.toLocaleString()} คน
                      </span> */}
                      {currentData.length !== filteredData.length && (
                        <span className="text-gray-400 ml-2">
                          จากทั้งหมด {currentData.length.toLocaleString()} คน
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-400 text-sm font-medium">
                        {availableServers.find(s => s.id === selectedServer)?.icon} 
                        {availableServers.find(s => s.id === selectedServer)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    อัพเดทล่าสุด: {new Date().toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">อันดับ</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ชื่อผู้เล่น</th>
                  {activeTab === 'level' && (
                    <>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Level</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Server</th>
                    </>
                  )}
                  {activeTab === 'arena' && (
                    <>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Level</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Server</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">รางวัล</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`hover:bg-slate-700/30 transition-all duration-300 ${getRankColor(item.rank)}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(item.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="text-2xl mr-3">{item.avatar || '⭐'}</div> */}
                        <div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                          {activeTab === 'level' && (
                            <div className="text-sm text-gray-400 font-mono">ID: {item.roleId}</div>
                          )}
                          {activeTab === 'arena' && (
                            <div className="text-sm text-gray-400 font-mono">ID: {item.roleId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    {activeTab === 'level' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-lg font-bold text-yellow-400">{item.level}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                            {availableServers.find(s => s.id === item.serverId?.toString())?.icon || '🌐'} 
                            Server {item.serverId || 'N/A'}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'arena' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-lg font-bold text-yellow-400">{item.level}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                            Server {item.serverId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const prize = getPrizeForRank(item.rank);
                            if (!prize) return (
                              <span className="text-gray-400 text-sm">ไม่มีรางวัล</span>
                            );
                            
                            return (
                              <div className="flex items-center">
                                <div className="flex items-center space-x-2">
                                  {prize.from_rank === 1 && <Crown className="w-4 h-4 text-yellow-400" />}
                                  {prize.from_rank === 2 && <Medal className="w-4 h-4 text-gray-300" />}
                                  {prize.from_rank === 3 && <Medal className="w-4 h-4 text-orange-400" />}
                                  {prize.from_rank > 3 && <Trophy className="w-4 h-4 text-blue-400" />}
                                  <span className="text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    {parseFloat(prize.percent_prize).toLocaleString()} บาท
                                  </span>
                                </div>
                                {prize.to_rank !== prize.from_rank && (
                                  <div className="ml-2">
                                    <span className="text-xs text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
                                      🎲
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </td>
                      </>
                    )}
                  </motion.tr>
                ))}
              </tbody>
              </table>
              </div>
            </>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default RankingPage;
