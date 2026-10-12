"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  Mail,
  PhoneCall,
  Sparkles,
  BrainCircuit,
  Palette,
  Menu,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Lock,
  User,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Settings2,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/chat", label: "Live Support & AI", icon: MessageSquare },
  { href: "/admin/webmail", label: "Webmail", icon: Mail },
  { href: "/admin/inquiries", label: "Contact Inquiries", icon: Inbox },
  { href: "/admin/email", label: "Email Setup (SMTP)", icon: Settings2 },
  { href: "/admin/contact", label: "Website Contacts", icon: PhoneCall },
  { href: "/admin/knowledge", label: "AI Knowledge Base", icon: BrainCircuit },
  { href: "/admin/ai", label: "Gemini AI Config", icon: Sparkles },
  { href: "/admin/theme", label: "Theme Customization", icon: Palette },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>(null);
  const [escalatedCount, setEscalatedCount] = useState(0);

  // Login form state
  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        const data = await res.json();
        if (data.ok && data.authenticated) {
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    }
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    if (!isAuthenticated) return;
    async function checkLiveChats() {
      try {
        const res = await fetch("/api/admin/chat?status=ESCALATED");
        const data = await res.json();
        if (data.ok) {
          setEscalatedCount(data.totalEscalated || 0);
        }
      } catch {
        // ignore
      }
    }
    checkLiveChats();
    const interval = setInterval(checkLiveChats, 8000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUser,
          password: loginPass,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setLoginPass("");
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#faf9fb] flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-[#716876]">
          <Loader2 className="h-4 w-4 animate-spin text-[#4b1b63]" />
          <span>Loading admin workspace...</span>
        </div>
      </div>
    );
  }

  // Login View when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf9fb] text-[#171219] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-[5px] border border-[#e8e2e9] bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,8,30,0.06)]">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/wide-logo.png"
                alt="Kashtrix"
                width={150}
                height={42}
                className="mx-auto h-7 w-auto object-contain"
                priority
              />
            </Link>
            <h1 className="mt-4 text-lg font-bold text-[#171219] tracking-tight">Admin Portal</h1>
            <p className="mt-1 text-xs text-[#716876]">Please sign in to access administration controls</p>
          </div>

          {loginError && (
            <div className="mt-4 flex items-center gap-2 rounded-[5px] border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4a4250] mb-1.5">Username or Email</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="admin or support@kashtrix.com"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a4250] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#4b1b63] py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#6f2b8f] disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Lock className="h-3.5 w-3.5" />}
              <span>{loginLoading ? "Verifying..." : "Sign In to Admin"}</span>
            </button>
          </form>

          <div className="mt-5 border-t border-[#f0ebf2] pt-4 text-center">
            <Link href="/" className="text-xs text-[#716876] hover:text-[#4b1b63] transition font-medium">
              ← Return to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout - Light Theme Matching Frontend
  return (
    <div className="min-h-screen bg-[#faf9fb] text-[#171219] antialiased flex flex-col">
      {/* Clean Admin Top Navbar - Solid White */}
      <header className="admin-header sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#e8e2e9] bg-white px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-[5px] p-1.5 text-[#716876] hover:bg-[#f4eff6] hover:text-[#171219] md:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-[5px] p-1.5 text-[#716876] hover:bg-[#f4eff6] hover:text-[#171219] md:flex items-center justify-center transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-bold text-[#171219] tracking-tight text-sm">Kashtrix</span>
            <span className="text-[11px] font-semibold text-[#4b1b63] bg-[#f5eff8] px-2 py-0.5 rounded-[4px] border border-[#e8dcef]">
              Admin
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5">
          {escalatedCount > 0 && (
            <Link
              href="/admin/chat"
              className="flex items-center gap-1.5 rounded-[4px] border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-semibold text-[#b30f5f] animate-pulse transition hover:bg-pink-100"
            >
              <MessageSquare className="h-3 w-3 text-[#d63474]" />
              <span>Live Support ({escalatedCount})</span>
            </Link>
          )}

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1 text-xs font-semibold text-[#49434c] hover:text-[#b30f5f] hover:bg-[#fff5fa] transition"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <div className="h-4 w-[1px] bg-[#e8e2e9]" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-semibold text-red-650 hover:bg-red-50 transition"
            title="Sign out of admin"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar - Clean Light UI matching Website UI Typography (.84rem, font-semibold, #49434c) */}
        <aside
          className={`hidden md:flex flex-col border-r border-[#e8e2e9] bg-white transition-all duration-200 ${
            collapsed ? "w-16" : "w-56"
          }`}
        >
          <div className="flex flex-1 flex-col justify-between p-2">
            <nav className="space-y-0.5 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ color: isActive ? "#ffffff" : undefined }}
                    className={`group flex items-center justify-between rounded-[4px] px-2.5 py-2 text-[13px] font-semibold transition ${
                      isActive
                        ? "bg-[#4b1b63] !text-white shadow-xs"
                        : "text-[#342e39] hover:bg-[#fff5fa] hover:text-[#b30f5f]"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 shrink-0 transition ${isActive ? "!text-white text-white" : "text-[#7b6f82] group-hover:text-[#b30f5f]"}`} />
                      {!collapsed && (
                        <span
                          style={{ color: isActive ? "#ffffff" : undefined }}
                          className={isActive ? "!text-white text-white font-semibold" : "text-inherit"}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                    {item.href === "/admin/chat" && escalatedCount > 0 && !collapsed && (
                      <span className="rounded-full bg-[#ec1778] px-1.5 py-0.2 text-[10px] font-bold text-white animate-pulse">
                        {escalatedCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-[#f0ebf2] pt-3 px-2">
              {!collapsed ? (
                <div className="text-[11px] text-[#8e8593] flex items-center justify-between">
                  <span>Kashtrix Systems</span>
                  <span className="font-mono text-[10px]">v4.0</span>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
            <div className="relative z-50 w-64 bg-white border-r border-[#e8e2e9] p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e8e2e9]">
                  <span className="font-bold text-[#171219] text-sm">Kashtrix Admin</span>
                  <button onClick={() => setMobileOpen(false)} className="rounded-[4px] p-1 text-[#716876] hover:text-[#171219]">
                    ✕
                  </button>
                </div>
                <nav className="mt-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ color: isActive ? "#ffffff" : undefined }}
                        className={`flex items-center justify-between rounded-[4px] px-2.5 py-2 text-[13px] font-semibold transition ${
                          isActive
                            ? "bg-[#4b1b63] !text-white shadow-xs"
                            : "text-[#342e39] hover:bg-[#fff5fa] hover:text-[#b30f5f]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? "!text-white text-white" : "text-[#7b6f82]"}`} />
                          <span
                            style={{ color: isActive ? "#ffffff" : undefined }}
                            className={isActive ? "!text-white text-white font-semibold" : "text-inherit"}
                          >
                            {item.label}
                          </span>
                        </div>
                        {item.href === "/admin/chat" && escalatedCount > 0 && (
                          <span className="rounded-full bg-[#ec1778] px-1.5 py-0.2 text-[10px] font-bold text-white">
                            {escalatedCount}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[4px] border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area - 8xl / Full Width up to 1800px */}
        <main className="flex-1 overflow-y-auto bg-[#faf9fb] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1800px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
