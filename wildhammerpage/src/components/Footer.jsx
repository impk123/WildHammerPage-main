'use client';

import { 
  ShieldCheck, 
  Star, 
  Gem, 
  Trophy, 
  Sword, 
  Crown,
  Gamepad2,
  Zap,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <Sword className="w-8 h-8 text-yellow-400" />
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  WildHammer
                </h3>
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              เกม RPG การผจญภัยที่เต็มไปด้วยความสนุกและความตื่นเต้น
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-500">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-sm">โดย HunterDev</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">ลิงก์ด่วน</h4>
            <div className="space-y-2">
              <a 
                href="/privacy-policy" 
                className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a 
                href="/user-policy" 
                className="block text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                ข้อตกลงการใช้งาน
              </a>
            </div>
          </div> */}

          {/* Contact Info */}
          {/* <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">ติดต่อเรา</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">enemybehindbehind@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">0644293692</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">สิงค์โปร</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-sm">
                © {currentYear} <span className="text-yellow-400 font-semibold">HunterDev</span>. สงวนลิขสิทธิ์.
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>เกม RPG</span>
              </span>
              <span className="flex items-center space-x-1">
                <Gem className="w-4 h-4" />
                <span>การผจญภัย</span>
              </span>
              <span className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>ความปลอดภัย</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
