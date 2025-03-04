// lib/prisma.ts
import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Optional: for logging queries
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type WorkShop = Prisma.WorkshopGetPayload<{
  include: { 
    tickets: true;
   };
}>;