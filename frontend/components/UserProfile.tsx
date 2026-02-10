"use client";

import React, { useState, useEffect } from 'react';
import { User, LogOut, X, Save, Phone, Briefcase } from 'lucide-react';

interface UserProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            fetchUserProfile();
        }
    }, [isOpen]);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        // Mock Data Fallback
        setUser({
            employee_code: "Ashok Kumar", // Display name for now
            role: { name: "CNC Operator" },
            phone_number: "98765 43210"
        });
        setPhoneNumber("98765 43210");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleSave = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
            setUser({ ...user, phone_number: phoneNumber });
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-fade-in-up">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="glass-panel w-full max-w-sm mx-4 rounded-3xl p-6 relative shadow-2xl border border-white/60 bg-white/90 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                            {/* Mock Avatar */}
                            <span className="text-2xl font-bold text-blue-600">AK</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{user?.employee_code || 'Loading...'}</h2>
                    <div className="flex items-center gap-2 mt-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        <Briefcase size={12} className="text-blue-500" />
                        <p className="text-blue-600 text-xs font-medium tracking-wide">CNC Operator</p>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                        <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 block">Contact Info</label>
                        <div className="flex items-center justify-between">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="bg-white text-slate-800 p-2 rounded-lg w-full mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm border border-slate-200"
                                    autoFocus
                                />
                            ) : (
                                <span className="text-slate-700 flex items-center gap-3 text-sm font-medium">
                                    <Phone size={16} className="text-slate-400" />
                                    {user?.phone_number || 'Not Set'}
                                </span>
                            )}

                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                                    EDIT
                                </button>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                        >
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    )}

                    <div className="h-px bg-slate-100 my-6" />

                    <button
                        onClick={handleLogout}
                        className="w-full group bg-transparent hover:bg-red-50 text-slate-400 hover:text-red-500 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-200 hover:border-red-200"
                    >
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
