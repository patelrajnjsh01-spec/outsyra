"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Store,
    Package,
    GraduationCap,
    Calendar,
    CalendarCheck,
    Video,
    Instagram,
    Mail,
    BarChart3,
    Palette,
    Users,
    Settings,
    CreditCard,
    ShieldAlert,
    ExternalLink,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
    {
        group: "Core Studio",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { title: "Link-in-Bio Store", href: "/store", icon: Store, badge: "Live" },
            { title: "Digital Products", href: "/products", icon: Package },
            { title: "Course Builder (LMS)", href: "/courses", icon: GraduationCap },
        ],
    },
    {
        group: "Client Bookings",
        items: [
            { title: "Calendar & Schedule", href: "/calendar", icon: Calendar },
            { title: "Bookings", href: "/bookings", icon: CalendarCheck },
            { title: "1:1 Coaching", href: "/coaching", icon: Video },
        ],
    },
    {
        group: "Growth & Audience",
        items: [
            { title: "Instagram Automation", href: "/instagram", icon: Instagram, badge: "Meta" },
            { title: "Email & Newsletter", href: "/email", icon: Mail },
            { title: "Audience Analytics", href: "/analytics", icon: BarChart3 },
            { title: "Template Library", href: "/templates", icon: Palette },
            { title: "Creator Community", href: "/community", icon: Users },
        ],
    },
    {
        group: "Management",
        items: [
            { title: "Settings & Integrations", href: "/settings", icon: Settings },
            { title: "Billing & Plans", href: "/billing", icon: CreditCard },
            { title: "Admin & Health", href: "/admin", icon: ShieldAlert },
        ],
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-[#0b131b] flex flex-col h-screen sticky top-0">
            {/* Header Brand */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0f1923]">
                <Link href="/dashboard" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00c6ff] via-[#0072ff] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(0,198,255,0.35)] group-hover:scale-105 transition-transform">
                        <div className="w-full h-full bg-[#0f1923] rounded-[10px] flex items-center justify-center">
                            <Zap className="h-4 w-4 text-[#00f0ff] stroke-[2.5]" />
                        </div>
                    </div>
                    <div>
                        <span className="font-extrabold text-white tracking-tight flex items-center gap-1.5 text-base uppercase">
                            OUTSYRA
                        </span>
                        <p className="text-[10px] text-[#00f0ff] font-bold tracking-wider uppercase">
                            Creator Studio
                        </p>
                    </div>
                </Link>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                {navItems.map((group, idx) => (
                    <div key={idx} className="space-y-1">
                        <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                            {group.group}
                        </p>
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/dashboard" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all group relative",
                                        isActive
                                            ? "bg-[#162331] text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                                            : "text-slate-400 hover:text-white hover:bg-[#162331]/50"
                                    )}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Icon
                                            className={cn(
                                                "h-4 w-4 transition-transform group-hover:scale-110",
                                                isActive ? "text-[#00f0ff]" : "text-slate-400 group-hover:text-slate-200"
                                            )}
                                        />
                                        <span>{item.title}</span>
                                    </div>
                                    {item.badge && (
                                        <Badge
                                            variant={item.badge === "Live" ? "success" : "gradient"}
                                            className="text-[9px] px-1.5 py-0 uppercase"
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Bottom creator profile */}
            <div className="p-4 border-t border-white/[0.08] space-y-3 bg-[#0f1923]">
                <Link
                    href="/public/rajnish"
                    target="_blank"
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#162331] hover:bg-[#1a2c3d] border border-[#00f0ff]/20 text-[#00f0ff] text-xs font-bold transition-all group shadow-sm"
                >
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#00e676] animate-pulse" />
                        outsyra.com/rajnish
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                </Link>

                <div className="flex items-center gap-3 px-1">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Rajnish Sharma"
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-[#00f0ff]/40 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">Rajnish Sharma</p>
                        <p className="text-[10px] text-slate-400 truncate">rajnish@outsyra.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
