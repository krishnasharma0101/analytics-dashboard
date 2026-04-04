"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  MapPin,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Download,
  RefreshCw,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Clock,
  CalendarDays,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    id: "total",
    label: "Total Records",
    value: "3,305,408",
    change: "+1.2%",
    up: true,
    sub: "in municipal database",
    icon: Users,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.15)",
  },
  {
    id: "verified",
    label: "Verified Citizens",
    value: "2,891,204",
    change: "+3.4%",
    up: true,
    sub: "identity confirmed",
    icon: ShieldCheck,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
  },
  {
    id: "new",
    label: "New Registrations",
    value: "12,847",
    change: "+8.1%",
    up: true,
    sub: "this month",
    icon: UserPlus,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
  },
  {
    id: "pending",
    label: "Pending Review",
    value: "3,241",
    change: "-12.4%",
    up: false,
    sub: "awaiting verification",
    icon: Clock,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.15)",
  },
];

const COLLECTION_PROGRESS = [
  { label: "Personal Data", pct: 98, color: "#059669", icon: Users },
  { label: "Contact Information", pct: 94, color: "#1d4ed8", icon: Phone },
  { label: "Address Records", pct: 91, color: "#7c3aed", icon: Home },
  { label: "Employment Status", pct: 76, color: "#0891b2", icon: Briefcase },
  { label: "Education Records", pct: 68, color: "#f59e0b", icon: GraduationCap },
  { label: "Health Data (opt-in)", pct: 42, color: "#dc2626", icon: Heart },
];

const VERIFICATION_STATUS = [
  { label: "Fully Verified", pct: 0.72, color: "#059669", count: "2,379,894" },
  { label: "Partially Verified", pct: 0.15, color: "#f59e0b", count: "495,811" },
  { label: "Unverified", pct: 0.09, color: "#dc2626", count: "297,487" },
  { label: "Under Review", pct: 0.04, color: "#64748b", count: "132,216" },
];

const DISTRICT_COLLECTION = [
  { name: "Centro", total: 143130, collected: 139840, pct: 97.7, trend: "up" },
  { name: "Salamanca", total: 147683, collected: 145070, pct: 98.2, trend: "up" },
  { name: "Chamartín", total: 147943, collected: 143600, pct: 97.1, trend: "up" },
  { name: "Arganzuela", total: 155419, collected: 150210, pct: 96.7, trend: "up" },
  { name: "Chamberí", total: 139080, collected: 137260, pct: 98.7, trend: "up" },
  { name: "Retiro", total: 120067, collected: 114060, pct: 95.0, trend: "down" },
  { name: "Tetuán", total: 157171, collected: 148190, pct: 94.3, trend: "down" },
  { name: "Fuencarral-El Pardo", total: 247388, collected: 230470, pct: 93.2, trend: "up" },
  { name: "Moncloa-Aravaca", total: 118869, collected: 115290, pct: 97.0, trend: "up" },
  { name: "Latina", total: 239265, collected: 222910, pct: 93.2, trend: "down" },
  { name: "Carabanchel", total: 255258, collected: 237390, pct: 93.0, trend: "up" },
  { name: "Usera", total: 139643, collected: 131260, pct: 94.0, trend: "up" },
];

