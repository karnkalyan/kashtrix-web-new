import { prisma } from "./prisma";

export interface ChatSessionData {
  id?: string;
  sessionId: string;
  userName?: string | null;
  userEmail?: string | null;
  userPhone?: string | null;
  company?: string | null;
  status: "ACTIVE" | "ESCALATED" | "RESOLVED" | "ENDED";
  mode: "AI" | "LIVE_STAFF";
  staffJoined?: boolean;
  staffName?: string | null;
  lastActiveAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  endedAt?: Date | null;
  summary?: string | null;
  escalatedReason?: string | null;
  messages?: ChatMessageData[];
}

export interface ChatMessageData {
  id?: number;
  sessionId: string;
  sender: "user" | "assistant" | "staff" | "system";
  senderName?: string | null;
  text: string;
  createdAt?: Date | string;
}

export const chatDb = {
  // Create a new chat session
  async createSession(data: {
    sessionId: string;
    userName?: string | null;
    userEmail?: string | null;
    userPhone?: string | null;
    company?: string | null;
    status?: "ACTIVE" | "ESCALATED" | "RESOLVED" | "ENDED";
    mode?: "AI" | "LIVE_STAFF";
  }): Promise<void> {
    const pAny = prisma as any;
    const {
      sessionId,
      userName = "Guest",
      userEmail = null,
      userPhone = null,
      company = null,
      status = "ACTIVE",
      mode = "AI",
    } = data;

    try {
      if (pAny.chatSession?.create) {
        await pAny.chatSession.create({
          data: {
            sessionId,
            userName,
            userEmail,
            userPhone,
            company,
            status,
            mode,
            lastActiveAt: new Date(),
          },
        });
        return;
      }
    } catch (err) {
      console.warn("Prisma chatSession.create failed, falling back to raw SQL:", err);
    }

    // Raw SQL fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO chatsession (id, sessionId, userName, userEmail, userPhone, company, status, mode, staffJoined, lastActiveAt, createdAt, updatedAt) 
       VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW(), NOW())
       ON DUPLICATE KEY UPDATE userName = VALUES(userName), userEmail = VALUES(userEmail), userPhone = VALUES(userPhone), lastActiveAt = NOW(), updatedAt = NOW()`,
      sessionId,
      userName,
      userEmail,
      userPhone,
      company,
      status,
      mode
    );
  },

  // Save a message into the chat transcript
  async createMessage(data: {
    sessionId: string;
    sender: "user" | "assistant" | "staff" | "system";
    senderName?: string | null;
    text: string;
  }): Promise<void> {
    const pAny = prisma as any;
    const { sessionId, sender, senderName = null, text } = data;

    try {
      if (pAny.chatMessage?.create) {
        await pAny.chatMessage.create({
          data: {
            sessionId,
            sender,
            senderName,
            text,
          },
        });
        // Update session lastActiveAt
        if (pAny.chatSession?.update) {
          await pAny.chatSession.update({
            where: { sessionId },
            data: { lastActiveAt: new Date() },
          });
        }
        return;
      }
    } catch (err) {
      console.warn("Prisma chatMessage.create failed, falling back to raw SQL:", err);
    }

    // Raw SQL fallback
    await prisma.$executeRawUnsafe(
      `INSERT INTO chatmessage (sessionId, sender, senderName, text, createdAt) VALUES (?, ?, ?, ?, NOW())`,
      sessionId,
      sender,
      senderName,
      text
    );

    await prisma.$executeRawUnsafe(
      `UPDATE chatsession SET lastActiveAt = NOW(), updatedAt = NOW() WHERE sessionId = ?`,
      sessionId
    );
  },

  // Get a single session by sessionId
  async getSession(sessionId: string): Promise<ChatSessionData | null> {
    const pAny = prisma as any;
    try {
      if (pAny.chatSession?.findUnique) {
        const found = await pAny.chatSession.findUnique({
          where: { sessionId },
          include: {
            messages: { orderBy: { createdAt: "asc" } },
          },
        });
        if (found) return found;
      }
    } catch (err) {
      console.warn("Prisma chatSession.findUnique failed, falling back to raw SQL:", err);
    }

    const rows: any = await prisma.$queryRawUnsafe(
      `SELECT * FROM chatsession WHERE sessionId = ? LIMIT 1`,
      sessionId
    );
    if (!rows || rows.length === 0) return null;

    const session = rows[0];
    const msgs: any = await prisma.$queryRawUnsafe(
      `SELECT * FROM chatmessage WHERE sessionId = ? ORDER BY createdAt ASC`,
      sessionId
    );
    session.messages = msgs || [];
    return session;
  },

  // List chat sessions with optional status filter
  async listSessions(options?: {
    status?: string | null;
    search?: string | null;
    limit?: number;
  }): Promise<ChatSessionData[]> {
    const pAny = prisma as any;
    const { status, search, limit = 50 } = options || {};

    try {
      if (pAny.chatSession?.findMany) {
        const where: any = {};
        if (status && status !== "ALL") where.status = status;
        if (search) {
          where.OR = [
            { userName: { contains: search } },
            { userEmail: { contains: search } },
            { userPhone: { contains: search } },
          ];
        }

        const sessions = await pAny.chatSession.findMany({
          where,
          include: {
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
          orderBy: { lastActiveAt: "desc" },
          take: limit,
        });
        if (sessions && sessions.length > 0) return sessions;
      }
    } catch (err) {
      console.warn("Prisma chatSession.findMany failed, falling back to raw SQL:", err);
    }

    // Raw SQL fallback
    let query = `SELECT * FROM chatsession`;
    const conditions: string[] = [];

    if (status && status !== "ALL") {
      conditions.push(`status = '${status.replace(/'/g, "")}'`);
    }
    if (search) {
      const s = search.replace(/'/g, "");
      conditions.push(`(userName LIKE '%${s}%' OR userEmail LIKE '%${s}%' OR userPhone LIKE '%${s}%')`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
    query += ` ORDER BY lastActiveAt DESC LIMIT ${limit}`;

    const rows: any = await prisma.$queryRawUnsafe(query);
    if (!Array.isArray(rows)) return [];

    // Attach latest message snippet
    for (const row of rows) {
      try {
        const lastMsg: any = await prisma.$queryRawUnsafe(
          `SELECT * FROM chatmessage WHERE sessionId = ? ORDER BY createdAt DESC LIMIT 1`,
          row.sessionId
        );
        row.messages = lastMsg || [];
      } catch {
        row.messages = [];
      }
    }

    return rows;
  },

  // Get past sessions for a user by email or phone
  async findPastSessions(email?: string | null, phone?: string | null): Promise<ChatSessionData[]> {
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const cleanPhone = phone ? phone.trim() : "";
    if (!cleanEmail && !cleanPhone) return [];

    const pAny = prisma as any;
    try {
      if (pAny.chatSession?.findMany) {
        return await pAny.chatSession.findMany({
          where: {
            OR: [
              ...(cleanEmail ? [{ userEmail: cleanEmail }] : []),
              ...(cleanPhone ? [{ userPhone: cleanPhone }] : []),
            ],
          },
          include: {
            messages: { orderBy: { createdAt: "asc" }, take: 8 },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        });
      }
    } catch (err) {
      console.warn("Prisma findPastSessions failed, falling back to raw SQL:", err);
    }

    const conditions: string[] = [];
    if (cleanEmail) conditions.push(`userEmail = '${cleanEmail.replace(/'/g, "")}'`);
    if (cleanPhone) conditions.push(`userPhone = '${cleanPhone.replace(/'/g, "")}'`);

    const rows: any = await prisma.$queryRawUnsafe(
      `SELECT * FROM chatsession WHERE ${conditions.join(" OR ")} ORDER BY createdAt DESC LIMIT 5`
    );
    return Array.isArray(rows) ? rows : [];
  },

  // Update session status or details
  async updateSession(
    sessionId: string,
    data: {
      status?: "ACTIVE" | "ESCALATED" | "RESOLVED" | "ENDED";
      mode?: "AI" | "LIVE_STAFF";
      staffJoined?: boolean;
      staffName?: string | null;
      summary?: string | null;
      escalatedReason?: string | null;
      endedAt?: Date | null;
    }
  ): Promise<void> {
    const pAny = prisma as any;
    try {
      if (pAny.chatSession?.update) {
        await pAny.chatSession.update({
          where: { sessionId },
          data: {
            ...data,
            lastActiveAt: new Date(),
          },
        });
        return;
      }
    } catch (err) {
      console.warn("Prisma chatSession.update failed, falling back to raw SQL:", err);
    }

    // Raw SQL fallback
    const setClauses: string[] = ["lastActiveAt = NOW()", "updatedAt = NOW()"];
    if (data.status) setClauses.push(`status = '${data.status.replace(/'/g, "")}'`);
    if (data.mode) setClauses.push(`mode = '${data.mode.replace(/'/g, "")}'`);
    if (typeof data.staffJoined === "boolean") setClauses.push(`staffJoined = ${data.staffJoined ? 1 : 0}`);
    if (data.staffName !== undefined) setClauses.push(`staffName = ${data.staffName ? `'${data.staffName.replace(/'/g, "")}'` : "NULL"}`);
    if (data.summary !== undefined) setClauses.push(`summary = ${data.summary ? `'${data.summary.replace(/'/g, "")}'` : "NULL"}`);
    if (data.escalatedReason !== undefined) setClauses.push(`escalatedReason = ${data.escalatedReason ? `'${data.escalatedReason.replace(/'/g, "")}'` : "NULL"}`);
    if (data.endedAt) setClauses.push(`endedAt = NOW()`);

    await prisma.$executeRawUnsafe(
      `UPDATE chatsession SET ${setClauses.join(", ")} WHERE sessionId = ?`,
      sessionId
    );
  },

  // Retrieve messages for a session
  async getMessages(sessionId: string): Promise<ChatMessageData[]> {
    const pAny = prisma as any;
    try {
      if (pAny.chatMessage?.findMany) {
        return await pAny.chatMessage.findMany({
          where: { sessionId },
          orderBy: { createdAt: "asc" },
        });
      }
    } catch {
      // fallback
    }

    const rows: any = await prisma.$queryRawUnsafe(
      `SELECT * FROM chatmessage WHERE sessionId = ? ORDER BY createdAt ASC`,
      sessionId
    );
    return Array.isArray(rows) ? rows : [];
  },
};
