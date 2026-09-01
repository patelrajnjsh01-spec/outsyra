import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

// In-memory fallback events cache
let inMemoryAnalyticsEvents = [
    { id: "ev-1", workspace_id: "ws-rajnish-001", event_name: "page_view", visitor_id: "vis-01", source: "instagram", created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: "ev-2", workspace_id: "ws-rajnish-001", event_name: "link_click", visitor_id: "vis-01", source: "instagram", metadata: { block_title: "Creator Monetization Master Ebook" }, created_at: new Date(Date.now() - 3500000).toISOString() },
    { id: "ev-3", workspace_id: "ws-rajnish-001", event_name: "page_view", visitor_id: "vis-02", source: "tiktok", created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: "ev-4", workspace_id: "ws-rajnish-001", event_name: "link_click", visitor_id: "vis-02", source: "tiktok", metadata: { block_title: "Full-Stack Creator Academy" }, created_at: new Date(Date.now() - 7100000).toISOString() },
    { id: "ev-5", workspace_id: "ws-rajnish-001", event_name: "page_view", visitor_id: "vis-03", source: "youtube", created_at: new Date(Date.now() - 14400000).toISOString() },
    { id: "ev-6", workspace_id: "ws-rajnish-001", event_name: "cta_click", visitor_id: "vis-03", source: "youtube", metadata: { block_title: "Book 1:1 Strategy Call" }, created_at: new Date(Date.now() - 14300000).toISOString() },
    { id: "ev-7", workspace_id: "ws-rajnish-001", event_name: "page_view", visitor_id: "vis-04", source: "direct", created_at: new Date(Date.now() - 28800000).toISOString() },
];

export async function POST(req) {
    try {
        const body = await req.json();
        const { workspace_id, page_id, event_name, event_type, block_id, visitor_id, source, metadata } = body;

        const newEvent = {
            id: `ev-${Date.now()}`,
            workspace_id: workspace_id || "ws-rajnish-001",
            page_id: page_id || null,
            event_name: event_name || event_type || "page_view",
            visitor_id: visitor_id || `vis-${Math.random().toString(36).substring(7)}`,
            source: source || "direct",
            metadata: metadata || { block_id },
            created_at: new Date().toISOString(),
        };

        inMemoryAnalyticsEvents.push(newEvent);

        // Try persisting to Supabase if configured
        try {
            const supabase = createClient();
            if (supabase) {
                await supabase.from("analytics_events").insert([newEvent]);
            }
        } catch (dbErr) {
            console.warn("[Analytics API] Supabase insert fallback:", dbErr);
        }

        return NextResponse.json({ success: true, event: newEvent });
    } catch (err) {
        console.error("[Analytics API] POST error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const workspace_id = searchParams.get("workspace_id") || "ws-rajnish-001";

        // Try reading from Supabase
        try {
            const supabase = createClient();
            if (supabase) {
                const { data, error } = await supabase
                    .from("analytics_events")
                    .select("*")
                    .eq("workspace_id", workspace_id)
                    .order("created_at", { ascending: false });

                if (data && data.length > 0 && !error) {
                    return NextResponse.json({ success: true, events: data });
                }
            }
        } catch (dbErr) {
            console.warn("[Analytics API] Supabase get fallback:", dbErr);
        }

        return NextResponse.json({ success: true, events: inMemoryAnalyticsEvents });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
