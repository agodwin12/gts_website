"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Evelyn Chat Widget
//   Floating chat assistant · Auto-suggests herself
//   Multilingual · WhatsApp CTA · Avatar from public/avatar.png
// ═══════════════════════════════════════════════════════════════

import React, {
    useState, useEffect, useRef, useCallback,
} from "react";
import Image      from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Send, MessageCircle,
    ExternalLink, Phone, Minimize2,
    RotateCcw,
} from "lucide-react";
import { cn }          from "@/lib/utils";
import { siteConfig }  from "@/lib/config";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface Message {
    id:        string;
    role:      "user" | "assistant";
    content:   string;
    timestamp: Date;
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const WHATSAPP_LINK = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hello! I'd like to discuss a project with Godwin Tech Solutions."
)}`;

const CONTACT_LINK = "/contact";

// Auto-suggest bubble — rotates to remind users Evelyn exists
const SUGGEST_MESSAGES = [
    "👋 Hi! I'm Evelyn. Ask me anything about GTS!",
    "💬 Need help? I speak English, French, Spanish & Pidgin!",
    "🚀 Curious about our services or pricing? Ask me!",
    "👩 I'm Evelyn — your GTS guide. How can I help?",
    "🇨🇲 Building something? Let's talk about your project!",
];

// Welcome message from Evelyn
const WELCOME_MESSAGE: Message = {
    id:        "welcome",
    role:      "assistant",
    content:   `Hello! 👋 I'm **Evelyn**, the AI assistant for **Godwin Tech Solutions**.

I'm here to help you with any questions about our services, pricing, or how we can help your business grow! 🚀

I speak **English**, **French**, **Spanish**, and **Pidgin** — just write in your preferred language and I'll respond in kind.

