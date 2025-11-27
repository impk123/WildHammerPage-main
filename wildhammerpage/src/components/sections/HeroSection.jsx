'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LogoAnimation from './LogoAnimation';
import GameDescription from './GameDescription';
import ImageCarousel from './ImageCarousel';
import DownloadButtons from './DownloadButtons';

export default function HeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "100px" });

    return (
        <section ref={ref} className="relative z-10 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 ">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-purple-900/20 to-slate-800/30"></div>
            <Image 
                src="/assets/img_lantian.png" 
                alt="bg" 
                width={1000} 
                height={1000} 
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30" 
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Hero Content */}
                    <motion.div
                        className="mb-4 sm:mb-12 lg:mb-16 relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20 xl:gap-40 mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        >
                            {/* Left Section - Logo & Description */}
                            <div className="relative flex flex-col items-center justify-center order-1 lg:order-1">
                                <LogoAnimation isInView={isInView} />
                                <GameDescription isInView={isInView} />
                            </div>
                            
                            {/* Right Section - Image Carousel */}
                            <div className="order-2 lg:order-2">
                                <ImageCarousel isInView={isInView} />
                            </div>
                        </motion.div>
                    </motion.div>

                   

                    {/* Download Buttons */}
                    <div className="mt-8 sm:mt-12 lg:mt-16">
                        <DownloadButtons />
                    </div>
                </div>
            </div>
        </section>
    );
}