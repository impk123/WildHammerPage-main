'use client';
import React from 'react';
import { ShoppingCart, Star, CheckCircle, Trophy, Package, Shield, Sword, Crown } from 'lucide-react';
import gameItemManager from '@/utils/GameItemManager';
import gameEquipManager from '@/utils/GameEquipManager';
import { RainbowButton } from "@/components/ui/rainbow-button"
const PackageCard = ({ item, userInfo, tokenValid, tokenLoading, token, onPurchase }) => {


    const parseItems = (itemsString) => {
        try {
            return JSON.parse(itemsString || '[]');
        } catch {
            return [];
        }
    };

    const getItemDetails = (itemId) => {
        try {
            return gameItemManager.getItemForUI(itemId);
        } catch (error) {
            console.error('Error getting item details:', error);
            return null;
        }
    };

    const getEquipmentDetails = (equipId, quality = 1) => {
        try {
            const equipData = gameEquipManager.getEquipById(equipId);
            if (!equipData) return null;

            return {
                id: equipId,
                name: equipData.name || `Equipment ${equipId}`,
                level: equipData.level || 1,
                quality: quality,
                rarity: gameEquipManager.getRarityByLevel(equipData.level || 1),
                category: gameEquipManager.getCategoryByPosition(equipData.pos),
                icon_url: gameEquipManager.getEquipIconByIdq(equipId, quality),
                bg_url: gameEquipManager.getEquipBGByIdq(quality),
                original_data: equipData
            };
        } catch (error) {
            console.error('Error getting equipment details:', error);
            return null;
        }
    };

    const getPacketTypeColor = (type) => {
        const colors = {
            'starter': 'bg-blue-500/20 text-blue-300 border-blue-400/50',
            'equipment': 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
            'premium': 'bg-purple-500/20 text-purple-300 border-purple-400/50',
            'weapon': 'bg-red-500/20 text-red-300 border-red-400/50',
            'special': 'bg-amber-500/20 text-amber-300 border-amber-400/50'
        };
        return colors[type] || 'bg-slate-500/20 text-slate-300 border-slate-400/50';
    };

    const getPacketTypeIcon = (type) => {
        const icons = {
            'starter': Package,
            'equipment': Shield,
            'premium': Crown,
            'weapon': Sword,
            'special': Star
        };
        return icons[type] || Package;
    };

    const getRarityColor = (rarity) => {
        const colors = {
            'Legendary': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
            'Epic': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
            'Rare': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
            'Uncommon': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
            'Common': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
        };
        return colors[rarity] || colors['Common'];
    };


 

    const gameItems = parseItems(item.game_items);
    const equipmentItems = parseItems(item.equipment_items);

    return (
        <div className={`group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 shadow-2xl transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-2 flex flex-col ${item.is_featured ? 'ring-2 ring-amber-400/70 shadow-amber-500/30 border-amber-400/50' : 'border-slate-600/50'
            }`}>
            {/* Featured Badge */}
            {/* {item.is_featured && (
                <div className="absolute top-[-5px] overflow-visible right-4 z-10">
                    <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        <Star className="w-3 h-3" />
                        <span>FEATURED</span>
                    </div>
                </div>
            )} */}

            {/* Header */}
            <div className="p-6 pb-4 relative">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/50 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-400/50 rounded-tr-2xl"></div>

                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-2">
                        <h3 className="text-xl font-bold text-amber-100 leading-tight drop-shadow-lg">{item.name}</h3>
                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <div className={`rounded-lg border-2 px-3 py-1 text-xs font-medium flex items-center space-x-1 bg-slate-800/80 backdrop-blur-sm ${getPacketTypeColor(item.packet_type)}`}>
                        {React.createElement(getPacketTypeIcon(item.packet_type), { className: "w-3 h-3" })}
                        <span>{item.packet_type}</span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-amber-400 drop-shadow-lg">{item.price_token.toLocaleString()}</span>
                        <span className="text-sm text-slate-400">Token</span>
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="px-6 pb-6 flex-1">
                <div className="space-y-6">
                    {/* Game Items */}
                    {gameItems.length > 0 && (
                        <div className="relative">
                            {/* Decorative frame */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-lg border border-amber-400/20"></div>
                            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-amber-400/60 rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-amber-400/60 rounded-tr-lg"></div> */}

                            <div className="relative p-4">
                                <h4 className="text-sm font-bold text-amber-200 mb-4 flex items-center">
                                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full mr-3 shadow-amber-400/70 shadow-lg animate-pulse"></div>
                                    <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">
                                        Game Items
                                    </span>
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {gameItems.map((gameItem, index) => {
                                        const itemDetails = getItemDetails(gameItem.id);
                                        return (
                                            <div key={index} className="group relative flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300 border border-slate-600/40 hover:border-amber-400/40 hover:shadow-amber-400/20 hover:shadow-lg">
                                                {/* Glow effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {itemDetails?.icon_url && (
                                                    <div className="relative z-10 mb-2">
                                                        <img
                                                            src={itemDetails.icon_url}
                                                            alt={gameItem.name}
                                                            className="w-15 h-15 rounded-lg shadow-lg"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                        {/* Icon glow */}
                                                        {/* <div className="absolute inset-0 w-15 h-15 rounded-lg bg-amber-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                                                    </div>
                                                )}
                                                <span className="relative z-10 text-xs font-medium text-slate-200 text-center leading-tight mb-2 group-hover:text-amber-100 transition-colors">
                                                    {gameItem.name}
                                                </span>
                                                <span className="relative z-10 text-xs font-bold text-white bg-gradient-to-r from-amber-400/20 to-yellow-400/20 px-2 py-1 rounded-md border border-amber-400/40 group-hover:border-amber-300/60 group-hover:bg-gradient-to-r group-hover:from-amber-400/30 group-hover:to-yellow-400/30 transition-all duration-300">
                                                    x{gameItem.quantity}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Equipment Items */}
                    {equipmentItems.length > 0 && (
                        <div className="relative">
                            {/* Decorative frame */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 rounded-lg border border-emerald-400/20"></div>
                            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-emerald-400/60 rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-emerald-400/60 rounded-tr-lg"></div>

                            <div className="relative p-4">
                                <h4 className="text-sm font-bold text-emerald-200 mb-4 flex items-center">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-3 shadow-emerald-400/70 shadow-lg animate-pulse"></div>
                                    <span className="bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                                        Equipment
                                    </span>
                                </h4>
                                <div className="space-y-3">
                                    {equipmentItems.map((equipItem, index) => {
                                        const equipDetails = getEquipmentDetails(equipItem.id, equipItem.quality || 1);
                                        return (
                                            <div key={index} className="group relative flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300 border border-slate-600/40 hover:border-emerald-400/40 hover:shadow-emerald-400/20 hover:shadow-lg">
                                                {/* Glow effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <div className="relative z-10 flex items-center space-x-4">
                                                    <div className="relative">
                                                        {equipDetails?.bg_url && (
                                                            <img
                                                                src={equipDetails.bg_url}
                                                                alt="equipment background"
                                                                className="w-20 h-20 absolute group-hover:scale-110 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        )}
                                                        {equipDetails?.icon_url && (
                                                            <img
                                                                src={equipDetails.icon_url}
                                                                alt={equipItem.name}
                                                                className="w-20 h-20 relative z-10 group-hover:scale-110 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        )}
                                                        {/* Equipment glow */}
                                                        <div className="absolute inset-0 w-20 h-20 rounded-lg bg-emerald-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-200 group-hover:text-emerald-100 transition-colors">
                                                            {equipItem.name}
                                                        </span>
                                                        {equipDetails && (
                                                            <span className="text-xs text-slate-400 group-hover:text-emerald-300 transition-colors">
                                                                Level {equipDetails.level} • {equipDetails.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`relative z-10 px-3 py-1 rounded-md text-xs font-semibold ${getRarityColor(equipItem.rarity)} group-hover:scale-105 transition-transform duration-300`}>
                                                    {equipItem.rarity}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 mt-auto relative">
                {/* Decorative corner elements */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-400/50 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/50 rounded-br-2xl"></div>

                <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                    <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-amber-400" />
                        Level {item.level_requirement}
                    </span>
                    <span className="flex items-center">
                        <Trophy className="w-3 h-3 mr-1 text-amber-400" />
                        {item.total_purchases} purchases
                    </span>
                </div>

                {/* User Info Display */}
                {userInfo && tokenValid && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-xs text-slate-300">
                            <div className="flex items-center justify-between">
                                <span>User: {userInfo.username}</span>
                                <span>Server: {userInfo.serverId}</span>
                            </div>
                        </div>
                    </div>
                )}

                <RainbowButton 
                    onClick={() => onPurchase(item)}
                    className="w-full text-white"
                    disabled={!tokenValid || !item.is_active || tokenLoading}
                >
                    {tokenLoading ? (
                        <span className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Verifying...
                        </span>
                    ) : !tokenValid ? (
                        'Login Required'
                    ) : item.is_active ? (
                        <span className="flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Purchase Package
                        </span>
                    ) : (
                        'Currently Unavailable'
                    )}
                </RainbowButton>
            </div>
        </div>
    );
};

export default PackageCard;
