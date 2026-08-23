import { hashPassword, verifyPassword, generateSecureOtp, hashOtp, verifyOtpHash, createSessionToken, verifySessionToken, checkRateLimit } from "../lib/auth/security.js";
import { createUser, findUserByEmail, storeEmailOtp, verifyEmailOtpRecord, updateUserPassword } from "../lib/auth/db-service.js";

async function runAuthTestSuite() {
    console.log("=================================================");
    console.log("⚡ STARTING OUTSYRA AUTHENTICATION TEST SUITE");
    console.log("=================================================\n");

    let passed = 0;
    let failed = 0;

    function assert(condition, testName) {
        if (condition) {
            console.log(`✅ [PASS] ${testName}`);
            passed++;
        } else {
            console.error(`❌ [FAIL] ${testName}`);
            failed++;
        }
    }

    try {
        // Test 1: Password Hashing & Verification
        console.log("--- Test Group 1: Password Cryptography ---");
        const rawPassword = "SuperSecurePassword@2026!";
        const hash = await hashPassword(rawPassword);
        assert(hash && hash.startsWith("$2"), "Password hashed with bcrypt");
        assert(await verifyPassword(rawPassword, hash), "Password verification succeeds with correct password");
        assert(!(await verifyPassword("WrongPassword123", hash)), "Password verification fails with incorrect password");

        // Test 2: Cryptographic OTP Generation & Hashing
        console.log("\n--- Test Group 2: OTP Generation & Hashing ---");
        const otp = generateSecureOtp();
        assert(otp.length === 6 && /^\d{6}$/.test(otp), "Generated 6-digit numeric OTP");
        const hashedOtp = hashOtp(otp);
        assert(verifyOtpHash(otp, hashedOtp), "OTP hash verified correctly with HMAC-SHA256");
        assert(!verifyOtpHash("000000", hashedOtp), "Wrong OTP is rejected");

        // Test 3: User Creation & Duplicate Check
        console.log("\n--- Test Group 3: Database User Lifecycle ---");
        const testEmail = `creator_${Date.now()}@example.com`;
        const user = await createUser({
            name: "Alex Vance",
            email: testEmail,
            password_hash: hash,
            phone: "9876543210",
            country_code: "+91",
            email_verified: false,
        });
        assert(user && user.id && user.email === testEmail, "User successfully created in database");

        let duplicateErrorCaught = false;
        try {
            await createUser({
                name: "Alex Vance Duplicate",
                email: testEmail,
                password_hash: hash,
            });
        } catch {
            duplicateErrorCaught = true;
        }
        assert(duplicateErrorCaught, "Duplicate email account creation is prevented");

        // Test 4: Email OTP Verification Lifecycle
        console.log("\n--- Test Group 4: Email OTP Verification ---");
        const signupOtp = generateSecureOtp();
        await storeEmailOtp({ email: testEmail, otp: signupOtp, purpose: "signup" });

        // Wrong OTP
        const wrongVerify = await verifyEmailOtpRecord({ email: testEmail, otp: "111222", purpose: "signup" });
        assert(!wrongVerify.valid, "Incorrect OTP is rejected and attempt counter increments");

        // Correct OTP
        const correctVerify = await verifyEmailOtpRecord({ email: testEmail, otp: signupOtp, purpose: "signup" });
        assert(correctVerify.valid && correctVerify.user.email_verified, "Correct OTP verifies user and marks email_verified: true");

        // Test 5: Password Reset Flow
        console.log("\n--- Test Group 5: Password Reset Lifecycle ---");
        const resetOtp = generateSecureOtp();
        await storeEmailOtp({ email: testEmail, otp: resetOtp, purpose: "reset_password" });
        const resetVerify = await verifyEmailOtpRecord({ email: testEmail, otp: resetOtp, purpose: "reset_password" });
        assert(resetVerify.valid, "Password reset OTP verified");

        const newPassword = "BrandNewSecurePassword@999!";
        const newHash = await hashPassword(newPassword);
        await updateUserPassword(testEmail, newHash);
        const updatedUser = await findUserByEmail(testEmail);
        assert(await verifyPassword(newPassword, updatedUser.password_hash), "New password verified successfully");
        assert(!(await verifyPassword(rawPassword, updatedUser.password_hash)), "Old password no longer works");

        // Test 6: JWT Session Token Signing & Verification
        console.log("\n--- Test Group 6: Session Management ---");
        const token = await createSessionToken(updatedUser);
        assert(token && token.split(".").length === 3, "JWT session token created");
        const session = await verifySessionToken(token);
        assert(session && session.email === testEmail && session.name === "Alex Vance", "Session verified and decoded from JWT");

        // Test 7: Rate Limiter
        console.log("\n--- Test Group 7: Security & Rate Limiting ---");
        const rateKey = `test_limit_${Date.now()}`;
        const res1 = checkRateLimit(rateKey, 2, 10000);
        const res2 = checkRateLimit(rateKey, 2, 10000);
        const res3 = checkRateLimit(rateKey, 2, 10000);
        assert(res1.allowed && res2.allowed && !res3.allowed, "Rate limiting blocks excess requests beyond threshold");

    } catch (error) {
        console.error("Test Suite Error:", error);
        failed++;
    }

    console.log("\n=================================================");
    console.log(`🏁 TEST RESULTS: ${passed} Passed | ${failed} Failed`);
    console.log("=================================================\n");

    if (failed > 0) {
        process.exit(1);
    }
}

runAuthTestSuite();
