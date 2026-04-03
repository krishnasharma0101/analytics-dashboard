"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Store,
  Euro,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Activity,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  FileText,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  Building2,
  FileBadge,
  CalendarDays,
  Zap,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    id: "citizens",
    label: "Total Citizens",
    value: "3,305,408",
    change: "+1.2%",
    up: true,
    sub: "vs last year",
    icon: Users,
    color: "#1d4ed8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.15)",
    href: "/analytics/people",
  },
  {
    id: "businesses",
    label: "Active Businesses",
    value: "48,392",
    change: "+4.7%",
    up: true,
    sub: "registered entities",
    icon: Store,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
    href: "/analytics/business",
  },
  {
    id: "revenue",
    label: "Annual Revenue",
    value: "€2.4B",
    change: "+6.2%",
    up: true,
    sub: "municipal estimate",
    icon: Euro,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
    href: "/analytics/business",
  },
  {
    id: "licenses",
    label: "Active Licenses",
    value: "41,208",
    change: "+2.1%",
    up: true,
    sub: "currently valid",
    icon: FileBadge,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.15)",
    href: "/analytics/business",
  },
];

// Monthly trend data (last 12 months)
const MONTHLY_TREND = [
  { month: "Apr", citizens: 3240, businesses: 44200, revenue: 185 },
  { month: "May", citizens: 3255, businesses: 44800, revenue: 192 },
  { month: "Jun", citizens: 3261, businesses: 45100, revenue: 198 },
  { month: "Jul", citizens: 3268, businesses: 45400, revenue: 188 },
  { month: "Aug", citizens: 3270, businesses: 45200, revenue: 175 },
  { month: "Sep", citizens: 3275, businesses: 45800, revenue: 201 },
  { month: "Oct", citizens: 3280, businesses: 46300, revenue: 210 },
  { month: "Nov", citizens: 3285, businesses: 46700, revenue: 215 },
  { month: "Dec", citizens: 3290, businesses: 47100, revenue: 208 },
  { month: "Jan", citizens: 3295, businesses: 47500, revenue: 220 },
  { month: "Feb", citizens: 3300, businesses: 47900, revenue: 228 },
  { month: "Mar", citizens: 3305, businesses: 48392, revenue: 240 },
];

const DISTRICT_OVERVIEW = [
  { name: "Centro", citizens: 143130, businesses: 8420, satisfaction: 87 },
  { name: "Salamanca", citizens: 147683, businesses: 6230, satisfaction: 92 },
  { name: "Chamartín", citizens: 147943, businesses: 5890, satisfaction: 89 },
  { name: "Arganzuela", citizens: 155419, businesses: 4210, satisfaction: 84 },
  { name: "Chamberí", citizens: 139080, businesses: 5120, satisfaction: 91 },
  { name: "Retiro", citizens: 120067, businesses: 3450, satisfaction: 86 },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "license", icon: FileBadge, color: "#7c3aed", text: "New business license approved", entity: "TechHub Ibérica S.L.", district: "Chamartín", time: "12 min ago" },
  { id: 2, type: "citizen", icon: UserPlus, color: "#1d4ed8", text: "New citizen registration", entity: "María Fernández Gil", district: "Centro", time: "34 min ago" },
  { id: 3, type: "alert", icon: AlertTriangle, color: "#f59e0b", text: "License renewal pending", entity: "Clínica Dental Sonrisa", district: "Tetuán", time: "1 hr ago" },
  { id: 4, type: "revenue", icon: Euro, color: "#059669", text: "Tax payment received", entity: "Supermercados Luna", district: "Carabanchel", time: "2 hr ago" },
  { id: 5, type: "complete", icon: CheckCircle2, color: "#059669", text: "Inspection completed", entity: "Restaurante El Rincón", district: "Latina", time: "3 hr ago" },
  { id: 6, type: "citizen", icon: UserPlus, color: "#1d4ed8", text: "Citizen profile updated", entity: "Carlos Martínez Ruiz", district: "Chamartín", time: "4 hr ago" },
];

