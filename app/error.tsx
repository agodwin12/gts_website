"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Global Error Boundary
//   Shown by Next.js when a page or layout throws at runtime.
//   Must be "use client" — Next.js requirement for error.tsx
// ═══════════════════════════════════════════════════════════════

import { useEffect } from "react";
import Link          from "next/link";
import { motion }    from "framer-motion";
import {
    AlertTriangle, RefreshCw,
    Home, MessageCircle, ArrowRight,
} from "lucide-react";
import { cn }        from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Button }    from "@/components/ui/Button";

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface ErrorProps {
    error:  Error & { digest?: string };
    reset:  () => void;
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function GlobalError({ error, reset }: ErrorProps) {
    // Log to console in dev — replace with Sentry / logging service in production
    useEffect(() => {
        console.error("[GTS Error Boundary]", error);
    }, [error]);

    const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello, I encountered an error on the GTS website and need help."
    )}`;

    return (
        <div
            className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-hidden"
            role="alert"
            aria-live="assertive"
        >
            {/* ── Background ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-red-500/5 rounded-full blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: "64px 64px",
                    }}
                />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center gap-8">

                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                        "w-20 h-20 rounded-2xl",
                        "bg-red-500/10 border border-red-500/20",
                        "flex items-center justify-center",
                        "shadow-[0_0_40px_rgba(239,68,68,0.1)]"
                    )}
                >
                    <AlertTriangle size={36} className="text-red-400" />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col gap-3"
                >
                    <h1 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight">
                        Something Went Wrong
                    </h1>
                    <p className="font-body text-neutral-400 leading-relaxed">
                        An unexpected error occurred. Our team has been notified and
                        we&apos;re working to fix it. Please try again or come back shortly.
                    </p>

                    {/* Error digest — shown in production for support reference */}
                    {error.digest && (
                        <p className="font-mono text-xs text-neutral-600 bg-white/4 border border-white/8 rounded-lg px-3 py-2 mt-1">
                            Error ID: {error.digest}
                        </p>
                    )}

                    {/* Dev-only error message */}
                    {process.env.NODE_ENV === "development" && error.message && (
                        <div className={cn(
                            "mt-2 p-4 rounded-xl text-left",
                            "bg-red-500/8 border border-red-500/20"
                        )}>
                            <p className="font-mono text-xs text-red-400 font-bold mb-1">
                                DEV ONLY — Error Message:
                            </p>
                            <p className="font-mono text-xs text-red-300 break-all leading-relaxed">
                                {error.message}
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full"
                >
                    {/* Try again */}
                    <Button
                        variant="primary"
                        size="lg"
                        rounded="full"
                        leftIcon={<RefreshCw size={16} />}
                        onClick={reset}
                        className="w-full sm:w-auto shadow-brand-lg"
                    >
                        Try Again
                    </Button>

                    {/* Home */}
                    <Button
                        asChild
                        variant="glass"
                        size="lg"
                        rounded="full"
                        leftIcon={<Home size={16} />}
                        className="w-full sm:w-auto"
                    >
                        <Link href="/">Go to Homepage</Link>
                    </Button>
                </motion.div>

                {/* Help strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className={cn(
                        "w-full flex flex-col sm:flex-row items-center justify-between gap-4",
                        "p-5 rounded-2xl",
                        "bg-white/4 border border-white/8"
                    )}
                >
                    <div className="text-left">
                        <p className="font-display font-semibold text-sm text-white">
                            Need help?
                        </p>
                        <p className="font-body text-xs text-neutral-500 mt-0.5">
                            If this keeps happening, contact us and we&apos;ll resolve it quickly.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {/* WhatsApp */}
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl",
                                "bg-green-500/15 border border-green-500/20",
                                "font-body text-xs font-semibold text-green-400",
                                "hover:bg-green-500/25 transition-colors"
                            )}
                        >
                            <MessageCircle size={13} />
                            WhatsApp
                        </a>

                        {/* Contact page */}
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            rounded="full"
                            rightIcon={<ArrowRight size={12} />}
                        >
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}