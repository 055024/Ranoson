"use client";

import React from 'react';
import Link from 'next/link';
import { PlayCircle, Award, Home, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
    const pathname = usePathname();
    const { user } = useAuth();

    const navItems = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Learn', icon: PlayCircle, href: '/learning' },
        { name: 'Certificates', icon: Award, href: '/certificates' },
        // Show Admin only if role_id is 1 (Admin)
        ...(user?.role_id === 1 ? [{ name: 'Admin', icon: Settings, href: '/admin' }] : []),
    ];

    if (pathname === '/login') return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm sm:max-w-md animate-fade-in-up">
            <nav className="glass-panel rounded-2xl flex items-center justify-between px-6 py-4 shadow-xl border border-white/40 bg-white/80 backdrop-blur-xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group flex flex-col items-center gap-1 relative"
                        >
                            <div className={clsx(
                                "relative flex items-center justify-center p-2 rounded-xl transition-all duration-300",
                                isActive ? "text-white bg-[#1572FE] shadow-lg shadow-blue-500/30" : "text-slate-400 group-hover:text-[#1572FE]"
                            )}>
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            {/* Label for Mobile/Desktop clarity? Optional, sticking to icons for now as per design */}

                        </Link>
                    );
                })}

                {/* Profile Link separate or explicitly added */}
                <button className="group flex flex-col items-center gap-1 relative text-slate-400 hover:text-[#1572FE] transition-colors">
                    <div className="relative flex items-center justify-center p-2 rounded-xl">
                        <User size={24} />
                    </div>
                </button>
            </nav>
        </div>
    );
}
