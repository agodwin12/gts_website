// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — PostCSS Configuration
//   Required for Tailwind CSS processing in Next.js
// ═══════════════════════════════════════════════════════════════

/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: {
        // Tailwind CSS — generates utility classes and processes directives
        tailwindcss: {},

        // Autoprefixer — adds vendor prefixes for cross-browser support
        autoprefixer: {},
    },
};