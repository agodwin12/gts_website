"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Portfolio Filters
//   URL-driven filters — category chips + search bar
// ═══════════════════════════════════════════════════════════════

import React, { useCallback, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn, enumToLabel } from "@/lib/utils";
import type { ProjectCategory } from "@/lib/types";

// ─────────────────────────────────────────
// CATEGORY CONFIG
// ─────────────────────────────────────────

const allCategories: { value: ProjectCategory | ""; label: string }[] = [
    { value: "",                    label: "All"             },
    { value: "WEB_DEVELOPMENT",     label: "Web Dev"         },
    { value: "APP_DEVELOPMENT",     label: "Mobile Apps"     },
    { value: "ECOMMERCE",           label: "E-Commerce"      },
    { value: "UI_UX_DESIGN",        label: "UI/UX"           },
    { value: "DIGITAL_MARKETING",   label: "Marketing"       },
    { value: "CLOUD_SERVICES",      label: "Cloud"           },
    { value: "IT_CONSULTANCY",      label: "Consultancy"     },
    { value: "API_INTEGRATION",     label: "API & Integrations"},
    { value: "ENTERPRISE_SOFTWARE", label: "Enterprise"      },
    { value: "AUTOMATION_AI",       label: "AI & Automation" },
    { value: "CYBERSECURITY",       label: "Cybersecurity"   },
    { value: "BRANDING",            label: "Branding"        },
];

interface PortfolioFiltersProps {
    categoryCounts: { category: ProjectCategory; count: number }[];
    activeCategory: string;
    search:         string;
    totalResults:   number;
}

export default function PortfolioFilters({
                                             categoryCounts,
                                             activeCategory,
                                             search,
                                             totalResults,
                                         }: PortfolioFiltersProps) {
    const router     = useRouter();
    const pathname   = usePathname();
    const [isPending, startTransition] = useTransition();

    // Build count map
    const countMap = Object.fromEntries(
        categoryCounts.map((c) => [c.category, c.count])
    );
    const totalCount = categoryCounts.reduce((sum, c) => sum + c.count, 0);

    // ── URL helpers ──
    const updateParams = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams();
            if (activeCategory) params.set("category", activeCategory);
            if (search)         params.set("search",   search);
            // Apply updates
            Object.entries(updates).forEach(([k, v]) => {
                if (v) params.set(k, v);
                else   params.delete(k);
            });
            // Always reset to page 1 when filtering
            params.delete("page");
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [activeCategory, search, pathname, router]
    );

    const setCategory = (cat: string) =>
        updateParams({ category: cat, search: "" });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
        updateParams({ search: q, category: "" });
    };

    const clearAll = () => {
        startTransition(() => router.push(pathname));
    };

    const hasFilters = !!activeCategory || !!search;

    return (
        <div className="space-y-5">

            {/* Top row — search + results count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative flex-1 max-w-sm"
                >
                    <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        aria-hidden="true"
                    />
                    <input
                        name="q"
                        type="search"
                        defaultValue={search}
                        placeholder="Search projects..."
                        className={cn(
                            "w-full pl-10 pr-4 py-2.5 rounded-xl",
                            "border border-neutral-200 bg-white",
                            "font-body text-sm text-neutral-900",
                            "placeholder:text-neutral-400",
                            "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
                            "transition-all duration-200"
                        )}
                        aria-label="Search projects"
                    />
                </form>

                {/* Results count + clear */}
                <div className="flex items-center gap-3 ml-auto">
          <span className="font-body text-sm text-neutral-500">
            <span className="font-semibold text-neutral-900">{totalResults}</span>{" "}
              project{totalResults !== 1 ? "s" : ""} found
          </span>

                    {hasFilters && (
                        <button
                            onClick={clearAll}
                            className={cn(
                                "inline-flex items-center gap-1.5",
                                "px-3 py-1.5 rounded-lg",
                                "font-body text-xs font-medium text-neutral-500",
                                "border border-neutral-200 bg-white",
                                "hover:border-red-300 hover:text-red-500",
                                "transition-all duration-200"
                            )}
                        >
                            <X size={12} />
                            Clear filters
                        </button>
                    )}

                    {isPending && (
                        <span className="font-body text-xs text-brand animate-pulse">
              Updating...
            </span>
                    )}
                </div>
            </div>

            {/* Category chips */}
            <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter by category"
            >
        <span className="inline-flex items-center gap-1.5 font-body text-xs text-neutral-400 self-center mr-1">
          <SlidersHorizontal size={12} />
          Filter:
        </span>

                {allCategories.map(({ value, label }) => {
                    const isActive = activeCategory === value;
                    const count    = value === ""
                        ? totalCount
                        : (countMap[value as ProjectCategory] ?? 0);

                    if (count === 0 && value !== "") return null;

                    return (
                        <button
                            key={value || "all"}
                            onClick={() => setCategory(value)}
                            aria-pressed={isActive}
                            className={cn(
                                "inline-flex items-center gap-1.5",
                                "px-3 py-1.5 rounded-full",
                                "font-body text-sm font-medium",
                                "border transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-brand focus-visible:ring-offset-1",
                                isActive
                                    ? "bg-brand text-white border-brand shadow-brand-sm"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-brand/40 hover:text-brand"
                            )}
                        >
                            {label}
                            <span
                                className={cn(
                                    "text-[10px] font-semibold tabular-nums",
                                    isActive ? "text-white/70" : "text-neutral-400"
                                )}
                            >
                {count}
              </span>
                        </button>
                    );
                })}
            </div>

            {/* Active search indicator */}
            {search && (
                <div className="flex items-center gap-2">
          <span className="font-body text-sm text-neutral-500">
            Showing results for{" "}
              <span className="font-semibold text-neutral-900">
              &ldquo;{search}&rdquo;
            </span>
          </span>
                    <button
                        onClick={() => updateParams({ search: "" })}
                        className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={12} /> Clear
                    </button>
                </div>
            )}
        </div>
    );
}