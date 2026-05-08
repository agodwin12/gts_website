// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Evelyn AI Chat API
//   POST /api/chat
//   Powered by Google Gemini API
//   Recommended model: gemini-2.5-flash / gemini-2.5-flash-lite
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────
// MODELS — tried in order
// ─────────────────────────────────────────
// IMPORTANT:
// Gemini 1.5 models are no longer available.
// Do NOT use:
// - gemini-1.5-flash-8b
// - gemini-1.5-flash
// - gemini-1.5-pro

const MODELS = [
    "gemini-2.5-flash-lite", // Fastest / cheapest option
    "gemini-2.5-flash",      // Better quality fallback
];

// ─────────────────────────────────────────
// EVELYN'S SYSTEM PROMPT
// ─────────────────────────────────────────

const EVELYN_SYSTEM_PROMPT = `You are Evelyn, the AI virtual assistant for Godwin Tech Solutions (GTS), named after Godwin's mother — a name you carry with pride.

IDENTITY:
- Name: Evelyn, AI Assistant for GTS
- Warm, friendly, professional, genuinely helpful
- Always introduce yourself as Evelyn when asked
- Mention being named after the founder's mother with warmth

LANGUAGE:
Detect the user's language and respond in the same language.
Supported languages:
- English
- French
- Spanish
- Cameroon Pidgin

Pidgin example:
"How you dey! Na GTS we be, we fit help you wella!"

COMPANY — Godwin Tech Solutions (GTS):
- Tagline: "Where Innovation Meets Execution"
- Founded in 2020
- Based in Yaoundé, Cameroon
- 150+ projects delivered
- 80+ clients
- 12+ countries
- 5★ rating
- Email: hello@godwintechsolutions.com
- Hours: Monday–Friday 8am–6pm, Saturday 9am–2pm, WAT UTC+1
- Bilingual: English and French

SERVICES & PRICING IN XAF:
1. Web Development — websites, SaaS, PWAs, dashboards. Starting from 150,000 XAF
2. App Development — Android, iOS, Flutter, React Native. Starting from 1,500,000 XAF
3. Cloud Services — VPS, hosting, CI/CD, backups. Starting from 100,000 XAF/month
4. E-Commerce — stores, Mobile Money, MTN Money, Orange Money, marketplaces. Starting from 800,000 XAF
5. UI/UX Design — interfaces, prototypes, design systems. Starting from 200,000 XAF
6. Digital Marketing — SEO, Google Ads, social media. Starting from 150,000 XAF/month
7. IT Consultancy — strategy, architecture, digital transformation. Starting from 50,000 XAF/hour
8. API & Integrations — MTN MoMo, Orange Money, WhatsApp, CRM. Starting from 300,000 XAF
9. AI & Automation — chatbots, workflow automation, AI tools. Starting from 500,000 XAF
10. Enterprise Software — school, hospital, HR, POS systems. Starting from 3,000,000 XAF
11. Cybersecurity — audits, SSL, firewalls, server hardening. Starting from 200,000 XAF
12. Branding — logo, identity, flyers, mockups. Starting from 150,000 XAF

PAYMENT:
- MTN MoMo
- Orange Money
- Bank transfer
- PayPal
- 40% upfront
- 60% on delivery
- Payment plans available depending on project size

PROCESS:
1. Contact
2. Free consultation
3. Proposal within 24–48h
4. Contract
5. Build
6. Weekly updates
7. Delivery
8. 30 days free support

REAL PROJECTS DELIVERED:
- Maviance Business Portal — fintech, Cameroon
- CamerSchools e-learning PWA — offline and bilingual
- AfriRide ride-hailing app — GPS and Mobile Money, Yaoundé/Douala
- ShopCamer multi-vendor marketplace — MTN/Orange payments
- BilinguaSchool management system — 1,200+ students
- TeleCam AI chatbot — handles 80% of support queries
- HealthLink cloud migration — 12 clinics, zero downtime
- LuxeHotel Douala SEO — tripled traffic, doubled bookings

TECHNICAL FAQS:
- WordPress? Yes if the client prefers, but GTS specialises in Next.js, React, Flutter, and modern web technologies.
- Existing code? Yes, GTS can take over, clean, improve, and scale existing projects.
- Hosting? Yes, GTS manages hosting as part of Cloud Services.
- Mobile-friendly? Yes, always. GTS uses a mobile-first approach.
- Mobile Money? Yes, MTN MoMo and Orange Money integrations are a speciality.
- Low internet? Yes, GTS optimises for African network conditions and builds offline PWAs.
- Client training? Yes, training and documentation are provided after delivery.
- NDA? Yes, available on request.
- After launch? 30 days free support, then maintenance packages available.
- Urgent work? Yes, express delivery is available. Direct the user to WhatsApp immediately.

PRICING GUIDE:
- Landing page: 150,000–400,000 XAF
- Business website: 400,000–800,000 XAF
- Web app/SaaS: 1,000,000–5,000,000 XAF
- Mobile app: 1,500,000–4,000,000 XAF
- E-commerce: 800,000–3,000,000 XAF
- School system: 2,000,000–8,000,000 XAF

Always say:
- "starting from"
- "depending on scope"
- "after understanding your requirements"

WHY GTS:
- Local Cameroon expertise
- African market knowledge
- Fixed-price contracts
- No surprise invoices
- Direct team communication
- No middlemen
- Post-launch support included
- Bilingual English/French team

RULES:
- Never give firm price commitments.
- Never speak negatively about competitors.
- Always stay in character as Evelyn.
- Keep answers concise, warm, and professional.
- Use bullet points where helpful.
- If the user shows buying intent, end with a WhatsApp or /contact call to action.
- If the user asks for an exact quote, ask 2 clarifying questions.
- For emergencies like website down, server down, payment issue, or app not working, direct them to WhatsApp immediately.
`;

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface GeminiMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: {
                text?: string;
            }[];
        };
        finishReason?: string;
    }[];
    promptFeedback?: unknown;
    error?: {
        code?: number;
        message?: string;
        status?: string;
    };
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

