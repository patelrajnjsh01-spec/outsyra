"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    DollarSign,
    ShoppingCart,
    Eye,
    TrendingUp,
    ArrowRight,
    Package,
    GraduationCap,
    Calendar,
    Mail,
    Zap,
    Instagram,
    Sparkles,
    ExternalLink,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrders } from "@/lib/supabase/db";

export default function DashboardOverviewPage() {
    const [timeRange, setTimeRange] = useState("30d");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardOrders() {
            try {
                const data = await getOrders("ws-rajnish-001");
                setOrders(data || []);
            } catch (err) {
                console.error("Failed to load dashboard orders", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardOrders();
    }, []);

    const statCards = [
        {
            title: "Total Gross Revenue",
            value: "$18,420.00",
            change: "+28.4%",
            isPositive: true,
            icon: DollarSign,
            subtext: "vs. previous 30 days",
        },
        {
            title: "Completed Orders",
            value: `${orders.length || 324}`,
            change: "+19.2%",
            isPositive: true,
            icon: ShoppingCart,
            subtext: "Avg order value $56.80",
        },
        {
            title: "Storefront Visitors",
            value: "18,450",
            change: "+41.0%",
            isPositive: true,
            icon: Eye,
            subtext: "4.2% checkout conversion",
        },
        {
            title: "Email Subscribers",
            value: "1,240",
            change: "+84 new",
            isPositive: true,
            icon: Mail,
            subtext: "46.8% avg open rate",
        },
    ];

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Creator Dashboard (Supabase PostgreSQL)"
                subtitle="Live overview of your digital sales, courses, bookings, and audience growth."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                {/* Hero Greeting Banner */}
                <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-zinc-950 p-6 md:p-8">
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Supabase PostgreSQL Connected</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                Good afternoon, Rajnish! 🚀
                            </h2>
                            <p className="text-sm text-zinc-300 max-w-xl">
                                Your store generated <span className="text-emerald-400 font-semibold">$337.00</span> today.
                                Your Instagram automation for "EBOOK" converted 8 new customers.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/public/rajnish" target="_blank">
                                <Button variant="outline" className="gap-2 text-xs border-white/10 bg-white/5">
                                    <Eye className="h-4 w-4" />
                                    View Public Bio
                                    <ExternalLink className="h-3 w-3 opacity-60" />
                                </Button>
                            </Link>
                            <Link href="/store">
                                <Button variant="gradient" className="gap-2 text-xs shadow-md">
                                    <Zap className="h-4 w-4" />
                                    Customize Store
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={idx} className="glass-panel border-white/5 p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-zinc-400">{stat.title}</span>
                                    <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-semibold text-emerald-400 flex items-center">
                                            <TrendingUp className="h-3 w-3 mr-0.5" />
                                            {stat.change}
                                        </span>
                                        <span className="text-[11px] text-zinc-500">{stat.subtext}</span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Studio Shortcuts */}
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-[11px]">
                        Quick Studio Shortcuts
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { label: "New Product", href: "/products", icon: Package, color: "text-emerald-400" },
                            { label: "New Course", href: "/courses", icon: GraduationCap, color: "text-indigo-400" },
                            { label: "New Booking", href: "/calendar", icon: Calendar, color: "text-purple-400" },
                            { label: "Broadcast Email", href: "/email", icon: Mail, color: "text-pink-400" },
                            { label: "IG Automation", href: "/instagram", icon: Instagram, color: "text-amber-400" },
                            { label: "Store Customizer", href: "/store", icon: Sparkles, color: "text-cyan-400" },
                        ].map((action, i) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 hover:border-indigo-500/30 transition-all group"
                                >
                                    <div
                                        className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-200">{action.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Revenue Velocity & Recent Orders Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 glass-panel border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle className="text-base">Revenue & Sales Velocity</CardTitle>
                                <p className="text-xs text-zinc-400 mt-1">
                                    Aggregated sales across Digital Products, Courses & Coaching
                                </p>
                            </div>
                            <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl border border-white/5 text-xs">
                                {["7d", "30d", "90d", "1y"].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setTimeRange(r)}
                                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                                            timeRange === r ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-end gap-3 pt-8 pb-2 px-2 border-b border-white/5">
                                {[
                                    { day: "Mon", val: 45, rev: "$380" },
                                    { day: "Tue", val: 65, rev: "$520" },
                                    { day: "Wed", val: 35, rev: "$290" },
                                    { day: "Thu", val: 85, rev: "$710" },
                                    { day: "Fri", val: 95, rev: "$890" },
                                    { day: "Sat", val: 75, rev: "$640" },
                                    { day: "Sun", val: 60, rev: "$490" },
                                    { day: "Mon", val: 80, rev: "$690" },
                                    { day: "Tue", val: 100, rev: "$980" },
                                    { day: "Wed", val: 90, rev: "$840" },
                                    { day: "Thu", val: 110, rev: "$1,120" },
                                    { day: "Fri", val: 125, rev: "$1,340" },
                                ].map((bar, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                                        <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-white/10 text-[10px] text-white py-0.5 px-2 rounded-md whitespace-nowrap pointer-events-none z-20">
                                            {bar.rev}
                                        </div>
                                        <div
                                            className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-pink-500 opacity-80 group-hover:opacity-100 transition-all"
                                            style={{ height: `${(bar.val / 130) * 100}%` }}
                                        />
                                        <span className="text-[10px] text-zinc-500">{bar.day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                                <div>
                                    <p className="text-[11px] text-zinc-400">Digital Products</p>
                                    <p className="text-sm font-semibold text-white mt-0.5">$8,240.00 (45%)</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-zinc-400">Video Courses</p>
                                    <p className="text-sm font-semibold text-white mt-0.5">$6,580.00 (36%)</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-zinc-400">1:1 Coaching</p>
                                    <p className="text-sm font-semibold text-white mt-0.5">$3,600.00 (19%)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel border-white/5 flex flex-col justify-between">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Recent Orders</CardTitle>
                                <p className="text-xs text-zinc-400">Live PostgreSQL customer orders</p>
                            </div>
                            <Badge variant="default" className="text-[10px]">
                                Realtime
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 overflow-y-auto max-h-[340px]">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 transition-colors"
                                >
                                    <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                                        <p className="text-xs font-medium text-white truncate">{order.customer_name}</p>
                                        <p className="text-[11px] text-zinc-400 truncate">
                                            {order.item_name || order.item_title}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-emerald-400">
                                            +${(order.amount || order.total_amount || 0).toFixed(2)}
                                        </p>
                                        <span className="text-[10px] text-zinc-500 uppercase">
                                            {order.payment_provider || "stripe"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <div className="p-4 border-t border-white/5">
                            <Link href="/analytics">
                                <Button variant="ghost" size="sm" className="w-full text-xs text-indigo-400 hover:text-indigo-300">
                                    View Full Transaction Logs
                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
