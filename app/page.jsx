"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Zap,
    Store,
    GraduationCap,
    Calendar,
    Instagram,
    Mail,
    BarChart3,
    Play,
    ChevronDown,
    Globe,
    ShieldCheck,
    Coins,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activeFaq, setActiveFaq] = useState(null);

    const features = [
        {
            icon: Store,
            title: "Link-in-Bio Storefront",
            description: "Sell ebooks, templates, audio files, and Notion presets directly with 1-click checkout.",
            badge: "Replaces Stan & Linktree",
            color: "text-[#00f0ff]",
            border: "hover:border-[#00f0ff]/40",
        },
        {
            icon: GraduationCap,
            title: "Full Course LMS Builder",
            description: "Host multi-module video masterclasses with student progress tracking and quizzes.",
            badge: "Replaces Kajabi",
            color: "text-[#8b5cf6]",
            border: "hover:border-[#8b5cf6]/40",
        },
        {
            icon: Calendar,
            title: "1:1 Coaching & Bookings",
            description: "Paid consultation calendar with instant Google Meet and Jitsi video conference links.",
            badge: "Replaces Calendly",
            color: "text-[#00e676]",
            border: "hover:border-[#00e676]/40",
        },
        {
            icon: Instagram,
            title: "Instagram Comment Auto-DM",
            description: "Turn comments into sales. Automatically send product links when followers comment keywords.",
            badge: "Replaces ManyChat",
            color: "text-[#ec4899]",
            border: "hover:border-[#ec4899]/40",
        },
        {
            icon: Mail,
            title: "Email Newsletters & Broadcasts",
            description: "Capture leads from your bio link and broadcast newsletters with full segmentation.",
            badge: "Replaces ConvertKit",
            color: "text-[#fbbf24]",
            border: "hover:border-[#fbbf24]/40",
        },
        {
            icon: BarChart3,
            title: "Creator Revenue Analytics",
            description: "Track live page views, checkout conversions, top traffic sources, and gross earnings.",
            badge: "Real-Time DB",
            color: "text-[#38bdf8]",
            border: "hover:border-[#38bdf8]/40",
        },
    ];

    const liveWins = [
        { creator: "Alex River", item: "Ebook Masterclass", amount: "+$199.00", time: "Just now", icon: "📘" },
        { creator: "Sophia Chen", item: "1:1 Coaching (60 Min)", amount: "+$250.00", time: "2m ago", icon: "🎥" },
        { creator: "Liam Vance", item: "Notion OS Bundle", amount: "+$79.00", time: "4m ago", icon: "⚡" },
        { creator: "Elena Rostova", item: "Creator Academy", amount: "+$499.00", time: "7m ago", icon: "🎓" },
        { creator: "Marcus Brody", item: "Canva Template Pack", amount: "+$49.00", time: "11m ago", icon: "🎨" },
    ];

    const comparison = [
        { feature: "Link-in-Bio Storefront", outsyra: true, others: "$29/mo (Stan)" },
        { feature: "Course LMS & Student Tracking", outsyra: true, others: "$149/mo (Kajabi)" },
        { feature: "Calendar & 1:1 Coaching Booking", outsyra: true, others: "$16/mo (Calendly)" },
        { feature: "Official Instagram Comment Auto-DM", outsyra: true, others: "$25/mo (ManyChat)" },
        { feature: "Email Newsletters & Broadcasts", outsyra: true, others: "$29/mo (ConvertKit)" },
        { feature: "Creator Community & Channels", outsyra: true, others: "$99/mo (Circle)" },
        { feature: "Total Monthly Cost", outsyra: "$19 - $49/mo", others: "$347+/mo", isTotal: true },
    ];

    const faqs = [
        {
            q: "How does Outsyra replace Stan, Kajabi, and Calendly?",
            a: "Outsyra combines your link-in-bio storefront, digital file delivery, course LMS, calendar scheduling, 1:1 video calls, Instagram auto-DMs, and email newsletters into a single unified database with zero commission fees.",
        },
        {
            q: "Can I connect custom domains and Stripe / Razorpay?",
            a: "Yes! You can connect your custom domain (e.g., yourname.com) and link Stripe or Razorpay to receive 100% of your earnings directly into your bank account.",
        },
        {
            q: "How does the Instagram Auto-DM work?",
            a: "Connect your Instagram professional account in 1 click via Meta OAuth. Set keyword triggers like 'COURSE' or 'EBOOK' to automatically reply to comments and send private DMs with your product checkout link.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#090e15] text-[#f1f5f9] font-sans antialiased selection:bg-[#00f0ff] selection:text-[#090e15]">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
                {/* Background Ambient Neon Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00f0ff]/10 blur-[160px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                    {/* Left Copy */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                            <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse" />
                            Next-Gen Creator Business OS
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
                            Monetize Your Audience <br />
                            <span className="gradient-text">Without The Bloat</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                            The all-in-one platform replacing Stan Store, Kajabi, Calendly, and ManyChat. Sell digital products, host courses, book 1:1 coaching, and automate Instagram DMs in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                            <Link href="/dashboard">
                                <Button variant="gradient" size="lg" className="h-12 px-8 text-xs sm:text-sm font-black uppercase tracking-wider gap-2 shadow-[0_0_20px_rgba(0,180,219,0.4)]">
                                    Launch Creator Studio <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/public/rajnish">
                                <Button variant="outline" size="lg" className="h-12 px-6 text-xs sm:text-sm font-bold gap-2">
                                    <Zap className="h-4 w-4 text-[#00f0ff]" />
                                    Explore Live Demo Store
                                </Button>
                            </Link>
                        </div>

                        {/* Social proof chips */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-[#00e676]" /> 0% Transaction Fees
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-[#00e676]" /> Instant Payouts
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-[#00e676]" /> Setup in 2 Mins
                            </span>
                        </div>
                    </div>

                    {/* Right 3D Animated Creator Mascot & Card Visual */}
                    <div className="lg:col-span-5 flex justify-center relative">
                        <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-2 glass-panel border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.2)] group overflow-hidden">
                            <img
                                src="/assets/creator_mascot.jpg"
                                alt="3D Animated Creator Mascot"
                                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Floating Profit Badge */}
                            <div className="absolute top-4 right-4 p-3 rounded-2xl bg-[#0f1923]/95 border border-[#00e676]/40 shadow-xl backdrop-blur-md animate-float">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Gross Revenue</p>
                                <p className="text-base font-black text-[#00e676]">+$24,850.00</p>
                            </div>
                            {/* Floating Live Orders Badge */}
                            <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-[#0f1923]/95 border border-[#00f0ff]/40 shadow-xl backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#00e676] animate-pulse" />
                                    <p className="text-xs font-bold text-white">Live Checkout Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE SALES TICKER (CLUTCH STYLE) */}
            <section className="border-y border-white/[0.08] bg-[#0f1923]/80 py-4 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="text-xs font-black uppercase tracking-wider text-white">
                            LIVE CREATOR SALES
                        </span>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
                        {liveWins.map((win, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#162331] border border-white/5 shrink-0 text-xs shadow-sm hover:border-[#00f0ff]/40 transition-colors"
                            >
                                <span>{win.icon}</span>
                                <span className="font-bold text-white">{win.creator}</span>
                                <span className="text-slate-400 text-[11px] truncate max-w-[120px]">{win.item}</span>
                                <span className="font-black text-[#00e676]">{win.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 CORE APPS IN 1 PLATFORM */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-3 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Replace Your 5 Fragmented Subscriptions
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                        Everything you need to launch, scale, and automate your online creator business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, idx) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={idx}
                                className={`glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] ${f.border} transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-lg`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`h-11 w-11 rounded-xl bg-[#0f1923] border border-white/10 flex items-center justify-center ${f.color}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <Badge variant="default" className="text-[10px] font-bold uppercase">
                                            {f.badge}
                                        </Badge>
                                    </div>
                                    <h3 className="text-base font-black text-white uppercase tracking-tight">
                                        {f.title}
                                    </h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <Link href="/dashboard" className={`text-xs font-bold ${f.color} flex items-center gap-1 hover:underline`}>
                                        Open Studio <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-16 px-6 max-w-4xl mx-auto">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl">
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                            Outsyra vs Fragmented Tools
                        </h2>
                        <p className="text-xs text-slate-400">Save $3,500+ every year on SaaS subscription overhead.</p>
                    </div>

                    <div className="divide-y divide-white/5 text-xs font-semibold">
                        {comparison.map((c, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between py-3.5 px-3 rounded-xl ${
                                    c.isTotal ? "bg-[#162331] font-black text-sm text-white" : "hover:bg-white/[0.02]"
                                }`}
                            >
                                <span className={c.isTotal ? "text-[#00f0ff] uppercase" : "text-slate-300"}>
                                    {c.feature}
                                </span>
                                <div className="flex items-center gap-8">
                                    <span className="font-bold text-[#00e676]">
                                        {typeof c.outsyra === "boolean" ? "Included ✓" : c.outsyra}
                                    </span>
                                    <span className={c.isTotal ? "text-rose-400" : "text-slate-500 line-through"}>
                                        {c.others}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/dashboard">
                            <Button variant="gradient" className="w-full sm:w-auto h-11 px-8 text-xs uppercase font-black tracking-wider">
                                Switch to Outsyra Today
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 px-6 max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-black text-center uppercase tracking-tight text-white mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                            className="glass-panel p-4 rounded-2xl border border-white/[0.08] cursor-pointer hover:border-[#00f0ff]/30 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs sm:text-sm font-bold text-white">{faq.q}</h4>
                                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${activeFaq === idx ? "rotate-180 text-[#00f0ff]" : ""}`} />
                            </div>
                            {activeFaq === idx && (
                                <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 space-y-2">
                <p className="font-bold text-white uppercase tracking-wider">OUTSYRA CREATOR OS</p>
                <p>© 2026 Outsyra. All rights reserved.</p>
            </footer>
        </div>
    );
}
