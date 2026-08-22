"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Mail, CheckCircle2, Download, ShieldCheck, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    getWorkspace,
    getProducts,
    getCourses,
    getBookingServices,
    addEmailSubscriber,
    createOrder,
} from "@/lib/supabase/db";

export default function PublicCreatorBioPage({ params }) {
    const [workspace, setWorkspace] = useState(null);
    const [products, setProducts] = useState([]);
    const [courses, setCourses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);
    const [selectedProductModal, setSelectedProductModal] = useState(null);
    const [selectedBookingModal, setSelectedBookingModal] = useState(null);
    const [checkoutComplete, setCheckoutComplete] = useState(false);
    const [loading, setLoading] = useState(true);

    // Booking Form State
    const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
    const [bookingName, setBookingName] = useState("");
    const [bookingEmail, setBookingEmail] = useState("");

    useEffect(() => {
        async function fetchStorefront() {
            try {
                const [ws, prods, crs, bks] = await Promise.all([
                    getWorkspace("rajnish"),
                    getProducts("ws-rajnish-001"),
                    getCourses("ws-rajnish-001"),
                    getBookingServices("ws-rajnish-001"),
                ]);
                setWorkspace(ws);
                setProducts(prods || []);
                setCourses(crs || []);
                setBookings(bks || []);
            } catch (err) {
                console.error("Failed to load storefront", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStorefront();
    }, []);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        await addEmailSubscriber("ws-rajnish-001", {
            email: newsletterEmail,
            source: "store_bio",
            tags: ["bio-lead"],
        });
        setNewsletterSuccess(true);
        setNewsletterEmail("");
        setTimeout(() => setNewsletterSuccess(false), 4000);
    };

    const handleCompleteOrder = async () => {
        if (selectedProductModal) {
            await createOrder({
                workspace_id: "ws-rajnish-001",
                customer_email: "customer@gmail.com",
                customer_name: "Customer",
                total_amount: selectedProductModal.price || 0,
                currency: "USD",
                item_title: selectedProductModal.name || selectedProductModal.title,
            });
        }
        setCheckoutComplete(true);
    };

    const ws = workspace || {
        display_name: "Rajnish Sharma",
        username: "rajnish",
        bio: "Helping modern creators build profitable 6-figure digital product businesses and high-converting funnels.",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-10 px-4 sm:px-6 relative overflow-hidden grid-bg selection:bg-indigo-500 selection:text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

            <div className="w-full max-w-xl mx-auto space-y-6 relative z-10">
                {/* Header */}
                <div className="text-center space-y-4 pt-4">
                    <div className="relative inline-block">
                        <img
                            src={ws.avatar_url}
                            alt={ws.display_name}
                            className="h-24 w-24 rounded-full object-cover mx-auto ring-4 ring-indigo-500/40 shadow-2xl"
                        />
                        <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                        </span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                            {ws.display_name}
                        </h1>
                        <p className="text-xs text-indigo-400 font-medium mt-0.5">@{ws.username}</p>
                        <p className="text-xs text-zinc-300 max-w-md mx-auto mt-2 leading-relaxed px-4">
                            {ws.bio}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-1">
                        {["instagram", "youtube", "twitter", "linkedin"].map((net) => (
                            <a
                                key={net}
                                href="#"
                                className="h-9 w-9 rounded-xl bg-zinc-900 border border-white/10 hover:border-indigo-500 hover:text-white text-zinc-400 flex items-center justify-center transition-all shadow-sm"
                            >
                                <span className="text-[11px] font-bold uppercase">{net[0]}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Offerings list */}
                <div className="space-y-4 pt-4">
                    {/* Products */}
                    {products.map((prod) => (
                        <div
                            key={prod.id}
                            onClick={() => {
                                setSelectedProductModal(prod);
                                setCheckoutComplete(false);
                            }}
                            className="glass-panel glass-panel-hover p-4 rounded-2xl border border-white/10 flex items-center gap-4 cursor-pointer group shadow-lg"
                        >
                            <div className="h-16 w-16 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/10">
                                <img
                                    src={prod.cover_image}
                                    alt={prod.name}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <Badge variant="default" className="text-[9px] uppercase px-1.5 py-0">
                                        {prod.category}
                                    </Badge>
                                    <span className="text-xs font-bold text-emerald-400">
                                        ${prod.price?.toFixed(2)}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-white truncate mt-1 group-hover:text-indigo-300 transition-colors">
                                    {prod.name}
                                </h3>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{prod.description}</p>
                            </div>
                        </div>
                    ))}

                    {/* Courses */}
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => {
                                setSelectedProductModal({ ...course, isCourse: true });
                                setCheckoutComplete(false);
                            }}
                            className="glass-panel glass-panel-hover p-4 rounded-2xl border border-white/10 flex items-center gap-4 cursor-pointer group shadow-lg"
                        >
                            <div className="h-16 w-16 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/10">
                                <img
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <Badge variant="gradient" className="text-[9px] uppercase px-1.5 py-0">
                                        Video Course
                                    </Badge>
                                    <span className="text-xs font-bold text-emerald-400">
                                        ${course.price?.toFixed(2)}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-white truncate mt-1 group-hover:text-indigo-300 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{course.subtitle}</p>
                            </div>
                        </div>
                    ))}

                    {/* Booking services */}
                    {bookings.map((svc) => (
                        <div
                            key={svc.id}
                            onClick={() => {
                                setSelectedBookingModal(svc);
                                setCheckoutComplete(false);
                            }}
                            className="glass-panel glass-panel-hover p-4 rounded-2xl border border-white/10 flex items-center gap-4 cursor-pointer group shadow-lg"
                        >
                            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-purple-300 font-semibold">
                                        {svc.duration_minutes} Mins • Google Meet / Jitsi
                                    </span>
                                    <span className="text-xs font-bold text-emerald-400">
                                        ${svc.price?.toFixed(2)}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-white truncate mt-0.5 group-hover:text-indigo-300">
                                    {svc.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                    {/* Email Newsletter */}
                    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                <Mail className="h-4 w-4" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white">Join 15,000+ Creator Insiders</h4>
                                <p className="text-[11px] text-zinc-400">
                                    Weekly growth formulas & monetization breakdowns.
                                </p>
                            </div>
                        </div>
                        {newsletterSuccess ? (
                            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                                <CheckCircle2 className="h-4 w-4" /> You're subscribed! Check your inbox.
                            </p>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                <Input
                                    type="email"
                                    required
                                    placeholder="Enter your email..."
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="h-10 text-xs bg-zinc-900/90"
                                />
                                <Button type="submit" variant="gradient" className="h-10 text-xs shrink-0">
                                    Subscribe
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="pt-8 pb-12 text-center text-xs text-zinc-600">
                    <Link href="/" className="inline-flex items-center gap-1.5 hover:text-zinc-400 transition-colors">
                        <span>Powered by</span>
                        <span className="font-bold text-zinc-300">Outsyra</span>
                    </Link>
                </div>
            </div>

            {/* Product Checkout Modal */}
            {selectedProductModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95">
                        {!checkoutComplete ? (
                            <>
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <Badge variant="default" className="text-[10px]">
                                        Secure Instant Checkout
                                    </Badge>
                                    <button
                                        onClick={() => setSelectedProductModal(null)}
                                        className="text-xs text-zinc-500 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-white">
                                        {selectedProductModal.name || selectedProductModal.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {selectedProductModal.description}
                                    </p>
                                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                                        <span className="text-xs text-zinc-300 font-medium">Total Amount Due:</span>
                                        <span className="text-lg font-bold text-emerald-400">
                                            ${selectedProductModal.price?.toFixed(2)} USD
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Input placeholder="Your Name" defaultValue="Alex Taylor" className="text-xs" />
                                    <Input
                                        type="email"
                                        placeholder="Your Email (for instant delivery)"
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
                                        Pay ${selectedProductModal.price?.toFixed(2)} & Download Instantly
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
                                <h3 className="text-lg font-bold text-white">Payment Successful! 🎉</h3>
                                <p className="text-xs text-zinc-400">
                                    Your purchase of{" "}
                                    <strong className="text-white">
                                        {selectedProductModal.name || selectedProductModal.title}
                                    </strong>{" "}
                                    has been recorded in the database.
                                </p>
                                <a
                                    href={`/api/products/${selectedProductModal.id || "prod-001"}/download`}
                                    className="block"
                                >
                                    <Button variant="gradient" className="w-full gap-2 text-xs">
                                        <Download className="h-4 w-4" />
                                        Download Your Files (Signed URL)
                                    </Button>
                                </a>
                                <Button
                                    variant="ghost"
                                    className="text-xs text-zinc-400"
                                    onClick={() => setSelectedProductModal(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
