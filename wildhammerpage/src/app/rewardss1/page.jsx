'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeftRight, 
    Gift, 
    Sparkles, 
    Crown, 
    Loader2, 
    AlertCircle, 
    CheckCircle,
    X,
    User,
    Mail,
    MapPin,
    Clock,
    Package,
    History,
    Coins
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { checkToken } from '../../services/token/checkToken';
import { getRealMoney } from '../../services/getRealmoney/realMoney';
import TokenExpiredModal from '../../components/TokenExpiredModal';
import UserProfile from '../../components/UserProfile';

// Helper function to get rarity based on token cost
const getRewardRarity = (tokenCost) => {
    if (tokenCost >= 50000) return 'legendary';
    if (tokenCost >= 30000) return 'epic';
    if (tokenCost >= 10000) return 'rare';
    if (tokenCost >= 5000) return 'uncommon';
    return 'common';
};

const getRarityStyles = (rarity) => {
    const styles = {
        legendary: {
            border: 'border-yellow-500/50',
            glow: 'shadow-yellow-500/20',
            badge: 'bg-gradient-to-r from-yellow-500 to-orange-500',
            text: 'text-yellow-500'
        },
        epic: {
            border: 'border-purple-500/50',
            glow: 'shadow-purple-500/20',
            badge: 'bg-gradient-to-r from-purple-500 to-pink-500',
            text: 'text-purple-400'
        },
        rare: {
            border: 'border-blue-500/50',
            glow: 'shadow-blue-500/20',
            badge: 'bg-gradient-to-r from-blue-500 to-cyan-500',
            text: 'text-blue-400'
        },
        uncommon: {
            border: 'border-green-500/50',
            glow: 'shadow-green-500/20',
            badge: 'bg-gradient-to-r from-green-500 to-emerald-500',
            text: 'text-green-400'
        },
        common: {
            border: 'border-gray-500/50',
            glow: 'shadow-gray-500/20',
            badge: 'bg-gradient-to-r from-gray-500 to-slate-500',
            text: 'text-gray-400'
        }
    };
    return styles[rarity] || styles.common;
};

// Status colors for redemption history
const getStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        shipped: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        delivered: 'bg-green-500/20 text-green-300 border-green-500/30',
        cancelled: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    return colors[status] || colors.pending;
};

const getStatusText = (status) => {
    const texts = {
        pending: 'รอการตรวจสอบ',
        processing: 'กำลังดำเนินการ',
        shipped: 'จัดส่งแล้ว',
        delivered: 'ได้รับแล้ว',
        cancelled: 'ยกเลิก'
    };
    return texts[status] || status;
};

