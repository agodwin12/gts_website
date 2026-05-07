// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Shared Utility Functions
//   Import what you need:
//     import { cn, formatDate, slugify } from "@/lib/utils";
// ═══════════════════════════════════════════════════════════════

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─────────────────────────────────────────
// TAILWIND CLASS MERGING
// Merges Tailwind classes safely — resolves
// conflicts like "p-4 p-6" → "p-6"
// ─────────────────────────────────────────

/**
 * Merge Tailwind CSS classes without conflicts.
 * @example cn("px-4 py-2", isActive && "bg-brand", "hover:bg-brand-dark")
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────
// SLUG UTILITIES
// ─────────────────────────────────────────

/**
 * Convert any string to a URL-safe slug.
 * @example slugify("Maviance Business Portal") → "maviance-business-portal"
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD")                      // Decompose accents
        .replace(/[\u0300-\u036f]/g, "")       // Strip accent marks
        .replace(/[^\w\s-]/g, "")             // Remove non-word chars
        .replace(/[\s_]+/g, "-")              // Spaces & underscores → hyphens
        .replace(/^-+|-+$/g, "");             // Trim leading/trailing hyphens
}

/**
 * Convert a slug back to a readable title.
 * @example deslugify("maviance-business-portal") → "Maviance Business Portal"
 */
export function deslugify(slug: string): string {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// ─────────────────────────────────────────
// DATE & TIME FORMATTING
// ─────────────────────────────────────────

/**
 * Format a date into a readable string.
 * @example formatDate(new Date("2024-08-15")) → "August 15, 2024"
 */
export function formatDate(
    date: Date | string | null | undefined,
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
): string {
    if (!date) return "—";
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
}

/**
 * Format a date as a short string.
 * @example formatDateShort(new Date("2024-08-15")) → "Aug 2024"
 */
export function formatDateShort(date: Date | string | null | undefined): string {
    if (!date) return "—";
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
    }).format(new Date(date));
}

/**
 * Return a relative time string.
 * @example timeAgo(new Date("2024-01-01")) → "4 months ago"
 */
export function timeAgo(date: Date | string): string {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: [number, string][] = [
        [31536000, "year"],
        [2592000,  "month"],
        [604800,   "week"],
        [86400,    "day"],
        [3600,     "hour"],
        [60,       "minute"],
        [1,        "second"],
    ];

    for (const [secs, label] of intervals) {
        const count = Math.floor(seconds / secs);
        if (count >= 1) {
            return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

// ─────────────────────────────────────────
// STRING UTILITIES
// ─────────────────────────────────────────

/**
 * Truncate a string to a max length with ellipsis.
 * @example truncate("Hello World", 8) → "Hello..."
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Capitalize the first letter of a string.
 * @example capitalize("hello world") → "Hello world"
 */
export function capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert a SCREAMING_SNAKE_CASE enum value to a readable label.
 * @example enumToLabel("WEB_DEVELOPMENT") → "Web Development"
 */
export function enumToLabel(value: string): string {
    return value
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

/**
 * Strip HTML tags from a string.
 * @example stripHtml("<p>Hello <b>World</b></p>") → "Hello World"
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}

/**
 * Generate initials from a full name.
 * @example getInitials("Godwin Tech Solutions") → "GT"
 */
export function getInitials(name: string, maxChars = 2): string {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, maxChars);
}

// ─────────────────────────────────────────
// NUMBER FORMATTING
// ─────────────────────────────────────────

/**
 * Format a number with commas.
 * @example formatNumber(1000000) → "1,000,000"
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a number in compact form.
 * @example formatCompact(1500) → "1.5K"
 */
export function formatCompact(num: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(num);
}

/**
 * Format a currency amount.
 * @example formatCurrency(50000, "XAF") → "XAF 50,000"
 */
export function formatCurrency(
    amount: number,
    currency = "XAF",
    locale = "fr-CM"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

// ─────────────────────────────────────────
// URL & NAVIGATION UTILITIES
// ─────────────────────────────────────────

/**
 * Build an absolute URL from a path.
 * @example absoluteUrl("/portfolio/maviance") → "https://godwintechsolutions.com/portfolio/maviance"
 */
export function absoluteUrl(path: string): string {
    const base =
        process.env.NEXT_PUBLIC_SITE_URL || "https://godwintechsolutions.com";
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/**
 * Check if a URL is external (not same domain).
 * @example isExternalUrl("https://google.com") → true
 */
export function isExternalUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        const siteUrl = new URL(
            process.env.NEXT_PUBLIC_SITE_URL || "https://godwintechsolutions.com"
        );
        return parsed.hostname !== siteUrl.hostname;
    } catch {
        return false;
    }
}

// ─────────────────────────────────────────
// ARRAY UTILITIES
// ─────────────────────────────────────────

/**
 * Split an array into chunks of a given size.
 * @example chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size)
    );
}

/**
 * Remove duplicate values from an array.
 * @example unique([1, 2, 2, 3]) → [1, 2, 3]
 */
export function unique<T>(array: T[]): T[] {
    return [...new Set(array)];
}

/**
 * Shuffle an array randomly (Fisher-Yates).
 */
export function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ─────────────────────────────────────────
// VALIDATION UTILITIES
// ─────────────────────────────────────────

/**
 * Check if a string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Check if a string is a valid URL.
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Check if a value is empty (null, undefined, "", [], {}).
 */
export function isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
}

// ─────────────────────────────────────────
// DELAY / ASYNC UTILITIES
// ─────────────────────────────────────────

/**
 * Wait for a given number of milliseconds.
 * @example await sleep(500)
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────
// ENVIRONMENT UTILITIES
// ─────────────────────────────────────────

/** Returns true when running on the server */
export const isServer = typeof window === "undefined";

/** Returns true when running in the browser */
export const isBrowser = typeof window !== "undefined";

/** Returns true in production */
export const isProduction = process.env.NODE_ENV === "production";

/** Returns true in development */
export const isDevelopment = process.env.NODE_ENV === "development";