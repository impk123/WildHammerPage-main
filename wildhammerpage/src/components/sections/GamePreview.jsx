'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Users,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Crown,
    Sword,
    Star,
    Zap,
    Shield,
    Trophy,
    Target,
    Flame,
    Gem,
    Loader2
} from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { preRegisterService } from '../../services';
export default function GamePreview() {
    const router = useRouter();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "100px" });
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [registrationCount, setRegistrationCount] = useState(0);
    const [verificationToken, setVerificationToken] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState(null);

    // Load initial statistics
    useEffect(() => {
        loadStatistics();
    }, []);

    // Load registration statistics from API
    const loadStatistics = async () => {
        try {
            const result = await preRegisterService.getStatistics();
            if (result.success) {
                setRegistrationCount(result.data.total || 0);
            }
        } catch (error) {
            console.error('Error loading statistics:', error);
            // Fallback to default count if API fails
            setRegistrationCount(1247);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate email format
        if (!preRegisterService.isValidEmail(email)) {
            setError('กรุณากรอกอีเมลที่ถูกต้อง');
            setIsLoading(false);
            return;
        }

        try {
            // Call pre-registration API
            const result = await preRegisterService.registerEmail({ email });

            if (result.success) {
                setVerificationToken(result.data.verification_token);
                setRegistrationCount(result.data.total_registrations || registrationCount + 1);

                // Show success message
                console.log('Registration successful:', result.message);

                // Show success content in form instead of modal
                setSuccessData({
                    email: email,
                    verificationUrl: result.data.verification_url,
                    token: result.data.verification_token,
                    totalRegistrations: result.data.total_registrations,
                    emailSent: result.data.email_sent,
                    messageId: result.data.email_message_id
                });
                setShowSuccess(true);

            } else {
                // Check if email is already registered or verified
                if (result.error && (result.error.includes('ยืนยันแล้ว') || result.error.includes('ลงทะเบียนแล้ว'))) {
                    setSuccessData({
                        email: email,
                        alreadyVerified: result.error.includes('ยืนยันแล้ว'),
                        message: result.error
                    });
                    setShowSuccess(true);
                } else {
                    setError(result.error || 'เกิดข้อผิดพลาดในการลงทะเบียน');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEmail('');
        setError('');
        setVerificationToken('');
        setShowSuccess(false);
        setSuccessData(null);
    };

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col items-center mt-10 sm:mt-15 lg:mt-20 w-full max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
            {/* Registration Counter */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-2xl">
                    <div className="flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-blue-400 mr-3" />
                        <span className="text-2xl font-bold text-white">ผู้ลงทะเบียนแล้ว</span>
                    </div>
                    <motion.div
                        className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                        key={registrationCount}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {1456 + registrationCount} คน
                    </motion.div>
                </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
            >

                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
                    {!showSuccess ? (
                        <>
                            <div className="text-center mb-6">
                                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">ลงทะเบียนล่วงหน้า</h3>
                                <p className="text-gray-400">รับสิทธิพิเศษเมื่อเกมเปิดตัว</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="กรอกอีเมลของคุณ"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center text-red-400 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            กำลังส่ง...
                                        </>
                                    ) : (
                                        <>
                                            <Sword className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                            ลงทะเบียนเลย
                                            <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-400 text-sm">
                                    ลงทะเบียนแล้วจะได้รับ:
                                </p>
                                <div className="flex justify-center space-x-4 mt-3">
                                    <div className="flex items-center text-yellow-400 text-sm">
                                        <Gem className="w-4 h-4 mr-1" />
                                        <span>ของขวัญพิเศษ</span>
                                    </div>
                                    <div className="flex items-center text-blue-400 text-sm">
                                        <Crown className="w-4 h-4 mr-1" />
                                        <span>สิทธิ์ก่อนใคร</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Success Content */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            {successData.alreadyVerified ? (
                                /* Already Verified */
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                    </motion.div>

                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        ยืนยันแล้ว!
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-300 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        อีเมล <span className="text-green-400 font-semibold">{successData.email}</span> ได้รับการยืนยันแล้ว
                                    </motion.p>

                                    <motion.div
                                        className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <p className="text-green-400 text-sm">
                                            🎉 ขอบคุณที่สนใจ WildHammer! คุณจะได้รับข่าวสารเมื่อเกมเปิดตัว
                                        </p>
                                    </motion.div>

                                    <motion.button
                                        onClick={resetForm}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        ลงทะเบียนอีกครั้ง
                                    </motion.button>
                                </>
                            ) : successData.message && successData.message.includes('ลงทะเบียนแล้ว แต่ยังไม่ได้รับการยืนยัน') ? (
                                /* Already Registered but Not Verified */
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                    </motion.div>

                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        ลงทะเบียนแล้ว
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-300 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        อีเมล <span className="text-yellow-400 font-semibold">{successData.email}</span> ลงทะเบียนแล้ว แต่ยังไม่ได้รับการยืนยัน
                                    </motion.p>

                                    <motion.div
                                        className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <p className="text-yellow-400 text-sm">
                                            📧 กรุณาตรวจสอบอีเมลของคุณและคลิกลิงก์ยืนยันที่ส่งไปก่อนหน้านี้
                                        </p>
                                    </motion.div>

                                    <motion.button
                                        onClick={resetForm}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        ลงทะเบียนอีกครั้ง
                                    </motion.button>
                                </>
                            ) : (
                                /* New Registration Success */
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                    </motion.div>

                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        ลงทะเบียนสำเร็จ!
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-300 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        ขอบคุณที่สนใจ WildHammer! เราได้ส่งข้อมูลยืนยันไปยังอีเมลของคุณแล้ว
                                    </motion.p>

                                    {/* Email Info */}
                                    <motion.div
                                        className="bg-slate-700/50 rounded-lg p-4 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="flex items-center justify-center mb-3">
                                            <Mail className="w-5 h-5 text-blue-400 mr-2" />
                                            <span className="text-blue-400 font-medium">อีเมลที่ส่งไป:</span>
                                        </div>
                                        <p className="text-yellow-400 font-semibold break-all">
                                            {successData.email}
                                        </p>
                                    </motion.div>

                                    {/* Instructions */}
                                    <motion.div
                                        className="space-y-3 mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                                            <p className="text-blue-400 text-sm font-medium mb-1">ขั้นตอนถัดไป:</p>
                                            <p className="text-gray-300 text-xs">
                                                1. ตรวจสอบอีเมลของคุณ (อาจอยู่ใน Inbox หรือ Spam)
                                            </p>
                                            <p className="text-gray-300 text-xs">
                                                2. คลิกลิงก์ยืนยันในอีเมล
                                            </p>
                                            <p className="text-gray-300 text-xs">
                                                3. รอรับข่าวสารเมื่อเกมเปิดตัว!
                                            </p>
                                        </div>
                                    </motion.div>

                                  

                                    {/* Action Buttons */}
                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-3"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <button
                                            onClick={resetForm}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                        >
                                            ลงทะเบียนอีกครั้ง
                                        </button>
                                    </motion.div>

                                    
                                </>
                            )}
                        </motion.div>
                    )}
                </div>
                
            </motion.div>

            {/* Game Features Preview */}
            <motion.div
                className="mt-16 grid mb-10 grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <div className="text-center p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-all duration-300">
                    <Sword className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="text-gray-300 text-sm font-medium">ระบบต่อสู้</p>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-all duration-300">
                    <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-gray-300 text-sm font-medium">การผจญภัย</p>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-all duration-300">
                    <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-300 text-sm font-medium">รางวัล</p>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-all duration-300">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-gray-300 text-sm font-medium">ความปลอดภัย</p>
                </div>
            </motion.div>

        </motion.div>
    );
}
