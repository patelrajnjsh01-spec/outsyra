import * as jose from "jose";

const JWT_SECRET = process.env.AUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "outsyra-production-secure-auth-secret-key-32chars-min";
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Edge-compatible JWT verifier for Next.js Middleware
 */
export async function verifySessionTokenEdge(token) {
    try {
        if (!token) return null;
        const { payload } = await jose.jwtVerify(token, secretKey);
        return payload;
    } catch {
        return null;
    }
}