const QUICK_LINKS = [
  { label: "Citizen Records", description: "View demographics & records", icon: Users, href: "/citizens", color: "#1d4ed8", bg: "rgba(29,78,216,0.08)" },
  { label: "Business Analytics", description: "Revenue & sector insights", icon: BarChart3, href: "/analytics/business", color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
  { label: "People Analytics", description: "Population & age data", icon: Activity, href: "/analytics/people", color: "#0891b2", bg: "rgba(8,145,178,0.08)" },
  { label: "AI Intelligence", description: "Ask questions about data", icon: MessageSquare, href: "/ai-chatbot", color: "#059669", bg: "rgba(5,150,105,0.08)" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good Morning" : now.getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // Chart dimensions
  const chartW = 100;
  const chartH = 100;
  const maxRevenue = Math.max(...MONTHLY_TREND.map((d) => d.revenue));
  const minRevenue = Math.min(...MONTHLY_TREND.map((d) => d.revenue));
  const revenueRange = maxRevenue - minRevenue || 1;

  const trendPoints = MONTHLY_TREND.map((d, i) => {
    const x = (i / (MONTHLY_TREND.length - 1)) * chartW;
    const y = chartH - ((d.revenue - minRevenue) / revenueRange) * (chartH * 0.8) - chartH * 0.1;
    return `${x},${y}`;
  }).join(" ");

  const areaPath = `M0,${chartH} ` +
    MONTHLY_TREND.map((d, i) => {
      const x = (i / (MONTHLY_TREND.length - 1)) * chartW;
      const y = chartH - ((d.revenue - minRevenue) / revenueRange) * (chartH * 0.8) - chartH * 0.1;
      return `L${x},${y}`;
    }).join(" ") +
    ` L${chartW},${chartH} Z`;

  return (
    <div className="page-content" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>

      {/* ── Welcome Header ─────────────────────────────────────────────── */}
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
              <Zap size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {greeting}, Admin
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CalendarDays size={13} /> {dateStr}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px", borderRadius: "100px",
              background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.15)",
              fontSize: "12px", fontWeight: 600, color: "#059669",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#059669", boxShadow: "0 0 6px rgba(5,150,105,0.5)" }} />
            All Systems Operational
          </div>
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
            <Link
              key={k.id}
              href={k.href}
              className="glass-card"
              style={{ padding: "22px 24px", cursor: "pointer", textDecoration: "none" }}
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
            </Link>
          );
        })}
      </div>

      {/* ── Main Content Grid ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "16px",
          marginBottom: "24px",
        }}
        className="charts-row"
      >
        {/* Revenue Trend Chart */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                Revenue Trend
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Monthly municipal revenue over the past 12 months (€M)
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: "#059669" }}>
              <TrendingUp size={14} /> +29.7% YoY
            </div>
          </div>

          {/* SVG Line Chart */}
          <div style={{ position: "relative", width: "100%", paddingBottom: "35%" }}>
            <svg
              viewBox={`0 0 ${chartW} ${chartH}`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((pct) => (
                <line
                  key={pct}
                  x1="0" y1={chartH * pct} x2={chartW} y2={chartH * pct}
                  stroke="rgba(226,232,240,0.5)" strokeWidth="0.3" strokeDasharray="2,2"
                />
              ))}

              {/* Area fill */}
              <path d={areaPath} fill="url(#revenueGrad)" />

              {/* Line */}
              <polyline
                points={trendPoints}
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {MONTHLY_TREND.map((d, i) => {
                const x = (i / (MONTHLY_TREND.length - 1)) * chartW;
                const y = chartH - ((d.revenue - minRevenue) / revenueRange) * (chartH * 0.8) - chartH * 0.1;
                return (
                  <circle
                    key={i}
                    cx={x} cy={y} r="1.5"
                    fill="#fff"
                    stroke="#1d4ed8"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>

          {/* X-axis labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingLeft: "2px", paddingRight: "2px" }}>
            {MONTHLY_TREND.map((d) => (
              <span key={d.month} style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>
                {d.month}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                Recent Activity
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Latest actions & events
              </p>
            </div>
            <Clock size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {RECENT_ACTIVITY.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "12px",
                    padding: "10px 8px", borderRadius: "10px",
                    transition: "background 0.2s", cursor: "default",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <div
                    style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: `${act.color}12`, border: `1px solid ${act.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      shrink: 0,
                    }}
                  >
                    <Icon size={14} style={{ color: act.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                      {act.text}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {act.entity}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px" }}>
                        <MapPin size={9} /> {act.district}
                      </span>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>•</span>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                        {act.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── District Overview & Quick Links ─────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "16px",
          marginBottom: "24px",
        }}
        className="charts-row"
      >
        {/* Top Districts */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                District Overview
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Key metrics for top 6 districts
              </p>
            </div>
            <Building2 size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          {/* Mini table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["District", "Citizens", "Businesses", "Satisfaction"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(226,232,240,0.7)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISTRICT_OVERVIEW.map((d) => (
                  <tr
                    key={d.name}
                    style={{ transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{d.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>
                      {d.citizens.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>
                      {d.businesses.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, height: "6px", borderRadius: "100px", background: "rgba(226,232,240,0.6)", maxWidth: "80px" }}>
                          <div
                            style={{
                              height: "100%",
                              width: `${d.satisfaction}%`,
                              borderRadius: "100px",
                              background: d.satisfaction > 89 ? "#059669" : d.satisfaction > 84 ? "#1d4ed8" : "#f59e0b",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: d.satisfaction > 89 ? "#059669" : d.satisfaction > 84 ? "#1d4ed8" : "#f59e0b" }}>
                          {d.satisfaction}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
              Quick Access
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Jump to key modules
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px", borderRadius: "12px",
                    border: "1px solid rgba(226,232,240,0.7)",
                    background: "#fff",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                    (e.currentTarget as HTMLElement).style.background = link.bg;
                    (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(226,232,240,0.7)";
                    (e.currentTarget as HTMLElement).style.background = "#fff";
                    (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: "40px", height: "40px", borderRadius: "10px",
                      background: link.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} style={{ color: link.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>
                      {link.label}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                      {link.description}
                    </p>
                  </div>
                  <ArrowUpRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                </Link>
              );
            })}
          </div>

          {/* AI Insight Promo */}
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(29,78,216,0.06) 0%, rgba(124,58,237,0.06) 100%)",
              border: "1px solid rgba(29,78,216,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Sparkles size={14} style={{ color: "#7c3aed" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>AI-Powered Insights</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "12px" }}>
              Get instant answers about city data. Ask about demographics, revenue trends, or district comparisons.
            </p>
            <Link
              href="/ai-chatbot"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "8px",
                background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                color: "#fff", fontSize: "12px", fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(29,78,216,0.3)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <MessageSquare size={12} /> Try it now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
