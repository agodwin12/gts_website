"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Image Uploader Component
//   Drag & drop or click to upload from PC
//   Falls back to URL input
//   Used in admin project forms
// ═══════════════════════════════════════════════════════════════

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
    Upload, Link2, X, CheckCircle2,
    ImageIcon, Loader2, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface ImageUploaderProps {
    value:       string;
    onChange:    (url: string) => void;
    label?:      string;
    required?:   boolean;
    disabled?:   boolean;
    hint?:       string;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

export default function ImageUploader({
                                          value,
                                          onChange,
                                          label    = "Image",
                                          required = false,
                                          disabled = false,
                                          hint,
                                      }: ImageUploaderProps) {
    const [mode,     setMode]     = useState<"upload" | "url">("upload");
    const [dragging, setDragging] = useState(false);
    const [uploading,setUploading]= useState(false);
    const [error,    setError]    = useState("");
    const [urlInput, setUrlInput] = useState(value || "");
    const fileRef = useRef<HTMLInputElement>(null);

    // ── Upload file to API ──
    const uploadFile = useCallback(async (file: File) => {
        setError("");
        setUploading(true);

        try {
            const token    = localStorage.getItem("gts_admin_token");
            const formData = new FormData();
            formData.append("file", file);

            const res  = await fetch("/api/admin/upload", {
                method:  "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body:    formData,
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Upload failed");
                return;
            }

            onChange(data.url);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setUploading(false);
        }
    }, [onChange]);

    // ── File input change ──
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
    };

    // ── Drag events ──
    const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true);  };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragging(false); };
    const handleDrop      = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) uploadFile(file);
    };

    // ── URL input submit ──
    const handleUrlSubmit = () => {
        if (!urlInput.trim()) return;
        onChange(urlInput.trim());
        setError("");
    };

    // ── Clear image ──
    const handleClear = () => {
        onChange("");
        setUrlInput("");
        setError("");
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {/* Label */}
            <div className="flex items-center justify-between">
                <label className="font-body text-sm font-medium text-neutral-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {hint && (
                    <span className="font-body text-xs text-neutral-400">{hint}</span>
                )}
            </div>

            {/* Mode toggle */}
            <div className="flex rounded-lg border border-neutral-200 p-0.5 w-fit bg-neutral-50">
                {(["upload", "url"] as const).map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                            "font-body text-xs font-medium transition-all duration-150",
                            mode === m
                                ? "bg-white text-neutral-900 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-700"
                        )}
                    >
                        {m === "upload"
                            ? <><Upload size={12} /> Upload file</>
                            : <><Link2 size={12} /> Paste URL</>}
                    </button>
                ))}
            </div>

            {/* Upload mode */}
            {mode === "upload" && (
                <div>
                    {/* Drop zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !disabled && !uploading && fileRef.current?.click()}
                        className={cn(
                            "relative flex flex-col items-center justify-center gap-3",
                            "border-2 border-dashed rounded-2xl p-8 cursor-pointer",
                            "transition-all duration-200",
                            dragging
                                ? "border-brand bg-brand/5 scale-[1.01]"
                                : "border-neutral-200 bg-neutral-50 hover:border-brand/50 hover:bg-brand/2",
                            (disabled || uploading) && "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={28} className="text-brand animate-spin" />
                                <p className="font-body text-sm text-neutral-500">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                    dragging ? "bg-brand text-white" : "bg-neutral-100 text-neutral-400"
                                )}>
                                    <Upload size={22} />
                                </div>
                                <div className="text-center">
                                    <p className="font-body text-sm font-medium text-neutral-700">
                                        {dragging ? "Drop to upload" : "Drag & drop or click to browse"}
                                    </p>
                                    <p className="font-body text-xs text-neutral-400 mt-1">
                                        PNG, JPG, WebP — max 5MB
                                    </p>
                                </div>
                            </>
                        )}

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={disabled || uploading}
                        />
                    </div>
                </div>
            )}

            {/* URL mode */}
            {mode === "url" && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                        placeholder="https://res.cloudinary.com/your-cloud/..."
                        disabled={disabled}
                        className={cn(
                            "flex-1 rounded-xl border border-neutral-200 bg-white",
                            "px-4 py-2.5 font-body text-sm text-neutral-900",
                            "placeholder:text-neutral-400",
                            "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
                            "disabled:opacity-50 transition-all duration-200"
                        )}
                    />
                    <button
                        type="button"
                        onClick={handleUrlSubmit}
                        disabled={!urlInput.trim() || disabled}
                        className={cn(
                            "px-4 py-2.5 rounded-xl",
                            "bg-brand text-white font-body text-sm font-medium",
                            "hover:bg-brand-dark transition-colors",
                            "disabled:opacity-40 disabled:cursor-not-allowed"
                        )}
                    >
                        Use URL
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={13} />
                    <p className="font-body text-xs">{error}</p>
                </div>
            )}

            {/* Preview — shown when image is set */}
            {value && (
                <div className="relative mt-2">
                    <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        {value.startsWith("/") || value.startsWith("http") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon size={32} className="text-neutral-300" />
                            </div>
                        )}

                        {/* Success overlay */}
                        <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
                <CheckCircle2 size={11} /> Image set
              </span>
                        </div>

                        {/* Clear button */}
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={disabled}
                            className={cn(
                                "absolute top-2 right-2",
                                "w-7 h-7 rounded-full",
                                "bg-neutral-900/70 text-white",
                                "flex items-center justify-center",
                                "hover:bg-red-500 transition-colors"
                            )}
                            aria-label="Remove image"
                        >
                            <X size={13} />
                        </button>
                    </div>

                    {/* URL display */}
                    <p className="font-mono text-[10px] text-neutral-400 mt-1.5 truncate px-1">
                        {value}
                    </p>
                </div>
            )}
        </div>
    );
}