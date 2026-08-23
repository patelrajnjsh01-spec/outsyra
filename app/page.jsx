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
    Users,
    Palette,
    Layers,
    Clock,
    Lock,
    ExternalLink,
    Check,
    X,
    Video,
    MessageCircle,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";

export default function LandingPage() {
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activeFaq, setActiveFaq] = useState(null);

    const features = [
        {
            icon: Store,
            title: "Link-in-Bio Storefront",
            description: "Sell ebooks, templates, presets, PDFs, and courses directly inside your custom branded bio link with instant 1-click checkout.",
            badge: "Replaces Stan & Linktree",
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        },
        {
            icon: GraduationCap,
            title: "Course LMS Builder",
            description: "Host multi-module video masterclasses with student progress tracking, quizzes, and certificates without needing Kajabi.",
            badge: "Replaces Kajabi & Teachable",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            icon: Calendar,
            title: "1:1 Coaching & Scheduling",
            description: "Paid consultation calendar with instant Google Meet and Jitsi video conference links (with login prejoin bypass).",
            badge: "Replaces Calendly",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            icon: Instagram,
            title: "Instagram Comment Auto-DM",
            description: "Turn comments into revenue. Auto-send digital product links and course invites when followers comment specific keywords.",
            badge: "Replaces ManyChat",
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
        {
            icon: Mail,
            title: "Email Newsletters & Broadcasts",
            description: "Collect high-converting leads, segment subscribers by purchase history, and broadcast beautiful newsletters with Resend API.",
            badge: "Replaces ConvertKit",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            icon: BarChart3,
            title: "Audience & Revenue Analytics",
            description: "Track page views, checkout drop-offs, top traffic sources, and gross earnings with built-in PostgreSQL metrics.",
            badge: "Built-In Database",
            color: "text-sky-500",
            bg: "bg-sky-500/10",
        },
    ];

    const ecosystemNodes = [
        { title: "Storefront", icon: Store, desc: "Custom themes & link-in-bio" },
        { title: "Digital Goods", icon: FileText, desc: "Protected file vault" },
        { title: "Course LMS", icon: GraduationCap, desc: "Video modules & quizzes" },
        { title: "1:1 Bookings", icon: Calendar, desc: "Meet & Jitsi video calls" },
        { title: "Auto-DM", icon: MessageCircle, desc: "Instagram keyword triggers" },
        { title: "Email Studio", icon: Mail, desc: "Audience lead broadcasts" },
        { title: "Analytics", icon: BarChart3, desc: "Real-time revenue metrics" },
        { title: "Community", icon: Users, desc: "Creator discussion channels" },
    ];

    const useCases = [
        {
            role: "Digital Creators & Authors",
            benefit: "Sell Notion templates, ebooks, audio presets, and PDFs with secure signed download links and 0% platform cuts.",
            icon: "📚",
        },
        {
            role: "1:1 Coaches & Mentors",
            benefit: "Charge upfront for 30 or 60-min advisory calls with automated Google Calendar sync and video meeting rooms.",
            icon: "💼",
        },
        {
            role: "Course Educators & Academies",
            benefit: "Deliver structured video masterclasses with student progress completion, downloadable resources, and quizzes.",
            icon: "🎓",
        },
        {
            role: "Social Influencers & Creators",
            benefit: "Convert viral Instagram Reels comments into instant paying customers via automated keyword DM triggers.",
            icon: "🚀",
        },
    ];

    const comparisonRows = [
        { feature: "Link-in-Bio Storefront", outsyra: true, others: "$29/mo (Stan)" },
        { feature: "Course LMS & Student Progress", outsyra: true, others: "$149/mo (Kajabi)" },
        { feature: "1:1 Coaching & Calendar Scheduling", outsyra: true, others: "$16/mo (Calendly)" },
        { feature: "Official Instagram Comment Auto-DM", outsyra: true, others: "$25/mo (ManyChat)" },
        { feature: "Email Newsletters & Broadcasts", outsyra: true, others: "$29/mo (ConvertKit)" },
        { feature: "Creator Community & Channels", outsyra: true, others: "$99/mo (Circle)" },
        { feature: "Protected Asset Storage Vault", outsyra: true, others: "$10/mo (AWS S3/Dropbox)" },
        { feature: "Total Monthly SaaS Overhead", outsyra: "$19 - $49/mo", others: "$357+/mo", isTotal: true },
    ];

    const pricingPlans = [
        {
            name: "Free / Starter",
            price: "$0",
            period: "Forever free",
            desc: "Ideal for aspiring creators launching their first link-in-bio storefront and digital lead magnets.",
            features: [
                "1 Active Link-in-Bio Storefront",
                "Up to 3 Digital Products",
                "1:1 Booking Calendar (Google Meet/Jitsi)",
                "Standard Email Capture (100 Leads)",
                "Outsyra Subdomain (outsyra.com/you)",
                "0% Platform Commission on Stripe",
            ],
            cta: "Start Free",
            href: "/signup",
            highlighted: false,
        },
        {
            name: "Creator Pro",
            price: billingCycle === "monthly" ? "$29" : "$23",
            period: "per month",
            desc: "For full-time creators scaling digital products, video courses, and automated Instagram sales.",
            features: [
                "Unlimited Digital Products & Vaults",
                "Full Course LMS (Unlimited Students)",
                "Instagram Comment Auto-DM (1,000 DMs/mo)",
                "Email Broadcasts (5,000 Subscribers)",
                "Custom Domain Connection (yourname.com)",
                "Dual Video Launcher (Meet & Jitsi Direct)",
                "Full Real-Time Revenue Analytics",
                "0% Platform Commission",
            ],
            cta: "Launch Pro Studio",
            href: "/signup?plan=pro",
            highlighted: true,
        },
        {
            name: "Business Scale",
            price: billingCycle === "monthly" ? "$79" : "$63",
            period: "per month",
            desc: "For media brands, agencies, and high-volume creators managing extensive academies and communities.",
            features: [
                "Everything in Creator Pro",
                "Unlimited Instagram Auto-DMs",
                "Unlimited Email Newsletter Leads",
                "Dedicated Creator Community Channels",
                "Custom Template Studio",
                "Priority 24/7 VIP Concierge Support",
                "Multi-Admin Workspace Access",
            ],
            cta: "Scale With Business",
            href: "/signup?plan=business",
            highlighted: false,
        },
    ];

    const faqs = [
        {
            q: "What exactly is Outsyra?",
            a: "Outsyra is the all-in-one Operating System for creator businesses. It replaces your scattered subscriptions to Linktree, Stan Store, Kajabi, Calendly, ManyChat, and ConvertKit with a single cohesive workspace.",
        },
        {
            q: "Who is Outsyra built for?",
            a: "Outsyra is built for digital product sellers, coaches, educators, content creators, consultants, and newsletter authors who want to monetize their audience without paying $350+/mo across multiple fragmented tools.",
        },
        {
            q: "How does the protected asset file uploader work?",
            a: "When you upload a PDF, ZIP archive, video masterclass, or audio file, Outsyra securely encrypts and stores the file in our Supabase Storage vault. When customers complete checkout, a time-limited signed URL is automatically generated for instant download.",
        },
        {
            q: "How do 1:1 bookings and video calls work?",
            a: "You can set your weekly working hours, buffers, and paid consultation slots. Outsyra generates instant Google Meet links or direct Jitsi Meet links that automatically bypass login and prejoin lobby screens.",
        },
        {
            q: "Can I connect custom domains and Stripe / Razorpay?",
            a: "Yes! You can connect your custom domain (e.g. yourname.com) and link your Stripe or Razorpay accounts. 100% of your earnings go directly into your account with 0% platform transaction fees.",
        },
        {
            q: "How does the Instagram Auto-DM feature work?",
            a: "Connect your Instagram professional account in 1 click via Meta OAuth. Set keyword triggers like 'EBOOK' or 'COURSE' to automatically reply to comments and send private DMs with your product checkout link.",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
            <Navbar />

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="relative pt-12 lg:pt-20 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
                {/* Subtle Radial Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="text-center space-y-6 max-w-3xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        The Creator Business Operating System
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                        Everything You Need to Turn Your Audience <br className="hidden sm:inline" />
                        <span className="gradient-text-primary">Into a Scalable Business</span>
                    </h1>

                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                        Sell digital products, build video courses, book 1:1 coaching, automate Instagram DMs, and broadcast newsletters — all unified in one workspace.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                        <Link href="/signup">
                            <Button variant="gradient" size="lg" className="h-12 px-8 text-sm font-bold gap-2 shadow-lg shadow-indigo-500/20">
                                <span>Start Building Free</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/public/rajnish" target="_blank">
                            <Button variant="outline" size="lg" className="h-12 px-6 text-sm font-bold gap-2">
                                <Zap className="h-4 w-4 text-indigo-500" />
                                <span>Explore Live Store Demo</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 0% Platform Fees
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Direct Payouts
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No Credit Card Required
                        </span>
                    </div>
                </div>

                {/* HERO FLOATING DASHBOARD VISUALIZATION */}
                <div className="mt-14 relative z-10 max-w-5xl mx-auto">
                    <div className="rounded-3xl p-3 sm:p-5 glass-card border border-zinc-200/80 dark:border-white/10 shadow-2xl overflow-hidden group">
                        {/* Top Mockup Browser Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/5 px-2">
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                                outsyra.com/dashboard • Live Studio Workspace
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Live DB Connected
                            </div>
                        </div>

                        {/* Dashboard Overview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1.5">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Gross Revenue</p>
                                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">$24,850.00</p>
                                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +34.2% vs last month
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1.5">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Paid Orders</p>
                                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">412</p>
                                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> 18 new today
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1.5">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Active Students</p>
                                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">1,820</p>
                                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                                    Course LMS Active
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1.5">
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Instagram Auto-DMs</p>
                                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">8,940</p>
                                <p className="text-[11px] font-bold text-pink-600 dark:text-pink-400">
                                    Meta Graph Connected
                                </p>
                            </div>
                        </div>

                        {/* Recent Transactions & Live Modules Bar */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 pt-3.5">
                            <div className="lg:col-span-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-white/5 space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Recent Storefront Purchases</h4>
                                    <Badge variant="success" className="text-[9px]">Live Stream</Badge>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">📘</span>
                                            <div>
                                                <p className="font-bold text-zinc-900 dark:text-white">Creator OS Blueprint (PDF)</p>
                                                <p className="text-[10px] text-zinc-500">Sophia Chen • Just now</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-emerald-600 dark:text-emerald-400">+$39.00</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">🎓</span>
                                            <div>
                                                <p className="font-bold text-zinc-900 dark:text-white">Full-Stack Creator Academy</p>
                                                <p className="text-[10px] text-zinc-500">Liam Vance • 3m ago</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-emerald-600 dark:text-emerald-400">+$199.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-white/5 space-y-2.5">
                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Upcoming 1:1 Consultations</h4>
                                <div className="p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-zinc-900 dark:text-white">Strategy Advisory Call</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">$250.00</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-500">Tomorrow at 3:00 PM EST with Alex River</p>
                                    <div className="flex gap-1.5 pt-1">
                                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">Google Meet</span>
                                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">Jitsi Direct</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE FRAGMENTATION PROBLEM SECTION */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-white/5">
                <div className="text-center space-y-3 mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Your Creator Business Shouldn't Live Across Seven Fragmented Tools
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                        Stop juggling multiple logins, disconnected customer journeys, and $350+/month in software subscriptions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                    {/* Before Outsyra */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-rose-500/15">
                            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                                The Old Fragmented Stack
                            </span>
                            <span className="text-xs font-black text-rose-600 dark:text-rose-400">$350+ / Month</span>
                        </div>
                        <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> Linktree or Stan for basic link-in-bio ($29/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> Kajabi or Teachable for course hosting ($149/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> Calendly for 1:1 client appointments ($16/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> ManyChat for Instagram comment auto-DMs ($25/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> ConvertKit or Mailchimp for newsletters ($29/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> Circle for community discussion channels ($99/mo)
                            </li>
                            <li className="flex items-center gap-2.5">
                                <X className="h-4 w-4 text-rose-500 shrink-0" /> Disconnected customer data & separate checkout flows
                            </li>
                        </ul>
                    </div>

                    {/* With Outsyra */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/30 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                The Outsyra Creator OS
                            </span>
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Starting at $0 - $29/mo</span>
                        </div>
                        <ul className="space-y-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> One unified branded link-in-bio storefront
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Multi-module video course LMS & student tracking
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> 1:1 Coaching calendar with Google Meet & Jitsi rooms
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Automated Instagram comment-to-DM conversions
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Email lead capture, segmentation & newsletter studio
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Unified real-time revenue analytics & single database
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0" /> 0% commission on your Stripe & Razorpay sales
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. PRODUCT ECOSYSTEM SECTION */}
            <section id="ecosystem" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-3 mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        One Unified Platform. Eight Powerful Modules.
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Every tool connects seamlessly to your central PostgreSQL creator workspace.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {ecosystemNodes.map((node, idx) => {
                        const Icon = node.icon;
                        return (
                            <div
                                key={idx}
                                className="glass-card glass-card-hover p-5 rounded-2xl border border-zinc-200 dark:border-white/5 text-center space-y-2.5 shadow-sm"
                            >
                                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{node.title}</h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">{node.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4. INTERACTIVE PRODUCT DEMO SECTION */}
            <section id="demo" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-white/5">
                <div className="text-center space-y-3 mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        Interactive Showcase
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Experience the Creator Business OS in Action
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Click through the modules below to see how Outsyra powers every stage of your business.
                    </p>
                </div>

                <InteractiveDemo />
            </section>

            {/* 5. 6 CORE FEATURES DEEP DIVE */}
            <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-3 mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Engineered for High Conversion & Zero Friction
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Powerful features designed to increase your average order value and save hours of administrative work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, idx) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={idx}
                                className="glass-card glass-card-hover p-6 rounded-3xl border border-zinc-200 dark:border-white/5 flex flex-col justify-between min-h-[240px] shadow-sm"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`h-11 w-11 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <Badge variant="default" className="text-[10px] font-bold">
                                            {f.badge}
                                        </Badge>
                                    </div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                        {f.title}
                                    </h3>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5">
                                    <Link href="/dashboard" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                                        Launch in Studio <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 6. CREATOR USE CASES */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-white/5">
                <div className="text-center space-y-3 mb-14">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Built for Modern Knowledge Creators
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Whether you sell $29 guides or $2,500 coaching packages, Outsyra handles the heavy lifting.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {useCases.map((uc, idx) => (
                        <div
                            key={idx}
                            className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/5 space-y-3 shadow-sm"
                        >
                            <span className="text-3xl">{uc.icon}</span>
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{uc.role}</h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{uc.benefit}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. THREE STEP HOW IT WORKS */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <div className="text-center space-y-3 mb-14">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Launch Your Complete Store in Three Simple Steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 rounded-2xl glass-card border border-zinc-200 dark:border-white/5 space-y-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                            01
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Create Your Storefront</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Pick a high-converting theme, add your digital files, courses, or coaching booking slots.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl glass-card border border-zinc-200 dark:border-white/5 space-y-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                            02
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Connect Your Audience</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Place your link in bio and enable automated Instagram comment triggers to capture leads on autopilot.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl glass-card border border-zinc-200 dark:border-white/5 space-y-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                            03
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Sell, Automate & Scale</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Receive direct payouts with 0% platform cuts, broadcast newsletters, and track real-time analytics.
                        </p>
                    </div>
                </div>
            </section>

            {/* 8. COMPARISON MATRIX */}
            <section className="py-20 px-6 max-w-4xl mx-auto border-t border-zinc-200 dark:border-white/5">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-xl">
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                            Outsyra vs. Multiple Subscriptions
                        </h2>
                        <p className="text-xs text-zinc-500">Save over $3,500 every year in SaaS overhead.</p>
                    </div>

                    <div className="divide-y divide-zinc-200 dark:divide-white/5 text-xs font-semibold">
                        {comparisonRows.map((row, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between py-3 px-3 rounded-xl ${
                                    row.isTotal
                                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-zinc-900 dark:text-white font-black text-sm border border-indigo-500/20"
                                        : "hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                                }`}
                            >
                                <span className={row.isTotal ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-300"}>
                                    {row.feature}
                                </span>
                                <div className="flex items-center gap-8">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                        {typeof row.outsyra === "boolean" ? "Included ✓" : row.outsyra}
                                    </span>
                                    <span className={row.isTotal ? "text-rose-500" : "text-zinc-400 line-through"}>
                                        {row.others}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. TRANSPARENT PRICING SECTION */}
            <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        Simple Pricing
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Transparent Plans for Every Creator Stage
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                        0% platform commission on all plans. Keep 100% of your earnings.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-zinc-200/80 dark:bg-zinc-900 p-1 rounded-full border border-zinc-300 dark:border-white/10 text-xs font-bold">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-1.5 rounded-full transition-all ${
                                billingCycle === "monthly"
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                    : "text-zinc-500"
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                                billingCycle === "annual"
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                    : "text-zinc-500"
                            }`}
                        >
                            Annual <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-lg ${
                                plan.highlighted
                                    ? "glass-card border-2 border-indigo-500 shadow-indigo-500/10 scale-105 z-10"
                                    : "glass-card border border-zinc-200 dark:border-white/10"
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                    Most Popular Choice
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                                    <p className="text-xs text-zinc-500 mt-1 min-h-[32px]">{plan.desc}</p>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">{plan.price}</span>
                                    <span className="text-xs text-zinc-500 font-semibold">{plan.period}</span>
                                </div>

                                <div className="pt-4 border-t border-zinc-200 dark:border-white/5 space-y-2.5">
                                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">What's included:</p>
                                    <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                                        {plan.features.map((feat, fidx) => (
                                            <li key={fidx} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link href={plan.href}>
                                    <Button
                                        variant={plan.highlighted ? "gradient" : "outline"}
                                        className="w-full h-11 text-xs font-bold shadow-md"
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 10. COMPREHENSIVE FAQ SECTION */}
            <section id="faq" className="py-20 px-6 max-w-3xl mx-auto border-t border-zinc-200 dark:border-white/5">
                <div className="text-center space-y-3 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500">Everything you need to know about getting started.</p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                            className="glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/10 cursor-pointer hover:border-indigo-500/40 transition-all shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">{faq.q}</h4>
                                <ChevronDown
                                    className={`h-4 w-4 text-zinc-400 transition-transform ${
                                        activeFaq === idx ? "rotate-180 text-indigo-500" : ""
                                    }`}
                                />
                            </div>
                            {activeFaq === idx && (
                                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-3 pt-3 border-t border-zinc-200 dark:border-white/5 leading-relaxed">
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 11. FINAL HIGH-IMPACT CTA BANNER */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-zinc-900 border border-indigo-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
                    <div className="space-y-3 relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                            Your Audience is Already Here. <br />
                            <span className="gradient-text-primary">Build The Business Around It.</span>
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
                            Join thousands of creators earning predictable income from digital products, courses, and 1:1 coaching.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
                        <Link href="/signup">
                            <Button variant="gradient" size="lg" className="h-12 px-8 text-xs sm:text-sm font-bold gap-2">
                                Start Building Free <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/public/rajnish" target="_blank">
                            <Button variant="outline" size="lg" className="h-12 px-6 text-xs sm:text-sm font-bold bg-white/10 text-white border-white/20 hover:bg-white/20">
                                Explore Store Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 12. 5-COLUMN ENTERPRISE FOOTER */}
            <footer className="border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#08090d] py-14 px-6 text-xs text-zinc-500">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                                <Sparkles className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-base font-bold text-zinc-900 dark:text-white">Outsyra</span>
                        </div>
                        <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                            The Operating System for Creator Businesses. Unified link-in-bio storefronts, digital products, course LMS, calendar scheduling, and Instagram comment automation.
                        </p>
                        <p className="text-[11px] text-zinc-400">© 2026 Outsyra, Inc. All rights reserved.</p>
                    </div>

                    <div className="space-y-2.5">
                        <p className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">Product</p>
                        <ul className="space-y-1.5">
                            <li><Link href="/store" className="hover:text-indigo-500">Link-in-Bio Store</Link></li>
                            <li><Link href="/products" className="hover:text-indigo-500">Digital Products</Link></li>
                            <li><Link href="/courses" className="hover:text-indigo-500">Course LMS</Link></li>
                            <li><Link href="/coaching" className="hover:text-indigo-500">1:1 Coaching</Link></li>
                            <li><Link href="/instagram" className="hover:text-indigo-500">Instagram Auto-DM</Link></li>
                            <li><Link href="/email" className="hover:text-indigo-500">Email Newsletters</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-2.5">
                        <p className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">Solutions</p>
                        <ul className="space-y-1.5">
                            <li><Link href="/#features" className="hover:text-indigo-500">Digital Sellers</Link></li>
                            <li><Link href="/#features" className="hover:text-indigo-500">Coaches & Mentors</Link></li>
                            <li><Link href="/#features" className="hover:text-indigo-500">Course Educators</Link></li>
                            <li><Link href="/templates" className="hover:text-indigo-500">Template Studio</Link></li>
                            <li><Link href="/community" className="hover:text-indigo-500">Community Channels</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-2.5">
                        <p className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">Company & Legal</p>
                        <ul className="space-y-1.5">
                            <li><Link href="/pricing" className="hover:text-indigo-500">Pricing Plans</Link></li>
                            <li><Link href="/dashboard" className="hover:text-indigo-500">Creator Dashboard</Link></li>
                            <li><Link href="/settings" className="hover:text-indigo-500">Integrations</Link></li>
                            <li><a href="#" className="hover:text-indigo-500">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-500">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
