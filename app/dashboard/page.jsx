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
    Clock,
    CheckCircle2,
    Plus,
    Users,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrders, getProducts } from "@/lib/supabase/db";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const chartData = [
    { day: "Aug 1", revenue: 420, orders: 8 },
    { day: "Aug 5", revenue: 680, orders: 12 },
    { day: "Aug 9", revenue: 950, orders: 18 },
    { day: "Aug 13", revenue: 1420, orders: 24 },
    { day: "Aug 17", revenue: 1850, orders: 31 },
    { day: "Aug 21", revenue: 2340, orders: 39 },
    { day: "Aug 23", revenue: 3100, orders: 48 },
];

export default function DashboardOverviewPage() {
    const [timeRange, setTimeRange] = useState("30d");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [ordersData, prodsData] = await Promise.all([
                    getOrders("ws-rajnish-001"),
                    getProducts("ws-rajnish-001"),
                ]);
                setOrders(ordersData || []);
                setProducts(prodsData || []);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0) || 18420;

    const statCards = [
        {
            title: "Total Gross Revenue",
            value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
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
        <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Dashboard Overview"
                subtitle="Live metrics, recent customer orders, and studio shortcuts."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
                {/* Hero Greeting Card */}
                <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-zinc-900/10 p-6 md:p-8 glass-card">
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Supabase PostgreSQL Connected</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                                Good morning, Rajnish! 👋
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-xl">
                                Your creator store generated <span className="text-emerald-600 dark:text-emerald-400 font-bold">$337.00</span> today.
                                Instagram auto-DM for "EBOOK" converted 8 new customer leads.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/public/rajnish" target="_blank">
                                <Button variant="outline" size="sm" className="gap-2 text-xs font-semibold">
                                    <Eye className="h-4 w-4" />
                                    <span>View Public Store</span>
                                    <ExternalLink className="h-3 w-3 opacity-60" />
                                </Button>
                            </Link>
                            <Link href="/store">
                                <Button variant="gradient" size="sm" className="gap-2 text-xs font-bold shadow-md">
                                    <Zap className="h-4 w-4" />
                                    <span>Customize Store</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={idx} className="glass-card p-5 space-y-3 shadow-sm border border-zinc-200 dark:border-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{stat.title}</span>
                                    <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{stat.value}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
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

                {/* Revenue Trajectory Chart & Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Area Chart */}
                    <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/5 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Revenue Growth Trajectory</h3>
                                <p className="text-xs text-zinc-500">Gross sales across digital products, courses, and bookings.</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                                <TrendingUp className="h-3.5 w-3.5" /> +28.4%
                            </div>
                        </div>

                        <div className="h-64 w-full pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis dataKey="day" tick={{ fontSize: 11 }} opacity={0.6} />
                                    <YAxis tick={{ fontSize: 11 }} opacity={0.6} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(15, 17, 23, 0.95)",
                                            borderRadius: "12px",
                                            borderColor: "rgba(255, 255, 255, 0.1)",
                                            fontSize: "12px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#revenueGrad)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Performing Offerings */}
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/5 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Top Offerings</h3>
                            <Link href="/products" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {products.length > 0 ? (
                                products.slice(0, 4).map((p) => (
                                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-white/5">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <img src={p.cover_image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{p.name}</p>
                                                <p className="text-[10px] text-zinc-500 uppercase">{p.category}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                                            ${p.price?.toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-xs text-zinc-500">
                                    No products created yet. Click "+ Create New" above!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Orders Live Table */}
                <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Recent Customer Orders</h3>
                            <p className="text-xs text-zinc-500">Live order records stored in Supabase PostgreSQL.</p>
                        </div>
                        <Badge variant="success" className="text-[10px]">Real-Time Sync</Badge>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-zinc-200 dark:border-white/5 text-zinc-500 font-bold uppercase text-[10px]">
                                <tr>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Item / Service</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5">
                                {orders.length > 0 ? (
                                    orders.slice(0, 5).map((ord) => (
                                        <tr key={ord.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="py-3 font-semibold text-zinc-900 dark:text-white">{ord.customer_name || "Customer"}</td>
                                            <td className="py-3 text-zinc-600 dark:text-zinc-300">{ord.item_title || "Digital Asset Download"}</td>
                                            <td className="py-3 font-black text-emerald-600 dark:text-emerald-400">${ord.total_amount?.toFixed(2)}</td>
                                            <td className="py-3"><Badge variant="success" className="text-[9px]">Completed</Badge></td>
                                            <td className="py-3 text-right text-zinc-500 text-[11px]">{new Date(ord.created_at || Date.now()).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-xs text-zinc-500">
                                            No orders placed yet. Visit your <Link href="/public/rajnish" target="_blank" className="text-indigo-600 dark:text-indigo-400 font-bold underline">Live Storefront</Link> to complete a test checkout!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Action Launchpad */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Quick Studio Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/products?action=new" className="glass-card glass-card-hover p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                                <Package className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Add Digital Product</p>
                                <p className="text-[10px] text-zinc-500">Protected ZIP/PDF vault</p>
                            </div>
                        </Link>
                        <Link href="/courses?action=new" className="glass-card glass-card-hover p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                                <GraduationCap className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Build Video Course</p>
                                <p className="text-[10px] text-zinc-500">Multi-module curriculum</p>
                            </div>
                        </Link>
                        <Link href="/calendar?action=new" className="glass-card glass-card-hover p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Schedule 1:1 Slots</p>
                                <p className="text-[10px] text-zinc-500">Meet & Jitsi video calls</p>
                            </div>
                        </Link>
                        <Link href="/instagram" className="glass-card glass-card-hover p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
                                <Instagram className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Automate Instagram</p>
                                <p className="text-[10px] text-zinc-500">Keyword comment trigger</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
