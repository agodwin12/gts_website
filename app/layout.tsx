// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Root Layout
//   Wraps every page. Loads fonts, sets metadata, mounts providers.
// ═══════════════════════════════════════════════════════════════

import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import ChatWidget      from "@/components/chat/ChatWidget";
import SplashProvider  from "@/components/ui/SplashProvider";

// ─────────────────────────────────────────
// FONTS
// Syne       → Display / headings  (geometric, futuristic, premium)
// DM Sans    → Body copy           (clean, modern, highly readable)
// JetBrains  → Monospace           (code snippets, tech detail)
// ─────────────────────────────────────────

const fontDisplay = Syne({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-display",
    display: "swap",
    preload: true,
});

const fontBody = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-body",
    display: "swap",
    preload: true,
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
    preload: false,
});

// ─────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),

    title: {
        default: `${siteConfig.name} — ${siteConfig.tagline}`,
        template: `%s | ${siteConfig.name}`,
    },

    description: siteConfig.description,

    keywords: [
        "IT services Cameroon",
        "web development Cameroon",
        "mobile app development Africa",
        "software company Yaoundé",
        "cloud services Cameroon",
        "e-commerce development Africa",
        "UI UX design Cameroon",
        "digital marketing Cameroon",
        "enterprise software Cameroon",
        "Godwin Tech Solutions",
        "GTS Cameroon",
        "fintech solutions Africa",
        "AI automation Cameroon",
    ],

    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Open Graph
    openGraph: {
        type: "website",
        locale: "en_GB",
        alternateLocale: "fr_FR",
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: `${siteConfig.name} — ${siteConfig.tagline}`,
        description: siteConfig.description,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} — Premium IT Services from Cameroon`,
                type: "image/png",
            },
        ],
    },

    // Twitter / X
    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.name} — ${siteConfig.tagline}`,
        description: siteConfig.description,
        images: ["/og-image.png"],
        creator: "@godwintechsolutions",
        site: "@godwintechsolutions",
    },

    // Icons
    icons: {
        icon: [
            { url: "/logo/logo.png",  sizes: "any",   type: "image/png" },
            { url: "/logo/logo.png",  sizes: "32x32", type: "image/png" },
            { url: "/logo/logo.png",  sizes: "16x16", type: "image/png" },
        ],
        apple: [
            { url: "/logo/logo.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: "/logo/logo.png",
    },

    // Web manifest
    manifest: "/manifest.json",

    // Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // Canonical
    alternates: {
        canonical: siteConfig.url,
        languages: {
            "en-GB": siteConfig.url,
            "fr-FR": `${siteConfig.url}/fr`,
        },
    },

    // App-specific
    applicationName: siteConfig.name,
    category: "technology",
};

// ─────────────────────────────────────────
// VIEWPORT
// ─────────────────────────────────────────

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)",  color: "#020617" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    colorScheme: "dark light",
};

// ─────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`
        ${fontDisplay.variable}
        ${fontBody.variable}
        ${fontMono.variable}
      `}
        >
        <head>
            {/* Preconnect to Google Fonts CDN for faster load */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />

            {/* DNS prefetch for external services */}
            <link rel="dns-prefetch" href="https://res.cloudinary.com" />
            <link rel="dns-prefetch" href="https://images.unsplash.com" />

            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        name: siteConfig.name,
                        description: siteConfig.description,
                        url: siteConfig.url,
                        email: siteConfig.email,
                        telephone: siteConfig.phone,
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Yaoundé",
                            addressCountry: "CM",
                        },
                        areaServed: {
                            "@type": "GeoCircle",
                            geoMidpoint: {
                                "@type": "GeoCoordinates",
                                latitude: 3.848,
                                longitude: 11.502,
                            },
                            geoRadius: "5000000",
                        },
                        sameAs: [
                            siteConfig.socials.twitter,
                            siteConfig.socials.linkedin,
                            siteConfig.socials.github,
                            siteConfig.socials.facebook,
                        ].filter(Boolean),
                        foundingDate: siteConfig.foundedYear.toString(),
                        serviceType: [
                            "Web Development",
                            "Mobile App Development",
                            "Cloud Services",
                            "IT Consultancy",
                            "Digital Marketing",
                            "UI/UX Design",
                            "E-Commerce Solutions",
                            "AI & Automation",
                            "Enterprise Software",
                            "Cybersecurity",
                        ],
                    }),
                }}
            />
        </head>

        <body
            className="
          font-body
          bg-white
          text-neutral-900
          antialiased
          overflow-x-hidden
          selection:bg-brand/20
          selection:text-brand-dark
        "
        >
        {/* Skip to main content — accessibility */}
        <a
            href="#main-content"
            className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4
            focus:z-[100] focus:px-4 focus:py-2
            focus:bg-brand focus:text-white
            focus:rounded-lg focus:font-medium
            focus:shadow-brand-lg
            focus:outline-none
          "
        >
            Skip to main content
        </a>

        {/* Splash screen — shown once per session */}
        <SplashProvider>
            {/* Main content */}
            <main id="main-content">{children}</main>
        </SplashProvider>

        {/* Evelyn — AI Chat Assistant (appears on every page) */}
        <ChatWidget />

        {/* Toast notifications */}
        <Toaster
            position="bottom-right"
            gutter={12}
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#0f172a",
                    color: "#f8fafc",
                    border: "1px solid rgba(14,165,233,0.2)",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-body)",
                    padding: "12px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                },
                success: {
                    iconTheme: {
                        primary: "#0ea5e9",
                        secondary: "#f8fafc",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#f8fafc",
                    },
                },
            }}
        />
        </body>
        </html>
    );
}