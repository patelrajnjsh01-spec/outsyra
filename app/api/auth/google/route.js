import { NextResponse } from "next/server";

export async function GET(request) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    if (!clientId || clientId.includes("your-google-client-id")) {
        // Graceful redirect with mock OAuth simulation if keys are pending in preview
        const mockRedirect = new URL("/api/auth/google/callback", request.url);
        mockRedirect.searchParams.set("code", "demo_google_auth_code");
        return NextResponse.redirect(mockRedirect);
    }

    const scope = encodeURIComponent("openid email profile");
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(googleAuthUrl);
}
