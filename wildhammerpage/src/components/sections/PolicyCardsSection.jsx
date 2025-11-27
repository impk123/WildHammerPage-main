'use client';

import Link from "next/link";
import { 
  Shield, 
  Scroll
} from 'lucide-react';

export default function PolicyCardsSection() {
  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Policy Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
              href="/privacy-policy"
              className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 p-8 border border-slate-700 hover:border-purple-500/50 transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <Shield className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  นโยบายความเป็นส่วนตัว
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  เรียนรู้เกี่ยวกับการเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลของคุณในโลกแห่งการผจญภัย
                </p>
                
                {/* Decorative Elements */}
                <div className="flex justify-center mt-6 space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </Link>

            <Link 
              href="/user-policy"
              className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 p-8 border border-slate-700 hover:border-orange-500/50 transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <Scroll className="w-16 h-16 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">
                  ข้อตกลงการใช้งาน
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  เงื่อนไขและข้อกำหนดในการใช้งาน WildHammer เพื่อการผจญภัยที่ปลอดภัยและสนุกสนาน
                </p>
                
                {/* Decorative Elements */}
                <div className="flex justify-center mt-6 space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
