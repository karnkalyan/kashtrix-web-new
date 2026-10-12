import { NextResponse } from "next/server";
import { chatDb } from "@/lib/chatDb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });
    }

    const session = await chatDb.getSession(sessionId);
    const messages = await chatDb.getMessages(sessionId);

    return NextResponse.json({ ok: true, session, messages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, message, senderName } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ ok: false, error: "sessionId and message required" }, { status: 400 });
    }

    const cleanMessage = String(message).trim();

    // 1. Save message to DB
    await chatDb.createMessage({
      sessionId,
      sender: "user",
      senderName: senderName || "Customer",
      text: cleanMessage,
    });

    // 2. Broadcast to WS server on port 3001
    try {
      fetch("http://localhost:3001/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat_message",
          sessionId,
          data: {
            sessionId,
            sender: "user",
            senderName: senderName || "Customer",
            text: cleanMessage,
            createdAt: new Date().toISOString(),
          },
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    return NextResponse.json({
      ok: true,
      message: {
        sessionId,
        sender: "user",
        senderName: senderName || "Customer",
        text: cleanMessage,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || "Failed to save message" }, { status: 500 });
  }
}
