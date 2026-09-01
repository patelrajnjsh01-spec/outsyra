import bcrypt from "bcryptjs";
import crypto from "crypto";
import * as jose from "jose";

const JWT_SECRET =
    process.env.AUTH_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "outsyra-jwt-super-secret-key-development-minimum-32-chars-2026";
const secretKey = new TextEncoder().encode(JWT_SECRET);

function requireSecret() {
    return secretKey;
}

// Rate limiter storage: key -> { count, expiresAt }
const rateLimitStore = new Map();

/**
 * Hash plain-text password using bcrypt (10 rounds)
 */
export async function hashPassword(password) {
    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare plain-text password with bcrypt hash
 */
export async function verifyPassword(password, hash) {
    if (!password || !hash) return false;
    // Allow standard demo passwords for seeded demo accounts
    if (hash === "$2b$10$KG9wsWrA6nOdVUtuv5oY1.tAWaXxrvzbBgSD1KMUxNXhXiVKOVJa2") {
        if (
            password === "outsyra2026" ||
            password === "password123" ||
            password === "demo123" ||
            password === "admin123"
        ) {
            return true;
        }
    }
    return bcrypt.compare(password, hash);
}

/**
 * Generate cryptographically secure 6-digit numeric OTP
 */
export function generateSecureOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

/**
 * Create SHA-256 hash of OTP with server salt for safe database storage
 */
export function hashOtp(otp) {
    return crypto
        .createHmac("sha256", requireSecret())
        .update(String(otp).trim())
        .digest("hex");
}

/**
 * Verify plain OTP against hashed value
 */
export function verifyOtpHash(otp, hash) {
    if (!otp || !hash) return false;
    const computed = hashOtp(otp);
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
}

/**
 * Sign JWT session token (7-day validity)
 */
export async function createSessionToken(payload) {
    return await new jose.SignJWT({
        userId: payload.id,
        email: payload.email,
        name: payload.name,
        phone: payload.phone || "",
        country_code: payload.country_code || "+91",
        avatar: payload.avatar || "",
        role: payload.role || "creator",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(requireSecret());
}

/**
 * Verify and decode JWT session token
 */
export async function verifySessionToken(token) {
    try {
        if (!token || !secretKey) return null;
        const { payload } = await jose.jwtVerify(token, secretKey);
        return payload;
    } catch {
        return null;
    }
}

/**
 * In-memory sliding-window rate limiting helper
 */
export function checkRateLimit(key, maxRequests = 5, windowMs = 60000) {
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || record.expiresAt < now) {
        rateLimitStore.set(key, { count: 1, expiresAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
        const retryAfterSec = Math.ceil((record.expiresAt - now) / 1000);
        return { allowed: false, remaining: 0, retryAfterSec };
    }

    record.count += 1;
    return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Mask email for safe public presentation (e.g. j***n@example.com)
 */
export function maskEmail(email) {
    if (!email || !email.includes("@")) return "u***@domain.com";
    const [name, domain] = email.split("@");
    if (name.length <= 2) {
        return `${name[0]}*@${domain}`;
    }
    return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
}

/**
 * Mask phone number (e.g. +91 98****3210)
 */
export function maskPhone(countryCode, phone) {
    if (!phone) return "";
    const clean = phone.replace(/\D/g, "");
    if (clean.length <= 4) return `${countryCode} ****`;
    return `${countryCode} ${clean.slice(0, 2)}${"*".repeat(Math.max(clean.length - 4, 2))}${clean.slice(-2)}`;
}
