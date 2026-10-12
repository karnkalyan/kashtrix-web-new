"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  RefreshCw,
  Headphones,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "staff" | "system";
  senderName?: string;
  text: string;
  timestamp: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

const IDLE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes inactivity timeout

export function AiFloatingChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // User Identification & Session state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isIdentified, setIsIdentified] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [memoryContext, setMemoryContext] = useState("");
  const [mode, setMode] = useState<"AI" | "LIVE_STAFF">("AI");
  const [sessionEnded, setSessionEnded] = useState(false);

  // Onboarding form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Load saved profile from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kashtrix_chat_user");
      if (saved) {
        const parsed: UserProfile = JSON.parse(saved);
        if (parsed.email || parsed.name) {
          setUserProfile(parsed);
          setFormName(parsed.name || "");
          setFormEmail(parsed.email || "");
          setFormPhone(parsed.phone || "");
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isIdentified]);

  // Reset 5-minute inactivity timer
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (sessionEnded || !sessionId) return;

    idleTimerRef.current = setTimeout(() => {
      handleIdleSessionEnd();
    }, IDLE_LIMIT_MS);
  };

  async function handleIdleSessionEnd() {
    if (!sessionId || sessionEnded) return;
    setSessionEnded(true);

    try {
      await fetch("/api/ai/chat/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, reason: "idle_timeout" }),
      });
    } catch {
      // ignore
    }

    setMessages((prev) => [
      ...prev,
      {
        id: "sys-idle-" + Date.now(),
        role: "system",
        text: "Session concluded due to 5 minutes of inactivity. All conversation transcripts have been preserved in our records. Start a new chat anytime!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }

  // Real-time WebSocket connection for chat & live staff updates
  useEffect(() => {
    if (!sessionId || !isOpen) return;

    let ws: WebSocket | null = null;
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = window.location.host;
      ws = new WebSocket(`${protocol}//${host}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        ws?.send(JSON.stringify({ type: "join", sessionId, role: "user" }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "chat_message") {
            const incoming = data.data || data;
            if (incoming.sessionId === sessionId) {
              if (incoming.sender === "staff") {
                setMode("LIVE_STAFF");
                setMessages((prev) => {
                  if (prev.some((m) => m.text === incoming.text && m.role === "staff")) return prev;
                  return [
                    ...prev,
                    {
                      id: "staff-" + Date.now(),
                      role: "staff",
                      senderName: incoming.senderName || "Kashtrix Support Engineer",
                      text: incoming.text,
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ];
                });
                setTimeout(() => inputRef.current?.focus(), 50);
              }
            }
          }
        } catch {
          // ignore
        }
      };
    } catch {
      // ignore
    }

    // Polling safety net fallback for staff replies
    const pollInterval = setInterval(async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
        const d = await res.json();
        if (d.ok && Array.isArray(d.messages)) {
          const staffMsgs = d.messages.filter((m: any) => m.sender === "staff");
          if (staffMsgs.length > 0) setMode("LIVE_STAFF");
          setMessages((prev) => {
            const existingTexts = new Set(prev.filter((m) => m.role === "staff").map((m) => m.text));
            const newStaff = staffMsgs.filter((sm: any) => !existingTexts.has(sm.text));
            if (newStaff.length === 0) return prev;
            return [
              ...prev,
              ...newStaff.map((sm: any) => ({
                id: "staff-poll-" + sm.id,
                role: "staff" as const,
                senderName: sm.senderName || "Kashtrix Support Engineer",
                text: sm.text,
                timestamp: new Date(sm.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              })),
            ];
          });
        }
      } catch {
        // ignore
      }
    }, 5000);

    return () => {
      ws?.close();
      clearInterval(pollInterval);
    };
  }, [sessionId, isOpen]);

  // Start / Initialize Chat Session with Contact Info
  async function handleStartSession(guest = false) {
    setFormSubmitting(true);
    const profile: UserProfile = guest
      ? { name: "Guest User", email: "", phone: "" }
      : { name: formName.trim(), email: formEmail.trim(), phone: formPhone.trim() };

    try {
      if (!guest && (profile.name || profile.email)) {
        localStorage.setItem("kashtrix_chat_user", JSON.stringify(profile));
        setUserProfile(profile);
      }

      const res = await fetch("/api/ai/chat/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (data.ok) {
        setSessionId(data.sessionId);
        setMemoryContext(data.pastMemorySummary || "");
        setIsIdentified(true);
        setSessionEnded(false);

        setMessages([
          {
            id: "init-welcome",
            role: "assistant",
            text: data.welcomeMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        resetIdleTimer();
      }
    } catch (err) {
      console.error("Init error:", err);
      // Fallback
      setIsIdentified(true);
      setSessionId(`guest_${Date.now()}`);
      setMessages([
        {
          id: "fallback-welcome",
          role: "assistant",
          text: "Hello! How can I assist you with Kashtrix broadcast, streaming, and telecom systems today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setFormSubmitting(false);
    }
  }

  // Escalate to Live Staff
  async function handleRequestStaff() {
    if (!sessionId || mode === "LIVE_STAFF") return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Customer requested live staff assistance",
          sessionId,
          userName: userProfile?.name || "Customer",
          userEmail: userProfile?.email || undefined,
          userPhone: userProfile?.phone || undefined,
          escalate: true,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMode("LIVE_STAFF");
        setMessages((prev) => [
          ...prev,
          {
            id: "escalate-" + Date.now(),
            role: "system",
            text: data.reply || "A live support engineer has been notified and will respond shortly.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  // Send Message
  async function handleSend(queryText?: string) {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading || sessionEnded) return;

    resetIdleTimer();

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Broadcast immediately to WS server for real-time delivery
    try {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "chat_message",
            sessionId,
            sender: "user",
            senderName: userProfile?.name || "Customer",
            text: textToSend,
            createdAt: new Date().toISOString(),
          })
        );
      }
    } catch {
      // ignore
    }

    // Keep input focused so user can freely chat continuously
    setTimeout(() => inputRef.current?.focus(), 20);

    // If currently in LIVE_STAFF mode, send directly via live message route
    if (mode === "LIVE_STAFF") {
      try {
        await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: textToSend,
            senderName: userProfile?.name || "Customer",
          }),
        });
      } catch {
        // ignore
      }
      setTimeout(() => inputRef.current?.focus(), 20);
      return;
    }

    // Normal AI chat
    setLoading(true);
    try {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history,
          sessionId,
          userName: userProfile?.name,
          userEmail: userProfile?.email,
          userPhone: userProfile?.phone,
          memoryContext,
        }),
      });

      const data = await res.json();
      if (data.mode === "LIVE_STAFF") {
        setMode("LIVE_STAFF");
      }

      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: data.mode === "LIVE_STAFF" ? "system" : "assistant",
        text: data.ok
          ? data.reply
          : data.error || "Unable to reach the assistant right now. You can email us directly at support@kashtrix.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          role: "assistant",
          text: "Connection interrupted. Please contact our team at support@kashtrix.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    handleSend();
  }

  function handleResetChat() {
    setIsIdentified(false);
    setSessionId(null);
    setMode("AI");
    setSessionEnded(false);
    setMessages([]);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button - 5px Radius standard */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            if (!isIdentified && userProfile?.email) {
              handleStartSession();
            }
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="relative flex h-11 w-11 items-center justify-center rounded-[5px] bg-[#4b1b63] text-white shadow-[0_6px_20px_rgba(75,27,99,0.25)] transition-all duration-150 hover:bg-[#6f2b8f] focus:outline-none"
          aria-label="Open chat"
          title="Chat with Kashtrix"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center">
            <span className="h-2 w-2 rounded-[2px] bg-emerald-500 ring-2 ring-white" />
          </span>
        </button>
      )}

      {/* Clean Light-Mode Chat Window - Height 460px (+20px increase) */}
      {isOpen && (
        <div className="flex h-[460px] w-[90vw] max-w-[370px] flex-col overflow-hidden rounded-[5px] border border-[#e5dce6] bg-white text-[#171219] shadow-[0_16px_50px_rgba(20,8,30,0.14)] animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f0ebf2] bg-white px-3.5 py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#4b1b63] text-white">
                {mode === "LIVE_STAFF" ? (
                  <Headphones className="h-3 w-3" />
                ) : (
                  <MessageSquare className="h-3 w-3" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#171219]">
                    {mode === "LIVE_STAFF" ? "Live Staff Support" : "Kashtrix Assistant"}
                  </h3>
                  {mode === "LIVE_STAFF" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#716876]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    {mode === "LIVE_STAFF"
                      ? "Engineering Desk Online"
                      : "Online · AI Copilot"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="rounded-[4px] p-1 text-[#8c8291] hover:bg-[#f4eff6] hover:text-[#171219] transition"
                title="Restart conversation"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-[4px] p-1 text-[#8c8291] hover:bg-[#f4eff6] hover:text-[#171219] transition"
                title="Close chat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isIdentified ? (
            /* Lead Capture / Identification Card */
            <div className="flex-1 overflow-y-auto bg-[#faf8fb] p-4 flex flex-col justify-between text-xs">
              <div>
                <div className="text-center pt-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#f5eff8] text-[#4b1b63] border border-[#e8dcef]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="mt-2.5 text-xs font-bold text-[#171219]">
                    Welcome to Kashtrix Engineering
                  </h4>
                  <p className="mt-1 text-[11px] text-[#716876] leading-normal">
                    Introduce yourself so we can recall previous discussions and connect live support if needed.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStartSession(false);
                  }}
                  className="mt-4 space-y-2.5"
                >
                  <div>
                    <label className="block text-[11px] font-semibold text-[#49434c] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alexander Wright"
                      className="w-full h-8 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#49434c] mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alexander@company.com"
                      className="w-full h-8 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#49434c] mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+1 555 0199"
                      className="w-full h-8 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="button-primary-sm mt-1 w-full !min-h-0 !py-2 !text-xs font-semibold disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                    <span>Start Conversation</span>
                  </button>
                </form>
              </div>

              <div className="pt-3 text-center border-t border-[#f0ebf2] mt-3">
                <button
                  type="button"
                  onClick={() => handleStartSession(true)}
                  className="text-[11px] font-medium text-[#716876] hover:text-[#4b1b63] transition"
                >
                  Or continue as guest →
                </button>
              </div>
            </div>
          ) : (
            /* Active Message Area */
            <>
              <div className="flex-1 overflow-y-auto bg-[#faf8fb] p-3 space-y-2 text-xs">
                {messages.map((msg) => {
                  if (msg.role === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-1">
                        <span className="rounded-[4px] bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] text-amber-900 leading-tight text-center">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isUser = msg.role === "user";
                  const isStaff = msg.role === "staff";

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[4px] px-3 py-1.5 leading-relaxed text-xs ${
                          isUser
                            ? "bg-[#4b1b63] text-white shadow-xs"
                            : isStaff
                            ? "bg-[#5e217d] text-white shadow-xs border border-[#4b1b63]"
                            : "bg-white border border-[#ebe5ed] text-[#241c2b] shadow-xs whitespace-pre-wrap"
                        }`}
                      >
                        {isStaff && (
                          <div className="text-[9px] font-bold text-pink-200 mb-0.5">
                            {msg.senderName || "Support Engineer"}
                          </div>
                        )}
                        <div>{msg.text}</div>
                        <div
                          className={`mt-0.5 text-[9px] ${
                            isUser || isStaff ? "text-purple-200" : "text-[#9e94a3]"
                          } text-right`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex items-center gap-1.5 rounded-[4px] bg-white border border-[#ebe5ed] px-2.5 py-1 text-xs text-[#6e6375] shadow-xs w-fit">
                    <Loader2 className="h-3 w-3 animate-spin text-[#4b1b63]" />
                    <span>Typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Small & Clean (h-8) */}
              <div className="border-t border-[#f0ebf2] bg-white p-2">
                {sessionEnded ? (
                  <div className="text-center py-1">
                    <button
                      onClick={handleResetChat}
                      className="button-primary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
                    >
                      Start New Conversation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        resetIdleTimer();
                      }}
                      placeholder={
                        mode === "LIVE_STAFF"
                          ? "Message live support engineer..."
                          : "Type a message..."
                      }
                      style={{ fontSize: "12px", lineHeight: "1.3" }}
                      className="h-8 flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 !text-[12px] text-[#171219] placeholder:!text-[12px] placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]/20"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="button-primary-sm flex !h-8 !w-8 !min-h-0 !p-0 items-center justify-center rounded-[4px] disabled:opacity-40 shrink-0 shadow-xs"
                      title="Send message"
                    >
                      <Send className="h-3 w-3" />
                    </button>
                  </form>
                )}

                <div className="mt-1 flex items-center justify-between px-1 text-[9px] text-[#9c93a1]">
                  <span>
                    {mode === "LIVE_STAFF"
                      ? "Live Engineer Desk Active"
                      : "Kashtrix Platform Support"}
                  </span>
                  <a
                    href="mailto:support@kashtrix.com"
                    className="text-[#4b1b63] font-medium hover:underline"
                  >
                    support@kashtrix.com
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
