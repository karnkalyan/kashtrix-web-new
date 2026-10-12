"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Palette,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sun,
  Moon,
  Eye,
} from "lucide-react";

export default function ThemeCustomizationPage() {
  const [formData, setFormData] = useState({
    primaryColor: "#4b1b63",
    accentColor: "#6f2b8f",
    gradientStart: "#ec1778",
    gradientEnd: "#4b1b63",
    defaultTheme: "light",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/theme-settings");
      const data = await res.json();
      if (data.ok && data.theme) {
        setFormData({
          primaryColor: data.theme.primaryColor || "#4b1b63",
          accentColor: data.theme.accentColor || "#6f2b8f",
          gradientStart: data.theme.gradientStart || "#ec1778",
          gradientEnd: data.theme.gradientEnd || "#4b1b63",
          defaultTheme: data.theme.defaultTheme || "light",
        });
      }
    } catch (err) {
      console.error("Failed to load theme settings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/theme-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setStatusMsg({ type: "success", text: "Theme tokens saved successfully." });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update theme" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save theme" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Theme & Branding
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Configure primary brand colors, hero headline gradients, and default interface mode.
          </p>
        </div>

        <button
          onClick={loadData}
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

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[5px] border border-[#e8e2e9] bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded-[4px] border border-[#dcd4e0] bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs font-mono text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                Accent Purple
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded-[4px] border border-[#dcd4e0] bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                  className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs font-mono text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                Hero Gradient Start (Pink)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.gradientStart}
                  onChange={(e) => setFormData({ ...formData, gradientStart: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded-[4px] border border-[#dcd4e0] bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={formData.gradientStart}
                  onChange={(e) => setFormData({ ...formData, gradientStart: e.target.value })}
                  className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs font-mono text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                Hero Gradient End (Deep Purple)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.gradientEnd}
                  onChange={(e) => setFormData({ ...formData, gradientEnd: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded-[4px] border border-[#dcd4e0] bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={formData.gradientEnd}
                  onChange={(e) => setFormData({ ...formData, gradientEnd: e.target.value })}
                  className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs font-mono text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Default Mode
            </label>
            <div className="flex gap-2.5">
              <label className="flex items-center gap-2 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] cursor-pointer">
                <input
                  type="radio"
                  name="defaultTheme"
                  value="light"
                  checked={formData.defaultTheme === "light"}
                  onChange={() => setFormData({ ...formData, defaultTheme: "light" })}
                  className="accent-[#4b1b63] h-3.5 w-3.5"
                />
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-medium">Light Theme (Standard)</span>
              </label>

              <label className="flex items-center gap-2 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] cursor-pointer">
                <input
                  type="radio"
                  name="defaultTheme"
                  value="dark"
                  checked={formData.defaultTheme === "dark"}
                  onChange={() => setFormData({ ...formData, defaultTheme: "dark" })}
                  className="accent-[#4b1b63] h-3.5 w-3.5"
                />
                <Moon className="h-3.5 w-3.5 text-purple-700" />
                <span className="font-medium">Dark Theme</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-[#f0ebf2]">
            <button
              type="submit"
              disabled={saving}
              className="button-primary-sm inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>Save Theme Tokens</span>
            </button>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#171219]">
            <Eye className="h-4 w-4 text-[#4b1b63]" />
            <span>Interactive Preview</span>
          </div>

          <div className="rounded-[5px] border border-[#e8e2e9] bg-[#faf8fb] p-5 space-y-4">
            <div>
              <span className="text-[11px] text-[#716876] font-semibold uppercase tracking-wider">Headline Gradient:</span>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#171219]">
                Broadcast software —{" "}
                <span
                  style={{
                    background: `linear-gradient(to right, ${formData.gradientStart}, ${formData.accentColor}, ${formData.gradientEnd})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  reimagined for modern media.
                </span>
              </h2>
            </div>

            <div>
              <span className="text-[11px] text-[#716876] font-semibold uppercase tracking-wider">Primary Button:</span>
              <div className="mt-2 flex gap-2.5">
                <button
                  style={{ backgroundColor: formData.primaryColor }}
                  className="rounded-[5px] px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-95 transition"
                >
                  Request live demo →
                </button>

                <button
                  style={{ borderColor: formData.accentColor, color: formData.accentColor }}
                  className="rounded-[5px] border bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#f8f5f9] transition"
                >
                  Explore Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
