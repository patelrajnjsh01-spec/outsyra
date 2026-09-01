import { NextResponse } from "next/server";
import { getDbProductById, updateDbProduct, deleteDbProduct } from "@/lib/services/products-db";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const product = await getDbProductById(id);

        if (!product) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product });
    } catch (err) {
        console.error("[Product ID API] GET Error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product: " + err.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await updateDbProduct(id, body);
        return NextResponse.json({
            success: true,
            product: updated,
            message: "Product updated successfully in PostgreSQL / persistent database",
        });
    } catch (err) {
        console.error("[Product ID API] PUT Error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to update product: " + err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await deleteDbProduct(id);

        return NextResponse.json({
            success: true,
            message: `Product ${id} deleted successfully from PostgreSQL / persistent database`,
        });
    } catch (err) {
        console.error("[Product ID API] DELETE Error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to delete product: " + err.message },
            { status: 500 }
        );
    }
}
