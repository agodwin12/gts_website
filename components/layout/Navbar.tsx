// components/layout/Navbar.tsx

"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Navbar Component
//   Scroll-aware | Mega dropdown | Mobile drawer | Accessible
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronDown,
    Globe,
    Smartphone,
    Cloud,
    ShoppingCart,
    Palette,
    TrendingUp,
    BrainCircuit,
    Plug,
    Bot,
    Building2,
    Shield,
    Sparkles,
    Phone,
    ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig, navItems } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/lib/types";

// ─────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe size={16} />,
    Smartphone: <Smartphone size={16} />,
    Cloud: <Cloud size={16} />,
    ShoppingCart: <ShoppingCart size={16} />,
    Palette: <Palette size={16} />,
    TrendingUp: <TrendingUp size={16} />,
    BrainCircuit: <BrainCircuit size={16} />,
    Plug: <Plug size={16} />,
    Bot: <Bot size={16} />,
    Building2: <Building2 size={16} />,
    Shield: <Shield size={16} />,
    Sparkles: <Sparkles size={16} />,
};

const SCROLL_THRESHOLD = 20;

// ─────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────

function Logo({ scrolled }: { scrolled?: boolean }) {
    return (
        <span className="flex items-center gap-2 select-none">
            <Image
                src="/logo/logo.png"
                alt="Godwin Tech Solutions logo"
                width={44}
                height={44}
                className={cn(
                    "object-contain transition-all duration-300",
                    scrolled ? "brightness-100" : "brightness-110"
                )}
                priority
            />

            <span className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm tracking-tight text-neutral-900">
                    Godwin Tech
                </span>
                <span className="font-body text-[10px] font-medium tracking-widest uppercase text-brand">
                    Solutions
                </span>
            </span>
        </span>
    );
}

// ─────────────────────────────────────────
// MEGA MENU — DESKTOP SERVICES DROPDOWN
// ─────────────────────────────────────────

