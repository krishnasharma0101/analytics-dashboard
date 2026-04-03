"use client";

import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Store,
  Euro,
  FileBadge,
  MapPin,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Download,
  RefreshCw,
  MoreHorizontal,
  Building2,
  ShoppingBag,
  Utensils,
  Laptop,
  Paintbrush,
  Wrench,
  HeartPulse,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    id: "total",
    label: "Total Businesses",
    value: "48,392",
    change: "+4.7%",
    up: true,
    sub: "vs last year",
    icon: Store,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.15)",
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "€2.4B",
    change: "+6.2%",
    up: true,
    sub: "annual estimate",
    icon: Euro,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
  },
  {
    id: "licenses",
    label: "Active Licenses",
    value: "41,208",
    change: "+2.1%",
    up: true,
    sub: "currently valid",
    icon: FileBadge,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
  },
  {
    id: "new",
    label: "New Registrations",
    value: "2,847",
    change: "-1.3%",
    up: false,
    sub: "this quarter",
    icon: TrendingUp,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.15)",
  },
];

const SECTORS = [
  { label: "Retail & Commerce", count: 12490, pct: 26, color: "#3b82f6", icon: ShoppingBag },
  { label: "Food & Hospitality", count: 10844, pct: 22, color: "#f59e0b", icon: Utensils },
  { label: "Technology & Digital", count: 7742, pct: 16, color: "#8b5cf6", icon: Laptop },
  { label: "Professional Services", count: 6791, pct: 14, color: "#1d4ed8", icon: Paintbrush },
  { label: "Construction & Trade", count: 5807, pct: 12, color: "#0891b2", icon: Wrench },
  { label: "Healthcare & Wellness", count: 4718, pct: 10, color: "#059669", icon: HeartPulse },
];

const DISTRICT_REVENUE = [
  { name: "Centro", revenue: 412, pct: 95, trend: "up" },
  { name: "Salamanca", revenue: 387, pct: 89, trend: "up" },
  { name: "Chamartín", revenue: 341, pct: 79, trend: "up" },
  { name: "Chamberí", revenue: 298, pct: 69, trend: "up" },
  { name: "Arganzuela", revenue: 267, pct: 62, trend: "down" },
  { name: "Retiro", revenue: 243, pct: 56, trend: "up" },
  { name: "Tetuán", revenue: 221, pct: 51, trend: "down" },
  { name: "Moncloa-Aravaca", revenue: 198, pct: 46, trend: "up" },
  { name: "Fuencarral-El Pardo", revenue: 176, pct: 41, trend: "up" },
  { name: "Latina", revenue: 154, pct: 36, trend: "down" },
  { name: "Carabanchel", revenue: 132, pct: 31, trend: "down" },
  { name: "Usera", revenue: 118, pct: 27, trend: "up" },
];

const BUSINESSES_TABLE = [
  { id: "B-10042", name: "Café Sol Madrid", sector: "Food & Hospitality", district: "Centro", revenue: "€284K", employees: 12, status: "Active", license: "15 Jan 2024" },
  { id: "B-10187", name: "TechHub Ibérica S.L.", sector: "Technology & Digital", district: "Chamartín", revenue: "€1.2M", employees: 45, status: "Active", license: "8 Mar 2023" },
  { id: "B-10334", name: "Farmacia Goya", sector: "Healthcare & Wellness", district: "Salamanca", revenue: "€520K", employees: 8, status: "Active", license: "22 Jun 2022" },
  { id: "B-10471", name: "Modas Castilla", sector: "Retail & Commerce", district: "Chamberí", revenue: "€198K", employees: 6, status: "Active", license: "3 Sep 2024" },
  { id: "B-10598", name: "Construmad Obras", sector: "Construction & Trade", district: "Arganzuela", revenue: "€890K", employees: 32, status: "Active", license: "17 Apr 2023" },
  { id: "B-10723", name: "Estudio Creativo Luna", sector: "Professional Services", district: "Retiro", revenue: "€145K", employees: 4, status: "Pending", license: "28 Feb 2025" },
  { id: "B-10891", name: "Restaurante El Rincón", sector: "Food & Hospitality", district: "Latina", revenue: "€410K", employees: 18, status: "Active", license: "11 Nov 2023" },
  { id: "B-11024", name: "DataVista Analytics", sector: "Technology & Digital", district: "Moncloa-Aravaca", revenue: "€2.1M", employees: 67, status: "Active", license: "5 Jul 2024" },
  { id: "B-11167", name: "Supermercados Luna", sector: "Retail & Commerce", district: "Carabanchel", revenue: "€780K", employees: 24, status: "Active", license: "20 Jan 2023" },
  { id: "B-11302", name: "Clínica Dental Sonrisa", sector: "Healthcare & Wellness", district: "Tetuán", revenue: "€340K", employees: 11, status: "Suspended", license: "14 Aug 2022" },
  { id: "B-11448", name: "Fontanería Rápida", sector: "Construction & Trade", district: "Usera", revenue: "€95K", employees: 3, status: "Active", license: "6 May 2024" },
  { id: "B-11573", name: "Abogados Martín & Co.", sector: "Professional Services", district: "Fuencarral-El Pardo", revenue: "€560K", employees: 14, status: "Pending", license: "1 Mar 2025" },
];

