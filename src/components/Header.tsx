"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, BookOpen, Building2, ChevronDown, Database,
  Menu, Monitor, PlaySquare, RadioTower, Satellite, Tv,
  Waypoints, X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const productColumns = [
  { title: "Broadcast Playout", href: "/broadcast-playout", icon: RadioTower, links: [["Suite Overview","/broadcast-playout"],["Master Control","/broadcast-playout/master-control-playout"],["Graphics & CG","/broadcast-playout/cg-editor"],["Automation & Scheduling","/broadcast-playout/scheduler"],["Monitoring & Multiview","/broadcast-playout/multiview"]] },
  { title: "StreamOps", href: "/streamops", icon: Waypoints, links: [["Live Ingest & Capture","/streamops/ingest-recording"],["Transcoding & ABR","/streamops/live-transcoding"],["DVB MPTS","/streamops/mpts-multiplexing"],["Recording & Archive","/streamops/recording-storage"],["Monitoring & QoS","/streamops/telemetry-snmp"]] },
  { title: "Kashtrix Studio", href: "/studio", icon: Monitor, links: [["Studio Overview","/studio"],["Studio Controller","/broadcast-playout/channel-controller"],["Multiviewer","/broadcast-playout/multiview"],["CG & Graphics","/broadcast-playout/cg-controller"],["Prompter","/broadcast-playout/prompter"]] },
  { title: "OSS / BSS", href: "/platform", icon: Database, links: [["Platform Overview","/platform"],["Operations Support","/oss"],["Business Support","/bss"],["Billing & Revenue","/billing"],["CRM & Subscriber Care","/crm"]] },
  { title: "Support & Resources", href: "/resources", icon: BookOpen, links: [["Resources","/resources"],["Security","/security"],["Compliance","/compliance"],["Contact","/contact"],["Request Demo","/request-demo"]] },
] as const;

const solutionColumns = [
  { title:"Broadcast Operations", links:[["24/7 Linear Playout","/broadcast-playout"],["Newsroom & Graphics","/broadcast-playout/nrcs"],["Live Production","/studio"],["Media Ingest","/broadcast-playout/ingest-server"]] },
  { title:"Media Infrastructure", links:[["Live Transcoding","/streamops/live-transcoding"],["DVB Multiplexing","/streamops/mpts-multiplexing"],["Recording & Archive","/streamops/ingest-recording"],["IP Distribution","/streamops/networking-ha"]] },
  { title:"Telecom Operations", links:[["OSS / BSS Platform","/platform"],["Network Management","/network-management"],["Network Automation","/network-automation"],["Inventory & Field Ops","/inventory"]] },
] as const;

const industries = [
  [Tv,"Broadcasters","TV, radio and linear channels","/broadcast-playout"],
  [Satellite,"Telecom Operators","IPTV, broadband and service operations","/platform"],
  [PlaySquare,"OTT & Streaming","Live and on-demand delivery","/streamops"],
  [Building2,"Studios & Production","Live production and graphics","/studio"],
] as const;

type OpenMenu = "products" | "solutions" | "industries" | "mobile" | null;

