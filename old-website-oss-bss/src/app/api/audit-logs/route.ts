import { NextResponse } from "next/server";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const logs = await db.select().from(auditLogs).orderBy(desc(auditLogs.timestamp)).limit(10);
    return NextResponse.json({ success: true, logs });
  } catch (err) {
    console.error("Error fetching audit logs:", err);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, targetDevice, status, details, performedBy } = body;

    const [inserted] = await db
      .insert(auditLogs)
      .values({
        action: action || "Execute CLI Workflow",
        targetDevice: targetDevice || "Cisco-ASR-9000-BNG-01",
        status: status || "SUCCESS",
        details: details || "Applied subscriber policy updates and verified TR-069 session handshake.",
        performedBy: performedBy || "Kashtrix AI Network Agent",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted });
  } catch (err) {
    console.error("Error creating audit log:", err);
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 });
  }
}
