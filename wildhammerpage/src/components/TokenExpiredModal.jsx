'use client';
import React from 'react';
import { X, AlertTriangle, RefreshCw, Gamepad2 } from 'lucide-react';

const TokenExpiredModal = ({ 
    isOpen, 
    onClose, 
    title = "Token หมดอายุ", 
    message = "กรุณา login ใหม่ผ่านเกมแล้วกดซื้อใหม่อีกครั้ง"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-gradient-to-br from-red-800 via-red-900 to-red-800 rounded-2xl border-2 border-red-400/50 shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-4">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-red-400/50 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-red-400/50 rounded-tr-2xl"></div>
                    
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-red-300 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    {/* Icon and Title */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-red-100">
                            {title}
                        </h3>
                    </div>
                    
                    {/* Message */}
                    <div className="space-y-3">
                        <p className="text-red-200 leading-relaxed">
                            {message}
                        </p>
                        
                        {/* Instructions */}
                        <div className="bg-red-900/30 rounded-lg p-4 border border-red-600/30">
                            <div className="flex items-start space-x-3">
                                <Gamepad2 className="w-5 h-5 text-red-300 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-red-200">
                                    <p className="font-medium mb-2">ขั้นตอนการแก้ไข:</p>
                                    <ol className="space-y-1 list-decimal list-inside">
                                        <li>กลับเข้าสู่เกม</li>
                                        <li>ทำการ Login ใหม่</li>
                                        <li>กดซื้อแพคเกจผ่านเกมอีกครั้ง</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6">
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-red-600/50 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>ลองใหม่</span>
                        </button>
                        <button
                            onClick={() => {
                                // Redirect to home or refresh page
                                window.location.href = '/';
                            }}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <Gamepad2 className="w-4 h-4" />
                            <span>กลับหน้าหลัก</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenExpiredModal;
