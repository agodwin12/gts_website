// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Global Loading UI
//   Shown by Next.js during page transitions (App Router)
//   Lightweight — no client JS needed
// ═══════════════════════════════════════════════════════════════

export default function Loading() {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
            aria-label="Loading page"
            role="status"
        >
            {/* Background grid */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)
          `,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Glow */}
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-64 h-64 rounded-full bg-brand/10 blur-[80px]"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">

                {/* Logo mark */}
                <div className="relative">
                    {/* Spinning ring */}
                    <svg
                        className="animate-spin"
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="rgba(14,165,233,0.15)"
                            strokeWidth="3"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#0ea5e9"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="44 132"
                            strokeDashoffset="0"
                        />
                    </svg>

                    {/* G mark in center */}
                    <div
                        className="absolute inset-0 flex items-center justify-center
                       font-display font-bold text-xl text-brand"
                        aria-hidden="true"
                    >
                        G
                    </div>
                </div>

                {/* Brand name */}
                <div className="flex flex-col items-center gap-1">
                    <p className="font-display font-bold text-base text-white tracking-tight">
                        Godwin Tech Solutions
                    </p>
                    {/* Animated dots */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className="w-1 h-1 rounded-full bg-brand/60 animate-pulse"
                                style={{ animationDelay: `${i * 200}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Screen reader announcement */}
            <span className="sr-only">Loading, please wait…</span>
        </div>
    );
}