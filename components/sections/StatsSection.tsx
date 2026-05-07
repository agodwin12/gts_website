"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Stats Section
//   Animated counters · Dark mesh background · Trust signals
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import {
    Trophy, Users, Globe2, Calendar,
    CheckCircle2, Star, Zap, HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { stats, siteConfig } from "@/lib/config";
import { SectionHeader } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// ICON MAP — one icon per stat
// ─────────────────────────────────────────

const statIcons = [
    <Trophy      key="trophy" size={20} />,
    <Users       key="users"  size={20} />,
    <Globe2      key="globe"  size={20} />,
    <Calendar    key="cal"    size={20} />,
];

// ─────────────────────────────────────────
// TRUST BADGES
// ─────────────────────────────────────────

const trustBadges = [
    { icon: <CheckCircle2 size={15} />, label: "On-time delivery"        },
    { icon: <Star         size={15} />, label: "5★ average rating"       },
    { icon: <Zap          size={15} />, label: "Fast turnaround"         },
    { icon: <HeartHandshake size={15}/>, label: "Long-term partnerships" },
];

// ─────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────

function StatCard({
                      value,
                      suffix,
                      label,
                      description,
                      icon,
                      index,
                      inView,
                  }: {
    value:        number;
    suffix?:      string;
    label:        string;
    description?: string;
    icon:         React.ReactNode;
    index:        number;
    inView:       boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay:    index * 0.12,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "relative flex flex-col items-center text-center",
                "p-8 rounded-2xl",
                "bg-white/4 backdrop-blur-sm",
                "border border-white/8",
                "hover:border-brand/30 hover:bg-white/6",
                "transition-all duration-300 group"
            )}
        >
            {/* Glow on hover */}
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-300",
                    "bg-gradient-to-b from-brand/5 to-transparent"
                )}
            />

            {/* Icon */}
            <div
                className={cn(
                    "relative z-10 w-11 h-11 rounded-xl mb-5",
                    "flex items-center justify-center",
                    "bg-brand/15 text-brand",
                    "group-hover:bg-brand group-hover:text-white",
                    "group-hover:shadow-brand",
                    "transition-all duration-300"
                )}
            >
                {icon}
            </div>

            {/* Animated counter */}
            <div className="relative z-10 flex items-end justify-center gap-0.5 mb-2">
                {inView ? (
                    <CountUp
                        start={0}
                        end={value}
                        duration={2.2}
                        delay={index * 0.12}
                        separator=","
                        useEasing
                        enableScrollSpy={false}
                    >
                        {({ countUpRef }) => (
                            <span
                                ref={countUpRef}
                                className="font-display font-bold text-5xl lg:text-6xl text-white tabular-nums"
                            />
                        )}
                    </CountUp>
                ) : (
                    <span className="font-display font-bold text-5xl lg:text-6xl text-white tabular-nums">
            0
          </span>
                )}
                {suffix && (
                    <span className="font-display font-bold text-3xl text-brand mb-1">
            {suffix}
          </span>
                )}
            </div>

            {/* Label */}
            <p className="relative z-10 font-display font-semibold text-lg text-white mb-1">
                {label}
            </p>

            {/* Description */}
            {description && (
                <p className="relative z-10 font-body text-sm text-neutral-500 leading-snug">
                    {description}
                </p>
            )}
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────

export default function StatsSection() {
    const ref    = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="stats"
            ref={ref}
            className={cn(
                "relative section overflow-hidden",
                "bg-neutral-950"
            )}
            aria-labelledby="stats-heading"
        >
            {/* Background mesh */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand/6 blur-[120px]" />
                <div className="absolute bottom-0 left-0  w-64 h-64 rounded-full bg-brand/4 blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-brand/4 blur-[80px]" />

                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            <div className="relative z-10 container-gts">

                {/* Section header */}
                <div className="text-center mb-16">
                    <SectionHeader
                        label="Our Track Record"
                        heading={
                            <>
                                Numbers That{" "}
                                <span className="gradient-text">Tell the Story</span>
                            </>
                        }
                        subheading={`Since ${siteConfig.foundedYear}, we've been building digital products that move businesses forward across Cameroon and beyond.`}
                        align="center"
                        dark
                        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
                    />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            description={stat.description}
                            icon={statIcons[index]}
                            index={index}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* Trust badges strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={cn(
                        "flex flex-wrap items-center justify-center gap-4",
                        "py-6 px-8 rounded-2xl",
                        "border border-white/6 bg-white/2"
                    )}
                >
                    {trustBadges.map(({ icon, label }, i) => (
                        <React.Fragment key={label}>
              <span className="inline-flex items-center gap-2 font-body text-sm text-neutral-400">
                <span className="text-brand">{icon}</span>
                  {label}
              </span>
                            {i < trustBadges.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className="hidden sm:block w-px h-4 bg-white/10"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* Founding note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center font-body text-sm text-neutral-600 mt-8"
                >
                    Proudly founded in Douala, Cameroon in{" "}
                    <span className="text-neutral-400">{siteConfig.foundedYear}</span>
                    {" "}·{" "}
                    Serving clients across{" "}
                    <span className="text-neutral-400">Africa, Europe & beyond</span>
                </motion.p>
            </div>
        </section>
    );
}