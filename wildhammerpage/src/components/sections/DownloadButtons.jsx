'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DownloadButtons() {
    const buttonsRef = useRef(null);
    const isButtonsInView = useInView(buttonsRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={buttonsRef}
            className="mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={isButtonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                {/* Google Play Store */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isButtonsInView ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -3, 0]
                    } : { opacity: 0, scale: 0.8 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.4,
                        ease: "easeOut",
                        y: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href="https://play.google.com/store/apps/details?id=com.hdh.wildhammer" target="_blank">    
                    <Image 
                        src="/assets/google.png" 
                        alt="google_play_btn" 
                        width={250} 
                        height={160} 
                        className='w-48 sm:w-56 lg:w-64 h-auto hover:cursor-pointer hover:drop-shadow-2xl hover:drop-shadow-yellow-500/50 hover:brightness-110 hover:contrast-110 hover:saturate-150 transition-all duration-300' 
                    />
                    </a>
                </motion.div>

                {/* Apple App Store */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isButtonsInView ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -3, 0]
                    } : { opacity: 0, scale: 0.8 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeOut",
                        y: {
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.7
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }} 
                >
                    <a href="https://play.wildhammer.online" target="_blank">
                    <Image 
                        src="/assets/app store.png" 
                        alt="app_store_btn" 
                        width={250} 
                        height={160} 
                        className='w-48 sm:w-56 lg:w-64 h-auto hover:cursor-pointer hover:drop-shadow-2xl hover:drop-shadow-yellow-500/50 hover:brightness-110 hover:contrast-110 hover:saturate-150 transition-all duration-300' 
                    />
                    </a>
                </motion.div>

                {/* APK Download */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isButtonsInView ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -3, 0]
                    } : { opacity: 0, scale: 0.8 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.6,
                        ease: "easeOut",
                        y: {
                            duration: 3.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.9
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href="/apk/WildHammer-release.zip" target="_blank">    
                        <Image 
                            src="/assets/apk.png" 
                            alt="apk_btn" 
                            width={250} 
                            height={160} 
                            className='w-48 sm:w-56 lg:w-64 h-auto hover:cursor-pointer hover:drop-shadow-2xl hover:drop-shadow-yellow-500/50 hover:brightness-110 hover:contrast-110 hover:saturate-150 transition-all duration-300' 
                        />
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
}
