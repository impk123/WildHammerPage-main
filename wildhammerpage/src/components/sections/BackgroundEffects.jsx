'use client';

import { 
  Sparkles, 
  Star,
  Gem,
  Trophy
} from 'lucide-react';

export default function BackgroundEffects() {
  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="w-6 h-6 text-yellow-400 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce">
        <Star className="w-4 h-4 text-blue-400 opacity-40" />
      </div>
      <div className="absolute bottom-32 left-20 animate-pulse">
        <Gem className="w-5 h-5 text-purple-400 opacity-50" />
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce">
        <Trophy className="w-6 h-6 text-yellow-500 opacity-60" />
      </div>
    </>
  );
}
