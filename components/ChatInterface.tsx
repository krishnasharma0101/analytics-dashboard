"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  BarChart3,
  Users,
  Building2,
  Lightbulb,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// ── Types ──
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ── Suggested Prompts ──
const suggestions = [
  {
    icon: BarChart3,
    label: "Revenue breakdown",
    prompt: "Show me a revenue breakdown by municipality for the last quarter",
  },
  {
    icon: Users,
    label: "Population trends",
    prompt: "What are the latest population trends in Lanzarote?",
  },
  {
    icon: Building2,
    label: "Business licenses",
    prompt: "How many new business licenses were issued in Arrecife this month?",
  },
  {
    icon: Lightbulb,
    label: "Budget insights",
    prompt: "Provide insights on budget allocation vs. actual spending",
  },
];

// ── Fake streaming response (will be replaced with Ollama later) ──
const fakeResponses: Record<string, string> = {
  default: `Based on the latest Lanzarote municipal data, here are the key insights:

**Population Overview:**
- Total residents: 156,112 (2024 census)
- Year-over-year growth: +1.2%
- Median age: 44.5 years

**Economic Indicators:**
- New business registrations: 412 (Q4)
- Employment rate: 84.1%
- Tourism revenue: €540M annually (municipal estimate)

I can provide more detailed breakdowns for any of these municipalities like Arrecife, Teguise, or Yaiza. What area would you like to explore further?`,
};

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector("[data-slot='scroll-area-viewport']");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  // Handle submit
  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate streaming delay (replace with Ollama later)
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const assistantMsg: Message = {
      id: generateId(),
      role: "assistant",
      content: fakeResponses.default,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  // Handle suggestion click
  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    // Auto-submit after a tick
    setTimeout(() => {
      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: prompt,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setInput("");

      setTimeout(async () => {
        const assistantMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: fakeResponses.default,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 1500 + Math.random() * 1000);
    }, 100);
  };

  // Copy message
  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Clear chat
  const handleClear = () => {
    setMessages([]);
  };

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* ── Messages Area ── */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {isEmpty ? (
            /* ── Empty State ── */
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] animate-fade-in">
              {/* Hero */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
                Municipal Intelligence
              </h1>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-10 leading-relaxed">
                Ask questions about city data, demographics, budgets, and more.
                Powered by AI to help you make informed decisions.
              </p>

              {/* Suggestion Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSuggestion(s.prompt)}
                    className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/20 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 shrink-0 group-hover:bg-primary/10 transition-colors">
                      <s.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-none mb-1">
                        {s.label}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                        {s.prompt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Message List ── */
            <div className="flex flex-col gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                    )}
                  >
                    {/* Message content with markdown-ish rendering */}
                    <div className="whitespace-pre-wrap break-words prose-sm">
                      {msg.content.split("\n").map((line, i) => {
                        // Bold text
                        const formatted = line.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong>$1</strong>'
                        );
                        return (
                          <span key={i}>
                            <span dangerouslySetInnerHTML={{ __html: formatted }} />
                            {i < msg.content.split("\n").length - 1 && <br />}
                          </span>
                        );
                      })}
                    </div>

                    {/* Timestamp + Actions */}
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                        <span className="text-[10px] text-muted-foreground">
                          {mounted ? msg.timestamp.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "--:--"}
                        </span>
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="ml-auto p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                      <AvatarFallback className="bg-foreground text-background text-xs font-bold">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 animate-fade-in">
                  <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* ── Input Area ── */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* Top bar with clear */}
          {!isEmpty && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] gap-1 font-semibold">
                  <MessageSquare className="w-3 h-3" />
                  {messages.length} messages
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-destructive gap-1.5 h-7"
              >
                <RotateCcw className="w-3 h-3" />
                Clear chat
              </Button>
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-primary/30 transition-all">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about city data, demographics, budgets..."
                className="min-h-[44px] max-h-[160px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm placeholder:text-muted-foreground/60 p-2"
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="shrink-0 h-9 w-9 rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Footer hint */}
            <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
              Press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-mono">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-mono">Shift+Enter</kbd> for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
