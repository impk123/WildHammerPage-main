'use client';
import React from 'react';
import { X, AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react';

const ErrorModal = ({ 
    isOpen, 
    onClose, 
    title = "เกิดข้อผิดพลาด", 
    message = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    showRetry = false,
    onRetry = null,
    type = "error" // "error" or "success"
}) => {
    if (!isOpen) return null;

    const isSuccess = type === "success";
    const bgColor = isSuccess ? "from-green-800 via-green-900 to-green-800" : "from-red-800 via-red-900 to-red-800";
    const borderColor = isSuccess ? "border-green-400/50" : "border-red-400/50";
    const cornerColor = isSuccess ? "border-green-400/50" : "border-red-400/50";
    const closeColor = isSuccess ? "text-green-300 hover:text-white" : "text-red-300 hover:text-white";
    const iconBg = isSuccess ? "from-green-400 to-green-600" : "from-red-400 to-red-600";
    const titleColor = isSuccess ? "text-green-100" : "text-red-100";
    const messageColor = isSuccess ? "text-green-200" : "text-red-200";
    const buttonBg = isSuccess ? "bg-green-600/50 hover:bg-green-600" : "bg-red-600/50 hover:bg-red-600";
    const buttonGradient = isSuccess ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
    const IconComponent = isSuccess ? CheckCircle : AlertTriangle;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className={`relative bg-gradient-to-br ${bgColor} rounded-2xl border-2 ${borderColor} shadow-2xl max-w-md w-full mx-4 overflow-hidden`}>
                {/* Header */}
                <div className="relative p-6 pb-4">
                    {/* Decorative corner elements */}
                    <div className={`absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 ${cornerColor} rounded-tl-2xl`}></div>
                    <div className={`absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 ${cornerColor} rounded-tr-2xl`}></div>
                    
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 ${closeColor} transition-colors`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    {/* Icon and Title */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${iconBg} rounded-full flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${titleColor}`}>
                            {title}
                        </h3>
                    </div>
                    
                    {/* Message */}
                    <div className="space-y-3">
                        <p className={`${messageColor} leading-relaxed`}>
                            {message}
                        </p>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6">
                    <div className="flex space-x-3">
                        {showRetry && onRetry && (
                            <button
                                onClick={onRetry}
                                className={`flex-1 px-4 py-3 ${buttonBg} text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2`}
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>ลองใหม่</span>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className={`px-4 py-3 bg-gradient-to-r ${buttonGradient} text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${showRetry && onRetry ? 'flex-1' : 'w-full'}`}
                        >
                            <span>ปิด</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
