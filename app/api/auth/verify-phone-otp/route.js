import { NextResponse } from "next/server";
import { verifyPhoneOtpRecord } from "@/lib/auth/db-service";

export async function POST(request) {
    try {
        const body = await request.json();
        const { phone, countryCode = "+91", otp } = body;

        if (!phone || !otp) {
            return NextResponse.json({ error: "Phone number and SMS code are required." }, { status: 400 });
        }

        const cleanOtp = String(otp).trim();
        const result = await verifyPhoneOtpRecord({
            phone,
            country_code: countryCode,
            otp: cleanOtp,
        });

        if (!result.valid) {
            return NextResponse.json({ error: result.error || "Invalid SMS verification code." }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Mobile number verified successfully!",
        });
    } catch (err) {
        console.error("Verify phone OTP error:", err.message);
        return NextResponse.json({ error: "Failed to verify SMS code." }, { status: 500 });
    }
}
