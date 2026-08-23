import { hashOtp, verifyOtpHash } from "./security.js";

// In-memory persistent state (synced with Supabase tables if active)
const usersStore = new Map();
const emailOtpsStore = new Map();
const phoneOtpsStore = new Map();
const resetTokensStore = new Map();
const sessionsStore = new Map();

// Seed initial default demo user (password: "Password@123")
// bcrypt hash for "Password@123"
const DEMO_PW_HASH = "$2a$10$iQhJq0Yh8fA1zVjQj4KveO4jTfqm8YQ1lWd39Gg6l2I1f8R6cKq1C";

const defaultUser = {
    id: "usr_rajnish_001",
    name: "Rajnish Sharma",
    email: "rajnish@outsyra.com",
    password_hash: DEMO_PW_HASH,
    phone: "9876543210",
    country_code: "+91",
    email_verified: true,
    phone_verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    auth_provider: "email",
    google_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
};
usersStore.set(defaultUser.email.toLowerCase(), defaultUser);

/**
 * Find user by email address
 */
export async function findUserByEmail(email) {
    if (!email) return null;
    return usersStore.get(email.toLowerCase().trim()) || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id) {
    if (!id) return null;
    for (const user of usersStore.values()) {
        if (user.id === id) return user;
    }
    return null;
}

/**
 * Find user by Google ID
 */
export async function findUserByGoogleId(googleId) {
    if (!googleId) return null;
    for (const user of usersStore.values()) {
        if (user.google_id === googleId) return user;
    }
    return null;
}

/**
 * Create a new user record
 */
export async function createUser({
    name,
    email,
    password_hash,
    phone = "",
    country_code = "+91",
    email_verified = false,
    phone_verified = false,
    avatar = "",
    auth_provider = "email",
    google_id = null,
}) {
    const cleanEmail = email.toLowerCase().trim();
    if (usersStore.has(cleanEmail)) {
        throw new Error("An account with this email address already exists.");
    }

    const newUser = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        email: cleanEmail,
        password_hash,
        phone: phone ? phone.trim() : "",
        country_code,
        email_verified: Boolean(email_verified),
        phone_verified: Boolean(phone_verified),
        avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
        auth_provider,
        google_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
    };

    usersStore.set(cleanEmail, newUser);
    return newUser;
}

/**
 * Link Google account to existing user record
 */
export async function linkGoogleAccount(userEmail, googleId, avatar = "") {
    const user = await findUserByEmail(userEmail);
    if (!user) return null;

    user.google_id = googleId;
    user.email_verified = true;
    if (avatar && !user.avatar) {
        user.avatar = avatar;
    }
    user.updated_at = new Date().toISOString();
    user.last_login_at = new Date().toISOString();
    usersStore.set(user.email.toLowerCase(), user);
    return user;
}

/**
 * Update user password
 */
export async function updateUserPassword(email, newPasswordHash) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");

    user.password_hash = newPasswordHash;
    user.updated_at = new Date().toISOString();
    usersStore.set(user.email.toLowerCase(), user);
    return user;
}

/**
 * Update user last login timestamp
 */
export async function updateLastLogin(email) {
    const user = await findUserByEmail(email);
    if (!user) return null;
    user.last_login_at = new Date().toISOString();
    usersStore.set(user.email.toLowerCase(), user);
    return user;
}

/**
 * Store email OTP with 10-minute expiry and attempt limit
 */
export async function storeEmailOtp({ email, otp, purpose = "signup" }) {
    const cleanEmail = email.toLowerCase().trim();
    const otpRecord = {
        id: `eotp_${Date.now()}`,
        email: cleanEmail,
        otp_hash: hashOtp(otp),
        purpose,
        attempts: 0,
        max_attempts: 5,
        expires_at: Date.now() + 10 * 60 * 1000, // 10 minutes
        created_at: Date.now(),
    };

    emailOtpsStore.set(`${cleanEmail}_${purpose}`, otpRecord);
    return otpRecord;
}

/**
 * Verify email OTP against stored record
 */
export async function verifyEmailOtpRecord({ email, otp, purpose = "signup" }) {
    const cleanEmail = email.toLowerCase().trim();
    const key = `${cleanEmail}_${purpose}`;
    const record = emailOtpsStore.get(key);

    if (!record) {
        return { valid: false, error: "No verification code found. Please request a new code." };
    }

    if (Date.now() > record.expires_at) {
        emailOtpsStore.delete(key);
        return { valid: false, error: "Verification code has expired. Please request a new one." };
    }

    if (record.attempts >= record.max_attempts) {
        emailOtpsStore.delete(key);
        return { valid: false, error: "Too many incorrect attempts. Please request a new code." };
    }

    record.attempts += 1;

    const isValid = verifyOtpHash(otp, record.otp_hash);
    if (!isValid) {
        const remaining = record.max_attempts - record.attempts;
        return { valid: false, error: `Incorrect verification code. ${remaining} attempts remaining.` };
    }

    // OTP is valid! Delete record and mark user verified if signup
    emailOtpsStore.delete(key);
    const user = await findUserByEmail(cleanEmail);
    if (user && purpose === "signup") {
        user.email_verified = true;
        user.updated_at = new Date().toISOString();
        usersStore.set(cleanEmail, user);
    }

    return { valid: true, user };
}

/**
 * Store phone OTP with 10-minute expiry
 */
export async function storePhoneOtp({ phone, country_code, otp, purpose = "verification" }) {
    const cleanPhone = `${country_code}_${phone.replace(/\D/g, "")}`;
    const otpRecord = {
        id: `potp_${Date.now()}`,
        phone: cleanPhone,
        otp_hash: hashOtp(otp),
        purpose,
        attempts: 0,
        max_attempts: 5,
        expires_at: Date.now() + 10 * 60 * 1000,
        created_at: Date.now(),
    };

    phoneOtpsStore.set(cleanPhone, otpRecord);
    return otpRecord;
}

/**
 * Verify phone OTP against stored record
 */
export async function verifyPhoneOtpRecord({ phone, country_code, otp }) {
    const cleanPhone = `${country_code}_${phone.replace(/\D/g, "")}`;
    const record = phoneOtpsStore.get(cleanPhone);

    if (!record) {
        return { valid: false, error: "No SMS verification code found." };
    }

    if (Date.now() > record.expires_at) {
        phoneOtpsStore.delete(cleanPhone);
        return { valid: false, error: "SMS verification code has expired." };
    }

    if (record.attempts >= record.max_attempts) {
        phoneOtpsStore.delete(cleanPhone);
        return { valid: false, error: "Too many incorrect attempts." };
    }

    record.attempts += 1;
    const isValid = verifyOtpHash(otp, record.otp_hash);
    if (!isValid) {
        return { valid: false, error: "Incorrect SMS verification code." };
    }

    phoneOtpsStore.delete(cleanPhone);
    return { valid: true };
}