const CITIZENS_TABLE = [
  { id: "CIT-230142", name: "Ana García López", email: "ana.garcia@mail.es", phone: "+34 612 345 678", district: "Salamanca", dob: "15/03/1990", gender: "F", status: "Verified", docs: 8, lastUpdate: "2 days ago" },
  { id: "CIT-230219", name: "Carlos Martínez Ruiz", email: "carlos.mtz@mail.es", phone: "+34 623 456 789", district: "Chamartín", dob: "22/07/1972", gender: "M", status: "Verified", docs: 12, lastUpdate: "1 week ago" },
  { id: "CIT-230387", name: "María Fernández Gil", email: "maria.fg@mail.es", phone: "+34 634 567 890", district: "Centro", dob: "08/11/1996", gender: "F", status: "Verified", docs: 6, lastUpdate: "5 days ago" },
  { id: "CIT-230412", name: "Luis Sánchez Moreno", email: "luis.sm@mail.es", phone: "+34 645 678 901", district: "Retiro", dob: "19/04/1957", gender: "M", status: "Unverified", docs: 3, lastUpdate: "3 months ago" },
  { id: "CIT-230531", name: "Patricia Jiménez Vega", email: "patricia.jv@mail.es", phone: "+34 656 789 012", district: "Chamberí", dob: "30/09/1983", gender: "F", status: "Verified", docs: 10, lastUpdate: "3 days ago" },
  { id: "CIT-230608", name: "David López Castillo", email: "david.lc@mail.es", phone: "+34 667 890 123", district: "Arganzuela", dob: "14/06/2001", gender: "M", status: "Pending", docs: 2, lastUpdate: "Today" },
  { id: "CIT-230774", name: "Sofía Romero Blanco", email: "sofia.rb@mail.es", phone: "+34 678 901 234", district: "Tetuán", dob: "03/12/1969", gender: "F", status: "Verified", docs: 9, lastUpdate: "1 week ago" },
  { id: "CIT-230821", name: "Miguel Torres Muñoz", email: "miguel.tm@mail.es", phone: "+34 689 012 345", district: "Latina", dob: "27/01/1986", gender: "M", status: "Verified", docs: 7, lastUpdate: "4 days ago" },
  { id: "CIT-230956", name: "Laura Pérez Serrano", email: "laura.ps@mail.es", phone: "+34 690 123 456", district: "Usera", dob: "11/08/1994", gender: "F", status: "Verified", docs: 5, lastUpdate: "6 days ago" },
  { id: "CIT-231034", name: "Javier Álvarez Díaz", email: "javier.ad@mail.es", phone: "+34 601 234 567", district: "Carabanchel", dob: "05/05/1979", gender: "M", status: "Unverified", docs: 4, lastUpdate: "2 months ago" },
  { id: "CIT-231102", name: "Elena Gutiérrez Molina", email: "elena.gm@mail.es", phone: "+34 612 345 000", district: "Moncloa-Aravaca", dob: "20/02/1962", gender: "F", status: "Verified", docs: 11, lastUpdate: "2 weeks ago" },
  { id: "CIT-231247", name: "Pablo Castro Navarro", email: "pablo.cn@mail.es", phone: "+34 623 456 111", district: "Fuencarral-El Pardo", dob: "16/10/2005", gender: "M", status: "Pending", docs: 1, lastUpdate: "Today" },
];

const TABS = ["all", "verified", "pending", "unverified"];

