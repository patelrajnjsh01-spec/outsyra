"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    Smartphone,
    Music,
    Coffee,
    MousePointerClick,
    Share2,
    QrCode,
    Flame,
    Star,
    Award,
    Heart,
    Youtube,
    Twitter,
    Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import HomeServiceCard from "./HomeServiceCard";
import TemplateShowcase from "./TemplateShowcase";

export default function LandingPage() {
    const router = useRouter();
    const [claimHandle, setClaimHandle] = useState("");
    const [activePersonaTab, setActivePersonaTab] = useState("creator");
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activeFaq, setActiveFaq] = useState(null);

    const handleClaimSubmit = (e) => {
        e.preventDefault();
        const clean = claimHandle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
        if (clean) {
            router.push(`/onboarding?username=${encodeURIComponent(clean)}`);
        } else {
            router.push("/onboarding");
        }
    };

    // Personas for the interactive live phone demo
    const personas = {
        creator: {
            name: "Alex Rivera",
            handle: "@alexrivera",
            tagline: "AI Architect & Digital Product Creator ⚡️",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
            bg: "from-cyan-950 via-black to-indigo-950",
            accent: "#00f0ff",
            badge: "TECH & AI",
            followers: "140K Followers",
            links: [
                { title: "AI Prompt Mastery & Agent Vault", subtitle: "500+ Tested prompts for Cursor", badge: "🔥 BESTSELLER", price: "$39" },
                { title: "Watch: How I Automated My SaaS", subtitle: "YouTube breakdown (350k views)", badge: "VIDEO", price: "" },
                { title: "Book 1:1 30-Min Strategy Call", subtitle: "Architecture audit & roadmap", badge: "CALENDAR", price: "$149" },
            ],
        },
        fashion: {
            name: "Elena Rostova",
            handle: "@elenastyle",
            tagline: "Fashion Stylist & Capsule Wardrobe Designer ✨",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
            bg: "from-rose-950 via-zinc-950 to-amber-950",
            accent: "#f43f5e",
            badge: "FASHION & BEAUTY",
            followers: "210K Followers",
            links: [
                { title: "Capsule Wardrobe Master Guide (PDF)", subtitle: "50+ interchangeable outfits", badge: "NEW DROP", price: "$29" },
                { title: "Shop My Daily Jewelry & Essentials", subtitle: "Exclusive 20% discount code", badge: "SHOP", price: "" },
                { title: "Join The Style VIP Club", subtitle: "Weekly moodboards & early drops", badge: "NEWSLETTER", price: "" },
            ],
        },
        music: {
            name: "Kaelen Sound",
            handle: "@kaelenbeats",
            tagline: "Electronic Producer & Audio Sound Designer 🎧",
            avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80",
            bg: "from-purple-950 via-black to-blue-950",
            accent: "#a855f7",
            badge: "MUSIC & BEATS",
            followers: "85K Followers",
            links: [
                { title: "Stream New Single: 'Neon Horizon'", subtitle: "Available on Spotify & Apple Music", badge: "SPOTIFY", price: "" },
                { title: "Analog Synth Sample Pack Vol. 3", subtitle: "250+ Royalty-free WAV loops", badge: "HOT DROP", price: "$39" },
                { title: "Custom Mix & Master Feedback Call", subtitle: "30-min live track critique", badge: "BOOKING", price: "$85" },
            ],
        },
        fitness: {
            name: "Marcus Vance",
            handle: "@marcusvance",
            tagline: "Hybrid Athlete & Strength Performance Coach 🏆",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
            bg: "from-emerald-950 via-zinc-950 to-teal-950",
            accent: "#10b981",
            badge: "FITNESS & ATHLETE",
            followers: "165K Followers",
            links: [
                { title: "12-Week Hybrid Shred Blueprint (PDF)", subtitle: "Hypertrophy split + nutrition guide", badge: "TOP RATED", price: "$49" },
                { title: "Apply for 1:1 VIP Online Coaching", subtitle: "Custom workouts & weekly check-ins", badge: "3 SPOTS", price: "$299" },
                { title: "Free 7-Day High Protein Meal Plan", subtitle: "Instant PDF delivery to your inbox", badge: "FREE", price: "" },
            ],
        },
    };

    const currentPersona = personas[activePersonaTab] || personas.creator;

    const templatesShowcase = [
        { name: "Tokyo Cyberpunk Night", cat: "Creator & AI", gradient: "from-cyan-500 via-indigo-600 to-fuchsia-600", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80" },
        { name: "Malibu Golden Coast", cat: "Travel & Lifestyle", gradient: "from-amber-500 via-rose-500 to-purple-600", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" },
        { name: "Emerald Botanical Luxe", cat: "Wellness & Nature", gradient: "from-emerald-600 via-teal-700 to-cyan-900", img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80" },
        { name: "Minimalist Obsidian Noir", cat: "Personal Brand", gradient: "from-zinc-900 via-black to-amber-950/40", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80" },
        { name: "Bento Grid Modern", cat: "Solopreneur", gradient: "from-indigo-600 via-purple-600 to-pink-500", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
        { name: "Gen-Z Acid Pop", cat: "Gaming & Streaming", gradient: "from-lime-400 via-emerald-500 to-fuchsia-500", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80" },
    ];

    const pricingPlans = [
        {
            name: "Free / Starter",
            price: "$0",
            period: "Forever free",
            desc: "Ideal for creators launching their first link-in-bio page and collecting audience leads.",
            features: [
                "1 Active Link-in-Bio Page",
                "Unlimited Links & Socials",
                "Standard Templates & Themes",
                "Tip Jar & Donation Widget",
                "Outsyra Handle (outsyra.com/you)",
                "0% Platform Commission",
            ],
            cta: "Start Free",
            href: "/onboarding",
            highlighted: false,
        },
        {
            name: "Creator Pro",
            price: billingCycle === "monthly" ? "$19" : "$15",
            period: "per month",
            desc: "For serious creators selling digital products, video courses, and monetizing audience traffic.",
            features: [
                "Everything in Starter",
                "20+ Premium & Photographic Templates",
                "Custom Template Designer Studio",
                "Sell Unlimited Digital Products & PDFs",
                "1:1 Paid Consultation Bookings",
                "Real-Time CTR & Audience Analytics",
                "Custom Domain Connection (yourname.com)",
                "0% Platform Commission",
            ],
            cta: "Launch Creator Pro",
            href: "/onboarding?plan=pro",
            highlighted: true,
        },
        {
            name: "Business Scale",
            price: billingCycle === "monthly" ? "$49" : "$39",
            period: "per month",
            desc: "For media brands, agencies, and high-volume creator businesses.",
            features: [
                "Everything in Creator Pro",
                "Instagram Comment Auto-DM Integration",
                "Unlimited Email Newsletter Broadcasts",
                "Dedicated Creator Community Channels",
                "Multi-Admin Workspace Access",
                "Priority 24/7 VIP Concierge Support",
            ],
            cta: "Scale With Business",
            href: "/onboarding?plan=business",
            highlighted: false,
        },
    ];

    const faqs = [
        {
            q: "What is Outsyra?",
            a: "Outsyra is a modern 2026 Link-in-Bio and Creator Storefront platform. It gives you a single beautiful, shareable link to connect all your content, social profiles, digital products, courses, calendar bookings, and newsletter subscriptions.",
        },
        {
            q: "Can I use custom background images and templates?",
            a: "Yes! You can choose from 20+ curated design archetypes, select from our free 4K trendy image gallery, or design your own custom template in the Template Studio with custom colors, typography, and card styles.",
        },
        {
            q: "Are my changes saved permanently in Supabase?",
            a: "Yes! All your profile customizations, background photos, block orders, links, and themes are permanently persisted to Supabase PostgreSQL and synchronized in real time.",
        },
        {
            q: "Does Outsyra take a commission on my sales?",
            a: "No! Outsyra charges 0% platform transaction fees. When customers purchase your ebooks, presets, or booking slots, 100% of your earnings go straight to your connected Stripe or Razorpay account.",
        },
        {
            q: "Can I connect my own custom domain?",
            a: "Yes! On the Creator Pro and Business plans, you can link your own custom domain (e.g. yourname.com or links.yourbrand.com) with free automatic SSL certification.",
        },
    ];

    return (
        <div className="min-h-screen bg-background pt-[4.5rem] text-foreground font-sans antialiased selection:bg-indigo-500 selection:text-white">
            <Navbar />

            {/* 1. HERO SECTION */}
            
            <section className="min-h-[100svh] bg-[#673de6]">
                <div className="relative flex min-h-[100svh] items-center pt-12 lg:pt-20 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">

                
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-indigo-500/15 dark:bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    {/* Left Column: Headline, Subheadline & Claim Bar */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Next-Gen Link-in-Bio Platform
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-white dark:text-white">
                            Everything you are. <br />
      <span className="">
  In one simple link.
</span>
                        </h1>

                        <p className="text-base sm:text-xl text-white dark:text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Join 50,000+ creators using Outsyra for their link in bio. One link to help you share everything you create, curate, and sell across social channels.
                        </p>

                        {/* Claim Handle Input Form */}
                        <form
                            onSubmit={handleClaimSubmit}
                            className="p-2 rounded-lg  bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/15 shadow-xl flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto lg:mx-0 focus-within:ring-2 focus-within:ring-indigo-500 transition-all"
                        >
                            <div className="flex items-center px-4 w-full sm:w-auto flex-1">
                                <span className="text-xs sm:text-sm font-mono text-zinc-500 font-bold">
                                    outsyra.com/
                                </span>
                                <input
                                    type="text"
                                    placeholder="yourname"
                                    value={claimHandle}
                                    onChange={(e) => setClaimHandle(e.target.value)}
                                    className="bg-transparent text-sm sm:text-base font-bold text-zinc-900 dark:text-white outline-none pl-1 w-full"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="gradient"
                                className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold rounded-xl sm:rounded-full shadow-md gap-1.5 shrink-0"
                            >
                                <span>Claim your Link</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>

                        <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-semibold text-white dark:text-zinc-400">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free Forever
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 0% Platform Fees
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant Setup
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Interactive Animated Phone Mockup */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                        {/* Persona Selector Tabs */}
                        <div className="mb-4 flex items-center bg-zinc-200/80 dark:bg-zinc-900/90 p-1 rounded-2xl border border-zinc-300/80 dark:border-white/10 shadow-inner overflow-x-auto max-w-full scrollbar-none gap-1">
                            {[
                                { id: "creator", label: "Tech Creator" },
                                { id: "fashion", label: "Fashion" },
                                { id: "music", label: "Musician" },
                                { id: "fitness", label: "Fitness" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActivePersonaTab(tab.id)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                                        activePersonaTab === tab.id
                                            ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-white shadow-sm"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Interactive Phone Frame */}
                        <div
                            className={`w-[320px] sm:w-[350px] h-[640px] rounded-[48px] border-[10px] border-zinc-900 shadow-2xl p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b ${currentPersona.bg} transition-all duration-500`}
                        >
                            {/* Dynamic Island */}
                            <div className="pt-1 pb-2 flex justify-center items-center relative z-20">
                                <div className="h-3.5 w-24 bg-black rounded-full flex items-center justify-between px-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                                </div>
                            </div>

                            {/* Bio Content */}
                            <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-none pt-2 text-center relative z-10">
                                <div className="relative inline-block">
                                    <img
                                        src={currentPersona.avatar}
                                        alt={currentPersona.name}
                                        className="h-20 w-20 rounded-full object-cover mx-auto ring-4 shadow-xl"
                                        style={{ ringColor: currentPersona.accent }}
                                    />
                                    <span
                                        className="absolute bottom-0 right-0 h-5 w-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-md"
                                        style={{ backgroundColor: currentPersona.accent }}
                                    >
                                        ✓
                                    </span>
                                </div>

                                <div className="space-y-0.5">
                                    <h4 className="text-base font-extrabold text-white tracking-tight">
                                        {currentPersona.name}
                                    </h4>
                                    <p className="text-[11px] font-bold" style={{ color: currentPersona.accent }}>
                                        {currentPersona.handle} • {currentPersona.followers}
                                    </p>
                                    <p className="text-[11px] text-zinc-300 max-w-xs mx-auto leading-relaxed pt-1">
                                        {currentPersona.tagline}
                                    </p>
                                </div>

                                {/* Social Links Icons */}
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    {[Instagram, Youtube, Twitter, MessageCircle].map((Icon, idx) => (
                                        <div
                                            key={idx}
                                            className="h-7 w-7 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white"
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                        </div>
                                    ))}
                                </div>

                                {/* Dynamic Links */}
                                <div className="space-y-2.5 pt-2">
                                    {currentPersona.links.map((link, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-left flex items-center justify-between shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                                        >
                                            <div className="min-w-0 flex-1 pr-2">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-xs font-bold text-white truncate">
                                                        {link.title}
                                                    </p>
                                                    {link.badge && (
                                                        <span
                                                            className="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase shrink-0"
                                                            style={{
                                                                backgroundColor: currentPersona.accent,
                                                                color: "#000000",
                                                            }}
                                                        >
                                                            {link.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                                                    {link.subtitle}
                                                </p>
                                            </div>
                                            {link.price && (
                                                <span
                                                    className="text-xs font-black shrink-0 font-mono"
                                                    style={{ color: currentPersona.accent }}
                                                >
                                                    {link.price}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phone Footer */}
                            <div className="pt-2 text-center">
                                <span className="text-[9px] text-zinc-500 font-medium">
                                    Powered by <strong className="text-white">Outsyra</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
               {/* 3. CORE FEATURES GRID: "CREATE YOUR WAY" */}
            <section className="bg-[#d2e823]">
                    <div className="py-20 max-sm:px-4 max-w-7xl mx-auto ">
                 

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Store,
                            title: "Sell Digital Products & PDFs",
                            desc: "Sell Notion templates, ebooks, presets, and code packs with 1-click checkout and encrypted instant downloads.",
                            badge: "0% Fees",
                        },
                        {
                            icon: Calendar,
                            title: "1:1 Consultation & Bookings",
                            desc: "Charge upfront for 30-min strategy calls with direct Google Meet & Jitsi video room generation.",
                            badge: "Calendar Sync",
                        },
                        {
                            icon: Mail,
                            title: "Lead Capture & Newsletters",
                            desc: "Collect email subscribers directly in your link tree and broadcast newsletters with zero third-party tools.",
                            badge: "Email Engine",
                        },
                        {
                            icon: Coffee,
                            title: "Tip Jar & Support Donations",
                            desc: "Let your supporters send tips ($3, $5, $10, $25) to fund your creative projects with instant Stripe payouts.",
                            badge: "Donations",
                        },
                        {
                            icon: Music,
                            title: "Media & Audio Players",
                            desc: "Embed playable YouTube videos, Spotify tracks, and Apple Podcasts directly inside your link in bio.",
                            badge: "Rich Media",
                        },
                        {
                            icon: BarChart3,
                            title: "Real-Time Audience Analytics",
                            desc: "Track total page views, unique visitors, link clicks, CTR %, top referrers, and device platforms in real time.",
                            badge: "PostgreSQL DB",
                        },
                    ].map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 space-y-4 hover:border-indigo-500/40 hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <Badge variant="outline" className="text-[10px] font-bold">
                                        {f.badge}
                                    </Badge>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                    {f.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        );
                    })}
                </div> */}
<HomeServiceCard />
                    </div>
                
            </section>

            {/* 2. TEMPLATE MARKETPLACE SHOWCASE */}
            <TemplateShowcase />
            {/* <section  className="bg-[#e548d9] dark:bg-white">
            <div className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-200 ">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
                    <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider px-3 py-1">
                        🎨 20+ Aesthetic Presets
                    </Badge>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        Jumpstart your design with trending templates
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                        Choose from 20+ curated design archetypes or photographic 4K image backgrounds. Every single font, color, and button shape is fully customizable.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templatesShowcase.map((t, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-3xl border border-zinc-200 dark:border-white/10 overflow-hidden group shadow-sm hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-56 w-full relative overflow-hidden bg-black">
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-between">
                                    <Badge variant="outline" className="self-start text-[9px] uppercase font-bold bg-black/60 text-white border-white/20">
                                        {t.cat}
                                    </Badge>
                                    <div>
                                        <h4 className="text-base font-bold text-white">{t.name}</h4>
                                        <p className="text-xs text-zinc-300 mt-0.5">1-Click Apply to Storefront</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between border-t border-zinc-200/60 dark:border-white/5">
                                <span className="text-xs font-semibold text-zinc-500">Free & Pro Presets</span>
                                <Link href="/templates">
                                    <Button variant="gradient" size="sm" className="text-xs gap-1">
                                        <span>Use Template</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center pt-10">
                    <Link href="/templates">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-xs font-bold gap-2">
                            <Palette className="h-4 w-4 text-indigo-500" />
                            <span>Explore all 20+ Templates & 4K Free Images</span>
                        </Button>
                    </Link>
                </div>
                </div>
            </section> */}

         

            {/* 4. PRICING SECTION */}
         {/* 4. PRICING SECTION */}
<section className="relative overflow-hidden border-t border-zinc-200 bg-white px-6 py-20 dark:border-white/10 dark:bg-zinc-950 sm:py-24 lg:py-28">

    {/* Background Decorations */}
    <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[100px]" />
    <div className="pointer-events-none absolute right-[-100px] top-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-[110px]" />
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

    <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

            <div className="mb-5 inline-flex rotate-[-2deg] items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
                <span className="text-base">💰</span>
                Transparent Pricing
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
                One simple plan for
                <br />

                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    every stage of growth.
                </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">
                Start for free, upgrade when you scale.
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {" "}0% platform commission
                </span>
                {" "}on all plans.
            </p>

            {/* BILLING TOGGLE */}

            <div className="mt-8 inline-flex rounded-2xl border border-zinc-200 bg-zinc-100 p-1.5 shadow-sm dark:border-white/10 dark:bg-zinc-900">

                {/* Monthly */}

                <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`
                        rounded-xl px-5 py-2.5
                        text-[11px] font-black
                        transition-all duration-300
                        ${
                            billingCycle === "monthly"
                                ? "bg-white text-indigo-600 shadow-md dark:bg-zinc-800 dark:text-white"
                                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        }
                    `}
                >
                    Monthly Billing
                </button>

                {/* Yearly */}

                <button
                    type="button"
                    onClick={() => setBillingCycle("yearly")}
                    className={`
                        flex items-center gap-2
                        rounded-xl px-5 py-2.5
                        text-[11px] font-black
                        transition-all duration-300
                        ${
                            billingCycle === "yearly"
                                ? "bg-white text-indigo-600 shadow-md dark:bg-zinc-800 dark:text-white"
                                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        }
                    `}
                >
                    <span>Yearly Billing</span>

                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                        20% OFF
                    </span>
                </button>

            </div>

        </div>

        {/* PRICING GRID */}

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-7">

            {pricingPlans.map((plan, i) => (

                <div
                    key={i}
                    className={`
                        group relative flex flex-col
                        rounded-[2rem]
                        border
                        p-7
                        transition-all duration-500
                        hover:-translate-y-2
                        sm:p-8

                        ${
                            plan.highlighted
                                ? `
                                    border-indigo-500/50
                                    bg-zinc-950
                                    text-white
                                    shadow-[0_30px_80px_rgba(79,70,229,0.22)]
                                    lg:scale-[1.045]
                                    lg:-translate-y-3
                                `
                                : `
                                    border-zinc-200
                                    bg-white
                                    shadow-[0_15px_50px_rgba(0,0,0,0.05)]
                                    hover:border-indigo-300
                                    hover:shadow-[0_25px_60px_rgba(79,70,229,0.10)]
                                    dark:border-white/10
                                    dark:bg-zinc-900/70
                                    dark:hover:border-indigo-500/40
                                `
                        }
                    `}
                >

                    {/* POPULAR PLAN GLOW */}

                    {plan.highlighted && (
                        <>
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-[70px]" />
                                <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-[70px]" />
                            </div>

                            {/* Popular Badge */}

                            <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
                                <div className="relative">

                                    <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40" />

                                    <div className="relative flex items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-lg">
                                        <Sparkles className="h-3 w-3" />
                                        Most Popular
                                    </div>

                                </div>
                            </div>
                        </>
                    )}

                    {/* PLAN CONTENT */}

                    <div className="relative z-10 flex flex-1 flex-col">

                        {/* Plan Header */}

                        <div className="mb-7">

                            <div className="mb-3 flex items-center justify-between">

                                <h3
                                    className={`
                                        text-xl font-black tracking-tight
                                        ${
                                            plan.highlighted
                                                ? "text-white"
                                                : "text-zinc-900 dark:text-white"
                                        }
                                    `}
                                >
                                    {plan.name}
                                </h3>

                                {/* Decorative Dot */}

                                <span
                                    className={`
                                        h-2.5 w-2.5 rounded-full
                                        transition-transform duration-300
                                        group-hover:scale-150
                                        ${
                                            plan.highlighted
                                                ? "bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]"
                                                : "bg-indigo-500"
                                        }
                                    `}
                                />

                            </div>

                            <p
                                className={`
                                    text-xs leading-5
                                    ${
                                        plan.highlighted
                                            ? "text-zinc-400"
                                            : "text-zinc-500 dark:text-zinc-400"
                                    }
                                `}
                            >
                                {plan.desc}
                            </p>

                        </div>

                        {/* PRICE */}

                        <div className="mb-8">

                            <div className="flex items-end gap-1">

                                <span
                                    className={`
                                        text-5xl font-black tracking-[-0.06em]
                                        ${
                                            plan.highlighted
                                                ? "text-white"
                                                : "text-zinc-950 dark:text-white"
                                        }
                                    `}
                                >
                                    {plan.price}
                                </span>

                                <span
                                    className={`
                                        mb-2 text-xs font-bold
                                        ${
                                            plan.highlighted
                                                ? "text-zinc-500"
                                                : "text-zinc-400"
                                        }
                                    `}
                                >
                                    /{plan.period}
                                </span>

                            </div>

                            {/* Small pricing indicator */}

                            <div
                                className={`
                                    mt-3 h-1 w-12 rounded-full
                                    transition-all duration-500
                                    group-hover:w-20
                                    ${
                                        plan.highlighted
                                            ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                                            : "bg-zinc-200 dark:bg-zinc-700"
                                    }
                                `}
                            />

                        </div>

                        {/* FEATURES */}

                        <div className="flex-1">

                            <div
                                className={`
                                    mb-4 text-[9px] font-black uppercase tracking-[0.18em]
                                    ${
                                        plan.highlighted
                                            ? "text-zinc-500"
                                            : "text-zinc-400"
                                    }
                                `}
                            >
                                What's included
                            </div>

                            <ul className="space-y-3">

                                {plan.features.map((feat, idx) => (

                                    <li
                                        key={idx}
                                        className={`
                                            flex items-center gap-3
                                            text-xs
                                            ${
                                                plan.highlighted
                                                    ? "text-zinc-300"
                                                    : "text-zinc-600 dark:text-zinc-300"
                                            }
                                        `}
                                    >

                                        <span
                                            className={`
                                                flex h-6 w-6 shrink-0
                                                items-center justify-center
                                                rounded-full
                                                transition-all duration-300
                                                group-hover:scale-110
                                                ${
                                                    plan.highlighted
                                                        ? "bg-emerald-500/15"
                                                        : "bg-emerald-500/10"
                                                }
                                            `}
                                        >
                                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                                        </span>

                                        <span className="leading-5">
                                            {feat}
                                        </span>

                                    </li>

                                ))}

                            </ul>

                        </div>

                        {/* CTA */}

                        <div className="mt-8 pt-2">

                            <Link href={plan.href} className="block">

                                <Button
                                    variant={
                                        plan.highlighted
                                            ? "gradient"
                                            : "outline"
                                    }
                                    className={`
                                        h-12 w-full
                                        rounded-xl
                                        text-xs font-black
                                        transition-all duration-300
                                        group-hover:shadow-lg

                                        ${
                                            plan.highlighted
                                                ? "shadow-[0_10px_30px_rgba(99,102,241,0.25)]"
                                                : "hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                        }
                                    `}
                                >
                                    {plan.cta}

                                    <ArrowRight
                                        className="
                                            ml-2 h-4 w-4
                                            transition-transform duration-300
                                            group-hover:translate-x-1
                                        "
                                    />

                                </Button>

                            </Link>

                        </div>

                    </div>

                    {/* BOTTOM DECORATIVE NUMBER */}

                    <div
                        className={`
                            pointer-events-none absolute
                            bottom-3 right-5
                            text-7xl font-black
                            tracking-[-0.08em]
                            transition-all duration-500
                            group-hover:scale-110
                            ${
                                plan.highlighted
                                    ? "text-white/[0.025]"
                                    : "text-zinc-900/[0.025] dark:text-white/[0.025]"
                            }
                        `}
                    >
                        {String(i + 1).padStart(2, "0")}
                    </div>

                </div>

            ))}

        </div>

        {/* BOTTOM NOTE */}

        <div className="mt-10 text-center">

            <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                No hidden fees • Cancel anytime • Upgrade or downgrade whenever you want
            </p>

        </div>

    </div>
</section>

            {/* 5. FAQ SECTION */}
         <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700 px-6 py-20 sm:py-24">

    {/* Background Glow */}
    <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-pink-400/30 blur-[100px]" />

    <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-indigo-400/30 blur-[120px]" />

    <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-300/20 blur-[100px]" />

    {/* Subtle Grid */}
    <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
            backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
        }}
    />

    <div className="relative mx-auto max-w-4xl">

        {/* =========================================================
            HEADER
        ========================================================== */}

        <div className="mb-12 text-center">

            {/* Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-xl">

                <span className="flex h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

                Frequently Asked Questions

            </div>


            {/* Heading */}

            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

                Everything you need
                <br className="hidden sm:block" />

                <span className="text-fuchsia-200">
                    to know.
                </span>

            </h2>


            {/* Description */}

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">

                Still have questions? Find quick answers about your bio link,
                customization, templates, and everything else.

            </p>

        </div>


        {/* =========================================================
            FAQ LIST
        ========================================================== */}

        <div className="space-y-3">

            {faqs.map((faq, idx) => {

                const isOpen = activeFaq === idx;

                return (

                    <div
                        key={idx}
                        className={`
                            group overflow-hidden rounded-2xl
                            border backdrop-blur-xl
                            transition-all duration-300
                            ${
                                isOpen
                                    ? "border-white/30 bg-white/[0.16] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
                                    : "border-white/10 bg-white/[0.08] hover:border-white/20 hover:bg-white/[0.12]"
                            }
                        `}
                    >

                        {/* =================================================
                            QUESTION
                        ================================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveFaq(isOpen ? null : idx)
                            }
                            className="flex w-full cursor-pointer items-center gap-4 p-5 text-left sm:p-6"
                        >

                            {/* Number */}

                            <span
                                className={`
                                    flex h-9 w-9 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    text-[10px] font-black
                                    transition-all duration-300
                                    ${
                                        isOpen
                                            ? "bg-white text-purple-600 shadow-lg"
                                            : "bg-white/10 text-white/60 group-hover:bg-white/15 group-hover:text-white"
                                    }
                                `}
                            >
                                {String(idx + 1).padStart(2, "0")}
                            </span>


                            {/* Question */}

                            <span className="flex-1 text-sm font-bold leading-5 text-white sm:text-base">
                                {faq.q}
                            </span>


                            {/* Chevron */}

                            <span
                                className={`
                                    flex h-9 w-9 shrink-0
                                    items-center justify-center
                                    rounded-full
                                    border
                                    transition-all duration-300
                                    ${
                                        isOpen
                                            ? "rotate-180 border-white/30 bg-white text-purple-600"
                                            : "border-white/10 bg-white/5 text-white/60"
                                    }
                                `}
                            >

                                <ChevronDown className="h-4 w-4" />

                            </span>

                        </button>


                        {/* =================================================
                            ANSWER
                        ================================================== */}

                        <div
                            className={`
                                grid transition-all duration-300 ease-out
                                ${
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                }
                            `}
                        >

                            <div className="min-h-0 overflow-hidden">

                                <div className="mx-5 border-t border-white/10 pb-6 pt-4 sm:mx-6">

                                    <div className="pl-[52px] pr-8 text-xs leading-6 text-white/70 sm:text-sm">

                                        {faq.a}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                );
            })}

        </div>


        {/* =========================================================
            BOTTOM CTA
        ========================================================== */}

        <div className="mt-10 text-center">

            <p className="text-xs text-white/60">
                Still can't find what you're looking for?
            </p>

            <button
                type="button"
                className="
                    mt-3 inline-flex items-center gap-2
                    rounded-xl
                    border border-white/20
                    bg-white/10
                    px-5 py-2.5
                    text-xs font-bold
                    text-white
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-white
                    hover:text-purple-600
                    hover:shadow-xl
                "
            >
                Get in touch
                <ArrowRight className="h-3.5 w-3.5" />
            </button>

        </div>

    </div>

</section>
{/* 6. FINAL CTA BANNER */}

<section className="relative overflow-hidden bg-[#f0abfc] px-6 py-16 sm:py-20">

{/* Funky colorful background */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-[90px]" />
    <div className="absolute right-[-80px] top-0 h-80 w-80 rounded-full bg-indigo-300/40 blur-[100px]" />
    <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-cyan-300/30 blur-[100px]" />
    <div className="absolute bottom-0 right-1/4 h-52 w-52 rounded-full bg-yellow-200/40 blur-[80px]" />
</div>

{/* Small decorative shapes */}
<div className="pointer-events-none absolute left-[8%] top-20 hidden sm:block">
    <div className="h-4 w-4 rotate-12 rounded-md bg-fuchsia-400" />
</div>

<div className="pointer-events-none absolute right-[12%] bottom-16 hidden sm:block">
    <div className="h-3 w-3 rounded-full bg-indigo-500" />
</div>

<div className="pointer-events-none absolute left-[18%] bottom-10 hidden lg:block">
    <div className="h-2 w-8 -rotate-45 rounded-full bg-cyan-400" />
</div>

{/* CTA Card */}
<div className="relative mx-auto max-w-7xl">

    <div className="relative overflow-hidden rounded-[30px] border border-zinc-200 bg-white px-6 py-10 shadow-[0_25px_80px_rgba(79,70,229,0.12)] sm:px-10 sm:py-12 lg:px-14">

        {/* Soft color accents inside card */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-100 blur-[70px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-fuchsia-100 blur-[70px]" />

        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:justify-between">

            {/* LEFT CONTENT */}
            <div className="max-w-2xl text-center lg:text-left">

                {/* Label */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                        Start for free
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-black tracking-[-0.04em] leading-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                    Everything you create.
                    <span className="block">
                        One simple link.
                    </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                    Create your Outsyra page, share your content,
                    grow your audience, and give everything you do
                    one beautiful home.
                </p>

                {/* Claim form */}
                <form
                    onSubmit={handleClaimSubmit}
                    className="mt-7 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm sm:flex-row sm:rounded-full"
                >
                    <div className="flex h-11 min-w-0 flex-1 items-center px-3 sm:px-4">
                        <span className="shrink-0 text-xs font-mono font-semibold text-zinc-400 sm:text-sm">
                            outsyra.com/
                        </span>

                        <input
                            type="text"
                            placeholder="yourname"
                            value={claimHandle}
                            onChange={(e) => setClaimHandle(e.target.value)}
                            className="min-w-0 w-full bg-transparent pl-1 text-sm font-bold text-zinc-900 outline-none placeholder:text-zinc-400 sm:text-base"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="gradient"
                        className="h-11 rounded-xl px-6 text-xs font-bold shadow-md sm:rounded-full sm:text-sm"
                    >
                        Get started
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                </form>

                {/* Trust */}
                <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[11px] font-medium text-zinc-400 lg:justify-start">
                    <span>✓ Free to start</span>
                    <span>✓ No credit card</span>
                    <span>✓ Setup in minutes</span>
                </div>
            </div>

            {/* RIGHT GRAPHIC */}
            <div className="relative hidden h-[240px] w-[280px] shrink-0 sm:block lg:h-[260px] lg:w-[320px]">

                {/* Color blobs */}
                <div className="absolute right-0 top-5 h-40 w-40 rounded-full bg-indigo-100" />
                <div className="absolute bottom-2 left-4 h-32 w-32 rounded-full bg-fuchsia-100" />

                {/* Decorative star */}
                <div className="absolute right-5 top-2 text-3xl text-fuchsia-400">
                    ✦
                </div>

                {/* Main profile card */}
                <div className="absolute left-8 top-8 w-[190px] rotate-[-4deg] rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.10)]">

                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-500" />

                        <div>
                            <div className="h-2.5 w-20 rounded-full bg-zinc-900" />
                            <div className="mt-2 h-2 w-14 rounded-full bg-zinc-200" />
                        </div>
                    </div>

                    <div className="mt-5 space-y-2">
                        <div className="h-7 w-full rounded-lg bg-zinc-100" />
                        <div className="h-7 w-full rounded-lg bg-zinc-100" />
                        <div className="h-7 w-3/4 rounded-lg bg-zinc-100" />
                    </div>
                </div>

                {/* Floating analytics card */}
                <div className="absolute bottom-7 right-0 w-[145px] rotate-[5deg] rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.10)]">

                    <div className="flex items-end gap-1.5 h-12">
                        <div className="w-3 rounded-t bg-fuchsia-300 h-5" />
                        <div className="w-3 rounded-t bg-purple-400 h-8" />
                        <div className="w-3 rounded-t bg-indigo-400 h-6" />
                        <div className="w-3 rounded-t bg-cyan-400 h-10" />
                        <div className="w-3 rounded-t bg-fuchsia-400 h-12" />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-zinc-400">
                            Growth
                        </span>
                        <span className="text-[10px] font-bold text-indigo-500">
                            +28%
                        </span>
                    </div>
                </div>

                {/* Floating small badge */}
                <div className="absolute left-0 bottom-12 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-lg shadow-lg">
                    ✨
                </div>
            </div>

        </div>
    </div>
</div>

</section>


            {/* 7. FOOTER */}
            <footer className="border-t border-zinc-200 dark:border-white/10 py-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md">
                            ⚡️
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">Outsyra Creator OS</span>
                        <span>• © 2026 Outsyra Inc. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6 font-semibold">
                        <Link href="/templates" className="hover:text-white transition-colors">
                            Templates
                        </Link>
                        <Link href="/store" className="hover:text-white transition-colors">
                            Visual Builder
                        </Link>
                        <Link href="/analytics" className="hover:text-white transition-colors">
                            Analytics
                        </Link>
                        <Link href="/onboarding" className="hover:text-white transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
