"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StandalonePricingPage() {
    const [billingCycle, setBillingCycle] = useState("monthly");

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
            <Navbar />
            <main className="py-20 px-6 max-w-7xl mx-auto space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Scale Without Friction</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Plans Built for Every Stage of Creator Growth
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl mx-auto">
                        0% transaction fees on paid plans. Keep 100% of what you earn with direct Stripe/Razorpay payouts.
                    </p>

                    <div className="mt-8 inline-flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-white/5">
                        <button
                            type="button"
                            onClick={() => setBillingCycle("monthly")}
                            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                                billingCycle === "monthly"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            type="button"
                            onClick={() => setBillingCycle("yearly")}
                            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                                billingCycle === "yearly"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <span>Yearly Billing</span>
                            <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {/* Free Starter */}
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Free Starter</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Get your link-in-bio store online.</p>
                            </div>
                            <div>
                                <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">$0</span>
                                <span className="text-xs text-zinc-500"> / month</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>1 Link-in-Bio Store</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>3 Digital Products</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>1 Video Course (LMS)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>100 Email Subscribers</span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/signup">
                            <Button variant="outline" className="w-full text-xs">
                                Start Free
                            </Button>
                        </Link>
                    </div>

                    {/* Creator */}
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Creator</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">For active digital creators.</p>
                            </div>
                            <div>
                                <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                                    {billingCycle === "yearly" ? "$15" : "$19"}
                                </span>
                                <span className="text-xs text-zinc-500"> / month</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>Unlimited Products</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>5 Video Courses</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>Calendar & 1:1 Bookings</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>2,500 Subscribers</span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/signup?plan=creator">
                            <Button variant="outline" className="w-full text-xs">
                                Choose Creator
                            </Button>
                        </Link>
                    </div>

                    {/* Creator Pro */}
                    <div className="glass-card p-6 rounded-3xl border-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 relative flex flex-col justify-between space-y-6 shadow-xl">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Creator Pro</h3>
                                <Badge variant="gradient" className="text-[10px]">Popular</Badge>
                            </div>
                            <div>
                                <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                                    {billingCycle === "yearly" ? "$39" : "$49"}
                                </span>
                                <span className="text-xs text-zinc-500"> / month</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-200">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Unlimited Courses & LMS</span>
                                </li>
                                {/* <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Meta Instagram Auto-DMs</span>
                                </li> */}
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Google Calendar OAuth</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>10,000 Subscribers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Custom Domain (White-Label)</span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/signup?plan=pro">
                            <Button variant="gradient" className="w-full text-xs shadow-lg">
                                Start 14-Day Trial
                            </Button>
                        </Link>
                    </div>

                    {/* Business / Teams */}
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Business / Teams</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Multi-creator agencies & teams.</p>
                            </div>
                            <div>
                                <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                                    {billingCycle === "yearly" ? "$79" : "$99"}
                                </span>
                                <span className="text-xs text-zinc-500"> / month</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>Everything in Pro</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>5 Team Staff Seats</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>Unlimited Subscribers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>Dedicated API & Webhooks</span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/signup?plan=business">
                            <Button variant="outline" className="w-full text-xs">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
