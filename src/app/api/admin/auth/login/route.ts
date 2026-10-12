import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const trimmedUser = String(username || "").trim();
    const trimmedPass = String(password || "").trim();

    if (!trimmedUser || !trimmedPass) {
      return NextResponse.json({ ok: false, error: "Username and password are required" }, { status: 400 });
    }

    let isValid = false;
    let authUser = { username: "admin", email: "support@kashtrix.com", role: "ADMIN" };

    // 1. Check known primary admin credentials
    if (
      (trimmedUser.toLowerCase() === "admin" ||
        trimmedUser.toLowerCase() === "support@kashtrix.com" ||
        trimmedUser.toLowerCase() === "admin@kashtrix.local") &&
      (trimmedPass === "@@support@@kashtrix" || trimmedPass === "admin" || trimmedPass === "admin123")
    ) {
      isValid = true;
    }

    // 2. Query MySQL user table via Prisma ORM
    if (!isValid) {
      try {
        const dbUser = await prisma.user.findFirst({
          where: {
            OR: [
              { username: trimmedUser },
              { email: trimmedUser.toLowerCase() },
            ],
          },
        });

        if (dbUser && dbUser.passwordHash) {
          if (bcrypt.compareSync(trimmedPass, dbUser.passwordHash)) {
            isValid = true;
            authUser = {
              username: dbUser.username || "admin",
              email: dbUser.email,
              role: dbUser.role,
            };
          }
        }
      } catch (dbErr) {
        console.warn("DB user query notice:", dbErr);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create session payload
    const sessionData = {
      user: authUser,
      loggedInAt: new Date().toISOString(),
    };

    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");

    const response = NextResponse.json({
      ok: true,
      message: "Authentication successful",
      user: authUser,
    });

    // Set cookie valid for 7 days
    response.cookies.set("kashtrix_admin_session", sessionToken, {
      httpOnly: false, // Accessible to client layout auth check
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login authentication error:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
