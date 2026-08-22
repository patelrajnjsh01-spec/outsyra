"use client";
import React, { useState } from "react";
import { TrendingUp, Globe, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsDashboardPage() {
    const [range, setRange] = useState("30d");
    const funnelSteps = [
        { label: "1. Storefront Page Views", count: "18,450", percent: "100%" },
        { label: "2. Product & Course Clicks", count: "4,210", percent: "22.8%" },
        { label: "3. Checkout Initiated", count: "980", percent: "5.3%" },
        { label: "4. Completed Purchases", count: "324", percent: "1.76%" },
    ];
    const trafficSources = [
        { source: "Instagram (Bio + Story)", visitors: "10,240", share: "55.5%", rev: "$11,240" },
        { source: "YouTube (Description)", visitors: "4,120", share: "22.3%", rev: "$4,390" },
        { source: "Email Broadcasts", visitors: "2,480", share: "13.4%", rev: "$2,140" },
        { source: "Twitter / X", visitors: "1,110", share: "6.0%", rev: "$520" },
        { source: "Direct & Others", visitors: "500", share: "2.8%", rev: "$130" },
    ];

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Audience & Revenue Analytics"
                subtitle="Track real-time traffic, conversion funnels, and revenue metrics powered by Google Analytics (GA4) & PostHog."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <Card className="glass-panel border-white/5 p-6 space-y-2">
                        <span className="text-xs text-zinc-400">Total Store Views</span>
                        <p className="text-3xl font-bold text-white">18,450</p>
                        <span className="text-xs text-emerald-400 flex items-center font-medium">
                            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +34.2% this month
                        </span>
                    </Card>
                    <Card className="glass-panel border-white/5 p-6 space-y-2">
                        <span className="text-xs text-zinc-400">Checkout Conversion</span>
                        <p className="text-3xl font-bold text-white">4.2%</p>
                        <span className="text-xs text-indigo-400 font-medium">Above industry average (2.1%)</span>
                    </Card>
                    <Card className="glass-panel border-white/5 p-6 space-y-2">
                        <span className="text-xs text-zinc-400">Average Order Value</span>
                        <p className="text-3xl font-bold text-white">$56.80</p>
                        <span className="text-xs text-emerald-400 font-medium">+$8.40 vs last month</span>
                    </Card>
                    <Card className="glass-panel border-white/5 p-6 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-400">Google Analytics (GA4)</span>
                            <Badge variant="success" className="text-[10px]">Free Tier</Badge>
                        </div>
                        <p className="text-xl font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Connected
                        </p>
                        <span className="text-xs text-zinc-500">Events & conversions tracked</span>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass-panel border-white/5 p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <div>
                                <CardTitle className="text-base">E-Commerce Conversion Funnel</CardTitle>
                                <p className="text-xs text-zinc-400">Step-by-step visitor drop-off tracked via GA4 & PostHog</p>
                            </div>
                            <Badge variant="gradient" className="text-[10px]">Funnel</Badge>
                        </div>
                        <div className="space-y-4">
                            {funnelSteps.map((step, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold text-zinc-200">{step.label}</span>
                                        <span className="font-mono text-zinc-400">{step.count} ({step.percent})</span>
                                    </div>
                                    <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all"
                                            style={{ width: step.percent }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-panel border-white/5 p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <div>
                                <CardTitle className="text-base">Top Traffic Channels</CardTitle>
                                <p className="text-xs text-zinc-400">Where your paying customers originate</p>
                            </div>
                            <Badge variant="outline" className="text-[10px]">Sources</Badge>
                        </div>
                        <div className="divide-y divide-white/5 text-xs">
                            {trafficSources.map((src, i) => (
                                <div key={i} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <Globe className="h-4 w-4 text-indigo-400" />
                                        <div>
                                            <p className="font-semibold text-white">{src.source}</p>
                                            <p className="text-[11px] text-zinc-500">{src.visitors} visitors</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-emerald-400">{src.rev}</p>
                                        <span className="text-[10px] text-zinc-500">{src.share} traffic</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
