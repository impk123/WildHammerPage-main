'use client';

import { motion } from 'framer-motion';

export default function GameDescription({ isInView }) {
    const features = [
        { text: "⚔️ การต่อสู้ที่ดุเดือด", gradient: "from-yellow-400 to-orange-500" },
        { text: "🎮 เกมเพลย์ที่หลากหลาย", gradient: "from-blue-400 to-purple-500" },
        { text: "🏆 ระบบอัพเกรดที่ลึกซึ้ง", gradient: "from-green-400 to-teal-500" }
    ];

    return (
        <motion.div
            className="text-center mt-4 sm:mt-[-50px] lg:mt-[-100px] mr-0 lg:mr-[-20px] px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
        >
            {/* Title with Floating and Glow Effect */}
            <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    textShadow: [
                        "0 0 20px rgba(255, 193, 7, 0.3)",
                        "0 0 30px rgba(255, 193, 7, 0.5)",
                        "0 0 20px rgba(255, 193, 7, 0.3)"
                    ]
                } : { opacity: 0, y: 30, scale: 0.8 }}
                transition={{ 
                    duration: 1, 
                    delay: 1, 
                    ease: "easeOut",
                    textShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                เกม WildHammer
            </motion.h2>

            {/* Description with Fade In */}
            <motion.p 
                className="text-base sm:text-lg md:text-xl text-white mb-4 drop-shadow-md max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
                โหลดไปเล่นได้แล้วตอนนี้! สัมผัสประสบการณ์การต่อสู้ที่ตื่นเต้นเร้าใจ
            </motion.p>

            {/* Features with Staggered Animation */}
            <motion.div 
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base px-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
            >
                {features.map((feature, index) => (
                    <motion.span
                        key={index}
                        className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent font-semibold`}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={isInView ? { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            y: [0, -5, 0]
                        } : { opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: 1.6 + (index * 0.2), 
                            ease: "easeOut",
                            y: {
                                duration: 2 + (index * 0.5),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.6 + (index * 0.2)
                            }
                        }}
                        whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {feature.text}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}
