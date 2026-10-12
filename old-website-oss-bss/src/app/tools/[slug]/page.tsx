import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TOOLS_DETAIL_MAP, ALL_TOOL_SLUGS } from "@/lib/toolsData";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Wrench, ArrowRight, HelpCircle, CheckCircle2, Calculator, BookOpen, Layers } from "lucide-react";

export async function generateStaticParams() {
  return ALL_TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_DETAIL_MAP[slug];
  if (!tool) return {};

  return constructMetadata({
    title: tool.title,
    description: tool.description,
    canonical: `https://kashtrix.com/tools/${tool.slug}`,
  });
}

export default async function IndividualToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_DETAIL_MAP[slug];

  if (!tool) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Free ISP Tools", href: "/tools" },
    { name: tool.name, href: `/tools/${tool.slug}` },
  ]);

  const faqSchema = getFAQSchema(tool.faqs);

  const otherTools = Object.values(TOOLS_DETAIL_MAP)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)] min-h-screen">
        {/* Header Hero */}
        <section className="pt-20 pb-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6 font-mono">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-[var(--text-primary)]">Free ISP Tools</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">{tool.name}</span>
            </nav>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
                {tool.category} · {tool.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              {tool.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {tool.description}
            </p>
          </div>
        </section>

        {/* Explainer Section */}
        <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-2)]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold uppercase text-[var(--text-link)] font-sora">
                  <BookOpen className="w-4 h-4" /> Technical Explainer
                </div>
                <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                  {tool.explainerHeading}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
                  {tool.explainerText}
                </p>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-brand)] bg-[var(--surface-purple)] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] font-sora">
                  <CheckCircle2 className="w-5 h-5 text-[#E11D72]" /> Why This Matters For ISPs &amp; WISPs
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-inter">
                  {tool.whyItMatters}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#E11D72]" />
              <h2 className="text-xl font-bold font-sora text-[var(--text-primary)]">
                Interactive {tool.name} Workspace
              </h2>
            </div>

            <ISPToolsHub initialToolId={tool.toolId} />
          </div>
        </section>

        {/* Worked Example Section */}
        <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-[var(--text-link)] font-sora">
              <Layers className="w-4 h-4" /> Worked Engineering Example
            </div>
            <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
              Real-World Calculation Walkthrough
            </h2>

            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-2)] space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">Scenario</span>
                <p className="text-sm font-semibold text-[var(--text-primary)] font-inter">{tool.workedExample.scenario}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[var(--border-default)]">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] font-mono">Input Parameters</h4>
                  <div className="space-y-2">
                    {Object.entries(tool.workedExample.inputs).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-[var(--surface-1)] border border-[var(--border-default)]">
                        <span className="text-[var(--text-secondary)]">{key}</span>
                        <span className="font-bold text-[var(--text-primary)] font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E11D72] font-mono">Calculation Output</h4>
                  <div className="space-y-2">
                    {Object.entries(tool.workedExample.results).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-[var(--surface-purple)] border border-[var(--border-brand)]">
                        <span className="text-[var(--text-primary)] font-semibold">{key}</span>
                        <span className="font-bold text-[#E11D72] font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-default)] text-xs text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-[var(--text-primary)] font-sora block mb-1">Engineering Analysis:</strong>
                {tool.workedExample.explanation}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-2)]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-[var(--text-link)] font-sora">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
              {tool.name} Engineering FAQs
            </h2>

            <div className="space-y-4 max-w-4xl">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-2">
                  <h3 className="text-base font-bold font-sora text-[var(--text-primary)]">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 bg-[var(--surface-1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h3 className="text-xl font-bold font-sora text-[var(--text-primary)]">
              Explore More Free ISP Engineering Tools
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)] hover:border-[#E11D72] hover:-translate-y-0.5 transition-all space-y-2 group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)] block">
                    {t.category}
                  </span>
                  <h4 className="text-sm font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {t.description}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[var(--text-link)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
