import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let contact = await prisma.websiteContact.findFirst({ where: { id: 1 } });
    if (!contact) {
      contact = await prisma.websiteContact.create({
        data: {
          id: 1,
          primaryEmail: "support@kashtrix.com",
          salesEmail: "support@kashtrix.com",
          supportEmail: "support@kashtrix.com",
          phone: "+977 1 4500000",
          whatsapp: "+977 9800000000",
          address: "Kashtrix Broadcast Systems HQ",
          websiteUrl: "https://kashtrix.com",
        },
      });
    }

    return NextResponse.json({ ok: true, contact });
  } catch (error) {
    console.error("Failed to fetch contact settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch contact settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { primaryEmail, salesEmail, supportEmail, phone, whatsapp, address, websiteUrl } = body;

    const updated = await prisma.websiteContact.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        primaryEmail: primaryEmail || "support@kashtrix.com",
        salesEmail: salesEmail || "support@kashtrix.com",
        supportEmail: supportEmail || "support@kashtrix.com",
        phone: phone || "+977 1 4500000",
        whatsapp: whatsapp || "+977 9800000000",
        address: address || "Kashtrix Broadcast Systems HQ",
        websiteUrl: websiteUrl || "https://kashtrix.com",
      },
      update: {
        primaryEmail: primaryEmail || "support@kashtrix.com",
        salesEmail: salesEmail || "support@kashtrix.com",
        supportEmail: supportEmail || "support@kashtrix.com",
        phone: phone || "+977 1 4500000",
        whatsapp: whatsapp || "+977 9800000000",
        address: address || "Kashtrix Broadcast Systems HQ",
        websiteUrl: websiteUrl || "https://kashtrix.com",
      },
    });

    return NextResponse.json({ ok: true, message: "Contact details updated successfully", contact: updated });
  } catch (error) {
    console.error("Failed to update contact settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to update contact settings" }, { status: 500 });
  }
}
