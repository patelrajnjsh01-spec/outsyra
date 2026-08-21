import { NextResponse } from "next/server";
import { StripeProvider } from "@/lib/services/payments";
export async function POST(req) {
    const signature = req.headers.get("stripe-signature") || "";
    const rawBody = await req.text();
    const provider = new StripeProvider();
    const result = await provider.verifyWebhook(rawBody, signature);
    if (!result.isValid) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }
    // Handle successful order fulfillment
    console.log("[Webhook:Stripe] Processed event:", result.event?.type);
    return NextResponse.json({ received: true });
}
