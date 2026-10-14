import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { broadcastApps } from "@/data/broadcast";
import { BroadcastApplicationExperience } from "@/components/BroadcastApplicationExperience";
import { SITE } from "@/lib/site";

import { getPageMetadata } from "@/lib/meta";

export function generateStaticParams(){ return broadcastApps.map(app => ({ slug: app.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = broadcastApps.find(a => a.slug === slug);
  if (!app) return {};
  return getPageMetadata(`/broadcast-playout/${app.slug}`, {
    title: `${app.title} — Television Broadcast Software | Kashtrix`,
    description: app.purpose,
    keywords: app.keywords.join(", "),
    canonical: `https://kashtrix.com/broadcast-playout/${app.slug}`,
    ogImage: app.screenshots[0],
  });
}

export default async function BroadcastApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = broadcastApps.find(a => a.slug === slug);
  if (!app) notFound();
  const next = broadcastApps[app.number % broadcastApps.length];
  const schema = { "@context":"https://schema.org", "@type":"SoftwareApplication", name:`Kashtrix ${app.title}`, applicationCategory:"MultimediaApplication", operatingSystem:"Windows 10, Windows 11, Windows Server", description:app.purpose, url:`${SITE.url}/broadcast-playout/${app.slug}`, featureList:app.capabilities.map(c=>c.title) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><BroadcastApplicationExperience app={app} next={next}/></>;
}
