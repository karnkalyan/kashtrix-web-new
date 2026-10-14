"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const groups = [
  { title: "Products", links: [["Broadcast Playout","/broadcast-playout"],["StreamOps","/streamops"],["Kashtrix Studio","/studio"],["OSS / BSS Platform","/platform"],["Carrier Syslog","/syslog"]] },
  { title: "Solutions", links: [["Master Control","/broadcast-playout/master-control-playout"],["Live Transcoding","/streamops/live-transcoding"],["ISP Solutions Hub","/solutions"],["Network Automation","/network-automation"],["OLT Provisioning","/solutions/olt-provisioning"]] },
  { title: "OSS / BSS", links: [["Operations Support","/oss"],["Business Support","/bss"],["Billing & Revenue","/billing"],["CRM & Subscriber Care","/crm"],["Free ISP Tools (17)","/tools"]] },
  { title: "Company", links: [["About Us","/about"],["Resources & Guides","/resources"],["Documentation PDF","/documentation"],["Compare vs Splynx","/compare/kashtrix-vs-splynx"],["Pricing & TCO","/pricing"],["Contact","/contact"]] },
] as const;

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-[#38144c] bg-[#160724] text-white">
      <div className="container-shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.85fr]">
          <div>
            <Image src="/logo/wide-logo.png" alt="Kashtrix" width={220} height={64} className="footer-logo h-8 w-auto object-contain brightness-0 invert transition duration-200" />
            <p className="mt-5 max-w-md text-sm leading-7 text-[#b8b1ba]">Broadcast, live media and telecom software for operators who need clear control, dependable timing and visible system state.</p>
            <div className="mt-4 flex flex-col gap-1 text-xs text-[#d2ccd4]">
              <span className="text-[#a89fa9]">Direct Inquiries:</span>
              <a href="mailto:support@kashtrix.com" className="font-semibold text-[#c084fc] hover:underline">support@kashtrix.com</a>
            </div>
            <Link href="/request-demo" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c084fc] hover:text-white transition">Discuss your deployment <ArrowUpRight className="h-4 w-4" /></Link>
            <div className="mt-6 flex gap-3 text-[#968e99]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" role="img" aria-label="LinkedIn">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 2-3Z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" role="img" aria-label="YouTube">
                <rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" />
              </svg>
              <span className="text-xs">X</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">{groups.map(group => <div key={group.title}><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#a090ab]">{group.title}</p><div className="mt-4 grid gap-3">{group.links.map(([label,href]) => <Link key={href} href={href} className="text-sm text-[#d2ccd4] hover:text-[#c084fc] transition">{label}</Link>)}</div></div>)}</div>
        </div>
        <div className="mt-11 grid gap-4 border-t border-white/10 pt-5 text-xs text-[#a090ab] sm:grid-cols-[1fr_auto] sm:items-center"><span>© 2026 Kashtrix. All rights reserved.</span><span className="flex flex-wrap gap-4"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/contact" className="hover:text-white">Contact</Link><Link href="/admin" className="text-[#c084fc] hover:text-white transition">Admin Portal</Link><span className="text-[#c084fc] font-medium">kashtrix.com</span></span></div>
      </div>
    </footer>
  );
}
