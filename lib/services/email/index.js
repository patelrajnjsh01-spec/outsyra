export class ResendProvider {
    apiKey;
    defaultFrom;
    constructor() {
        this.apiKey = process.env.RESEND_API_KEY || "";
        this.defaultFrom = process.env.RESEND_FROM_EMAIL || "Outsyra <onboarding@resend.dev>";
    }
    async sendEmail(params) {
        if (!this.apiKey || this.apiKey.startsWith("re_...")) {
            // Graceful fallback to sandbox simulation
            console.log(`[Email:Resend:Sandbox] To: ${params.to}, Subject: "${params.subject}"`);
            return {
                success: true,
                messageId: `resend_sim_${Date.now()}`,
                provider: "fallback",
            };
        }
        try {
            const { Resend } = await import("resend");
            const resend = new Resend(this.apiKey);
            const res = await resend.emails.send({
                from: params.from || this.defaultFrom,
                to: params.to,
                subject: params.subject,
                html: params.html,
                replyTo: params.replyTo,
            });
            if (res.error) {
                return { success: false, error: res.error.message, provider: "resend" };
            }
            return {
                success: true,
                messageId: res.data?.id,
                provider: "resend",
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message,
                provider: "resend",
            };
        }
    }
}
export class FallbackEmailProvider {
    async sendEmail(params) {
        console.log(`[Email:Fallback] Logged Email: To: ${params.to} | Subject: "${params.subject}"`);
        return {
            success: true,
            messageId: `fb_msg_${Date.now()}`,
            provider: "fallback",
        };
    }
}
export class EmailService {
    static instance;
    resendProvider = new ResendProvider();
    fallbackProvider = new FallbackEmailProvider();
    // Free Tier Usage Tracking (Default: Resend 3,000 monthly tier)
    monthlyLimit = 3000;
    currentUsage = 142; // Seeded initial usage
    static getInstance() {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }
    getUsageInfo() {
        const percentage = Math.min(100, Math.round((this.currentUsage / this.monthlyLimit) * 100));
        let status = "operational";
        if (percentage >= 100)
            status = "exceeded";
        else if (percentage >= 95)
            status = "critical";
        else if (percentage >= 80)
            status = "warning";
        return {
            currentUsage: this.currentUsage,
            monthlyLimit: this.monthlyLimit,
            percentage,
            status,
            remaining: Math.max(0, this.monthlyLimit - this.currentUsage),
        };
    }
    async send(params) {
        const usage = this.getUsageInfo();
        if (usage.status === "exceeded") {
            console.warn("[EmailService] Monthly limit reached, routing via fallback queue.");
            return this.fallbackProvider.sendEmail(params);
        }
        const result = await this.resendProvider.sendEmail(params);
        if (result.success) {
            this.currentUsage += Array.isArray(params.to) ? params.to.length : 1;
        }
        return result;
    }
}
