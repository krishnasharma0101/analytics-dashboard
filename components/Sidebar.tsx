"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserCircle,
  MessageSquare,
  ChevronLeft,
  Building2,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Citizen Collection", href: "/citizens", icon: Users },
  { label: "Business Analytics", href: "/analytics/business", icon: BarChart3 },
  { label: "People Analytics", href: "/analytics/people", icon: UserCircle },
  { label: "AI Insights", href: "/ai-chatbot", icon: MessageSquare },
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
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${isOpen ? "active" : ""} lg:hidden`}
        onClick={onCloseMobile}
      />

      {/* Sidebar */}
      <aside
        style={{
          width: isCollapsed ? "80px" : "280px",
          transform: isOpen ? "translateX(0)" : undefined,
        }}
        className={`
          fixed top-0 left-0 z-40 h-screen
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Sidebar Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0f172a 0%, #0c1222 100%)",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Logo / Brand */}
          <div
            className="flex items-center gap-3 px-5 py-6"
            style={{
              borderBottom: "1px solid rgba(30, 41, 59, 0.8)",
              minHeight: "80px",
            }}
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
                boxShadow: "0 4px 12px rgba(29, 78, 216, 0.4)",
              }}
            >
              <Building2 size={22} color="#ffffff" strokeWidth={2} />
            </div>

            {!isCollapsed && (
              <div className="animate-fade-in overflow-hidden">
                <h1
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "#f1f5f9" }}
                >
                  Ayuntamiento
                </h1>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "#64748b" }}
                >
                  Analytics Platform
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 sidebar-scroll overflow-y-auto">
            {!isCollapsed && (
              <p
                className="text-xs font-semibold uppercase tracking-widest px-3 mb-3"
                style={{ color: "#475569" }}
              >
                Navigation
              </p>
            )}

            <ul className="space-y-1">
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <li
                    key={item.href}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-slide-in"
                  >
                    <Link
                      href={item.href}
                      onClick={onCloseMobile}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative overflow-hidden"
                      style={{
                        color: active ? "#ffffff" : "#94a3b8",
                        background: active
                          ? "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
                          : "transparent",
                        boxShadow: active
                          ? "0 4px 12px rgba(29, 78, 216, 0.3)"
                          : "none",
                      }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {/* Hover background */}
                      {!active && (
                        <span
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: "#1e293b", borderRadius: "8px" }}
                        />
                      )}

                      <span className="relative flex items-center justify-center shrink-0 w-5 h-5">
                        <Icon
                          size={20}
                          strokeWidth={active ? 2.2 : 1.8}
                          className="transition-transform duration-200 group-hover:scale-110"
                        />
                      </span>

                      {!isCollapsed && (
                        <span className="relative truncate">{item.label}</span>
                      )}

                      {/* Active indicator dot */}
                      {active && !isCollapsed && (
                        <span
                          className="relative ml-auto w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#93c5fd",
                            boxShadow: "0 0 6px rgba(147, 197, 253, 0.6)",
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Collapse Toggle (desktop only) */}
          <div
            className="hidden lg:flex items-center justify-center py-4 px-3"
            style={{ borderTop: "1px solid rgba(30, 41, 59, 0.8)" }}
          >
            <button
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-full rounded-lg py-2 transition-all duration-200 cursor-pointer"
              style={{
                color: "#64748b",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1e293b";
                e.currentTarget.style.color = "#94a3b8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#64748b";
              }}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                size={18}
                className="transition-transform duration-300"
                style={{
                  transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
              {!isCollapsed && (
                <span className="text-xs ml-2 font-medium">Collapse</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
