import { NextResponse } from "next/server";
import { chatDb } from "@/lib/chatDb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const status = searchParams.get("status");

    // Single session details with full message transcript
    if (sessionId) {
      const session = await chatDb.getSession(sessionId);
      const messages = await chatDb.getMessages(sessionId);
      return NextResponse.json({ ok: true, session, messages });
    }

    // Sessions listing
    const sessions = await chatDb.listSessions({
      status: status || undefined,
      limit: 100,
    });

    // Calculate counts
    const all = await chatDb.listSessions({ limit: 200 });
    const totalEscalated = all.filter((s) => s.status === "ESCALATED").length;
    const totalActive = all.filter((s) => s.status === "ACTIVE").length;
    const totalEnded = all.filter((s) => s.status === "ENDED" || s.status === "RESOLVED").length;

    return NextResponse.json({
      ok: true,
      sessions,
      totalEscalated,
      totalActive,
      totalEnded,
    });
  } catch (error: any) {
    console.error("Admin chat fetch error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to fetch chat data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, message, staffName } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ ok: false, error: "sessionId and message are required" }, { status: 400 });
    }

    const cleanMessage = String(message).trim();
    const senderTitle = staffName || "Kashtrix Support Engineer";

    // 1. Save staff message and update session in database
    await chatDb.createMessage({
      sessionId,
      sender: "staff",
      senderName: senderTitle,
      text: cleanMessage,
    });

    await chatDb.updateSession(sessionId, {
      staffJoined: true,
      staffName: senderTitle,
      status: "ACTIVE",
    });

    // 2. Broadcast staff message via WebSocket server on port 3001
    try {
      fetch("http://localhost:3001/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat_message",
          sessionId,
          data: {
            sessionId,
            sender: "staff",
            senderName: senderTitle,
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
        sender: "staff",
        senderName: senderTitle,
        text: cleanMessage,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Admin chat dispatch error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to dispatch staff reply" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, status } = body;

    if (!sessionId || !status) {
      return NextResponse.json({ ok: false, error: "sessionId and status are required" }, { status: 400 });
    }

    await chatDb.updateSession(sessionId, {
      status,
      endedAt: status === "ENDED" || status === "RESOLVED" ? new Date() : undefined,
    });

    return NextResponse.json({ ok: true, sessionId, status });
  } catch (error: any) {
    console.error("Admin chat update error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to update session status" }, { status: 500 });
  }
}
