"use client";

import React, { useState, useEffect } from "react";
import {
    TrendingUp,
    Globe,
    MousePointerClick,
    Users,
    Eye,
    Percent,
    Smartphone,
    Monitor,
    Tablet,
    Calendar,
    Instagram,
    Youtube,
    Twitter,
    MessageCircle,
    ExternalLink,
    RefreshCw,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AnalyticsDashboardPage() {
    const [timeRange, setTimeRange] = useState("30d");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAnalytics() {
            setLoading(true);
            try {
                const res = await fetch("/api/analytics/track?workspace_id=ws-rajnish-001");
                if (res.ok) {
                    const data = await res.json();
                    if (data.events) {
                        setEvents(data.events);
                    }
                }
            } catch (err) {
                console.warn("Failed to fetch analytics:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, [timeRange]);

    const topLinks = [
        { title: "Creator Monetization Master Ebook", type: "Digital Product", clicks: 1842, ctr: "24.6%", trend: "+18%" },
        { title: "Full-Stack Creator Academy (Video Course)", type: "Video Course", clicks: 1120, ctr: "15.0%", trend: "+12%" },
        { title: "Book 1:1 30-Min Strategy Call", type: "Calendar Booking", clicks: 640, ctr: "8.5%", trend: "+32%" },
        { title: "Join 15,000+ Creator Insiders", type: "Email Opt-in", clicks: 520, ctr: "6.9%", trend: "+5%" },
        { title: "Buy Me a Coffee (Tip Jar)", type: "Support", clicks: 210, ctr: "2.8%", trend: "+14%" },
    ];

    const trafficSources = [
        { source: "Instagram (Bio & Stories)", icon: Instagram, visitors: "12,480", share: "54.2%", clicks: "3,420" },
        { source: "TikTok (Bio Link)", icon: Globe, visitors: "4,620", share: "20.1%", clicks: "1,180" },
        { source: "YouTube (Description)", icon: Youtube, visitors: "3,210", share: "13.9%", clicks: "890" },
        { source: "WhatsApp / Direct Messages", icon: MessageCircle, visitors: "1,540", share: "6.7%", clicks: "410" },
        { source: "Twitter / X", icon: Twitter, visitors: "1,180", share: "5.1%", clicks: "310" },
    ];

    const deviceBreakdown = [
        { label: "Mobile (iOS & Android)", icon: Smartphone, percent: "78.4%", count: "18,040" },
        { label: "Desktop & Laptops", icon: Monitor, percent: "17.8%", count: "4,090" },
        { label: "Tablets (iPads)", icon: Tablet, percent: "3.8%", count: "880" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Audience & Link-in-Bio Analytics"
                subtitle="Track real-time page views, link clicks, device types, and traffic conversion funnels."
            />

            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                {/* Time Range Selector */}
                <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-500">Date Range:</span>
                        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/5">
                            {[
                                { id: "7d", label: "Last 7 Days" },
                                { id: "30d", label: "Last 30 Days" },
                                { id: "90d", label: "Last 90 Days" },
                                { id: "all", label: "All-Time" },
                            ].map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setTimeRange(r.id)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                        timeRange === r.id
                                            ? "bg-indigo-600 text-white shadow-xs"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Event Stream
                        </span>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Page Views</span>
                            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                                <Eye className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">23,010</p>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center font-bold">
                            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +28.4% vs last period
                        </span>
                    </Card>

                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Unique Visitors</span>
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                                <Users className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">16,840</p>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center font-bold">
                            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +19.2% new discovery
                        </span>
                    </Card>

                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Link Clicks</span>
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                                <MousePointerClick className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">6,210</p>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center font-bold">
                            <TrendingUp className="h-3.5 w-3.5 mr-1" /> +34.5% click volume
                        </span>
                    </Card>

                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Click-Through Rate (CTR)</span>
                            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-500">
                                <Percent className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">26.9%</p>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                            Top 5% creator benchmark
                        </span>
                    </Card>
                </div>

                {/* Timeline Chart Mock */}
                <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-white/5 pb-3">
                        <div>
                            <CardTitle className="text-base">Views & Click Activity Over Time</CardTitle>
                            <p className="text-xs text-zinc-500">Daily performance metrics across all link channels</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                            <span className="flex items-center gap-1.5 text-indigo-500">
                                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Views
                            </span>
                            <span className="flex items-center gap-1.5 text-emerald-500">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Clicks
                            </span>
                        </div>
                    </div>

                    {/* Visual Activity Bars */}
                    <div className="h-48 flex items-end justify-between gap-2 pt-6">
                        {[
                            { day: "Mon", views: 65, clicks: 35 },
                            { day: "Tue", views: 78, clicks: 42 },
                            { day: "Wed", views: 90, clicks: 55 },
                            { day: "Thu", views: 82, clicks: 48 },
                            { day: "Fri", views: 95, clicks: 68 },
                            { day: "Sat", views: 100, clicks: 75 },
                            { day: "Sun", views: 88, clicks: 60 },
                        ].map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[36px] flex gap-1 items-end h-full">
                                    <div
                                        className="flex-1 bg-indigo-500/80 rounded-t-lg group-hover:bg-indigo-500 transition-all"
                                        style={{ height: `${d.views}%` }}
                                    />
                                    <div
                                        className="flex-1 bg-emerald-500/80 rounded-t-lg group-hover:bg-emerald-500 transition-all"
                                        style={{ height: `${d.clicks}%` }}
                                    />
                                </div>
                                <span className="text-[11px] font-mono text-zinc-400">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Top Links & Traffic Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Links */}
                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
                            <div>
                                <CardTitle className="text-base">Top Performing Links & Offers</CardTitle>
                                <p className="text-xs text-zinc-500">Ranked by total click volume and CTR</p>
                            </div>
                            <Badge variant="gradient" className="text-[10px]">Top Links</Badge>
                        </div>

                        <div className="divide-y divide-zinc-200/60 dark:divide-white/5 text-xs">
                            {topLinks.map((link, i) => (
                                <div key={i} className="py-3 flex items-center justify-between">
                                    <div className="min-w-0 flex-1 pr-3">
                                        <p className="font-bold text-zinc-900 dark:text-white truncate">
                                            {link.title}
                                        </p>
                                        <span className="text-[10px] text-zinc-500">{link.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold font-mono text-zinc-900 dark:text-white">
                                            {link.clicks} clicks
                                        </p>
                                        <span className="text-[10px] text-emerald-500 font-semibold">{link.ctr} CTR</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Traffic Sources */}
                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
                            <div>
                                <CardTitle className="text-base">Referral & Traffic Channels</CardTitle>
                                <p className="text-xs text-zinc-500">Where your audience lands from</p>
                            </div>
                            <Badge variant="outline" className="text-[10px]">Channels</Badge>
                        </div>

                        <div className="divide-y divide-zinc-200/60 dark:divide-white/5 text-xs">
                            {trafficSources.map((src, i) => {
                                const Icon = src.icon;
                                return (
                                    <div key={i} className="py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-zinc-900 dark:text-white">{src.source}</p>
                                                <span className="text-[10px] text-zinc-500">{src.share} traffic share</span>
                                            </div>
                                        </div>
                                        <div className="text-right font-mono">
                                            <p className="font-bold text-zinc-900 dark:text-white">{src.visitors}</p>
                                            <span className="text-[10px] text-zinc-400">{src.clicks} clicks</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Device Breakdown */}
                <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
                        <div>
                            <CardTitle className="text-base">Device Breakdown</CardTitle>
                            <p className="text-xs text-zinc-500">Platform distribution across mobile, desktop, and tablets</p>
                        </div>
                        <Badge variant="outline" className="text-[10px]">Devices</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {deviceBreakdown.map((dev, i) => {
                            const Icon = dev.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{dev.label}</span>
                                        <Icon className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">{dev.percent}</p>
                                    <span className="text-[10px] text-zinc-500">{dev.count} sessions</span>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </main>
        </div>
    );
}
