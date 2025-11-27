'use client';

import { 
  Play, 
  Calendar, 
  Users, 
  TrendingUp,
  Star,
  Award,
  MessageSquare,
  Share2,
  Heart,
  Eye,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PreviewSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-500px" });

    return (
        <section ref={ref} className="w-full bg-black py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        ข่าวสารและวิดีโอเกม
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        ติดตามข่าวสารล่าสุด วิดีโอเกมเพลย์ และอัปเดตใหม่ๆ ของ WildHammer
                    </p>
                </motion.div>

                {/* Main Video Section */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Video Thumbnail */}
                        <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900">
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="group relative">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                    <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
                                </button>
                            </div>
                            
                            {/* Video Info Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        WildHammer - Gameplay Trailer
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-3">
                                        ดูการเล่นเกมจริงและฟีเจอร์ใหม่ที่กำลังจะมา
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span>2 วันที่แล้ว</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Eye className="w-4 h-4 mr-1" />
                                            <span>12.5K ครั้ง</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Heart className="w-4 h-4 mr-1" />
                                            <span>856 ชอบ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* News Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    {/* News Item 1 */}
                    <motion.article 
                        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    >
                        <div className="aspect-video bg-gradient-to-br from-yellow-500 to-orange-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute top-4 left-4">
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">HOT</span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="text-white font-bold text-lg">อัปเดตใหม่ v2.1</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                ฟีเจอร์ใหม่: Guild System
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                สร้าง Guild ของคุณเองและต่อสู้กับ Guild อื่นๆ ในโหมด Guild War
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>1 วันที่แล้ว</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    <span>24</span>
                                </div>
                            </div>
                        </div>
                    </motion.article>

                    {/* News Item 2 */}
                    <motion.article 
                        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                    >
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute top-4 left-4">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="text-white font-bold text-lg">Event กำลังมา</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                Double XP Weekend
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                ได้รับ XP เพิ่มเป็น 2 เท่าในวันเสาร์-อาทิตย์นี้!
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>3 ชั่วโมงที่แล้ว</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Share2 className="w-4 h-4 mr-1" />
                                    <span>156</span>
                                </div>
                            </div>
                        </div>
                    </motion.article>

                    {/* News Item 3 */}
                    <motion.article 
                        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                    >
                        <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute top-4 left-4">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">UPDATE</span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="text-white font-bold text-lg">Bug Fixes</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                แก้ไขปัญหาการเชื่อมต่อ
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                ปรับปรุงความเสถียรของเซิร์ฟเวอร์และแก้ไขปัญหาการตัดการเชื่อมต่อ
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>5 วันที่แล้ว</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    <span>89%</span>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                </motion.div>
                {/* View More Button */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
                >
                    <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 hover:transform hover:scale-105 flex items-center mx-auto">
                        <span>ดูข่าวสารทั้งหมด</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
