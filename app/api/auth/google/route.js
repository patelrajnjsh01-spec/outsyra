import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    // Strict validation: Do not fake or bypass if credentials are not configured
    if (!clientId || !clientSecret || clientId.includes("your-google-client-id") || clientSecret.includes("your-google-client-secret")) {
        return NextResponse.redirect(`${appUrl}/auth/callback?error=google_oauth_not_configured`);
    }

    // Generate cryptographic CSRF state token
    const state = crypto.randomBytes(32).toString("hex");

    const scope = encodeURIComponent("openid email profile");
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
        clientId
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${encodeURIComponent(
        state
    )}&access_type=offline&prompt=select_account`;

    const response = NextResponse.redirect(googleAuthUrl);

    // Save state in secure HTTP-only cookie for CSRF verification on callback
    response.cookies.set("oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600, // 10 minutes
        path: "/",
    });

    return response;
}