What can I help you with today? 😊`,
    timestamp: new Date(),
};

// Quick reply buttons shown at start
const QUICK_REPLIES = [
    { label: "💬 Talk to a Human",  action: "whatsapp" },
    { label: "📩 Contact Us",       action: "contact"  },
];

// ─────────────────────────────────────────
// MESSAGE BUBBLE
// ─────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";

    // Simple markdown-like formatting
    const formatContent = (text: string) => {
        return text
            .split("\n")
            .map((line, i) => {
                // Bold text **text**
                const formatted = line.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                );
                return (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                        className="block"
                    />
                );
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "flex gap-2.5 items-end",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Avatar — only for Evelyn */}
            {!isUser && (
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image
                        src="/avatar.png"
                        alt="Evelyn"
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            {/* Bubble */}
            <div
                className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5",
                    "font-body text-sm leading-relaxed",
                    isUser
                        ? "bg-brand text-white rounded-br-sm"
                        : "bg-white text-neutral-800 rounded-bl-sm shadow-sm border border-neutral-100"
                )}
            >
                {formatContent(message.content)}
                <span
                    className={cn(
                        "block text-[10px] mt-1",
                        isUser ? "text-white/60 text-right" : "text-neutral-400"
                    )}
                >
          {message.timestamp.toLocaleTimeString([], {
              hour:   "2-digit",
              minute: "2-digit",
          })}
        </span>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────

function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: 4 }}
            className="flex gap-2.5 items-end"
        >
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                <Image
                    src="/avatar.png"
                    alt="Evelyn"
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-neutral-100">
                <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// AUTO-SUGGEST BUBBLE
// ─────────────────────────────────────────

function SuggestBubble({
                           message,
                           onOpen,
                           onDismiss,
                       }: {
    message:   string;
    onOpen:    () => void;
    onDismiss: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{    opacity: 0, y: 8,  scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end gap-2 mb-3"
        >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                <Image
                    src="/avatar.png"
                    alt="Evelyn"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Bubble */}
            <div className="relative">
                <button
                    onClick={onOpen}
                    className={cn(
                        "max-w-[220px] text-left",
                        "bg-white text-neutral-800",
                        "rounded-2xl rounded-bl-sm px-4 py-2.5",
                        "font-body text-sm leading-snug",
                        "shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
                        "border border-neutral-100",
                        "hover:border-brand/30 hover:shadow-brand-sm",
                        "transition-all duration-200"
                    )}
                >
                    {message}
                </button>

                {/* Dismiss */}
                <button
                    onClick={onDismiss}
                    className={cn(
                        "absolute -top-2 -right-2",
                        "w-5 h-5 rounded-full",
                        "bg-neutral-200 text-neutral-500",
                        "flex items-center justify-center",
                        "hover:bg-neutral-300 transition-colors",
                        "text-xs"
                    )}
                    aria-label="Dismiss"
                >
                    <X size={10} />
                </button>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN CHAT WIDGET
// ─────────────────────────────────────────

export default function ChatWidget() {
    const [isOpen,       setIsOpen]       = useState(false);
    const [messages,     setMessages]     = useState<Message[]>([WELCOME_MESSAGE]);
    const [input,        setInput]        = useState("");
    const [isTyping,     setIsTyping]     = useState(false);
    const [suggestIndex, setSuggestIndex] = useState(0);
    const [showSuggest,  setShowSuggest]  = useState(false);
    const [dismissed,    setDismissed]    = useState(false);
    const [unread,       setUnread]       = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef       = useRef<HTMLTextAreaElement>(null);

    // ── Auto-scroll to bottom ──
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // ── Auto-suggest — show bubble after 4s, rotate every 8s ──
    useEffect(() => {
        if (isOpen || dismissed) return;

        const showTimer = setTimeout(() => setShowSuggest(true), 4000);
        return () => clearTimeout(showTimer);
    }, [isOpen, dismissed]);

    useEffect(() => {
        if (!showSuggest || isOpen || dismissed) return;

        const rotateTimer = setInterval(() => {
            setSuggestIndex((i) => (i + 1) % SUGGEST_MESSAGES.length);
        }, 8000);

        return () => clearInterval(rotateTimer);
    }, [showSuggest, isOpen, dismissed]);

    // ── Focus input when chat opens ──
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
            setUnread(0);
            setShowSuggest(false);
        }
    }, [isOpen]);

    // ── Send message ──
    const sendMessage = useCallback(async () => {
        const text = input.trim();
        if (!text || isTyping) return;

        const userMessage: Message = {
            id:        `user-${Date.now()}`,
            role:      "user",
            content:   text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const history = [...messages, userMessage].map((m) => ({
                role:    m.role,
                content: m.content,
            }));

            const res  = await fetch("/api/chat", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ messages: history }),
            });

            const data = await res.json();

            const assistantMessage: Message = {
                id:        `assistant-${Date.now()}`,
                role:      "assistant",
                content:   data.message || "I apologize, I had trouble responding. Please try again! 😊",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // If chat is closed, show unread count
            if (!isOpen) setUnread((n) => n + 1);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id:        `error-${Date.now()}`,
                    role:      "assistant",
                    content:   "I'm having a little trouble right now. Please contact us directly on WhatsApp for immediate help! 💬",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    }, [input, isTyping, messages, isOpen]);

    // ── Handle Enter key ──
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── Reset conversation ──
    const handleReset = () => {
        setMessages([WELCOME_MESSAGE]);
        setInput("");
        setUnread(0);
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
            aria-live="polite"
        >
            {/* ── Auto-suggest bubble ── */}
            <AnimatePresence>
                {showSuggest && !isOpen && !dismissed && (
                    <SuggestBubble
                        message={SUGGEST_MESSAGES[suggestIndex]}
                        onOpen={() => { setIsOpen(true); setShowSuggest(false); }}
                        onDismiss={() => { setDismissed(true); setShowSuggest(false); }}
                    />
                )}
            </AnimatePresence>

            {/* ── Chat window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, scale: 0.92, y: 20,  originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1,    y: 0                            }}
                        exit={{    opacity: 0, scale: 0.92, y: 12                           }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            "w-[360px] sm:w-[380px]",
                            "bg-neutral-50 rounded-3xl",
                            "shadow-[0_20px_60px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.1)]",
                            "border border-neutral-200",
                            "overflow-hidden",
                            "flex flex-col",
                            "max-h-[560px]"
                        )}
                        role="dialog"
                        aria-label="Chat with Evelyn"
                        aria-modal="false"
                    >
                        {/* ── Header ── */}
                        <div className={cn(
                            "flex items-center gap-3 px-4 py-3.5",
                            "bg-gradient-to-r from-neutral-900 to-neutral-800",
                            "border-b border-white/5"
                        )}>
                            {/* Avatar + info */}
                            <div className="relative shrink-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand/40">
                                    <Image
                                        src="/avatar.png"
                                        alt="Evelyn"
                                        width={40}
                                        height={40}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                {/* Online dot */}
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-neutral-900" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-display font-bold text-sm text-white">
                                    Evelyn
                                </p>
                                <p className="font-body text-xs text-neutral-400">
                                    GTS AI Assistant · Always here to help
                                </p>
                            </div>

                            {/* Header actions */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleReset}
                                    aria-label="Reset conversation"
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                                    title="Start new conversation"
                                >
                                    <RotateCcw size={14} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close chat"
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <Minimize2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* ── Messages ── */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hidden">
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}

                            <AnimatePresence>
                                {isTyping && <TypingIndicator />}
                            </AnimatePresence>

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── Quick reply buttons ── */}
                        <div className="px-4 pb-2 flex gap-2">
                            {QUICK_REPLIES.map(({ label, action }) => (
                                <a
                                    key={action}
                                    href={action === "whatsapp" ? WHATSAPP_LINK : CONTACT_LINK}
                                    target={action === "whatsapp" ? "_blank" : undefined}
                                    rel={action === "whatsapp" ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-1.5",
                                        "px-3 py-2 rounded-xl",
                                        "font-body text-xs font-semibold",
                                        "border transition-all duration-200",
                                        action === "whatsapp"
                                            ? "bg-green-500/10 border-green-500/20 text-green-600 hover:bg-green-500/20"
                                            : "bg-brand/8 border-brand/20 text-brand hover:bg-brand/15"
                                    )}
                                >
                                    {action === "whatsapp"
                                        ? <><Phone size={11} /> Talk to a Human</>
                                        : <><ExternalLink size={11} /> Contact Us</>}
                                </a>
                            ))}
                        </div>

                        {/* ── Input area ── */}
                        <div className={cn(
                            "px-4 pb-4 pt-2",
                            "border-t border-neutral-200 bg-white"
                        )}>
                            <div className={cn(
                                "flex items-end gap-2",
                                "bg-neutral-50 rounded-2xl border border-neutral-200",
                                "px-3 py-2",
                                "focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10",
                                "transition-all duration-200"
                            )}>
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Evelyn anything..."
                    rows={1}
                    disabled={isTyping}
                    className={cn(
                        "flex-1 bg-transparent resize-none",
                        "font-body text-sm text-neutral-900",
                        "placeholder:text-neutral-400",
                        "focus:outline-none",
                        "disabled:opacity-50",
                        "max-h-24 leading-relaxed"
                    )}
                    style={{ scrollbarWidth: "none" }}
                    aria-label="Message Evelyn"
                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isTyping}
                                    aria-label="Send message"
                                    className={cn(
                                        "w-8 h-8 rounded-xl shrink-0",
                                        "flex items-center justify-center",
                                        "transition-all duration-200",
                                        input.trim() && !isTyping
                                            ? "bg-brand text-white hover:bg-brand-dark shadow-brand-sm"
                                            : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                    )}
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <p className="font-body text-[10px] text-neutral-400 text-center mt-2">
                                Powered by GTS AI · Evelyn speaks EN · FR · ES · Pidgin
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating trigger button ── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{   scale: 0.95 }}
                aria-label={isOpen ? "Close chat" : "Chat with Evelyn"}
                aria-expanded={isOpen}
                className={cn(
                    "relative w-14 h-14 rounded-full",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
                    "transition-all duration-300",
                    "overflow-hidden border-2",
                    isOpen
                        ? "border-brand/50 shadow-brand"
                        : "border-white/80 hover:border-brand/40"
                )}
            >
                {/* Avatar */}
                <Image
                    src="/avatar.png"
                    alt="Chat with Evelyn"
                    fill
                    className="object-cover"
                />

                {/* Close overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1   }}
                            exit={{    opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 bg-neutral-900/80 flex items-center justify-center"
                        >
                            <X size={20} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Unread badge */}
                <AnimatePresence>
                    {unread > 0 && !isOpen && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{    scale: 0 }}
                            className={cn(
                                "absolute -top-1 -right-1",
                                "w-5 h-5 rounded-full",
                                "bg-red-500 text-white",
                                "font-body text-[10px] font-bold",
                                "flex items-center justify-center",
                                "border-2 border-white"
                            )}
                        >
                            {unread}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Pulse ring — draws attention */}
                {!isOpen && (
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-brand/40 animate-ping"
                    />
                )}
            </motion.button>
        </div>
    );
}