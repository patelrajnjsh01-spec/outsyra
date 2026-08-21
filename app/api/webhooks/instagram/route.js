import { NextResponse } from "next/server";
import { InstagramService } from "@/lib/services/instagram";
// GET for Meta Webhook Subscription Verification
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");
    const igService = InstagramService.getInstance();
    const verifiedChallenge = igService.verifyWebhookChallenge(mode, token, challenge);
    if (verifiedChallenge) {
        return new NextResponse(verifiedChallenge, { status: 200 });
    }
    return NextResponse.json({ error: "Verification token mismatch" }, { status: 403 });
}
// POST for Incoming Comments & DMs
export async function POST(req) {
    const signature = req.headers.get("x-hub-signature-256");
    const rawBody = await req.text();
    const igService = InstagramService.getInstance();
    if (!igService.verifyPayloadSignature(rawBody, signature)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    try {
        const payload = JSON.parse(rawBody);
        console.log("[Webhook:Instagram] Received Meta payload event:", payload.object);
        return NextResponse.json({ status: "EVENT_RECEIVED" });
    }
    catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
