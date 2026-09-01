import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

// Server-side persistent custom templates
let serverCustomTemplates = [];

export async function GET() {
    try {
        // Try fetching from Supabase if configured
        try {
            const supabase = createClient();
            if (supabase) {
                const { data, error } = await supabase
                    .from("templates")
                    .select("*")
                    .order("created_at", { ascending: false });
                if (data && data.length > 0 && !error) {
                    return NextResponse.json({ success: true, templates: data });
                }
            }
        } catch (dbErr) {
            console.warn("[Templates Sync API] Supabase fetch fallback:", dbErr);
        }

        return NextResponse.json({ success: true, templates: serverCustomTemplates });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { template } = body;

        if (template) {
            serverCustomTemplates = [
                template,
                ...serverCustomTemplates.filter((t) => t.id !== template.id),
            ];

            // Try persisting to Supabase
            try {
                const supabase = createClient();
                if (supabase) {
                    await supabase.from("templates").upsert([
                        {
                            id: template.id,
                            title: template.name,
                            category: template.category || "custom",
                            thumbnail_url: template.preview_image || "",
                            canvas_json: template.config || {},
                            is_featured: false,
                        },
                    ]);
                }
            } catch (dbErr) {
                console.warn("[Templates Sync API] Supabase write fallback:", dbErr);
            }
        }

        return NextResponse.json({ success: true, templates: serverCustomTemplates });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
