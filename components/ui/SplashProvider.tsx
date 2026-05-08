"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Splash Provider
//   Shows splash once per browser session (not on every nav)
//   Uses sessionStorage so it only shows on first visit
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import SplashScreen from "@/components/ui/SplashScreen";

export default function SplashProvider({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const [showSplash, setShowSplash] = useState(false);
    const [mounted,    setMounted]    = useState(false);

    useEffect(() => {
        setMounted(true);

        // Only show splash once per browser session
        const hasSeenSplash = sessionStorage.getItem("gts_splash_shown");

        if (!hasSeenSplash) {
            setShowSplash(true);
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem("gts_splash_shown", "true");
    };

    // Don't render anything until mounted (prevents SSR mismatch)
    if (!mounted) return <>{children}</>;

    return (
        <>
            {showSplash && (
                <SplashScreen onComplete={handleSplashComplete} />
            )}
            {children}
        </>
    );
}