import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { initialWorkspace, initialStoreBlocks } from "@/lib/supabase/mock-db";

// Server-side persistent state in Node.js process memory
let serverWorkspace = { ...initialWorkspace };
let serverStoreBlocks = [...initialStoreBlocks];

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username") || "rajnish";

        // 1. Try fetching from Supabase if configured
        try {
            const supabase = createClient();
            if (supabase) {
                const { data: wsData, error: wsErr } = await supabase
                    .from("creator_workspaces")
                    .select("*")
                    .eq("username", username)
                    .single();

                const { data: blocksData, error: blkErr } = await supabase
                    .from("store_blocks")
                    .select("*")
                    .order("order_index", { ascending: true });

                if (wsData && !wsErr) {
                    serverWorkspace = wsData;
                }
                if (blocksData && blocksData.length > 0 && !blkErr) {
                    serverStoreBlocks = blocksData;
                }
            }
        } catch (dbErr) {
            console.warn("[Workspace Sync API] Supabase fetch fallback:", dbErr);
        }

        return NextResponse.json({
            success: true,
            workspace: serverWorkspace,
            blocks: serverStoreBlocks,
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { workspaceUpdates, blocks, customTemplate } = body;

        if (workspaceUpdates) {
            serverWorkspace = {
                ...serverWorkspace,
                ...workspaceUpdates,
                theme_config: {
                    ...(serverWorkspace.theme_config || {}),
                    ...(workspaceUpdates.theme_config || {}),
                },
            };
        }

        if (blocks && Array.isArray(blocks)) {
            serverStoreBlocks = blocks;
        }

        // Try syncing to Supabase
        try {
            const supabase = createClient();
            if (supabase) {
                if (workspaceUpdates) {
                    await supabase
                        .from("creator_workspaces")
                        .update(workspaceUpdates)
                        .eq("id", serverWorkspace.id || "ws-rajnish-001");
                }
                if (blocks && blocks.length > 0) {
                    await supabase
                        .from("store_blocks")
                        .upsert(blocks, { onConflict: "id" });
                }
            }
        } catch (dbErr) {
            console.warn("[Workspace Sync API] Supabase write fallback:", dbErr);
        }

        return NextResponse.json({
            success: true,
            workspace: serverWorkspace,
            blocks: serverStoreBlocks,
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
