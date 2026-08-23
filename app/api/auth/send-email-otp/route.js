import { NextResponse } from "next/server";
import { generateSecureOtp, checkRateLimit, maskEmail } from "@/lib/auth/security";
import { findUserByEmail, storeEmailOtp } from "@/lib/auth/db-service";
import { sendEmailOtp } from "@/lib/auth/notifications";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, purpose = "signup" } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        const cleanEmail = email.toLowerCase().trim();
        const rateKey = `resend_otp_${cleanEmail}_${purpose}`;
        const rateCheck = checkRateLimit(rateKey, 3, 60000); // 3 resend attempts per minute
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: `Please wait ${rateCheck.retryAfterSec} seconds before requesting a new code.` },
                { status: 429 }
            );
        }

        const user = await findUserByEmail(cleanEmail);
        const name = user ? user.name : "Creator";

        const otp = generateSecureOtp();
        await storeEmailOtp({ email: cleanEmail, otp, purpose });

        await sendEmailOtp({
            to: cleanEmail,
            name,
            otp,
            purpose,
        });

        return NextResponse.json({
            success: true,
            message: "A new 6-digit verification code has been sent to your email.",
            maskedEmail: maskEmail(cleanEmail),
        });
    } catch (err) {
        console.error("Send email OTP error:", err.message);
        return NextResponse.json({ error: "Failed to send verification code." }, { status: 500 });
    }
}
