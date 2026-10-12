"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Network,
  Activity,
  ShieldCheck,
  Bot,
} from "lucide-react";
import { HeroWaveNetwork } from "@/components/visual/HeroWaveNetwork";

interface HeroSectionProps {
  onRequestDemo: () => void;
}

const TYPEWRITER_PHRASES = [
  "converge.",
  "automate.",
  "scale.",
  "self-heal.",
  "comply.",
  "accelerate.",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestDemo }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    const speed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1900);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative flex min-h-[100vh] w-full items-center overflow-hidden border-b border-[var(--border-default)] bg-[var(--page-bg)] px-0 py-20 text-[var(--text-primary)]">
      
      {/* Background Animated Canvas Wave */}
      <HeroWaveNetwork className="z-0" />
      
      {/* Ambient Radial Backdrops */}
      <div className="pointer-events-none absolute -left-20 top-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-br from-purple-600/15 via-pink-500/15 to-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-[300px] w-[300px] sm:h-[550px] sm:w-[550px] rounded-full bg-gradient-to-tl from-cyan-500/15 via-emerald-500/15 to-indigo-600/10 blur-[130px]" />

      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-10">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center lg:col-span-5 lg:text-left z-10"
          >
            {/* Status Badge */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-[var(--surface-1)]/90 px-3 py-1 sm:px-4 sm:py-1.5 shadow-sm backdrop-blur-md dark:border-purple-500/40 dark:bg-[var(--surface-2)]/90">
              <span className="h-2 w-2 rounded-full bg-[#E11D72] animate-pulse shadow-[0_0_10px_#E11D72]" />
              <span className="font-sora text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                Two Products · One Telecom OS
              </span>
            </div>

            <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2rem,4.8vw,4.25rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-[var(--text-primary)]">
              <span className="block">AI-Powered <span className="text-[#E11D72]">ISP Management</span></span>
              <span className="block">Software & <span className="text-[#E11D72]">OSS/BSS</span> Platform</span>
              <span className="relative inline-block mt-2 min-h-[1.3em] align-top text-center lg:text-left">
                <span className="font-poppins font-normal text-[#E11D72] inline-block whitespace-nowrap">
                  {displayText}
                </span>
                <span className="inline-block w-[3px] h-[0.8em] ml-1 bg-[#E11D72] animate-pulse align-middle" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1 w-36 sm:w-48 rounded-full bg-[#E11D72] opacity-70" />
              </span>
            </h1>

            {/* Brand Tagline */}
            <p className="mt-3 font-poppins text-base sm:text-lg font-medium text-[var(--text-secondary)] lg:text-left text-center">
              Where Networks, Business, and AI Work Together.
            </p>

            {/* Description */}
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl font-inter text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)] lg:mx-0">
              <strong className="text-[var(--text-primary)]">Kashtrix</strong> is an AI-powered ISP management and telecom OSS/BSS platform that unifies billing, CRM, FreeRADIUS AAA, subscriber management, network operations, OLT and BNG automation, inventory, field operations, syslog and AI agents for ISPs, WISPs and FTTH operators.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 lg:justify-start">
              <button
                onClick={onRequestDemo}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-xl shadow-[#E11D72]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F02C82]"
              >
                <span className="whitespace-nowrap">Request Demo</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/platform"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-[var(--surface-2)]"
              >
                <span className="whitespace-nowrap">Explore Platform</span>
                <ArrowRight className="h-4 w-4 text-purple-500 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Live Telemetry Ticker Strip — wraps on mobile */}
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-2 font-inter text-[10px] sm:text-[11px] font-semibold text-[var(--text-secondary)] lg:justify-start">
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs backdrop-blur-sm">
                <Activity className="h-3 w-3 text-purple-500" />
                <span className="whitespace-nowrap">100K+ Syslog</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs backdrop-blur-sm">
                <Network className="h-3 w-3 text-cyan-500" />
                <span className="whitespace-nowrap">99.998% Uptime</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="whitespace-nowrap">CGNAT Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)]/80 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs backdrop-blur-sm">
                <Bot className="h-3 w-3 text-pink-500" />
                <span className="whitespace-nowrap">8 AI Agents</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Plain Hero Image — 100vh on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative w-full lg:col-span-7 flex items-center justify-center"
          >
            <Image
              src="/assets/herosection.png"
              alt="Kashtrix AI-powered ISP management and OSS/BSS platform dashboard"
              width={1920}
              height={1080}
              priority
              quality={95}
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
              className="w-full lg:h-[100vh] lg:w-auto lg:max-w-none object-contain drop-shadow-2xl transition-all duration-300"
            />
          </motion.div>

        </div>

        {/* SEO-accessible semantic summary for search engines */}
        <p className="sr-only">
          ISP management software for internet service providers, wireless ISPs (WISPs), FTTH and fiber operators. Kashtrix provides broadband billing, FreeRADIUS AAA, PPPoE authentication, subscriber CRM, GPON OLT management, BNG and BRAS automation, TR-069 ACS, network monitoring, MikroTik integration, inventory management, field operations, syslog CGNAT compliance logging and AI-powered network automation.
        </p>
      </div>
    </section>
  );
};
