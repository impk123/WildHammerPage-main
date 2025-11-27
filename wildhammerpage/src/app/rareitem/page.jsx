'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Gift, Star, Zap, Info, History, Clock, Package } from 'lucide-react';
import { getGacha,getActiveGacha,getGachaHistory } from '../../services/gacha/gacha';
import { useSearchParams } from 'next/navigation';
import gameEquipManager from '../../utils/GameEquipManager';
import gameItemManager from '../../utils/GameItemManager';
import { checkToken } from '../../services/token/checkToken';
import TokenExpiredModal from '../../components/TokenExpiredModal';
import UserProfile from '../../components/UserProfile';
import { getRealMoney } from '../../services/getRealmoney/realMoney';

const GachaPage = () => {
    const searchParams = useSearchParams();
    const [selectedBoxes, setSelectedBoxes] = useState(1);
    const [isOpening, setIsOpening] = useState(false);
    const [openedBoxes, setOpenedBoxes] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [particles, setParticles] = useState([]);
    const [dataItem, setDataItem] = useState(null);
    const [error, setError] = useState(null);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
    
    // Token prices state - will be loaded from API
    const [tokenPrices, setTokenPrices] = useState({
        1: 10,   // Default fallback price for 1 box
        5: 50    // Default fallback price for 5 boxes
    });
    const [pricesLoading, setPricesLoading] = useState(true);
    
    // Gacha rates state
    const [gachaRates, setGachaRates] = useState([]);
    
    // Real money (user profile) state
    const [realMoney, setRealMoney] = useState(null);
    
    // Gacha history state
    const [gachaHistory, setGachaHistory] = useState([]);
    const [totalGachaCount, setTotalGachaCount] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    


    // Function to get rarity color based on rarity level
    const getRarityColor = (rarity) => {
        const colors = {
            'Legendary': 'from-purple-500 to-pink-500',
            'Epic': 'from-indigo-500 to-purple-500',
            'Rare': 'from-blue-500 to-cyan-500',
            'Uncommon': 'from-green-500 to-emerald-500',
            'Common': 'from-gray-400 to-gray-500'
        };
        return colors[rarity] || colors['Common'];
    };

    // Function to get rarity name in English
    const getRarityName = (rarity) => {
        switch (rarity) {
            case 9:
                return 'World Destroyer';
            case 8:
                return 'Legendary';
            case 7:
                return 'Epic';
            case 6:
                return 'Rare';
            case 5:
                return 'Uncommon';
            default:
                return 'Common';
        }
    };

    // Function to get image path based on icon and category (updated structure)
    const getImagePath = (icon, category) => {
        if (category === 'item') {
            return `/assets/img/atlas/item/${icon}.png`;
        } else if (category === 'weapon') {
            return `/assets/img/atlas/wuqi/${icon}.png`;
        } else if (category === 'armor') {
            return `/assets/img/atlas/yifu/${icon}.png`;
        } else if (category === 'pants') {
            return `/assets/img/atlas/kuzi/${icon}.png`;
        } else if (category === 'shoes') {
            return `/assets/img/atlas/xiezi/${icon}.png`;
        } else if (category === 'hat') {
            return `/assets/img/atlas/maozi/${icon}.png`;
        } else if (category === 'ring') {
            return `/assets/img/atlas/jiezhi/${icon}.png`;
        } else if (category === 'skill') {
            return `/assets/img/atlas/skill/${icon}.png`;
        } else if (category === 'buff') {
            return `/assets/img/atlas/buff/${icon}.png`;
        }
        return `/assets/img/atlas/item/${icon}.png`;
    };

    // Function to get icon path based on item data (for gacha items)
    const getGachaItemIconPath = (itemData) => {
        if (!itemData) {
            console.warn('No itemData provided to getGachaItemIconPath');
            return '/assets/img/atlas/item/1001.png';
        }
        const { type, item_id } = itemData;
        
        let iconId = item_id;
        let category = 'item'; // Default category
        
        if (type === 'equipment') {
            // For equipment, try to get icon and category from gameEquipManager
            const equipData = gameEquipManager.getEquipById(item_id);
            if (equipData) {
                iconId = equipData.icon || item_id;
                // Map equipment type to category
                switch (equipData.pos) {
                    case 1: // weapon
                        category = 'weapon';
                        break;
                    case 2: // armor
                        category = 'armor';
                        break;
                    case 3: // hat
                        category = 'hat';
                        break;
                    case 4: // ring
                        category = 'ring';
                        break;
                    case 5: // pants
                        category = 'pants';
                        break;
                    case 6: // shoes
                        category = 'shoes';
                        break;
                    default:
                        category = 'item';
                }
            }
        }
        
        // Use the new getImagePath function
        const primaryPath = getImagePath(iconId, category);
        return primaryPath;
    };

    // Simple error handler for image fallbacks
    const handleImageError = (e, itemData) => {
        // Try generic item fallback first
        if (e.target.src.includes('/assets/img/atlas/')) {
            e.target.src = '/assets/img/atlas/item/1001.png';
        } else {
            // Final fallback - hide image
            e.target.style.display = 'none';
        }
    };

    // Generate particles on client-side only to avoid hydration mismatch
    useEffect(() => {
        const generatedParticles = Array.from({ length: 35 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 2,
        }));
        setParticles(generatedParticles);
    }, []);

    // Token validation on component mount
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = searchParams.get('token');
                
                if (!token) {
                    setTokenValid(false);
                    setShowTokenExpiredModal(true);
                    return;
                }

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
                setShowTokenExpiredModal(true);
            } finally {
                setTokenLoading(false);
            }
        };

        verifyToken();
    }, [searchParams]);

    // Fetch token prices from active gacha API
    useEffect(() => {
        const fetchTokenPrices = async () => {
            try {
                setPricesLoading(true);

                const token = searchParams.get('token');
                const response = await getActiveGacha(token);

                if (response?.success && response?.data) {
                    // Extract token prices from API response
                    // Assuming the API returns price information in the data
                    const activeGachaData = response.data;
                    
                    // Update token prices based on API response
                    // You may need to adjust this based on the actual API response structure
                    const newTokenPrices = {
                        1: activeGachaData.price_single || Math.round(activeGachaData.gacha_cost) || 10,
                        5: activeGachaData.price_multi || Math.round(activeGachaData.gacha_cost * 5) || 50
                    };
                    
                    // Store gacha rates data
                    if (activeGachaData.active_packets && Array.isArray(activeGachaData.active_packets)) {
                        setGachaRates(activeGachaData.active_packets);
                    }
                    
                    setTokenPrices(newTokenPrices);
                } else {
                    console.warn('Failed to fetch token prices, using defaults');
                }
            } catch (error) {
                console.error('Error fetching active gacha data:', error);
                // Keep default prices on error
            } finally {
                setPricesLoading(false);
            }
        };

        fetchTokenPrices();
    }, []);

    // Fetch user profile data (real money)
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

        fetchRealMoney();
    }, [searchParams]);

    // Fetch gacha history from API
    useEffect(() => {
        const fetchGachaHistory = async () => {
            try {
                const token = searchParams.get("token");
                
                if (token) {
                    const response = await getGachaHistory(token);
                    if (response?.success && response?.data) {
                        // Process API response to match our UI format
                        const processedHistory = response.data.map(entry => {
                            // Process rewards/items to match our UI format
                            let processedRewards = [];
                            
                            // Handle receive_item_ids which is a JSON string
                            if (entry.receive_item_ids) {
                                try {
                                    const parsedItems = JSON.parse(entry.receive_item_ids);
                                    if (Array.isArray(parsedItems)) {
                                        processedRewards = parsedItems.map(item => {
                                            // Extract item data from the nested structure
                                            const itemData = item.item?.items?.[0] || {};
                                            
                                            return {
                                                id: item.id,
                                                name: item.name,
                                                type: itemData.type || 'item',
                                                item_id: itemData.item_id,
                                                quantity: itemData.quantity || 1,
                                                rarity: getRarityName(itemData.rarity || 1),
                                                color: getRarityColor(getRarityName(itemData.rarity || 1)),
                                                icon_url: getGachaItemIconPath(itemData),
                                                itemData: itemData
                                            };
                                        });
                                    }
                                } catch (e) {
                                    console.error('Error parsing receive_item_ids:', e);
                                }
                            }
                        
                            return {
                                id: entry.id || Date.now(),
                                timestamp: entry.create_date || entry.timestamp,
                                boxCount: Math.ceil(parseFloat(entry.cost) / 10) || 1, // Estimate boxes from cost
                                rewards: processedRewards,
                                totalCost: parseFloat(entry.cost) || 0
                            };
                        });
                        
                        setGachaHistory(processedHistory);
                        
                        // Calculate total gacha count
                        const totalCount = processedHistory.reduce((sum, entry) => sum + (entry.boxCount || 0), 0);
                        setTotalGachaCount(totalCount);
                    }
                }
            } catch (error) {
                console.error('Error fetching gacha history:', error);
                // Keep empty array on error
                setGachaHistory([]);
                setTotalGachaCount(0);
            }
        };

        fetchGachaHistory();
    }, [searchParams]);

    // Function to refresh real money data
    const refreshRealMoney = async () => {
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
            console.error('Error refreshing real money data:', error);
        }
    };

    // Function to refresh gacha history from API
    const refreshGachaHistory = async () => {
        try {
            const token = searchParams.get("token");          
            
            if (token) {
                const response = await getGachaHistory(token);
                if (response?.success && response?.data) {
                    // Process API response to match our UI format
                    const processedHistory = response.data.map(entry => {
                        // Process rewards/items to match our UI format
                        let processedRewards = [];
                        
                        // Handle receive_item_ids which is a JSON string
                        if (entry.receive_item_ids) {
                            try {
                                const parsedItems = JSON.parse(entry.receive_item_ids);
                                if (Array.isArray(parsedItems)) {
                                    processedRewards = parsedItems.map(item => {
                                        // Extract item data from the nested structure
                                        const itemData = item.item?.items?.[0] || {};
                                        
                                        return {
                                            id: item.id,
                                            name: item.name,
                                            type: itemData.type || 'item',
                                            item_id: itemData.item_id,
                                            quantity: itemData.quantity || 1,
                                            rarity: getRarityName(itemData.rarity || 1),
                                            color: getRarityColor(getRarityName(itemData.rarity || 1)),
                                            icon_url: getGachaItemIconPath(itemData),
                                            itemData: itemData
                                        };
                                    });
                                }
                            } catch (e) {
                                console.error('Error parsing receive_item_ids:', e);
                            }
                        }

                        return {
                            id: entry.id || Date.now(),
                            timestamp: entry.create_date || entry.timestamp,
                            boxCount: Math.ceil(parseFloat(entry.cost) / 10) || 1, // Estimate boxes from cost
                            rewards: processedRewards,
                            totalCost: parseFloat(entry.cost) || 0
                        };
                    });
                    
                    setGachaHistory(processedHistory);
                    
                    // Calculate total gacha count
                    const totalCount = processedHistory.reduce((sum, entry) => sum + (entry.boxCount || 0), 0);
                    setTotalGachaCount(totalCount);
                }
            }
        } catch (error) {
            console.error('Error refreshing gacha history:', error);
        }
    };

    const handleOpenBoxes = async () => {
        // Check token validity before proceeding
        if (!tokenValid || tokenLoading) {
            setShowTokenExpiredModal(true);
            return;
        }

        setIsOpening(true);
        setShowResults(false);
        setOpenedBoxes([]);
        setError(null);

        try {
            // Get token from URL parameters
            const token = searchParams.get('token');
            
            if (!token) {
                throw new Error('No authentication token found in URL');
            }

            // Call the gacha API
            const response = await getGacha(selectedBoxes, token);
            
            if (response.success && response.data && response.data.items) {
                // Map API response to UI format
                const rewards = response.data.items.map(item => {
                    const itemData = item.item.items[0];

                    let displayName = item.name;
                    let iconUrl = null;
                    
                    // Get proper name, icon, and background from managers
                    let bgUrl = null;
                    if (itemData.type === 'equipment') {
                        const equipData = gameEquipManager.getEquipById(itemData.item_id);
                        if (equipData) {
                            displayName = equipData.name || item.name;
                            iconUrl = gameEquipManager.getEquipIconByIdq(itemData.item_id, itemData.rarity);
                            bgUrl = gameEquipManager.getEquipBGByIdq(itemData.rarity);
                        }
                    } else if (itemData.type === 'item') {
                        const itemInfo = gameItemManager.getItemById(itemData.item_id);
                        if (itemInfo) {
                            displayName = itemInfo.name || item.name;
                            iconUrl = gameItemManager.getItemIcon(itemData.item_id);
                        }
                    }
                    
                    // Enhanced icon fallback system - use new helper function if manager doesn't provide icon
                    if (!iconUrl) {
                        iconUrl = getGachaItemIconPath(itemData);
                    }
                    
                    const rarityName = getRarityName(itemData.rarity);
                    return {
                        id: item.id,
                        name: displayName,
                        rarity: rarityName,
                        color: getRarityColor(rarityName),
                        quantity: itemData.quantity,
                        type: itemData.type,
                        item_id: itemData.item_id,
                        prob_rate: item.prob_rate,
                        item_rarity: item.item_rarity,
                        icon_url: iconUrl,
                        bg_url: bgUrl,
                        // Store raw item data for additional reference
                        itemData: itemData
                    };
                });
                
                setOpenedBoxes(rewards);
                setDataItem(response.data);
                
                // Refresh user's real money data after successful gacha
                await refreshRealMoney();
                
                // Refresh gacha history from API after successful gacha
                await refreshGachaHistory();
                
                // Wait for opening animation to complete (2.5 seconds total)
                await new Promise(resolve => setTimeout(resolve, 2500));
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Gacha API Error:', err);
            
            // Check if error is related to token expiration
            if (err.message && (err.message.includes('401') || err.message.includes('token') || err.message.includes('expired'))) {
                setShowTokenExpiredModal(true);
                setIsOpening(false);
                return;
            }
            
            setError(err.message || 'Failed to open gacha boxes');
        } finally {
            setIsOpening(false);
            setShowResults(true);
        }
    };

    const handleCloseTokenExpiredModal = () => {
        setShowTokenExpiredModal(false);
        // Redirect to home page
        window.location.href = '/';
    };

    const boxVariants = {
        closed: { 
            scale: 1, 
            rotate: 0,
            filter: 'brightness(1)'
        },
        shaking: { 
            scale: [1, 1.1, 1],
            rotate: [-2, 2, -2, 2, 0],
            filter: 'brightness(1.2)',
            transition: {
                duration: 0.3,
                repeat: 5,
                ease: "easeInOut"
            }
        },
        opening: {
            scale: [1, 1.3, 1.1, 0.9],
            rotate: [0, 15, -15, 10, -10, 0],
            filter: 'brightness(1.8)',
            transition: {
                duration: 2,
                ease: "easeInOut"
            }
        }
    };

    // const sparkleVariants = {
    //     hidden: { opacity: 0, scale: 0 },
    //     visible: { 
    //         opacity: [0, 1, 0],
    //         scale: [0, 1, 0],
    //         transition: {
    //             duration: 0.6,
    //             repeat: Infinity,
    //             repeatDelay: 0.2
    //         }
    //     }
    // };

    const rewardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
            {/* Enhanced Background effects */}
            <div className="absolute inset-0 bg-[url('/assets/img_lantian.png')] opacity-30 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-800/90"></div>

            {/* Animated background particles */}
            <div className="absolute inset-0">
                {particles.slice(0, 15).map((particle) => (
                    <motion.div
                        key={`bg-${particle.id}`}
                        className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 4 + particle.delay,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {particles.slice(20).map((particle) => (
                    <motion.div
                        key={`floating-${particle.id}`}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>
            
            

            {/* Floating History Button */}
            <motion.div
                className="fixed top-4 right-4 z-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
            >
                <motion.button
                    className="relative p-3 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 backdrop-blur-md rounded-full border-2 border-purple-400/30 shadow-2xl text-white hover:from-purple-500/90 hover:to-indigo-500/90 transition-all duration-300"
                    onClick={() => setShowHistory(!showHistory)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title="View Gacha History"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-lg scale-150"></div>
                    <div className="relative flex items-center space-x-2">
                        <History className="w-5 h-5" />
                        {totalGachaCount > 0 && (
                            <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
                            >
                                <span className="text-xs font-bold text-white">{totalGachaCount}</span>
                            </motion.div>
                        )}
                    </div>
                </motion.button>
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                {/* Enhanced Header */}
               
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

                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">Game Gacha</h1>
                </div>

                {/* Enhanced Box Selection */}
                <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                    <motion.div 
                        className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-amber-400/30 shadow-2xl w-full max-w-md sm:max-w-lg mx-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-amber-400/60 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-amber-400/60 rounded-tr-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-amber-400/60 rounded-bl-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-amber-400/60 rounded-br-3xl"></div>
                        
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-200 mb-4 sm:mb-6 text-center flex items-center justify-center">
                            <Gift className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-400" />
                            Select Your Fortune
                            <Gift className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 text-amber-400" />
                        </h3>
                        <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center mb-6">
                            {[1, 5].map((count) => (
                                <motion.button
                                    key={count}
                                    className={`relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                                        selectedBoxes === count
                                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-2xl shadow-amber-500/50 border-2 border-amber-300'
                                            : 'bg-gradient-to-r from-slate-700/80 to-slate-800/80 text-amber-200 hover:from-amber-600/20 hover:to-yellow-600/20 border-2 border-slate-600/50 hover:border-amber-400/50'
                                    }`}
                                    onClick={() => setSelectedBoxes(count)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 * count }}
                                >
                                    {selectedBoxes === count && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-2xl"
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center flex-col">
                                        <div>{count === 1 ? '🎁' : '🎁🎁🎁🎁🎁'} {count} Box{count > 1 ? 'es' : ''}</div>
                                        <div className="text-xs mt-1 opacity-80">
                                            {pricesLoading ? '...' : `${tokenPrices[count]} Token`}
                                        </div>
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Token Price Display */}
                        <motion.div 
                            className="bg-gradient-to-br from-amber-400/20 via-purple-500/20 to-amber-400/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <h4 className="text-amber-400 font-semibold text-xl">Token Price</h4>
                            </div>
                            <div className="text-center">
                                <motion.div 
                                    className="inline-flex items-center bg-gradient-to-r from-purple-600/40 to-indigo-600/40 px-4 py-2 rounded-lg border border-purple-400/20"
                                    animate={{ 
                                        boxShadow: selectedBoxes ? [
                                            '0 0 10px rgba(147, 51, 234, 0.3)',
                                            '0 0 20px rgba(147, 51, 234, 0.5)',
                                            '0 0 10px rgba(147, 51, 234, 0.3)'
                                        ] : []
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-2xl font-black text-amber-300 mr-2">🪙</span>
                                    {pricesLoading ? (
                                        <motion.div
                                            className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full mr-2"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-white">{tokenPrices[selectedBoxes]}</span>
                                    )}
                                    <span className="text-sm text-purple-200 ml-2">Token</span>
                                </motion.div>
                                {selectedBoxes === 5 && !pricesLoading && (
                                    <motion.div 
                                        className="mt-2 text-xs text-emerald-400 font-medium"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {(() => {
                                            const singlePrice = tokenPrices[1] * 5;
                                            const multiPrice = tokenPrices[5];
                                            const savings = singlePrice - multiPrice;
                                            const discountPercent = Math.round((savings / singlePrice) * 100);
                                            return savings > 0 ? 
                                                `💎 Save ${savings} Token! (${discountPercent}% Discount)` : 
                                                '🎁 Multi-box deal!';
                                        })()}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Gacha Box Display */}
                <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {/* Magical aura around boxes */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-purple-500/20 to-amber-400/20 rounded-full blur-3xl scale-150"></div>
                        
                        {Array.from({ length: selectedBoxes }).map((_, index) => (
                            <motion.div
                                key={index}
                                className="relative inline-block mx-2 sm:mx-3 md:mx-4"
                                variants={boxVariants}
                                initial="closed"
                                animate={isOpening ? "shaking" : "closed"}
                                whileHover={{ scale: 1.1, rotateY: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Box glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-full blur-xl scale-110"></div>
                                
                                <motion.div
                                    className="relative"
                                    animate={isOpening ? { 
                                        filter: 'brightness(1.5) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' 
                                    } : {}}
                                >
                                    <Image
                                        src="/box.png"
                                        alt="Gacha Box"
                                        width={100}
                                        height={100}
                                        className="drop-shadow-2xl relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                                    />
                                </motion.div>
                                
                                {/* Enhanced sparkle effects */}
                                {/* {isOpening && (
                                    <>
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                                                style={{
                                                    left: `${15 + Math.random() * 70}%`,
                                                    top: `${15 + Math.random() * 70}%`,
                                                }}
                                                // variants={sparkleVariants}
                                                initial="hidden"
                                                animate="visible"
                                            />
                                        ))}
                                    </>
                                )} */}
                                
                                {/* Box number indicator */}
                                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs sm:text-sm shadow-lg">
                                    {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Enhanced Open Button */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <motion.button
                        className="relative px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 font-black text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 sm:border-4 border-amber-300/50 mx-4"
                        onClick={handleOpenBoxes}
                        disabled={isOpening || !tokenValid || tokenLoading}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        {/* Button glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-3xl blur-lg scale-110"></div>
                        
                        {/* Animated border */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl border-4 border-amber-300/50"
                            animate={isOpening ? { 
                                borderColor: ['rgba(251, 191, 36, 0.5)', 'rgba(255, 215, 0, 0.8)', 'rgba(251, 191, 36, 0.5)'] 
                            } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        
                        <span className="relative z-10 flex items-center justify-center">
                            {tokenLoading ? (
                                <>
                                    <motion.div
                                        className="w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-4 border-slate-900/30 border-t-slate-900 rounded-full mr-2 sm:mr-4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent text-sm sm:text-base">
                                        VERIFYING...
                                    </span>
                                </>
                            ) : !tokenValid ? (
                                <>
                                    <span className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent text-sm sm:text-base">
                                        ❌ TOKEN EXPIRED
                                    </span>
                                </>
                            ) : isOpening ? (
                                <>
                                    <motion.div
                                        className="w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-4 border-slate-900/30 border-t-slate-900 rounded-full mr-2 sm:mr-4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent text-sm sm:text-base">
                                        UNLOCKING...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2 sm:mr-4" />
                                    </motion.div>
                                    <span className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent text-sm sm:text-base md:text-lg">
                                        🎯 UNLOCK {selectedBoxes} BOX{selectedBoxes > 1 ? 'ES' : ''} 🎯
                                    </span>
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>

                {/* Gacha History Section */}
                <motion.div 
                    className="mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-purple-400/30 shadow-2xl p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <History className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-purple-200">Gacha History</h3>
                                    <p className="text-purple-300/60 text-sm">
                                        Total Boxes Opened: <span className="font-bold text-purple-200">{totalGachaCount}</span>
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
                                        {showHistory ? 'Hide History' : `View History (${gachaHistory.length})`}
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
                                    <div className="max-h-[50vh] overflow-y-auto pr-2">
                                        {gachaHistory.length === 0 ? (
                                            <div className="text-center py-8 text-gray-400">
                                                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                <p>No gacha history yet</p>
                                                <p className="text-sm mt-2">Open some boxes to see your history!</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {gachaHistory.map((entry, index) => (
                                                    <motion.div
                                                        key={entry.id}
                                                        className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-purple-400/20"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        {/* Entry Header */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                                                    <Clock className="w-4 h-4 text-purple-400" />
                                                                </div>
                                                                <div>
                                                                    {/* <p className="text-white font-medium">
                                                                        {entry.boxCount} Box{entry.boxCount > 1 ? 'es' : ''} Opened
                                                                    </p> */}
                                                                    <p className="text-purple-300/60 text-sm">
                                                                        {new Date(entry.timestamp).toLocaleString('th-TH', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-purple-200 font-bold">{entry.totalCost} Token</p>
                                                                <p className="text-purple-300/60 text-sm">{entry.rewards.length} Items</p>
                                                            </div>
                                                        </div>

                                                        {/* Rewards Grid */}
                                                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                                            {entry.rewards.map((reward, rewardIndex) => (
                                                                <div
                                                                    key={rewardIndex}
                                                                    className={`relative bg-gradient-to-br ${reward.color} p-2 rounded-lg border border-white/20 group`}
                                                                >
                                                                    <div className="aspect-square flex items-center justify-center">
                                                                        {reward.icon_url ? (
                                                                            <Image
                                                                                src={reward.icon_url}
                                                                                alt={reward.name}
                                                                                width={32}
                                                                                height={32}
                                                                                className="w-8 h-8 object-contain"
                                                                                onError={(e) => handleImageError(e, reward.itemData)}
                                                                            />
                                                                        ) : (
                                                                            reward.type === 'equipment' ? (
                                                                                <Star className="w-4 h-4 text-white" />
                                                                            ) : (
                                                                                <Gift className="w-4 h-4 text-white" />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    {reward.quantity > 1 && (
                                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                                                            <span className="text-xs font-bold text-white">{reward.quantity}</span>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    {/* Tooltip on hover */}
                                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                                        {reward.name}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Gacha Rates Display */}
                <motion.div 
                    className="mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-blue-400/30 shadow-2xl p-6">
                        {/* Header */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <Info className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-200">Gacha Rates</h3>
                        </div>

                        {/* Rates List */}
                        <div className="max-h-[60vh] overflow-y-auto pr-2">
                            {gachaRates.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No gacha rates available</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {gachaRates
                                        .sort((a, b) => parseFloat(b.prob_rate) - parseFloat(a.prob_rate)) // Sort by probability (highest first)
                                        .map((item, index) => {
                                            const probability = parseFloat(item.prob_rate);
                                            const isEquipment = item.is_equipment === 1;
                                            const itemData = item.item?.items?.[0];
                                            
                                            // Get rarity colors
                                            let rarityColor = 'from-gray-500 to-gray-600';
                                            if (probability >= 20) rarityColor = 'from-green-500 to-emerald-500';
                                            else if (probability >= 10) rarityColor = 'from-blue-500 to-cyan-500';
                                            else if (probability >= 5) rarityColor = 'from-purple-500 to-indigo-500';
                                            else if (probability >= 1) rarityColor = 'from-yellow-500 to-amber-500';
                                            else rarityColor = 'from-pink-500 to-red-500';

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    className={`relative bg-gradient-to-r ${rarityColor} p-0.5 rounded-lg`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                                {/* Item Icon Display */}
                                                                <div className="relative w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                                                    {itemData ? (
                                                                        <Image
                                                                            src={getGachaItemIconPath(itemData)}
                                                                            alt={item.name}
                                                                            width={32}
                                                                            height={32}
                                                                            className="w-8 h-8 object-contain"
                                                                            onError={(e) => handleImageError(e, itemData)}
                                                                        />
                                                                    ) : (
                                                                        isEquipment ? (
                                                                            <Star className="w-5 h-5 text-amber-400" />
                                                                        ) : (
                                                                            <Gift className="w-5 h-5 text-blue-400" />
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-white font-medium text-sm break-words leading-tight" title={item.name}>
                                                                        {item.name}
                                                                    </h4>
                                                                    <p className="text-gray-400 text-xs">
                                                                        {isEquipment ? 'Equipment' : 'Item'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className={`text-lg font-bold bg-gradient-to-r ${rarityColor} bg-clip-text text-transparent`}>
                                                                    {probability.toFixed(2)}%
                                                                </div>
                                                                <div className="text-xs text-gray-400">
                                                                    Drop Rate
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                

                {/* Enhanced Results Modal */}
                <AnimatePresence>
                    {showResults && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Modal glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10"></div>
                            
                            <motion.div
                                className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-400/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl sm:max-w-5xl mx-4 max-h-[85vh] overflow-y-auto shadow-2xl"
                                initial={{ opacity: 0, scale: 0.7, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.7, y: 100 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
                            >
                                {/* Decorative corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/60 rounded-tl-3xl"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-400/60 rounded-tr-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-400/60 rounded-bl-3xl"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/60 rounded-br-3xl"></div>
                                {error ? (
                                    <div className="text-center py-8">
                                        <motion.div
                                            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5, type: "spring" }}
                                        >
                                            <span className="text-4xl">❌</span>
                                        </motion.div>
                                        <h3 className="text-4xl font-bold text-red-400 mb-4">Error Occurred</h3>
                                        <p className="text-amber-100/80 mb-8 text-lg">{error}</p>
                                        <motion.button
                                            className="px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg border-2 border-red-400/50"
                                            onClick={() => {
                                                setShowResults(false);
                                                setError(null);
                                            }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Try Again
                                        </motion.button>
                                    </div>
                                ) : (
                                    <>
                                        <motion.div
                                            className="text-center mb-10"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                            {/* <motion.h3 
                                                className="text-5xl font-black text-amber-200 mb-4"
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
                                            >
                                                🎉 TREASURE UNLOCKED! 🎉
                                            </motion.h3> */}
                                            {/* <motion.div
                                                className="w-32 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: 128 }}
                                                transition={{ duration: 1, delay: 0.6 }}
                                            />
                                            <motion.p 
                                                className="text-amber-100/90 mt-4 text-lg"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.8 }}
                                            >
                                                Your legendary rewards await!
                                            </motion.p> */}
                                        </motion.div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                                            {openedBoxes.map((reward, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative group"
                                                    variants={rewardVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    transition={{ delay: index * 0.15 }}
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                >
                                                    {/* Enhanced reward card */}
                                                    <div className={`relative bg-gradient-to-br ${reward.color} p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center shadow-2xl border-2 border-amber-400/30 overflow-hidden`}>
                                                        {/* Card glow effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-2xl sm:rounded-3xl blur-sm"></div>
                                                        
                                                        {/* Decorative corners */}
                                                        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-t-2 border-amber-300/60 rounded-tl-xl sm:rounded-tl-2xl"></div>
                                                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-t-2 border-amber-300/60 rounded-tr-xl sm:rounded-tr-2xl"></div>
                                                        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-b-2 border-amber-300/60 rounded-bl-xl sm:rounded-bl-2xl"></div>
                                                        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-amber-300/60 rounded-br-xl sm:rounded-br-2xl"></div>
                                                        
                                                        <div className="relative z-10">
                                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                                                                {reward.bg_url && (
                                                                    <Image
                                                                        src={reward.bg_url}
                                                                        alt="equipment background"
                                                                        width={96}
                                                                        height={96}
                                                                        className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                                                                    />
                                                                )}
                                                                {reward.icon_url ? (
                                                                    <Image
                                                                        src={reward.icon_url}
                                                                        alt={reward.name}
                                                                        width={80}
                                                                        height={80}
                                                                        className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                                                                        onError={(e) => handleImageError(e, reward.itemData)}
                                                                    />
                                                                ) : (
                                                                    // Fallback icon based on item type
                                                                    reward.type === 'equipment' ? (
                                                                        <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                                                    ) : (
                                                                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                                                    )
                                                                )}
                                                            </div>
                                                            
                                                            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-amber-100 transition-colors break-words text-center" title={reward.name}>{reward.name}</h4>
                                                            <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getRarityColor(reward.rarity)} mb-2`}>
                                                                {reward.rarity}
                                                            </div>
                                                            {reward.quantity && reward.quantity > 1 && (
                                                                <div className="mt-2 px-2 sm:px-3 py-1 bg-amber-500/30 rounded-full border border-amber-400/50">
                                                                    <p className="text-xs sm:text-sm font-bold text-amber-100">x{reward.quantity}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Enhanced rarity glow effect */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${reward.color} rounded-3xl blur-2xl opacity-40 -z-10 group-hover:opacity-60 transition-opacity duration-300`}></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        
                                        <motion.div 
                                            className="text-center mt-8 sm:mt-10 md:mt-12"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 1.2 }}
                                        >
                                            <motion.button
                                                className="relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 font-black text-base sm:text-lg md:text-xl rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 border-2 sm:border-4 border-amber-300/50 mx-4"
                                                onClick={() => {
                                                    setShowResults(false);
                                                    setOpenedBoxes([]);
                                                }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {/* Button glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-3xl blur-lg scale-110"></div>
                                                
                                                <span className="relative z-10 flex items-center justify-center">
                                                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                                                    <span className="text-sm sm:text-base md:text-lg">🎁 OPEN MORE TREASURES 🎁</span>
                                                </span>
                                            </motion.button>
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Token Expired Modal */}
                <TokenExpiredModal
                    isOpen={showTokenExpiredModal}
                    onClose={handleCloseTokenExpiredModal}
                    title="Token หมดอายุ"
                    message="กรุณา login ใหม่ผ่านเกมแล้วกดซื้อใหม่อีกครั้ง"
                />
            </div>
        </div>
    );
};

export default GachaPage;