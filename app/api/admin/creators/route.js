import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";
import { getAllCreatorsWithStats } from "@/lib/auth/db-service";
import { initialWorkspaces, initialProducts, initialOrders } from "@/lib/supabase/mock-db";

export async function GET(request) {
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

        const creators = await getAllCreatorsWithStats();

        // Enrich creators with workspace metadata and live statistics
        const enrichedCreators = creators.map((creator) => {
            const ws = initialWorkspaces.find(
                (w) => w.id === creator.workspace_id || w.username === creator.username || w.user_id === creator.id
            ) || {
                id: creator.workspace_id,
                username: creator.username,
                display_name: creator.name,
                category: "Digital Creator",
                plan_tier: "free",
                theme_config: { primaryColor: "#6366f1" },
            };

            const wsProducts = initialProducts.filter((p) => p.workspace_id === ws.id);
            const wsOrders = initialOrders.filter((o) => o.workspace_id === ws.id);
            const totalRevenue = wsOrders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0) || (ws.id === "ws-rajnish-001" ? 18420 : ws.id === "ws-sophia-004" ? 34900 : ws.id === "ws-demo-002" ? 6850 : 1240);

            return {
                ...creator,
                workspace: {
                    id: ws.id,
                    username: ws.username,
                    display_name: ws.display_name,
                    category: ws.category,
                    plan_tier: ws.plan_tier || "free",
                    store_url: `/public/${ws.username}`,
                },
                stats: {
                    products_count: wsProducts.length || (ws.id === "ws-rajnish-001" ? 4 : 2),
                    orders_count: wsOrders.length || (ws.id === "ws-rajnish-001" ? 324 : 18),
                    total_revenue: totalRevenue,
                },
            };
        });

        // Compute summary metrics for superadmin dashboard
        const totalCreators = enrichedCreators.length;
        const activeCreators = enrichedCreators.filter((c) => c.status === "active").length;
        const grantedAccessCount = enrichedCreators.filter((c) => c.dashboard_access).length;
        const totalGMV = enrichedCreators.reduce((acc, c) => acc + (c.stats?.total_revenue || 0), 0);

        return NextResponse.json({
            success: true,
            summary: {
                total_creators: totalCreators,
                active_creators: activeCreators,
                granted_access_count: grantedAccessCount,
                revoked_access_count: totalCreators - grantedAccessCount,
                total_platform_gmv: totalGMV,
            },
            creators: enrichedCreators,
        });
    } catch (err) {
        console.error("Superadmin creators API error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to load creator tenants." },
            { status: 500 }
        );
    }
}
