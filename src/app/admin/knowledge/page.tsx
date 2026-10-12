"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  BrainCircuit,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface KnowledgeItem {
  id: number;
  category: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "ALL",
  "Broadcast Playout",
  "StreamOps",
  "Kashtrix Studio",
  "Telecom OSS/BSS",
  "Architecture & Support",
];

export default function AiKnowledgeAdminPage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Broadcast Playout",
    content: "",
    isActive: true,
  });

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function fetchKnowledge() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/knowledge");
      const data = await res.json();
      if (data.ok) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Failed to load knowledge items:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchKnowledge();
  }, []);

  function openCreateModal() {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Broadcast Playout",
      content: "",
      isActive: true,
    });
    setIsModalOpen(true);
  }

  function openEditModal(item: KnowledgeItem) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setStatusMsg(null);

    try {
      const url = "/api/admin/knowledge";
      const method = editingItem ? "PUT" : "POST";
      const body = editingItem ? { id: editingItem.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.ok) {
        setStatusMsg({
          type: "success",
          text: editingItem ? "Knowledge item updated successfully" : "New knowledge chunk added",
        });
        setIsModalOpen(false);
        fetchKnowledge();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Network error" });
    }
  }

  async function toggleActive(item: KnowledgeItem) {
    try {
      const res = await fetch("/api/admin/knowledge", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isActive: !item.isActive }),
      });
      const data = await res.json();
      if (data.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isActive: !item.isActive } : i))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  }

  async function deleteItem(id: number) {
    if (!confirm("Are you sure you want to remove this knowledge chunk?")) return;
    try {
      const res = await fetch(`/api/admin/knowledge?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  }

  const filtered = items.filter((item) => {
    const matchesCat = selectedCat === "ALL" || item.category === selectedCat;
    const s = search.toLowerCase();
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(s) ||
      item.content.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            AI Knowledge Base
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Manage technical documentation strictly injected into the website assistant.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCreateModal}
            className="button-primary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Item</span>
          </button>

          <button
            onClick={fetchKnowledge}
            className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
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

      {/* Filter Bar */}
      <div className="flex flex-col gap-3 rounded-[5px] border border-[#e8e2e9] bg-white p-3 shadow-[0_2px_8px_rgba(20,8,30,0.03)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8a7f91]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge topics..."
            className="w-full rounded-[4px] border border-[#dcd4e0] bg-white pl-8 pr-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-[5px] px-2.5 py-1 text-xs font-semibold transition whitespace-nowrap ${
                selectedCat === cat
                  ? "button-primary-sm !min-h-0 !py-1 !px-2.5 !text-xs"
                  : "button-secondary-sm !min-h-0 !py-1 !px-2.5 !text-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#716876]">Loading knowledge items...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-12 text-center text-xs text-[#716876]">
          No knowledge articles found. Click &quot;Add Item&quot; to expand the assistant&apos;s product training.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-[5px] border p-4 transition flex flex-col justify-between ${
                item.isActive
                  ? "border-[#e8e2e9] bg-white hover:border-[#4b1b63] shadow-[0_2px_8px_rgba(20,8,30,0.03)]"
                  : "border-[#e8e2e9] bg-[#faf8fb] opacity-60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-[4px] bg-[#f5eff8] px-2 py-0.5 text-[10px] font-semibold text-[#4b1b63] border border-[#e8dcef]">
                      {item.category}
                    </span>
                    <h3 className="mt-1.5 text-sm font-bold text-[#171219] tracking-tight">{item.title}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleActive(item)}
                      className="p-1 text-[#716876] hover:text-[#171219]"
                      title={item.isActive ? "Deactivate" : "Activate"}
                    >
                      {item.isActive ? (
                        <ToggleRight className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-zinc-400" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="rounded-[4px] p-1 text-[#4b1b63] hover:bg-[#f5eff8]"
                      title="Edit Item"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded-[4px] p-1 text-red-600 hover:bg-red-50"
                      title="Delete Item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2.5 text-xs leading-relaxed text-[#4a4250] whitespace-pre-wrap line-clamp-5">
                  {item.content}
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#f0ebf2] flex items-center justify-between text-[10px] text-[#8e8593]">
                <span>Status: {item.isActive ? "Active (Included in context)" : "Inactive"}</span>
                <span>ID: #{item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal - Clean Light Theme, Max 5px Radius */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-[5px] border border-[#e8e2e9] bg-white p-6 shadow-xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0ebf2] pb-3">
              <h2 className="text-sm font-bold text-[#171219]">
                {editingItem ? "Edit Knowledge Item" : "Add Knowledge Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-[4px] p-1 text-[#716876] hover:bg-[#f4eff6] hover:text-[#171219]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1.5">Item Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master Control Playout: NDI 6 Routing & Redundancy"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#4a4250] block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1.5 text-xs text-[#171219] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                  >
                    <option value="Broadcast Playout">Broadcast Playout</option>
                    <option value="StreamOps">StreamOps</option>
                    <option value="Kashtrix Studio">Kashtrix Studio</option>
                    <option value="Telecom OSS/BSS">Telecom OSS/BSS</option>
                    <option value="Architecture & Support">Architecture & Support</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4a4250] block mb-1">Status</label>
                  <label className="flex items-center gap-2 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="accent-[#4b1b63] h-3.5 w-3.5"
                    />
                    <span className="font-medium text-xs">Active in Context</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                  Knowledge Article Content (Technical Specifications)
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter detailed facts, capabilities, supported standards, video codecs, and specifications..."
                  className="w-full resize-y rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs leading-relaxed text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-[#f0ebf2]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="button-secondary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-primary-sm !min-h-0 !py-1.5 !px-3.5 !text-xs font-semibold"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
