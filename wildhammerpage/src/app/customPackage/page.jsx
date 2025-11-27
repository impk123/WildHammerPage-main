'use client';
import React, { useState, useEffect } from 'react'
import { getPackage, PurchasePackage, getGamePacketsHistory } from '@/services/package/package';
import PackageCard from '@/components/PackageCard';
import UserProfile from '@/components/UserProfile';
import ConfirmationModal from '@/components/ConfirmationModal';
import TokenExpiredModal from '@/components/TokenExpiredModal';
import ErrorModal from '@/components/ErrorModal';
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { checkToken } from '@/services/token/checkToken';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { getRealMoney } from '@/services/getRealmoney/realMoney';
import Image from 'next/image';
const page = () => {
    const searchParams = useSearchParams();
    const [dataPackage, setDataPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [purchasing, setPurchasing] = useState(false);
    const [selectedType, setSelectedType] = useState('all');
    const [userInfo, setUserInfo] = useState(null);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [realMoney, setRealMoney] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [modalType, setModalType] = useState('error');
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const router = useRouter();


    const [token, setToken] = useState(null);

    useEffect(() => {
        const username = searchParams.get("username");
        const serverId = searchParams.get("server_id");
        const tokenParam = searchParams.get("token");
        setToken(tokenParam);

        const fetchRealMoney = async () => {
            const res = await getRealMoney(username, tokenParam);
            setRealMoney(res.data);
        }
        fetchRealMoney();
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getPackage();

                if (res?.success && res?.data?.packets) {
                    setDataPackage(res.data.packets);
                } else {
                    setError('No package data found');
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
                setError('Failed to load packages');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const username = searchParams.get("username");
                const serverId = searchParams.get("server_id");
                const token = searchParams.get("token");


                if (!token || !username || !serverId) {
                    router.push('/');
                }


                if (token) {
                    const response = await checkToken(token);
                    if (response?.success) {
                        setUserInfo({
                            username,
                            serverId,
                            ...response.data
                        });
                        setTokenValid(true);
                    } else {
                        setTokenValid(false);
                        setShowTokenExpiredModal(true);
                    }
                } else {
                    setTokenValid(false);
                    setShowTokenExpiredModal(true);
                }
            } catch (error) {
                console.error('Error checking token:', error);
                setTokenValid(false);
                setShowTokenExpiredModal(true);
            } finally {
                setTokenLoading(false);
            }
        };

        verifyToken();
    }, [searchParams]);

    const handlePurchase = (packageItem) => {
        setSelectedPackage(packageItem);
        setShowConfirmModal(true);
    };

    const handleConfirmPurchase = async () => {
        if (!selectedPackage) return;

        try {
            setPurchasing(true);
            
            // Check token validity before purchase
            if (!tokenValid || !token) {
                setShowConfirmModal(false);
                setSelectedPackage(null);
                setShowTokenExpiredModal(true);
                return;
            }
            
            const result = await PurchasePackage(selectedPackage.id, token);
            
            // Check if the result indicates token expiration
            if (result && result.error && (result.error.includes('token') || result.error.includes('expired') || result.error.includes('invalid'))) {
                setShowConfirmModal(false);
                setSelectedPackage(null);
                setShowTokenExpiredModal(true);
                return;
            }
            
            // Show success message or handle result
            if (result && result.success) {
                setErrorTitle('ซื้อแพคเกจสำเร็จ');
                setErrorMessage('คุณได้ซื้อแพคเกจเรียบร้อยแล้ว');
                setModalType('success');
                setShowErrorModal(true);
                // Refresh purchase history if it's currently shown
                if (showHistory) {
                    fetchPurchaseHistory();
                }
            } else {
                setErrorTitle('เกิดข้อผิดพลาด');
                setErrorMessage('เกิดข้อผิดพลาดในการซื้อแพคเกจ กรุณาลองใหม่อีกครั้ง');
                setModalType('error');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Error purchasing package:', error);
            
            // Check if error is related to token expiration
            if (error.message && (error.message.includes('401') || error.message.includes('token') || error.message.includes('expired'))) {
                setShowConfirmModal(false);
                setSelectedPackage(null);
                setShowTokenExpiredModal(true);
            } else if (error.message && error.message.includes('Maximum purchases reached')) {
                setErrorTitle('ซื้อครบจำนวนแล้ว');
                setErrorMessage('คุณซื้อแพคเกจนี้ครบจำนวนที่กำหนดแล้ว กรุณาเลือกแพคเกจอื่น');
                setModalType('error');
                setShowErrorModal(true);
            } else {
                setErrorTitle('เกิดข้อผิดพลาด');
                setErrorMessage('เกิดข้อผิดพลาดในการซื้อแพคเกจ กรุณาลองใหม่อีกครั้ง');
                setModalType('error');
                setShowErrorModal(true);
            }
        } finally {
            setPurchasing(false);
            setShowConfirmModal(false);
            setSelectedPackage(null);
        }
    };

    const handleCancelPurchase = () => {
        setShowConfirmModal(false);
        setSelectedPackage(null);
    };

    const handleCloseTokenExpiredModal = () => {
        setShowTokenExpiredModal(false);
        // Optionally redirect to home or refresh the page
        router.push('/');
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
        setErrorTitle('');
        setModalType('error');
    };

    const fetchPurchaseHistory = async () => {
        if (!token) return;
        
        try {
            setHistoryLoading(true);
            const response = await getGamePacketsHistory(token);
            
            // Handle the correct response structure based on API
            if (response?.success && response?.data?.history && Array.isArray(response.data.history)) {
                setPurchaseHistory(response.data.history);
            } else if (Array.isArray(response?.data)) {
                setPurchaseHistory(response.data);
            } else if (Array.isArray(response)) {
                setPurchaseHistory(response);
            } else {
                console.log('Unexpected response structure:', response);
                setPurchaseHistory([]);
            }
        } catch (error) {
            console.error('Error fetching purchase history:', error);
            setPurchaseHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleToggleHistory = () => {
        setShowHistory(!showHistory);
        if (!showHistory && purchaseHistory.length === 0) {
            fetchPurchaseHistory();
        }
    };

    // Get unique package types for filter (only from active packages)
    const packageTypes = dataPackage ? [...new Set(dataPackage.filter(item => item.is_active).map(item => item.packet_type))] : [];

    // Filter packages based on selected type and active status
    const filteredPackages = dataPackage ?
        selectedType === 'all' ?
            dataPackage.filter(item => item.is_active) :
            dataPackage.filter(item => item.packet_type === selectedType && item.is_active)
        : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-white text-xl">Loading packages...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 ">
            {/* HeroGeometric Background */}
            <div className="absolute inset-0 "></div>
            <div className="fixed inset-0">
                {/* <HeroGeometric
                    badge="Game Packages"
                    title1="Enhance Your"
                    title2="Gaming Experience"
                /> */}
                 <Image 
                src="/assets/img_lantian.png" 
                alt="bg" 
                width={1000} 
                height={1000} 
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30" 
            />
            </div>


            {/* User Profile */}
            {realMoney && (
                <div className="relative z-20 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-sm sm:max-w-md mx-auto">
                            <UserProfile userData={realMoney} />
                        </div>
                    </div>
                </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-20 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 md:pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">Game Packages</h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md mb-6 sm:mb-8 px-4">
                            Choose your perfect package to enhance your gaming experience
                        </p>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 z-[9999] px-4">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${selectedType === 'all'
                                    ? 'bg-white/20 text-white border-2 border-white/40 backdrop-blur-md shadow-lg'
                                    : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white/90 hover:border-white/30'
                                    }`}
                            >
                                All Packages
                            </button>
                            {packageTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 capitalize text-sm sm:text-base ${selectedType === type
                                        ? 'bg-white/20 text-white border-2 border-white/40 backdrop-blur-md shadow-lg'
                                        : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white/90 hover:border-white/30'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* History Toggle Button */}
                        {tokenValid && (
                            <div className="flex justify-center mb-6 sm:mb-8">
                                <button
                                    onClick={handleToggleHistory}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-400/30 rounded-full font-medium transition-all duration-300 hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-400/50 backdrop-blur-md shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {showHistory ? 'ซ่อนประวัติการซื้อ' : 'ดูประวัติการซื้อ'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Purchase History Section */}
                    {showHistory && tokenValid && (
                        <div className="mb-8 sm:mb-10 md:mb-12">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                        <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        ประวัติการซื้อ
                                        {Array.isArray(purchaseHistory) && purchaseHistory.length > 0 && (
                                            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-full text-sm font-medium text-amber-300">
                                                {purchaseHistory.length} รายการ
                                            </span>
                                        )}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={fetchPurchaseHistory}
                                            disabled={historyLoading}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-400/30 rounded-lg font-medium transition-all duration-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                                        >
                                            <svg className={`w-4 h-4 ${historyLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            {historyLoading ? 'กำลังรีเฟรช...' : 'รีเฟรช'}
                                        </button>
                                        {historyLoading && (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        )}
                                    </div>
                                </div>

                                {historyLoading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                        <p className="text-white/70">กำลังโหลดประวัติการซื้อ...</p>
                                    </div>
                                ) : !Array.isArray(purchaseHistory) || purchaseHistory.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">ยังไม่มีประวัติการซื้อ</h3>
                                        <p className="text-white/60 mb-4">เมื่อคุณซื้อแพคเกจ ประวัติจะแสดงที่นี่</p>
                                        <button
                                            onClick={fetchPurchaseHistory}
                                            disabled={historyLoading}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 rounded-lg font-medium transition-all duration-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                                        >
                                            <svg className={`w-4 h-4 ${historyLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            ลองรีเฟรชดู
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {Array.isArray(purchaseHistory) && purchaseHistory.map((purchase, index) => (
                                            <div key={purchase?.id || `purchase-${index}`} className="group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 shadow-2xl transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-1 border-slate-600/50 p-4 sm:p-6">
                                                {/* Decorative corner elements */}
                                                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/50 rounded-tl-2xl"></div>
                                                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-400/50 rounded-tr-2xl"></div>
                                                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-400/50 rounded-bl-2xl"></div>
                                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/50 rounded-br-2xl"></div>
                                                
                                                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-amber-400/70 shadow-lg animate-pulse"></div>
                                                            <h3 className="text-lg font-bold text-amber-100 drop-shadow-lg">
                                                                {purchase?.packet_name || purchase?.name || 'แพคเกจไม่ระบุชื่อ'}
                                                            </h3>
                                                        </div>
                                                        <div className="text-sm text-white/70 space-y-1">
                                                            <p className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                                </svg>
                                                                ราคา: {purchase?.cost ? parseFloat(purchase.cost).toLocaleString() : '0'} Token
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                วันที่ซื้อ: {purchase?.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString('th-TH', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }) : 'ไม่ระบุ'}
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                </svg>
                                                                เซิร์ฟเวอร์: {purchase?.serverid || 'N/A'}
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                                </svg>
                                                                ประเภท: <span className="capitalize text-blue-300 font-medium">{purchase?.packet_type || 'N/A'}</span>
                                                            </p>
                                                            {purchase?.sent_email === 1 && (
                                                                <p className="flex items-center gap-2">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                    </svg>
                                                                    สถานะ: <span className="text-green-400 font-medium">ส่งอีเมลแล้ว</span>
                                                                </p>
                                                            )}
                                                            {/* {purchase?.items && (
                                                                <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                                                    <p className="flex items-center gap-2 text-white/80 font-medium mb-2">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                                        </svg>
                                                                        ไอเท็มที่ได้รับ:
                                                                    </p>
                                                                    <div className="text-xs text-white/60 font-mono bg-black/20 p-2 rounded border border-white/5">
                                                                        {(() => {
                                                                            try {
                                                                                const items = JSON.parse(purchase.items);
                                                                                return items.map((item, idx) => (
                                                                                    <div key={idx} className="flex justify-between items-center py-1">
                                                                                        <span>ไอเท็ม ID: {item.i}</span>
                                                                                        <span className="text-yellow-300">จำนวน: {item.n}</span>
                                                                                    </div>
                                                                                ));
                                                                            } catch (e) {
                                                                                return <span className="text-red-300">ไม่สามารถแสดงไอเท็มได้</span>;
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                </div>
                                                            )} */}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-end">
                                                        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-full px-4 py-2 shadow-lg">
                                                            <span className="text-amber-300 font-medium text-sm drop-shadow-sm">สำเร็จ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {tokenValid && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {filteredPackages?.map((item) => (
                                <PackageCard
                                    key={item.id}
                                    item={item}
                                    onPurchase={handlePurchase}
                                    isPurchasing={purchasing}
                                    userInfo={userInfo}
                                    tokenValid={tokenValid}
                                    tokenLoading={tokenLoading}
                                    token={token}
                                />
                            ))}
                        </div>
                    )}
                    {!tokenValid && (
                        <div className="text-center py-8 sm:py-10 md:py-12">
                            <div className="bg-red-500/20 backdrop-blur-md rounded-2xl shadow-sm border border-red-400/30 p-6 sm:p-8 max-w-sm sm:max-w-md mx-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-red-200 mb-2">Token หมดอายุ</h3>
                                <p className="text-sm sm:text-base text-red-300">กรุณา login ใหม่ผ่านเกมแล้วกดซื้อใหม่อีกครั้ง</p>
                            </div>
                        </div>
                    )}

                    {filteredPackages?.length === 0 && dataPackage?.length > 0 && tokenValid && (
                        <div className="text-center py-8 sm:py-10 md:py-12">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-sm border border-white/20 p-6 sm:p-8 max-w-sm sm:max-w-md mx-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">No packages found</h3>
                                <p className="text-sm sm:text-base text-white/60">Try selecting a different package type</p>
                            </div>
                        </div>
                    )}

                    {dataPackage?.length === 0 && (
                        <div className="text-center py-8 sm:py-10 md:py-12">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-sm border border-white/20 p-6 sm:p-8 max-w-sm sm:max-w-md mx-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">No packages available</h3>
                                <p className="text-sm sm:text-base text-white/60">Check back later for new packages!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={handleCancelPurchase}
                onConfirm={handleConfirmPurchase}
                title="ยืนยันการซื้อ"
                message={selectedPackage ? `คุณต้องการซื้อแพคเกจ "${selectedPackage.name}" ราคา ${selectedPackage.price_token.toLocaleString()} Token ใช่หรือไม่?` : ''}
                confirmText="ซื้อแพคเกจ"
                cancelText="ยกเลิก"
                isLoading={purchasing}
            />

            {/* Token Expired Modal */}
            <TokenExpiredModal
                isOpen={showTokenExpiredModal}
                onClose={handleCloseTokenExpiredModal}
                title="Token หมดอายุ"
                message="กรุณา login ใหม่ผ่านเกมแล้วกดซื้อใหม่อีกครั้ง"
            />

            {/* Error Modal */}
            <ErrorModal
                isOpen={showErrorModal}
                onClose={handleCloseErrorModal}
                title={errorTitle}
                message={errorMessage}
                type={modalType}
            />
        </div>
    );
}

export default page