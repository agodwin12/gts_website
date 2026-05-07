"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — 404 Not Found Page
//   Animated · Helpful links · On-brand dark design
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft, Home, FolderOpen,
    Mail, Globe, Smartphone, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────
// HELPFUL LINKS
// ─────────────────────────────────────────

const helpfulLinks = [
    {
        icon:        <Home       size={16} />,
        label:       "Homepage",
        description: "Back to the start",
        href:        "/",
    },
    {
        icon:        <FolderOpen size={16} />,
        label:       "Portfolio",
        description: "Browse our work",
        href:        "/portfolio",
    },
    {
        icon:        <Globe      size={16} />,
        label:       "Services",
        description: "What we offer",
        href:        "/services",
    },
    {
        icon:        <Smartphone size={16} />,
        label:       "About Us",
        description: "Our story & team",
        href:        "/about",
    },
    {
        icon:        <Mail       size={16} />,
        label:       "Contact",
        description: "Get in touch",
        href:        "/contact",
    },
];

// ─────────────────────────────────────────
// FLOATING CODE SNIPPETS (decorative)
// ─────────────────────────────────────────

const codeSnippets = [
    { text: "404: Not Found",   top: "15%", left: "8%",  delay: 0.3  },
    { text: "status: 404",      top: "70%", left: "5%",  delay: 0.6  },
    { text: "return undefined", top: "25%", right: "6%", delay: 0.4  },
    { text: "route.missing()",  top: "65%", right: "8%", delay: 0.7  },
    { text: "null",             top: "45%", left: "3%",  delay: 0.5  },
    { text: "page.tsx ✗",       top: "80%", right: "5%", delay: 0.8  },
];

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function NotFoundPage() {
    return (
        <>
            <Navbar />

            <main
                className="relative min-h-[90vh] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden py-20"
                aria-label="Page not found"
            >
                {/* ── Background ── */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    {/* Central glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand/8 rounded-full blur-[100px]" />

                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)
              `,
                            backgroundSize: "64px 64px",
                        }}
                    />

                    {/* Floating code snippets */}
                    {codeSnippets.map(({ text, top, left, right, delay }: {
                        text:   string;
                        top:    string;
                        left?:  string;
                        right?: string;
                        delay:  number;
                    }) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay }}
                            style={{ top, left, right }}
                            className={cn(
                                "absolute hidden lg:block",
                                "px-3 py-1.5 rounded-lg",
                                "bg-white/4 border border-white/8",
                                "font-mono text-xs text-neutral-500"
                            )}
                            aria-hidden="true"
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>

                {/* ── Main content ── */}
                <div className="relative z-10 container-gts flex flex-col items-center text-center gap-8 max-w-2xl">

                    {/* 404 number */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                        aria-hidden="true"
                    >
            <span
                className={cn(
                    "font-display font-bold",
                    "text-[10rem] sm:text-[14rem]",
                    "leading-none tracking-tight",
                    "text-white/5 select-none"
                )}
            >
              404
            </span>
                        {/* Overlay text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={cn(
                                "w-20 h-20 rounded-2xl",
                                "bg-brand/15 border border-brand/25",
                                "flex items-center justify-center",
                                "shadow-glow"
                            )}>
                <span
                    className="font-display font-bold text-3xl text-brand"
                    aria-hidden="true"
                >
                  !
                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-3"
                    >
                        <h1 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight">
                            Page Not Found
                        </h1>
                        <p className="font-body text-neutral-400 text-lg leading-relaxed">
                            The page you&apos;re looking for doesn&apos;t exist or has been moved.
                            <br className="hidden sm:block" />
                            Let&apos;s get you back on track.
                        </p>
                    </motion.div>

                    {/* Primary actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button
                            asChild
                            variant="primary"
                            size="lg"
                            rounded="full"
                            leftIcon={<Home size={16} />}
                            className="shadow-brand-lg"
                        >
                            <Link href="/">Back to Homepage</Link>
                        </Button>

                        <Button
                            asChild
                            variant="glass"
                            size="lg"
                            rounded="full"
                            leftIcon={<ArrowLeft size={16} />}
                            onClick={() => window.history.back()}
                        >
                            <button type="button" onClick={() => window.history.back()}>
                                Go Back
                            </button>
                        </Button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                        className="flex items-center gap-4 w-full max-w-sm"
                    >
                        <div className="flex-1 h-px bg-white/8" />
                        <span className="font-body text-xs text-neutral-600">
              or explore
            </span>
                        <div className="flex-1 h-px bg-white/8" />
                    </motion.div>

                    {/* Helpful links grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full"
                    >
                        {helpfulLinks.map(({ icon, label, description, href }, i) => (
                            <motion.div
                                key={href}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                            >
                                <Link
                                    href={href}
                                    className={cn(
                                        "group flex flex-col items-center gap-2",
                                        "p-4 rounded-2xl text-center",
                                        "bg-white/4 border border-white/8",
                                        "hover:bg-white/8 hover:border-brand/30",
                                        "transition-all duration-200",
                                        "focus-visible:outline-none focus-visible:ring-2",
                                        "focus-visible:ring-brand focus-visible:ring-offset-2",
                                        "focus-visible:ring-offset-neutral-950"
                                    )}
                                >
                  <span
                      className={cn(
                          "w-9 h-9 rounded-xl",
                          "flex items-center justify-center",
                          "bg-brand/10 text-brand",
                          "group-hover:bg-brand group-hover:text-white",
                          "transition-all duration-200"
                      )}
                  >
                    {icon}
                  </span>
                                    <span className="font-display font-semibold text-sm text-white group-hover:text-brand transition-colors">
                    {label}
                  </span>
                                    <span className="font-body text-xs text-neutral-500">
                    {description}
                  </span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact prompt */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className={cn(
                            "flex items-center justify-between gap-4",
                            "w-full p-5 rounded-2xl",
                            "bg-white/4 border border-white/8",
                            "hover:border-brand/20 transition-colors"
                        )}
                    >
                        <div className="text-left">
                            <p className="font-display font-semibold text-sm text-white">
                                Looking for something specific?
                            </p>
                            <p className="font-body text-xs text-neutral-500 mt-0.5">
                                Our team can help point you in the right direction.
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="primary"
                            size="sm"
                            rounded="full"
                            rightIcon={<ArrowRight size={13} />}
                            className="shrink-0"
                        >
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    );
}