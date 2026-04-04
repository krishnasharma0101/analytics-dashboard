"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  MessageCircle,
  Users,
  Store,
  Send,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Megaphone,
  Vote,
  Clock,
  Eye,
  Check,
  MapPin,
  Filter,
  Trash2,
  GripVertical,
  Image,
  Paperclip,
  Smile,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Hash,
  UserCheck,
  Building2,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AudienceType = "citizens" | "businesses";
type MessageType = "announcement" | "poll";

interface PollOption {
  id: string;
  text: string;
}

interface AudienceFilter {
  id: string;
  field: string;
  value: string;
}

// ─── Filter Options ───────────────────────────────────────────────────────────

const CITIZEN_FILTERS: Record<string, string[]> = {
  Municipality: ["Arrecife", "Teguise", "Tías", "San Bartolomé", "Yaiza", "Tinajo", "Haría"],
  "Age Group": ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"],
  Gender: ["Male", "Female", "Other"],
  Status: ["Verified", "Pending", "Unverified"],
};

const BUSINESS_FILTERS: Record<string, string[]> = {
  Municipality: ["Arrecife", "Teguise", "Tías", "San Bartolomé", "Yaiza", "Tinajo", "Haría"],
  Sector: ["Tourism & Hospitality", "Retail & Commerce", "Construction", "Agriculture & Fishing", "Technology & Other"],
  Size: ["Micro (1–5)", "Small (6–25)", "Medium (26–100)", "Large (100+)"],
  Status: ["Active", "Pending", "Suspended"],
};

// ─── Fake audience estimate ───────────────────────────────────────────────────

function estimateAudience(type: AudienceType, filters: AudienceFilter[]): number {
  const base = type === "citizens" ? 156112 : 5089;
  if (filters.length === 0) return base;
  // Rough simulation
  let factor = 1;
  filters.forEach(() => { factor *= 0.15 + Math.random() * 0.25; });
  return Math.max(Math.round(base * factor), 42);
}

// ─── Message Templates ────────────────────────────────────────────────────────

const TEMPLATES = [
  { id: "custom", label: "Custom Message", icon: MessageCircle },
  { id: "maintenance", label: "Scheduled Maintenance", icon: AlertTriangle },
  { id: "event", label: "Community Event", icon: CalendarDays },
  { id: "update", label: "Policy Update", icon: ShieldCheck },
];

// ─── Recent Campaigns ────────────────────────────────────────────────────────

