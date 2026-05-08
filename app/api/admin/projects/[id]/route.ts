// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin Project [id] API
//   PATCH  /api/admin/projects/[id]  → update project fields
//   DELETE /api/admin/projects/[id]  → delete a project
//   Both routes are JWT-protected
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { z }         from "zod";
import { db }        from "@/lib/db";

// ─────────────────────────────────────────
// AUTH HELPER
// ─────────────────────────────────────────

async function verifyToken(req: NextRequest): Promise<boolean> {
    try {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
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
// VALIDATION SCHEMA — partial update
// Every field is optional so the dashboard
// can update just status, just featured, etc.
// ─────────────────────────────────────────

const updateProjectSchema = z.object({
    title:           z.string().min(2).optional(),
    slug:            z.string()
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only")
        .optional(),
    summary:         z.string().min(10).optional(),
    description:     z.string().min(20).optional(),
    category:        z.enum([
        "WEB_DEVELOPMENT", "APP_DEVELOPMENT", "CLOUD_SERVICES",
        "ECOMMERCE", "UI_UX_DESIGN", "DIGITAL_MARKETING",
        "IT_CONSULTANCY", "API_INTEGRATION", "ENTERPRISE_SOFTWARE",
        "AUTOMATION_AI", "CYBERSECURITY", "BRANDING",
    ]).optional(),
    tags:            z.array(z.string()).optional(),
    status:          z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).optional(),
    clientName:      z.string().nullable().optional(),
    clientCountry:   z.string().nullable().optional(),
    clientIndustry:  z.string().nullable().optional(),
    coverImage:      z.string().url().optional(),
    images:          z.array(z.string().url()).optional(),
    videoUrl:        z.string().url().nullable().optional(),
    techStack:       z.array(z.string()).optional(),
    duration:        z.string().nullable().optional(),
    deliveredAt:     z.string().datetime().nullable().optional(),
    liveUrl:         z.string().url().nullable().optional(),
    caseStudyUrl:    z.string().url().nullable().optional(),
    githubUrl:       z.string().url().nullable().optional(),
    featured:        z.boolean().optional(),
    order:           z.number().int().optional(),
    metaTitle:       z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
});

// ─────────────────────────────────────────
// PATCH — update project
// ─────────────────────────────────────────

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authorized = await verifyToken(req);
    if (!authorized) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;

        // Check project exists
        const existing = await db.project.findUnique({
            where:  { id },
            select: { id: true, slug: true },
        });

        if (!existing) {
            return NextResponse.json(
                { success: false, error: "Project not found" },
                { status: 404 }
            );
        }

        // Validate body
        const body   = await req.json();
        const result = updateProjectSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error:   "Validation failed",
                    details: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        // If slug is changing, check it's not already taken by another project
        if (data.slug && data.slug !== existing.slug) {
            const slugTaken = await db.project.findUnique({
                where:  { slug: data.slug },
                select: { id: true },
            });
            if (slugTaken && slugTaken.id !== id) {
                return NextResponse.json(
                    {
                        success: false,
                        error:   "Validation failed",
                        details: { slug: ["This slug is already in use by another project."] },
                    },
                    { status: 400 }
                );
            }
        }

        // Build update payload — only include fields that were sent
        const updateData: Record<string, unknown> = {};

        if (data.title           !== undefined) updateData.title           = data.title;
        if (data.slug            !== undefined) updateData.slug            = data.slug;
        if (data.summary         !== undefined) updateData.summary         = data.summary;
        if (data.description     !== undefined) updateData.description     = data.description;
        if (data.category        !== undefined) updateData.category        = data.category;
        if (data.tags            !== undefined) updateData.tags            = data.tags;
        if (data.status          !== undefined) updateData.status          = data.status;
        if (data.clientName      !== undefined) updateData.clientName      = data.clientName;
        if (data.clientCountry   !== undefined) updateData.clientCountry   = data.clientCountry;
        if (data.clientIndustry  !== undefined) updateData.clientIndustry  = data.clientIndustry;
        if (data.coverImage      !== undefined) updateData.coverImage      = data.coverImage;
        if (data.images          !== undefined) updateData.images          = data.images;
        if (data.videoUrl        !== undefined) updateData.videoUrl        = data.videoUrl;
        if (data.techStack       !== undefined) updateData.techStack       = data.techStack;
        if (data.duration        !== undefined) updateData.duration        = data.duration;
        if (data.liveUrl         !== undefined) updateData.liveUrl         = data.liveUrl;
        if (data.caseStudyUrl    !== undefined) updateData.caseStudyUrl    = data.caseStudyUrl;
        if (data.githubUrl       !== undefined) updateData.githubUrl       = data.githubUrl;
        if (data.featured        !== undefined) updateData.featured        = data.featured;
        if (data.order           !== undefined) updateData.order           = data.order;
        if (data.metaTitle       !== undefined) updateData.metaTitle       = data.metaTitle;
        if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;

        // Handle deliveredAt separately — convert string to Date or null
        if (data.deliveredAt !== undefined) {
            updateData.deliveredAt = data.deliveredAt
                ? new Date(data.deliveredAt)
                : null;
        }

        const updated = await db.project.update({
            where: { id },
            data:  updateData,
        });

        return NextResponse.json(
            {
                success: true,
                data:    updated,
                message: "Project updated successfully",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("PATCH /api/admin/projects/[id] error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to update project" },
            { status: 500 }
        );
    }
}

// ─────────────────────────────────────────
// DELETE — remove project permanently
// ─────────────────────────────────────────

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authorized = await verifyToken(req);
    if (!authorized) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;

        // Check project exists before deleting
        const existing = await db.project.findUnique({
            where:  { id },
            select: { id: true, title: true },
        });

        if (!existing) {
            return NextResponse.json(
                { success: false, error: "Project not found" },
                { status: 404 }
            );
        }

        await db.project.delete({ where: { id } });

        return NextResponse.json(
            {
                success: true,
                message: `"${existing.title}" has been deleted successfully`,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("DELETE /api/admin/projects/[id] error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to delete project" },
            { status: 500 }
        );
    }
}

// ─────────────────────────────────────────
// GET — fetch single project (for edit form)
// ─────────────────────────────────────────

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authorized = await verifyToken(req);
    if (!authorized) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;

        const project = await db.project.findUnique({ where: { id } });

        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: project },
            { status: 200 }
        );
    } catch (err) {
        console.error("GET /api/admin/projects/[id] error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}