"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Instagram,
    Mail,
    CreditCard,
    BarChart3,
    Video,
    Clock,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function IntegrationsPage() {
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const integrations = [
        {
            id: "google_analytics",
            name: "Google Analytics 4 (GA4)",
            category: "Analytics (Free)",
            icon: BarChart3,
            status: "Ready / Free",
            isConnected: true,
            description: "Official 100% free Google Analytics tracking for storefront pageviews, visitor conversions, digital product sales, and revenue metrics.",
            envKeys: ["NEXT_PUBLIC_GA_MEASUREMENT_ID"],
            instructions: "Create a free property at analytics.google.com -> Admin -> Data Streams -> Web. Copy your Measurement ID (e.g., G-XXXXXXXXXX) and paste into your .env.local or Vercel environment variables.",
            freeTier: "100% Free Forever",
        },
        {
            id: "google_meet",
            name: "Google Meet Video Calls",
            category: "Video (Free)",
            icon: Video,
            status: "Active / Free",
            isConnected: true,
            description: "Direct instant Google Meet video conference link generation for 1:1 coaching calls, student mentorship, and consulting sessions.",
            envKeys: ["NEXT_PUBLIC_MEET_DEFAULT_LINK"],
            instructions: "Google Meet is 100% free to use. Outsyra generates instant secure Google Meet rooms for all booked sessions or syncs with your Google Calendar.",
            freeTier: "Free for all Google Accounts",
        },
        {
            id: "calendly",
            name: "Calendly Embed & Sync",
            category: "Booking (Free)",
            icon: Clock,
            status: "Ready / Free",
            isConnected: true,
            description: "Embed your free Calendly booking widget directly onto your public link-in-bio store or coaching checkout flow.",
            envKeys: ["NEXT_PUBLIC_CALENDLY_URL"],
            instructions: "Create a free Calendly account at calendly.com. Copy your booking link (e.g., https://calendly.com/yourname/30min) and paste into .env.local or store block settings.",
            freeTier: "Free Tier Available",
        },
        {
            id: "google_calendar",
            name: "Google Calendar API",
            category: "Calendar (Free)",
            icon: Calendar,
            status: "Configured",
            isConnected: true,
            description: "Two-way Google Calendar availability synchronization and automated Google Meet calendar invite creation.",
            envKeys: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REDIRECT_URI"],
            instructions: "Create a free OAuth 2.0 Client ID in Google Cloud Console with Google Calendar API scope enabled.",
            freeTier: "Free Google Cloud Tier",
        },
        {
            id: "stripe",
            name: "Stripe Payments",
            category: "Payments",
            icon: CreditCard,
            status: "Connected (Sandbox)",
            isConnected: true,
            description: "Accept credit cards, Apple Pay, Google Pay with instant customer checkout and automated webhooks.",
            envKeys: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_WEBHOOK_SECRET"],
            instructions: "Create a Stripe account at dashboard.stripe.com, retrieve your Secret Key and Publishable Key, and paste them into your .env.local file.",
            freeTier: "Pay-as-you-go (No monthly fee)",
        },
        {
            id: "resend",
            name: "Resend Email & Newsletter",
            category: "Email",
            icon: Mail,
            status: "Operational",
            isConnected: true,
            description: "Server-side high-deliverability email marketing, broadcast campaigns, and automated purchase receipts.",
            envKeys: ["RESEND_API_KEY", "RESEND_FROM_EMAIL"],
            instructions: "Generate your free API key at resend.com/api-keys (3,000 free emails/month) and verify your sending domain.",
            freeTier: "3,000 Free Emails / mo",
        },
        {
            id: "instagram",
            name: "Meta / Instagram Graph API",
            category: "Automation",
            icon: Instagram,
            status: "Connected (@rajnish_creates)",
            isConnected: true,
            description: "Official webhook triggers for comment keywords and automated direct messages (DMs) to convert followers into buyers.",
            envKeys: ["META_APP_ID", "META_APP_SECRET", "META_WEBHOOK_VERIFY_TOKEN"],
            instructions: "Configure Instagram Graph API permissions in Meta Developers Portal -> App Settings.",
            freeTier: "Free Meta Developer Tier",
        },
        {
            id: "jitsi",
            name: "Jitsi Meet (Backup Video)",
            category: "Video (Free)",
            icon: Video,
            status: "Active (Instant Rooms)",
            isConnected: true,
            description: "Zero-download open-source private encrypted video rooms as a seamless backup video provider.",
            envKeys: ["NEXT_PUBLIC_JITSI_DOMAIN"],
            instructions: "Default set to 'meet.jit.si' or point to your self-hosted Jitsi instance.",
            freeTier: "100% Free & Open Source",
        },
    ];

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Integrations & Free APIs Center"
                subtitle="Manage Google Meet, Google Analytics (GA4), Calendly, Google Calendar, and payment gateways."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">Connected & Free API Services</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            All Google free APIs, Calendly embeds, and fallback engines are activated and ready to use.
                        </p>
                    </div>
                    <Link href="/settings">
                        <Button variant="outline" size="sm" className="text-xs">
                            General Settings
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={item.id}
                                className="glass-card border-zinc-200 dark:border-white/10 p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/30 transition-all shadow-sm"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <Badge variant={item.isConnected ? "success" : "secondary"} className="text-[10px]">
                                                {item.status}
                                            </Badge>
                                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{item.freeTier}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-zinc-900 dark:text-white">{item.name}</h4>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs text-indigo-600 dark:text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/10"
                                        onClick={() => setSelectedIntegration(item)}
                                    >
                                        Configure & Setup Guide
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </main>

            {selectedIntegration && (
                <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-3">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                {selectedIntegration.name}
                            </h3>
                            <Badge variant="success" className="text-xs">{selectedIntegration.freeTier}</Badge>
                        </div>
                        <div className="space-y-4 text-xs">
                            <div>
                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Environment Keys / Config:</span>
                                <div className="mt-1.5 space-y-1">
                                    {selectedIntegration.envKeys.map((k) => (
                                        <div key={k} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 font-mono text-indigo-600 dark:text-indigo-300 text-[11px]">
                                            {k}=...
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-500/20 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">Step-by-Step Setup:</span>
                                {selectedIntegration.instructions}
                            </div>
                        </div>
                        <Button variant="gradient" className="w-full text-xs" onClick={() => setSelectedIntegration(null)}>
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