function MegaMenu({ items }: { items: NavItem[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 mt-2",
                "w-[720px] max-w-[90vw]",
                "bg-white rounded-2xl shadow-dark-lg",
                "border border-neutral-100",
                "p-6 z-50",
                "grid grid-cols-3 gap-2"
            )}
        >
            {items.map((item) => (
                <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={cn(
                        "group flex items-start gap-3 p-3 rounded-xl",
                        "hover:bg-brand/5 transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    )}
                >
                    <span
                        className={cn(
                            "mt-0.5 shrink-0 p-2 rounded-lg",
                            "bg-brand/8 text-brand",
                            "group-hover:bg-brand group-hover:text-white",
                            "transition-all duration-200"
                        )}
                    >
                        {item.icon ? iconMap[item.icon] ?? <Globe size={16} /> : <Globe size={16} />}
                    </span>

                    <span className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-display font-semibold text-sm text-neutral-900 group-hover:text-brand transition-colors">
                            {item.label}
                        </span>

                        {item.description && (
                            <span className="font-body text-xs text-neutral-500 leading-snug line-clamp-2">
                                {item.description}
                            </span>
                        )}
                    </span>
                </Link>
            ))}

            <div className="col-span-3 mt-2 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <p className="font-body text-sm text-neutral-500">
                    Not sure what you need?{" "}
                    <Link href="/contact" className="text-brand font-semibold hover:underline">
                        Let&apos;s talk
                    </Link>
                </p>

                <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all duration-200"
                >
                    View all services <ArrowRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────

function MobileMenu({
                        isOpen,
                        onClose,
                    }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const pathname = usePathname();
    const [servicesOpen, setServicesOpen] = useState(false);

    const servicesItem = navItems.find((item) => item.label === "Services");

    useEffect(() => {
        if (!isOpen) {
            setServicesOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    <motion.aside
                        id="mobile-menu"
                        key="mobile-drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={cn(
                            "fixed top-0 right-0 bottom-0 z-50",
                            "w-[min(360px,90vw)]",
                            "bg-white shadow-dark-lg",
                            "flex flex-col overflow-y-auto"
                        )}
                        aria-label="Mobile navigation"
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                            <Link href="/" onClick={onClose}>
                                <Logo />
                            </Link>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close menu"
                                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-1">
                            {navItems.map((item) => {
                                const hasChildren = Boolean(item.children?.length);
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href));

                                if (hasChildren) {
                                    return (
                                        <div key={`${item.href}-${item.label}`}>
                                            <button
                                                type="button"
                                                onClick={() => setServicesOpen((current) => !current)}
                                                className={cn(
                                                    "w-full flex items-center justify-between",
                                                    "px-4 py-3 rounded-xl",
                                                    "font-body font-medium text-base",
                                                    "transition-colors duration-150",
                                                    isActive
                                                        ? "bg-brand/8 text-brand"
                                                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                                )}
                                                aria-expanded={servicesOpen}
                                            >
                                                {item.label}

                                                <ChevronDown
                                                    size={16}
                                                    className={cn(
                                                        "text-neutral-400 transition-transform duration-200",
                                                        servicesOpen && "rotate-180 text-brand"
                                                    )}
                                                />
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {servicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-1 ml-4 space-y-0.5 pb-2">
                                                            {item.children?.map((child) => (
                                                                <Link
                                                                    key={`${child.href}-${child.label}`}
                                                                    href={child.href}
                                                                    onClick={onClose}
                                                                    className={cn(
                                                                        "flex items-center gap-2.5 px-4 py-2.5 rounded-lg",
                                                                        "font-body text-sm text-neutral-600",
                                                                        "hover:bg-brand/5 hover:text-brand",
                                                                        "transition-colors duration-150"
                                                                    )}
                                                                >
                                                                    {child.icon && (
                                                                        <span className="text-brand/70 shrink-0">
                                                                            {iconMap[child.icon] ?? <Globe size={16} />}
                                                                        </span>
                                                                    )}

                                                                    {child.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={`${item.href}-${item.label}`}
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center justify-between",
                                            "px-4 py-3 rounded-xl",
                                            "font-body font-medium text-base",
                                            "transition-colors duration-150",
                                            isActive
                                                ? "bg-brand/8 text-brand"
                                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                        )}
                                    >
                                        {item.label}

                                        {item.badge && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/10 text-brand">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}

                            {servicesItem?.children?.length ? (
                                <Link
                                    href="/services"
                                    onClick={onClose}
                                    className={cn(
                                        "mt-4 flex items-center justify-center gap-2",
                                        "px-4 py-3 rounded-xl",
                                        "font-body font-semibold text-sm",
                                        "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
                                        "transition-colors duration-150"
                                    )}
                                >
                                    View all services <ArrowRight size={14} />
                                </Link>
                            ) : null}
                        </nav>

                        <div className="px-6 py-6 border-t border-neutral-100 space-y-3">
                            <Button asChild variant="primary" fullWidth>
                                <Link href="/contact" onClick={onClose}>
                                    Start a Project
                                </Link>
                            </Button>

                            <a
                                href={`tel:${siteConfig.phone}`}
                                className={cn(
                                    "flex items-center justify-center gap-2",
                                    "font-body text-sm text-neutral-500",
                                    "hover:text-brand transition-colors"
                                )}
                            >
                                <Phone size={14} />
                                {siteConfig.phone}
                            </a>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────

export default function Navbar() {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [dropdownTimer, setDropdownTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const openMobileMenu = useCallback(() => {
        setMobileOpen(true);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setMobileOpen(false);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setActiveDropdown(null);
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        return () => {
            if (dropdownTimer) {
                clearTimeout(dropdownTimer);
            }
        };
    }, [dropdownTimer]);

    const openDropdown = useCallback(
        (label: string) => {
            if (dropdownTimer) {
                clearTimeout(dropdownTimer);
            }

            setActiveDropdown(label);
        },
        [dropdownTimer]
    );

    const closeDropdown = useCallback(() => {
        const timer = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);

        setDropdownTimer(timer);
    }, []);

    const cancelClose = useCallback(() => {
        if (dropdownTimer) {
            clearTimeout(dropdownTimer);
        }
    }, [dropdownTimer]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-30",
                    "transition-all duration-300 ease-smooth",
                    scrolled
                        ? [
                            "bg-white/95 backdrop-blur-md",
                            "shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.05)]",
                            "py-3",
                        ]
                        : ["bg-transparent", "py-5"]
                )}
                role="banner"
            >
                <div className="container-gts">
                    <div className="flex items-center justify-between gap-8">
                        <Link
                            href="/"
                            aria-label="Godwin Tech Solutions — Home"
                            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
                        >
                            <Logo scrolled={scrolled} />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                            {navItems.map((item) => {
                                const hasChildren = Boolean(item.children?.length);
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href));

                                return (
                                    <div
                                        key={`${item.href}-${item.label}`}
                                        className="relative"
                                        onMouseEnter={() => {
                                            if (hasChildren) openDropdown(item.label);
                                        }}
                                        onMouseLeave={() => {
                                            if (hasChildren) closeDropdown();
                                        }}
                                    >
                                        {hasChildren ? (
                                            <button
                                                type="button"
                                                onFocus={() => openDropdown(item.label)}
                                                onBlur={closeDropdown}
                                                aria-expanded={activeDropdown === item.label}
                                                aria-haspopup="true"
                                                className={cn(
                                                    "flex items-center gap-1 px-4 py-2 rounded-lg",
                                                    "font-body font-medium text-sm",
                                                    "transition-colors duration-150",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                                    isActive || activeDropdown === item.label
                                                        ? "text-brand bg-brand/5"
                                                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                                                )}
                                            >
                                                {item.label}

                                                <ChevronDown
                                                    size={14}
                                                    className={cn(
                                                        "text-neutral-400 transition-transform duration-200",
                                                        activeDropdown === item.label && "rotate-180 text-brand"
                                                    )}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-1.5 px-4 py-2 rounded-lg",
                                                    "font-body font-medium text-sm",
                                                    "transition-colors duration-150",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                                    isActive
                                                        ? "text-brand bg-brand/5"
                                                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                                                )}
                                            >
                                                {item.label}

                                                {item.badge && (
                                                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-brand/10 text-brand leading-none">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        )}

                                        <AnimatePresence>
                                            {hasChildren && activeDropdown === item.label && (
                                                <div onMouseEnter={cancelClose} onMouseLeave={closeDropdown}>
                                                    <MegaMenu items={item.children!} />
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className={cn(
                                    "flex items-center gap-1.5",
                                    "font-body text-sm font-medium",
                                    "text-neutral-500 hover:text-brand",
                                    "transition-colors duration-150"
                                )}
                            >
                                <Phone size={14} className="text-brand" />
                                {siteConfig.phone}
                            </a>

                            <Button asChild variant="primary" size="sm" rounded="full">
                                <Link href="/contact">Start a Project</Link>
                            </Button>
                        </div>

                        <button
                            type="button"
                            onClick={openMobileMenu}
                            aria-label="Open navigation menu"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            className={cn(
                                "lg:hidden p-2 rounded-lg",
                                "text-neutral-700 hover:text-neutral-900",
                                "hover:bg-neutral-100 transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            )}
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu isOpen={mobileOpen} onClose={closeMobileMenu} />

            <div className="h-[72px]" aria-hidden="true" />
        </>
    );
}