export class GoogleAnalyticsProvider {
    measurementId;
    constructor() {
        this.measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
    }

    track(params) {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", params.eventName, {
                user_id: params.distinctId,
                ...params.properties,
            });
        } else {
            console.log(`[Analytics:GA4:Log] Event: ${params.eventName} | User: ${params.distinctId}`, params.properties);
        }
    }
}

export class PostHogProvider {
    apiKey;
    host;
    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
        this.host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    }
    async track(params) {
        if (!this.apiKey || this.apiKey.startsWith("phc_...")) {
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
    gaProvider = new GoogleAnalyticsProvider();

    static getInstance() {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }

    async track(eventName, distinctId, properties = {}) {
        await this.posthogProvider.track({ eventName, distinctId, properties });
        this.gaProvider.track({ eventName, distinctId, properties });
    }
}
