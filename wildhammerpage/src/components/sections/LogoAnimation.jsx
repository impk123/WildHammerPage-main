'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LogoAnimation({ isInView }) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateY: [0, 5, -5, 0]
            } : { opacity: 0, scale: 0.5, y: 50 }}
            transition={{ 
                duration: 1.2, 
                delay: 0.3, 
                ease: "easeOut",
                rotateY: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
        >
            <motion.div
                animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image 
                    src="/assets/2.png" 
                    alt="WildHammer Logo" 
                    width={500} 
                    height={100} 
                    priority
                    className="w-80 sm:w-96 md:w-96 lg:w-[500px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" 
                />
            </motion.div>
        </motion.div>
    );
}
