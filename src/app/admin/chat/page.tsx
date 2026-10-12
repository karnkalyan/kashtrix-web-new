"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import {
  MessageSquare,
  Send,
  User,
  Sparkles,
  Headphones,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  AlertTriangle,
  Mail,
  Phone,
  Building,
  Loader2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface ChatMessage {
  id: number;
  sessionId: string;
  sender: "user" | "assistant" | "staff" | "system";
  senderName: string | null;
  text: string;
  createdAt: string;
}

interface ChatSessionItem {
  id: string;
  sessionId: string;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  company: string | null;
  status: "ACTIVE" | "ESCALATED" | "RESOLVED" | "ENDED";
  mode: "AI" | "LIVE_STAFF";
  staffJoined: boolean;
  lastActiveAt: string;
  createdAt: string;
  summary: string | null;
  escalatedReason: string | null;
  messages?: ChatMessage[];
}

export default function AdminLiveChatPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [filterTab, setFilterTab] = useState<"escalated" | "active" | "all">("escalated");
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Load chat sessions from API
  async function fetchSessions() {
    try {
      const res = await fetch("/api/admin/chat");
      const data = await res.json();
      if (data.ok) {
        setSessions(data.sessions || []);
        // If nothing selected, auto-select first waiting or first session
        if (!selectedSessionId && data.sessions.length > 0) {
          const escalated = data.sessions.find((s: ChatSessionItem) => s.status === "ESCALATED");
          setSelectedSessionId(escalated ? escalated.sessionId : data.sessions[0].sessionId);
        }
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch messages for selected session
  async function fetchMessages(sessionId: string) {
    try {
      const res = await fetch(`/api/admin/chat?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.ok) {
        setCurrentMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages for session:", err);
    }
  }

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchMessages(selectedSessionId);
      const msgInterval = setInterval(() => {
        fetchMessages(selectedSessionId);
      }, 3000);
      return () => clearInterval(msgInterval);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // Connect WebSocket for real-time live staff updates
  useEffect(() => {
    let ws: WebSocket | null = null;
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = window.location.hostname || "localhost";
      const port = process.env.NEXT_PUBLIC_WS_PORT || "3001";
      ws = new WebSocket(`${protocol}//${host}:${port}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
        ws?.send(JSON.stringify({ type: "join", role: "staff" }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "chat_message") {
            const incoming = data.data || data;
            if (incoming.sessionId === selectedSessionId) {
              setCurrentMessages((prev) => {
                // Avoid duplicate by matching timestamp and text
                if (prev.some((m) => m.text === incoming.text && Math.abs(new Date(m.createdAt).getTime() - new Date(incoming.createdAt).getTime()) < 1000)) {
                  return prev;
                }
                return [
                  ...prev,
                  {
                    id: Date.now(),
                    sessionId: incoming.sessionId,
                    sender: incoming.sender,
                    senderName: incoming.senderName,
                    text: incoming.text,
                    createdAt: incoming.createdAt || new Date().toISOString(),
                  },
                ];
              });
            }
            fetchSessions();
          } else if (data.type === "escalation_alert" || data.type === "escalation") {
            fetchSessions();
          }
        } catch {
          // ignore
        }
      };

      ws.onclose = () => {
        setWsConnected(false);
      };
    } catch {
      setWsConnected(false);
    }

    return () => {
      ws?.close();
    };
  }, [selectedSessionId]);

  // Send Staff Reply
  async function handleSendReply(e: FormEvent) {
    e.preventDefault();
    if (!selectedSessionId || !replyText.trim() || sending) return;

    const text = replyText.trim();
    setReplyText("");
    setSending(true);

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          message: text,
          staffName: "Kashtrix Support Engineer",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        if (data.message) {
          setCurrentMessages((prev) => [...prev, data.message]);
        }
        fetchSessions();
      }
    } catch (err) {
      console.error("Failed to send staff reply:", err);
    } finally {
      setSending(false);
    }
  }

  // Update session status (e.g. resolve)
  async function handleUpdateStatus(status: "RESOLVED" | "ENDED") {
    if (!selectedSessionId) return;
    try {
      await fetch("/api/admin/chat", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selectedSessionId, status }),
      });
      fetchSessions();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  const selectedSession = sessions.find((s) => s.sessionId === selectedSessionId);

  const filteredSessions = sessions.filter((s) => {
    if (filterTab === "escalated" && s.status !== "ESCALATED") return false;
    if (filterTab === "active" && s.status !== "ACTIVE") return false;
    if (search) {
      const q = search.toLowerCase();
      const matchName = (s.userName || "").toLowerCase().includes(q);
      const matchEmail = (s.userEmail || "").toLowerCase().includes(q);
      const matchPhone = (s.userPhone || "").toLowerCase().includes(q);
      const matchCompany = (s.company || "").toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchCompany;
    }
    return true;
  });

  const escalatedCount = sessions.filter((s) => s.status === "ESCALATED").length;

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
              Live Support & AI Desk
            </h1>
            {wsConnected ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live WS Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                Polling Mode
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[#716876]">
            Realtime customer escalation desk with AI conversation memory and support takeover.
          </p>
        </div>

        <button
          onClick={fetchSessions}
          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 min-h-[640px]">
        {/* Left Column: Sessions List */}
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white shadow-[0_2px_8px_rgba(20,8,30,0.03)] flex flex-col overflow-hidden">
          {/* Filter Tabs */}
          <div className="border-b border-[#f0ebf2] bg-[#faf8fb] p-2.5 space-y-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterTab("escalated")}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-[5px] py-1.5 px-2 text-xs font-semibold transition ${
                  filterTab === "escalated"
                    ? "button-primary-sm !min-h-0 !py-1.5"
                    : "button-secondary-sm !min-h-0 !py-1.5"
                }`}
              >
                <AlertTriangle className="h-3 w-3" />
                <span>Waiting ({escalatedCount})</span>
              </button>

              <button
                onClick={() => setFilterTab("active")}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-[5px] py-1.5 px-2 text-xs font-semibold transition ${
                  filterTab === "active"
                    ? "button-primary-sm !min-h-0 !py-1.5"
                    : "button-secondary-sm !min-h-0 !py-1.5"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Active AI</span>
              </button>

              <button
                onClick={() => setFilterTab("all")}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-[5px] py-1.5 px-2 text-xs font-semibold transition ${
                  filterTab === "all"
                    ? "button-primary-sm !min-h-0 !py-1.5"
                    : "button-secondary-sm !min-h-0 !py-1.5"
                }`}
              >
                <span>All ({sessions.length})</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8a7f91]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers by name, email..."
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white pl-8 pr-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>
          </div>

          {/* Sessions List Scroll */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f0ebf2] max-h-[600px]">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#716876]">
                No chat sessions found.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isSelected = session.sessionId === selectedSessionId;
                const isEscalated = session.status === "ESCALATED";

                return (
                  <div
                    key={session.sessionId}
                    onClick={() => setSelectedSessionId(session.sessionId)}
                    className={`p-3 cursor-pointer transition ${
                      isSelected
                        ? "bg-[#faf5fc] border-l-4 border-l-[#4b1b63]"
                        : "hover:bg-[#faf9fb]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          {isEscalated && (
                            <span className="rounded-[3px] bg-[#ec1778] px-1.5 py-0.2 text-[9px] font-bold text-white uppercase animate-pulse">
                              Urgent
                            </span>
                          )}
                          <span className="text-xs font-bold text-[#171219] truncate">
                            {session.userName || "Anonymous Guest"}
                          </span>
                        </div>
                        {session.userEmail && (
                          <div className="text-[11px] text-[#716876] truncate mt-0.5">
                            {session.userEmail}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#8e8593] shrink-0">
                        {new Date(session.lastActiveAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {session.escalatedReason ? (
                      <div className="mt-1.5 rounded-[3px] bg-pink-50/70 border border-pink-100 p-1.5 text-[11px] text-pink-900 line-clamp-2">
                        <strong>Reason:</strong> {session.escalatedReason}
                      </div>
                    ) : session.summary ? (
                      <div className="mt-1 text-[11px] text-[#5c5460] line-clamp-1 italic">
                        {session.summary}
                      </div>
                    ) : null}

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span
                        className={`font-semibold px-1.5 py-0.5 rounded-[3px] ${
                          session.status === "ESCALATED"
                            ? "bg-amber-100 text-amber-800"
                            : session.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {session.status}
                      </span>
                      <span className="text-[#8e8593]">
                        {session.mode === "LIVE_STAFF" ? "Staff Active" : "AI Mode"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Live Conversation Desk */}
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white shadow-[0_2px_8px_rgba(20,8,30,0.03)] flex flex-col overflow-hidden">
          {selectedSession ? (
            <>
              {/* Session Customer Header */}
              <div className="border-b border-[#f0ebf2] bg-[#faf8fb] p-3 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#171219]">
                      {selectedSession.userName || "Customer Guest"}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] ${
                        selectedSession.status === "ESCALATED"
                          ? "bg-[#ec1778] text-white animate-pulse"
                          : "bg-[#4b1b63] text-white"
                      }`}
                    >
                      {selectedSession.status === "ESCALATED"
                        ? "WAITING FOR STAFF"
                        : selectedSession.mode === "LIVE_STAFF"
                        ? "STAFF ENGAGED"
                        : "AI ASSISTANT"}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#716876]">
                    {selectedSession.userEmail && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-[#4b1b63]" />
                        <span>{selectedSession.userEmail}</span>
                      </span>
                    )}
                    {selectedSession.userPhone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-emerald-600" />
                        <span>{selectedSession.userPhone}</span>
                      </span>
                    )}
                    {selectedSession.company && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-[#716876]" />
                        <span>{selectedSession.company}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus("RESOLVED")}
                    className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Resolve Chat</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus("ENDED")}
                    className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold text-red-650"
                  >
                    <span>End Session</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Transcript Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf9fb] min-h-[380px] max-h-[500px]">
                {currentMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#716876]">
                    No messages recorded yet for this session.
                  </div>
                ) : (
                  currentMessages.map((msg, i) => {
                    const isUser = msg.sender === "user";
                    const isStaff = msg.sender === "staff";
                    const isSystem = msg.sender === "system";
                    const isAI = msg.sender === "assistant";

                    if (isSystem) {
                      return (
                        <div key={i} className="flex justify-center my-2">
                          <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] text-amber-800">
                            {msg.text}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={i}
                        className={`flex flex-col ${
                          isStaff
                            ? "items-end"
                            : isUser
                            ? "items-start"
                            : "items-start"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-[#8e8593] mb-1 px-1">
                          {isStaff ? (
                            <span className="font-bold text-[#4b1b63]">
                              {msg.senderName || "Support Engineer"}
                            </span>
                          ) : isAI ? (
                            <span className="font-bold text-[#6f2b8f] flex items-center gap-1">
                              <Sparkles className="h-2.5 w-2.5" /> Kashtrix AI
                            </span>
                          ) : (
                            <span className="font-bold text-[#171219]">
                              {selectedSession.userName || "Customer"}
                            </span>
                          )}
                          <span>•</span>
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div
                          className={`max-w-[80%] rounded-[6px] px-3.5 py-2.5 text-xs leading-relaxed ${
                            isStaff
                              ? "bg-[#4b1b63] text-white shadow-xs"
                              : isAI
                              ? "bg-white border border-[#e8dcef] text-[#171219] shadow-xs"
                              : "bg-white border border-[#e8e2e9] text-[#171219] shadow-xs"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Responses */}
              <div className="border-t border-[#f0ebf2] bg-white px-3 py-1.5 flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[11px] font-semibold text-[#8e8593] shrink-0">Quick:</span>
                {[
                  "Hello, I am reviewing your inquiry now.",
                  "Would you like to schedule a 1-on-1 demo?",
                  "Could you provide your current SDI/NDI workflow format?",
                  "I have sent demo credentials to your email.",
                ].map((canned, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyText(canned)}
                    className="shrink-0 rounded-[4px] border border-[#e8e2e9] bg-[#faf8fb] px-2 py-0.5 text-[11px] text-[#49434c] hover:bg-[#fff5fa] hover:text-[#b30f5f] transition"
                  >
                    {canned}
                  </button>
                ))}
              </div>

              {/* Staff Reply Box */}
              <form onSubmit={handleSendReply} className="border-t border-[#f0ebf2] p-3 bg-white flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type real-time reply to customer..."
                  className="flex-1 rounded-[5px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
                <button
                  type="submit"
                  disabled={sending || !replyText.trim()}
                  className="button-primary-sm !min-h-0 !py-2 !px-4 !text-xs font-semibold disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-12 text-xs text-[#716876]">
              Select a chat session from the left to inspect conversation or take over.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
