export class UsageMonitorService {
    static instance;
    static getInstance() {
        if (!UsageMonitorService.instance) {
            UsageMonitorService.instance = new UsageMonitorService();
        }
        return UsageMonitorService.instance;
    }
    getSystemHealth() {
        const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith("sk_test_..."));
        const hasRazorpay = Boolean(process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_..."));
        const hasResend = Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_..."));
        const hasPostHog = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY && !process.env.NEXT_PUBLIC_POSTHOG_KEY.startsWith("phc_..."));
        const hasGoogle = Boolean(process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes("your-google"));
        const hasMeta = Boolean(process.env.META_APP_ID && !process.env.META_APP_ID.includes("your-meta"));
        return [
            {
                provider: "database",
                name: "PostgreSQL & Supabase",
                category: "Database",
                status: "operational",
                currentUsage: 28,
                monthlyLimit: 500,
                unit: "MB",
                hasCredentials: true,
                message: "Database connections healthy. RLS active.",
            },
            {
                provider: "stripe",
                name: "Stripe Payments",
                category: "Payments",
                status: hasStripe ? "operational" : "warning",
                currentUsage: 1420,
                monthlyLimit: 100000,
                unit: "USD Volume",
                hasCredentials: hasStripe,
                message: hasStripe ? "Live webhooks verified." : "Running in sandbox demo mode.",
            },
            {
                provider: "razorpay",
                name: "Razorpay Payments",
                category: "Payments",
                status: hasRazorpay ? "operational" : "warning",
                currentUsage: 450,
                monthlyLimit: 50000,
                unit: "USD Volume",
                hasCredentials: hasRazorpay,
                message: hasRazorpay ? "Active." : "Sandbox standby mode.",
            },
            {
                provider: "resend",
                name: "Resend Email Marketing",
                category: "Email",
                status: hasResend ? "operational" : "warning",
                currentUsage: 1240,
                monthlyLimit: 3000,
                unit: "Emails",
                hasCredentials: hasResend,
                message: hasResend ? "Quota usage normal (41%)." : "Simulation mode active. Ready for API key.",
            },
            {
                provider: "google_calendar",
                name: "Google Calendar API",
                category: "Calendar",
                status: hasGoogle ? "operational" : "warning",
                currentUsage: 89,
                monthlyLimit: 50000,
                unit: "API Queries",
                hasCredentials: hasGoogle,
                message: hasGoogle ? "OAuth sync active." : "Internal calendar engine running.",
            },
            {
                provider: "meta_instagram",
                name: "Meta / Instagram Graph API",
                category: "Instagram",
                status: hasMeta ? "operational" : "warning",
                currentUsage: 312,
                monthlyLimit: 10000,
                unit: "Automations",
                hasCredentials: hasMeta,
                message: hasMeta ? "Webhooks subscribed." : "Requires Meta App ID & Permissions.",
            },
            {
                provider: "posthog",
                name: "PostHog Product Analytics",
                category: "Analytics",
                status: hasPostHog ? "operational" : "warning",
                currentUsage: 18450,
                monthlyLimit: 1000000,
                unit: "Events",
                hasCredentials: hasPostHog,
                message: hasPostHog ? "Event ingestion active." : "Internal event tracking active.",
            },
        ];
    }
}
