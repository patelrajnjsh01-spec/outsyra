import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";
import { getWorkspaceById, getWorkspace } from "@/lib/supabase/db";

export async function POST(request) {
    try {
        const token = request.cookies.get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
        }

        const payload = await verifySessionToken(token);
        if (!payload || (payload.role !== "superadmin" && payload.role !== "admin")) {
            return NextResponse.json(
                { error: "Forbidden. Superadmin privileges required." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { workspace_id, action } = body;

        const response = NextResponse.json({ success: true });

        if (action === "exit") {
            response.cookies.delete("outsyra_impersonated_ws");
            return response;
        }

        if (!workspace_id) {
            return NextResponse.json({ error: "workspace_id is required" }, { status: 400 });
        }

        const ws = await getWorkspace(workspace_id);

        response.cookies.set("outsyra_impersonated_ws", workspace_id, {
            path: "/",
            httpOnly: false,
            sameSite: "lax",
            maxAge: 86400, // 24 hours
        });

        return NextResponse.json({
            success: true,
            workspace: ws,
            message: `Now inspecting creator workspace: ${ws?.display_name || workspace_id}`,
        });
    } catch (err) {
        console.error("Impersonation error:", err);
        return NextResponse.json({ error: err.message || "Failed to switch workspace." }, { status: 500 });
    }
}
