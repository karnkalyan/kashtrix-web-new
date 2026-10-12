import { PrismaClient as DefaultPrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

function createClient(): any {
  let ClientClass: any = DefaultPrismaClient;

  // If chatSession is missing from default imported constructor, attempt fresh require from disk
  try {
    const testInstance = new ClientClass();
    if (!testInstance.chatSession) {
      Object.keys(require.cache).forEach((key) => {
        if (key.includes(".prisma") || key.includes("@prisma")) {
          delete require.cache[key];
        }
      });
      const fresh = require("@prisma/client");
      if (fresh && fresh.PrismaClient) {
        ClientClass = fresh.PrismaClient;
      }
    }
  } catch {
    // ignore
  }

  return new ClientClass({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Invalidate cached client if missing newly added models
if (globalForPrisma.prisma && (!globalForPrisma.prisma.sentEmail || !globalForPrisma.prisma.chatSession)) {
  try {
    globalForPrisma.prisma.$disconnect();
  } catch {
    // ignore
  }
  globalForPrisma.prisma = undefined;
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