const RECENT_CAMPAIGNS = [
  { id: 1, title: "Water Supply Notice - Timanfaya Area", type: "announcement", audience: "Citizens — Yaiza, Tinajo", recipients: 23756, sent: "2 days ago", status: "delivered" },
  { id: 2, title: "Tourism Sustainability Poll", type: "poll", audience: "Businesses — All Districts", recipients: 5089, sent: "5 days ago", status: "delivered" },
  { id: 3, title: "Carnaval de Arrecife Schedule", type: "announcement", audience: "Citizens — All Districts", recipients: 156112, sent: "1 week ago", status: "delivered" },
  { id: 4, title: "Beach Safety Feedback Poll", type: "poll", audience: "Citizens — Teguise, Tías", recipients: 43253, sent: "2 weeks ago", status: "delivered" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhatsAppMessengerPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Audience
  const [audienceType, setAudienceType] = useState<AudienceType>("citizens");
  const [filters, setFilters] = useState<AudienceFilter[]>([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Message
  const [messageType, setMessageType] = useState<MessageType>("announcement");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("custom");

  // Poll
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  // Schedule
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // UI
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const filterOptions = audienceType === "citizens" ? CITIZEN_FILTERS : BUSINESS_FILTERS;
  const estimatedRecipients = estimateAudience(audienceType, filters);

  const addFilter = () => {
    if (!filterField || !filterValue) return;
    setFilters([...filters, { id: Date.now().toString(), field: filterField, value: filterValue }]);
    setFilterField("");
    setFilterValue("");
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, { id: Date.now().toString(), text: "" }]);
  };

  const removePollOption = (id: string) => {
    if (pollOptions.length <= 2) return;
    setPollOptions(pollOptions.filter((o) => o.id !== id));
  };

  const updatePollOption = (id: string, text: string) => {
    setPollOptions(pollOptions.map((o) => (o.id === id ? { ...o, text } : o)));
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  const canSend = subject.trim() && (messageType === "announcement" ? messageBody.trim() : pollQuestion.trim() && pollOptions.filter((o) => o.text.trim()).length >= 2);

  return (
    <div className="page-content" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
              }}
            >
              <MessageCircle size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {t("whatsapp_messenger")}
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "46px" }}>
            {t("whatsapp_desc")}
          </p>
        </div>
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px" }} className="charts-row">

        {/* ── Left: Composer ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Step 1: Audience Selection */}
          <div className="glass-card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#fff" }}>1</div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("select_audience")}
              </h2>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "30px", marginBottom: "20px" }}>
              {t("audience_desc")}
            </p>

            {/* Audience type toggle */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              {([
                { id: "citizens" as const, label: t("residents"), icon: Users, count: t("citizens_count"), color: "#1d4ed8" },
                { id: "businesses" as const, label: t("business_analytics"), icon: Store, count: t("businesses_count"), color: "#7c3aed" },
              ]).map((a) => {
                const Icon = a.icon;
                const isSelected = audienceType === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => { setAudienceType(a.id); setFilters([]); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "16px", borderRadius: "12px",
                      border: `2px solid ${isSelected ? a.color : "#e2e8f0"}`,
                      background: isSelected ? `${a.color}08` : "#fff",
                      cursor: "pointer", transition: "all 0.2s",
                      boxShadow: isSelected ? `0 0 0 3px ${a.color}15` : "none",
                    }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${a.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} style={{ color: a.color }} />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: isSelected ? a.color : "var(--text-primary)" }}>{a.label}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{a.count}</p>
                    </div>
                    {isSelected && (
                      <div style={{ marginLeft: "auto", width: "20px", height: "20px", borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={12} color="#fff" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Filters */}
            <div style={{ padding: "16px", borderRadius: "10px", background: "#f8fafc", border: "1px solid rgba(226,232,240,0.7)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                <Filter size={13} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>{t("target_filters")}</span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "auto" }}>
                  {filters.length === 0 ? t("no_filters") : `${filters.length} ${t("filters_applied")}`}
                </span>
              </div>

              {/* Active filters */}
              {filters.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                  {filters.map((f) => (
                    <div
                      key={f.id}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "5px 10px", borderRadius: "8px",
                        background: "#fff", border: "1px solid #e2e8f0",
                        fontSize: "12px", fontWeight: 500, color: "var(--text-primary)",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#1d4ed8" }}>{f.field}:</span>
                      {f.value}
                      <button onClick={() => removeFilter(f.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "0", display: "flex" }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add filter */}
              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  value={filterField}
                  onChange={(e) => { setFilterField(e.target.value); setFilterValue(""); }}
                  style={{
                    flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
                    fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none", cursor: "pointer",
                  }}
                >
                  <option value="">{t("select_parameter")}</option>
                  {Object.keys(filterOptions).map((k) => <option key={k} value={k}>{t(k.toLowerCase().replace(" ", "_"))}</option>)}
                </select>

                {filterField && (
                  <select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={{
                      flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
                      fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none", cursor: "pointer",
                    }}
                  >
                    <option value="">{t("select_value")}</option>
                    {filterOptions[filterField]?.map((v) => <option key={v} value={v}>{t(v.toLowerCase().replace(/ \(.+\)/, "").replace(/ /g, "_").replace(/–/g, "_")) || v}</option>)}
                  </select>
                )}

                <button
                  onClick={addFilter}
                  disabled={!filterField || !filterValue}
                  style={{
                    padding: "8px 14px", borderRadius: "8px",
                    background: filterField && filterValue ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : "#e2e8f0",
                    border: "none", color: filterField && filterValue ? "#fff" : "#94a3b8",
                    fontSize: "13px", fontWeight: 600, cursor: filterField && filterValue ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Message Type */}
          <div className="glass-card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#fff" }}>2</div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("message_type")}
              </h2>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "30px", marginBottom: "20px" }}>
              {t("message_type_desc")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {([
                { id: "announcement" as const, label: t("announcement"), desc: t("announcement_desc"), icon: Megaphone, color: "#1d4ed8" },
                { id: "poll" as const, label: t("poll_survey"), desc: t("poll_desc"), icon: Vote, color: "#7c3aed" },
              ]).map((item) => {
                const Icon = item.icon;
                const isSelected = messageType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setMessageType(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "16px", borderRadius: "12px",
                      border: `2px solid ${isSelected ? item.color : "#e2e8f0"}`,
                      background: isSelected ? `${item.color}08` : "#fff",
                      cursor: "pointer", transition: "all 0.2s",
                      boxShadow: isSelected ? `0 0 0 3px ${item.color}15` : "none",
                    }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${item.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: isSelected ? item.color : "var(--text-primary)" }}>{item.label}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Template selector */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>{t("template")}</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {TEMPLATES.map((temp) => {
                  const Icon = temp.icon;
                  return (
                    <button
                      key={temp.id}
                      onClick={() => setSelectedTemplate(temp.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "7px 14px", borderRadius: "8px",
                        border: `1px solid ${selectedTemplate === temp.id ? "#1d4ed8" : "#e2e8f0"}`,
                        background: selectedTemplate === temp.id ? "rgba(29,78,216,0.08)" : "#fff",
                        color: selectedTemplate === temp.id ? "#1d4ed8" : "var(--text-secondary)",
                        fontSize: "12px", fontWeight: 600, cursor: "pointer",
                      }}
                    >
                      <Icon size={13} /> {temp.id === "custom" ? t("custom_message") : temp.id === "maintenance" ? t("scheduled_maintenance") : temp.id === "event" ? t("community_event") : t("policy_update")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                {t("subject_title")}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Water Supply Maintenance Notice"
                style={{
                  width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px",
                  fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* Announcement Body */}
            {messageType === "announcement" && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  {t("message_body")}
                </label>
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Write your announcement message here..."
                  rows={6}
                  style={{
                    width: "100%", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "8px",
                    fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none",
                    resize: "vertical", lineHeight: 1.6, fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1d4ed8")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  {[
                    { icon: Image, tip: "Add image" },
                    { icon: Paperclip, tip: "Attach file" },
                    { icon: Smile, tip: "Add emoji" },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.tip}
                        title={btn.tip}
                        style={{
                          width: "32px", height: "32px", borderRadius: "8px",
                          border: "1px solid #e2e8f0", background: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", color: "var(--text-muted)",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1d4ed8"; (e.currentTarget as HTMLElement).style.color = "#1d4ed8"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
                  <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)" }}>
                    {messageBody.length} / 4096 characters
                  </span>
                </div>
              </div>
            )}

            {/* Poll Builder */}
            {messageType === "poll" && (
              <div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    {t("poll_question")}
                  </label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="e.g. How satisfied are you with the new recycling program?"
                    style={{
                      width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px",
                      fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                  {t("options")} ({pollOptions.length})
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  {pollOptions.map((opt, i) => (
                    <div key={opt.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(124,58,237,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => updatePollOption(opt.id, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                        style={{
                          flex: 1, padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
                          fontSize: "13px", color: "var(--text-primary)", background: "#fff", outline: "none",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                      {pollOptions.length > 2 && (
                        <button onClick={() => removePollOption(opt.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px" }}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button
                    onClick={addPollOption}
                    disabled={pollOptions.length >= 10}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "7px 14px", borderRadius: "8px",
                      border: "1px dashed #c4b5fd", background: "rgba(124,58,237,0.04)",
                      color: "#7c3aed", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    <Plus size={13} /> {t("add_option")}
                  </button>

                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={allowMultiple}
                      onChange={(e) => setAllowMultiple(e.target.checked)}
                      style={{ accentColor: "#7c3aed", width: "16px", height: "16px" }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)" }}>{t("allow_multiple")}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Schedule & Send */}
          <div className="glass-card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#fff" }}>3</div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                {t("schedule_send")}
              </h2>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "30px", marginBottom: "20px" }}>
              {t("schedule_desc")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              {([
                { id: "now" as const, label: t("send_now"), icon: Send },
                { id: "later" as const, label: t("schedule"), icon: Clock },
              ]).map((s) => {
                const Icon = s.icon;
                const isSelected = scheduleType === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setScheduleType(s.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "12px", borderRadius: "10px",
                      border: `2px solid ${isSelected ? "#1d4ed8" : "#e2e8f0"}`,
                      background: isSelected ? "rgba(29,78,216,0.08)" : "#fff",
                      color: isSelected ? "#1d4ed8" : "var(--text-secondary)",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    <Icon size={15} /> {s.label}
                  </button>
                );
              })}
            </div>

            {scheduleType === "later" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Date</label>
                  <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", background: "#fff", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Time</label>
                  <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", background: "#fff", outline: "none" }} />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowPreview(!showPreview)}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "10px 20px", borderRadius: "9px",
                  border: "1px solid #e2e8f0", background: "#fff",
                  color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer",
                }}
              >
                <Eye size={14} /> {t("preview")}
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend || sending}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                  padding: "10px 24px", borderRadius: "9px",
                  background: sent ? "#059669" : canSend && !sending ? "linear-gradient(135deg, #25D366, #128C7E)" : "#e2e8f0",
                  border: "none", color: canSend || sent ? "#fff" : "#94a3b8",
                  fontSize: "13px", fontWeight: 600, cursor: canSend && !sending ? "pointer" : "not-allowed",
                  boxShadow: canSend && !sending && !sent ? "0 4px 12px rgba(37,211,102,0.3)" : "none",
                  transition: "all 0.3s",
                }}
              >
                {sent ? <><CheckCircle2 size={15} /> {t("message_sent")}</> : sending ? <><div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> {t("sending")}</> : <><Send size={14} /> {scheduleType === "now" ? t("send_message") : t("schedule_message")}</>}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Column ────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Audience Summary */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              {t("audience_summary")}
            </h3>

            <div style={{ textAlign: "center", padding: "20px", borderRadius: "12px", background: audienceType === "citizens" ? "rgba(29,78,216,0.04)" : "rgba(124,58,237,0.04)", border: `1px solid ${audienceType === "citizens" ? "rgba(29,78,216,0.1)" : "rgba(124,58,237,0.1)"}`, marginBottom: "16px" }}>
              <p style={{ fontSize: "32px", fontWeight: 800, color: audienceType === "citizens" ? "#1d4ed8" : "#7c3aed", lineHeight: 1, letterSpacing: "-0.03em" }}>
                {mounted ? estimatedRecipients.toLocaleString(language === "en" ? "en-US" : "es-ES") : "---"}
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontWeight: 500 }}>
                {t("estimated_recipients")}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t("residents")}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>{audienceType === "citizens" ? t("residents") : t("business_analytics")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t("filter")}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{filters.length || t("all")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t("status")}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>{t(messageType)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t("delivery")}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{scheduleType === "now" ? t("immediate") : t("scheduled")}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Preview */}
          {showPreview && (subject || messageBody || pollQuestion) && (
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Eye size={14} /> {t("message_preview")}
              </h3>

              <div style={{ borderRadius: "12px", background: "#e5ddd5", padding: "16px", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ccc4' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
                {/* WhatsApp message bubble */}
                <div style={{ maxWidth: "280px", marginLeft: "auto", background: "#dcf8c6", borderRadius: "10px 10px 0 10px", padding: "10px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  {subject && <p style={{ fontSize: "13px", fontWeight: 700, color: "#303030", marginBottom: "4px" }}>📢 {subject}</p>}

                  {messageType === "announcement" && messageBody && (
                    <p style={{ fontSize: "12px", color: "#303030", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{messageBody.slice(0, 200)}{messageBody.length > 200 ? "..." : ""}</p>
                  )}

                  {messageType === "poll" && pollQuestion && (
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#303030", marginBottom: "6px" }}>📊 {pollQuestion}</p>
                      {pollOptions.filter((o) => o.text.trim()).map((o, i) => (
                        <div key={o.id} style={{ padding: "6px 10px", borderRadius: "6px", background: "rgba(255,255,255,0.6)", marginBottom: "4px", fontSize: "12px", color: "#303030" }}>
                          {String.fromCharCode(65 + i)}. {o.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                    <span style={{ fontSize: "10px", color: "#8a8a8a" }}>
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ✓✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Campaigns */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
              {t("recent_campaigns")}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {RECENT_CAMPAIGNS.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "10px 8px", borderRadius: "10px",
                    transition: "background 0.2s", cursor: "default",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f8fafc")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    {c.type === "poll" ? <Vote size={12} style={{ color: "#7c3aed" }} /> : <Megaphone size={12} style={{ color: "#1d4ed8" }} />}
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>{c.title}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "20px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{mounted ? c.recipients.toLocaleString(language === "en" ? "en-US" : "es-ES") : "---"} {t("recipients")}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>•</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.sent}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#059669", background: "rgba(5,150,105,0.08)", padding: "2px 6px", borderRadius: "100px", marginLeft: "auto" }}>
                      {t("delivered")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
