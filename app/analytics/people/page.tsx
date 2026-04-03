"use client";

import { useState, useMemo } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
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
  Baby,
  PersonStanding,
  GraduationCap,
  Briefcase,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    id: "total",
    label: "Total Citizens",
    value: "3,305,408",
    change: "+1.2%",
    up: true,
    sub: "vs last year",
    icon: Users,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.15)",
  },
  {
    id: "registered",
    label: "Registered Users",
    value: "2,891,204",
    change: "+3.4%",
    up: true,
    sub: "vs last month",
    icon: UserCheck,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
  },
  {
    id: "new",
    label: "New This Month",
    value: "12,847",
    change: "+8.1%",
    up: true,
    sub: "vs previous month",
    icon: UserPlus,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
  },
  {
    id: "districts",
    label: "Districts Covered",
    value: "21 / 21",
    change: "100%",
    up: true,
    sub: "full coverage",
    icon: MapPin,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.15)",
  },
];

const AGE_GROUPS = [
  { label: "0–14", count: 462757, pct: 14, color: "#3b82f6", icon: Baby },
  { label: "15–24", count: 363595, pct: 11, color: "#8b5cf6", icon: GraduationCap },
  { label: "25–44", count: 991622, pct: 30, color: "#1d4ed8", icon: Briefcase },
  { label: "45–64", count: 826352, pct: 25, color: "#0891b2", icon: PersonStanding },
  { label: "65+", count: 661082, pct: 20, color: "#7c3aed", icon: Users },
];

const DISTRICTS = [
  { name: "Centro", pop: 143130, pct: 78, trend: "up" },
  { name: "Arganzuela", pop: 155419, pct: 92, trend: "up" },
  { name: "Retiro", pop: 120067, pct: 65, trend: "down" },
  { name: "Salamanca", pop: 147683, pct: 84, trend: "up" },
  { name: "Chamartín", pop: 147943, pct: 88, trend: "up" },
  { name: "Tetuán", pop: 157171, pct: 71, trend: "down" },
  { name: "Chamberí", pop: 139080, pct: 90, trend: "up" },
  { name: "Fuencarral-El Pardo", pop: 247388, pct: 56, trend: "up" },
  { name: "Moncloa-Aravaca", pop: 118869, pct: 83, trend: "up" },
  { name: "Latina", pop: 239265, pct: 62, trend: "down" },
  { name: "Carabanchel", pop: 255258, pct: 59, trend: "up" },
  { name: "Usera", pop: 139643, pct: 74, trend: "up" },
];

const CITIZENS_TABLE = [
  { id: "C-00142", name: "Ana García López", district: "Salamanca", age: 34, status: "Active", registered: "12 Jan 2024" },
  { id: "C-00219", name: "Carlos Martínez Ruiz", district: "Chamartín", age: 52, status: "Active", registered: "5 Mar 2023" },
  { id: "C-00387", name: "María Fernández Gil", district: "Centro", age: 28, status: "Active", registered: "19 Sep 2024" },
  { id: "C-00412", name: "Luis Sánchez Moreno", district: "Retiro", age: 67, status: "Inactive", registered: "2 Jun 2022" },
  { id: "C-00531", name: "Patricia Jiménez Vega", district: "Chamberí", age: 41, status: "Active", registered: "28 Nov 2023" },
  { id: "C-00608", name: "David López Castillo", district: "Arganzuela", age: 23, status: "Pending", registered: "1 Feb 2025" },
  { id: "C-00774", name: "Sofía Romero Blanco", district: "Tetuán", age: 55, status: "Active", registered: "17 Apr 2023" },
  { id: "C-00821", name: "Miguel Torres Muñoz", district: "Latina", age: 38, status: "Active", registered: "8 Jul 2024" },
  { id: "C-00956", name: "Laura Pérez Serrano", district: "Usera", age: 30, status: "Active", registered: "22 Oct 2024" },
  { id: "C-01034", name: "Javier Álvarez Díaz", district: "Carabanchel", age: 45, status: "Inactive", registered: "3 Jan 2023" },
  { id: "C-01102", name: "Elena Gutiérrez Molina", district: "Moncloa-Aravaca", age: 62, status: "Active", registered: "14 May 2022" },
  { id: "C-01247", name: "Pablo Castro Navarro", district: "Fuencarral-El Pardo", age: 19, status: "Pending", registered: "10 Mar 2025" },
];

