// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Contact Form API Route
//   POST /api/contact
//   Validates input → sends email to GTS inbox via Nodemailer
//   Also sends an auto-reply confirmation to the sender
// ═══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// ─────────────────────────────────────────
// VALIDATION SCHEMA
// ─────────────────────────────────────────

const contactSchema = z.object({
    name:    z.string().min(2,  "Name must be at least 2 characters"),
    email:   z.string().email("Please enter a valid email address"),
    phone:   z.string().optional(),
    company: z.string().optional(),
    service: z.string().min(1, "Please select a service"),
    budget:  z.string().optional(),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

// ─────────────────────────────────────────
// NODEMAILER TRANSPORTER
// ─────────────────────────────────────────

function createTransporter() {
    return nodemailer.createTransport({
        host:   process.env.SMTP_HOST   || "smtp.gmail.com",
        port:   Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

// ─────────────────────────────────────────
// EMAIL TEMPLATES
// ─────────────────────────────────────────

function buildInternalEmail(data: z.infer<typeof contactSchema>): string {
    const budgetLabels: Record<string, string> = {
        "under-500k": "Under 500K XAF",
        "500k-1m":    "500K – 1M XAF",
        "1m-5m":      "1M – 5M XAF",
        "5m-10m":     "5M – 10M XAF",
        "above-10m":  "Above 10M XAF",
        "discuss":    "Prefer to discuss",
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Project Inquiry — GTS</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0369a1,#0ea5e9);padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;color:#fff;line-height:40px;text-align:center;">G</div>
                  <span style="display:inline-block;vertical-align:middle;margin-left:12px;font-size:18px;font-weight:700;color:#fff;">Godwin Tech Solutions</span>
                </td>
                <td align="right">
                  <span style="background:rgba(255,255,255,0.2);color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">New Inquiry</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a;">New Project Inquiry 🚀</h2>
            <p style="margin:0 0 32px;color:#64748b;font-size:14px;">A potential client has submitted the contact form. Details below.</p>

            <!-- Info grid -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              ${[
        ["👤 Name",    data.name],
        ["📧 Email",   data.email],
        ["📞 Phone",   data.phone    || "—"],
        ["🏢 Company", data.company  || "—"],
        ["🛠 Service",  data.service],
        ["💰 Budget",  data.budget ? (budgetLabels[data.budget] || data.budget) : "—"],
    ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="font-size:13px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">${label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;text-align:right;">
                  <span style="font-size:14px;color:#0f172a;font-weight:500;">${value}</span>
                </td>
              </tr>`).join("")}
            </table>

            <!-- Message -->
            <div style="background:#f8fafc;border-left:3px solid #0ea5e9;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:32px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">${data.message.replace(/\n/g, "<br/>")}</p>
            </div>

            <!-- CTA buttons -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="mailto:${data.email}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">Reply to ${data.name}</a>
                </td>
                ${data.phone ? `
                <td>
                  <a href="https://wa.me/${data.phone.replace(/\D/g,"")}?text=${encodeURIComponent(`Hello ${data.name}, thanks for reaching out to Godwin Tech Solutions!`)}" style="display:inline-block;background:#22c55e;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">WhatsApp ${data.name}</a>
                </td>` : ""}
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
              This email was sent from the contact form at godwintechsolutions.com · ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

function buildAutoReplyEmail(name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message — GTS</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0369a1,#0ea5e9);padding:40px;text-align:center;">
            <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;display:inline-block;line-height:48px;font-size:22px;font-weight:800;color:#fff;margin-bottom:16px;">G</div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;">Message Received!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">We'll be in touch within 24 hours</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#334155;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 20px;font-size:15px;color:#64748b;line-height:1.7;">
              Thank you for reaching out to <strong style="color:#0ea5e9;">Godwin Tech Solutions</strong>! We've received your message and one of our team members will review it and get back to you within <strong style="color:#0f172a;">24 business hours</strong>.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#64748b;line-height:1.7;">
              In the meantime, feel free to browse our portfolio or connect with us directly on WhatsApp for a faster response.
            </p>

            <!-- Quick links -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="padding-right:8px;" width="50%">
                  <a href="https://godwintechsolutions.com/portfolio" style="display:block;background:#f0f9ff;border:1px solid #bae6fd;color:#0369a1;padding:16px;border-radius:12px;text-decoration:none;text-align:center;">
                    <div style="font-size:20px;margin-bottom:4px;">🖥️</div>
                    <div style="font-size:13px;font-weight:600;">View Our Portfolio</div>
                  </a>
                </td>
                <td style="padding-left:8px;" width="50%">
                  <a href="https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237000000000").replace(/\D/g,"")}" style="display:block;background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;padding:16px;border-radius:12px;text-decoration:none;text-align:center;">
                    <div style="font-size:20px;margin-bottom:4px;">💬</div>
                    <div style="font-size:13px;font-weight:600;">Chat on WhatsApp</div>
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:14px;color:#94a3b8;">
              Best regards,<br/>
              <strong style="color:#0f172a;">The GTS Team</strong><br/>
              <span style="color:#0ea5e9;">Godwin Tech Solutions</span> · Douala, Cameroon
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
              © ${new Date().getFullYear()} Godwin Tech Solutions · Douala, Cameroon<br/>
              <a href="https://godwintechsolutions.com" style="color:#0ea5e9;text-decoration:none;">godwintechsolutions.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

// ─────────────────────────────────────────
// ROUTE HANDLER
// ─────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        // 1. Parse body
        const body = await req.json();

        // 2. Validate
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error:   "Validation failed",
                    details: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        // 3. Check SMTP config
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error("SMTP credentials missing — check .env.local");
            return NextResponse.json(
                { success: false, error: "Email service not configured" },
                { status: 500 }
            );
        }

        // 4. Create transporter & verify
        const transporter = createTransporter();
        await transporter.verify();

        const toAddress   = process.env.CONTACT_FORM_TO   || process.env.SMTP_USER!;
        const fromAddress = process.env.CONTACT_FORM_FROM  || process.env.SMTP_USER!;

        // 5. Send internal notification email to GTS inbox
        await transporter.sendMail({
            from:    `"GTS Contact Form" <${fromAddress}>`,
            to:      toAddress,
            replyTo: data.email,
            subject: `🚀 New Inquiry: ${data.service} — from ${data.name}`,
            html:    buildInternalEmail(data),
            text:    [
                `New inquiry from ${data.name}`,
                `Email:   ${data.email}`,
                `Phone:   ${data.phone   || "—"}`,
                `Company: ${data.company || "—"}`,
                `Service: ${data.service}`,
                `Budget:  ${data.budget  || "—"}`,
                `\nMessage:\n${data.message}`,
            ].join("\n"),
        });

        // 6. Send auto-reply to the sender
        await transporter.sendMail({
            from:    `"Godwin Tech Solutions" <${fromAddress}>`,
            to:      data.email,
            subject: `We received your message, ${data.name}! ✅`,
            html:    buildAutoReplyEmail(data.name),
            text:    [
                `Hi ${data.name},`,
                "",
                "Thank you for reaching out to Godwin Tech Solutions!",
                "We've received your message and will get back to you within 24 business hours.",
                "",
                "Best regards,",
                "The GTS Team",
                "godwintechsolutions.com",
            ].join("\n"),
        });

        // 7. Success
        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully! Check your inbox for a confirmation.",
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                success: false,
                error:   "Failed to send message. Please try again or contact us directly on WhatsApp.",
            },
            { status: 500 }
        );
    }
}

// Only POST is allowed
export async function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
    );
}