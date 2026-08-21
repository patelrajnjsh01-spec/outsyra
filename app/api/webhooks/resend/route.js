import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const payload = await req.json();
        console.log("[Webhook:Resend] Email event:", payload.type);
        return NextResponse.json({ received: true });
    }
    catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
