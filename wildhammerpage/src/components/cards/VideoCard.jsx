'use client';

import { Play, Eye, Heart, Clock } from 'lucide-react';

export default function VideoCard({ 
    title, 
    description, 
    duration, 
    views, 
    likes, 
    thumbnail,
    className = "" 
}) {
    return (
        <div className={`group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 ${className}`}>
            <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group/play relative">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/play:bg-white/30 transition-all duration-300 shadow-2xl">
                            <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
                    </button>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold border border-white/20">
                    {duration}
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{views}</span>
                        </div>
                        <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            <span>{likes}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
