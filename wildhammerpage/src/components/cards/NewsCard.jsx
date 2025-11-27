'use client';

import { Calendar, Eye, ChevronRight } from 'lucide-react';

export default function NewsCard({ 
    title, 
    excerpt, 
    date, 
    views, 
    category, 
    color,
    className = "",
    onClick 
}) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        red: 'from-red-500 to-red-600',
        purple: 'from-purple-500 to-purple-600',
        yellow: 'from-yellow-500 to-yellow-600',
        orange: 'from-orange-500 to-orange-600'
    };

    const badgeColors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
        orange: 'bg-orange-500'
    };

    return (
        <article 
            className={`group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className={`aspect-video bg-gradient-to-br ${colorClasses[color]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                    <span className={`${badgeColors[color]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                        {category}
                    </span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Arrow Icon on Hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-6 h-6 text-white" />
                </div>
            </div>
            
            <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{views}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
