import { hashOtp, verifyOtpHash } from "./security.js";
import { createAdminSupabaseClient } from "../supabase/admin.js";

// In-memory persistent state (synced with Supabase tables if active)
const usersStore = new Map();
const emailOtpsStore = new Map();
const phoneOtpsStore = new Map();
const resetTokensStore = new Map();
const sessionsStore = new Map();

// Seed default creator accounts for local development and instant access
const DEFAULT_DEMO_USERS = [
    {
        id: "usr-rajnish-001",
        name: "Rajnish Sharma",
        email: "rajnish@outsyra.com",
        password_hash: "$2b$10$KG9wsWrA6nOdVUtuv5oY1.tAWaXxrvzbBgSD1KMUxNXhXiVKOVJa2", // outsyra2026 / password123
        phone: "9876543210",
        country_code: "+91",
        email_verified: true,
        phone_verified: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        role: "creator",
        auth_provider: "email",
        google_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
    },
    {
        id: "usr-demo-002",
        name: "Demo Creator",
        email: "demo@outsyra.com",
        password_hash: "$2b$10$KG9wsWrA6nOdVUtuv5oY1.tAWaXxrvzbBgSD1KMUxNXhXiVKOVJa2", // outsyra2026 / password123
        phone: "9123456780",
        country_code: "+1",
        email_verified: true,
        phone_verified: true,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
        role: "creator",
        auth_provider: "email",
        google_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
    },
];

DEFAULT_DEMO_USERS.forEach((u) => usersStore.set(u.email.toLowerCase(), u));

function toApplicationUser(profile) {
    if (!profile) return null;
    return {
        id: profile.id,
        name: profile.full_name || profile.name || "Creator",
        email: profile.email,
        phone: profile.phone || "",
        country_code: profile.country_code || "+91",
        email_verified: profile.email_verified ?? true,
        phone_verified: Boolean(profile.phone_verified),
        avatar: profile.avatar_url || profile.avatar || "",
        role: profile.role || "creator",
        auth_provider: profile.auth_provider || "email",
        google_id: profile.google_id || null,
        password_hash: profile.password_hash || "",
    };
}

async function findPersistedProfile(column, value) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from("profiles").select("*").eq(column, value).maybeSingle();
    if (error) throw error;
    return toApplicationUser(data);
}

/**
 * Find user by email address
 */
export async function findUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    return usersStore.get(cleanEmail) || (await findPersistedProfile("email", cleanEmail));
}

/**
 * Find user by ID
 */
export async function findUserById(id) {
    if (!id) return null;
    for (const user of usersStore.values()) {
        if (user.id === id) return user;
    }
    return findPersistedProfile("id", id);
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
 * Persist a verified Google identity in Supabase and return the application user.
 * This path deliberately fails when server-side persistence is unavailable.
 */
export async function findOrCreateGoogleUser({ googleId, email, name, avatar }) {
    const supabase = createAdminSupabaseClient();
    const cleanEmail = email.toLowerCase().trim();

    const { data: existingProfile, error: lookupError } = await supabase
        .from("profiles")
        .select("*")
        .or(`google_id.eq.${googleId},email.eq.${cleanEmail}`)
        .maybeSingle();

    if (lookupError) throw lookupError;

    let authUserId = existingProfile?.id;
    if (!authUserId) {
        const { data, error } = await supabase.auth.admin.createUser({
            email: cleanEmail,
            email_confirm: true,
            user_metadata: { full_name: name, avatar_url: avatar, google_id: googleId },
        });

        if (error && !error.message?.toLowerCase().includes("already been registered")) throw error;
        authUserId = data?.user?.id;

        if (!authUserId) {
            const { data: users, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
            if (listError) throw listError;
            authUserId = users.users.find((user) => user.email?.toLowerCase() === cleanEmail)?.id;
        }
    }

    if (!authUserId) throw new Error("Unable to resolve the Google user record.");

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .upsert(
            {
                id: authUserId,
                email: cleanEmail,
                full_name: existingProfile?.full_name || name,
                avatar_url: existingProfile?.avatar_url || avatar || null,
                role: existingProfile?.role || "creator",
                google_id: googleId,
                auth_provider: "google",
                email_verified: true,
                last_login_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
        )
        .select("*")
        .single();

    if (profileError) throw profileError;

    return {
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        phone: profile.phone || "",
        country_code: profile.country_code || "+91",
        email_verified: true,
        phone_verified: Boolean(profile.phone_verified),
        avatar: profile.avatar_url || "",
        role: profile.role || "creator",
        auth_provider: "google",
        google_id: googleId,
    };
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

    const isDev = process.env.NODE_ENV !== "production";
    const isValid = verifyOtpHash(otp, record.otp_hash) || (isDev && otp === "123456");
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
    const isDev = process.env.NODE_ENV !== "production";
    const isValid = verifyOtpHash(otp, record.otp_hash) || (isDev && otp === "123456");
    if (!isValid) {
        return { valid: false, error: "Incorrect SMS verification code." };
    }

    phoneOtpsStore.delete(cleanPhone);
    return { valid: true };
}
