"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Sparkles,
  Key,
  Cpu,
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Loader2,
  RefreshCw,
  Bot,
  User,
} from "lucide-react";

export default function GeminiAiAdminPage() {
  const [formData, setFormData] = useState({
    geminiApiKey: "••••••••••••••••",
    modelName: "gemini-2.0-flash",
    systemPrompt: "",
    temperature: 0.2,
    welcomeMsg: "Hello! How can I help you today? Feel free to ask any questions or share your requirements.",
  });

  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Test Sandbox State
  const [testQuery, setTestQuery] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [chatLog, setChatLog] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Sandbox ready. Ask any technical question about Kashtrix platforms or test external questions to verify boundaries.",
    },
  ]);

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai-settings");
      const data = await res.json();
      if (data.ok && data.settings) {
        setFormData({
          geminiApiKey: data.settings.geminiApiKey || "••••••••••••••••",
          modelName: data.settings.modelName || "gemini-2.0-flash",
          systemPrompt: data.settings.systemPrompt || "",
          temperature: data.settings.temperature ?? 0.2,
          welcomeMsg: data.settings.welcomeMsg || "",
        });
      }
    } catch (err) {
      console.error("Failed to load AI settings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/ai-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setStatusMsg({ type: "success", text: "AI configuration saved successfully." });
        if (data.settings?.geminiApiKey) {
          setFormData((prev) => ({ ...prev, geminiApiKey: data.settings.geminiApiKey }));
        }
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save AI configuration" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  }

  async function handleSendTest(e: FormEvent) {
    e.preventDefault();
    if (!testQuery.trim() || testLoading) return;

    const query = testQuery.trim();
    setTestQuery("");
    setChatLog((prev) => [...prev, { role: "user", text: query }]);
    setTestLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      if (data.ok) {
        setChatLog((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        setChatLog((prev) => [
          ...prev,
          { role: "assistant", text: `[Error: ${data.error || "Failed to get reply"}]` },
        ]);
      }
    } catch (err: any) {
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", text: `[Network Error: ${err.message}]` },
      ]);
    } finally {
      setTestLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Gemini AI Configuration
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Manage Gemini API key, model selection, temperature, and strict scope guardrails.
          </p>
        </div>

        <button
          onClick={loadSettings}
          disabled={loading}
          className="button-secondary-sm inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Reload</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2 rounded-[4px] border p-2.5 text-xs font-medium ${
            statusMsg.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 rounded-[5px] border border-[#e8e2e9] bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={formData.geminiApiKey}
                onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                placeholder="Enter Gemini API Key (e.g. AIzaSy...)"
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 pr-9 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2 text-[#716876] hover:text-[#171219] transition"
              >
                {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">Model</label>
              <select
                value={formData.modelName}
                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1.5 text-xs text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Reasoning)</option>
                <option value="gemini-flash-latest">gemini-flash-latest</option>
                <option value="gemini-3.8-flash">gemini-3.8-flash</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                Temperature: {formData.temperature}
              </label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                className="w-full accent-[#4b1b63] mt-2"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Welcome Message
            </label>
            <input
              type="text"
              value={formData.welcomeMsg}
              onChange={(e) => setFormData({ ...formData, welcomeMsg: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              System Instruction Guardrails
            </label>
            <textarea
              rows={6}
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              className="w-full resize-y rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs leading-relaxed text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63] font-mono text-xs"
            />
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-[#f0ebf2]">
            <button
              type="submit"
              disabled={saving}
              className="button-primary-sm inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>Save AI Settings</span>
            </button>
          </div>
        </form>

        {/* Live Sandbox Chat */}
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)] flex flex-col h-[520px]">
          <div className="border-b border-[#f0ebf2] pb-2.5 mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#171219]">
              <Bot className="h-4 w-4 text-[#4b1b63]" />
              <span>Prompt Sandbox</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[3px] border border-emerald-200">
              Active Context
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-[4px] px-3 py-1.5 max-w-[85%] leading-relaxed text-xs ${
                    msg.role === "user"
                      ? "bg-[#4b1b63] text-white"
                      : "bg-[#faf8fb] border border-[#ebe5ed] text-[#241c2b] whitespace-pre-wrap"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {testLoading && (
              <div className="flex items-center gap-1.5 text-xs text-[#716876]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#4b1b63]" />
                <span>Evaluating...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendTest} className="mt-2 pt-2 border-t border-[#f0ebf2] flex items-center gap-1.5">
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Test prompt..."
              className="h-8 flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
            <button
              type="submit"
              disabled={testLoading || !testQuery.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#4b1b63] text-white hover:bg-[#6f2b8f] transition disabled:opacity-50 shrink-0 shadow-xs"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
