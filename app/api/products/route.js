import { NextResponse } from "next/server";
import { getDbProducts, createDbProduct } from "@/lib/services/products-db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const workspaceId = searchParams.get("workspace_id") || "ws-rajnish-001";
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        let products = await getDbProducts(workspaceId);

        if (category && category !== "all") {
            products = products.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
        }
        if (search) {
            const query = search.toLowerCase();
            products = products.filter(
                (p) =>
                    p.name?.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query) ||
                    p.slug?.toLowerCase().includes(query)
            );
        }

        return NextResponse.json({
            success: true,
            products,
            count: products.length,
        });
    } catch (err) {
        console.error("[Products API] GET Error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to fetch products: " + err.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.name || !body.name.trim()) {
            return NextResponse.json({ success: false, error: "Product name is required" }, { status: 400 });
        }

        const workspaceId = body.workspace_id || "ws-rajnish-001";
        const createdProduct = await createDbProduct(workspaceId, body);

        return NextResponse.json({
            success: true,
            product: createdProduct,
            message: "Product created successfully in PostgreSQL / persistent database",
        }, { status: 201 });
    } catch (err) {
        console.error("[Products API] POST Error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to create product: " + err.message },
            { status: 500 }
        );
    }
}