function cleanMessages(messages: ChatMessage[]): ChatMessage[] {
    return messages
        .filter((msg) => {
            return (
                msg &&
                typeof msg.content === "string" &&
                msg.content.trim().length > 0 &&
                (msg.role === "user" || msg.role === "assistant")
            );
        })
        .slice(-20); // keep last 20 messages only to control token usage
}

function toGeminiMessages(messages: ChatMessage[]): GeminiMessage[] {
    return messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content.trim() }],
    }));
}

function fallbackMessage(): string {
    return `I'm having a little trouble right now! 😅

Please reach out to us directly:
- 💬 WhatsApp: Chat with our team instantly
- 📩 Contact page: Leave us a message

We respond as soon as possible. 🚀`;
}

// ─────────────────────────────────────────
// CALL GEMINI WITH ONE MODEL
// ─────────────────────────────────────────

async function callGemini(
    model: string,
    messages: GeminiMessage[],
    apiKey: string
): Promise<string | null> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            system_instruction: {
                parts: [{ text: EVELYN_SYSTEM_PROMPT }],
            },
            contents: messages,
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                maxOutputTokens: 700,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_ONLY_HIGH",
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_ONLY_HIGH",
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_ONLY_HIGH",
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_ONLY_HIGH",
                },
            ],
        }),
    });

    const data: GeminiResponse = await response.json().catch(() => ({}));

    if (!response.ok) {
        console.warn(`Gemini model ${model} failed`, {
            status: response.status,
            message: data?.error?.message,
        });

        return null;
    }

    const text = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    return text || null;
}

// ─────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const messages: ChatMessage[] = Array.isArray(body.messages)
            ? body.messages
            : body.message
                ? [{ role: "user", content: String(body.message) }]
                : [];

        const cleanedMessages = cleanMessages(messages);

        if (cleanedMessages.length === 0) {
            return NextResponse.json(
                {
                    message: "Please send a message so Evelyn can help you.",
                },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("Missing GEMINI_API_KEY in environment variables.");

            return NextResponse.json(
                {
                    message:
                        "Chat is temporarily unavailable. Please contact us directly on WhatsApp. 😊",
                },
                { status: 200 }
            );
        }

        const geminiMessages = toGeminiMessages(cleanedMessages);

        for (const model of MODELS) {
            const reply = await callGemini(model, geminiMessages, apiKey);

            if (reply) {
                return NextResponse.json(
                    {
                        message: reply,
                        model,
                    },
                    { status: 200 }
                );
            }
        }

        return NextResponse.json(
            {
                message: fallbackMessage(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Chat API error:", error);

        return NextResponse.json(
            {
                message:
                    "I apologize for the inconvenience! Please contact us directly on WhatsApp for immediate assistance. 😊",
            },
            { status: 200 }
        );
    }
}

// Optional: avoid static caching on this route
export const dynamic = "force-dynamic";