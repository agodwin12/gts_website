// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Cloudflare R2 Client
//   S3-compatible object storage for project images
// ═══════════════════════════════════════════════════════════════

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// ─────────────────────────────────────────
// R2 CLIENT SINGLETON
// ─────────────────────────────────────────

export const r2Client = new S3Client({
    region:   process.env.R2_REGION || "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
export const R2_PUBLIC_URL  = process.env.R2_PUBLIC_URL!;

// ─────────────────────────────────────────
// UPLOAD FILE TO R2
// ─────────────────────────────────────────

export async function uploadToR2(
    file:        Buffer,
    filename:    string,
    contentType: string
): Promise<string> {
    const key = `projects/${filename}`;

    await r2Client.send(
        new PutObjectCommand({
            Bucket:      R2_BUCKET_NAME,
            Key:         key,
            Body:        file,
            ContentType: contentType,
            // Make publicly readable
            ACL:         "public-read",
        })
    );

    // Return the public URL
    return `${R2_PUBLIC_URL}/${key}`;
}

// ─────────────────────────────────────────
// DELETE FILE FROM R2
// ─────────────────────────────────────────

export async function deleteFromR2(url: string): Promise<void> {
    try {
        // Extract key from URL
        const key = url.replace(`${R2_PUBLIC_URL}/`, "");
        await r2Client.send(
            new DeleteObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key:    key,
            })
        );
    } catch (err) {
        console.error("R2 delete error:", err);
    }
}