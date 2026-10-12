import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatDb } from "@/lib/chatDb";
import { sendStaffLiveChatAlert } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history, sessionId, userName, userEmail, userPhone, escalate, memoryContext } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 });
    }

    const userQuery = message.trim();
    const cleanSessionId = sessionId || `kashtrix_${Date.now()}`;

    // 1. Record incoming user message in DB
    await chatDb.createMessage({
      sessionId: cleanSessionId,
      sender: "user",
      senderName: userName || "Customer",
      text: userQuery,
    });

    // 2. Check if user is asking to speak with staff / support team
    const asksStaff =
      Boolean(escalate) ||
      /\b(talk to (human|staff|person|agent|engineer|representative|support|support team)|live (chat|staff|support|person|engineer)|speak with (staff|human|agent|support|support team)|human support|support team|support team communication|real person|need help from (staff|support)|contact (staff|support)|escalate to (staff|support)|agent please|human please|connect (to|with) (staff|support|team|human|agent))\b/i.test(
        userQuery
      );

    if (asksStaff) {
      // Escalate chat session in DB
      await chatDb.updateSession(cleanSessionId, {
        status: "ESCALATED",
        mode: "LIVE_STAFF",
        escalatedReason: userQuery,
      });

      // Record system message
      const escalateNotice =
        "Connecting you with our engineering desk. A live support engineer has been notified and will respond shortly. You can continue sending details below.";

      await chatDb.createMessage({
        sessionId: cleanSessionId,
        sender: "system",
        senderName: "System",
        text: escalateNotice,
      });

      // Fetch recent messages for email alert
      let transcript: any[] = [];
      try {
        transcript = await chatDb.getMessages(cleanSessionId);
      } catch {
        transcript = [{ sender: "user", text: userQuery }];
      }

      // Send urgent staff notification email to support@kashtrix.com
      sendStaffLiveChatAlert({
        sessionId: cleanSessionId,
        userName: userName || "Customer",
        userEmail: userEmail || undefined,
        userPhone: userPhone || undefined,
        transcript: transcript.map((t: any) => ({ sender: t.sender, text: t.text })),
        reason: userQuery,
      }).catch((e) => console.error("Staff email dispatch error:", e));

      // Broadcast alert to WebSocket server on port 3001
      try {
        fetch("http://localhost:3001/broadcast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "escalation",
            sessionId: cleanSessionId,
            data: {
              sessionId: cleanSessionId,
              userName: userName || "Customer",
              userEmail: userEmail || null,
              userPhone: userPhone || null,
              reason: userQuery,
            },
          }),
        }).catch(() => {});
      } catch {
        // ignore
      }

      return NextResponse.json({
        ok: true,
        reply: escalateNotice,
        mode: "LIVE_STAFF",
        escalated: true,
        sessionId: cleanSessionId,
      });
    }

    // 3. Normal AI Conversation with Gemini
    const aiSetting = await prisma.aiSetting.findFirst({ where: { id: 1 } });
    const knowledgeItems = await prisma.aiKnowledge.findMany({
      where: { isActive: true },
      select: { category: true, title: true, content: true },
    });

    const knowledgeContext = knowledgeItems
      .map((k: any) => `[Category: ${k.category} | Title: ${k.title}]\n${k.content}`)
      .join("\n\n---\n\n");

    const memoryBlock = memoryContext
      ? `\n\nCUSTOMER MEMORY & PAST INTERACTION HISTORY:\n${memoryContext}\nTake reference from this past context when appropriate to provide a tailored, continuous customer experience.`
      : "";

    const userProfileBlock = userName
      ? `\nCUSTOMER NAME: ${userName}${userEmail ? ` | Email: ${userEmail}` : ""}${userPhone ? ` | Phone: ${userPhone}` : ""}`
      : "";

    const systemPrompt = `
${aiSetting?.systemPrompt || "You are the Kashtrix AI Engineering Copilot."}
${userProfileBlock}
${memoryBlock}

CURRENT OFFICIAL KASHTRIX KNOWLEDGE BASE:
${knowledgeContext}

STRICT OPERATIONAL RULES:
1. ONLY answer questions about Kashtrix products, suites, technologies, broadcast playout, streaming, studio operations, and telecom OSS/BSS.
2. If the user asks anything external or unrelated (e.g., general world facts, politics, recipes, jokes, non-Kashtrix coding, personal advice), you MUST strictly refuse by saying:
   "I am specifically dedicated to Kashtrix broadcast, streaming, studio, and telecom engineering solutions. I cannot answer questions outside the Kashtrix portfolio. Please ask about our products, or contact our engineering desk at support@kashtrix.com."
3. Never invent facts not supported by the knowledge base.
4. Keep responses crisp, professional, and invite the user to contact support@kashtrix.com or request a live demo.
5. If the user expresses that their issue cannot be solved by AI or asks to speak with a human/engineer, inform them:
   "I can connect you directly with a Kashtrix support engineer. Would you like me to transfer this chat to our live staff desk?"
`;

    const apiKey = aiSetting?.geminiApiKey || process.env.GEMINI_API_KEY || "";
    const modelName = aiSetting?.modelName || "gemini-2.0-flash";

    let replyText = "";

    if (apiKey) {
      try {
        const contents: any[] = [];

        // Build history context if provided
        if (Array.isArray(history)) {
          const recent = history.slice(-6);
          for (const item of recent) {
            if (item.role === "user" || item.role === "assistant" || item.role === "model") {
              contents.push({
                role: item.role === "assistant" ? "model" : "user",
                parts: [{ text: item.content || item.text || "" }],
              });
            }
          }
        }

        // Add current user prompt
        contents.push({
          role: "user",
          parts: [{ text: userQuery }],
        });

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: aiSetting?.temperature ?? 0.2,
                maxOutputTokens: 1000,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          replyText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } else {
          console.warn("Gemini API error, falling back to local engine");
        }
      } catch (geminiError) {
        console.error("Gemini network error:", geminiError);
      }
    }

    // Local fallback if Gemini is offline
    if (!replyText) {
      const q = userQuery.toLowerCase();
      if (q.includes("playout") || q.includes("broadcast") || q.includes("sdi") || q.includes("ndi")) {
        replyText =
          "Kashtrix Broadcast Playout Suite delivers master control playout supporting 12G-SDI, NDI 6, SRT, and 1+1 hitless redundancy. Would you like to schedule an engineering demo or review format compatibility?";
      } else if (q.includes("streamops") || q.includes("transcode") || q.includes("hls") || q.includes("dash")) {
        replyText =
          "Kashtrix StreamOps is an automated media pipeline for real-time ingest, GPU-accelerated transcoding, and multi-CDN packaging. You can evaluate this live or contact support@kashtrix.com.";
      } else if (q.includes("studio") || q.includes("ptz") || q.includes("tally")) {
        replyText =
          "Kashtrix Studio Suite powers multi-camera live switching, IP PTZ camera control, and graphics overlays designed for 24/7 news and live event production.";
      } else if (q.includes("oss") || q.includes("bss") || q.includes("telecom") || q.includes("billing")) {
        replyText =
          "Kashtrix Telecom OSS/BSS offers automated subscriber billing, AAA integration, and network provisioning for cable operators, telcos, and ISP platforms.";
      } else {
        replyText =
          "Kashtrix provides unified broadcast playout, streaming operations, studio switching, and telecom OSS/BSS solutions. How can we assist with your infrastructure requirements?";
      }
    }

    // 4. Save AI response to DB
    await chatDb.createMessage({
      sessionId: cleanSessionId,
      sender: "assistant",
      senderName: "Kashtrix AI",
      text: replyText,
    });

    return NextResponse.json({
      ok: true,
      reply: replyText,
      mode: "AI",
      sessionId: cleanSessionId,
    });
  } catch (error: any) {
    console.error("Chat completion error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Internal error processing message" }, { status: 500 });
  }
}
