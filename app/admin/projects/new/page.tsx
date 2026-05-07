"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin: New Project Form
//   /admin/projects/new
//   Full project creation form → POST /api/admin/projects
// ═══════════════════════════════════════════════════════════════

import React, { useState } from "react";
import { useRouter }       from "next/navigation";
import Link                from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver }     from "@hookform/resolvers/zod";
import { z }               from "zod";
import { motion }          from "framer-motion";
import toast               from "react-hot-toast";
import {
    ArrowLeft, Plus, X, Save,
    Globe, Eye, EyeOff, Loader2,
    Image as ImageIcon, Tag, Code2,
} from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import { Button }      from "@/components/ui/Button";

// ─────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────

const schema = z.object({
    title:           z.string().min(2,  "Title is required"),
    slug:            z.string().min(2,  "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
    summary:         z.string().min(10, "Summary must be at least 10 characters"),
    description:     z.string().min(20, "Description must be at least 20 characters"),
    category:        z.string().min(1,  "Please select a category"),
    status:          z.string().default("DRAFT"),
    featured:        z.boolean().default(false),
    order:           z.number().int().default(0),
    clientName:      z.string().optional(),
    clientCountry:   z.string().optional(),
    clientIndustry:  z.string().optional(),
    coverImage:      z.string().url("Must be a valid URL"),
    videoUrl:        z.string().url("Must be a valid URL").optional().or(z.literal("")),
    liveUrl:         z.string().url("Must be a valid URL").optional().or(z.literal("")),
    githubUrl:       z.string().url("Must be a valid URL").optional().or(z.literal("")),
    caseStudyUrl:    z.string().url("Must be a valid URL").optional().or(z.literal("")),
    duration:        z.string().optional(),
    deliveredAt:     z.string().optional(),
    metaTitle:       z.string().optional(),
    metaDescription: z.string().optional(),
    // Arrays managed as comma-separated strings in the form
    tagsInput:       z.string().optional(),
    techStackInput:  z.string().optional(),
    imagesInput:     z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const CATEGORIES = [
    { value: "WEB_DEVELOPMENT",     label: "Web Development"       },
    { value: "APP_DEVELOPMENT",     label: "App Development"       },
    { value: "CLOUD_SERVICES",      label: "Cloud Services"        },
    { value: "ECOMMERCE",           label: "E-Commerce"            },
    { value: "UI_UX_DESIGN",        label: "UI/UX Design"          },
    { value: "DIGITAL_MARKETING",   label: "Digital Marketing"     },
    { value: "IT_CONSULTANCY",      label: "IT Consultancy"        },
    { value: "API_INTEGRATION",     label: "API & Integrations"    },
    { value: "ENTERPRISE_SOFTWARE", label: "Enterprise Software"   },
    { value: "AUTOMATION_AI",       label: "AI & Automation"       },
    { value: "CYBERSECURITY",       label: "Cybersecurity"         },
    { value: "BRANDING",            label: "Branding & Creative"   },
];

// ─────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────

function Label({
                   children,
                   required,
                   hint,
               }: {
    children: React.ReactNode;
    required?: boolean;
    hint?:     string;
}) {
    return (
        <div className="flex items-center justify-between mb-1.5">
            <label className="font-body text-sm font-medium text-neutral-700">
                {children}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {hint && (
                <span className="font-body text-xs text-neutral-400">{hint}</span>
            )}
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-1 font-body text-xs text-red-500 flex items-center gap-1" role="alert">
            <span>⚠</span> {message}
        </p>
    );
}

const inputCls = cn(
    "w-full rounded-xl border border-neutral-200 bg-white",
    "px-4 py-2.5 font-body text-sm text-neutral-900",
    "placeholder:text-neutral-400",
    "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
    "disabled:opacity-50 transition-all duration-200"
);

const errorCls = "border-red-300 focus:ring-red-200 focus:border-red-400";

// ─────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────

function FormSection({
                         title,
                         children,
                     }: {
    title:    string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 space-y-5">
            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                {title}
            </h2>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function NewProjectPage() {
    const router  = useRouter();
    const [preview, setPreview] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver:     zodResolver(schema),
        defaultValues: { status: "DRAFT", featured: false, order: 0 },
    });

    const watchTitle    = watch("title");
    const watchCover    = watch("coverImage");
    const watchStatus   = watch("status");
    const watchFeatured = watch("featured");

    // Auto-generate slug from title
    const handleTitleBlur = () => {
        const current = watch("slug");
        if (!current && watchTitle) {
            setValue("slug", slugify(watchTitle));
        }
    };

    // Parse comma-separated input to array
    const parseArray = (str: string = "") =>
        str.split(",").map((s) => s.trim()).filter(Boolean);

    const onSubmit = async (data: FormData) => {
        const token = localStorage.getItem("gts_admin_token");
        if (!token) { router.push("/admin/login"); return; }

        try {
            const payload = {
                title:           data.title,
                slug:            data.slug,
                summary:         data.summary,
                description:     data.description,
                category:        data.category,
                status:          data.status,
                featured:        data.featured,
                order:           data.order,
                clientName:      data.clientName      || null,
                clientCountry:   data.clientCountry   || null,
                clientIndustry:  data.clientIndustry  || null,
                coverImage:      data.coverImage,
                images:          parseArray(data.imagesInput),
                videoUrl:        data.videoUrl        || null,
                liveUrl:         data.liveUrl         || null,
                githubUrl:       data.githubUrl       || null,
                caseStudyUrl:    data.caseStudyUrl    || null,
                duration:        data.duration        || null,
                deliveredAt:     data.deliveredAt
                    ? new Date(data.deliveredAt).toISOString()
                    : null,
                tags:            parseArray(data.tagsInput),
                techStack:       parseArray(data.techStackInput),
                metaTitle:       data.metaTitle       || null,
                metaDescription: data.metaDescription || null,
            };

            const res  = await fetch("/api/admin/projects", {
                method:  "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                // Show field-level errors if returned
                if (json.details) {
                    Object.entries(json.details).forEach(([field, msgs]) => {
                        toast.error(`${field}: ${(msgs as string[]).join(", ")}`);
                    });
                } else {
                    toast.error(json.error || "Failed to create project");
                }
                return;
            }

            toast.success("Project created successfully!");
            router.push("/admin");
        } catch {
            toast.error("Network error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">

            {/* ── Header ── */}
            <header className="sticky top-0 z-20 bg-white border-b border-neutral-100 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                            aria-label="Back to dashboard"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <p className="font-display font-bold text-base text-neutral-900">
                                Add New Project
                            </p>
                            <p className="font-body text-xs text-neutral-400">
                                Fill in the details below and save
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status badge */}
                        <span className={cn(
                            "px-3 py-1 rounded-full font-body text-xs font-semibold",
                            watchStatus === "PUBLISHED"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-amber-500/10 text-amber-600"
                        )}>
              {watchStatus === "PUBLISHED" ? "● Published" : "● Draft"}
            </span>

                        <Button
                            type="submit"
                            form="project-form"
                            variant="primary"
                            size="sm"
                            rounded="full"
                            loading={isSubmitting}
                            loadingText="Saving..."
                            leftIcon={<Save size={14} />}
                        >
                            Save Project
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Form ── */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <form
                    id="project-form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* ── LEFT — Main content (2 cols) ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Basic info */}
                        <FormSection title="Basic Information">
                            {/* Title */}
                            <div>
                                <Label required>Project Title</Label>
                                <input
                                    {...register("title")}
                                    onBlur={handleTitleBlur}
                                    placeholder="e.g. Maviance Business Portal"
                                    className={cn(inputCls, errors.title && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.title?.message} />
                            </div>

                            {/* Slug */}
                            <div>
                                <Label required hint="Auto-generated from title">
                                    URL Slug
                                </Label>
                                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400 pointer-events-none">
                    /portfolio/
                  </span>
                                    <input
                                        {...register("slug")}
                                        placeholder="maviance-business-portal"
                                        className={cn(inputCls, "pl-[88px]", errors.slug && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <FieldError message={errors.slug?.message} />
                            </div>

                            {/* Summary */}
                            <div>
                                <Label required hint="Shown on project cards">
                                    Summary
                                </Label>
                                <textarea
                                    {...register("summary")}
                                    rows={2}
                                    placeholder="One-line description shown on portfolio cards..."
                                    className={cn(inputCls, "resize-none", errors.summary && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.summary?.message} />
                            </div>

                            {/* Description */}
                            <div>
                                <Label required hint="Full case study content">
                                    Full Description
                                </Label>
                                <textarea
                                    {...register("description")}
                                    rows={8}
                                    placeholder="Detailed project description, goals, challenges, solutions, and outcomes..."
                                    className={cn(inputCls, "resize-y min-h-[180px]", errors.description && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.description?.message} />
                            </div>
                        </FormSection>

                        {/* Media */}
                        <FormSection title="Media">
                            {/* Cover image */}
                            <div>
                                <Label required>Cover Image URL</Label>
                                <div className="flex gap-2">
                                    <input
                                        {...register("coverImage")}
                                        placeholder="https://res.cloudinary.com/your-cloud/..."
                                        className={cn(inputCls, "flex-1", errors.coverImage && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <FieldError message={errors.coverImage?.message} />
                                {/* Preview */}
                                {watchCover && !errors.coverImage && (
                                    <div className="mt-3 relative h-40 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={watchCover}
                                            alt="Cover preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Additional images */}
                            <div>
                                <Label hint="Comma-separated URLs">
                                    Additional Images
                                </Label>
                                <textarea
                                    {...register("imagesInput")}
                                    rows={2}
                                    placeholder="https://url1.com/img.jpg, https://url2.com/img.jpg"
                                    className={cn(inputCls, "resize-none font-mono text-xs")}
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <Label>Demo Video URL</Label>
                                <input
                                    {...register("videoUrl")}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className={cn(inputCls, errors.videoUrl && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.videoUrl?.message} />
                            </div>
                        </FormSection>

                        {/* Tech & Tags */}
                        <FormSection title="Technologies & Tags">
                            {/* Tech stack */}
                            <div>
                                <Label hint="Comma-separated">
                                    <Code2 size={13} className="inline mr-1.5 text-brand" />
                                    Tech Stack
                                </Label>
                                <input
                                    {...register("techStackInput")}
                                    placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS, Docker"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                                <p className="mt-1 font-body text-xs text-neutral-400">
                                    Separate each technology with a comma
                                </p>
                            </div>

                            {/* Tags */}
                            <div>
                                <Label hint="Comma-separated">
                                    <Tag size={13} className="inline mr-1.5 text-brand" />
                                    Tags / Keywords
                                </Label>
                                <input
                                    {...register("tagsInput")}
                                    placeholder="Fintech, Mobile Money, Dashboard, SaaS"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormSection>

                        {/* Links */}
                        <FormSection title="Links">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>
                                        <Globe size={13} className="inline mr-1.5 text-brand" />
                                        Live Site URL
                                    </Label>
                                    <input
                                        {...register("liveUrl")}
                                        placeholder="https://yourproject.com"
                                        className={cn(inputCls, errors.liveUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.liveUrl?.message} />
                                </div>

                                <div>
                                    <Label>GitHub URL</Label>
                                    <input
                                        {...register("githubUrl")}
                                        placeholder="https://github.com/..."
                                        className={cn(inputCls, errors.githubUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.githubUrl?.message} />
                                </div>

                                <div>
                                    <Label>Case Study URL</Label>
                                    <input
                                        {...register("caseStudyUrl")}
                                        placeholder="https://medium.com/..."
                                        className={cn(inputCls, errors.caseStudyUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.caseStudyUrl?.message} />
                                </div>
                            </div>
                        </FormSection>

                        {/* SEO */}
                        <FormSection title="SEO (Optional)">
                            <div>
                                <Label hint="Defaults to project title">Meta Title</Label>
                                <input
                                    {...register("metaTitle")}
                                    placeholder="Custom SEO title..."
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label hint="Defaults to summary">Meta Description</Label>
                                <textarea
                                    {...register("metaDescription")}
                                    rows={2}
                                    placeholder="Custom SEO description for search engines..."
                                    className={cn(inputCls, "resize-none")}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormSection>
                    </div>

                    {/* ── RIGHT — Sidebar (1 col) ── */}
                    <div className="space-y-5">

                        {/* Publish settings */}
                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Publish Settings
                            </h2>

                            {/* Status */}
                            <div>
                                <Label>Status</Label>
                                <select
                                    {...register("status")}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                >
                                    <option value="DRAFT">Draft — hidden from site</option>
                                    <option value="PUBLISHED">Published — visible on site</option>
                                    <option value="ARCHIVED">Archived — hidden</option>
                                </select>
                            </div>

                            {/* Featured toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-body text-sm font-medium text-neutral-700">
                                        Featured Project
                                    </p>
                                    <p className="font-body text-xs text-neutral-400 mt-0.5">
                                        Shown at the top of the portfolio
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={watchFeatured}
                                    onClick={() => setValue("featured", !watchFeatured)}
                                    className={cn(
                                        "relative w-11 h-6 rounded-full transition-colors duration-200",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                        watchFeatured ? "bg-brand" : "bg-neutral-200"
                                    )}
                                >
                  <span className={cn(
                      "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm",
                      "transition-transform duration-200",
                      watchFeatured ? "translate-x-5" : "translate-x-0"
                  )} />
                                </button>
                            </div>

                            {/* Sort order */}
                            <div>
                                <Label hint="Lower = appears first">Display Order</Label>
                                <input
                                    {...register("order", { valueAsNumber: true })}
                                    type="number"
                                    min={0}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Category
                            </h2>
                            <div>
                                <select
                                    {...register("category")}
                                    className={cn(inputCls, errors.category && errorCls)}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select category...</option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.category?.message} />
                            </div>
                        </div>

                        {/* Client info */}
                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Client Info
                            </h2>
                            <div>
                                <Label>Client Name</Label>
                                <input
                                    {...register("clientName")}
                                    placeholder="Maviance PLC"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label>Country</Label>
                                <input
                                    {...register("clientCountry")}
                                    placeholder="Cameroon"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label>Industry</Label>
                                <input
                                    {...register("clientIndustry")}
                                    placeholder="Fintech"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Timeline
                            </h2>
                            <div>
                                <Label>Duration</Label>
                                <input
                                    {...register("duration")}
                                    placeholder="3 months"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label>Delivery Date</Label>
                                <input
                                    {...register("deliveredAt")}
                                    type="date"
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button
                                type="submit"
                                form="project-form"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={isSubmitting}
                                loadingText="Creating project..."
                            >
                                Create Project
                            </Button>
                            <Button
                                asChild
                                variant="secondary"
                                size="lg"
                                fullWidth
                            >
                                <Link href="/admin">Cancel</Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}