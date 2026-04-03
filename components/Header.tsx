"use client";

import { Bell, Command, Settings, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
}

export default function Header({ onMenuClick, isSidebarCollapsed }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-8 border-b border-slate-200/60 transition-all duration-500 ease-in-out"
      style={{
        height: "80px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(24px) contrast(110%)",
      }}
    >
      {/* Context Area */}
      <div className="flex items-center gap-6">
        {/* Burger Button (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center rounded-xl p-2.5 transition-all bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          <Command size={20} />
        </button>

        {/* Clean Breadcrumb Hierarchy */}
        <div className="flex items-center gap-2 group cursor-default">
          <span className="text-[13px] font-bold text-slate-900 uppercase tracking-widest leading-none">
            City Hall
          </span>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-[13px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors uppercase tracking-widest leading-none">
            Madrid
          </span>
        </div>
      </div>

      {/* Control Area */}
      <div className="flex items-center gap-4">
        {/* Global Search / Command Hub */}
        <button
          className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200/60 transition-all hover:bg-white hover:shadow-sm group w-48"
          aria-label="Search"
        >
          <Command size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="flex-1 text-left text-[12px] font-semibold text-slate-400 group-hover:text-slate-500 transition-colors leading-none">Search ...</span>
          <span className="hidden md:block text-[10px] font-black text-slate-300 group-hover:text-slate-400 transition-colors uppercase leading-none">⌘K</span>
        </button>

        {/* Actions Button Cluster */}
        <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
           <button
             className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 group"
             aria-label="Notifications"
           >
             <Bell size={18} strokeWidth={2.2} />
             <span className="absolute top-[8px] right-[8px] w-2 h-2 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-500/20" />
           </button>
           <div className="w-px h-5 bg-slate-100" />
           <button
             className="flex items-center justify-center w-9 h-9 rounded-xl transition-all text-slate-500 hover:text-slate-900 hover:bg-slate-50"
             aria-label="Settings"
           >
             <Settings size={18} strokeWidth={2.2} />
           </button>
        </div>

        {/* Admin Avatar Unit */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center border-2 border-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-105">
            <User size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="hidden xl:block overflow-hidden max-w-[120px]">
            <p className="text-[12px] font-black text-slate-900 leading-tight truncate">Mayor Admin</p>
            <p className="text-[10px] text-emerald-500 font-bold mt-0.5 uppercase tracking-tighter truncate">Verified User</p>
          </div>
        </div>
      </div>
    </header>
  );
}
