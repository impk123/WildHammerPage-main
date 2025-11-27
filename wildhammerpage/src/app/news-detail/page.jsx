'use client';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare,
  Clock,
  Tag,
  ChevronRight,
  ThumbsUp,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';
import VideoCard from '../../components/cards/VideoCard';
import NewsCard from '../../components/cards/NewsCard';
import CustomCursor from '../../components/CustomCursor';

export default function NewsDetailPage() {
    return (
        <div className="min-h-screen bg-black relative">
            <div className="fixed inset-0 pointer-events-none z-[10000]">
                <CustomCursor />
            </div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center text-white hover:text-yellow-400 transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            <span>กลับหน้าหลัก</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-24 pb-8">
                <div className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">HOT</span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">UPDATE</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            ฟีเจอร์ใหม่: Guild System พร้อม Guild War Mode
                        </h1>
                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>15 ธันวาคม 2024</span>
                            </div>
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span>WildHammer Team</span>
                            </div>
                            <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                <span>12,456 ครั้ง</span>
                            </div>
                            <div className="flex items-center">
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                <span>856 ชอบ</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Video */}
                    <div className="mb-12">
                        <VideoCard 
                            title="WildHammer Guild System - Official Trailer"
                            description="ดูการแนะนำระบบ Guild ใหม่และ Guild War Mode ที่ตื่นเต้น พร้อมฟีเจอร์ใหม่ที่ผู้เล่นรอคอย"
                            duration="3:45"
                            views="125K"
                            likes="8.2K"
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-invert max-w-none">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">🎮 ระบบ Guild ใหม่</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                เราภูมิใจที่จะประกาศการเปิดตัวระบบ Guild ใหม่ที่ผู้เล่นรอคอย! 
                                ตอนนี้คุณสามารถสร้าง Guild ของตัวเองและร่วมมือกับเพื่อนๆ 
                                เพื่อต่อสู้กับ Guild อื่นๆ ในโหมด Guild War ที่ตื่นเต้น
                            </p>
                            
                            <h3 className="text-xl font-bold text-yellow-400 mb-3">✨ ฟีเจอร์เด่น</h3>
                            <ul className="text-gray-300 space-y-2 mb-6">
                                <li className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                                    สร้าง Guild ได้สูงสุด 50 สมาชิก
                                </li>
                                <li className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                                    Guild War แบบ Real-time
                                </li>
                                <li className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                                    Guild Shop พร้อมไอเท็มพิเศษ
                                </li>
                                <li className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-green-400 mr-2" />
                                    Guild Raid Boss รายสัปดาห์
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">⚔️ Guild War Mode</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Guild War จะจัดขึ้นทุกวันเสาร์และอาทิตย์ เวลา 20:00-22:00 น. 
                                แต่ละ Guild จะต้องปกป้องฐานของตัวเองและโจมตีฐานของคู่ต่อสู้
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 rounded-xl p-6">
                                    <h4 className="text-lg font-bold text-yellow-400 mb-3">🏆 รางวัล Guild War</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        <li>• Guild Points สำหรับซื้อไอเท็ม</li>
                                        <li>• Exclusive Guild Titles</li>
                                        <li>• Special Guild Mounts</li>
                                        <li>• Guild Territory Control</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-6">
                                    <h4 className="text-lg font-bold text-green-400 mb-3">📅 ตารางกิจกรรม</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        <li>• จันทร์-ศุกร์: Guild Raid</li>
                                        <li>• เสาร์-อาทิตย์: Guild War</li>
                                        <li>• ทุกวัน: Guild Daily Quest</li>
                                        <li>• รายสัปดาห์: Guild Ranking</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related News */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-white mb-8">ข่าวสารที่เกี่ยวข้อง</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <NewsCard 
                                title="Double XP Weekend กำลังมา!"
                                excerpt="ได้รับ XP เพิ่มเป็น 2 เท่าในวันเสาร์-อาทิตย์นี้ พร้อมกับกิจกรรมพิเศษอื่นๆ อีกมากมาย"
                                date="2 วันที่แล้ว"
                                views="8.5K"
                                category="EVENT"
                                color="blue"
                            />
                            <NewsCard 
                                title="แก้ไขปัญหาการเชื่อมต่อ"
                                excerpt="ปรับปรุงความเสถียรของเซิร์ฟเวอร์และแก้ไขปัญหาการตัดการเชื่อมต่อที่เกิดขึ้นบ่อย"
                                date="5 วันที่แล้ว"
                                views="5.2K"
                                category="UPDATE"
                                color="green"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
