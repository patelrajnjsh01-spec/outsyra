import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/security";
import { findUserByEmail, updateUserPassword } from "@/lib/auth/db-service";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, confirmPassword } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and new password are required." }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "Unable to reset password for this email." }, { status: 400 });
        }

        const newHash = await hashPassword(password);
        await updateUserPassword(user.email, newHash);

        return NextResponse.json({
            success: true,
            message: "Password has been successfully reset. Please log in with your new password.",
        });
    } catch (err) {
        console.error("Reset password error:", err.message);
        return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
    }
}
