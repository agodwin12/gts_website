// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Image Upload API
//   POST /api/admin/upload
//   Uploads images to Cloudflare R2 → returns public URL
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify }   from "jose";
import { uploadToR2 }  from "@/lib/r2";

// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────

async function verifyToken(req: NextRequest): Promise<boolean> {
    try {
        const token = req.cookies.get("gts_admin_token")?.value;
        if (!token) return false;
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "fallback-secret"
        );
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}

// ─────────────────────────────────────────
// POST — upload to R2
// ─────────────────────────────────────────

export async function POST(req: NextRequest) {
    const authorized = await verifyToken(req);
    if (!authorized) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const formData = await req.formData();
        const file     = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Only JPEG, PNG, WebP and GIF are allowed" },
                { status: 400 }
            );
        }

        // Validate file size — max 5MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, error: "File size must be under 5MB" },
                { status: 400 }
            );
        }

        // Generate unique filename
        const ext      = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // Convert File to Buffer
        const bytes  = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudflare R2
        const publicUrl = await uploadToR2(buffer, filename, file.type);

        return NextResponse.json(
            { success: true, url: publicUrl, filename, size: file.size },
            { status: 200 }
        );
    } catch (err) {
        console.error("R2 upload error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to upload image. Check R2 configuration." },
            { status: 500 }
        );
    }
}