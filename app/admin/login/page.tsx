"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Admin Dashboard
//   Project management · Stats · CRUD operations
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Plus, Search, Edit2, Trash2, Eye,
    ExternalLink, LogOut, LayoutDashboard,
    FolderOpen, Star, Globe2, RefreshCw,
    CheckCircle2, Clock, Archive, Filter,
} from "lucide-react";
import { cn, formatDateShort, enumToLabel } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge, CategoryBadge } from "@/components/ui/Badge";
import type { Project, ProjectStatus } from "@/lib/types";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface DashboardStats {
    total:     number;
    published: number;
    draft:     number;
    featured:  number;
}

// ─────────────────────────────────────────
// AUTH HOOK
// ─────────────────────────────────────────

function useAdminToken() {
    const [token,   setToken]   = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const t = localStorage.getItem("gts_admin_token");
        setToken(t);
        setChecked(true);
    }, []);

    return { token, checked };
}

// ─────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────

function StatCard({
                      icon,
                      label,
                      value,
                      color,
                  }: {
    icon:  React.ReactNode;
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div className={cn(
            "flex items-center gap-4 p-5 rounded-2xl",
            "bg-white border border-neutral-100 shadow-card"
        )}>
            <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                color
            )}>
                {icon}
            </div>
            <div>
                <p className="font-display font-bold text-2xl text-neutral-900">
                    {value}
                </p>
                <p className="font-body text-sm text-neutral-500">{label}</p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// DELETE CONFIRM MODAL
// ─────────────────────────────────────────