const RewardsPage = () => {
    const searchParams = useSearchParams();
    
    // States
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
    const [realMoney, setRealMoney] = useState(null);
    const [redemptionHistory, setRedemptionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    
    // Redemption modal states
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const [email, setEmail] = useState('');
    const [redeeming, setRedeeming] = useState(false);
    
    // Alert dialog states
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success'); // 'success' | 'error'
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Token validation
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = searchParams.get('token');
                
                if (!token) {
                    setTokenValid(false);
                    setHasToken(false);
                    setTokenLoading(false);
                    // ไม่แสดง modal เมื่อไม่มี token (ให้แสดงรางวัลได้แต่ไม่มีปุ่มแลก)
                    return;
                }

                setHasToken(true);
                const response = await checkToken(token);
                if (response?.success) {
                    setTokenValid(true);
                } else {
                    setTokenValid(false);
                    setShowTokenExpiredModal(true);
                }
            } catch (error) {
                console.error('Error checking token:', error);
                setTokenValid(false);
                if (hasToken) {
                    setShowTokenExpiredModal(true);
                }
            } finally {
                setTokenLoading(false);
            }
        };

        verifyToken();
    }, [searchParams]);

    // Fetch user profile (real money)
    useEffect(() => {
        const fetchRealMoney = async () => {
            try {
                const username = searchParams.get("username");
                const token = searchParams.get("token");
                
                if (username && token) {
                    const response = await getRealMoney(username, token);
                    if (response?.data) {
                        setRealMoney(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching real money data:', error);
            }
        };

        if (tokenValid) {
            fetchRealMoney();
        }
    }, [searchParams, tokenValid]);

    // Fetch active rewards from API - ไม่ต้องใช้ token
    useEffect(() => {
        const fetchRewards = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${apiUrl}/api/rewards/active`);
                const data = await response.json();
                
                if (data.success) {
                    setRewards(data.data || []);
                } else {
                    showAlertDialog('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถโหลดรางวัลได้');
                }
            } catch (error) {
                console.error('Error fetching rewards:', error);
                showAlertDialog('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถโหลดรางวัลได้: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        // โหลดรางวัลได้เสมอ ไม่ว่าจะมี token หรือไม่
        fetchRewards();
    }, []);

    // Fetch redemption history
    useEffect(() => {
        const fetchRedemptionHistory = async () => {
            try {
                const token = searchParams.get('token');
                if (!token) return;

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${apiUrl}/api/rewards/redemptions/user?token=${encodeURIComponent(token)}`);
                const data = await response.json();
                
                if (data.success) {
                    setRedemptionHistory(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching redemption history:', error);
            }
        };

        if (tokenValid) {
            fetchRedemptionHistory();
        }
    }, [searchParams, tokenValid]);

    // Show alert dialog helper
    const showAlertDialog = (type, title, message) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setShowAlert(true);
    };

    // Handle redeem button click
    const handleRedeemClick = (reward) => {
        if (!tokenValid) {
            setShowTokenExpiredModal(true);
            return;
        }

        // Check if user has enough balance
        if (realMoney && realMoney.realMoney < reward.token_cost) {
            showAlertDialog('error', 'ยอดเงินไม่เพียงพอ', `คุณมี ${realMoney.realMoney.toLocaleString()} Token แต่ต้องการ ${reward.token_cost.toLocaleString()} Token`);
            return;
        }

        setSelectedReward(reward);
        setShippingAddress('');
        setEmail('');
        setShowRedeemModal(true);
    };

    // Handle redeem submission
    const handleRedeemSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedReward) return;

        setRedeeming(true);

        try {
            const token = searchParams.get('token');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            
            const response = await fetch(`${apiUrl}/api/rewards/redeem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reward_id: selectedReward.id,
                    shipping_address: shippingAddress,
                    email: email,
                    token: token
                })
            });

            const data = await response.json();

            if (data.success) {
                showAlertDialog('success', 'แลกรางวัลสำเร็จ!', `คุณได้แลกรางวัล ${selectedReward.name} เรียบร้อยแล้ว\nยอดเงินคงเหลือ: ${data.data.new_balance.toLocaleString()} Token`);
                
                // Refresh user balance
                const username = searchParams.get("username");
                if (username && token) {
                    const balanceResponse = await getRealMoney(username, token);
                    if (balanceResponse?.data) {
                        setRealMoney(balanceResponse.data);
                    }
                }

                // Refresh redemption history
                const historyResponse = await fetch(`${apiUrl}/api/rewards/redemptions/user?token=${encodeURIComponent(token)}`);
                const historyData = await historyResponse.json();
                if (historyData.success) {
                    setRedemptionHistory(historyData.data || []);
                }

                setShowRedeemModal(false);
            } else {
                // Handle specific error cases
                if (data.message.includes('Insufficient')) {
                    showAlertDialog('error', 'ยอดเงินไม่เพียงพอ', data.message);
                } else if (data.message.includes('Token expired') || data.message.includes('token')) {
                    setShowTokenExpiredModal(true);
                } else if (data.message.includes('not available')) {
                    showAlertDialog('error', 'ไม่สามารถแลกได้', 'รางวัลนี้หมดแล้วหรือไม่พร้อมใช้งาน');
                } else {
                    showAlertDialog('error', 'เกิดข้อผิดพลาด', data.message || 'ไม่สามารถแลกรางวัลได้');
                }
            }
        } catch (error) {
            console.error('Error redeeming reward:', error);
            showAlertDialog('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถแลกรางวัลได้: ' + error.message);
        } finally {
            setRedeeming(false);
        }
    };

    const handleCloseTokenExpiredModal = () => {
        setShowTokenExpiredModal(false);
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 border-b border-purple-500/30">
                <div className="absolute inset-0 bg-[url('/assets/2.png')] opacity-5 bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Gift className="w-12 h-12 text-yellow-400 animate-pulse" />
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            ร้านค้าแลกรางวัล
                        </h1>
                        <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        ใช้ Token แลกของรางวัลสุดพิเศษได้ที่นี่
                    </p>
                </div>
            </div>

            {/* User Profile Section - แสดงเฉพาะเมื่อมี token */}
            {hasToken && realMoney && (
                <div className="relative z-20 pt-8 pb-4">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-sm mx-auto">
                            <UserProfile userData={realMoney} />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                            <p className="text-gray-300 text-lg">กำลังโหลดรางวัล...</p>
                        </div>
                    </div>
                )}

                {/* Token Loading State - แสดงเฉพาะเมื่อมี token */}
                {hasToken && tokenLoading && !loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                            <p className="text-gray-300 text-lg">กำลังตรวจสอบสิทธิ์...</p>
                        </div>
                </div>
                )}

                {/* Rewards Grid - แสดงเสมอเมื่อโหลดเสร็จ */}
                {!loading && !tokenLoading && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {rewards.map((reward) => {
                                const rarity = getRewardRarity(reward.token_cost);
                                const rarityStyle = getRarityStyles(rarity);
                                const canAfford = realMoney && realMoney.realMoney >= reward.token_cost;
                                const isAvailable = reward.is_active && (reward.stock_quantity === -1 || reward.stock_quantity > 0);

                        return (
                                    <motion.div
                                        key={reward.id}
                                className={`group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl border-2 ${rarityStyle.border} ${rarityStyle.glow} shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl backdrop-blur-sm`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Image Container */}
                                <div className="relative w-full h-56 bg-gradient-to-br from-slate-700/30 to-slate-800/30 p-6 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
                                    {reward.image_url && reward.image_url.trim() !== '' ? (
                                        <Image
                                            src={reward.image_url}
                                            alt={reward.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            className="transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Gift className="w-20 h-20 text-gray-500" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-white text-xl font-bold text-center min-h-[3.5rem] flex items-center justify-center">
                                                {reward.name}
                                    </h3>

                                            <p className="text-gray-400 text-sm text-center line-clamp-2">
                                                {reward.description}
                                            </p>

                                            {/* Token Cost Display */}
                                            <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700/50">
                                        <div className="flex items-center justify-center gap-2">
                                                    <Coins className={`w-5 h-5 ${rarityStyle.text}`} />
                                            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                                                        {reward.token_cost.toLocaleString()}
                                            </span>
                                                    <span className="text-gray-400 text-sm">Token</span>
                                                </div>
                                                {reward.stock_quantity !== -1 && (
                                                    <div className="text-center mt-2 text-xs text-gray-500">
                                                        คงเหลือ: {reward.stock_quantity} ชิ้น
                                                    </div>
                                                )}
                                        </div>

                                            {/* Exchange Button - แสดงเฉพาะเมื่อมี token */}
                                            {hasToken ? (
                                                <button
                                                    className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group/btn ${
                                                        isAvailable && canAfford
                                                            ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 text-white hover:shadow-purple-500/50'
                                                            : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    onClick={() => handleRedeemClick(reward)}
                                                    disabled={!isAvailable || !canAfford}
                                    >
                                        <ArrowLeftRight className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                                                    <span>
                                                        {!isAvailable ? 'สินค้าหมด' : !canAfford ? 'Token ไม่พอ' : 'แลกเลย'}
                                                    </span>
                                                </button>
                                            ) : (
                                                <div className="w-full text-center py-3 px-6 bg-slate-700/50 text-gray-400 rounded-xl text-sm">
                                                    กรุณา Login ผ่านเกมเพื่อแลกรางวัล
                                </div>
                                            )}
                            </div>
                                    </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                        {rewards.length === 0 && (
                    <div className="text-center py-20">
                        <Gift className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 text-xl">ไม่มีรางวัลในขณะนี้</p>
                            </div>
                        )}

                        {/* Redemption History Section - แสดงเฉพาะเมื่อมี token */}
                        {hasToken && redemptionHistory.length > 0 && (
                            <motion.div
                                className="mb-8 max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-purple-400/30 shadow-2xl p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                <History className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-purple-200">ประวัติการแลกรางวัล</h3>
                                                <p className="text-purple-300/60 text-sm">
                                                    ทั้งหมด: <span className="font-bold text-purple-200">{redemptionHistory.length}</span> รายการ
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-600/60 to-indigo-600/60 backdrop-blur-sm rounded-xl border border-purple-400/30 text-purple-200 hover:from-purple-500/70 hover:to-indigo-500/70 hover:text-white transition-all duration-300 shadow-lg"
                                            onClick={() => setShowHistory(!showHistory)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <History className="w-4 h-4" />
                                                <span className="font-medium text-sm">
                                                    {showHistory ? 'ซ่อนประวัติ' : 'ดูประวัติ'}
                                                </span>
                                            </div>
                                        </motion.button>
                                    </div>

                                    {/* History Content */}
                                    <AnimatePresence>
                                        {showHistory && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
                                                    {redemptionHistory.map((item, index) => (
                                                        <motion.div
                                                            key={item.id}
                                                            className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-purple-400/20"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                        >
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex items-start space-x-3 flex-1">
                                                                    <div className="relative w-16 h-16 bg-slate-600/50 rounded-lg overflow-hidden flex-shrink-0">
                                                                        {item.reward_image && item.reward_image.trim() !== '' ? (
                                                                            <Image
                                                                                src={item.reward_image}
                                                                                alt={item.reward_name}
                                                                                fill
                                                                                style={{ objectFit: 'contain' }}
                                                                                className="p-2"
                                                                                unoptimized
                                                                            />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center">
                                                                                <Gift className="w-8 h-8 text-gray-500" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h4 className="text-white font-bold mb-1">{item.reward_name}</h4>
                                                                        <p className="text-gray-400 text-sm mb-2">
                                                                            <Clock className="w-3 h-3 inline mr-1" />
                                                                            {new Date(item.created_at).toLocaleString('th-TH', {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </p>
                                                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                                            {getStatusText(item.status)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-yellow-400 font-bold">{item.token_cost.toLocaleString()} Token</p>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Shipping Info */}
                                                            <div className="mt-3 pt-3 border-t border-slate-600/50 space-y-2">
                                                                <p className="text-gray-400 text-xs flex items-start">
                                                                    <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                                                                    <span className="line-clamp-2">{item.shipping_address}</span>
                                                                </p>
                                                                <p className="text-gray-400 text-xs flex items-center">
                                                                    <Mail className="w-3 h-3 mr-1" />
                                                                    {item.email}
                                                                </p>
                                                            </div>

                                                            {item.notes && (
                                                                <div className="mt-2 text-xs text-gray-500 italic">
                                                                    หมายเหตุ: {item.notes}
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                    </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Redeem Modal */}
            <AnimatePresence>
                {showRedeemModal && selectedReward && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !redeeming && setShowRedeemModal(false)}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-purple-400/30 p-6 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white flex items-center">
                                    <Gift className="w-6 h-6 mr-2 text-purple-400" />
                                    แลกรางวัล
                                </h3>
                                <button
                                    onClick={() => !redeeming && setShowRedeemModal(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    disabled={redeeming}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="bg-slate-700/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">{selectedReward.name}</h4>
                                    <p className="text-yellow-400 font-bold text-xl">
                                        {selectedReward.token_cost.toLocaleString()} Token
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleRedeemSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        อีเมล
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                        placeholder="your@email.com"
                                        disabled={redeeming}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        ที่อยู่จัดส่ง
                                    </label>
                                    <textarea
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                                        placeholder="กรอกที่อยู่สำหรับจัดส่งรางวัล"
                                        disabled={redeeming}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowRedeemModal(false)}
                                        className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white font-medium rounded-lg transition-all duration-300"
                                        disabled={redeeming}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={redeeming}
                                    >
                                        {redeeming ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                กำลังแลก...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                ยืนยันแลกรางวัล
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Alert Dialog */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAlert(false)}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-purple-400/30 p-6 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                    alertType === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                                }`}>
                                    {alertType === 'success' ? (
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    ) : (
                                        <AlertCircle className="w-8 h-8 text-red-400" />
                                    )}
                                </div>
                                <h3 className={`text-2xl font-bold mb-3 ${
                                    alertType === 'success' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {alertTitle}
                                </h3>
                                <p className="text-gray-300 mb-6 whitespace-pre-line">
                                    {alertMessage}
                                </p>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                                        alertType === 'success'
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
                                            : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500'
                                    } text-white`}
                                >
                                    ตกลง
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Token Expired Modal */}
            <TokenExpiredModal
                isOpen={showTokenExpiredModal}
                onClose={handleCloseTokenExpiredModal}
                title="Token หมดอายุ"
                message="กรุณา login ใหม่ผ่านเกมแล้วกลับมาใหม่อีกครั้ง"
            />
        </div>
    );
};

export default RewardsPage;
