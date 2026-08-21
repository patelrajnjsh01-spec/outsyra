"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, ShoppingCart, Eye, TrendingUp, ArrowRight, Package, GraduationCap, Calendar, Mail, Zap, Instagram, Sparkles, ExternalLink, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialOrders } from "@/lib/supabase/mock-db";
export default function DashboardOverviewPage() {
    const [timeRange, setTimeRange] = useState("30d");
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
            value: "324",
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
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Creator Dashboard", subtitle: "Live overview of your digital sales, courses, bookings, and audience growth." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsx("div", { className: "relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-zinc-950 p-6 md:p-8", children: _jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300", children: [_jsx(Sparkles, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Outsyra Creator OS Active" })] }), _jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white tracking-tight", children: "Good afternoon, Rajnish! \uD83D\uDE80" }), _jsxs("p", { className: "text-sm text-zinc-300 max-w-xl", children: ["Your store generated ", _jsx("span", { className: "text-emerald-400 font-semibold", children: "$337.00" }), " today. Your Instagram automation for \"EBOOK\" converted 8 new customers."] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(Link, { href: "/public/rajnish", target: "_blank", children: _jsxs(Button, { variant: "outline", className: "gap-2 text-xs border-white/10 bg-white/5", children: [_jsx(Eye, { className: "h-4 w-4" }), "View Public Bio", _jsx(ExternalLink, { className: "h-3 w-3 opacity-60" })] }) }), _jsx(Link, { href: "/store", children: _jsxs(Button, { variant: "gradient", className: "gap-2 text-xs shadow-md", children: [_jsx(Zap, { className: "h-4 w-4" }), "Customize Store"] }) })] })] }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: statCards.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-medium text-zinc-400", children: stat.title }), _jsx("div", { className: "h-8 w-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400", children: _jsx(Icon, { className: "h-4 w-4" }) })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-white tracking-tight", children: stat.value }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("span", { className: "text-xs font-semibold text-emerald-400 flex items-center", children: [_jsx(TrendingUp, { className: "h-3 w-3 mr-0.5" }), stat.change] }), _jsx("span", { className: "text-[11px] text-zinc-500", children: stat.subtext })] })] })] }, idx));
                        }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-[11px]", children: "Quick Studio Shortcuts" }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
                                    { label: "New Product", href: "/products", icon: Package, color: "text-emerald-400" },
                                    { label: "New Course", href: "/courses", icon: GraduationCap, color: "text-indigo-400" },
                                    { label: "New Booking", href: "/calendar", icon: Calendar, color: "text-purple-400" },
                                    { label: "Broadcast Email", href: "/email", icon: Mail, color: "text-pink-400" },
                                    { label: "IG Automation", href: "/instagram", icon: Instagram, color: "text-amber-400" },
                                    { label: "Store Customizer", href: "/store", icon: Sparkles, color: "text-cyan-400" },
                                ].map((action, i) => {
                                    const Icon = action.icon;
                                    return (_jsxs(Link, { href: action.href, className: "glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 hover:border-indigo-500/30 transition-all group", children: [_jsx("div", { className: `h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`, children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsx("span", { className: "text-xs font-medium text-zinc-200", children: action.label })] }, i));
                                }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 glass-panel border-white/5", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: "Revenue & Sales Velocity" }), _jsx("p", { className: "text-xs text-zinc-400 mt-1", children: "Aggregated sales across Digital Products, Courses & Coaching" })] }), _jsx("div", { className: "flex gap-1 bg-zinc-900 p-1 rounded-xl border border-white/5 text-xs", children: ["7d", "30d", "90d", "1y"].map((r) => (_jsx("button", { onClick: () => setTimeRange(r), className: `px-2.5 py-1 rounded-lg font-medium transition-all ${timeRange === r ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`, children: r }, r))) })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "h-64 flex items-end gap-3 pt-8 pb-2 px-2 border-b border-white/5", children: [
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
                                                ].map((bar, idx) => (_jsxs("div", { className: "flex-1 flex flex-col items-center gap-2 group relative", children: [_jsx("div", { className: "absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-white/10 text-[10px] text-white py-0.5 px-2 rounded-md whitespace-nowrap pointer-events-none z-20", children: bar.rev }), _jsx("div", { className: "w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-pink-500 opacity-80 group-hover:opacity-100 transition-all", style: { height: `${(bar.val / 130) * 100}%` } }), _jsx("span", { className: "text-[10px] text-zinc-500", children: bar.day })] }, idx))) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 text-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-zinc-400", children: "Digital Products" }), _jsx("p", { className: "text-sm font-semibold text-white mt-0.5", children: "$8,240.00 (45%)" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-zinc-400", children: "Video Courses" }), _jsx("p", { className: "text-sm font-semibold text-white mt-0.5", children: "$6,580.00 (36%)" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-zinc-400", children: "1:1 Coaching" }), _jsx("p", { className: "text-sm font-semibold text-white mt-0.5", children: "$3,600.00 (19%)" })] })] })] })] }), _jsxs(Card, { className: "glass-panel border-white/5 flex flex-col justify-between", children: [_jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-base", children: "Recent Activity" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Realtime customer actions" })] }), _jsx(Badge, { variant: "default", className: "text-[10px]", children: "Realtime" })] }), _jsx(CardContent, { className: "space-y-4 flex-1 overflow-y-auto max-h-[340px]", children: initialOrders.map((order) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 transition-colors", children: [_jsxs("div", { className: "space-y-0.5 min-w-0 flex-1 pr-2", children: [_jsx("p", { className: "text-xs font-medium text-white truncate", children: order.customer_name }), _jsx("p", { className: "text-[11px] text-zinc-400 truncate", children: order.item_name })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-xs font-bold text-emerald-400", children: ["+$", order.amount.toFixed(2)] }), _jsx("span", { className: "text-[10px] text-zinc-500 uppercase", children: order.payment_provider })] })] }, order.id))) }), _jsx("div", { className: "p-4 border-t border-white/5", children: _jsx(Link, { href: "/analytics", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "w-full text-xs text-indigo-400 hover:text-indigo-300", children: ["View Full Transaction Logs", _jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1.5" })] }) }) })] })] })] })] }));
}
