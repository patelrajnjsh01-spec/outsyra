export class StripeProvider {
    secretKey;
    constructor() {
        this.secretKey = process.env.STRIPE_SECRET_KEY || "";
    }
    async createPaymentIntent(params) {
        if (!this.secretKey || this.secretKey.startsWith("sk_test_...")) {
            // Return simulated sandbox intent if live credentials not set
            return {
                clientSecret: `mock_pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
                orderId: `ord_${Date.now()}`,
                paymentId: `pi_mock_${Date.now()}`,
                provider: "stripe",
                amount: params.amount,
                currency: params.currency,
                isMock: true,
            };
        }
        const stripe = (await import("stripe")).default;
        const client = new stripe(this.secretKey, { apiVersion: "2025-01-27.acacia" });
        const intent = await client.paymentIntents.create({
            amount: Math.round(params.amount * 100), // in cents
            currency: params.currency.toLowerCase(),
            receipt_email: params.customerEmail,
            metadata: params.metadata,
            automatic_payment_methods: { enabled: true },
        });
        return {
            clientSecret: intent.client_secret || undefined,
            orderId: intent.id,
            paymentId: intent.id,
            provider: "stripe",
            amount: params.amount,
            currency: params.currency,
            isMock: false,
        };
    }
    async verifyWebhook(rawBody, signature) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
        if (!this.secretKey || !webhookSecret) {
            // Mock validation mode
            return {
                isValid: true,
                event: {
                    type: "payment_intent.succeeded",
                    paymentId: "mock_stripe_wh_event",
                    amount: 10,
                    currency: "USD",
                    metadata: {},
                    status: "succeeded",
                },
            };
        }
        try {
            const stripe = (await import("stripe")).default;
            const client = new stripe(this.secretKey, { apiVersion: "2025-01-27.acacia" });
            const event = client.webhooks.constructEvent(rawBody, signature, webhookSecret);
            if (event.type === "payment_intent.succeeded") {
                const pi = event.data.object;
                return {
                    isValid: true,
                    event: {
                        type: event.type,
                        paymentId: pi.id,
                        amount: pi.amount / 100,
                        currency: pi.currency,
                        metadata: pi.metadata || {},
                        status: "succeeded",
                    },
                };
            }
            return { isValid: true };
        }
        catch (err) {
            return { isValid: false, error: err.message };
        }
    }
    async processRefund(paymentId, amount) {
        if (!this.secretKey || this.secretKey.startsWith("sk_test_...")) {
            return { success: true, refundId: `re_mock_${Date.now()}` };
        }
        const stripe = (await import("stripe")).default;
        const client = new stripe(this.secretKey, { apiVersion: "2025-01-27.acacia" });
        const refund = await client.refunds.create({
            payment_intent: paymentId,
            amount: amount ? Math.round(amount * 100) : undefined,
        });
        return { success: true, refundId: refund.id };
    }
}
export class RazorpayProvider {
    keyId;
    keySecret;
    constructor() {
        this.keyId = process.env.RAZORPAY_KEY_ID || "";
        this.keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    }
    async createPaymentIntent(params) {
        return {
            orderId: `order_rzp_${Date.now()}`,
            paymentId: `pay_rzp_${Date.now()}`,
            provider: "razorpay",
            amount: params.amount,
            currency: params.currency,
            isMock: !this.keyId || this.keyId.startsWith("rzp_test_..."),
        };
    }
    async verifyWebhook(rawBody, signature) {
        const crypto = await import("crypto");
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || this.keySecret;
        if (!secret)
            return { isValid: true };
        const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
        const isValid = expectedSignature === signature;
        return { isValid };
    }
    async processRefund(paymentId, amount) {
        return { success: true, refundId: `rfnd_rzp_${Date.now()}` };
    }
}
export class PaymentService {
    static instance;
    stripeProvider = new StripeProvider();
    razorpayProvider = new RazorpayProvider();
    static getInstance() {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }
    getProvider(preferred) {
        if (preferred === "razorpay")
            return this.razorpayProvider;
        return this.stripeProvider;
    }
}
