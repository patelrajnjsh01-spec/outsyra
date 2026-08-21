export class PostHogProvider {
    apiKey;
    host;
    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
        this.host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    }
    async track(params) {
        if (!this.apiKey || this.apiKey.startsWith("phc_...")) {
            // Local fallback logging
            console.log(`[Analytics:PostHog:Log] Event: ${params.eventName} | User: ${params.distinctId}`, params.properties);
            return;
        }
        try {
            const { PostHog } = await import("posthog-node");
            const client = new PostHog(this.apiKey, { host: this.host });
            client.capture({
                distinctId: params.distinctId,
                event: params.eventName,
                properties: params.properties,
            });
            await client.shutdown();
        }
        catch (err) {
            console.error("[PostHog Error]", err);
        }
    }
    async identify(distinctId, traits) {
        if (!this.apiKey || this.apiKey.startsWith("phc_..."))
            return;
        try {
            const { PostHog } = await import("posthog-node");
            const client = new PostHog(this.apiKey, { host: this.host });
            client.identify({ distinctId, properties: traits });
            await client.shutdown();
        }
        catch (err) {
            console.error("[PostHog Identify Error]", err);
        }
    }
}
export class AnalyticsService {
    static instance;
    posthogProvider = new PostHogProvider();
    static getInstance() {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }
    async track(eventName, distinctId, properties) {
        await this.posthogProvider.track({ eventName, distinctId, properties });
    }
}
