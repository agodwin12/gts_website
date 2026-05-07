// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin Login API
//   POST /api/admin/login
//   Validates credentials → returns signed JWT
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";

const schema = z.object({
    email:    z.string().email(),
    password: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        const body   = await req.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "Invalid request" },
                { status: 400 }
            );
        }

        const { email, password } = result.data;

        // Validate against env credentials
        const adminEmail    = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret     = process.env.JWT_SECRET;

        if (!adminEmail || !adminPassword || !jwtSecret) {
            console.error("Admin credentials not configured in .env.local");
            return NextResponse.json(
                { success: false, error: "Server configuration error" },
                { status: 500 }
            );
        }

        if (email !== adminEmail || password !== adminPassword) {
            // Deliberate 400ms delay to slow brute force
            await new Promise((r) => setTimeout(r, 400));
            return NextResponse.json(
                { success: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Sign JWT using jose (edge-compatible, no Node crypto needed)
        const secret = new TextEncoder().encode(jwtSecret);
        const token  = await new SignJWT({ email, role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        // Set token as HTTP-only cookie so middleware can read it
        const response = NextResponse.json(
            { success: true, token },
            { status: 200 }
        );

        response.cookies.set("gts_admin_token", token, {
            httpOnly: true,
            secure:   process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge:   60 * 60 * 24 * 7, // 7 days
            path:     "/",
        });

        return response;
    } catch (err) {
        console.error("Admin login error:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}