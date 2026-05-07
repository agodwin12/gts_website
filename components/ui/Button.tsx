"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Button Component
// ═══════════════════════════════════════════════════════════════

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2",
        "font-body font-semibold",
        "rounded-xl",
        "border border-transparent",
        "transition-all duration-250 ease-smooth",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-brand focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "select-none cursor-pointer",
        "whitespace-nowrap",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-brand text-white",
                    "hover:bg-brand-dark",
                    "shadow-brand hover:shadow-brand-lg",
                    "hover:-translate-y-0.5 active:translate-y-0",
                ],
                secondary: [
                    "bg-white text-neutral-900",
                    "border-neutral-200",
                    "hover:border-brand hover:text-brand",
                    "hover:shadow-brand-sm hover:-translate-y-0.5",
                    "active:translate-y-0",
                ],
                outline: [
                    "bg-transparent text-brand",
                    "border-brand/40",
                    "hover:bg-brand hover:text-white hover:border-brand",
                    "hover:-translate-y-0.5 active:translate-y-0",
                ],
                ghost: [
                    "bg-transparent text-neutral-600",
                    "hover:bg-neutral-100 hover:text-neutral-900",
                    "active:bg-neutral-200",
                ],
                dark: [
                    "bg-neutral-900 text-white",
                    "hover:bg-neutral-800",
                    "hover:-translate-y-0.5 active:translate-y-0",
                    "shadow-dark-sm hover:shadow-dark",
                ],
                glass: [
                    "bg-white/10 text-white",
                    "border-white/20 backdrop-blur-sm",
                    "hover:bg-white/20 hover:border-white/30",
                    "hover:-translate-y-0.5 active:translate-y-0",
                ],
                destructive: [
                    "bg-red-500 text-white",
                    "hover:bg-red-600",
                    "hover:-translate-y-0.5 active:translate-y-0",
                ],
                link: [
                    "bg-transparent text-brand underline-offset-4",
                    "hover:underline hover:text-brand-dark",
                    "p-0 h-auto rounded-none border-none",
                ],
            },
            size: {
                xs:        "h-8  px-3   text-xs   gap-1.5",
                sm:        "h-9  px-4   text-sm   gap-1.5",
                md:        "h-11 px-6   text-base gap-2",
                lg:        "h-13 px-8   text-lg   gap-2.5",
                xl:        "h-15 px-10  text-xl   gap-3",
                icon:      "h-10 w-10  p-0",
                "icon-sm": "h-8  w-8   p-0",
                "icon-lg": "h-12 w-12  p-0",
            },
            rounded: {
                default: "rounded-xl",
                full:    "rounded-full",
                none:    "rounded-none",
                sm:      "rounded-lg",
            },
            fullWidth: {
                true:  "w-full",
                false: "w-auto",
            },
        },
        defaultVariants: {
            variant:   "primary",
            size:      "md",
            rounded:   "default",
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?:     boolean;
    loading?:     boolean;
    leftIcon?:    React.ReactNode;
    rightIcon?:   React.ReactNode;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            fullWidth,
            asChild = false,
            loading = false,
            disabled,
            leftIcon,
            rightIcon,
            loadingText,
            children,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || loading;

        // ── asChild mode — Slot only accepts ONE child.
        //    Pass className only; icons/loading not supported in asChild mode.
        if (asChild) {
            return (
                <Slot
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, rounded, fullWidth }), className)}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        // ── Normal button mode
        return (
            <button
                ref={ref}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading}
                className={cn(buttonVariants({ variant, size, rounded, fullWidth }), className)}
                {...props}
            >
                {loading && (
                    <Loader2
                        className="animate-spin shrink-0"
                        size={size === "xs" || size === "sm" ? 14 : size === "lg" || size === "xl" ? 20 : 16}
                        aria-hidden="true"
                    />
                )}

                {!loading && leftIcon && (
                    <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
                )}

                {loading && loadingText ? loadingText : children}

                {!loading && rightIcon && (
                    <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;