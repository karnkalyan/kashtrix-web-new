import { prisma } from "./prisma";

export async function seedDatabase() {
  // 1. Email Setting
  await prisma.emailSetting.upsert({
    where: { id: 1 },
    update: {
      smtpHost: process.env.SMTP_HOST || "s11638.sgp1.stableserver.net",
      smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
      smtpSecure: true,
      smtpUser: process.env.SMTP_USER || "support@kashtrix.com",
      smtpPassword: process.env.SMTP_PASS || "@@support@@kashtrix",
      fromEmail: "support@kashtrix.com",
      fromName: "Kashtrix Broadcast Systems",
      notificationRecipient: "support@kashtrix.com",
      autoReplyEnabled: true,
      autoReplySubject: "Thank you for contacting Kashtrix — We received your inquiry",
    },
    create: {
      id: 1,
      smtpHost: process.env.SMTP_HOST || "s11638.sgp1.stableserver.net",
      smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
      smtpSecure: true,
      smtpUser: process.env.SMTP_USER || "support@kashtrix.com",
      smtpPassword: process.env.SMTP_PASS || "@@support@@kashtrix",
      fromEmail: "support@kashtrix.com",
      fromName: "Kashtrix Broadcast Systems",
      notificationRecipient: "support@kashtrix.com",
      autoReplyEnabled: true,
      autoReplySubject: "Thank you for contacting Kashtrix — We received your inquiry",
    },
  });

  // 2. Website Contact
  await prisma.websiteContact.upsert({
    where: { id: 1 },
    update: {
      primaryEmail: "support@kashtrix.com",
      salesEmail: "support@kashtrix.com",
      supportEmail: "support@kashtrix.com",
      phone: "+977 1 4500000",
      whatsapp: "+977 9800000000",
      address: "Kashtrix Broadcast Systems, Media Operations Center",
      websiteUrl: "https://kashtrix.com",
    },
    create: {
      id: 1,
      primaryEmail: "support@kashtrix.com",
      salesEmail: "support@kashtrix.com",
      supportEmail: "support@kashtrix.com",
      phone: "+977 1 4500000",
      whatsapp: "+977 9800000000",
      address: "Kashtrix Broadcast Systems, Media Operations Center",
      websiteUrl: "https://kashtrix.com",
    },
  });

  // 3. AI Settings
  await prisma.aiSetting.upsert({
    where: { id: 1 },
    update: {
      modelName: "gemini-2.0-flash",
      temperature: 0.2,
      welcomeMsg:
        "Hello! I am the Kashtrix AI Engineering Copilot. How can I help you evaluate our Broadcast Playout, StreamOps, Studio, or Telecom OSS/BSS solutions today?",
      systemPrompt: `You are the Kashtrix AI Engineering Copilot — an expert AI assistant exclusively dedicated to the Kashtrix broadcast, media, and telecom software portfolio.
Your instructions:
1. STRICT PRODUCT SCOPE: Answer ONLY questions related to Kashtrix products, applications, specifications, technical protocols, architecture, and deployment evaluations.
   If asked about non-Kashtrix external topics, politely decline and steer the conversation back to Kashtrix software solutions.
2. PRODUCT SUITES COVERED:
   - Kashtrix Broadcast Playout Suite (Master Control Playout, Output Engine, CG Editor, CG Controller, Channel Controller, Playlist Editor, Scheduler, MAM, File Manager, Ingest Server, Input Engine, QC Controller, Multiviewer, NRCS, Prompter, HA Controller)
   - Kashtrix StreamOps (Live browser-based headend transcoding, SRT/RTMP/NDI distribution, DVB MPTS multiplexing, 24/7 compliance recording)
   - Kashtrix Studio (Live production switcher, source monitoring, audio mixer)
   - Kashtrix Telecom OSS/BSS (FreeRADIUS AAA, GPON/XGS-PON OLTs, convergent billing, subscriber CRM, TR-069, CGNAT syslog)
3. TONE & STYLE: Professional, technically precise, engineering-grade, concise, and helpful. Format responses in clear markdown with bullet points when enumerating specs.
4. CONTACT: For pricing, quotes, or custom POC evaluations, advise users to contact support@kashtrix.com or submit the enterprise evaluation form.`,
    },
    create: {
      id: 1,
      geminiApiKey: process.env.GEMINI_API_KEY || "",
      modelName: "gemini-2.0-flash",
      temperature: 0.2,
      welcomeMsg:
        "Hello! I am the Kashtrix AI Engineering Copilot. How can I help you evaluate our Broadcast Playout, StreamOps, Studio, or Telecom OSS/BSS solutions today?",
      systemPrompt: `You are the Kashtrix AI Engineering Copilot — an expert AI assistant exclusively dedicated to the Kashtrix broadcast, media, and telecom software portfolio.
Your instructions:
1. STRICT PRODUCT SCOPE: Answer ONLY questions related to Kashtrix products, applications, specifications, technical protocols, architecture, and deployment evaluations.
   If asked about non-Kashtrix external topics, politely decline and steer the conversation back to Kashtrix software solutions.
2. PRODUCT SUITES COVERED:
   - Kashtrix Broadcast Playout Suite (Master Control Playout, Output Engine, CG Editor, CG Controller, Channel Controller, Playlist Editor, Scheduler, MAM, File Manager, Ingest Server, Input Engine, QC Controller, Multiviewer, NRCS, Prompter, HA Controller)
   - Kashtrix StreamOps (Live browser-based headend transcoding, SRT/RTMP/NDI distribution, DVB MPTS multiplexing, 24/7 compliance recording)
   - Kashtrix Studio (Live production switcher, source monitoring, audio mixer)
   - Kashtrix Telecom OSS/BSS (FreeRADIUS AAA, GPON/XGS-PON OLTs, convergent billing, subscriber CRM, TR-069, CGNAT syslog)
3. TONE & STYLE: Professional, technically precise, engineering-grade, concise, and helpful. Format responses in clear markdown with bullet points when enumerating specs.
4. CONTACT: For pricing, quotes, or custom POC evaluations, advise users to contact support@kashtrix.com or submit the enterprise evaluation form.`,
    },
  });

  // 4. Theme Setting
  await prisma.themeSetting.upsert({
    where: { id: 1 },
    update: {
      primaryColor: "#4b1b63",
      accentColor: "#6f2b8f",
      gradientStart: "#ec1778",
      gradientEnd: "#4b1b63",
      defaultTheme: "dark",
    },
    create: {
      id: 1,
      primaryColor: "#4b1b63",
      accentColor: "#6f2b8f",
      gradientStart: "#ec1778",
      gradientEnd: "#4b1b63",
      defaultTheme: "dark",
    },
  });

  // 5. Initial AI Knowledge Base entries (if table empty)
  const count = await prisma.aiKnowledge.count();
  if (count === 0) {
    const knowledgeItems = [
      {
        category: "Broadcast Playout Suite",
        title: "Master Control Playout & Compositor Engine",
        content:
          "24/7 master control playout engine with dual independent video pipelines (PGM and PVW). Features Direct3D11 GPU rendering, sub-frame cut/dissolve/wipe mixing, audio auto-follow crossfading, native hardware decoding for Apple ProRes 422/4444, Avid DNxHD/DNxHR, XDCAM HD422 MXF, and SCTE-35 digital cue marker injection.",
      },
      {
        category: "Broadcast Playout Suite",
        title: "Transmission & Multi-Protocol Output Engine",
        content:
          "Multi-channel output matrix connecting playout video to physical broadcast cards (Blackmagic DeckLink 12G-SDI, AJA Kona), IP video networks (NDI 6, SMPTE ST 2110), DVB-TS UDP unicast/multicast with SI/PSI tables, and encrypted SRT / RTMP streaming.",
      },
      {
        category: "Broadcast Playout Suite",
        title: "CG Editor & Motion Graphic Template Designer",
        content:
          "Standalone graphic template designer featuring automated Coming Up & Coming Next promos with DVE video squeeze-back (PIP), live Weather API automation with OpenWeather/AccuWeather icon bindings, Back In commercial countdown timers, lower thirds, and animated news tickers.",
      },
      {
        category: "Broadcast Playout Suite",
        title: "1+1 High Availability Playout Supervisor",
        content:
          "High-availability clustering engine running continuous UDP/TCP heartbeat surveillance across Primary and Secondary playout channels. Executes clean sub-40 millisecond failover routing via Blackmagic Videohub, Ross, or IP matrices with zero frame drops or audio pops.",
      },
      {
        category: "StreamOps",
        title: "Carrier-Grade Live Headend & Transcoding",
        content:
          "High-throughput web-based broadcast control plane for multi-channel video ingest, GPU-accelerated H.264/HEVC transcoding via NVIDIA NVENC and Intel QSV, DVB MPTS multiplexing, and 24/7 continuous compliance recording with tamper-proof watermarking.",
      },
      {
        category: "Kashtrix Studio",
        title: "Live Production Switching & Multi-Bus Surface",
        content:
          "Dedicated live production workspace for Program and Preview switching, mosaic multiviewer monitoring with PPM/VU meters, optical mirror teleprompter flip, and direct live character generator integration.",
      },
      {
        category: "Telecom OSS/BSS",
        title: "Unified ISP, FTTH & Telecom Operating System",
        content:
          "Unifies FreeRADIUS AAA (50K+ auth req/s), multi-vendor GPON/XGS-PON OLT automation (Nokia, Huawei, ZTE), TR-069 CPE remote provisioning, convergent prepaid/postpaid billing, subscriber CRM, and carrier-grade 100K+ EPS CGNAT syslog compliance.",
      },
      {
        category: "Company & Support",
        title: "Contact, Proof-of-Concept & Support Inquiries",
        content:
          "Kashtrix official email is support@kashtrix.com. Website is https://kashtrix.com. Broadcast, StreamOps, and OSS/BSS evaluations can be requested via the enterprise contact form or by emailing support@kashtrix.com directly.",
      },
    ];

    for (const item of knowledgeItems) {
      await prisma.aiKnowledge.create({ data: item });
    }
  }
}
