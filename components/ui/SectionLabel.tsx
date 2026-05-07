// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — SectionLabel Component
//   Eyebrow text shown above section headings.
//   Creates visual rhythm and context across the page.
//
//   Usage:
//     <SectionLabel>Our Services</SectionLabel>
//     <SectionLabel variant="dark" align="center">Portfolio</SectionLabel>
//     <SectionLabel icon={<Rocket size={14} />}>What We Build</SectionLabel>
// ═══════════════════════════════════════════════════════════════

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────

const sectionLabelVariants = cva(
    // Base
    [
        "inline-flex items-center gap-2.5",
        "font-body font-semibold",
        "text-xs tracking-[0.2em] uppercase",
        "transition-colors duration-200",
    ],
    {
        variants: {
            variant: {
                // ── Default — brand colour on light background ──
                default: "text-brand",

                // ── Dark — for dark / navy section backgrounds ──
                dark: "text-brand-light",

                // ── Muted — subtle, secondary label ──
                muted: "text-neutral-500",

                // ── White — pure white for image overlays ──
                white: "text-white/80",
            },

            align: {
                left:   "justify-start",
                center: "justify-center",
                right:  "justify-end",
            },

            // Whether to show the decorative line before the text
            line: {
                true:  "",
                false: "",
            },
        },

        defaultVariants: {
            variant: "default",
            align:   "left",
            line:    true,
        },
    }
);

// ─────────────────────────────────────────
// LINE COLOUR MAP
// ─────────────────────────────────────────

const lineColorMap: Record<
    NonNullable<VariantProps<typeof sectionLabelVariants>["variant"]>,
    string
> = {
    default: "bg-brand",
    dark:    "bg-brand-light",
    muted:   "bg-neutral-400",
    white:   "bg-white/60",
};

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export interface SectionLabelProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof sectionLabelVariants> {
    /** Optional icon rendered before the text */
    icon?: React.ReactNode;
    /** Show decorative line accent — defaults to true */
    line?: boolean;
    /** Optional dot accent instead of line */
    dot?: boolean;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

const SectionLabel = React.forwardRef<HTMLSpanElement, SectionLabelProps>(
    (
        {
            className,
            variant = "default",
            align = "left",
            line = true,
            dot = false,
            icon,
            children,
            ...props
        },
        ref
    ) => {
        const lineColor = lineColorMap[variant ?? "default"];

        return (
            <span
                ref={ref}
                className={cn(
                    sectionLabelVariants({ variant, align, line }),
                    className
                )}
                {...props}
            >
        {/* Decorative dot — alternative to line */}
                {dot && !line && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "inline-block w-1.5 h-1.5 rounded-full shrink-0",
                            lineColor
                        )}
                    />
                )}

                {/* Decorative leading line */}
                {line && !dot && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "inline-block h-px shrink-0 rounded-full",
                            "w-6",
                            lineColor
                        )}
                    />
                )}

                {/* Optional icon */}
                {icon && (
                    <span
                        aria-hidden="true"
                        className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5"
                    >
            {icon}
          </span>
                )}

                {/* Label text */}
                <span>{children}</span>

                {/* Trailing line — shown when align is center for symmetry */}
                {line && !dot && align === "center" && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "inline-block h-px shrink-0 rounded-full",
                            "w-6",
                            lineColor
                        )}
                    />
                )}
      </span>
        );
    }
);

SectionLabel.displayName = "SectionLabel";

// ─────────────────────────────────────────
// SECTION HEADER — convenience composite
// Combines SectionLabel + heading + subheading
// into a single pre-structured block
// ─────────────────────────────────────────

export interface SectionHeaderProps {
    label?:       string;
    labelVariant?: SectionLabelProps["variant"];
    labelIcon?:   React.ReactNode;
    heading:      React.ReactNode;
    subheading?:  React.ReactNode;
    align?:       "left" | "center" | "right";
    dark?:        boolean;
    className?:   string;
    headingClassName?: string;
    subheadingClassName?: string;
}

export function SectionHeader({
                                  label,
                                  labelVariant,
                                  labelIcon,
                                  heading,
                                  subheading,
                                  align = "left",
                                  dark = false,
                                  className,
                                  headingClassName,
                                  subheadingClassName,
                              }: SectionHeaderProps) {
    const alignClass = {
        left:   "items-start text-left",
        center: "items-center text-center",
        right:  "items-end text-right",
    }[align];

    return (
        <div className={cn("flex flex-col gap-4", alignClass, className)}>
            {/* Eyebrow label */}
            {label && (
                <SectionLabel
                    variant={labelVariant ?? (dark ? "dark" : "default")}
                    align={align}
                    icon={labelIcon}
                >
                    {label}
                </SectionLabel>
            )}

            {/* Main heading */}
            <h2
                className={cn(
                    "font-display font-bold tracking-tight text-balance",
                    "text-3xl sm:text-4xl lg:text-5xl",
                    dark ? "text-white" : "text-neutral-900",
                    headingClassName
                )}
            >
                {heading}
            </h2>

            {/* Optional subheading */}
            {subheading && (
                <p
                    className={cn(
                        "font-body text-lg leading-relaxed",
                        align === "center" && "max-w-2xl",
                        align === "left"   && "max-w-xl",
                        dark ? "text-neutral-400" : "text-neutral-500",
                        subheadingClassName
                    )}
                >
                    {subheading}
                </p>
            )}
        </div>
    );
}

// ─────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────

export { SectionLabel, sectionLabelVariants };
export default SectionLabel;