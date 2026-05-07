// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin Projects API
//   GET  /api/admin/projects  → fetch all projects
//   POST /api/admin/projects  → create a new project
//   Both routes are JWT-protected
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify }  from "jose";
import { z }          from "zod";
import { db }         from "@/lib/db";
import { Prisma }     from "@prisma/client";

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
// VALIDATION SCHEMA — create project
// ─────────────────────────────────────────

const createProjectSchema = z.object({
    title:           z.string().min(2,  "Title is required"),
    slug:            z.string().min(2,  "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
    summary:         z.string().min(10, "Summary is required"),
    description:     z.string().min(20, "Description is required"),
    category:        z.enum([
        "WEB_DEVELOPMENT", "APP_DEVELOPMENT", "CLOUD_SERVICES",
        "ECOMMERCE", "UI_UX_DESIGN", "DIGITAL_MARKETING",
        "IT_CONSULTANCY", "API_INTEGRATION", "ENTERPRISE_SOFTWARE",
        "AUTOMATION_AI", "CYBERSECURITY", "BRANDING",
    ]),
    tags:            z.array(z.string()).default([]),
    status:          z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
    clientName:      z.string().optional().nullable(),
    clientCountry:   z.string().optional().nullable(),
    clientIndustry:  z.string().optional().nullable(),
    coverImage:      z.string().url("Cover image must be a valid URL"),
    images:          z.array(z.string().url()).default([]),
    videoUrl:        z.string().url().optional().nullable(),
    techStack:       z.array(z.string()).default([]),
    duration:        z.string().optional().nullable(),
    deliveredAt:     z.string().datetime().optional().nullable(),
    liveUrl:         z.string().url().optional().nullable(),
    caseStudyUrl:    z.string().url().optional().nullable(),
    githubUrl:       z.string().url().optional().nullable(),
    featured:        z.boolean().default(false),
    order:           z.number().int().default(0),
    metaTitle:       z.string().optional().nullable(),
    metaDescription: z.string().optional().nullable(),
});

// ─────────────────────────────────────────
// GET — fetch all projects (admin view)
// ─────────────────────────────────────────

export async function GET(req: NextRequest) {
    const authorized = await verifyToken(req);
    if (!authorized) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(req.url);
        const status   = searchParams.get("status") || undefined;
        const category = searchParams.get("category") || undefined;
        const search   = searchParams.get("search")  || undefined;

        const where: Prisma.ProjectWhereInput = {
            ...(status   ? { status:   status   as Prisma.EnumProjectStatusFilter } : {}),
            ...(category ? { category: category as Prisma.EnumProjectCategoryFilter } : {}),
            ...(search
                ? {
                    OR: [
                        { title:      { contains: search, mode: Prisma.QueryMode.insensitive } },
                        { clientName: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    ],
                }
                : {}),
        };

        const projects = await db.project.findMany({
            where,
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });

        return NextResponse.json(
            { success: true, data: projects },
            { status: 200 }
        );
    } catch (err) {
        console.error("GET /api/admin/projects error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// ─────────────────────────────────────────
// POST — create new project
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
        const body   = await req.json();
        const result = createProjectSchema.safeParse(body);

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

        // Check slug uniqueness
        const existing = await db.project.findUnique({
            where:  { slug: data.slug },
            select: { id: true },
        });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    error:   "Validation failed",
                    details: { slug: ["This slug is already in use. Choose a different one."] },
                },
                { status: 400 }
            );
        }

        const project = await db.project.create({
            data: {
                title:           data.title,
                slug:            data.slug,
                summary:         data.summary,
                description:     data.description,
                category:        data.category,
                tags:            data.tags,
                status:          data.status,
                clientName:      data.clientName      ?? null,
                clientCountry:   data.clientCountry   ?? null,
                clientIndustry:  data.clientIndustry  ?? null,
                coverImage:      data.coverImage,
                images:          data.images,
                videoUrl:        data.videoUrl        ?? null,
                techStack:       data.techStack,
                duration:        data.duration        ?? null,
                deliveredAt:     data.deliveredAt     ? new Date(data.deliveredAt) : null,
                liveUrl:         data.liveUrl         ?? null,
                caseStudyUrl:    data.caseStudyUrl    ?? null,
                githubUrl:       data.githubUrl       ?? null,
                featured:        data.featured,
                order:           data.order,
                metaTitle:       data.metaTitle       ?? null,
                metaDescription: data.metaDescription ?? null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                data:    project,
                message: "Project created successfully",
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("POST /api/admin/projects error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to create project" },
            { status: 500 }
        );
    }
}