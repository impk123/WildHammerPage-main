'use client';

import { 
  Sword, 
  Crown, 
  Gamepad2,
  Volume2,
  Wifi,
  Battery,
  Heart,
  Zap,
  Shield,
  Star,
  Gem,
  Trophy,
  Target,
  Flame,
  Sparkles
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function GamePreviewSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-300px" });

    return (
        <div ref={ref} className="mt-16 mb-12">
            <div className="flex justify-center">
                {/* Phone Mockup */}
                <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Phone Frame */}
                    <div className="w-72 h-[600px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-700 group-hover:border-yellow-500/50 transition-all duration-500">
                        {/* Phone Screen */}
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-[2.5rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 py-3 text-white text-xs bg-black/20 backdrop-blur-sm">
                                <span className="font-bold">9:41</span>
                                <div className="flex items-center space-x-2">
                                    <Volume2 className="w-3 h-3" />
                                    <Wifi className="w-3 h-3" />
                                    <Battery className="w-4 h-3" />
                                </div>
                            </div>
                            
                            {/* Game Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-10 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <div className="absolute top-20 right-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
                                <div className="absolute bottom-20 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
                                <div className="absolute bottom-40 right-4 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-500"></div>
                            </div>
                            
                            {/* Game Content */}
                            <div className="px-6 py-8 h-full relative z-10">
                                {/* Game Header */}
                                <motion.div 
                                    className="text-center mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                >
                                    <div className="flex items-center justify-center mb-3">
                                        <Sparkles className="w-5 h-5 text-yellow-400 mr-2 animate-pulse" />
                                        <h4 className="text-xl font-bold text-white">WildHammer</h4>
                                        <Sparkles className="w-5 h-5 text-yellow-400 ml-2 animate-pulse" />
                                    </div>
                                    <p className="text-gray-400 text-sm">Epic RPG Adventure</p>
                                    <div className="flex items-center justify-center mt-2 space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </motion.div>
                                
                                {/* Character Avatar */}
                                <motion.div 
                                    className="flex justify-center mb-8"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                >
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300">
                                            <Sword className="w-10 h-10 text-white drop-shadow-lg" />
                                        </div>
                                        {/* Level Badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white">
                                            <span className="text-white text-xs font-bold">15</span>
                                        </div>
                                        {/* Floating Elements */}
                                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-500"></div>
                                    </div>
                                </motion.div>
                                
                                {/* Enhanced Stats */}
                                <motion.div 
                                    className="space-y-4 mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                >
                                    {/* HP Bar */}
                                    <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <Heart className="w-4 h-4 text-red-400 mr-2" />
                                                <span className="text-gray-300 text-sm font-medium">Health</span>
                                            </div>
                                            <span className="text-white text-sm font-bold">850/1000</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="w-4/5 h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full shadow-lg"></div>
                                        </div>
                                    </div>
                                    
                                    {/* MP Bar */}
                                    <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <Zap className="w-4 h-4 text-blue-400 mr-2" />
                                                <span className="text-gray-300 text-sm font-medium">Mana</span>
                                            </div>
                                            <span className="text-white text-sm font-bold">320/500</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="w-3/5 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Experience Bar */}
                                    <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                                <span className="text-gray-300 text-sm font-medium">Experience</span>
                                            </div>
                                            <span className="text-white text-sm font-bold">2,450/3,000</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="w-4/5 h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full shadow-lg"></div>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                {/* Enhanced Action Buttons */}
                                <motion.div 
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                                >
                                    <button className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center group">
                                        <Flame className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                        Attack
                                        <Target className="w-4 h-4 ml-2" />
                                    </button>
                                    <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group">
                                        <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                        Magic
                                        <Sparkles className="w-4 h-4 ml-2" />
                                    </button>
                                    <button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center group">
                                        <Gem className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                        Items
                                        <Trophy className="w-4 h-4 ml-2" />
                                    </button>
                                </motion.div>
                                
                                {/* Mini Stats */}
                                <motion.div 
                                    className="mt-6 grid grid-cols-3 gap-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                                >
                                    <div className="bg-slate-800/30 rounded-lg p-2 text-center">
                                        <Shield className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                                        <span className="text-white text-xs font-bold">125</span>
                                        <p className="text-gray-400 text-xs">Defense</p>
                                    </div>
                                    <div className="bg-slate-800/30 rounded-lg p-2 text-center">
                                        <Sword className="w-4 h-4 text-red-400 mx-auto mb-1" />
                                        <span className="text-white text-xs font-bold">89</span>
                                        <p className="text-gray-400 text-xs">Attack</p>
                                    </div>
                                    <div className="bg-slate-800/30 rounded-lg p-2 text-center">
                                        <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                                        <span className="text-white text-xs font-bold">67</span>
                                        <p className="text-gray-400 text-xs">Speed</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Enhanced Phone Shadow */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-56 h-6 bg-black/30 rounded-full blur-lg"></div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/20 rounded-full blur-sm"></div>
                </motion.div>
            </div>
            
            {/* Enhanced Game Features */}
            <div className="mt-16">
               
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-red-500/25 transition-all duration-500">
                                    <Sword className="w-8 h-8 text-white group-hover:animate-pulse" />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 text-center">ระบบต่อสู้</h4>
                            <p className="text-gray-400 text-sm text-center mb-4">ระบบต่อสู้ที่ตื่นเต้นและสนุกสนาน</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Combo System</span>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Critical Hit</span>
                                    <div className="flex space-x-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                                    <Crown className="w-8 h-8 text-white group-hover:animate-pulse" />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 text-center">การผจญภัย</h4>
                            <p className="text-gray-400 text-sm text-center mb-4">โลกกว้างใหญ่ที่รอการสำรวจ</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">World Size</span>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Quests</span>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500">
                                    <Gamepad2 className="w-8 h-8 text-white group-hover:animate-pulse" />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 text-center">การเล่น</h4>
                            <p className="text-gray-400 text-sm text-center mb-4">ควบคุมง่าย เหมาะสำหรับทุกวัย</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Easy Control</span>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Multiplayer</span>
                                    <div className="flex space-x-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                
                {/* Additional Features */}
                {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm font-medium">Achievements</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <Gem className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm font-medium">Collectibles</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <Star className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm font-medium">Rating</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm font-medium">Security</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
