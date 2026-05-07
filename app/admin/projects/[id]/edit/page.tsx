"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin: Edit Project Form
//   /admin/projects/[id]/edit
//   Pre-fills form from existing project → PATCH /api/admin/projects/[id]
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import { useRouter, useParams }       from "next/navigation";
import Link                           from "next/link";
import { useForm }                    from "react-hook-form";
import { zodResolver }                from "@hookform/resolvers/zod";
import { z }                          from "zod";
import toast                          from "react-hot-toast";
import {
    ArrowLeft, Save, Trash2,
    Globe, Code2, Tag, RefreshCw,
    ExternalLink,
} from "lucide-react";
import { cn, slugify, formatDate }    from "@/lib/utils";
import { Button }                     from "@/components/ui/Button";
import type { Project }               from "@/lib/types";

// ─────────────────────────────────────────
// SCHEMA — same as new, all optional for partial update
// ─────────────────────────────────────────

const schema = z.object({
    title:           z.string().min(2,  "Title is required"),
    slug:            z.string().min(2,  "Slug is required")
        .regex(/^[a-z0-9-]+$/, "Lowercase, numbers and hyphens only"),
    summary:         z.string().min(10, "Summary is required"),
    description:     z.string().min(20, "Description is required"),
    category:        z.string().min(1,  "Category is required"),
    status:          z.string(),
    featured:        z.boolean(),
    order:           z.number().int(),
    clientName:      z.string().optional(),
    clientCountry:   z.string().optional(),
    clientIndustry:  z.string().optional(),
    coverImage:      z.string().url("Must be a valid URL"),
    videoUrl:        z.string().url().optional().or(z.literal("")),
    liveUrl:         z.string().url().optional().or(z.literal("")),
    githubUrl:       z.string().url().optional().or(z.literal("")),
    caseStudyUrl:    z.string().url().optional().or(z.literal("")),
    duration:        z.string().optional(),
    deliveredAt:     z.string().optional(),
    metaTitle:       z.string().optional(),
    metaDescription: z.string().optional(),
    tagsInput:       z.string().optional(),
    techStackInput:  z.string().optional(),
    imagesInput:     z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const CATEGORIES = [
    { value: "WEB_DEVELOPMENT",     label: "Web Development"     },
    { value: "APP_DEVELOPMENT",     label: "App Development"     },
    { value: "CLOUD_SERVICES",      label: "Cloud Services"      },
    { value: "ECOMMERCE",           label: "E-Commerce"          },
    { value: "UI_UX_DESIGN",        label: "UI/UX Design"        },
    { value: "DIGITAL_MARKETING",   label: "Digital Marketing"   },
    { value: "IT_CONSULTANCY",      label: "IT Consultancy"      },
    { value: "API_INTEGRATION",     label: "API & Integrations"  },
    { value: "ENTERPRISE_SOFTWARE", label: "Enterprise Software" },
    { value: "AUTOMATION_AI",       label: "AI & Automation"     },
    { value: "CYBERSECURITY",       label: "Cybersecurity"       },
    { value: "BRANDING",            label: "Branding & Creative" },
];

// ─────────────────────────────────────────
// FIELD HELPERS
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
// LOADING SKELETON
// ─────────────────────────────────────────

function LoadingSkeleton() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
            <div className="skeleton h-8 w-64 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {[200, 160, 120].map((h) => (
                        <div key={h} className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
                            <div className="skeleton h-5 w-40 rounded" />
                            <div className={`skeleton rounded-xl`} style={{ height: h }} />
                        </div>
                    ))}
                </div>
                <div className="space-y-5">
                    {[160, 120, 140].map((h) => (
                        <div key={h} className="bg-white rounded-2xl border border-neutral-100 p-5">
                            <div className={`skeleton rounded-xl`} style={{ height: h }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id     = params.id;

    const [project,  setProject]  = useState<Project | null>(null);
    const [loading,  setLoading]  = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const watchCover    = watch("coverImage");
    const watchStatus   = watch("status");
    const watchFeatured = watch("featured");

    // ── Fetch project on mount ──
    useEffect(() => {
        const token = localStorage.getItem("gts_admin_token");
        if (!token) { router.push("/admin/login"); return; }

        const fetchProject = async () => {
            try {
                const res  = await fetch(`/api/admin/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status === 404) { setNotFound(true); return; }
                if (res.status === 401) { router.push("/admin/login"); return; }

                const data = await res.json();
                if (!data.success) { setNotFound(true); return; }

                const p: Project = data.data;
                setProject(p);

                // Pre-fill form
                reset({
                    title:           p.title,
                    slug:            p.slug,
                    summary:         p.summary,
                    description:     p.description,
                    category:        p.category,
                    status:          p.status,
                    featured:        p.featured,
                    order:           p.order,
                    clientName:      p.clientName      ?? "",
                    clientCountry:   p.clientCountry   ?? "",
                    clientIndustry:  p.clientIndustry  ?? "",
                    coverImage:      p.coverImage,
                    videoUrl:        p.videoUrl        ?? "",
                    liveUrl:         p.liveUrl         ?? "",
                    githubUrl:       p.githubUrl       ?? "",
                    caseStudyUrl:    p.caseStudyUrl    ?? "",
                    duration:        p.duration        ?? "",
                    deliveredAt:     p.deliveredAt
                        ? new Date(p.deliveredAt).toISOString().split("T")[0]
                        : "",
                    tagsInput:       p.tags.join(", "),
                    techStackInput:  p.techStack.join(", "),
                    imagesInput:     p.images.join(", "),
                    metaTitle:       p.metaTitle       ?? "",
                    metaDescription: p.metaDescription ?? "",
                });
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, router, reset]);

    // ── Helpers ──
    const parseArray = (str: string = "") =>
        str.split(",").map((s) => s.trim()).filter(Boolean);

    // ── Submit ──
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

            const res  = await fetch(`/api/admin/projects/${id}`, {
                method:  "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                if (json.details) {
                    Object.entries(json.details).forEach(([field, msgs]) => {
                        toast.error(`${field}: ${(msgs as string[]).join(", ")}`);
                    });
                } else {
                    toast.error(json.error || "Failed to update project");
                }
                return;
            }

            toast.success("Project updated successfully!");
            router.push("/admin");
        } catch {
            toast.error("Network error. Please try again.");
        }
    };

    // ── Delete ──
    const handleDelete = async () => {
        if (!confirm(`Delete "${project?.title}"? This cannot be undone.`)) return;
        const token = localStorage.getItem("gts_admin_token");
        if (!token) { router.push("/admin/login"); return; }

        setDeleting(true);
        try {
            const res  = await fetch(`/api/admin/projects/${id}`, {
                method:  "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (!res.ok || !json.success) {
                toast.error(json.error || "Failed to delete project");
                return;
            }
            toast.success("Project deleted");
            router.push("/admin");
        } catch {
            toast.error("Network error.");
        } finally {
            setDeleting(false);
        }
    };

    // ── States ──
    if (loading) return <LoadingSkeleton />;

    if (notFound) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="font-display font-bold text-xl text-neutral-900 mb-2">
                        Project not found
                    </p>
                    <p className="font-body text-neutral-500 mb-6">
                        This project may have been deleted.
                    </p>
                    <Button asChild variant="primary" size="md">
                        <Link href="/admin">Back to Dashboard</Link>
                    </Button>
                </div>
            </div>
        );
    }

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
                        <div className="min-w-0">
                            <p className="font-display font-bold text-base text-neutral-900 truncate max-w-xs">
                                {project?.title}
                            </p>
                            <p className="font-body text-xs text-neutral-400">
                                Editing project
                                {project?.deliveredAt && (
                                    <> · Delivered {formatDate(project.deliveredAt, { year: "numeric", month: "short" })}</>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Unsaved changes indicator */}
                        {isDirty && (
                            <span className="font-body text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Unsaved changes
              </span>
                        )}

                        {/* View live */}
                        {project?.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-neutral-500 hover:text-brand hover:bg-brand/8 transition-colors"
                                aria-label="View live site"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}

                        {/* Status pill */}
                        <span className={cn(
                            "px-3 py-1 rounded-full font-body text-xs font-semibold",
                            watchStatus === "PUBLISHED"
                                ? "bg-green-500/10 text-green-600"
                                : watchStatus === "ARCHIVED"
                                    ? "bg-neutral-200 text-neutral-500"
                                    : "bg-amber-500/10 text-amber-600"
                        )}>
              {watchStatus === "PUBLISHED" ? "● Live"
                  : watchStatus === "ARCHIVED" ? "● Archived"
                      : "● Draft"}
            </span>

                        <Button
                            type="submit"
                            form="edit-form"
                            variant="primary"
                            size="sm"
                            rounded="full"
                            loading={isSubmitting}
                            loadingText="Saving..."
                            leftIcon={<Save size={14} />}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Form ── */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <form
                    id="edit-form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* ── LEFT (2 cols) ── */}
                    <div className="lg:col-span-2 space-y-6">

                        <FormSection title="Basic Information">
                            <div>
                                <Label required>Project Title</Label>
                                <input
                                    {...register("title")}
                                    className={cn(inputCls, errors.title && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.title?.message} />
                            </div>

                            <div>
                                <Label required hint="Changes the public URL">URL Slug</Label>
                                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400 pointer-events-none">
                    /portfolio/
                  </span>
                                    <input
                                        {...register("slug")}
                                        className={cn(inputCls, "pl-[88px]", errors.slug && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <FieldError message={errors.slug?.message} />
                            </div>

                            <div>
                                <Label required>Summary</Label>
                                <textarea
                                    {...register("summary")}
                                    rows={2}
                                    className={cn(inputCls, "resize-none", errors.summary && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.summary?.message} />
                            </div>

                            <div>
                                <Label required>Full Description</Label>
                                <textarea
                                    {...register("description")}
                                    rows={8}
                                    className={cn(inputCls, "resize-y min-h-[180px]", errors.description && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.description?.message} />
                            </div>
                        </FormSection>

                        <FormSection title="Media">
                            <div>
                                <Label required>Cover Image URL</Label>
                                <input
                                    {...register("coverImage")}
                                    className={cn(inputCls, errors.coverImage && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.coverImage?.message} />
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

                            <div>
                                <Label hint="Comma-separated URLs">Additional Images</Label>
                                <textarea
                                    {...register("imagesInput")}
                                    rows={2}
                                    className={cn(inputCls, "resize-none font-mono text-xs")}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <Label>Demo Video URL</Label>
                                <input
                                    {...register("videoUrl")}
                                    className={cn(inputCls, errors.videoUrl && errorCls)}
                                    disabled={isSubmitting}
                                />
                                <FieldError message={errors.videoUrl?.message} />
                            </div>
                        </FormSection>

                        <FormSection title="Technologies & Tags">
                            <div>
                                <Label hint="Comma-separated">
                                    <Code2 size={13} className="inline mr-1.5 text-brand" />
                                    Tech Stack
                                </Label>
                                <input
                                    {...register("techStackInput")}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label hint="Comma-separated">
                                    <Tag size={13} className="inline mr-1.5 text-brand" />
                                    Tags / Keywords
                                </Label>
                                <input
                                    {...register("tagsInput")}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormSection>

                        <FormSection title="Links">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>
                                        <Globe size={13} className="inline mr-1.5 text-brand" />
                                        Live Site URL
                                    </Label>
                                    <input
                                        {...register("liveUrl")}
                                        className={cn(inputCls, errors.liveUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.liveUrl?.message} />
                                </div>
                                <div>
                                    <Label>GitHub URL</Label>
                                    <input
                                        {...register("githubUrl")}
                                        className={cn(inputCls, errors.githubUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.githubUrl?.message} />
                                </div>
                                <div>
                                    <Label>Case Study URL</Label>
                                    <input
                                        {...register("caseStudyUrl")}
                                        className={cn(inputCls, errors.caseStudyUrl && errorCls)}
                                        disabled={isSubmitting}
                                    />
                                    <FieldError message={errors.caseStudyUrl?.message} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="SEO (Optional)">
                            <div>
                                <Label>Meta Title</Label>
                                <input
                                    {...register("metaTitle")}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label>Meta Description</Label>
                                <textarea
                                    {...register("metaDescription")}
                                    rows={2}
                                    className={cn(inputCls, "resize-none")}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormSection>
                    </div>

                    {/* ── RIGHT sidebar (1 col) ── */}
                    <div className="space-y-5">

                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Publish Settings
                            </h2>
                            <div>
                                <Label>Status</Label>
                                <select
                                    {...register("status")}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                >
                                    <option value="DRAFT">Draft — hidden</option>
                                    <option value="PUBLISHED">Published — live</option>
                                    <option value="ARCHIVED">Archived — hidden</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-body text-sm font-medium text-neutral-700">Featured</p>
                                    <p className="font-body text-xs text-neutral-400 mt-0.5">Pin to top of portfolio</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={watchFeatured}
                                    onClick={() => setValue("featured", !watchFeatured, { shouldDirty: true })}
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

                            <div>
                                <Label hint="Lower = first">Display Order</Label>
                                <input
                                    {...register("order", { valueAsNumber: true })}
                                    type="number"
                                    min={0}
                                    className={cn(inputCls)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Category
                            </h2>
                            <select
                                {...register("category")}
                                className={cn(inputCls, errors.category && errorCls)}
                                disabled={isSubmitting}
                            >
                                <option value="">Select category...</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                            <FieldError message={errors.category?.message} />
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Client Info
                            </h2>
                            <div>
                                <Label>Client Name</Label>
                                <input {...register("clientName")} className={cn(inputCls)} disabled={isSubmitting} />
                            </div>
                            <div>
                                <Label>Country</Label>
                                <input {...register("clientCountry")} className={cn(inputCls)} disabled={isSubmitting} />
                            </div>
                            <div>
                                <Label>Industry</Label>
                                <input {...register("clientIndustry")} className={cn(inputCls)} disabled={isSubmitting} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 space-y-4">
                            <h2 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                                Timeline
                            </h2>
                            <div>
                                <Label>Duration</Label>
                                <input {...register("duration")} className={cn(inputCls)} disabled={isSubmitting} />
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
                                form="edit-form"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={isSubmitting}
                                loadingText="Saving..."
                            >
                                Save Changes
                            </Button>

                            <Button asChild variant="secondary" size="lg" fullWidth>
                                <Link href="/admin">Cancel</Link>
                            </Button>

                            {/* Danger zone */}
                            <div className="pt-3 border-t border-neutral-100">
                                <Button
                                    variant="destructive"
                                    size="md"
                                    fullWidth
                                    loading={deleting}
                                    loadingText="Deleting..."
                                    leftIcon={<Trash2 size={14} />}
                                    onClick={handleDelete}
                                >
                                    Delete Project
                                </Button>
                                <p className="font-body text-xs text-neutral-400 text-center mt-2">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}