const TABS = ["All", "Active", "Inactive", "Pending"];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Active: { bg: "rgba(5,150,105,0.1)", text: "#059669" },
  Inactive: { bg: "rgba(148,163,184,0.1)", text: "#64748b" },
  Pending: { bg: "rgba(234,179,8,0.1)", text: "#ca8a04" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function CitizensPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortField, setSortField] = useState<"name" | "age" | "district" | "registered">("name");
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
          c.district.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortField === "age") return (a.age - b.age) * dir;
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
              <Users size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Citizen Collection
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px" }}>
            Manage and monitor all registered citizens across Madrid's 21 districts
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
            <Download size={14} /> Export CSV
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
        {/* Age Distribution */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                Age Distribution
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Citizen breakdown by age group
              </p>
            </div>
            <ArrowUpRight size={16} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {AGE_GROUPS.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon size={13} style={{ color: g.color }} />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {g.label} years
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                        {g.count.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "11px", fontWeight: 700, color: g.color,
                          background: `${g.color}12`, padding: "2px 7px",
                          borderRadius: "100px", minWidth: "36px", textAlign: "center",
                        }}
                      >
                        {g.pct}%
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
                        width: `${g.pct}%`,
                        borderRadius: "100px",
                        background: g.color,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Population */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                District Population
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Top 12 of 21 districts by population
              </p>
            </div>
            <Building2 size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "300px" }}>
            {DISTRICTS.map((d, i) => (
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
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", truncate: true }}>
                      {d.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {d.pop.toLocaleString()}
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
                  {d.trend === "up" ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Split Donut */}
        <div className="glass-card" style={{ padding: "24px", gridColumn: "3" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              Gender Split
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Population by gender
            </p>
          </div>

          {/* CSS Donut Chart */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                {/* Female 52% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.52} ${2 * Math.PI * 60}`}
                  strokeLinecap="round"
                />
                {/* Male 46% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.46} ${2 * Math.PI * 60}`}
                  strokeDashoffset={`-${2 * Math.PI * 60 * 0.52}`}
                  strokeLinecap="round"
                />
                {/* Other 2% */}
                <circle
                  cx="80" cy="80" r="60"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="22"
                  strokeDasharray={`${2 * Math.PI * 60 * 0.02} ${2 * Math.PI * 60}`}
                  strokeDashoffset={`-${2 * Math.PI * 60 * 0.98}`}
                  strokeLinecap="round"
                />
              </svg>
              {/* Centre label */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>3.3M</p>
                <p style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>Total</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Female", pct: "52%", color: "#7c3aed", count: "1,718,812" },
              { label: "Male", pct: "46%", color: "#1d4ed8", count: "1,520,488" },
              { label: "Other", pct: "2%", color: "#22d3ee", count: "66,108" },
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

      {/* ── Citizens Table ────────────────────────────────────────────────── */}
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
              Citizen Records
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
                placeholder="Search by name, ID or district…"
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
                  ? CITIZENS_TABLE.length
                  : CITIZENS_TABLE.filter((c) => c.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {(
                  [
                    { key: "id", label: "ID", sortable: false },
                    { key: "name", label: "Name", sortable: true },
                    { key: "district", label: "District", sortable: true },
                    { key: "age", label: "Age", sortable: true },
                    { key: "status", label: "Status", sortable: false },
                    { key: "registered", label: "Registered", sortable: true },
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
                    colSpan={7}
                    style={{
                      padding: "48px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "14px",
                    }}
                  >
                    No citizens found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
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
                        {c.id}
                      </span>
                    </td>

                    {/* Name */}
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            background: `hsl(${(c.name.charCodeAt(0) * 7) % 360}, 60%, 90%)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "12px", fontWeight: 700,
                            color: `hsl(${(c.name.charCodeAt(0) * 7) % 360}, 60%, 35%)`,
                          }}
                        >
                          {c.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                          {c.name}
                        </span>
                      </div>
                    </td>

                    {/* District */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                        <MapPin size={11} style={{ color: "var(--text-muted)" }} />
                        {c.district}
                      </span>
                    </td>

                    {/* Age */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {c.age}
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
                          background: STATUS_COLOR[c.status].bg,
                          color: STATUS_COLOR[c.status].text,
                        }}
                      >
                        <span
                          style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: STATUS_COLOR[c.status].text,
                            display: "inline-block",
                          }}
                        />
                        {c.status}
                      </span>
                    </td>

                    {/* Registered */}
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                        {c.registered}
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
            <strong style={{ color: "var(--text-secondary)" }}>{CITIZENS_TABLE.length}</strong> records
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