const TABS = ["All", "Active", "Pending", "Suspended"];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Active: { bg: "rgba(5,150,105,0.1)", text: "#059669" },
  Pending: { bg: "rgba(234,179,8,0.1)", text: "#ca8a04" },
  Suspended: { bg: "rgba(220,38,38,0.1)", text: "#dc2626" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function BusinessAnalyticsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortField, setSortField] = useState<"name" | "sector" | "district" | "employees">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    return BUSINESSES_TABLE
      .filter((b) => {
        const matchTab = activeTab === "All" || b.status === activeTab;
        const matchSearch =
          search === "" ||
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.id.toLowerCase().includes(search.toLowerCase()) ||
          b.sector.toLowerCase().includes(search.toLowerCase()) ||
          b.district.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortField === "employees") return (a.employees - b.employees) * dir;
        return a[sortField].localeCompare(b[sortField]) * dir;
      });
  }, [search, activeTab, sortField, sortDir]);

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )
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
              <BarChart3 size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Business Analytics
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px" }}>
            Track commercial activity, licensing, and economic performance across all districts
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
            <RefreshCw size={14} /> Refresh
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
            <Download size={14} /> Export Report
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
            <div
              key={k.id}
              className="glass-card"
              style={{ padding: "22px 24px", cursor: "default" }}
            >
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
                {k.label}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                {k.sub}
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
        {/* Sector Breakdown */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                Sector Breakdown
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Businesses by industry sector
              </p>
            </div>
            <ArrowUpRight size={16} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {SECTORS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon size={13} style={{ color: s.color }} />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {s.label}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                        {s.count.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "11px", fontWeight: 700, color: s.color,
                          background: `${s.color}12`, padding: "2px 7px",
                          borderRadius: "100px", minWidth: "36px", textAlign: "center",
                        }}
                      >
                        {s.pct}%
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "8px", borderRadius: "100px",
                      background: "rgba(226,232,240,0.6)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${s.pct}%`,
                        borderRadius: "100px",
                        background: s.color,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue by District */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                Revenue by District
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Top 12 districts by annual revenue (€M)
              </p>
            </div>
            <Building2 size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "300px" }}>
            {DISTRICT_REVENUE.map((d, i) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                  cursor: "default",
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
                      €{d.revenue}M
                    </span>
                  </div>
                  <div style={{ height: "4px", borderRadius: "100px", background: "rgba(226,232,240,0.6)" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${d.pct}%`,
                        borderRadius: "100px",
                        background: d.pct > 80 ? "#1d4ed8" : d.pct > 60 ? "#7c3aed" : "#0891b2",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: d.trend === "up" ? "#059669" : "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  {d.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Size Donut */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "3" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              Business Size
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              By employee count
            </p>
          </div>

          {/* SVG Donut Chart */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                {/* Micro (1-5) 42% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.42} ${2 * Math.PI * 60}`}
                  strokeLinecap="round"
                />
                {/* Small (6-25) 31% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.31} ${2 * Math.PI * 60}`}
                  strokeDashoffset={`-${2 * Math.PI * 60 * 0.42}`}
                  strokeLinecap="round"
                />
                {/* Medium (26-100) 18% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.18} ${2 * Math.PI * 60}`}
                  strokeDashoffset={`-${2 * Math.PI * 60 * 0.73}`}
                  strokeLinecap="round"
                />
                {/* Large (100+) 9% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.09} ${2 * Math.PI * 60}`}
                  strokeDashoffset={`-${2 * Math.PI * 60 * 0.91}`}
                  strokeLinecap="round"
                />
              </svg>
              {/* Centre label */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>48.4K</p>
                <p style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>Total</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Micro (1–5)", pct: "42%", color: "#3b82f6", count: "20,325" },
              { label: "Small (6–25)", pct: "31%", color: "#7c3aed", count: "15,002" },
              { label: "Medium (26–100)", pct: "18%", color: "#0891b2", count: "8,711" },
              { label: "Large (100+)", pct: "9%", color: "#f59e0b", count: "4,354" },
            ].map((g) => (
              <div key={g.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: g.color }} />
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{g.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{g.count}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: g.color }}>{g.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Business Table ─────────────────────────────────────────────────── */}
      <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
        {/* Table Toolbar */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(226,232,240,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              Business Directory
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute", left: "12px", top: "50%",
                  transform: "translateY(-50%)", color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search by name, ID, sector…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "8px 12px 8px 34px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  background: "#fff",
                  outline: "none",
                  width: "240px",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* Filter icon */}
            <button
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "8px",
                border: "1px solid #e2e8f0", background: "#fff",
                color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}
            >
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            borderBottom: "1px solid rgba(226,232,240,0.7)",
            gap: "4px",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab ? "#1d4ed8" : "transparent"}`,
                color: activeTab === tab ? "#1d4ed8" : "var(--text-muted)",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {tab}
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: activeTab === tab ? "rgba(29,78,216,0.1)" : "rgba(148,163,184,0.12)",
                  color: activeTab === tab ? "#1d4ed8" : "var(--text-muted)",
                  padding: "1px 7px",
                  borderRadius: "100px",
                }}
              >
                {tab === "All"
                  ? BUSINESSES_TABLE.length
                  : BUSINESSES_TABLE.filter((b) => b.status === tab).length}
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
                  { key: "name", label: "Business Name", sortable: true },
                  { key: "sector", label: "Sector", sortable: true },
                  { key: "district", label: "District", sortable: true },
                  { key: "revenue", label: "Revenue", sortable: false },
                  { key: "employees", label: "Employees", sortable: true },
                  { key: "status", label: "Status", sortable: false },
                  { key: "actions", label: "", sortable: false },
                ] as { key: string; label: string; sortable: boolean }[]
                ).map((col) => (
                  <th
                    key={col.key}
                    onClick={
                      col.sortable
                        ? () => handleSort(col.key as typeof sortField)
                        : undefined
                    }
                    style={{
                      padding: "11px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: col.sortable ? "pointer" : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
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
                  <td
                    colSpan={8}
                    style={{
                      padding: "48px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "14px",
                    }}
                  >
                    No businesses found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr
                    key={b.id}
                    style={{
                      borderTop: "1px solid rgba(226,232,240,0.5)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#f8fafc")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    {/* ID */}
                    <td style={{ padding: "13px 16px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#1d4ed8",
                          background: "rgba(29,78,216,0.06)",
                          padding: "3px 8px",
                          borderRadius: "5px",
                          fontFamily: "monospace",
                        }}
                      >
                        {b.id}
                      </span>
                    </td>

                    {/* Name */}
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            background: `hsl(${(b.name.charCodeAt(0) * 7) % 360}, 60%, 90%)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "12px", fontWeight: 700,
                            color: `hsl(${(b.name.charCodeAt(0) * 7) % 360}, 60%, 35%)`,
                          }}
                        >
                          {b.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                          {b.name}
                        </span>
                      </div>
                    </td>

                    {/* Sector */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        {b.sector}
                      </span>
                    </td>

                    {/* District */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                        <MapPin size={11} style={{ color: "var(--text-muted)" }} />
                        {b.district}
                      </span>
                    </td>

                    {/* Revenue */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>
                        {b.revenue}
                      </span>
                    </td>

                    {/* Employees */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {b.employees}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "13px 16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "100px",
                          background: STATUS_COLOR[b.status].bg,
                          color: STATUS_COLOR[b.status].text,
                        }}
                      >
                        <span
                          style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: STATUS_COLOR[b.status].text,
                            display: "inline-block",
                          }}
                        />
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "13px 16px" }}>
                      <button
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "var(--text-muted)", padding: "4px", borderRadius: "6px",
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#f1f5f9";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "none";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                        }}
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fafbfc",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Showing <strong style={{ color: "var(--text-secondary)" }}>{filtered.length}</strong> of{" "}
            <strong style={{ color: "var(--text-secondary)" }}>{BUSINESSES_TABLE.length}</strong> records
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            {["← Prev", "1", "2", "3", "Next →"].map((p, i) => (
              <button
                key={p}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: i === 1 ? "1px solid #1d4ed8" : "1px solid #e2e8f0",
                  background: i === 1 ? "rgba(29,78,216,0.08)" : "#fff",
                  color: i === 1 ? "#1d4ed8" : "var(--text-secondary)",
                  fontSize: "12px",
                  fontWeight: i === 1 ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
