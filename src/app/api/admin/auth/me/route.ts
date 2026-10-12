import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("kashtrix_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ ok: true, authenticated: false });
    }

    try {
      const decoded = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
      if (decoded && decoded.user) {
        return NextResponse.json({
          ok: true,
          authenticated: true,
          user: decoded.user,
        });
      }
    } catch {
      // Invalid cookie payload
    }

    return NextResponse.json({ ok: true, authenticated: false });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to verify session" }, { status: 500 });
  }
}
