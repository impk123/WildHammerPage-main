'use client';

import { useEffect, useState } from 'react';
import { Sword } from 'lucide-react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] ${isClicking ? 'scale-75' : 'scale-100'
          } ${isHovering ? 'scale-110' : 'scale-100'}`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate(0, 0)',
        }}
      >
        {/* Sword Cursor using Lucide Icon */}
        <Sword
          className={`w-6 h-6 ${isHovering ? 'text-yellow-400 drop-shadow-lg' : 'text-yellow-500'
            } ${isClicking ? 'rotate-12' : 'rotate-0'}`}
        />
      </div>

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9996]"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
          }}
        >
          <div className="w-10 h-10 border-2 border-yellow-400 rounded-full animate-ping"></div>
        </div>
      )}
    </>
  );
}
