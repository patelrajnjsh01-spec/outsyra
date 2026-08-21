import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
export async function GET(request, { params }) {
    const { id: productId } = await params;
    if (!productId || !/^[a-zA-Z0-9_-]+$/.test(productId)) {
        return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    let supabase;
    try {
        supabase = await createServerSupabaseClient();
    }
    catch {
        return NextResponse.json({ error: "Downloads are not configured" }, { status: 503 });
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const { data: order, error } = await supabase
        .from("orders")
        .select("id")
        .eq("product_id", productId)
        .eq("customer_id", user.id)
        .eq("status", "completed")
        .maybeSingle();
    if (error || !order) {
        return NextResponse.json({ error: "A completed order is required" }, { status: 403 });
    }
    const samplePdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >> endobj
4 0 obj << /Length 55 >> stream
BT /F1 24 Tf 100 700 Td (Outsyra: Creator Monetization Master Ebook) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000214 00000 n
trailer << /Size 5 /Root 1 0 R >>
startxref
320
%%EOF`;
    return new NextResponse(samplePdfContent, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="creator_monetization_playbook_${productId}.pdf"`,
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
    });
}
