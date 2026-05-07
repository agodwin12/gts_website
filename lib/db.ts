// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Prisma Client Singleton
//   Prevents connection pool exhaustion during Next.js hot reload.
//   Import this instead of `new PrismaClient()` everywhere.
//
//   Usage:
//     import { db } from "@/lib/db";
//     const projects = await db.project.findMany();
// ═══════════════════════════════════════════════════════════════

import { PrismaClient } from "@prisma/client";

// ─────────────────────────────────────────
// Type augmentation — attach prisma to the
// global object so it survives hot reloads
// ─────────────────────────────────────────
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// ─────────────────────────────────────────
// Singleton factory
// ─────────────────────────────────────────
function createPrismaClient(): PrismaClient {
    return new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],

        errorFormat:
            process.env.NODE_ENV === "development" ? "pretty" : "minimal",
    });
}

// ─────────────────────────────────────────
// Export the singleton
// In development: reuse the global instance
// In production:  always create a new instance
//                 (no global leakage between requests)
// ─────────────────────────────────────────
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}

// ─────────────────────────────────────────
// Named export alias (convenience)
// ─────────────────────────────────────────
export default db;