import { NextResponse } from "next/server";
import { chatDb } from "@/lib/chatDb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, reason } = body;

    if (!sessionId) {
      return NextResponse.json({ ok: false, error: "sessionId is required" }, { status: 400 });
    }

    const messages = await chatDb.getMessages(sessionId);

    // Auto-generate a brief summary of the conversation
    const userTopics = messages
      .filter((m: any) => m.sender === "user")
      .map((m: any) => m.text)
      .slice(0, 3)
      .join(" | ");

    const summary = userTopics.length > 0 ? `Inquired regarding: ${userTopics.slice(0, 255)}` : "General inquiry";

    await chatDb.updateSession(sessionId, {
      status: "ENDED",
      endedAt: new Date(),
      summary,
    });

    return NextResponse.json({ ok: true, sessionId, status: "ENDED", reason });
  } catch (error: any) {
    console.error("Chat session end error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to end chat session" }, { status: 500 });
  }
}
