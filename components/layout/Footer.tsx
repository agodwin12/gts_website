"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Footer Component
//   Rich footer with columns, socials, contact & legal strip
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Github,
    Instagram,
    Facebook,
    MessageCircle,
    ArrowUpRight,
    Heart,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, footerSections } from "@/lib/config";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────

const socialLinks = [
    {
        label: "Twitter / X",
        href:  siteConfig.socials.twitter,
        icon:  <Twitter  size={16} />,
    },
    {
        label: "LinkedIn",
        href:  siteConfig.socials.linkedin,
        icon:  <Linkedin size={16} />,
    },
    {
        label: "GitHub",
        href:  siteConfig.socials.github,
        icon:  <Github   size={16} />,
    },
    {
        label: "Instagram",
        href:  siteConfig.socials.instagram,
        icon:  <Instagram size={16} />,
    },
    {
        label: "Facebook",
        href:  siteConfig.socials.facebook,
        icon:  <Facebook  size={16} />,
    },
].filter((s) => s.href);

// ─────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────

function FooterLogo() {
    return (
        <Link
            href="/"
            aria-label="Godwin Tech Solutions — Home"
            className="inline-flex items-center gap-2.5 group"
        >
            <Image
                src="/logo/logo.png"
                alt="Godwin Tech Solutions logo"
                width={48}
                height={48}
                className="object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
            />
            <span className="flex flex-col leading-none">
        <span className="font-display font-bold text-base tracking-tight text-white">
          Godwin Tech
        </span>
        <span className="font-body text-[10px] font-medium tracking-widest uppercase text-brand-light">
          Solutions
        </span>
      </span>
        </Link>
    );
}

// ─────────────────────────────────────────
// WHATSAPP CTA STRIP
// ─────────────────────────────────────────

function WhatsAppStrip() {
    const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello! I'd like to discuss a project with Godwin Tech Solutions."
    )}`;

    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center",
                "justify-between gap-4",
                "p-5 rounded-2xl",
                "bg-white/5 border border-white/10",
                "hover:border-brand/30 hover:bg-white/8",
                "transition-all duration-300"
            )}
        >
            <div className="flex items-center gap-3">
        <span
            className={cn(
                "flex items-center justify-center shrink-0",
                "w-10 h-10 rounded-xl",
                "bg-green-500/15 text-green-400"
            )}
        >
          <MessageCircle size={20} />
        </span>
                <div>
                    <p className="font-display font-semibold text-sm text-white">
                        Chat with us on WhatsApp
                    </p>
                    <p className="font-body text-xs text-neutral-400 mt-0.5">
                        Quick replies during business hours · Douala, Cameroon (WAT)
                    </p>
                </div>
            </div>
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "inline-flex items-center gap-2 shrink-0",
                    "px-4 py-2 rounded-xl",
                    "bg-green-500 hover:bg-green-400",
                    "text-white font-body font-semibold text-sm",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-green-400 focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-neutral-950"
                )}
            >
                <MessageCircle size={15} />
                Start Chat
            </a>
        </div>
    );
}

// ─────────────────────────────────────────
// CONTACT INFO BLOCK
// ─────────────────────────────────────────

function ContactInfo() {
    const items = [
        {
            icon:  <Mail    size={14} />,
            label: "Email",
            value: siteConfig.email,
            href:  `mailto:${siteConfig.email}`,
        },
        {
            icon:  <Phone   size={14} />,
            label: "Phone",
            value: siteConfig.phone,
            href:  `tel:${siteConfig.phone}`,
        },
        {
            icon:  <MapPin  size={14} />,
            label: "Location",
            value: siteConfig.location,
            href:  "https://maps.google.com/?q=Douala,Cameroon",
        },
    ];

    return (
        <ul className="space-y-3">
            {items.map(({ icon, label, value, href }) => (
                <li key={label}>
                    <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={cn(
                            "group flex items-center gap-2.5",
                            "font-body text-sm text-neutral-400",
                            "hover:text-brand transition-colors duration-150"
                        )}
                        aria-label={`${label}: ${value}`}
                    >
            <span className="text-brand/60 group-hover:text-brand transition-colors shrink-0">
              {icon}
            </span>
                        <span className="truncate">{value}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

// ─────────────────────────────────────────
// MAIN FOOTER
// ─────────────────────────────────────────

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "relative bg-neutral-950 text-white",
                "border-t border-white/5",
                "overflow-hidden"
            )}
            role="contentinfo"
            aria-label="Site footer"
        >
            {/* ── Background mesh glow ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand/3 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 container-gts">

                {/* ── Upper section ── */}
                <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Brand column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <FooterLogo />

                        <p className="font-body text-sm text-neutral-400 leading-relaxed max-w-xs">
                            {siteConfig.description}
                        </p>

                        {/* Contact info */}
                        <ContactInfo />

                        {/* Social icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={cn(
                                        "flex items-center justify-center",
                                        "w-9 h-9 rounded-xl",
                                        "bg-white/5 text-neutral-400",
                                        "hover:bg-brand/15 hover:text-brand",
                                        "border border-white/5 hover:border-brand/30",
                                        "transition-all duration-200"
                                    )}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-display font-semibold text-sm text-white mb-4 tracking-tight">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                target={link.external ? "_blank" : undefined}
                                                rel={link.external ? "noopener noreferrer" : undefined}
                                                className={cn(
                                                    "group inline-flex items-center gap-1",
                                                    "font-body text-sm text-neutral-400",
                                                    "hover:text-brand transition-colors duration-150"
                                                )}
                                            >
                                                {link.label}
                                                {link.external && (
                                                    <ArrowUpRight
                                                        size={11}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── WhatsApp strip ── */}
                <div className="pb-10">
                    <WhatsAppStrip />
                </div>

                {/* ── CTA Banner ── */}
                <div
                    className={cn(
                        "mb-10 p-8 rounded-2xl",
                        "bg-gradient-brand",
                        "flex flex-col sm:flex-row items-start sm:items-center",
                        "justify-between gap-6",
                        "shadow-brand-lg"
                    )}
                >
                    <div>
                        <h3 className="font-display font-bold text-xl text-white tracking-tight">
                            Ready to build something great?
                        </h3>
                        <p className="font-body text-sm text-white/80 mt-1">
                            Let&apos;s turn your idea into a product your users will love.
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="glass"
                        size="md"
                        rounded="full"
                        rightIcon={<ArrowRight size={16} />}
                        className="shrink-0 border-white/30 hover:border-white/50"
                    >
                        <Link href="/contact">
                            Start a Project
                        </Link>
                    </Button>
                </div>

                {/* ── Legal strip ── */}
                <div
                    className={cn(
                        "py-6 border-t border-white/5",
                        "flex flex-col sm:flex-row items-center",
                        "justify-between gap-4"
                    )}
                >
                    {/* Copyright */}
                    <p className="font-body text-xs text-neutral-500 flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
                        <span>© {currentYear} {siteConfig.name}.</span>
                        <span>All rights reserved.</span>
                        <span className="hidden sm:inline text-neutral-700">·</span>
                        <span className="flex items-center gap-1">
              Made with <Heart size={10} className="text-brand fill-brand" aria-label="love" /> in Cameroon
            </span>
                    </p>

                    {/* Legal links */}
                    <nav
                        aria-label="Legal navigation"
                        className="flex items-center gap-5"
                    >
                        {[
                            { label: "Privacy",  href: "/privacy"  },
                            { label: "Terms",    href: "/terms"    },
                            { label: "Cookies",  href: "/cookies"  },
                        ].map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "font-body text-xs text-neutral-500",
                                    "hover:text-brand transition-colors duration-150"
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}