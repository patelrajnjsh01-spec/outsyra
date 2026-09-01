import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL || "Outsyra Security <auth@outsyra.com>";
const resendClient = resendApiKey && !resendApiKey.includes("mock") ? new Resend(resendApiKey) : null;

/**
 * Send 6-digit email OTP verification code
 */
export async function sendEmailOtp({ to, name = "Creator", otp, purpose = "signup" }) {
    const subject =
        purpose === "signup"
            ? "Your Outsyra Verification Code"
            : purpose === "reset_password"
            ? "Reset Your Outsyra Password"
            : "Your Outsyra Login OTP";

    const title =
        purpose === "signup"
            ? "Verify Your Email Address"
            : purpose === "reset_password"
            ? "Password Reset Request"
            : "One-Time Login Passcode";

    const subtitle =
        purpose === "signup"
            ? "Thank you for joining Outsyra. Use the 6-digit code below to verify your creator account:"
            : purpose === "reset_password"
            ? "We received a request to reset your password. Use the code below to proceed:"
            : "Use the 6-digit one-time passcode below to authenticate:";

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090d; color: #f8fafc; margin: 0; padding: 40px 20px; }
          .card { max-width: 520px; margin: 0 auto; background: #0f1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 36px; text-align: center; }
          .logo { font-size: 20px; font-weight: 800; color: #6366f1; letter-spacing: -0.5px; margin-bottom: 24px; }
          h2 { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
          .otp-box { display: inline-block; background: rgba(99, 102, 241, 0.1); border: 2px dashed #6366f1; border-radius: 12px; padding: 16px 32px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ffffff; margin: 12px 0 24px; font-family: monospace; }
          .footer { font-size: 12px; color: #64748b; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
          .warning { font-size: 11px; color: #ef4444; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">⚡ OUTSYRA CREATOR OS</div>
          <h2>${title}</h2>
          <p>Hello ${name},<br>${subtitle}</p>
          <div class="otp-box">${otp}</div>
          <p class="warning">⚠️ This code expires in 10 minutes. Never share this code with anyone.</p>
          <div class="footer">
            If you did not request this verification, you can safely ignore this email.<br>
            © 2026 Outsyra, Inc. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;

    try {
        if (resendClient) {
            await resendClient.emails.send({
                from: resendFrom,
                to,
                subject,
                html,
            });
            return { success: true, channel: "resend" };
        }
        // In preview/local environments without active Resend API key, log delivery with clear OTP output
        if (process.env.NODE_ENV !== "production") {
            console.log(`\n======================================================`);
            console.log(`⚡ [OUTSYRA DEV OTP NOTIFICATION]`);
            console.log(`📧 To: ${to} | Purpose: ${purpose}`);
            console.log(`🔑 Verification Code: >>> ${otp} <<<`);
            console.log(`======================================================\n`);
        }
        return { success: true, channel: "simulated" };
    } catch (err) {
        console.error("Failed to deliver email OTP:", err.message);
        return { success: false, error: err.message };
    }
}

/**
 * Send 6-digit SMS OTP to international phone number
 */
export async function sendPhoneOtp({ phone, countryCode, otp }) {
    const fullNumber = `${countryCode}${phone.replace(/\D/g, "")}`;
    const smsProvider = process.env.SMS_PROVIDER;

    try {
        if (smsProvider === "twilio" && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            // Twilio SMS integration
            const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
            await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    To: fullNumber,
                    From: process.env.TWILIO_PHONE_NUMBER || "+18005550199",
                    Body: `Your Outsyra verification code is: ${otp}. Valid for 10 minutes.`,
                }),
            });
            return { success: true, channel: "twilio" };
        }
        return { success: true, channel: "simulated" };
    } catch (err) {
        console.error("Failed to send phone OTP:", err.message);
        return { success: false, error: err.message };
    }
}
