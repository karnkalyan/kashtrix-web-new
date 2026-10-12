"use client";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (!mounted) return <span className="block h-9 w-9" aria-hidden="true" />;
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      aria-pressed={dark}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-link)] shadow-[var(--shadow-xs)] transition-colors hover:border-[var(--border-brand)] hover:bg-[var(--surface-purple)] hover:text-[var(--text-accent)]"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
