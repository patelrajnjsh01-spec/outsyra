"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Store,
    Package,
    GraduationCap,
    Calendar,
    Instagram,
    BarChart3,
    CheckCircle2,
    Play,
    Zap,
    Download,
    Video,
    Send,
    TrendingUp,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function InteractiveDemo() {
    const [activeTab, setActiveTab] = useState("store");

    const tabs = [
        { id: "store", label: "Storefront", icon: Store },
        { id: "products", label: "Digital Products", icon: Package },
        { id: "courses", label: "Course LMS", icon: GraduationCap },
        { id: "bookings", label: "1:1 Coaching", icon: Calendar },
        { id: "automation", label: "Instagram DM", icon: Instagram },
        { id: "analytics", label: "Revenue Analytics", icon: BarChart3 },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* Tabs Bar */}
            <div className="flex items-center justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
                <div className="p-1 rounded-2xl bg-zinc-200/80 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-white/10 flex items-center gap-1.5 shadow-inner">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    isActive
                                        ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-white shadow-sm border border-zinc-200 dark:border-white/10"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                }`}
                            >
                                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Interactive Showcase Screen */}
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#0f1117]/85 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {activeTab === "store" && (
                        <motion.div
                            key="store"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-md mx-auto space-y-4 text-center"
                        >
                            <div className="relative inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                                    alt="Creator Avatar"
                                    className="h-20 w-20 rounded-full object-cover mx-auto ring-4 ring-indigo-500/30 shadow-lg"
                                />
                                <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                                    <CheckCircle2 className="h-3 w-3 text-white" />
                                </span>
                            </div>
                            <div>
                                <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">Rajnish Sharma</h4>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">@rajnish • 48.2k Followers</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                                    Creator OS formulas, premium Notion systems & video masterclasses.
                                </p>
                            </div>
                            <div className="space-y-2.5 pt-2">
                                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                                            📘
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-900 dark:text-white">Creator OS Blueprint (PDF)</p>
                                            <p className="text-[10px] text-zinc-500">Instant Download • 120 Pages</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">$39.00</span>
                                </div>
                                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                                            🎓
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-900 dark:text-white">Full-Stack Creator Academy</p>
                                            <p className="text-[10px] text-zinc-500">8 Modules • 32 Video Lessons</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">$199.00</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "products" && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-xl space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Protected Asset File Delivery</h4>
                                    <p className="text-xs text-zinc-500">Upload securely to Supabase Storage with signed expiry download links.</p>
                                </div>
                                <Badge variant="success" className="text-[10px]">Active Vault</Badge>
                            </div>
                            <div className="p-6 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 text-center space-y-2">
                                <div className="h-10 w-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                                    <Download className="h-5 w-5" />
                                </div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Creator-System-v2.zip (18.4 MB)</p>
                                <p className="text-[10px] text-zinc-500">Uploaded ✓ • 1-Click Customer Access Token Generated</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2.5 text-center pt-2">
                                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 uppercase font-semibold">Total Downloads</p>
                                    <p className="text-sm font-black text-zinc-900 dark:text-white">1,420</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 uppercase font-semibold">Gross Sales</p>
                                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">$55,380</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 uppercase font-semibold">Refund Rate</p>
                                    <p className="text-sm font-black text-indigo-500">0.2%</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "courses" && (
                        <motion.div
                            key="courses"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-xl space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">LMS Video Player & Curriculum</h4>
                                    <p className="text-xs text-zinc-500">Structured lessons, quiz builder, and certificate generator.</p>
                                </div>
                                <Badge variant="default" className="text-[10px]">Module 3 / 8</Badge>
                            </div>
                            <div className="aspect-video rounded-2xl bg-zinc-950 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 to-purple-900/30 opacity-70" />
                                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white relative z-10 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                    <Play className="h-5 w-5 fill-white ml-0.5" />
                                </div>
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                                    <span className="font-semibold">Lesson 3.2: High-Converting Storefront Architecture</span>
                                    <span className="text-[10px] opacity-75">14:20 Mins</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "bookings" && (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-lg space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">1:1 Consultation & Video Integration</h4>
                                    <p className="text-xs text-zinc-500">Instant meeting links via Google Meet or Jitsi (with prejoin bypass).</p>
                                </div>
                                <Badge variant="success" className="text-[10px]">Confirmed</Badge>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                                            <Video className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-900 dark:text-white">60-Min Growth Strategy Session</p>
                                            <p className="text-[10px] text-zinc-500">Tomorrow at 3:00 PM EST with Alex Vance</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">+$250.00</span>
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <Button variant="default" size="sm" className="flex-1 text-xs gap-1.5 bg-blue-600 hover:bg-blue-500">
                                        Launch Google Meet
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 text-xs gap-1.5">
                                        Launch Jitsi (Direct)
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "automation" && (
                        <motion.div
                            key="automation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-lg space-y-3"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Meta Instagram Comment-to-DM Trigger</h4>
                                <Badge variant="gradient" className="text-[10px]">Rule Active</Badge>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-2.5">
                                    <span className="font-bold text-pink-600 dark:text-pink-400">Follower Comments:</span>
                                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border font-mono text-[11px] font-bold">"EBOOK"</span>
                                </div>
                                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2.5">
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Outsyra Bot Sends DM:</span>
                                    <span className="text-zinc-700 dark:text-zinc-300 truncate">"Hey! Here is your exclusive 20% discount checkout link..."</span>
                                </div>
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Result: 1-Click Stripe / Razorpay Purchase</span>
                                    <span className="font-black text-emerald-600 dark:text-emerald-400">+$39.00</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "analytics" && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-xl space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Real-Time Revenue Analytics</h4>
                                    <p className="text-xs text-zinc-500">Live transaction stream with multi-channel conversion tracking.</p>
                                </div>
                                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <TrendingUp className="h-3.5 w-3.5" /> +34.8% this month
                                </span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">Total Revenue</p>
                                    <p className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">$24,850</p>
                                </div>
                                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">Paid Orders</p>
                                    <p className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">412</p>
                                </div>
                                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">Conversion</p>
                                    <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">8.4%</p>
                                </div>
                                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-white/5">
                                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">Lead Subs</p>
                                    <p className="text-sm sm:text-base font-black text-indigo-500">2,890</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
