import { NextResponse } from "next/server";
import { generateSecureOtp, checkRateLimit, maskPhone } from "@/lib/auth/security";
import { storePhoneOtp } from "@/lib/auth/db-service";
import { sendPhoneOtp } from "@/lib/auth/notifications";

export async function POST(request) {
    try {
        const body = await request.json();
        const { phone, countryCode = "+91" } = body;

        if (!phone || phone.replace(/\D/g, "").length < 7) {
            return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
        }

        const rateKey = `phone_otp_${countryCode}_${phone.replace(/\D/g, "")}`;
        const rateCheck = checkRateLimit(rateKey, 3, 60000);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: `Please wait ${rateCheck.retryAfterSec} seconds before requesting a new SMS code.` },
                { status: 429 }
            );
        }

        const otp = generateSecureOtp();
        await storePhoneOtp({ phone, country_code: countryCode, otp });

        await sendPhoneOtp({
            phone,
            countryCode,
            otp,
        });

        return NextResponse.json({
            success: true,
            message: "SMS verification code dispatched.",
            maskedPhone: maskPhone(countryCode, phone),
        });
    } catch (err) {
        console.error("Send phone OTP error:", err.message);
        return NextResponse.json({ error: "Failed to send SMS code." }, { status: 500 });
    }
}
