'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ isInView }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "/assets/4.png",
        "/assets/image1.png",
        "/assets/image2.png",
        "/assets/image3.png"
    ];

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // เปลี่ยนรูปทุก 10 วินาที

        return () => clearInterval(interval);
    }, [images.length]);

    // Navigation functions
    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
            animate={{
                y: [0, -8, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Previous Button */}
            <motion.button
                className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                onClick={goToPrevious}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </motion.button>

            {/* Next Button */}
            <motion.button
                className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                onClick={goToNext}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </motion.button>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    <Image
                        src={images[currentImageIndex]}
                        alt={`WildHammer ${currentImageIndex + 1}`}
                        width={500}
                        height={100}
                        className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] hover:drop-shadow-[0_35px_70px_rgba(0,0,0,0.6)] transition-all duration-300"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-3 sm:mt-4 space-x-2">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                            ? 'bg-yellow-400 scale-125'
                            : 'bg-gray-400 hover:bg-gray-300'
                            }`}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            {/* Image Counter */}
            <motion.div
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/50 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                {currentImageIndex + 1} / {images.length}
            </motion.div>
        </motion.div>
    );
}
