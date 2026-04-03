"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Check,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Clock,
  Languages,
  MapPin,
  Building2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SettingsTab = "profile" | "appearance" | "notifications" | "security" | "data";

// ─── Component ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Profile state
  const [profileForm, setProfileForm] = useState({
    firstName: "Admin",
    lastName: "Mayor",
    email: "admin@madrid.gov.es",
    phone: "+34 912 345 678",
    role: "System Administrator",
    department: "Municipal Analytics",
    city: "Madrid",
  });

  // Appearance state
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Notification state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyDigest: true,
    citizenUpdates: false,
    businessAlerts: true,
    securityAlerts: true,
    systemMaintenance: true,
    aiInsights: false,
  });

  // Security state
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // Data state
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataRetention, setDataRetention] = useState("365");
  const [exportFormat, setExportFormat] = useState("csv");

  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data & Privacy", icon: Database },
  ];

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        color: on ? "#1d4ed8" : "var(--text-muted)",
        transition: "color 0.2s",
      }}
    >
      {on ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
    </button>
  );

  return (
    <div className="page-content" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <div
          style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(29,78,216,0.3)",
          }}
        >
          <Settings size={18} color="#fff" />
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Settings
        </h1>
      </div>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px", marginBottom: "32px" }}>
        Manage your account, preferences, and system configuration
      </p>

      {/* ── Settings Layout ───────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "20px" }} className="charts-row">

        {/* Sidebar Navigation */}
        <div className="glass-card" style={{ padding: "12px", height: "fit-content", position: "sticky", top: "96px" }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "10px",
                    border: "none", cursor: "pointer",
                    background: isActive ? "rgba(29,78,216,0.08)" : "transparent",
                    color: isActive ? "#1d4ed8" : "var(--text-secondary)",
                    fontSize: "13px", fontWeight: isActive ? 600 : 500,
                    transition: "all 0.2s", textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                  {isActive && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* ── Profile Tab ─────────────────────────────────────────────── */}
          {activeTab === "profile" && (
            <>
              {/* Profile Header Card */}
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Profile Information
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "24px" }}>
                  Update your personal details and contact information
                </p>

                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", padding: "16px", borderRadius: "12px", background: "#f8fafc" }}>
                  <div
                    style={{
                      width: "64px", height: "64px", borderRadius: "16px",
                      background: "linear-gradient(135deg,#1e293b,#334155)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "22px", fontWeight: 700, color: "#fff",
                      boxShadow: "0 4px 12px rgba(15,23,42,0.2)",
                    }}
                  >
                    AM
                  </div>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                      {profileForm.firstName} {profileForm.lastName}
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{profileForm.role}</p>
                    <button
                      style={{
                        marginTop: "6px", padding: "5px 14px", borderRadius: "8px",
                        border: "1px solid #e2e8f0", background: "#fff",
                        fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)",
                        cursor: "pointer", transition: "background 0.2s",
                      }}
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "First Name", key: "firstName", icon: User },
                    { label: "Last Name", key: "lastName", icon: User },
                    { label: "Email Address", key: "email", icon: Mail },
                    { label: "Phone Number", key: "phone", icon: Smartphone },
                    { label: "Department", key: "department", icon: Building2 },
                    { label: "City", key: "city", icon: MapPin },
                  ].map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.key}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                          {field.label}
                        </label>
                        <div style={{ position: "relative" }}>
                          <Icon size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                          <input
                            type="text"
                            value={profileForm[field.key as keyof typeof profileForm]}
                            onChange={(e) => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                            style={{
                              width: "100%", padding: "10px 12px 10px 36px",
                              border: "1px solid #e2e8f0", borderRadius: "8px",
                              fontSize: "13px", color: "var(--text-primary)",
                              background: "#fff", outline: "none",
                              transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Role (read-only) */}
                <div style={{ marginTop: "16px", padding: "12px 16px", borderRadius: "10px", background: "rgba(29,78,216,0.04)", border: "1px solid rgba(29,78,216,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Key size={14} style={{ color: "#1d4ed8" }} />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Role</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#1d4ed8", background: "rgba(29,78,216,0.08)", padding: "3px 10px", borderRadius: "100px" }}>
                      {profileForm.role}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Appearance Tab ──────────────────────────────────────────── */}
          {activeTab === "appearance" && (
            <>
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Theme
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Choose your preferred color scheme
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {([
                    { id: "light" as const, label: "Light", icon: Sun, bg: "#ffffff", border: "#e2e8f0", fg: "#1e293b" },
                    { id: "dark" as const, label: "Dark", icon: Moon, bg: "#0f172a", border: "#1e293b", fg: "#e2e8f0" },
                    { id: "system" as const, label: "System", icon: Monitor, bg: "linear-gradient(135deg,#fff 50%,#0f172a 50%)", border: "#94a3b8", fg: "#475569" },
                  ]).map((t) => {
                    const Icon = t.icon;
                    const isSelected = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        style={{
                          padding: "20px 16px", borderRadius: "12px",
                          border: `2px solid ${isSelected ? "#1d4ed8" : "#e2e8f0"}`,
                          background: "#fff", cursor: "pointer",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          boxShadow: isSelected ? "0 0 0 3px rgba(29,78,216,0.1)" : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "48px", height: "32px", borderRadius: "8px",
                            background: t.bg, border: `1px solid ${t.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Icon size={14} style={{ color: t.fg }} />
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: isSelected ? "#1d4ed8" : "var(--text-secondary)" }}>
                          {t.label}
                        </span>
                        {isSelected && (
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={11} color="#fff" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Display Preferences
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(226,232,240,0.5)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Compact Mode</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Reduce spacing for denser data views</p>
                    </div>
                    <Toggle on={compactMode} onToggle={() => setCompactMode(!compactMode)} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Animations</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Enable smooth transitions and micro-animations</p>
                    </div>
                    <Toggle on={animationsEnabled} onToggle={() => setAnimationsEnabled(!animationsEnabled)} />
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Locale
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Language</label>
                    <div style={{ position: "relative" }}>
                      <Languages size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                      <select
                        style={{
                          width: "100%", padding: "10px 12px 10px 36px",
                          border: "1px solid #e2e8f0", borderRadius: "8px",
                          fontSize: "13px", color: "var(--text-primary)",
                          background: "#fff", outline: "none", cursor: "pointer",
                          appearance: "auto",
                        }}
                      >
                        <option>English</option>
                        <option>Español</option>
                        <option>Français</option>
                        <option>Deutsch</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Timezone</label>
                    <div style={{ position: "relative" }}>
                      <Clock size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                      <select
                        style={{
                          width: "100%", padding: "10px 12px 10px 36px",
                          border: "1px solid #e2e8f0", borderRadius: "8px",
                          fontSize: "13px", color: "var(--text-primary)",
                          background: "#fff", outline: "none", cursor: "pointer",
                          appearance: "auto",
                        }}
                      >
                        <option>Europe/Madrid (CET)</option>
                        <option>Europe/London (GMT)</option>
                        <option>America/New_York (EST)</option>
                        <option>Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Notifications Tab ───────────────────────────────────────── */}
          {activeTab === "notifications" && (
            <>
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Notification Channels
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Choose how you want to receive notifications
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {([
                    { key: "emailAlerts", label: "Email Alerts", desc: "Receive notifications via email", icon: Mail },
                    { key: "pushNotifications", label: "Push Notifications", desc: "Browser and mobile push alerts", icon: Bell },
                    { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary report every Monday", icon: Globe },
                  ] as const).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.key}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 0",
                          borderBottom: "1px solid rgba(226,232,240,0.5)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(29,78,216,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={16} style={{ color: "#1d4ed8" }} />
                          </div>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{item.label}</p>
                            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</p>
                          </div>
                        </div>
                        <Toggle on={notifications[item.key]} onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Alert Categories
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Fine-tune which events trigger notifications
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {([
                    { key: "citizenUpdates", label: "Citizen Updates", desc: "New registrations and profile changes", color: "#1d4ed8" },
                    { key: "businessAlerts", label: "Business Alerts", desc: "License expirations and new registrations", color: "#7c3aed" },
                    { key: "securityAlerts", label: "Security Alerts", desc: "Unauthorized access attempts and anomalies", color: "#dc2626" },
                    { key: "systemMaintenance", label: "System Maintenance", desc: "Scheduled downtime and update notices", color: "#f59e0b" },
                    { key: "aiInsights", label: "AI Insights", desc: "Automated analysis and recommendations", color: "#059669" },
                  ] as const).map((item) => (
                    <div
                      key={item.key}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(226,232,240,0.5)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{item.label}</p>
                          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</p>
                        </div>
                      </div>
                      <Toggle on={notifications[item.key]} onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Security Tab ────────────────────────────────────────────── */}
          {activeTab === "security" && (
            <>
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Password
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Manage your account password
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                  {["Current Password", "New Password", "Confirm Password"].map((label) => (
                    <div key={label}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                        {label}
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          style={{
                            width: "100%", padding: "10px 40px 10px 14px",
                            border: "1px solid #e2e8f0", borderRadius: "8px",
                            fontSize: "13px", color: "var(--text-primary)",
                            background: "#fff", outline: "none",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                            background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px",
                          }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Authentication
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(226,232,240,0.5)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(5,150,105,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Shield size={16} style={{ color: "#059669" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Two-Factor Authentication</p>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Add extra security to your account</p>
                      </div>
                    </div>
                    <Toggle on={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Session Timeout</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Auto-logout after inactivity</p>
                    </div>
                    <select
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      style={{
                        padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
                        fontSize: "13px", color: "var(--text-primary)", background: "#fff",
                        outline: "none", cursor: "pointer",
                      }}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                  Active Sessions
                </h2>

                {[
                  { device: "Windows Desktop", browser: "Chrome 122", ip: "192.168.1.42", location: "Madrid, ES", current: true, time: "Now" },
                  { device: "iPhone 15 Pro", browser: "Safari 17", ip: "10.0.0.23", location: "Madrid, ES", current: false, time: "2 hours ago" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 12px", borderRadius: "10px",
                      background: s.current ? "rgba(29,78,216,0.04)" : "transparent",
                      border: `1px solid ${s.current ? "rgba(29,78,216,0.1)" : "transparent"}`,
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {i === 0 ? <Monitor size={16} style={{ color: "var(--text-secondary)" }} /> : <Smartphone size={16} style={{ color: "var(--text-secondary)" }} />}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{s.device}</span>
                          {s.current && (
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#059669", background: "rgba(5,150,105,0.1)", padding: "2px 6px", borderRadius: "100px" }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          {s.browser} · {s.ip} · {s.location} · {s.time}
                        </p>
                      </div>
                    </div>
                    {!s.current && (
                      <button style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Data & Privacy Tab ──────────────────────────────────────── */}
          {activeTab === "data" && (
            <>
              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Data Management
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Configure backup and export preferences
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(226,232,240,0.5)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Automatic Backups</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Daily encrypted backups to secure storage</p>
                    </div>
                    <Toggle on={autoBackup} onToggle={() => setAutoBackup(!autoBackup)} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(226,232,240,0.5)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Data Retention Period</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>How long to keep historical records</p>
                    </div>
                    <select
                      value={dataRetention}
                      onChange={(e) => setDataRetention(e.target.value)}
                      style={{
                        padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
                        fontSize: "13px", color: "var(--text-primary)", background: "#fff",
                        outline: "none", cursor: "pointer",
                      }}
                    >
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="730">2 years</option>
                      <option value="forever">Indefinite</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Default Export Format</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Format for data downloads</p>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["csv", "xlsx", "json"].map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setExportFormat(fmt)}
                          style={{
                            padding: "6px 14px", borderRadius: "8px",
                            border: `1px solid ${exportFormat === fmt ? "#1d4ed8" : "#e2e8f0"}`,
                            background: exportFormat === fmt ? "rgba(29,78,216,0.08)" : "#fff",
                            color: exportFormat === fmt ? "#1d4ed8" : "var(--text-secondary)",
                            fontSize: "12px", fontWeight: 600, cursor: "pointer",
                            textTransform: "uppercase",
                          }}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Storage Usage
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Current database and file storage consumption
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: "Citizen Records", used: 42.3, total: 100, color: "#1d4ed8" },
                    { label: "Business Data", used: 28.7, total: 100, color: "#7c3aed" },
                    { label: "Documents & Files", used: 67.1, total: 100, color: "#0891b2" },
                    { label: "Analytics Cache", used: 15.2, total: 50, color: "#059669" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>{s.label}</span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.used} GB / {s.total} GB</span>
                      </div>
                      <div style={{ height: "8px", borderRadius: "100px", background: "rgba(226,232,240,0.6)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(s.used / s.total) * 100}%`, borderRadius: "100px", background: s.color, transition: "width 1s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "20px", padding: "12px 16px", borderRadius: "10px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Total Storage Used</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>153.3 GB of 350 GB (43.8%)</p>
                  </div>
                  <div style={{ width: "60px", height: "60px", position: "relative" }}>
                    <svg viewBox="0 0 60 60" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(226,232,240,0.6)" strokeWidth="6" />
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#1d4ed8" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 24 * 0.438} ${2 * Math.PI * 24}`} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)" }}>44%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="glass-card" style={{ padding: "28px", borderColor: "rgba(220,38,38,0.15)" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#dc2626", marginBottom: "4px" }}>
                  Danger Zone
                </h2>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Irreversible actions — please proceed with caution
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { label: "Clear Analytics Cache", desc: "Remove cached data. Fresh data will be recomputed.", btnColor: "#f59e0b" },
                    { label: "Export All Data", desc: "Download a complete backup of all municipal data.", btnColor: "#1d4ed8" },
                    { label: "Purge Old Records", desc: "Permanently delete records older than retention period.", btnColor: "#dc2626" },
                  ].map((action) => (
                    <div
                      key={action.label}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 16px", borderRadius: "10px",
                        border: "1px solid rgba(226,232,240,0.7)",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{action.label}</p>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{action.desc}</p>
                      </div>
                      <button
                        style={{
                          padding: "7px 16px", borderRadius: "8px",
                          border: `1px solid ${action.btnColor}30`,
                          background: `${action.btnColor}08`,
                          color: action.btnColor,
                          fontSize: "12px", fontWeight: 600, cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      >
                        Execute
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Save Button ──────────────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              style={{
                padding: "10px 20px", borderRadius: "9px",
                border: "1px solid #e2e8f0", background: "#fff",
                color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "10px 24px", borderRadius: "9px",
                background: saved ? "#059669" : "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                border: "none", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                boxShadow: saved ? "0 4px 12px rgba(5,150,105,0.3)" : "0 4px 12px rgba(29,78,216,0.3)",
                transition: "all 0.3s",
              }}
            >
              {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
