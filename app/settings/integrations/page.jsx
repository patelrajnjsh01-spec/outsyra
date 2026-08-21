"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Instagram, Mail, CreditCard, BarChart3, Video, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
export default function IntegrationsPage() {
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const integrations = [
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
        },
        {
            id: "razorpay",
            name: "Razorpay Payments",
            category: "Payments",
            icon: CreditCard,
            status: "Standby",
            isConnected: false,
            description: "Global UPI, NetBanking, and Card checkout support for creators targeting international & Indian audiences.",
            envKeys: ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET", "RAZORPAY_WEBHOOK_SECRET"],
            instructions: "Generate API Keys in the Razorpay Dashboard -> Settings -> API Keys.",
        },
        {
            id: "resend",
            name: "Resend Email & Newsletter",
            category: "Email",
            icon: Mail,
            status: "Operational",
            isConnected: true,
            description: "Server-side high-deliverability email marketing and automated customer purchase receipts.",
            envKeys: ["RESEND_API_KEY", "RESEND_FROM_EMAIL"],
            instructions: "Generate your API key at resend.com/api-keys and verify your sending domain.",
        },
        {
            id: "google_calendar",
            name: "Google Calendar & Meet",
            category: "Calendar",
            icon: Calendar,
            status: "Connected",
            isConnected: true,
            description: "Two-way Google Calendar availability synchronization and automated Google Meet link generation.",
            envKeys: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REDIRECT_URI"],
            instructions: "Create an OAuth 2.0 Client ID in Google Cloud Console with Google Calendar API scope enabled.",
        },
        {
            id: "instagram",
            name: "Meta / Instagram Graph API",
            category: "Automation",
            icon: Instagram,
            status: "Connected (@rajnish_creates)",
            isConnected: true,
            description: "Official webhook triggers for comment keywords and automated direct messages (DMs).",
            envKeys: ["META_APP_ID", "META_APP_SECRET", "META_WEBHOOK_VERIFY_TOKEN"],
            instructions: "Configure Instagram Graph API permissions in Meta Developers Portal -> App Settings.",
        },
        {
            id: "posthog",
            name: "PostHog Analytics",
            category: "Analytics",
            icon: BarChart3,
            status: "Active",
            isConnected: true,
            description: "Product event tracking, conversion funnels, and customer retention metrics.",
            envKeys: ["NEXT_PUBLIC_POSTHOG_KEY", "NEXT_PUBLIC_POSTHOG_HOST"],
            instructions: "Obtain your project API key from app.posthog.com/project/settings.",
        },
        {
            id: "jitsi",
            name: "Jitsi Meet Video Calls",
            category: "Video",
            icon: Video,
            status: "Active (Instant Rooms)",
            isConnected: true,
            description: "Zero-download private encrypted video rooms generated automatically for 1:1 coaching calls.",
            envKeys: ["NEXT_PUBLIC_JITSI_DOMAIN"],
            instructions: "Default set to 'meet.jit.si' or point to your self-hosted Jitsi instance.",
        },
    ];
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Integration Setup Center", subtitle: "Manage and configure third-party services, API keys, payment gateways, and webhooks." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-white", children: "External Service Providers" }), _jsx("p", { className: "text-xs text-zinc-400", children: "All providers feature graceful fallback engines when API credentials are pending." })] }), _jsx(Link, { href: "/settings", children: _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "General Settings" }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: integrations.map((item) => {
                            const Icon = item.icon;
                            return (_jsxs(Card, { className: "glass-panel border-white/5 p-6 flex flex-col justify-between space-y-5", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "h-11 w-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400", children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsx(Badge, { variant: item.isConnected ? "success" : "secondary", className: "text-[10px]", children: item.status })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-bold text-white", children: item.name }), _jsx("p", { className: "text-xs text-zinc-400 mt-1 leading-relaxed", children: item.description })] })] }), _jsx("div", { className: "pt-4 border-t border-white/5", children: _jsx(Button, { variant: "outline", size: "sm", className: "w-full text-xs text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/10", onClick: () => setSelectedIntegration(item), children: "Configure & Credentials Guide" }) })] }, item.id));
                        }) })] }), selectedIntegration && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95", children: [_jsx("div", { className: "flex items-center justify-between border-b border-white/5 pb-3", children: _jsxs("h3", { className: "text-lg font-bold text-white", children: [selectedIntegration.name, " Configuration"] }) }), _jsxs("div", { className: "space-y-4 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-zinc-300", children: "Required Environment Variables:" }), _jsx("div", { className: "mt-1.5 space-y-1", children: selectedIntegration.envKeys.map((k) => (_jsxs("div", { className: "p-2 rounded-lg bg-zinc-900 border border-white/5 font-mono text-indigo-300 text-[11px]", children: [k, "=..."] }, k))) })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-zinc-300 leading-relaxed", children: [_jsx("span", { className: "font-bold text-indigo-300 block mb-1", children: "Setup Instructions:" }), selectedIntegration.instructions] })] }), _jsx(Button, { variant: "gradient", className: "w-full text-xs", onClick: () => setSelectedIntegration(null), children: "Done" })] }) }))] }));
}
