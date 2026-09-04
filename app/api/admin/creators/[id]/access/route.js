import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";
import { setCreatorDashboardAccess, updateCreatorPlan } from "@/lib/auth/db-service";

export async function PATCH(request, context) {
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

        const { params } = context;
        const resolvedParams = await params;
        const creatorId = resolvedParams?.id;

        if (!creatorId) {
            return NextResponse.json({ error: "Creator ID is required." }, { status: 400 });
        }

        const body = await request.json();
        const { dashboard_access, status, plan_tier } = body;

        let updatedUser = null;

        if (dashboard_access !== undefined) {
            updatedUser = await setCreatorDashboardAccess(
                creatorId,
                Boolean(dashboard_access),
                status || (dashboard_access ? "active" : "suspended")
            );
        }

        if (plan_tier) {
            updatedUser = await updateCreatorPlan(creatorId, plan_tier);
        }

        return NextResponse.json({
            success: true,
            message: `Creator dashboard access ${updatedUser?.dashboard_access ? "granted" : "revoked"} successfully.`,
            creator: {
                id: updatedUser?.id,
                email: updatedUser?.email,
                name: updatedUser?.name,
                dashboard_access: updatedUser?.dashboard_access,
                status: updatedUser?.status,
                plan_tier: updatedUser?.plan_tier,
            },
        });
    } catch (err) {
        console.error("Superadmin access toggle error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to update creator access." },
            { status: 500 }
        );
    }
}