const STATUS_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
  Verified: { bg: "rgba(5,150,105,0.1)", text: "#059669", dot: "#059669" },
  Pending: { bg: "rgba(245,158,11,0.1)", text: "#ca8a04", dot: "#f59e0b" },
  Unverified: { bg: "rgba(220,38,38,0.1)", text: "#dc2626", dot: "#dc2626" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CitizenCollectionPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<"name" | "district" | "dob" | "docs">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    return CITIZENS_TABLE
      .filter((c) => {
        const matchTab = activeTab === "All" || c.status === activeTab;
        const matchSearch =
          search === "" ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.id.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.district.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortField === "docs") return (a.docs - b.docs) * dir;
        return a[sortField].localeCompare(b[sortField]) * dir;
      });
  }, [search, activeTab, sortField, sortDir]);

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : (
      <ChevronDown size={12} style={{ opacity: 0.3 }} />
    );

  return (
    <div className="page-content" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(29,78,216,0.3)",
              }}
            >
              <Users size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {t("citizen_collection")}
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px" }}>
            {t("view_demographics")}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "9px 16px", borderRadius: "9px",
              background: "#fff", border: "1px solid #e2e8f0",
              color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}
          >
            <RefreshCw size={14} /> {t("sync_data")}
          </button>
          <button
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "9px 16px", borderRadius: "9px",
              background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
              border: "none", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(29,78,216,0.3)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <UserPlus size={14} /> {t("add_citizen")}
          </button>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {KPI_CARDS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.id} className="glass-card" style={{ padding: "22px 24px", cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: k.bg, border: `1px solid ${k.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon size={20} style={{ color: k.color }} />
                </div>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    fontSize: "12px", fontWeight: 600,
                    color: k.up ? "#059669" : "#dc2626",
                    background: k.up ? "rgba(5,150,105,0.08)" : "rgba(220,38,38,0.08)",
                    border: `1px solid ${k.up ? "rgba(5,150,105,0.15)" : "rgba(220,38,38,0.15)"}`,
                    padding: "3px 8px", borderRadius: "100px",
                  }}
                >
                  {k.up ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                  {k.change}
                </div>
              </div>
              <p style={{ fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {k.value}
              </p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginTop: "4px" }}>
                {t(k.id === "total" ? "total_records" : k.id === "verified" ? "verified_citizens" : k.id === "new" ? "new_registrations" : "pending_review")}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t(k.id === "total" ? "census_registered" : k.id === "verified" ? "fully_verified" : k.id === "new" ? "good_morning" : "under_review")}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Charts Row ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 320px",
          gap: "16px",
          marginBottom: "24px",
        }}
        className="charts-row"
      >
        {/* Data Collection Progress */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("data_collection_progress")}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t("performance")}
              </p>
            </div>
            <ArrowUpRight size={16} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {COLLECTION_PROGRESS.map((cp) => {
              const Icon = cp.icon;
              return (
                <div key={cp.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon size={13} style={{ color: cp.color }} />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {cp.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px", fontWeight: 700, color: cp.color,
                        background: `${cp.color}12`, padding: "2px 7px",
                        borderRadius: "100px", minWidth: "36px", textAlign: "center",
                      }}
                    >
                      {cp.pct}%
                    </span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "100px", background: "rgba(226,232,240,0.6)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${cp.pct}%`,
                        borderRadius: "100px",
                        background: cp.color,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Collection Rate */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("district_collection_rate")}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t("performance")}
              </p>
            </div>
            <MapPin size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "300px" }}>
            {DISTRICT_COLLECTION.map((d, i) => (
              <div
                key={d.name}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "8px 10px", borderRadius: "8px",
                  transition: "background 0.2s", cursor: "default",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", width: "18px" }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                      {d.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {d.pct}%
                    </span>
                  </div>
                  <div style={{ height: "4px", borderRadius: "100px", background: "rgba(226,232,240,0.6)" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${d.pct}%`,
                        borderRadius: "100px",
                        background: d.pct > 97 ? "#059669" : d.pct > 94 ? "#1d4ed8" : "#f59e0b",
                      }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: d.trend === "up" ? "#059669" : "#dc2626", display: "flex", alignItems: "center" }}>
                  {d.trend === "up" ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Status Donut */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              {t("verification_status")}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {t("performance")}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                {(() => {
                  let offset = 0;
                  return VERIFICATION_STATUS.map((v) => {
                    const circ = 2 * Math.PI * 60;
                    const dash = circ * v.pct;
                    const el = (
                      <circle
                        key={v.label}
                        cx="80" cy="80" r="60"
                        fill="none"
                        stroke={v.color}
                        strokeWidth="22"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeDashoffset={`-${offset}`}
                        strokeLinecap="round"
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
              </svg>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>87.4%</p>
                <p style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>{t("verified")}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {VERIFICATION_STATUS.map((v) => (
              <div key={v.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: v.color }} />
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{t(v.label === "Fully Verified" ? "fully_verified" : v.label === "Partially Verified" ? "partially_verified" : v.label === "Unverified" ? "unverified" : "under_review")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{v.count}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: v.color }}>{Math.round(v.pct * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Citizens Table ────────────────────────────────────────────────── */}
      <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
        {/* Table Toolbar */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(226,232,240,0.7)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              {t("citizen_records")}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {t("recent_actions")} • {mounted ? filtered.length.toLocaleString(language === "en" ? "en-US" : "es-ES") : "---"} {t("records_found")}
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "8px 12px 8px 34px", border: "1px solid #e2e8f0", borderRadius: "8px",
                  fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none",
                  width: "260px", transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <button
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "8px",
                border: "1px solid #e2e8f0", background: "#fff",
                color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}
            >
              <Filter size={13} /> {t("filter")}
            </button>
            <button
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "8px",
                border: "1px solid #e2e8f0", background: "#fff",
                color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}
            >
              <Download size={13} /> {t("export")}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 24px", borderBottom: "1px solid rgba(226,232,240,0.7)", gap: "4px" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                background: "none", border: "none",
                borderBottom: `2px solid ${activeTab === tab ? "#1d4ed8" : "transparent"}`,
                color: activeTab === tab ? "#1d4ed8" : "var(--text-muted)",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {t(tab.toLowerCase())}
              <span
                style={{
                  marginLeft: "6px", fontSize: "11px", fontWeight: 700,
                  background: activeTab === tab ? "rgba(29,78,216,0.1)" : "rgba(148,163,184,0.12)",
                  color: activeTab === tab ? "#1d4ed8" : "var(--text-muted)",
                  padding: "1px 7px", borderRadius: "100px",
                }}
              >
                {tab === "all" ? CITIZENS_TABLE.length : CITIZENS_TABLE.filter((c) => c.status.toLowerCase() === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {([
                  { key: "id", label: "ID", sortable: false },
                  { key: "name", label: t("citizen"), sortable: true },
                  { key: "district", label: t("district"), sortable: true },
                  { key: "dob", label: t("dob"), sortable: true },
                  { key: "contact", label: t("contact"), sortable: false },
                  { key: "docs", label: t("documents"), sortable: true },
                  { key: "status", label: t("status"), sortable: false },
                  { key: "lastUpdate", label: t("last_updated"), sortable: false },
                  { key: "actions", label: "", sortable: false },
                ] as { key: string; label: string; sortable: boolean }[]).map((col) => (
                  <th
                    key={col.key}
                    onClick={col.sortable ? () => handleSort(col.key as typeof sortField) : undefined}
                    style={{
                      padding: "11px 14px", textAlign: "left",
                      fontSize: "11px", fontWeight: 700, color: "var(--text-muted)",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      cursor: col.sortable ? "pointer" : "default",
                      userSelect: "none", whiteSpace: "nowrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {col.label}
                      {col.sortable && <SortIcon field={col.key as typeof sortField} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: "48px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
                    No citizen records found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c.id}
                    style={{ borderTop: "1px solid rgba(226,232,240,0.5)", transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 14px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", background: "rgba(29,78,216,0.06)", padding: "3px 7px", borderRadius: "5px", fontFamily: "monospace" }}>
                        {c.id}
                      </span>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px", height: "34px", borderRadius: "10px",
                            background: `hsl(${(c.name.charCodeAt(0) * 7) % 360}, 60%, 90%)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "13px", fontWeight: 700,
                            color: `hsl(${(c.name.charCodeAt(0) * 7) % 360}, 60%, 35%)`,
                          }}
                        >
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>
                            {c.name}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                            {c.gender === "M" ? "Male" : "Female"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                        <MapPin size={11} style={{ color: "var(--text-muted)" }} />
                        {c.district}
                      </span>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                        <CalendarDays size={11} style={{ color: "var(--text-muted)" }} />
                        {c.dob}
                      </span>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span
                          title={c.email}
                          style={{
                            width: "26px", height: "26px", borderRadius: "6px",
                            background: "rgba(29,78,216,0.06)", display: "flex",
                            alignItems: "center", justifyContent: "center", cursor: "pointer",
                          }}
                        >
                          <Mail size={12} style={{ color: "#1d4ed8" }} />
                        </span>
                        <span
                          title={c.phone}
                          style={{
                            width: "26px", height: "26px", borderRadius: "6px",
                            background: "rgba(5,150,105,0.06)", display: "flex",
                            alignItems: "center", justifyContent: "center", cursor: "pointer",
                          }}
                        >
                          <Phone size={12} style={{ color: "#059669" }} />
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <FileText size={12} style={{ color: "var(--text-muted)" }} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                          {c.docs}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>files</span>
                      </div>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "5px",
                          fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px",
                          background: STATUS_COLOR[c.status].bg,
                          color: STATUS_COLOR[c.status].text,
                        }}
                      >
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: STATUS_COLOR[c.status].dot, display: "inline-block" }} />
                        {c.status}
                      </span>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.lastUpdate}</span>
                    </td>

                    <td style={{ padding: "13px 14px" }}>
                      <button
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "var(--text-muted)", padding: "4px", borderRadius: "6px",
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid rgba(226,232,240,0.7)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#fafbfc",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Showing <strong style={{ color: "var(--text-secondary)" }}>{filtered.length}</strong> of{" "}
            <strong style={{ color: "var(--text-secondary)" }}>{CITIZENS_TABLE.length}</strong> records
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            {["← Prev", "1", "2", "3", "Next →"].map((p, i) => (
              <button
                key={p}
                style={{
                  padding: "5px 10px", borderRadius: "6px",
                  border: i === 1 ? "1px solid #1d4ed8" : "1px solid #e2e8f0",
                  background: i === 1 ? "rgba(29,78,216,0.08)" : "#fff",
                  color: i === 1 ? "#1d4ed8" : "var(--text-secondary)",
                  fontSize: "12px", fontWeight: i === 1 ? 700 : 500, cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
