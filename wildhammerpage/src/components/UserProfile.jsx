'use client';
import React from 'react';
import { User, Coins, Mail, Server, Crown } from 'lucide-react';

const UserProfile = ({ userData }) => {
    if (!userData) return null;

    return (
        <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
            
            {/* Main profile card */}
            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">

                {/* User info */}
                <div className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-xs text-white/60 uppercase tracking-wide">Username</div>
                            <div className="text-lg font-bold text-white">{userData.userid}</div>
                        </div>
                    </div>

                    {/* Server ID */}
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <Server className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-xs text-white/60 uppercase tracking-wide">Server</div>
                            <div className="text-lg font-bold text-white">Server {userData.serverId}</div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-xs text-white/60 uppercase tracking-wide">Email</div>
                            <div className="text-sm font-medium text-white/90">{userData.email}</div>
                        </div>
                    </div>

                    {/* Real Money - Highlighted */}
                    <div className="relative p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border-2 border-amber-400/30">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-lg"></div>
                        <div className="relative flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                <Coins className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-amber-200 uppercase tracking-wide font-medium">Real Money</div>
                                <div className="text-2xl font-bold text-amber-100">
                                    {parseFloat(userData.realMoney).toLocaleString('th-TH')} Token
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/50 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-400/50 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-400/50 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/50 rounded-br-2xl"></div>
            </div>
        </div>
    );
};

export default UserProfile;
