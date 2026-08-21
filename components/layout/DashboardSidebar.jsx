"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, Package, GraduationCap, Calendar, CalendarCheck, Video, Instagram, Mail, BarChart3, Palette, Users, Settings, CreditCard, ShieldAlert, ExternalLink, Sparkles, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
const navItems = [
    { group: "Core Tools", items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { title: "Link-in-Bio Store", href: "/store", icon: Store, badge: "Live" },
            { title: "Digital Products", href: "/products", icon: Package },
            { title: "Course Builder (LMS)", href: "/courses", icon: GraduationCap },
        ] },
    { group: "Client Bookings", items: [
            { title: "Calendar & Schedule", href: "/calendar", icon: Calendar },
            { title: "Bookings", href: "/bookings", icon: CalendarCheck },
            { title: "1:1 Coaching", href: "/coaching", icon: Video },
        ] },
    { group: "Growth & Audience", items: [
            { title: "Instagram Automation", href: "/instagram", icon: Instagram, badge: "Meta" },
            { title: "Email & Newsletter", href: "/email", icon: Mail },
            { title: "Audience Analytics", href: "/analytics", icon: BarChart3 },
            { title: "Template Library", href: "/templates", icon: Palette },
            { title: "Creator Community", href: "/community", icon: Users },
        ] },
    { group: "Management", items: [
            { title: "Settings & Integrations", href: "/settings", icon: Settings },
            { title: "Billing & Plans", href: "/billing", icon: CreditCard },
            { title: "Admin & Health", href: "/admin", icon: ShieldAlert },
        ] }
];
export function DashboardSidebar() {
    const pathname = usePathname();
    return (_jsxs("aside", { className: "w-64 flex-shrink-0 border-r border-white/5 bg-zinc-950 flex flex-col h-screen sticky top-0", children: [_jsx("div", { className: "p-5 border-b border-white/5 flex items-center justify-between", children: _jsxs(Link, { href: "/dashboard", className: "flex items-center gap-2.5", children: [_jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-md shadow-indigo-500/20", children: _jsx(Sparkles, { className: "h-4 w-4 text-white" }) }), _jsxs("div", { children: [_jsx("span", { className: "font-bold text-white tracking-tight flex items-center gap-1.5 text-base", children: "Outsyra" }), _jsx("p", { className: "text-[11px] text-zinc-500 font-medium", children: "Creator Business OS" })] })] }) }), _jsx("div", { className: "flex-1 overflow-y-auto px-3 py-4 space-y-6", children: navItems.map((group, idx) => (_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2", children: group.group }), group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                            return (_jsxs(Link, { href: item.href, className: cn("flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group", isActive
                                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"), children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Icon, { className: cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200") }), _jsx("span", { children: item.title })] }), item.badge && (_jsx(Badge, { variant: item.badge === "Meta" ? "gradient" : "default", className: "text-[10px] px-1.5 py-0", children: item.badge }))] }, item.href));
                        })] }, idx))) }), _jsxs("div", { className: "p-4 border-t border-white/5 space-y-3 bg-zinc-950/80", children: [_jsxs(Link, { href: "/public/rajnish", target: "_blank", className: "flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-all group", children: [_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), "outsyra.com/rajnish"] }), _jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-70 group-hover:opacity-100" })] }), _jsxs("div", { className: "flex items-center gap-3 px-1", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", alt: "Rajnish Sharma", className: "h-8 w-8 rounded-full object-cover ring-1 ring-white/10" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-medium text-white truncate", children: "Rajnish Sharma" }), _jsx("p", { className: "text-[11px] text-zinc-500 truncate", children: "rajnish@outsyra.com" })] })] })] })] }));
}
