import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";
import { findUserByEmail, findUserById } from "@/lib/auth/db-service";

export async function GET(request) {
    try {
        const token = request.cookies.get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
        }

        const payload = await verifySessionToken(token);
        if (!payload || !payload.email) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
        }

        const user = (await findUserByEmail(payload.email)) || (await findUserById(payload.userId));
        if (!user) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
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
        return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }
}
