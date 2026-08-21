import { NextResponse } from "next/server";
import { RazorpayProvider } from "@/lib/services/payments";
export async function POST(req) {
    const signature = req.headers.get("x-razorpay-signature") || "";
    const rawBody = await req.text();
    const provider = new RazorpayProvider();
    const result = await provider.verifyWebhook(rawBody, signature);
    if (!result.isValid) {
        return NextResponse.json({ error: "Invalid Razorpay signature" }, { status: 400 });
    }
    return NextResponse.json({ status: "ok" });
}
