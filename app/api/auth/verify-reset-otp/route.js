import { NextResponse } from "next/server";
import { verifyEmailOtpRecord } from "@/lib/auth/db-service";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, otp } = body;

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and reset code are required." }, { status: 400 });
        }

        const result = await verifyEmailOtpRecord({
            email,
            otp: String(otp).trim(),
            purpose: "reset_password",
        });

        if (!result.valid) {
            return NextResponse.json({ error: result.error || "Invalid or expired reset code." }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Reset code verified! You can now create your new password.",
        });
    } catch (err) {
        console.error("Verify reset OTP error:", err.message);
        return NextResponse.json({ error: "Failed to verify reset code." }, { status: 500 });
    }
}
