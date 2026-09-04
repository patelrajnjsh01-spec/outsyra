import { NextResponse } from "next/server";
import { verifyEmailOtpRecord } from "@/lib/auth/db-service";
import { createSessionToken } from "@/lib/auth/security";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, otp, purpose = "signup" } = body;

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and verification code are required." }, { status: 400 });
        }

        const cleanOtp = String(otp).trim();
        if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
            return NextResponse.json({ error: "Please enter a valid 6-digit numeric verification code." }, { status: 400 });
        }

        const result = await verifyEmailOtpRecord({
            email,
            otp: cleanOtp,
            purpose,
        });

        if (!result.valid) {
            return NextResponse.json({ error: result.error || "Invalid verification code." }, { status: 400 });
        }

        const user = result.user;
        const response = NextResponse.json({
            success: true,
            message: "Email verified successfully!",
            user: user
                ? {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      email_verified: true,
                      role: user.role || "creator",
                      dashboard_access: user.dashboard_access !== false,
                      workspace_id: user.workspace_id || `ws-${user.email.split("@")[0]}`,
                      status: user.status || "active",
                  }
                : null,
        });

        // Set authenticated session cookie if verifying for signup
        if (user && purpose === "signup") {
            const token = await createSessionToken(user);
            response.cookies.set("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
            });
        }

        return response;
    } catch (err) {
        console.error("Verify email OTP error:", err.message);
        return NextResponse.json({ error: "Failed to verify code." }, { status: 500 });
    }
}
