import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { broadcastApps } from "@/data/broadcast";
import { streamOpsModules } from "@/data/streamops";
import { telecomPages } from "@/data/telecom";

export default function sitemap():MetadataRoute.Sitemap{
  const now=new Date();
  const entries:MetadataRoute.Sitemap=[
    ["/",1,"daily"],["/broadcast-playout",.95,"weekly"],["/studio",.94,"weekly"],["/streamops",.95,"weekly"],["/platform",.95,"weekly"],["/resources",.7,"monthly"],["/about",.6,"monthly"],["/contact",.6,"monthly"],["/request-demo",.8,"monthly"],["/compliance",.65,"monthly"],["/privacy",.4,"yearly"],["/terms",.4,"yearly"],
  ].map(([path,priority,changeFrequency])=>({url:`${SITE.url}${path}`,lastModified:now,priority:priority as number,changeFrequency:changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"]}));
  for(const a of broadcastApps)entries.push({url:`${SITE.url}/broadcast-playout/${a.slug}`,lastModified:now,changeFrequency:"monthly",priority:.82});
  for(const m of streamOpsModules)entries.push({url:`${SITE.url}/streamops/${m.slug}`,lastModified:now,changeFrequency:"monthly",priority:.8});
  for(const p of telecomPages.filter(p=>p.slug!=="platform"))entries.push({url:`${SITE.url}/${p.slug}`,lastModified:now,changeFrequency:"monthly",priority:.82});
  return entries;
}
