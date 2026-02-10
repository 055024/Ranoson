"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PlayCircle, Award, Clock, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import UserProfile from '@/components/UserProfile';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

// Dynamically import the 3D component with no SSR to avoid hydration issues
const MachineExplorer = dynamic(() => import('@/components/MachineExplorer'), { ssr: false });

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  // State
  const [role, setRole] = useState("CNC Operator");
  const [modules, setModules] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // If real user exists, use their role info if available
    // Mock logic for demo purposes if backend isn't full role-based yet
    if (user?.role_id === 1) setRole("Admin");

    // Map real user progress to modules
    if (user?.progress && user.progress.length > 0) {
      const realModules = user.progress
        .filter((p: any) => p.module != null) // Filter out deleted modules
        .map((p: any) => ({
          id: p.module.id,
          title: p.module.title,
          status: p.status,
          progress: p.status === "Completed" ? 100 : (p.status === "In Progress" ? (p.current_step_index * 10) : 0),
          duration: "10 min" // Placeholder as duration is not yet in DB
        }));
      setModules(realModules);
    } else {
      setModules([]);
    }
  }, [user]);

  // Color mapping for modules to match the reference image
  const cardColors = [
    { bg: 'bg-[#1572FE]', text: 'text-white', icon: 'bg-white/20 text-white' }, // Blue
    { bg: 'bg-[#C08CEE]', text: 'text-white', icon: 'bg-white/20 text-white' }, // Purple
    { bg: 'bg-[#EEAC5C]', text: 'text-white', icon: 'bg-white/20 text-white' }, // Orange
  ];

  return (
    <main className="min-h-screen pb-32 pt-8 px-5 lg:max-w-4xl mx-auto transition-colors duration-300">
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />

      {/* Header */}
      <header className="flex justify-between items-end mb-10 animate-fade-in-up">
        <div>
          <p className="text-slate-500 text-lg font-medium tracking-wide mb-1 opacity-90">Welcome back</p>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
            {user?.employee_code || "Ashok"}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] ${role === 'Admin' ? 'animate-pulse' : ''}`}></div>
            <span className="glass-panel px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide text-slate-700 bg-white shadow-sm border border-slate-200">
              {role}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowProfile(true)}
            className="h-14 w-14 glass-panel rounded-full flex items-center justify-center hover:bg-white transition-all bg-white shadow-lg active:scale-95 group border border-slate-100"
            aria-label="Open Profile"
          >
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-base font-bold shadow-inner">
              {user?.employee_code ? user.employee_code.substring(0, 2).toUpperCase() : "AS"}
            </div>
          </button>
        </div>
      </header>

      {/* Assigned Training */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 ml-2">Assigned Training</h2>
        <div className="space-y-5">
          {modules.map((mod, idx) => {
            const isInProgress = mod.status === 'In Progress';
            const colorTheme = cardColors[idx % cardColors.length];

            return (
              <Link href={`/modules/${mod.id}`} key={mod.id} className="block">
                <div
                  className={clsx(
                    "p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-5 cursor-pointer group relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1",
                    colorTheme.bg
                  )}
                >
                  {/* Icon Container */}
                  <div className={clsx(
                    "h-16 w-16 rounded-2xl flex items-center justify-center transition-colors shadow-inner shrink-0",
                    colorTheme.icon
                  )}>
                    {isInProgress ? <PlayCircle size={32} /> : <Clock size={32} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={clsx("font-bold text-xl leading-tight", colorTheme.text)}>
                        {mod.title}
                      </h3>
                      {isInProgress && (
                        <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-md border border-white/30 whitespace-nowrap tracking-wider shadow-sm backdrop-blur-sm">
                          RESUME
                        </span>
                      )}
                    </div>

                    <div className={clsx("flex items-center gap-4 text-sm mb-2 opacity-90", colorTheme.text)}>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock size={14} className="opacity-75" />
                        {mod.duration}
                      </span>
                      <span className="h-1.5 w-1.5 bg-current rounded-full opacity-50"></span>
                      <span className="font-bold uppercase tracking-wide text-xs opacity-90">
                        {mod.status}
                      </span>
                    </div>

                    {/* Progress Bar for In Progress */}
                    {isInProgress && (
                      <div className="w-full h-1.5 bg-black/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-white rounded-full shadow-sm relative" style={{ width: `${mod.progress}%` }}>
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
