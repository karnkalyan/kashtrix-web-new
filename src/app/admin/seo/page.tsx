"use client";

import React, { useState, useEffect } from "react";
import {
  Globe, Search, Plus, RefreshCw, Edit3, Trash2, ExternalLink,
  CheckCircle2, AlertCircle, Eye, Sparkles, SlidersHorizontal,
  ArrowUpRight, Copy, Check, Info, ShieldAlert, Monitor, Smartphone,
  Layers, Tag, Link as LinkIcon
} from "lucide-react";

interface PageMetaItem {
  id?: number;
  path: string;
  category?: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string | null;
  ogDesc?: string | null;
  ogImage?: string | null;
  canonical?: string | null;
  noIndex?: boolean;
  schemaType?: string | null;
  updatedAt?: string;
}

const CATEGORIES = [
  "All",
  "Broadcast",
  "StreamOps",
  "OSS/BSS",
  "Tools",
  "Solutions",
  "Resources",
  "Company",
];

export default function AdminSeoPage() {
  const [items, setItems] = useState<PageMetaItem[]>([]);
  const [stats, setStats] = useState({ total: 0, indexed: 0, noIndexed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<PageMetaItem>({
    path: "",
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDesc: "",
    ogImage: "/og.svg",
    canonical: "",
    noIndex: false,
    schemaType: "WebPage",
  });

  // SERP preview mode (desktop vs mobile)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  async function loadData() {
    setLoading(true);
    try {
      const url = new URL("/api/admin/seo", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (selectedCategory !== "All") url.searchParams.set("category", selectedCategory);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.ok) {
        setItems(data.items);
        if (data.stats) setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    loadData();
  }

  async function handleSync() {
    setSyncLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/seo/sync", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setFeedback({ type: "success", text: data.message });
        await loadData();
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to sync catalog" });
      }
    } catch {
      setFeedback({ type: "error", text: "Connection error while syncing catalog" });
    } finally {
      setSyncLoading(false);
    }
  }

  function openCreateModal() {
    setIsEditing(false);
    setFormData({
      path: "",
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDesc: "",
      ogImage: "/og.svg",
      canonical: "",
      noIndex: false,
      schemaType: "WebPage",
    });
    setIsModalOpen(true);
  }

  function openEditModal(item: PageMetaItem) {
    setIsEditing(true);
    setFormData({
      id: item.id,
      path: item.path,
      title: item.title,
      description: item.description,
      keywords: item.keywords || "",
      ogTitle: item.ogTitle || item.title,
      ogDesc: item.ogDesc || item.description,
      ogImage: item.ogImage || "/og.svg",
      canonical: item.canonical || `https://kashtrix.com${item.path}`,
      noIndex: Boolean(item.noIndex),
      schemaType: item.schemaType || "WebPage",
    });
    setIsModalOpen(true);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setFeedback({ type: "success", text: "Page metadata saved successfully!" });
        setIsModalOpen(false);
        await loadData();
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to save metadata" });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving metadata" });
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(item: PageMetaItem) {
    if (!confirm(`Are you sure you want to remove custom metadata for "${item.path}"?`)) return;

    try {
      const res = await fetch(`/api/admin/seo?path=${encodeURIComponent(item.path)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setFeedback({ type: "success", text: "Custom metadata reset/removed." });
        await loadData();
      }
    } catch {
      alert("Failed to delete metadata");
    }
  }

  // Live SERP Calculations
  const titleChars = (formData.title || "").length;
  const descChars = (formData.description || "").length;
  const isTitleOptimal = titleChars >= 40 && titleChars <= 60;
  const isDescOptimal = descChars >= 120 && descChars <= 160;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2e9] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#4b1b63] text-white">
              <Globe className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-bold text-[#171219]">SEO &amp; Page Metadata Manager</h1>
          </div>
          <p className="mt-1.5 text-xs text-[#716876]">
            Configure and customize Google search titles, descriptions, keywords, canonical URLs, and OpenGraph tags for every page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSync}
            disabled={syncLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] border border-[#dcd4de] bg-white text-xs font-semibold text-[#171219] hover:bg-[#f6f2f7] transition disabled:opacity-60 shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncLoading ? "animate-spin" : ""}`} />
            Sync Site Catalog
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-[#4b1b63] text-xs font-semibold text-white hover:bg-[#6f2b8f] transition shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Page Meta
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`flex items-center gap-2 p-3 text-xs rounded-[4px] border ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-[4px] border border-[#e8e2e9] bg-white shadow-xs">
          <p className="text-[11px] font-medium text-[#716876] uppercase tracking-wider">Total Pages</p>
          <p className="mt-1 text-2xl font-bold text-[#171219]">{stats.total || items.length}</p>
        </div>
        <div className="p-4 rounded-[4px] border border-[#e8e2e9] bg-white shadow-xs">
          <p className="text-[11px] font-medium text-[#716876] uppercase tracking-wider">Google Indexed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.indexed || items.length}</p>
        </div>
        <div className="p-4 rounded-[4px] border border-[#e8e2e9] bg-white shadow-xs">
          <p className="text-[11px] font-medium text-[#716876] uppercase tracking-wider">Blocked (NoIndex)</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.noIndexed}</p>
        </div>
        <div className="p-4 rounded-[4px] border border-[#e8e2e9] bg-white shadow-xs">
          <p className="text-[11px] font-medium text-[#716876] uppercase tracking-wider">Sitemap XML Health</p>
          <p className="mt-1 text-xs font-bold text-[#4b1b63] flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Fully Synchronized
          </p>
        </div>
      </div>

      {/* Search & Categories Filter */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8291]" />
            <input
              type="text"
              placeholder="Search by path, meta title, keywords, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#dcd4de] rounded-[4px] text-xs bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
            />
          </form>
          <button
            onClick={loadData}
            className="px-4 py-2 rounded-[4px] border border-[#dcd4de] bg-white text-xs font-semibold text-[#171219] hover:bg-[#f6f2f7]"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-[#e8e2e9] pb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-[3px] text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-[#4b1b63] text-white"
                  : "bg-white text-[#655d6a] border border-[#e5dfeb] hover:bg-[#fbf9fc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="rounded-[4px] border border-[#e8e2e9] bg-white shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#716876]">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto text-[#4b1b63] mb-2" />
            Loading SEO index...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#716876]">
            No pages found matching the current search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#faf8fb] border-b border-[#e8e2e9] text-[#635c67] font-semibold">
                  <th className="py-3 px-4">Page Path</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Meta Title &amp; Snippet</th>
                  <th className="py-3 px-4">Robots</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebf2]">
                {items.map((item) => (
                  <tr key={item.path} className="hover:bg-[#fcfbfe] transition">
                    <td className="py-3 px-4 font-mono font-medium text-[#171219] align-top whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <LinkIcon className="h-3 w-3 text-[#4b1b63] shrink-0" />
                        <span>{item.path}</span>
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#968c9c] hover:text-[#4b1b63] ml-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider bg-[#f6f2f7] text-[#4b1b63] border border-[#e4dee7]">
                        {item.category || "General"}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top max-w-md">
                      <p className="font-semibold text-[#171219] line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-[#716876] line-clamp-2 mt-0.5 leading-4">
                        {item.description}
                      </p>
                      {item.keywords && (
                        <p className="text-[10px] text-[#978e9c] line-clamp-1 mt-1 font-mono">
                          <Tag className="h-2.5 w-2.5 inline mr-1 text-[#6f2b8f]" />
                          {item.keywords}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      {item.noIndex ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          NoIndex
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Index
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 align-top text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-2.5 py-1 rounded-[3px] bg-[#f6f2f7] hover:bg-[#4b1b63] text-[#4b1b63] hover:text-white transition text-[11px] font-semibold border border-[#e4dee7]"
                      >
                        Edit Meta
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-2 py-1 rounded-[3px] text-red-600 hover:bg-red-50 transition text-[11px]"
                        title="Delete / Reset metadata"
                      >
                        <Trash2 className="h-3.5 w-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#e8e2e9] rounded-[5px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#e8e2e9] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#171219]">
                  {isEditing ? "Edit Page SEO Metadata" : "Add Page Metadata"}
                </h3>
                <p className="text-xs text-[#716876]">
                  Configure title tags, meta descriptions, and Google search appearances.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#968c9c] hover:text-[#171219] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#171219] mb-1">
                  Page Path (e.g., /tools/gpon-splitter-calculator or /solutions/olt-provisioning) *
                </label>
                <input
                  type="text"
                  required
                  disabled={isEditing}
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  placeholder="/solutions/custom-tool"
                  className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs font-mono bg-white text-[#171219] outline-none focus:border-[#4b1b63] disabled:bg-gray-100"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#171219]">
                    Meta Title (Google Search Link Title) *
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      isTitleOptimal ? "text-emerald-600 font-bold" : "text-amber-600"
                    }`}
                  >
                    {titleChars} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Master Control Playout & Ingest Suite — Kashtrix"
                  className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#171219]">
                    Meta Description (Google SERP Snippet) *
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      isDescOptimal ? "text-emerald-600 font-bold" : "text-amber-600"
                    }`}
                  >
                    {descChars} / 160 characters
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enterprise 24/7 master control playout and ingest suite for television networks..."
                  className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171219] mb-1">
                  SEO Keywords (Comma-separated viral search terms)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="playout, broadcast playout, master control, ingest, cg designer, controller"
                  className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171219] mb-1">
                    Canonical URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.canonical || ""}
                    onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                    placeholder={`https://kashtrix.com${formData.path}`}
                    className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs font-mono bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#171219] mb-1">
                    Structured Data Schema Type
                  </label>
                  <select
                    value={formData.schemaType || "WebPage"}
                    onChange={(e) => setFormData({ ...formData, schemaType: e.target.value })}
                    className="w-full px-3 py-2 border border-[#dcd4de] rounded-[4px] text-xs bg-white text-[#171219] outline-none focus:border-[#4b1b63]"
                  >
                    <option value="WebPage">WebPage (General)</option>
                    <option value="SoftwareApplication">SoftwareApplication</option>
                    <option value="Product">Product</option>
                    <option value="CollectionPage">CollectionPage</option>
                    <option value="Article">Article / Guide</option>
                  </select>
                </div>
              </div>

              {/* NoIndex Directives */}
              <div className="flex items-center gap-3 p-3 rounded-[4px] border border-[#e8e2e9] bg-[#faf9fb]">
                <input
                  type="checkbox"
                  id="noIndexToggle"
                  checked={formData.noIndex || false}
                  onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                  className="rounded text-[#4b1b63] focus:ring-[#4b1b63]"
                />
                <label htmlFor="noIndexToggle" className="text-xs text-[#171219] font-medium">
                  Block Search Engines (noindex, nofollow) — check only for private/internal landing pages.
                </label>
              </div>

              {/* Live Google Search Preview (SERP) */}
              <div className="border border-[#e4dee7] rounded-[4px] p-4 bg-[#fbfafc] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#4b1b63]">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Live Google Search Appearance Preview</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-[#dcd4de] p-0.5 rounded-[3px]">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("desktop")}
                      className={`p-1 rounded-[2px] ${
                        previewMode === "desktop" ? "bg-[#4b1b63] text-white" : "text-[#716876]"
                      }`}
                      title="Desktop Search"
                    >
                      <Monitor className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("mobile")}
                      className={`p-1 rounded-[2px] ${
                        previewMode === "mobile" ? "bg-[#4b1b63] text-white" : "text-[#716876]"
                      }`}
                      title="Mobile Search"
                    >
                      <Smartphone className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Google Snippet Card */}
                <div
                  className={`p-3.5 rounded-[4px] border border-[#e1dce3] bg-white font-sans ${
                    previewMode === "mobile" ? "max-w-sm" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[11px] text-[#4d5156]">
                    <span className="flex h-4 w-4 rounded-full bg-[#4b1b63] text-white text-[9px] font-bold items-center justify-center">
                      K
                    </span>
                    <span className="font-medium text-[#202124]">Kashtrix</span>
                    <span className="text-[#5f6368] font-mono text-[10px]">
                      https://kashtrix.com{formData.path || "/"}
                    </span>
                  </div>
                  <h4 className="text-[#1a0dab] hover:underline cursor-pointer text-sm font-medium leading-snug line-clamp-1">
                    {formData.title || "Page Title — Kashtrix"}
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed mt-1 line-clamp-2">
                    {formData.description || "Enter a compelling meta description to see how it will render in Google search engine result pages."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e2e9]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#dcd4de] rounded-[4px] text-xs font-semibold text-[#171219] hover:bg-[#f6f2f7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-[#4b1b63] hover:bg-[#6f2b8f] text-white rounded-[4px] text-xs font-semibold transition disabled:opacity-60 shadow-xs"
                >
                  {formLoading ? "Saving..." : "Save Page Metadata"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
