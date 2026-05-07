// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin Logout API
//   POST /api/admin/logout
//   Clears the auth cookie
// ═══════════════════════════════════════════════════════════════

import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { success: true },
        { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set("gts_admin_token", "", {
        httpOnly: true,
        secure:   process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:   0,
        path:     "/",
    });

    return response;
}