function DeleteModal({
                         project,
                         onConfirm,
                         onCancel,
                         loading,
                     }: {
    project:  Project;
    onConfirm: () => void;
    onCancel:  () => void;
    loading:   boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
                onClick={onCancel}
                aria-hidden="true"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1   }}
                className={cn(
                    "relative z-10 w-full max-w-md",
                    "bg-white rounded-2xl p-6 shadow-dark-lg"
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-title"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <Trash2 size={18} className="text-red-500" />
                    </div>
                    <h2 id="delete-title" className="font-display font-bold text-lg text-neutral-900">
                        Delete Project
                    </h2>
                </div>
                <p className="font-body text-sm text-neutral-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-neutral-900">
            &ldquo;{project.title}&rdquo;
          </span>
                    ? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        size="md"
                        fullWidth
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        size="md"
                        fullWidth
                        loading={loading}
                        loadingText="Deleting..."
                        onClick={onConfirm}
                    >
                        Delete Project
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────

export default function AdminDashboard() {
    const router           = useRouter();
    const { token, checked } = useAdminToken();

    const [projects,    setProjects]    = useState<Project[]>([]);
    const [stats,       setStats]       = useState<DashboardStats>({ total: 0, published: 0, draft: 0, featured: 0 });
    const [loading,     setLoading]     = useState(true);
    const [search,      setSearch]      = useState("");
    const [statusFilter,setStatusFilter]= useState<ProjectStatus | "ALL">("ALL");
    const [deleteTarget,setDeleteTarget]= useState<Project | null>(null);
    const [deleting,    setDeleting]    = useState(false);
    const [error,       setError]       = useState("");

    // ── Fetch projects ──
    const fetchProjects = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError("");
        try {
            const res  = await fetch("/api/admin/projects", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) { router.push("/admin/login"); return; }
            const data = await res.json();
            if (!data.success) { setError(data.error); return; }

            const all: Project[] = data.data;
            setProjects(all);
            setStats({
                total:     all.length,
                published: all.filter((p) => p.status === "PUBLISHED").length,
                draft:     all.filter((p) => p.status === "DRAFT").length,
                featured:  all.filter((p) => p.featured).length,
            });
        } catch {
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }, [token, router]);

    useEffect(() => {
        // Wait until localStorage has been checked
        if (!checked) return;
        if (!token) {
            router.push("/admin/login");
            return;
        }
        fetchProjects();
    }, [checked, token, fetchProjects, router]);

    // ── Logout ──
    const handleLogout = async () => {
        localStorage.removeItem("gts_admin_token");
        // Clear the auth cookie by calling a logout endpoint
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    // ── Delete ──
    const handleDelete = async () => {
        if (!deleteTarget || !token) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
                method:  "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!data.success) { setError(data.error); return; }
            setDeleteTarget(null);
            fetchProjects();
        } catch {
            setError("Failed to delete project.");
        } finally {
            setDeleting(false);
        }
    };

    // ── Toggle status ──
    const toggleStatus = async (project: Project) => {
        if (!token) return;
        const newStatus: ProjectStatus =
            project.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
        try {
            await fetch(`/api/admin/projects/${project.id}`, {
                method:  "PATCH",
                headers: {
                    Authorization:  `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchProjects();
        } catch {
            setError("Failed to update project status.");
        }
    };

    // ── Filtered list ──
    const filtered = projects.filter((p) => {
        const matchSearch =
            !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.clientName ?? "").toLowerCase().includes(search.toLowerCase());
        const matchStatus =
            statusFilter === "ALL" || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Still checking localStorage — show nothing to avoid flash
    if (!checked) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    <p className="font-body text-sm text-neutral-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">

            {/* ── Top navbar ── */}
            <header className="sticky top-0 z-20 bg-white border-b border-neutral-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-8 h-8 rounded-lg bg-brand text-white",
                            "flex items-center justify-center",
                            "font-display font-bold text-sm"
                        )}>
                            G
                        </div>
                        <div className="hidden sm:block">
                            <p className="font-display font-bold text-sm text-neutral-900 leading-none">
                                GTS Admin
                            </p>
                            <p className="font-body text-xs text-neutral-400">
                                Projects Dashboard
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            leftIcon={<Globe2 size={14} />}
                        >
                            <Link href="/" target="_blank">View Site</Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<LogOut size={14} />}
                            onClick={handleLogout}
                            className="text-neutral-500"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* ── Page title ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard size={20} className="text-brand" />
                        <div>
                            <h1 className="font-display font-bold text-2xl text-neutral-900">
                                Projects
                            </h1>
                            <p className="font-body text-sm text-neutral-500">
                                Manage your portfolio projects
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<RefreshCw size={14} />}
                            onClick={fetchProjects}
                            disabled={loading}
                        >
                            Refresh
                        </Button>
                        <Button
                            asChild
                            variant="primary"
                            size="sm"
                            leftIcon={<Plus size={14} />}
                            rounded="full"
                        >
                            <Link href="/admin/projects/new">Add Project</Link>
                        </Button>
                    </div>
                </div>

                {/* ── Error ── */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
                        {error}
                    </div>
                )}

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={<FolderOpen size={18} />}
                        label="Total Projects"
                        value={stats.total}
                        color="bg-brand/10 text-brand"
                    />
                    <StatCard
                        icon={<CheckCircle2 size={18} />}
                        label="Published"
                        value={stats.published}
                        color="bg-green-500/10 text-green-500"
                    />
                    <StatCard
                        icon={<Clock size={18} />}
                        label="Drafts"
                        value={stats.draft}
                        color="bg-amber-500/10 text-amber-500"
                    />
                    <StatCard
                        icon={<Star size={18} />}
                        label="Featured"
                        value={stats.featured}
                        color="bg-violet-500/10 text-violet-500"
                    />
                </div>

                {/* ── Filters ── */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects or clients..."
                            className={cn(
                                "w-full pl-9 pr-4 py-2.5 rounded-xl",
                                "border border-neutral-200 bg-white",
                                "font-body text-sm text-neutral-900",
                                "placeholder:text-neutral-400",
                                "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
                                "transition-all duration-200"
                            )}
                        />
                    </div>

                    {/* Status filter */}
                    <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
                        <Filter size={14} className="text-neutral-400 shrink-0" />
                        {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                aria-pressed={statusFilter === s}
                                className={cn(
                                    "px-3 py-1.5 rounded-full font-body text-xs font-medium border transition-all duration-200",
                                    statusFilter === s
                                        ? "bg-brand text-white border-brand"
                                        : "bg-white text-neutral-600 border-neutral-200 hover:border-brand/40 hover:text-brand"
                                )}
                            >
                                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Projects table ── */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <RefreshCw size={24} className="text-brand animate-spin mx-auto mb-3" />
                            <p className="font-body text-sm text-neutral-400">Loading projects...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center">
                            <FolderOpen size={32} className="text-neutral-300 mx-auto mb-3" />
                            <p className="font-body text-sm text-neutral-400">
                                {search || statusFilter !== "ALL"
                                    ? "No projects match your filters."
                                    : "No projects yet. Add your first project!"}
                            </p>
                            {!search && statusFilter === "ALL" && (
                                <Button
                                    asChild
                                    variant="primary"
                                    size="sm"
                                    className="mt-4"
                                    leftIcon={<Plus size={14} />}
                                >
                                    <Link href="/admin/projects/new">Add First Project</Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full" role="table">
                                <thead>
                                <tr className="border-b border-neutral-100 bg-neutral-50/60">
                                    {["Project", "Category", "Client", "Status", "Delivered", "Actions"].map((h) => (
                                        <th
                                            key={h}
                                            className="px-5 py-3.5 text-left font-body text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                {filtered.map((project, i) => (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-neutral-50/60 transition-colors group"
                                    >
                                        {/* Project */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {project.featured && (
                                                    <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" aria-label="Featured" />
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-display font-semibold text-sm text-neutral-900 truncate max-w-[200px]">
                                                        {project.title}
                                                    </p>
                                                    <p className="font-mono text-[10px] text-neutral-400 mt-0.5">
                                                        /{project.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-5 py-4">
                                            <CategoryBadge
                                                label={enumToLabel(project.category)
                                                    .replace(" Development", " Dev")
                                                    .replace(" Services", "")}
                                                className="text-[9px]"
                                            />
                                        </td>

                                        {/* Client */}
                                        <td className="px-5 py-4">
                                            <p className="font-body text-sm text-neutral-600 truncate max-w-[120px]">
                                                {project.clientName || "—"}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => toggleStatus(project)}
                                                title={`Click to ${project.status === "PUBLISHED" ? "unpublish" : "publish"}`}
                                                className="hover:opacity-70 transition-opacity"
                                            >
                                                <StatusBadge status={project.status} />
                                            </button>
                                        </td>

                                        {/* Delivered */}
                                        <td className="px-5 py-4">
                                            <p className="font-body text-sm text-neutral-500">
                                                {project.deliveredAt
                                                    ? formatDateShort(project.deliveredAt)
                                                    : "—"}
                                            </p>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* View live */}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="View live site"
                                                        className="p-1.5 rounded-lg text-neutral-400 hover:text-brand hover:bg-brand/8 transition-colors"
                                                    >
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}

                                                {/* View case study */}
                                                <Link
                                                    href={`/portfolio/${project.slug}`}
                                                    target="_blank"
                                                    aria-label="View case study"
                                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-brand hover:bg-brand/8 transition-colors"
                                                >
                                                    <Eye size={14} />
                                                </Link>

                                                {/* Edit */}
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    aria-label="Edit project"
                                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-brand hover:bg-brand/8 transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </Link>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => setDeleteTarget(project)}
                                                    aria-label="Delete project"
                                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/8 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Table footer */}
                            <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/40">
                                <p className="font-body text-xs text-neutral-400">
                                    Showing{" "}
                                    <span className="font-semibold text-neutral-600">{filtered.length}</span>
                                    {" "}of{" "}
                                    <span className="font-semibold text-neutral-600">{projects.length}</span>
                                    {" "}projects
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Delete modal ── */}
            {deleteTarget && (
                <DeleteModal
                    project={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                    loading={deleting}
                />
            )}
        </div>
    );
}