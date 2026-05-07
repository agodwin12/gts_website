// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Badge Component
//   Pill/tag component for labels, chips, and status indicators.
//
//   Usage:
//     <Badge>Web Development</Badge>
//     <Badge variant="success">Published</Badge>
//     <Badge variant="outline" size="lg">Next.js</Badge>
//     <Badge dot variant="brand">Live</Badge>
// ═══════════════════════════════════════════════════════════════

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────
// BADGE VARIANTS
// ─────────────────────────────────────────

const badgeVariants = cva(
    // Base styles
    [
        "inline-flex items-center justify-center gap-1.5",
        "font-body font-semibold",
        "tracking-wide",
        "border",
        "transition-colors duration-200",
        "whitespace-nowrap shrink-0",
    ],
    {
        variants: {
            variant: {
                // ── Brand — sky blue tint ──
                brand: [
                    "bg-brand/10 text-brand",
                    "border-brand/20",
                ],

                // ── Brand solid — filled sky blue ──
                "brand-solid": [
                    "bg-brand text-white",
                    "border-transparent",
                ],

                // ── Dark — neutral dark chip ──
                dark: [
                    "bg-neutral-900 text-neutral-300",
                    "border-neutral-800",
                ],

                // ── Light — subtle light chip ──
                light: [
                    "bg-neutral-100 text-neutral-700",
                    "border-neutral-200",
                ],

                // ── Outline — transparent with border ──
                outline: [
                    "bg-transparent text-neutral-700",
                    "border-neutral-300",
                    "hover:border-brand hover:text-brand hover:bg-brand/5",
                ],

                // ── Outline brand — transparent with brand border ──
                "outline-brand": [
                    "bg-transparent text-brand",
                    "border-brand/40",
                ],

                // ── White — for dark backgrounds ──
                white: [
                    "bg-white/10 text-white",
                    "border-white/20",
                ],

                // ── Glass — glassmorphism chip ──
                glass: [
                    "bg-white/5 text-white/80",
                    "border-white/10 backdrop-blur-sm",
                ],

                // ── Success — green ──
                success: [
                    "bg-green-500/10 text-green-600",
                    "border-green-500/20",
                ],

                // ── Warning — amber ──
                warning: [
                    "bg-amber-500/10 text-amber-600",
                    "border-amber-500/20",
                ],

                // ── Error / Danger — red ──
                error: [
                    "bg-red-500/10 text-red-600",
                    "border-red-500/20",
                ],

                // ── Info — blue ──
                info: [
                    "bg-blue-500/10 text-blue-600",
                    "border-blue-500/20",
                ],
            },

            size: {
                xs: "px-2    py-0.5  text-[10px] rounded-md gap-1",
                sm: "px-2.5  py-0.5  text-xs     rounded-lg gap-1",
                md: "px-3    py-1    text-xs     rounded-lg gap-1.5",
                lg: "px-4    py-1.5  text-sm     rounded-xl gap-2",
                xl: "px-5    py-2    text-base   rounded-xl gap-2",
            },

            interactive: {
                true: [
                    "cursor-pointer",
                    "hover:-translate-y-px active:translate-y-0",
                    "transition-transform duration-150",
                ],
                false: "cursor-default",
            },
        },

        defaultVariants: {
            variant:     "brand",
            size:        "md",
            interactive: false,
        },
    }
);

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {
    /** Show a pulsing dot indicator on the left */
    dot?:      boolean;
    /** Dot colour override — defaults to current text colour */
    dotColor?: string;
    /** Icon rendered before the label */
    icon?:     React.ReactNode;
    /** Make the badge a button element */
    asButton?: boolean;
    /** Active / selected state — e.g. for filter chips */
    active?:   boolean;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant,
            size,
            interactive,
            dot,
            dotColor,
            icon,
            asButton,
            active,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asButton ? "button" : "span";

        return (
            <Comp
                ref={ref as React.Ref<HTMLSpanElement & HTMLButtonElement>}
                className={cn(
                    badgeVariants({ variant, size, interactive }),
                    // Active state overrides — used for filter chips
                    active && [
                        "bg-brand text-white border-brand",
                        "shadow-brand-sm",
                    ],
                    className
                )}
                {...(asButton ? { type: "button" } : {})}
                {...props}
            >
                {/* Pulsing dot indicator */}
                {dot && (
                    <span
                        className="relative flex h-1.5 w-1.5 shrink-0"
                        aria-hidden="true"
                    >
            <span
                className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                    dotColor ?? "bg-current"
                )}
            />
            <span
                className={cn(
                    "relative inline-flex rounded-full h-1.5 w-1.5",
                    dotColor ?? "bg-current"
                )}
            />
          </span>
                )}

                {/* Left icon */}
                {icon && (
                    <span className="shrink-0 [&>svg]:w-3 [&>svg]:h-3" aria-hidden="true">
            {icon}
          </span>
                )}

                {/* Label */}
                {children}
            </Comp>
        );
    }
);

Badge.displayName = "Badge";

// ─────────────────────────────────────────
// STATUS BADGE — convenience wrapper
// Pre-configured for project status display
// ─────────────────────────────────────────

type StatusType = "PUBLISHED" | "DRAFT" | "ARCHIVED" | "live" | "beta" | "soon";

interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "dot"> {
    status: StatusType;
}

const statusConfig: Record<
    StatusType,
    { variant: BadgeProps["variant"]; label: string; dot: boolean }
> = {
    PUBLISHED: { variant: "success",  label: "Published", dot: true  },
    DRAFT:     { variant: "warning",  label: "Draft",     dot: false },
    ARCHIVED:  { variant: "dark",     label: "Archived",  dot: false },
    live:      { variant: "success",  label: "Live",      dot: true  },
    beta:      { variant: "warning",  label: "Beta",      dot: true  },
    soon:      { variant: "info",     label: "Coming Soon", dot: false },
};

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
    const config = statusConfig[status];
    return (
        <Badge
            variant={config.variant}
            dot={config.dot}
            className={className}
            {...props}
        >
            {config.label}
        </Badge>
    );
}

// ─────────────────────────────────────────
// TECH BADGE — convenience wrapper
// Pre-styled for tech stack chip display
// ─────────────────────────────────────────

interface TechBadgeProps extends Omit<BadgeProps, "variant" | "size"> {
    name: string;
}

export function TechBadge({ name, className, ...props }: TechBadgeProps) {
    return (
        <Badge
            variant="dark"
            size="sm"
            className={cn(
                "font-mono text-[11px] tracking-tight",
                "bg-neutral-900 border-neutral-700/50 text-neutral-300",
                "hover:border-brand/40 hover:text-brand transition-colors",
                className
            )}
            {...props}
        >
            {name}
        </Badge>
    );
}

// ─────────────────────────────────────────
// CATEGORY BADGE — convenience wrapper
// Pre-styled for project category labels
// ─────────────────────────────────────────

interface CategoryBadgeProps extends Omit<BadgeProps, "variant"> {
    label: string;
}

export function CategoryBadge({
                                  label,
                                  className,
                                  ...props
                              }: CategoryBadgeProps) {
    return (
        <Badge
            variant="brand"
            size="sm"
            className={cn("uppercase tracking-widest text-[10px]", className)}
            {...props}
        >
            {label}
        </Badge>
    );
}

// ─────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────

export { Badge, badgeVariants };
export default Badge;