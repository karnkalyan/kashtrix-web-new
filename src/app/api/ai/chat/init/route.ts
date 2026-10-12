import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatDb } from "@/lib/chatDb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company } = body;

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPhone = String(phone || "").trim();
    const cleanCompany = String(company || "").trim();

    // 1. Look up prior chat sessions for this email or phone
    let pastSessions: any[] = [];
    if (cleanEmail || cleanPhone) {
      pastSessions = await chatDb.findPastSessions(cleanEmail, cleanPhone);
    }

    const isReturningUser = pastSessions.length > 0;
    let pastMemorySummary = "";

    if (isReturningUser) {
      const pastTopics: string[] = [];
      pastSessions.forEach((s) => {
        if (s.summary) {
          pastTopics.push(s.summary);
        } else if (s.messages && s.messages.length > 0) {
          const userMsgs = s.messages
            .filter((m: any) => m.sender === "user")
            .map((m: any) => m.text.slice(0, 80));
          if (userMsgs.length > 0) {
            pastTopics.push(userMsgs.slice(0, 2).join(", "));
          }
        }
      });

      if (pastTopics.length > 0) {
        pastMemorySummary = `Customer ${cleanName || "User"} previously discussed: ${pastTopics.join(" | ")}.`;
      }
    }

    // 2. Create a new session in DB
    const sessionId = `kashtrix_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await chatDb.createSession({
      sessionId,
      userName: cleanName || "Guest",
      userEmail: cleanEmail || null,
      userPhone: cleanPhone || null,
      company: cleanCompany || null,
      status: "ACTIVE",
      mode: "AI",
    });

    // 3. Craft personalized welcome message
    const aiSetting = await prisma.aiSetting.findFirst({ where: { id: 1 } });
    const defaultWelcome =
      aiSetting?.welcomeMsg ||
      "Hello! I am the Kashtrix AI Engineering Copilot. How can I help you evaluate our Broadcast Playout, StreamOps, Studio, or Telecom OSS/BSS solutions today?";

    let welcomeMsg = defaultWelcome;
    if (isReturningUser && cleanName) {
      welcomeMsg = `Welcome back, ${cleanName}! Great to see you again. I recall our previous discussion. How can I assist you with Kashtrix systems today?`;
    } else if (cleanName) {
      welcomeMsg = `Hello ${cleanName}! Thank you for introducing yourself. How can I help you explore or evaluate Kashtrix solutions today?`;
    }

    // 4. Record welcome message
    await chatDb.createMessage({
      sessionId,
      sender: "assistant",
      senderName: "Kashtrix AI",
      text: welcomeMsg,
    });

    return NextResponse.json({
      ok: true,
      sessionId,
      isReturningUser,
      userName: cleanName,
      welcomeMsg,
      pastMemorySummary,
    });
  } catch (error: any) {
    console.error("Chat init error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to initialize chat session" }, { status: 500 });
  }
}
