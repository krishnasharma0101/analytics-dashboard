"use client";

import { Menu, Settings, Bell, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
}

export default function Header({ onMenuClick, isSidebarCollapsed }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8"
      style={{
        height: "72px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid var(--header-border)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center rounded-lg p-2 transition-all duration-200 cursor-pointer"
          style={{
            color: "var(--text-secondary)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-gradient-subtle)";
            e.currentTarget.style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* Page title / Breadcrumb area */}
        <div>
          <h2
            className="text-base sm:text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Ayuntamiento de{" "}
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Madrid
            </span>
          </h2>
          <p
            className="text-xs hidden sm:block"
            style={{ color: "var(--text-muted)", marginTop: "2px" }}
          >
            Municipal Analytics Dashboard
          </p>
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notifications */}
        <button
          className="relative flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 cursor-pointer"
          style={{
            color: "var(--text-secondary)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          aria-label="Notifications"
        >
          <Bell size={19} />
          {/* Notification badge */}
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{
              background: "#ef4444",
              boxShadow: "0 0 0 2px white",
            }}
          />
        </button>

        {/* Settings */}
        <button
          className="flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 cursor-pointer"
          style={{
            color: "var(--text-secondary)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          aria-label="Settings"
        >
          <Settings size={19} />
        </button>

        {/* Divider */}
        <div
          className="hidden sm:block w-px h-8 mx-1"
          style={{ background: "#e2e8f0" }}
        />

        {/* User profile */}
        <button
          className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3 transition-all duration-200 cursor-pointer"
          style={{
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          aria-label="User profile"
        >
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: "34px",
              height: "34px",
              background: "var(--accent-gradient)",
              boxShadow: "0 2px 8px rgba(29, 78, 216, 0.25)",
            }}
          >
            <User size={17} color="#ffffff" strokeWidth={2} />
          </div>
          <div className="hidden sm:block text-left">
            <p
              className="text-sm font-medium leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              Admin
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Alcalde
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
