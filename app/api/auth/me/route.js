import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/security.js";
import { findUserByEmail, findUserById } from "@/lib/auth/db-service.js";

export async function GET(request) {
    try {
        const token = request.cookies.get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const payload = await verifySessionToken(token);
        if (!payload || !payload.email) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        let user = (await findUserByEmail(payload.email)) || (await findUserById(payload.userId));
        if (!user) {
            // Reconstruct verified user from cryptographic JWT session payload
            user = {
                id: payload.userId || `usr_${Date.now()}`,
                name: payload.name || "Creator",
                email: payload.email,
                phone: payload.phone || "",
                country_code: payload.country_code || "+91",
                email_verified: true,
                phone_verified: true,
                avatar: payload.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(payload.name || "Creator")}`,
                role: payload.role || "creator",
            };
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country_code: user.country_code,
                email_verified: user.email_verified,
                phone_verified: user.phone_verified,
                avatar: user.avatar,
                role: user.role || "creator",
            },
        });
    } catch (err) {
        console.error("Auth me check error:", err.message);
        return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }
}
