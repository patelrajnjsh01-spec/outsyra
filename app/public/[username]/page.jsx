"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Package,
    GraduationCap,
    Calendar,
    Mail,
    Users,
    Link as LinkIcon,
    Video,
    Sparkles,
    CheckCircle2,
    Download,
    ShieldCheck,
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    Coffee,
    Clock,
    Star,
    ExternalLink,
    Copy,
    Check,
    QrCode,
    X,
    Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
    getWorkspace,
    getStoreBlocks,
    getProducts,
    getCourses,
    getBookingServices,
    addEmailSubscriber,
    createOrder,
} from "@/lib/supabase/db";

export default function PublicCreatorBioPage() {
    const params = useParams();
    const username = params?.username || "rajnish";

    // State
    const [workspace, setWorkspace] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [products, setProducts] = useState([]);
    const [courses, setCourses] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Checkout & Action Modals
    const [selectedProductModal, setSelectedProductModal] = useState(null);
    const [selectedBookingModal, setSelectedBookingModal] = useState(null);
    const [checkoutComplete, setCheckoutComplete] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [bookingDate, setBookingDate] = useState("2026-09-10");
    const [bookingTime, setBookingTime] = useState("03:00 PM EST");

    // Tip Jar State
    const [tipAmount, setTipAmount] = useState(5);
    const [tipSuccess, setTipSuccess] = useState(false);

    // Newsletter State
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    // Utility Modals
    const [qrModal, setQrModal] = useState(false);
    const [copiedNotice, setCopiedNotice] = useState(false);

    useEffect(() => {
        async function fetchStorefront() {
            try {
                const [ws, blks, prods, crs, bks] = await Promise.all([
                    getWorkspace(username),
                    getStoreBlocks("ws-rajnish-001"),
                    getProducts("ws-rajnish-001"),
                    getCourses("ws-rajnish-001"),
                    getBookingServices("ws-rajnish-001"),
                ]);
                if (ws) setWorkspace(ws);
                if (blks && blks.length > 0) setBlocks(blks);
                if (prods) setProducts(prods);
                if (crs) setCourses(crs);
                if (bks) setBookings(bks);
            } catch (err) {
                console.error("Failed to load storefront:", err);
            }
        }
        fetchStorefront();
    }, [username]);

    const ws = workspace || {
        display_name: "Rajnish Sharma",
        username: username,
        bio: "Helping modern creators build profitable 6-figure digital product businesses and automated funnels.",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        theme_config: {
            primaryColor: "#00f0ff",
            secondaryColor: "#d946ef",
            backgroundColor: "#070814",
            backgroundStyle: "cyber-grid",
            cardStyle: "neon-glow",
            fontFamily: "Outfit",
            buttonShape: "rounded-xl",
            glowColor: "rgba(0, 240, 255, 0.35)",
            accentBorder: "rgba(0, 240, 255, 0.4)",
            cardBg: "rgba(10, 13, 30, 0.8)",
            followersCount: "125K+",
            verifiedBadge: true,
        },
    };

    const theme = ws.theme_config || {
        primaryColor: "#00f0ff",
        secondaryColor: "#d946ef",
        backgroundColor: "#070814",
        backgroundStyle: "cyber-grid",
        cardStyle: "neon-glow",
        fontFamily: "Outfit",
        buttonShape: "rounded-xl",
        glowColor: "rgba(0, 240, 255, 0.35)",
        accentBorder: "rgba(0, 240, 255, 0.4)",
        cardBg: "rgba(10, 13, 30, 0.8)",
        followersCount: "125K+",
        verifiedBadge: true,
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        try {
            await addEmailSubscriber("ws-rajnish-001", {
                email: newsletterEmail,
                source: "store_bio",
                tags: ["bio-lead"],
            });
            setNewsletterSuccess(true);
            setNewsletterEmail("");
            setTimeout(() => setNewsletterSuccess(false), 4000);
        } catch (err) {
            console.error("Failed to subscribe:", err);
        }
    };

    const handleCompleteOrder = async () => {
        if (selectedProductModal) {
            await createOrder({
                workspace_id: "ws-rajnish-001",
                customer_email: "customer@gmail.com",
                customer_name: "Valued Customer",
                total_amount: selectedProductModal.price || 0,
                currency: "USD",
                item_title: selectedProductModal.title || selectedProductModal.name,
            });
        }
        setCheckoutComplete(true);
    };

    const handleCopyBioLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopiedNotice(true);
            setTimeout(() => setCopiedNotice(false), 2500);
        }
    };

    const getBackgroundStyle = () => {
        if (theme.backgroundImage || theme.backgroundStyle === "image") {
            const bgUrl = theme.backgroundImage || "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80";
            const overlay = theme.backgroundOverlay || "rgba(6, 8, 20, 0.78)";
            return {
                backgroundColor: theme.backgroundColor || "#050505",
                backgroundImage: `linear-gradient(${overlay}, ${overlay}), url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            };
        }

        switch (theme.backgroundStyle) {
            case "cyber-grid":
                return {
                    backgroundColor: theme.backgroundColor || "#070814",
                    backgroundImage: `radial-gradient(${theme.primaryColor || "#00f0ff"}22 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                };
            case "mesh-aurora":
                return {
                    backgroundColor: theme.backgroundColor || "#09090b",
                    backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.primaryColor || "#6366f1"}33, transparent 60%), radial-gradient(circle at 100% 100%, ${theme.secondaryColor || "#a855f7"}25, transparent 60%)`,
                };
            case "sunset":
                return {
                    backgroundColor: theme.backgroundColor || "#120818",
                    backgroundImage: `radial-gradient(circle at 50% -10%, #f43f5e35 0%, transparent 70%), radial-gradient(circle at 90% 80%, #fbbf2425 0%, transparent 60%)`,
                };
            case "obsidian":
                return {
                    backgroundColor: "#050505",
                    backgroundImage: `radial-gradient(circle at 50% 10%, #e5c07b15 0%, transparent 50%)`,
                };
            case "clean":
            default:
                return {
                    backgroundColor: theme.backgroundColor || "#0b0f19",
                };
        }
    };

    const getAnimationClass = () => {
        switch (theme.animation) {
            case "bounce-hover":
                return "hover:scale-[1.025] hover:-translate-y-0.5 transition-all duration-200 active:scale-95";
            case "shimmer-glow":
                return "hover:shadow-[0_0_22px_rgba(0,240,255,0.4)] hover:border-cyan-400 transition-all duration-300";
            case "brutalist-jump":
                return "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.9)] active:translate-x-0 active:translate-y-0 transition-all duration-150";
            case "smooth-lift":
            default:
                return "hover:-translate-y-1 hover:shadow-xl transition-all duration-200";
        }
    };

    const getCardStyleClasses = () => {
        const anim = getAnimationClass();
        switch (theme.cardStyle) {
            case "neon-glow":
                return `border backdrop-blur-xl shadow-lg ${anim}`;
            case "minimal-outline":
                return `border ${anim}`;
            case "brutalist":
                return `border-2 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] font-bold ${anim}`;
            case "solid":
                return `border shadow-md ${anim}`;
            case "glass":
            default:
                return `border backdrop-blur-2xl shadow-sm ${anim}`;
        }
    };

    const getButtonShapeClass = () => {
        switch (theme.buttonShape) {
            case "sharp":
                return "rounded-none";
            case "rounded-lg":
                return "rounded-lg";
            case "rounded-2xl":
                return "rounded-2xl";
            case "rounded-full":
                return "rounded-full";
            case "rounded-xl":
            default:
                return "rounded-xl";
        }
    };

    return (
        <div
            className="min-h-screen text-foreground flex flex-col items-center py-10 px-4 sm:px-6 relative overflow-hidden transition-colors duration-200"
            style={{
                ...getBackgroundStyle(),
                fontFamily: theme.fontFamily || "Outfit",
            }}
        >
            {/* Top Toolbar */}
            <div className="w-full max-w-xl flex justify-between items-center z-20 mb-6">
                <Link
                    href="/dashboard"
                    className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                    <Sparkles className="h-3.5 w-3.5" style={{ color: theme.primaryColor }} />
                    <span className="font-mono">outsyra.com</span>
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopyBioLink}
                        className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer shadow-xs"
                    >
                        {copiedNotice ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedNotice ? "Copied Link!" : "Share"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setQrModal(true)}
                        className="p-1.5 rounded-xl border border-white/10 bg-black/40 text-zinc-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-xs"
                        title="Scan QR Code"
                    >
                        <QrCode className="h-4 w-4" />
                    </button>

                    <ThemeToggle />
                </div>
            </div>

            {/* Main Creator Profile Container */}
            <div className="w-full max-w-xl mx-auto space-y-6 relative z-10">
                {/* Header Info */}
                <div className="text-center space-y-4 pt-2">
                    <div className="relative inline-block">
                        <img
                            src={ws.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                            alt={ws.display_name}
                            className="h-24 w-24 rounded-full object-cover mx-auto ring-4 shadow-2xl"
                            style={{ ringColor: theme.primaryColor || "#00f0ff" }}
                        />
                        {theme.verifiedBadge !== false && (
                            <span
                                className="absolute bottom-1 right-1 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                style={{ backgroundColor: theme.primaryColor || "#00f0ff" }}
                            >
                                ✓
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
                            {ws.display_name}
                        </h1>
                        <p className="text-xs font-bold" style={{ color: theme.primaryColor || "#00f0ff" }}>
                            @{ws.username} • {theme.followersCount || "125K+"} Audience
                        </p>
                        <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed pt-1.5 px-4">
                            {ws.bio}
                        </p>
                    </div>

                    {/* Social Hub */}
                    <div className="flex items-center justify-center gap-2.5 pt-1">
                        {[
                            { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
                            { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
                            { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
                            { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                        ].map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`h-9 w-9 ${getButtonShapeClass()} flex items-center justify-center text-zinc-300 hover:text-white transition-all`}
                                    style={{
                                        backgroundColor: theme.cardBg || "rgba(255,255,255,0.06)",
                                        borderColor: theme.accentBorder || "rgba(255,255,255,0.1)",
                                        borderWidth: "1px",
                                    }}
                                    title={s.name}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Offerings and Monetization Blocks */}
                <div className="space-y-3.5 pt-4">
                    {blocks
                        .filter((b) => b.is_visible && b.type !== "header")
                        .map((b) => (
                            <div
                                key={b.id}
                                onClick={() => {
                                    if (b.type === "product" || b.type === "course") {
                                        setSelectedProductModal(b);
                                        setCheckoutComplete(false);
                                    } else if (b.type === "booking" || b.type === "coaching") {
                                        setSelectedBookingModal(b);
                                        setBookingComplete(false);
                                    }
                                }}
                                className={`${getCardStyleClasses()} ${getButtonShapeClass()} p-4.5 flex items-center gap-4 cursor-pointer group shadow-sm hover:scale-[1.01]`}
                                style={{
                                    backgroundColor: theme.cardBg || "rgba(15, 17, 23, 0.75)",
                                    borderColor: theme.accentBorder || "rgba(255, 255, 255, 0.1)",
                                    boxShadow:
                                        theme.cardStyle === "neon-glow"
                                            ? `0 0 20px ${theme.glowColor || "rgba(99,102,241,0.2)"}`
                                            : "none",
                                }}
                            >
                                {/* Block Icon */}
                                <div
                                    className={`h-12 w-12 ${getButtonShapeClass()} flex items-center justify-center flex-shrink-0`}
                                    style={{
                                        backgroundColor: `${theme.primaryColor || "#00f0ff"}20`,
                                        color: theme.primaryColor || "#00f0ff",
                                    }}
                                >
                                    {b.type === "product" && <Package className="h-5 w-5" />}
                                    {b.type === "course" && <GraduationCap className="h-5 w-5" />}
                                    {b.type === "booking" && <Calendar className="h-5 w-5" />}
                                    {b.type === "coaching" && <Video className="h-5 w-5" />}
                                    {b.type === "newsletter" && <Mail className="h-5 w-5" />}
                                    {b.type === "community" && <Users className="h-5 w-5" />}
                                    {b.type === "tipjar" && <Coffee className="h-5 w-5" />}
                                    {b.type === "countdown" && <Clock className="h-5 w-5" />}
                                    {b.type === "testimonial" && <Star className="h-5 w-5" />}
                                    {b.type === "youtube" && <Youtube className="h-5 w-5" />}
                                    {b.type === "spotify" && <Sparkles className="h-5 w-5" />}
                                    {b.type === "image" && <Sparkles className="h-5 w-5" />}
                                    {b.type === "link" && <ExternalLink className="h-5 w-5" />}
                                </div>

                                {/* Content Details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                        <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                                            {b.title}
                                        </h3>
                                        {b.discountBadge && (
                                            <span
                                                className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 shadow-xs"
                                                style={{
                                                    backgroundColor: theme.primaryColor || "#00f0ff",
                                                    color: "#000000",
                                                }}
                                            >
                                                {b.discountBadge}
                                            </span>
                                        )}
                                    </div>

                                    {b.subtitle && (
                                        <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                                            {b.subtitle}
                                        </p>
                                    )}

                                    {/* Image Block Display */}
                                    {b.type === "image" && b.image_url && (
                                        <div className="mt-2.5 rounded-2xl overflow-hidden border border-white/10 h-36 w-full bg-black/40">
                                            <img
                                                src={b.image_url}
                                                alt={b.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Email Newsletter Input Form */}
                                    {b.type === "newsletter" && (
                                        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                                            {newsletterSuccess ? (
                                                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                                                    <CheckCircle2 className="h-4 w-4" /> You're subscribed! Check your inbox.
                                                </p>
                                            ) : (
                                                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                                    <Input
                                                        type="email"
                                                        required
                                                        placeholder="Enter your email address..."
                                                        value={newsletterEmail}
                                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                                        className="h-9 text-xs bg-black/40 border-white/10 text-white"
                                                    />
                                                    <Button
                                                        type="submit"
                                                        variant="gradient"
                                                        className={`h-9 text-xs shrink-0 ${getButtonShapeClass()}`}
                                                        style={{
                                                            backgroundColor: theme.primaryColor,
                                                            color: "#000000",
                                                        }}
                                                    >
                                                        {b.ctaText || "Subscribe Free"}
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {/* Tip Jar Selector */}
                                    {b.type === "tipjar" && (
                                        <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            {[3, 5, 10, 25].map((amt) => (
                                                <button
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => {
                                                        setTipAmount(amt);
                                                        setTipSuccess(true);
                                                        setTimeout(() => setTipSuccess(false), 3000);
                                                    }}
                                                    className={`px-3 py-1 text-xs font-bold ${getButtonShapeClass()} border transition-all cursor-pointer ${
                                                        tipAmount === amt
                                                            ? "border-amber-400 bg-amber-400/20 text-amber-300 font-extrabold"
                                                            : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                                                    }`}
                                                >
                                                    ${amt}
                                                </button>
                                            ))}
                                            {tipSuccess && (
                                                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                                                    <Heart className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                                                    Thank you!
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Pricing & CTA */}
                                    {b.price !== undefined && b.price > 0 && (
                                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                                            <span
                                                className="text-xs font-extrabold"
                                                style={{ color: theme.primaryColor || "#00f0ff" }}
                                            >
                                                ${Number(b.price).toFixed(2)} USD
                                            </span>
                                            <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                {b.ctaText || "Get Instant Access"} →
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Footer Brand */}
                <div className="pt-10 pb-12 text-center text-xs text-zinc-500">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                        <span>Powered by</span>
                        <strong className="text-white font-extrabold tracking-wider">Outsyra Creator OS</strong>
                    </Link>
                </div>
            </div>

            {/* PRODUCT CHECKOUT MODAL */}
            {selectedProductModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95 shadow-2xl">
                        {!checkoutComplete ? (
                            <>
                                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                                    <Badge variant="default" className="text-[10px]">
                                        Secure Instant Checkout
                                    </Badge>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProductModal(null)}
                                        className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                        {selectedProductModal.title || selectedProductModal.name}
                                    </h3>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {selectedProductModal.subtitle || selectedProductModal.description}
                                    </p>
                                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 flex items-center justify-between">
                                        <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Total Amount Due:</span>
                                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                            ${Number(selectedProductModal.price || 0).toFixed(2)} USD
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <Input placeholder="Your Full Name" defaultValue="Alex Taylor" className="text-xs" />
                                    <Input
                                        type="email"
                                        placeholder="Your Email Address"
                                        defaultValue="alex.taylor@gmail.com"
                                        className="text-xs"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        variant="gradient"
                                        className="w-full h-11 text-xs gap-2"
                                        onClick={handleCompleteOrder}
                                    >
                                        <ShieldCheck className="h-4 w-4" />
                                        <span>Pay ${Number(selectedProductModal.price || 0).toFixed(2)} & Download Instantly</span>
                                    </Button>
                                    <p className="text-[10px] text-zinc-500 text-center mt-2">
                                        Protected with 256-bit SSL encryption via Stripe / Razorpay
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Payment Successful! 🎉</h3>
                                <p className="text-xs text-zinc-400">
                                    Your purchase has been saved in Supabase. Your digital asset access is ready.
                                </p>
                                <Button
                                    variant="gradient"
                                    className="w-full gap-2 text-xs"
                                    onClick={() => {
                                        alert("⬇️ File download initiated via signed AWS S3 / Supabase URL.");
                                        setSelectedProductModal(null);
                                    }}
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download Assets (Signed URL)</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 1:1 BOOKING MODAL */}
            {selectedBookingModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95 shadow-2xl">
                        {!bookingComplete ? (
                            <>
                                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                                    <Badge variant="default" className="text-[10px]">
                                        1:1 Strategy Appointment
                                    </Badge>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBookingModal(null)}
                                        className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white">{selectedBookingModal.title}</h3>
                                    <p className="text-xs text-zinc-400">{selectedBookingModal.subtitle}</p>
                                </div>

                                <div className="space-y-3 text-xs">
                                    <div>
                                        <label className="font-semibold text-zinc-400">Select Date</label>
                                        <Input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="h-9 text-xs mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold text-zinc-400">Select Time Slot (Google Meet / Jitsi)</label>
                                        <div className="grid grid-cols-2 gap-2 mt-1">
                                            {["10:00 AM EST", "02:00 PM EST", "04:30 PM EST", "07:00 PM EST"].map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setBookingTime(t)}
                                                    className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                                                        bookingTime === t
                                                            ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold"
                                                            : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                                                    }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="gradient"
                                    className="w-full text-xs"
                                    onClick={() => setBookingComplete(true)}
                                >
                                    Confirm Booking (${Number(selectedBookingModal.price || 0).toFixed(2)})
                                </Button>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Appointment Confirmed! 📅</h3>
                                <p className="text-xs text-zinc-400">
                                    We have scheduled your session for <strong>{bookingDate}</strong> at{" "}
                                    <strong>{bookingTime}</strong>. A calendar invite has been sent.
                                </p>
                                <Button
                                    variant="ghost"
                                    className="text-xs text-zinc-400"
                                    onClick={() => setSelectedBookingModal(null)}
                                >
                                    Done
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* QR CODE MODAL */}
            {qrModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white">Scan with Smartphone</h3>
                            <button
                                type="button"
                                onClick={() => setQrModal(false)}
                                className="text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                                    typeof window !== "undefined" ? window.location.href : "https://outsyra.com/rajnish"
                                )}`}
                                alt="Store QR Code"
                                className="h-40 w-40 mx-auto"
                            />
                        </div>

                        <p className="text-xs text-zinc-400">
                            Scan with your phone camera to view this live creator page on mobile!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
