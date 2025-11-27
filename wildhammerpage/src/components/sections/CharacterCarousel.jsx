'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function CharacterCarousel() {
    const ref = useRef(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // รายการรูปตัวละครจากโฟลเดอร์ modal
    const characters = [
        { src: '/assets/img/modal/Untitled.png', alt: 'Character 1' },
        { src: '/assets/img/modal/758f694c-d5d0-4081-89bc-11ca693b971e.png', alt: 'Character 2' },
        { src: '/assets/img/modal/43a5b4f6-76b5-4585-886d-478b0621c933.png', alt: 'Character 3' },
        { src: '/assets/img/modal/e89a57b3-82f3-4a8e-8c7c-a8724038da17.png', alt: 'Character 4' },
        { src: '/assets/img/modal/430336f8-eb65-4577-8e77-8536142dca94.png', alt: 'Character 5' },
        { src: '/assets/img/modal/f7cc99e2-ac95-4537-be4f-6afbd8de3e53.png', alt: 'Character 6' },
        { src: '/assets/img/modal/bc6e064b-3ca6-4f7b-9358-faefd874f28f.png', alt: 'Character 7' },
        { src: '/assets/img/modal/b7cbec7f-e7a3-4da7-9c42-cd84e8a1d26f.png', alt: 'Character 8' },
        { src: '/assets/img/modal/bc5d8264-fce4-4a99-8816-8cbcb7d8487f.png', alt: 'Character 10' },
        { src: '/assets/img/modal/49bc32e2-66b0-4e16-a898-9c68825da5a3.png', alt: 'Character 11' },
        { src: '/assets/img/modal/b7c38cbf-ca3d-4ae8-920f-8bdfa90fea2f.png', alt: 'Character 12' },
        { src: '/assets/img/modal/b1fb4b09-a8be-42c3-b07e-0d1ab8ec4535.png', alt: 'Character 13' },
        { src: '/assets/img/modal/9b58b546-bc77-47b5-88aa-7b1ce5ad2d96.png', alt: 'Character 14' },
        { src: '/assets/img/modal/4179aea3-a5bb-4cdd-b2d9-b4d1234cc04e.png', alt: 'Character 15' },
        { src: '/assets/img/modal/ba474f43-7a20-4d07-a334-71b663676a56.png', alt: 'Character 16' },
        { src: '/assets/img/modal/7dc679dc-ca55-4cdf-8d82-b21ab7a0324a.png', alt: 'Character 17' },
        { src: '/assets/img/modal/1fac4295-d204-47d7-9f85-f8e194a910f6.png', alt: 'Character 18' },
        { src: '/assets/img/modal/bfc9c3fb-1254-4353-99db-5c38eced3c3d.png', alt: 'Character 19' },
        { src: '/assets/img/modal/e5d9bbe5-97a9-42b3-9316-5efa7af3d97b.png', alt: 'Character 20' },
        { src: '/assets/img/modal/085c6430-2c9b-48c9-9466-c9007f9537f0.png', alt: 'Character 21' },
        { src: '/assets/img/modal/Untitled-removebg-preview.png', alt: 'Character 22' },
        { src: '/assets/img/modal/50e29a01-585b-42c9-ae88-5ab327f56552.png', alt: 'Character 23' },
        { src: '/assets/img/modal/d9373e24-0966-44b3-9f52-fe23c668278e.png', alt: 'Character 24' },
        { src: '/assets/img/modal/840dce70-ecda-46f5-a860-3199e4b926ce.png', alt: 'Character 25' },
        { src: '/assets/img/modal/d58e6d6f-fb6b-43b5-ac7c-e32d012d243c.png', alt: 'Character 26' },
        { src: '/assets/img/modal/4e74bde9-9f0e-49a0-b256-0b3ce6f2981f.png', alt: 'Character 27' },
        { src: '/assets/img/modal/19064f7e-9869-4fd8-9829-a75e3a02091b.png', alt: 'Character 28' },
        { src: '/assets/img/modal/ed6df815-dbd9-423e-9479-03dc75ad646d.png', alt: 'Character 29' },
        { src: '/assets/img/modal/c357aa04-11d3-4dbb-a1fa-caefdda690ca.png', alt: 'Character 30' },
        { src: '/assets/img/modal/63bd1382-c792-4728-a8f4-b24dae937fc5.png', alt: 'Character 31' },
        { src: '/assets/img/modal/6497e347-cbdb-4e4f-8b38-7b02f709bbb8.png', alt: 'Character 32' },
        { src: '/assets/img/modal/8bf8598f-6f67-40fb-9738-a3b49515b07e.png', alt: 'Character 33' },
        { src: '/assets/img/modal/ce17b194-b353-4bda-b7ab-55fdbe47aca0.png', alt: 'Character 34' },
        { src: '/assets/img/modal/e46725b3-871a-4c1e-b758-a04ba1afeca2.png', alt: 'Character 35' },
        { src: '/assets/img/modal/0e305710-8bb0-42e0-bf22-7740e257fd97.png', alt: 'Character 36' },
        { src: '/assets/img/modal/b4d87a70-f3cf-4da9-808c-bc5cee02c17d.png', alt: 'Character 37' },
        { src: '/assets/img/modal/arenaKF.png', alt: 'Arena Character' }
    ];

    // สร้าง array ซ้ำเพื่อให้ infinite loop ทำงานได้
    const duplicatedCharacters = [...characters, ...characters];

    return (
        <section ref={ref} className="py-20  bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                        ตัวละครในเกม
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        ค้นพบตัวละครหลากหลายที่มีเอกลักษณ์เฉพาะตัว พร้อมทักษะและความสามารถที่แตกต่างกัน
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative">
                   
                    {/* Infinite Carousel */}
                    <motion.div 
                        className="flex gap-6"
                        animate={{ 
                            x: [0, -50 * characters.length]
                        }}
                        transition={{ 
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {duplicatedCharacters.map((character, index) => (
                            <motion.div
                                key={`${character.src}-${index}`}
                                className="flex-shrink-0 group cursor-pointer"
                                whileHover={{ 
                                    scale: 1.05,
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedCharacter(character)}
                            >
                                <div className="relative w-48 h-64 rounded-2xl overflow-hidden  group-hover:shadow-yellow-500/25 transition-all duration-300">
                                    <Image
                                        src={character.src}
                                        alt={character.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 192px, 192px"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Character Name */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-semibold text-sm truncate">
                                            {character.alt}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Text */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 text-sm">
                        เลื่อนเพื่อดูตัวละครทั้งหมด • คลิกเพื่อดูรายละเอียด
                    </p>
                </motion.div>
            </div>

            {/* Character Modal */}
            <AnimatePresence>
                {selectedCharacter && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedCharacter(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        
                        {/* Modal Content */}
                        <motion.div
                            className="relative max-w-4xl max-h-[90vh] w-full"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <motion.button
                                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedCharacter(null)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Image Container */}
                            <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={selectedCharacter.src}
                                    alt={selectedCharacter.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                
                                {/* Character Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {selectedCharacter.alt}
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        คลิกที่พื้นหลังหรือปุ่ม X เพื่อปิด
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
