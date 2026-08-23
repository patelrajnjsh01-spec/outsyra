import { NextResponse } from "next/server";
import { generateSecureOtp, checkRateLimit, maskEmail } from "@/lib/auth/security";
import { findUserByEmail, storeEmailOtp } from "@/lib/auth/db-service";
import { sendEmailOtp } from "@/lib/auth/notifications";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
        }

        const cleanEmail = email.toLowerCase().trim();
        const clientIp = request.headers.get("x-forwarded-for") || "local";
        const rateCheck = checkRateLimit(`forgot_pw_${clientIp}`, 5, 60000);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: `Too many requests. Please try again in ${rateCheck.retryAfterSec} seconds.` },
                { status: 429 }
            );
        }

        // Generic response to prevent account enumeration
        const genericMessage = "If an account exists with this email, we have sent password-reset instructions.";

        const user = await findUserByEmail(cleanEmail);
        if (user) {
            const otp = generateSecureOtp();
            await storeEmailOtp({ email: cleanEmail, otp, purpose: "reset_password" });
            await sendEmailOtp({
                to: cleanEmail,
                name: user.name,
                otp,
                purpose: "reset_password",
            });
        }

        return NextResponse.json({
            success: true,
            message: genericMessage,
            maskedEmail: maskEmail(cleanEmail),
        });
    } catch (err) {
        console.error("Forgot password error:", err.message);
        return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
    }
}
