import { NextResponse } from "next/server";
import { hashPassword, generateSecureOtp, maskEmail, checkRateLimit } from "@/lib/auth/security";
import { createUser, findUserByEmail, storeEmailOtp } from "@/lib/auth/db-service";
import { sendEmailOtp } from "@/lib/auth/notifications";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, countryCode, phone, password, confirmPassword, termsAccepted } = body;

        // 1. Input Validation
        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: "Please enter your full name (minimum 2 characters)." }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
        }

        if (!password || password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Password and Confirm Password do not match." }, { status: 400 });
        }

        if (!termsAccepted) {
            return NextResponse.json({ error: "You must accept the Terms and Privacy Policy to continue." }, { status: 400 });
        }

        // 2. Rate Limiting Check
        const clientIp = request.headers.get("x-forwarded-for") || "local";
        const rateCheck = checkRateLimit(`signup_${clientIp}`, 10, 60000);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: `Too many signup attempts. Please try again in ${rateCheck.retryAfterSec} seconds.` },
                { status: 429 }
            );
        }

        // 3. Duplicate Account Check
        const existing = await findUserByEmail(email);
        if (existing) {
            return NextResponse.json(
                { error: "An account with this email address already exists. Please log in instead." },
                { status: 409 }
            );
        }

        // 4. Secure Password Hashing
        const passwordHash = await hashPassword(password);

        // 5. Create User Record (Email unverified initially)
        const user = await createUser({
            name,
            email,
            password_hash: passwordHash,
            phone: phone || "",
            country_code: countryCode || "+91",
            email_verified: false,
            auth_provider: "email",
        });

        // 6. Generate Cryptographic 6-Digit OTP & Store Hash in DB
        const otp = generateSecureOtp();
        await storeEmailOtp({ email, otp, purpose: "signup" });

        // 7. Dispatch Email OTP Notification
        await sendEmailOtp({
            to: email,
            name,
            otp,
            purpose: "signup",
        });

        // 8. Return Sanitized Response
        return NextResponse.json({
            success: true,
            message: "Account created! A 6-digit verification code has been sent to your email.",
            email: email.toLowerCase().trim(),
            maskedEmail: maskEmail(email),
            userId: user.id,
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        return NextResponse.json({ error: err.message || "An unexpected error occurred during signup." }, { status: 500 });
    }
}
