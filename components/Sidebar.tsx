"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserCircle,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Residents", href: "/citizens", icon: Users },
  { label: "Businesses", href: "/analytics/business", icon: BarChart3 },
  { label: "Demographics", href: "/analytics/people", icon: UserCircle },
  { label: "AI Insights", href: "/ai-chatbot", icon: MessageSquare, badge: "NEW" },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export default function Sidebar({
  isOpen,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`mobile-overlay ${isOpen ? "active" : ""} lg:hidden`}
        onClick={onCloseMobile}
      />

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          flex flex-col border-r border-white/5
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
        style={{
          width: isCollapsed ? "80px" : "280px",
          backgroundColor: "#020617",
        }}
      >
        {/* Sidebar Header */}
        <div 
          className={`flex items-center shrink-0 transition-all duration-500 ${isCollapsed ? "justify-center" : "px-6"}`}
          style={{ height: "80px" }}
        >
          <div className={`flex items-center w-full ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-center shrink-0 rounded-xl transition-all duration-500"
                style={{
                  width: isCollapsed ? "36px" : "40px",
                  height: isCollapsed ? "36px" : "40px",
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 0 20px rgba(37, 99, 235, 0.15)"
                }}
              >
                <ShieldCheck size={isCollapsed ? 20 : 22} color="#fff" strokeWidth={2} />
              </div>
              
              {!isCollapsed && (
                <div className="animate-fade-in whitespace-nowrap">
                  <h1 className="text-[15px] font-bold tracking-tight text-white">City Hall</h1>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Analytics</p>
                </div>
              )}
            </div>

            {/* Toggle (Hidden on Collapsed or Mobile) */}
            {!isCollapsed && (
              <button
                 onClick={onToggleCollapse}
                 className="hidden lg:flex items-center justify-center rounded-lg p-1.5 transition-colors text-slate-500 hover:text-white hover:bg-white/5"
              >
                <Menu size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 sidebar-scroll">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className="group relative flex items-center rounded-xl transition-all duration-300"
                  style={{
                    padding: isCollapsed ? "12px" : "10px 14px",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    backgroundColor: active ? "rgba(37, 99, 235, 0.1)" : "transparent",
                    color: active ? "#3b82f6" : "#64748b",
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon 
                    size={20} 
                    strokeWidth={active ? 2.5 : 2} 
                    className="shrink-0 transition-transform group-hover:scale-110"
                  />

                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 ml-3.5 overflow-hidden">
                      <span className="text-[13.5px] font-semibold truncate leading-none">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black bg-blue-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Desktop Toggle Reveal (Visible only when collapsed and hovering top part) */}
                  {isCollapsed && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 pointer-events-none" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Toggle reveal for collapsed mode */}
        {isCollapsed && (
          <div className="p-3 mt-auto flex justify-center">
            <button
               onClick={onToggleCollapse}
               className="p-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <Menu size={18} />
            </button>
          </div>
        )}

        {/* Status Profile */}
        {!isCollapsed && (
          <div className="p-4 mt-auto">
            <div className="flex items-center gap-3 rounded-2xl p-3 bg-white/5 border border-white/5">
               <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
                 <Zap size={14} color="#fff" />
               </div>
               <div className="overflow-hidden">
                 <p className="text-[12px] font-bold text-white truncate leading-none">Admin</p>
                 <p className="text-[10px] text-emerald-500 font-medium mt-1 uppercase tracking-tighter">Live System</p>
               </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
