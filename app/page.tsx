"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
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

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    id: "citizens",
    label: "Total Citizens",
    value: "156,112",
    change: "+1.2%",
    up: true,
    sub: "census registered",
    icon: Users,
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.15)",
    href: "/analytics/people",
  },
  {
    id: "businesses",
    label: "Active Businesses",
    value: "5,089",
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
    value: "€540M",
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
    id: "tourists",
    label: "Annual Tourists",
    value: "3.41M",
    change: "+10.5%",
    up: true,
    sub: "by air & cruise",
    icon: FileBadge,
    color: "#ea580c",
    bg: "rgba(234,88,12,0.08)",
    border: "rgba(234,88,12,0.15)",
    href: "/analytics/business",
  },
];

// Monthly trend data (last 12 months)
const MONTHLY_TREND = [
  { month: "Apr", citizens: 154, businesses: 4800, revenue: 38 },
  { month: "May", citizens: 154, businesses: 4850, revenue: 42 },
  { month: "Jun", citizens: 155, businesses: 4880, revenue: 48 },
  { month: "Jul", citizens: 155, businesses: 4920, revenue: 52 },
  { month: "Aug", citizens: 155, businesses: 4890, revenue: 55 },
  { month: "Sep", citizens: 155, businesses: 4950, revenue: 45 },
  { month: "Oct", citizens: 156, businesses: 5010, revenue: 48 },
  { month: "Nov", citizens: 156, businesses: 5040, revenue: 42 },
  { month: "Dec", citizens: 156, businesses: 5060, revenue: 58 },
  { month: "Jan", citizens: 156, businesses: 5070, revenue: 50 },
  { month: "Feb", citizens: 156, businesses: 5080, revenue: 48 },
  { month: "Mar", citizens: 156, businesses: 5089, revenue: 62 },
];

const DISTRICT_OVERVIEW = [
  { name: "Arrecife", citizens: 64283, businesses: 1842, satisfaction: 87 },
  { name: "Teguise", citizens: 23145, businesses: 823, satisfaction: 90 },
  { name: "Tías", citizens: 20108, businesses: 790, satisfaction: 88 },
  { name: "San Bartolomé", citizens: 19412, businesses: 610, satisfaction: 84 },
  { name: "Yaiza", citizens: 17244, businesses: 520, satisfaction: 92 },
  { name: "Tinajo", citizens: 6512, businesses: 250, satisfaction: 89 },
  { name: "Haría", citizens: 5408, businesses: 254, satisfaction: 91 },
];

const RECENT_CAMPAIGNS = [
  { id: 1, title: "Water Notice - Timanfaya", type: "announcement", audience: "Citizens — Yaiza, Tinajo", recipients: 23756, sent: "2d ago", status: "delivered" },
  { id: 2, title: "Tourism Sustainability", type: "poll", audience: "Businesses", recipients: 5089, sent: "5d ago", status: "delivered" },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "license", icon: FileBadge, color: "#7c3aed", text: "New winery license approved", entity: "Bodegas La Geria S.L.", district: "Teguise", time: "12 min ago" },
  { id: 2, type: "citizen", icon: UserPlus, color: "#1d4ed8", text: "New citizen registration", entity: "José Ramón Arrecife", district: "Arrecife", time: "34 min ago" },
  { id: 3, type: "alert", icon: AlertTriangle, color: "#f59e0b", text: "Water usage alert", entity: "Timanfaya Sector B", district: "Yaiza", time: "1 hr ago" },
  { id: 4, type: "revenue", icon: Euro, color: "#059669", text: "Port dues received", entity: "Naviera Lanzarote", district: "Arrecife", time: "2 hr ago" },
  { id: 5, type: "complete", icon: CheckCircle2, color: "#059669", text: "Beach safety inspection", entity: "Playa Blanca", district: "Yaiza", time: "3 hr ago" },
  { id: 6, type: "citizen", icon: UserPlus, color: "#1d4ed8", text: "Tourist record added", entity: "Cruise Arrival #42", district: "Arrecife", time: "4 hr ago" },
];

