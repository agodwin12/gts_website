"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Splash Screen
//   Shown for 4 seconds on first visit
//   Animated logo · Rings · Particles · Progress bar
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from "react";
import Image  from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────
// PHASE TYPE
// ─────────────────────────────────────────

type Phase = "intro" | "logo" | "tagline" | "out";

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
    id:       i,
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    size:     Math.random() * 3 + 1,
    delay:    Math.random() * 2,
    duration: Math.random() * 3 + 2,
}));

const TECH_WORDS = [
    { word: "Web Development",   delay: 0.5  },
    { word: "Mobile Apps",       delay: 0.9  },
    { word: "Cloud Services",    delay: 1.3  },
    { word: "AI & Automation",   delay: 1.7  },
    { word: "UI/UX Design",      delay: 2.1  },
    { word: "Digital Marketing", delay: 2.5  },
];

const CORNER_PATHS: Record<number, string> = {
    0: "M 0 16 L 0 0 L 16 0",
    1: "M 16 0 L 32 0 L 32 16",
    2: "M 0 16 L 0 32 L 16 32",
    3: "M 16 32 L 32 32 L 32 16",
};

const CORNER_POSITIONS = [
    "top-6 left-6",
    "top-6 right-6",
    "bottom-6 left-6",
    "bottom-6 right-6",
];

// ─────────────────────────────────────────
// HELPERS — avoid inline comparisons
// ─────────────────────────────────────────

function showMain(p: Phase): boolean {
    return p === "logo" || p === "tagline" || p === "out";
}

function showTagline(p: Phase): boolean {
    return p === "tagline" || p === "out";
}

function showScreen(p: Phase): boolean {
    return p === "intro" || p === "logo" || p === "tagline";
}

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const [phase,    setPhase]    = useState<Phase>("intro");

    // ── Progress bar ──
    useEffect(() => {
        const duration = 6000;
        const interval = 30;
        const step     = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) { clearInterval(timer); return 100; }
                return Math.min(p + step, 100);
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // ── Phase transitions ──
    useEffect(() => {
        const t1 = setTimeout(() => setPhase("logo"),    400);
        const t2 = setTimeout(() => setPhase("tagline"), 1800);
        const t3 = setTimeout(() => setPhase("out"),     3400);
        const t4 = setTimeout(() => onComplete(),        4000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {showScreen(phase) && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale:   1.05,
                        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className={cn(
                        "fixed inset-0 z-[999]",
                        "flex flex-col items-center justify-center",
                        "bg-neutral-950 overflow-hidden"
                    )}
                    aria-label="Loading Godwin Tech Solutions"
                    role="status"
                >
                    {/* ── Background grid ── */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
              `,
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* ── Radial glow ── */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1   }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width:      600,
                            height:     600,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.04) 40%, transparent 70%)",
                        }}
                    />

                    {/* ── Outer rotating ring ── */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, rotate: 0   }}
                        animate={{ opacity: 1, rotate: 360 }}
                        transition={{
                            opacity: { duration: 0.5, delay: 0.3 },
                            rotate:  { duration: 8, ease: "linear", repeat: Infinity },
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: 320, height: 320 }}
                    >
                        <svg width="320" height="320" viewBox="0 0 320 320">
                            <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
                            <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(14,165,233,0.4)"  strokeWidth="1.5" strokeLinecap="round" strokeDasharray="60 882" />
                        </svg>
                    </motion.div>

                    {/* ── Inner counter-rotating ring ── */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, rotate: 0    }}
                        animate={{ opacity: 1, rotate: -360 }}
                        transition={{
                            opacity: { duration: 0.5, delay: 0.5 },
                            rotate:  { duration: 5, ease: "linear", repeat: Infinity },
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: 260, height: 260 }}
                    >
                        <svg width="260" height="260" viewBox="0 0 260 260">
                            <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(14,165,233,0.05)" strokeWidth="1" />
                            {[0, 90, 180, 270].map((angle) => (
                                <circle
                                    key={angle}
                                    cx={130 + 120 * Math.cos((angle * Math.PI) / 180)}
                                    cy={130 + 120 * Math.sin((angle * Math.PI) / 180)}
                                    r="3"
                                    fill="rgba(14,165,233,0.6)"
                                />
                            ))}
                        </svg>
                    </motion.div>

                    {/* ── Floating particles ── */}
                    {PARTICLES.map((p) => (
                        <motion.div
                            key={p.id}
                            aria-hidden="true"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: [0, 0.6, 0], y: -80 }}
                            transition={{
                                duration:    p.duration,
                                delay:       p.delay,
                                repeat:      Infinity,
                                repeatDelay: Math.random() * 2,
                            }}
                            className="absolute rounded-full bg-brand pointer-events-none"
                            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                        />
                    ))}

                    {/* ── Main content ── */}
                    <div className="relative z-10 flex flex-col items-center gap-6">

                        {/* Logo */}
                        {showMain(phase) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.3, y: 30 }}
                                animate={{ opacity: 1, scale: 1,   y: 0  }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 30px rgba(14,165,233,0.2)",
                                            "0 0 60px rgba(14,165,233,0.5)",
                                            "0 0 30px rgba(14,165,233,0.2)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full blur-xl"
                                />
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Image
                                        src="/logo/logo.png"
                                        alt="Godwin Tech Solutions"
                                        width={140}
                                        height={140}
                                        className="object-contain drop-shadow-[0_0_30px_rgba(14,165,233,0.4)]"
                                        priority
                                    />
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Company name + tagline */}
                        {showMain(phase) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0  }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-center"
                            >
                                <motion.h1
                                    className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight"
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(14,165,233,0)",
                                            "0 0 20px rgba(14,165,233,0.4)",
                                            "0 0 20px rgba(14,165,233,0)",
                                        ],
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                >
                                    Godwin Tech Solutions
                                </motion.h1>

                                {showTagline(phase) && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-body text-brand text-sm sm:text-base tracking-widest uppercase mt-2"
                                    >
                                        Where Innovation Meets Execution
                                    </motion.p>
                                )}
                            </motion.div>
                        )}

                        {/* Floating tech words */}
                        <div className="relative h-8 w-64 overflow-hidden">
                            {TECH_WORDS.map(({ word, delay }) => (
                                <motion.span
                                    key={word}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                                    transition={{ duration: 1.2, delay, times: [0, 0.2, 0.7, 1] }}
                                    className="absolute inset-0 flex items-center justify-center font-mono text-xs text-brand/60 tracking-widest uppercase"
                                >
                                    ✦ {word} ✦
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* ── Progress bar ── */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64">
                        <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase">
                Loading
              </span>
                            <span className="font-mono text-[10px] text-brand">
                {Math.round(progress)}%
              </span>
                        </div>
                        <div className="w-full h-px bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-75"
                                style={{
                                    width:      `${progress}%`,
                                    background: "linear-gradient(90deg, #0369a1, #0ea5e9, #38bdf8)",
                                    boxShadow:  "0 0 8px rgba(14,165,233,0.6)",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Corner accents ── */}
                    {CORNER_POSITIONS.map((pos, i) => (
                        <motion.div
                            key={i}
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1   }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                            className={`absolute ${pos} w-8 h-8 pointer-events-none`}
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32">
                                <path
                                    d={CORNER_PATHS[i]}
                                    fill="none"
                                    stroke="rgba(14,165,233,0.3)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </motion.div>
                    ))}

                    <span className="sr-only">Loading Godwin Tech Solutions website…</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}