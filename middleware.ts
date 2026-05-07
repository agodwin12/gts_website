// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Middleware
//   Protects /admin/* routes — redirects to login if no valid JWT
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Routes excluded from protection
const EXCLUDED = [
    "/admin/login",
    "/api/admin/login",
    "/api/admin/logout",
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip excluded routes immediately
    if (EXCLUDED.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Only protect /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Read token from cookie
    const token = req.cookies.get("gts_admin_token")?.value;

    // No token — redirect to login
    if (!token) {
        const loginUrl = new URL("/admin/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is not set in environment variables");
            const loginUrl = new URL("/admin/login", req.url);
            return NextResponse.redirect(loginUrl);
        }

        const secret = new TextEncoder().encode(jwtSecret);
        await jwtVerify(token, secret);

        // Valid token — allow through
        return NextResponse.next();
    } catch (err) {
        console.error("JWT verification failed:", err);

        // Token invalid or expired — clear cookie and redirect
        const loginUrl  = new URL("/admin/login", req.url);
        const response  = NextResponse.redirect(loginUrl);
        response.cookies.set("gts_admin_token", "", {
            maxAge:   0,
            path:     "/",
            httpOnly: true,
        });
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};