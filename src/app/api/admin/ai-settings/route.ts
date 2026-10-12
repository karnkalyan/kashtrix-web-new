import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.aiSetting.findFirst({ where: { id: 1 } });
    if (!settings) {
      settings = await prisma.aiSetting.create({
        data: {
          id: 1,
          geminiApiKey: process.env.GEMINI_API_KEY || "",
          modelName: "gemini-2.0-flash",
          systemPrompt: `You are the Kashtrix AI Engineering Assistant. 
You are strictly an expert ONLY on Kashtrix products, suites, and architecture:
1. Kashtrix Broadcast Playout Suite (Master Control Playout, NRCS News, Ingest, Auto QC, CG Editor, DVB Subtitling, SCTE-35/104 ad splicing).
2. Kashtrix StreamOps (Ultra-low latency live transcoding, SRT/HLS/DASH/WebRTC origin packaging, multi-bitrate delivery).
3. Kashtrix Studio (Live Multi-camera production, software vision switcher, replay system, PTZ automation, NDI 6, audio mixing).
4. Kashtrix Telecom OSS/BSS (Subscriber management, automated billing, invoicing, RADIUS/IPDR analytics, network orchestration).

CRITICAL CONSTRAINTS:
- You ONLY answer questions related to Kashtrix applications, products, features, deployment, hardware recommendations, and inquiries.
- If asked about ANY external, general, or unrelated topic (e.g. general programming, recipe, history, politics, external celebrities, math), politely but firmly state: "I am specifically dedicated to Kashtrix broadcast, streaming, studio, and telecom solutions. Please ask me about Kashtrix products or contact our team at support@kashtrix.com."
- Keep your tone highly professional, precise, broadcast-grade, and helpful.
- When helpful, encourage the user to request a live demo or contact support@kashtrix.com.`,
          temperature: 0.2,
          welcomeMsg: "Hello! I am the Kashtrix AI Engineering Copilot. How can I help you evaluate our Broadcast Playout, StreamOps, Studio, or Telecom OSS/BSS solutions today?",
        },
      });
    }

    const safeSettings = {
      ...settings,
      geminiApiKey: settings.geminiApiKey
        ? settings.geminiApiKey.length > 8
          ? `${settings.geminiApiKey.substring(0, 6)}••••••••••••${settings.geminiApiKey.slice(-4)}`
          : "••••••••••••"
        : "",
      hasApiKey: Boolean(settings.geminiApiKey),
    };

    return NextResponse.json({ ok: true, settings: safeSettings });
  } catch (error) {
    console.error("Failed to fetch AI settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch AI settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { geminiApiKey, modelName, systemPrompt, temperature, welcomeMsg } = body;

    const current = await prisma.aiSetting.findFirst({ where: { id: 1 } });
    let keyToSave = current?.geminiApiKey || "";

    if (geminiApiKey !== undefined) {
      if (geminiApiKey && !geminiApiKey.includes("•")) {
        keyToSave = geminiApiKey.trim();
      } else if (geminiApiKey === "") {
        keyToSave = "";
      }
    }

    const updated = await prisma.aiSetting.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        geminiApiKey: keyToSave,
        modelName: modelName || "gemini-2.0-flash",
        systemPrompt: systemPrompt || "",
        temperature: typeof temperature === "number" ? temperature : 0.2,
        welcomeMsg: welcomeMsg || "Hello! I am the Kashtrix AI Engineering Copilot. How can I help you evaluate our Broadcast Playout, StreamOps, Studio, or Telecom OSS/BSS solutions today?",
      },
      update: {
        geminiApiKey: keyToSave,
        modelName: modelName || "gemini-2.0-flash",
        systemPrompt: systemPrompt !== undefined ? systemPrompt : current?.systemPrompt,
        temperature: typeof temperature === "number" ? temperature : current?.temperature,
        welcomeMsg: welcomeMsg !== undefined ? welcomeMsg : current?.welcomeMsg,
      },
    });

    const safeSettings = {
      ...updated,
      geminiApiKey: updated.geminiApiKey
        ? updated.geminiApiKey.length > 8
          ? `${updated.geminiApiKey.substring(0, 6)}••••••••••••${updated.geminiApiKey.slice(-4)}`
          : "••••••••••••"
        : "",
      hasApiKey: Boolean(updated.geminiApiKey),
    };

    return NextResponse.json({ ok: true, message: "AI configuration updated successfully", settings: safeSettings });
  } catch (error) {
    console.error("Failed to update AI settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to update AI settings" }, { status: 500 });
  }
}
