'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Menu,
  X,
  Shield,
  Scroll,
  Gamepad2,
  Zap,
  Package,
  Trophy,
  Gift
} from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-[9999] bg-slate-900/95 backdrop-blur-md h-fit border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/ranking"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300 group"
            >
              <Trophy className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="font-medium">อันดับ</span>
            </Link>
            <Link
              href="/items"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
            >
              <Package className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
              <span className="font-medium">คลังไอเท็ม</span>
            </Link>

            <Link
              href="/privacy-policy"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
            >
              <Shield className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
              <span className="font-medium">นโยบายความเป็นส่วนตัว</span>
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image src="/assets/2.png" alt="WildHammer" width={100} height={100} priority className="group-hover:text-yellow-300 transition-colors duration-300 p-5" />
            </Link>
          </div>



          {/* Right Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/user-policy"
              className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-300 group"
            >
              <Scroll className="w-5 h-5 group-hover:text-orange-400 transition-colors duration-300" />
              <span className="font-medium">ข้อตกลงการใช้งาน</span>
            </Link>
            <Link
              href="/rewardss1"
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
            >
              <Gift className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
              <span className="font-medium">ของรางวัล</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-400">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-sm">โดย HunterDev</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/ranking"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
                <span className="font-medium">อันดับ</span>
              </Link>
              <Link
                href="/items"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
                <span className="font-medium">คลังไอเท็ม</span>
              </Link>
              <Link
                href="/rewardss1"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="font-medium">ของรางวัล</span>
              </Link>
              <Link
                href="/privacy-policy"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="font-medium">นโยบายความเป็นส่วนตัว</span>
              </Link>
              <Link
                href="/user-policy"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Scroll className="w-5 h-5 group-hover:text-orange-400 transition-colors duration-300" />
                <span className="font-medium">ข้อตกลงการใช้งาน</span>
              </Link>
              <div className="flex items-center space-x-3 px-3 py-2 text-gray-400">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm">โดย HunterDev</span>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