const QUICK_LINKS = [
  { label: "Citizen Records", description: "View demographics & records", icon: Users, href: "/citizens", color: "#1d4ed8", bg: "rgba(29,78,216,0.08)" },
  { label: "Business Analytics", description: "Revenue & sector insights", icon: BarChart3, href: "/analytics/business", color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
  { label: "People Analytics", description: "Population & age data", icon: Activity, href: "/analytics/people", color: "#0891b2", bg: "rgba(8,145,178,0.08)" },
  { label: "AI Intelligence", description: "Ask questions about data", icon: MessageSquare, href: "/ai-chatbot", color: "#059669", bg: "rgba(5,150,105,0.08)" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const now = new Date();
  const greetingKey = now.getHours() < 12 ? "good_morning" : now.getHours() < 18 ? "good_afternoon" : "good_evening";
  const greeting = t(greetingKey);
  const dateStr = mounted ? now.toLocaleDateString(language === "en" ? "en-US" : "es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "---";

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
              {greeting}, {t("admin")}
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
            {t("all_systems_operational")}
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
                {t(k.id === "citizens" ? "total_citizens" : k.id === "businesses" ? "active_businesses" : k.id === "revenue" ? "revenue_trend" : "total_tourists")}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t(k.id === "citizens" ? "census_registered" : k.id === "businesses" ? "registered_entities" : k.id === "revenue" ? "municipal_estimate" : "by_air_cruise")}
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
                {t("revenue_trend")}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t("revenue_description")}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: "#059669" }}>
              <TrendingUp size={14} /> +29.7% YoY
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div style={{ width: "100%", height: "240px", marginTop: "10px" }}>
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MONTHLY_TREND}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(226,232,240,0.5)"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--text-muted)", fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--text-muted)", fontWeight: 500 }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div
                            style={{
                              background: "#fff",
                              padding: "10px 14px",
                              border: "1px solid rgba(226,232,240,0.8)",
                              borderRadius: "10px",
                              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                            }}
                          >
                            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px" }}>
                              {payload[0].payload.month}
                            </p>
                            <p style={{ fontSize: "14px", fontWeight: 800, color: "#1d4ed8" }}>
                              €{payload[0].value}M
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1d4ed8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    animationDuration={1500}
                    dot={{ r: 3, fill: "#fff", stroke: "#1d4ed8", strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: "#1d4ed8", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ width: "100%", height: "100%", background: "rgba(226,232,240,0.2)", borderRadius: "12px" }} />
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("recent_activity")}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t("recent_actions")}
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
                      flexShrink: 0,
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
                {t("top_districts")}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                {t("performance")}
              </p>
            </div>
            <Building2 size={15} style={{ color: "var(--text-muted)" }} />
          </div>

          {/* Mini table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[t("municipalities"), t("residents"), t("active_businesses"), t("satisfaction")].map((label, idx) => (
                    <th
                      key={idx}
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
                      {label}
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
                      {mounted ? d.citizens.toLocaleString(language === "en" ? "en-US" : "es-ES") : "---"}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>
                      {mounted ? d.businesses.toLocaleString(language === "en" ? "en-US" : "es-ES") : "---"}
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
              {t("quick_links")}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {t("ask_questions")}
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
                      {t(link.href === "/citizens" ? "citizen_records" : link.href === "/analytics/business" ? "revenue_insights" : link.href === "/analytics/people" ? "population_data" : "ai_insights")}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                      {t(link.href === "/citizens" ? "view_demographics" : link.href === "/analytics/business" ? "revenue_insights" : link.href === "/analytics/people" ? "population_data" : "ask_questions")}
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
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>{t("ai_powered")}</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "12px" }}>
              {t("get_instant_answers")}
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
              <MessageSquare size={12} /> {t("try_now")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
