import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let theme = await prisma.themeSetting.findFirst({ where: { id: 1 } });
    if (!theme) {
      theme = await prisma.themeSetting.create({
        data: {
          id: 1,
          primaryColor: "#4b1b63",
          accentColor: "#6f2b8f",
          gradientStart: "#ec1778",
          gradientEnd: "#4b1b63",
          defaultTheme: "dark",
        },
      });
    }

    return NextResponse.json({ ok: true, theme });
  } catch (error) {
    console.error("Failed to fetch theme settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch theme settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { primaryColor, accentColor, gradientStart, gradientEnd, defaultTheme } = body;

    const updated = await prisma.themeSetting.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        primaryColor: primaryColor || "#4b1b63",
        accentColor: accentColor || "#6f2b8f",
        gradientStart: gradientStart || "#ec1778",
        gradientEnd: gradientEnd || "#4b1b63",
        defaultTheme: defaultTheme || "dark",
      },
      update: {
        primaryColor: primaryColor || "#4b1b63",
        accentColor: accentColor || "#6f2b8f",
        gradientStart: gradientStart || "#ec1778",
        gradientEnd: gradientEnd || "#4b1b63",
        defaultTheme: defaultTheme || "dark",
      },
    });

    return NextResponse.json({ ok: true, message: "Theme customization updated successfully", theme: updated });
  } catch (error) {
    console.error("Failed to update theme settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to update theme settings" }, { status: 500 });
  }
}
