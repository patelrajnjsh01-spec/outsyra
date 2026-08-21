export class InstagramService {
    static instance;
    appId;
    appSecret;
    verifyToken;
    constructor() {
        this.appId = process.env.META_APP_ID || "";
        this.appSecret = process.env.META_APP_SECRET || "";
        this.verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || "outsyra_ig_verify_2026";
    }
    static getInstance() {
        if (!InstagramService.instance) {
            InstagramService.instance = new InstagramService();
        }
        return InstagramService.instance;
    }
    verifyWebhookChallenge(mode, token, challenge) {
        if (mode === "subscribe" && token === this.verifyToken) {
            return challenge;
        }
        return null;
    }
    verifyPayloadSignature(rawPayload, signatureHeader) {
        if (!this.appSecret || !signatureHeader)
            return true; // dev fallback
        try {
            const crypto = require("crypto");
            const expected = "sha256=" + crypto.createHmac("sha256", this.appSecret).update(rawPayload).digest("hex");
            return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
        }
        catch {
            return false;
        }
    }
    async sendDirectMessage(recipientId, text, accessToken) {
        if (!accessToken) {
            return {
                success: false,
                error: "Instagram automation requires Meta permissions & active OAuth access token.",
            };
        }
        try {
            const res = await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${accessToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipient: { id: recipientId },
                    message: { text },
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.error?.message || "Failed to send Instagram DM" };
            }
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
}