export function Header() {
  const [open, setOpen] = useState<OpenMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggle = (name: OpenMenu) => setOpen((current) => current === name ? null : name);

  const isStickyActive = scrolled || Boolean(open);

  return (
    <header
      className={`site-header sticky top-0 z-[80] transition-colors duration-200 ${
        isStickyActive
          ? "is-sticky bg-white/50 dark:bg-[#12071a]/50 backdrop-blur-md border-b border-[#e9e5ea]/50 dark:border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-shell flex h-[68px] items-center justify-between gap-5">
        <Link href="/" aria-label="Kashtrix home" className="relative z-[82] flex items-center">
          <Image src="/logo/wide-logo.png" width={202} height={64} alt="Kashtrix" className="navbar-logo h-8 w-auto object-contain transition duration-200 dark:brightness-0 dark:invert" priority />
        </Link>

        <nav aria-label="Primary" className="relative z-[82] hidden items-center gap-1 lg:flex">
          <button onClick={()=>toggle("products")} className={`nav-trigger ${open==="products"?"is-active":""}`}>Products <ChevronDown className={`h-3.5 w-3.5 transition ${open==="products"?"rotate-180":""}`}/></button>
          <button onClick={()=>toggle("solutions")} className={`nav-trigger ${open==="solutions"?"is-active":""}`}>Solutions <ChevronDown className={`h-3.5 w-3.5 transition ${open==="solutions"?"rotate-180":""}`}/></button>
          <button onClick={()=>toggle("industries")} className={`nav-trigger ${open==="industries"?"is-active":""}`}>Industries <ChevronDown className={`h-3.5 w-3.5 transition ${open==="industries"?"rotate-180":""}`}/></button>
          <Link className="nav-link" href="/resources">Resources</Link>
          <Link className="nav-link" href="/about">Company</Link>
        </nav>

        <div className="relative z-[82] hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link className="button-secondary !min-h-0 !px-3.5 !py-2" href="/contact">Contact sales</Link>
          <Link className="button-primary !min-h-0 !px-3.5 !py-2" href="/request-demo">Request demo <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="relative z-[82] flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button className="border border-[#e6e0e8] dark:border-white/10 p-2 cursor-pointer" aria-label="Open menu" onClick={()=>toggle("mobile")}>{open==="mobile"?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}</button>
        </div>
      </div>

      {open && open !== "mobile" && <button aria-label="Close menu" onClick={()=>setOpen(null)} className="fixed inset-x-0 bottom-0 top-[68px] z-[79] bg-[#f8f6f8]/96 dark:bg-[#0d0416]/80 backdrop-blur-md cursor-pointer" />}

      {open === "products" && <div className="mega-menu-shell">
        <div className="mega-menu-grid mega-menu-products">
          {productColumns.map((column)=>{const Icon=column.icon;return <div key={column.title} className="mega-column"><Link href={column.href} className="mega-heading"><Icon className="h-5 w-5"/><span>{column.title}</span></Link><div className="mt-3 grid gap-1">{column.links.map(([label,href])=><Link key={href} href={href} className="mega-link">{label}</Link>)}</div></div>})}
        </div>
      </div>}

      {open === "solutions" && <div className="mega-menu-shell"><div className="mega-menu-grid grid-cols-3">{solutionColumns.map(col=><div key={col.title} className="mega-column"><p className="mega-heading-text">{col.title}</p><div className="mt-3 grid gap-1">{col.links.map(([label,href])=><Link key={href} href={href} className="mega-link">{label}</Link>)}</div></div>)}</div></div>}

      {open === "industries" && <div className="mega-menu-shell"><div className="grid grid-cols-4 gap-px bg-[#ece6ed] dark:bg-white/10">{industries.map(([Icon,title,text,href])=><Link href={href} key={title} className="swipe-card bg-white dark:bg-[#170724] p-6 transition hover:bg-[#fff9fc] dark:hover:bg-[#230d35]"><Icon className="h-5 w-5 text-[#6f2b8f] dark:text-[#c084fc]"/><h3 className="mt-4 text-sm font-semibold text-[#171219] dark:text-white">{title}</h3><p className="mt-2 text-xs leading-5 text-[#756e77] dark:text-[#bdaec4]">{text}</p></Link>)}</div></div>}

      {open === "mobile" && <div className="swipe-card absolute inset-x-0 top-[68px] z-[81] border-t border-[#e9e5ea] dark:border-white/10 bg-white dark:bg-[#170724] p-5 shadow-[0_24px_60px_rgba(35,18,42,.12)] lg:hidden"><div className="grid gap-1 text-sm font-medium">{[["Broadcast Playout","/broadcast-playout"],["StreamOps","/streamops"],["Kashtrix Studio","/studio"],["OSS / BSS","/platform"],["Resources","/resources"],["Company","/about"]].map(([label,href])=><Link key={href} href={href} className="border-b border-[#eee9ef] dark:border-white/10 py-3 text-[#171219] dark:text-white">{label}</Link>)}<Link href="/request-demo" className="mt-3 bg-[#4b1b63] dark:bg-[#6f2b8f] px-4 py-3 text-center text-white">Request demo</Link></div></div>}
    </header>
  );
}
