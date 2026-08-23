import { NextResponse } from "next/server";
import { findUserByEmail, createUser, linkGoogleAccount } from "@/lib/auth/db-service.js";
import { createSessionToken } from "@/lib/auth/security.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    // 1. Handle user cancellation or provider error
    if (error || !code) {
        console.error("Google OAuth callback returned error:", error);
        return NextResponse.redirect(`${appUrl}/auth/callback?error=oauth_cancelled`);
    }

    // 2. CSRF State Verification
    const savedState = request.cookies.get("oauth_state")?.value;
    if (!savedState || savedState !== state) {
        console.error("Google OAuth state mismatch (CSRF protection)");
        return NextResponse.redirect(`${appUrl}/auth/callback?error=state_mismatch`);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    if (!clientId || !clientSecret || clientId.includes("your-google-client-id")) {
        return NextResponse.redirect(`${appUrl}/auth/callback?error=google_oauth_not_configured`);
    }

    try {
        // 3. Exchange Authorization Code for Access & ID Tokens with Google
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok || !tokenData.access_token) {
            console.error("Failed to exchange code with Google:", tokenData);
            return NextResponse.redirect(`${appUrl}/auth/callback?error=token_exchange_failed`);
        }

        // 4. Fetch Verified User Identity from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const googleUser = await userInfoResponse.json();

        if (!userInfoResponse.ok || !googleUser.email || !googleUser.id) {
            console.error("Failed to fetch verified user info from Google:", googleUser);
            return NextResponse.redirect(`${appUrl}/auth/callback?error=userinfo_failed`);
        }

        const verifiedEmail = googleUser.email.toLowerCase().trim();
        const verifiedName = googleUser.name || googleUser.given_name || "Google Creator";
        const verifiedAvatar = googleUser.picture || "";
        const googleId = String(googleUser.id);

        // 5. Database Find or Create User
        let user = await findUserByEmail(verifiedEmail);

        if (user) {
            // Link Google account to existing user
            user = await linkGoogleAccount(verifiedEmail, googleId, verifiedAvatar);
        } else {
            // Create new verified user record
            user = await createUser({
                name: verifiedName,
                email: verifiedEmail,
                password_hash: "", // OAuth accounts do not use passwords
                email_verified: true,
                avatar: verifiedAvatar,
                auth_provider: "google",
                google_id: googleId,
            });
        }

        // 6. Create Secure JWT Session Token
        const sessionToken = await createSessionToken(user);

        // 7. Redirect to Frontend Callback & Set HTTP-Only Session Cookie
        const response = NextResponse.redirect(`${appUrl}/auth/callback`);

        response.cookies.set("auth_token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        // Clear temporary CSRF state cookie
        response.cookies.set("oauth_state", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
            path: "/",
        });

        return response;
    } catch (err) {
        console.error("Google OAuth processing error:", err);
        return NextResponse.redirect(`${appUrl}/auth/callback?error=oauth_processing_failed`);
    }
}
