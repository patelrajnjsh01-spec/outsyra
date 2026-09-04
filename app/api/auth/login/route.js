import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken, checkRateLimit } from "@/lib/auth/security";
import { findUserByEmail, updateLastLogin } from "@/lib/auth/db-service";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Please enter both email and password." }, { status: 400 });
        }

        const clientIp = request.headers.get("x-forwarded-for") || "local";
        const rateKey = `login_${clientIp}_${email.toLowerCase().trim()}`;
        const rateCheck = checkRateLimit(rateKey, 5, 900000); // 5 attempts per 15 minutes
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: `Too many failed attempts. Please try again in ${Math.ceil(rateCheck.retryAfterSec / 60)} minutes.` },
                { status: 429 }
            );
        }

        // Generic error message to prevent account enumeration
        const genericError = "Invalid email or password.";

        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: genericError }, { status: 401 });
        }

        const isPasswordValid = await verifyPassword(password, user.password_hash);
        if (!isPasswordValid) {
            return NextResponse.json({ error: genericError }, { status: 401 });
        }

        // Update login timestamp
        await updateLastLogin(user.email);

        // Generate JWT session token
        const token = await createSessionToken(user);

        // Build Response and set HTTP-only cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country_code: user.country_code,
                email_verified: user.email_verified,
                avatar: user.avatar,
                role: user.role || "creator",
                dashboard_access: user.dashboard_access !== false,
                workspace_id: user.workspace_id || `ws-${user.email.split("@")[0]}`,
                status: user.status || "active",
            },
        });

        const isProduction = process.env.NODE_ENV === "production";
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return response;
    } catch (err) {
        console.error("Login error:", err.message);
        return NextResponse.json({ error: "An unexpected error occurred during login." }, { status: 500 });
    }
}
