"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { SERVICE_ACCENTS, type ServiceAccent } from "@/lib/marketing";

export function ProductScreenshotFrame({
  src,
  alt,
  accent,
  label,
  priority = false,
}: {
  src: string;
  alt: string;
  accent: ServiceAccent;
  label: string;
  priority?: boolean;
}) {
  const colors = SERVICE_ACCENTS[accent];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure className="group relative transition-transform duration-300 hover:-translate-y-1">
        <div
          className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-25 blur-3xl transition-opacity group-hover:opacity-40"
          style={{ background: colors.gradient }}
        />

        {/* Browser Window Chrome (Light & Dark Mode Compatible) */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-[#0d131f] p-1 sm:p-1.5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-[#090d16] px-2.5 py-2 sm:px-3.5 sm:py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
              <div className="ml-3 hidden sm:flex items-center gap-1.5 rounded-md bg-[var(--surface-1)] dark:bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)] dark:text-white/50 border border-[var(--border-default)] dark:border-white/5">
                <span style={{ color: colors.primary }}>https://</span>kashtrix.internal/{accent}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                style={{ backgroundColor: colors.soft, color: colors.primary }}
              >
                <span className="h-1.5 w-1.5 animate-ping rounded-full" style={{ backgroundColor: colors.primary }} />
                LIVE UI
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="grid h-6 w-6 place-items-center rounded bg-[var(--surface-3)] dark:bg-white/10 text-[var(--text-secondary)] dark:text-white/70 transition hover:text-[var(--text-primary)] dark:hover:text-white"
                title="Expand screenshot"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Full Image Viewport Frame */}
          <div
            onClick={() => setIsOpen(true)}
            className="group/img relative w-full cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-2)] dark:bg-slate-950 border border-[var(--border-default)] dark:border-transparent"
          >
            <Image
              src={src}
              alt={alt}
              width={1800}
              height={1125}
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover/img:scale-105"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 dark:from-slate-950/60 via-transparent to-transparent opacity-60 transition-opacity group-hover/img:opacity-30" />

            {/* Zoom hint hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/img:opacity-100 bg-slate-950/30 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
                <Maximize2 className="h-4 w-4" style={{ color: colors.primary }} /> Click to View Full UI
              </span>
            </div>
          </div>
        </div>

        <figcaption className="mt-3 flex items-center justify-between px-1">
          <span className="inline-flex items-center gap-2 font-inter text-xs font-medium text-[var(--text-secondary)]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.primary }} />
            {label}
          </span>
          <span className="font-mono text-[11px] text-[var(--text-tertiary)]">Kashtrix Operating System</span>
        </figcaption>
      </figure>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 dark:bg-slate-950/90 p-4 backdrop-blur-xl">
          <div className="relative max-h-[92vh] max-w-6xl w-full overflow-hidden rounded-2xl border border-[var(--border-default)] dark:border-white/20 bg-[var(--surface-1)] dark:bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-950 px-5 py-3 text-[var(--text-primary)] dark:text-white">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-[var(--text-primary)] dark:text-white/80">{label} — Full High-Res View</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-[var(--text-secondary)] dark:text-white/70 hover:bg-[var(--surface-3)] dark:hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto p-3 bg-[var(--surface-2)] dark:bg-slate-950">
              <Image src={src} alt={alt} width={1800} height={1200} className="w-full h-auto rounded-lg border border-[var(--border-default)] dark:border-white/10" quality={95} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
