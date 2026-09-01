import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createAdminSupabaseClient } from "@/lib/supabase/admin.js";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function isSupabaseConfigured() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return Boolean(url && key && !url.includes("your-project-id") && !key.includes("your-supabase"));
}

function ensureUploadsDirectory() {
    if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
}

export async function POST(request) {
    try {
        const contentType = request.headers.get("content-type") || "";

        let fileBuffer;
        let originalFileName = "uploaded_file";
        let mimeType = "application/octet-stream";
        let fileSize = 0;
        let bucket = "product-assets";

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file = formData.get("file");
            bucket = formData.get("bucket") || bucket;

            if (!file || typeof file === "string") {
                return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
            }

            originalFileName = file.name || "upload";
            mimeType = file.type || "application/octet-stream";
            fileSize = file.size || 0;

            const arrayBuffer = await file.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
        } else if (contentType.includes("application/json")) {
            const json = await request.json();
            if (!json.base64) {
                return NextResponse.json({ error: "No base64 data provided" }, { status: 400 });
            }
            originalFileName = json.fileName || "uploaded_image.png";
            mimeType = json.mimeType || "image/png";
            bucket = json.bucket || bucket;

            const base64Data = json.base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");
            fileBuffer = Buffer.from(base64Data, "base64");
            fileSize = fileBuffer.length;
        } else {
            return NextResponse.json({ error: "Unsupported Content-Type. Use multipart/form-data." }, { status: 400 });
        }

        const isImage = mimeType.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(originalFileName);
        const cleanName = `${Date.now()}_${originalFileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        // 1. Try Supabase Storage if configured
        if (isSupabaseConfigured()) {
            try {
                const supabase = createAdminSupabaseClient();
                const targetBucket = isImage ? "product-images" : bucket;

                // Attempt upload
                const { data, error } = await supabase.storage
                    .from(targetBucket)
                    .upload(cleanName, fileBuffer, {
                        contentType: mimeType,
                        cacheControl: "3600",
                        upsert: true,
                    });

                if (!error && data) {
                    const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(cleanName);
                    return NextResponse.json({
                        success: true,
                        url: urlData?.publicUrl || `/uploads/${cleanName}`,
                        fileName: originalFileName,
                        fileSize,
                        mimeType,
                        isImage,
                        storage: "supabase",
                    });
                }
                console.warn("[Upload API] Supabase storage upload notice:", error?.message);
            } catch (supabaseErr) {
                console.warn("[Upload API] Supabase storage upload fallback:", supabaseErr?.message);
            }
        }

        // 2. Local Server Persistence (public/uploads/)
        ensureUploadsDirectory();
        const localFilePath = path.join(UPLOADS_DIR, cleanName);
        fs.writeFileSync(localFilePath, fileBuffer);

        const publicUrl = `/uploads/${cleanName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: originalFileName,
            fileSize,
            mimeType,
            isImage,
            storage: "local",
        });
    } catch (err) {
        console.error("[Upload API] Internal error:", err);
        return NextResponse.json({ error: "Failed to process upload: " + err.message }, { status: 500 });
    }
}
