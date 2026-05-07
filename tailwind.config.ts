import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            /* ─────────────────────────────────────────
               BRAND COLORS
            ───────────────────────────────────────── */
            colors: {
                /* Primary — Sky Blue */
                sky: {
                    50:  "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9",   // Primary brand blue
                    600: "#0284c7",   // Hover state
                    700: "#0369a1",   // Active / dark variant
                    800: "#075985",
                    900: "#0c4a6e",
                    950: "#082f49",
                },

                /* GTS Custom Palette */
                brand: {
                    DEFAULT:  "#0ea5e9",   // Sky blue — primary CTA
                    light:    "#38bdf8",   // Lighter highlight
                    dark:     "#0369a1",   // Darker emphasis
                    muted:    "#bae6fd",   // Soft tint backgrounds
                    glow:     "#7dd3fc",   // Glow / shimmer effects
                },

                /* Neutral — Black & White system */
                neutral: {
                    0:    "#ffffff",
                    50:   "#f8fafc",
                    100:  "#f1f5f9",
                    200:  "#e2e8f0",
                    300:  "#cbd5e1",
                    400:  "#94a3b8",
                    500:  "#64748b",
                    600:  "#475569",
                    700:  "#334155",
                    800:  "#1e293b",
                    900:  "#0f172a",
                    950:  "#020617",
                    1000: "#000000",
                },

                /* Semantic */
                success:  "#22c55e",
                warning:  "#f59e0b",
                error:    "#ef4444",
                info:     "#0ea5e9",

                /* Surface aliases for easy use */
                surface: {
                    DEFAULT:  "#ffffff",
                    muted:    "#f8fafc",
                    dark:     "#0f172a",
                    darker:   "#020617",
                    card:     "#ffffff",
                    "card-dark": "#1e293b",
                },
            },

            /* ─────────────────────────────────────────
               TYPOGRAPHY
            ───────────────────────────────────────── */
            fontFamily: {
                // Display — sharp, modern, premium
                display: ["var(--font-display)", "system-ui", "sans-serif"],
                // Body — clean and readable
                body:    ["var(--font-body)", "system-ui", "sans-serif"],
                // Mono — for code snippets / tech detail
                mono:    ["var(--font-mono)", "Courier New", "monospace"],
            },

            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "1rem" }],
                xs:   ["0.75rem",  { lineHeight: "1rem" }],
                sm:   ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem",     { lineHeight: "1.5rem" }],
                lg:   ["1.125rem", { lineHeight: "1.75rem" }],
                xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
                "2xl":["1.5rem",   { lineHeight: "2rem" }],
                "3xl":["1.875rem", { lineHeight: "2.25rem" }],
                "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
                "5xl":["3rem",     { lineHeight: "1.1" }],
                "6xl":["3.75rem",  { lineHeight: "1.05" }],
                "7xl":["4.5rem",   { lineHeight: "1" }],
                "8xl":["6rem",     { lineHeight: "1" }],
                "9xl":["8rem",     { lineHeight: "1" }],
            },

            /* ─────────────────────────────────────────
               SPACING & SIZING
            ───────────────────────────────────────── */
            spacing: {
                "4.5":  "1.125rem",
                "13":   "3.25rem",
                "15":   "3.75rem",
                "18":   "4.5rem",
                "22":   "5.5rem",
                "26":   "6.5rem",
                "30":   "7.5rem",
                "34":   "8.5rem",
                "88":   "22rem",
                "100":  "25rem",
                "112":  "28rem",
                "128":  "32rem",
            },

            maxWidth: {
                "8xl":  "88rem",
                "9xl":  "96rem",
                "10xl": "104rem",
            },

            /* ─────────────────────────────────────────
               BORDER RADIUS
            ───────────────────────────────────────── */
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },

            /* ─────────────────────────────────────────
               BOX SHADOWS
            ───────────────────────────────────────── */
            boxShadow: {
                "brand-sm":  "0 2px 8px 0 rgba(14, 165, 233, 0.15)",
                "brand":     "0 4px 24px 0 rgba(14, 165, 233, 0.25)",
                "brand-lg":  "0 8px 48px 0 rgba(14, 165, 233, 0.35)",
                "brand-xl":  "0 16px 64px 0 rgba(14, 165, 233, 0.4)",
                "dark-sm":   "0 2px 8px 0 rgba(0, 0, 0, 0.4)",
                "dark":      "0 4px 24px 0 rgba(0, 0, 0, 0.5)",
                "dark-lg":   "0 8px 48px 0 rgba(0, 0, 0, 0.6)",
                "card":      "0 1px 3px 0 rgba(0,0,0,0.07), 0 4px 16px 0 rgba(0,0,0,0.05)",
                "card-hover":"0 8px 32px 0 rgba(14, 165, 233, 0.15), 0 2px 8px 0 rgba(0,0,0,0.08)",
                "glow":      "0 0 20px rgba(14, 165, 233, 0.4), 0 0 60px rgba(14, 165, 233, 0.15)",
                "glow-lg":   "0 0 40px rgba(14, 165, 233, 0.5), 0 0 100px rgba(14, 165, 233, 0.2)",
                "inner-brand":"inset 0 1px 0 rgba(14, 165, 233, 0.2)",
            },

            /* ─────────────────────────────────────────
               BACKGROUND GRADIENTS
            ───────────────────────────────────────── */
            backgroundImage: {
                // Brand gradients
                "gradient-brand":        "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                "gradient-brand-light":  "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
                "gradient-brand-dark":   "linear-gradient(135deg, #0369a1 0%, #082f49 100%)",
                "gradient-hero":         "linear-gradient(135deg, #020617 0%, #0c4a6e 50%, #020617 100%)",
                "gradient-hero-light":   "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)",

                // Dark section backgrounds
                "gradient-dark":         "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
                "gradient-dark-radial":  "radial-gradient(ellipse at 50% 0%, #0c4a6e 0%, #020617 70%)",

                // Card gradients
                "gradient-card":         "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                "gradient-card-hover":   "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.04) 100%)",

                // Mesh / noise overlays
                "gradient-mesh":         "radial-gradient(at 40% 20%, hsla(200,100%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200,80%,40%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(210,100%,30%,0.1) 0px, transparent 50%)",

                // Subtle borders
                "gradient-border":       "linear-gradient(135deg, rgba(14,165,233,0.5), rgba(3,105,161,0.2))",
                "gradient-border-white": "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",

                // Text gradients (used with bg-clip-text)
                "gradient-text":         "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #7dd3fc 100%)",
                "gradient-text-white":   "linear-gradient(135deg, #ffffff 0%, #bae6fd 100%)",
            },

            /* ─────────────────────────────────────────
               ANIMATIONS & KEYFRAMES
            ───────────────────────────────────────── */
            keyframes: {
                // Fade animations
                "fade-in": {
                    "0%":   { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-in-up": {
                    "0%":   { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-down": {
                    "0%":   { opacity: "0", transform: "translateY(-24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-left": {
                    "0%":   { opacity: "0", transform: "translateX(-24px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "fade-in-right": {
                    "0%":   { opacity: "0", transform: "translateX(24px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },

                // Scale animations
                "scale-in": {
                    "0%":   { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "scale-up": {
                    "0%":   { transform: "scale(1)" },
                    "100%": { transform: "scale(1.05)" },
                },

                // Glow pulse
                "glow-pulse": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(14,165,233,0.3)" },
                    "50%":      { boxShadow: "0 0 40px rgba(14,165,233,0.6), 0 0 80px rgba(14,165,233,0.2)" },
                },

                // Shimmer (skeleton / loading)
                shimmer: {
                    "0%":   { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },

                // Floating
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%":      { transform: "translateY(-12px)" },
                },

                // Slide ticker (marquee)
                "slide-left": {
                    "0%":   { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },

                // Spin slow
                "spin-slow": {
                    "0%":   { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },

                // Border glow
                "border-glow": {
                    "0%, 100%": { borderColor: "rgba(14,165,233,0.3)" },
                    "50%":      { borderColor: "rgba(14,165,233,0.8)" },
                },

                // Number count (used with JS countup, but still useful)
                "count-up": {
                    "0%":   { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },

            animation: {
                "fade-in":       "fade-in 0.5s ease-out forwards",
                "fade-in-up":    "fade-in-up 0.6s ease-out forwards",
                "fade-in-down":  "fade-in-down 0.6s ease-out forwards",
                "fade-in-left":  "fade-in-left 0.6s ease-out forwards",
                "fade-in-right": "fade-in-right 0.6s ease-out forwards",
                "scale-in":      "scale-in 0.4s ease-out forwards",
                "glow-pulse":    "glow-pulse 2.5s ease-in-out infinite",
                "shimmer":       "shimmer 2s linear infinite",
                "float":         "float 4s ease-in-out infinite",
                "slide-left":    "slide-left 30s linear infinite",
                "spin-slow":     "spin-slow 12s linear infinite",
                "border-glow":   "border-glow 2s ease-in-out infinite",
                "count-up":      "count-up 0.4s ease-out forwards",
            },

            /* ─────────────────────────────────────────
               TRANSITIONS
            ───────────────────────────────────────── */
            transitionDuration: {
                "250": "250ms",
                "350": "350ms",
                "400": "400ms",
                "600": "600ms",
                "800": "800ms",
            },

            transitionTimingFunction: {
                "spring":    "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "smooth":    "cubic-bezier(0.4, 0, 0.2, 1)",
                "sharp":     "cubic-bezier(0.4, 0, 0.6, 1)",
                "bounce-in": "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
            },

            /* ─────────────────────────────────────────
               Z-INDEX SCALE
            ───────────────────────────────────────── */
            zIndex: {
                "60":  "60",
                "70":  "70",
                "80":  "80",
                "90":  "90",
                "100": "100",
            },

            /* ─────────────────────────────────────────
               ASPECT RATIOS
            ───────────────────────────────────────── */
            aspectRatio: {
                "4/3":  "4 / 3",
                "3/2":  "3 / 2",
                "2/1":  "2 / 1",
                "16/9": "16 / 9",
            },

            /* ─────────────────────────────────────────
               BACKDROP BLUR
            ───────────────────────────────────────── */
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;