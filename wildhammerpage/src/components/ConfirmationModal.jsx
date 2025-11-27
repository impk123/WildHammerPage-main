'use client';
import React from 'react';
import { X, ShoppingCart, AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "ยืนยัน", 
    cancelText = "ยกเลิก",
    isLoading = false 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl border-2 border-amber-400/50 shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-4">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-amber-400/50 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-amber-400/50 rounded-tr-2xl"></div>
                    
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    {/* Icon and Title */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-100">
                            {title}
                        </h3>
                    </div>
                    
                    {/* Message */}
                    <p className="text-slate-300 leading-relaxed">
                        {message}
                    </p>
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6">
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-slate-600/50 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>กำลังดำเนินการ...</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>{confirmText}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
