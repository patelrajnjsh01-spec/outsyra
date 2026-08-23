import * as jose from "jose";

const JWT_SECRET = process.env.AUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
const secretKey = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null;

/**
 * Edge-compatible JWT verifier for Next.js Middleware
 */
export async function verifySessionTokenEdge(token) {
    try {
        if (!token || !secretKey) return null;
        const { payload } = await jose.jwtVerify(token, secretKey);
        return payload;
    } catch {
        return null;
    }
}
