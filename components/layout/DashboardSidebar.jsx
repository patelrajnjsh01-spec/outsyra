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
    Sparkles,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navGroups = [
    {
        group: "Overview",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        group: "Sell",
        items: [
            { title: "Link-in-Bio Store", href: "/store", icon: Store, badge: "Live" },
            { title: "Digital Products", href: "/products", icon: Package },
            { title: "Course Builder (LMS)", href: "/courses", icon: GraduationCap },
        ],
    },
    {
        group: "Clients & Schedule",
        items: [
            { title: "Calendar & Availability", href: "/calendar", icon: Calendar },
            { title: "Bookings", href: "/bookings", icon: CalendarCheck },
            { title: "1:1 Coaching (Meet/Jitsi)", href: "/coaching", icon: Video },
        ],
    },
    {
        group: "Grow & Automate",
        items: [
            // { title: "Instagram Auto-DM", href: "/instagram", icon: Instagram, badge: "Meta" },
            { title: "Email & Newsletter", href: "/email", icon: Mail },
            { title: "Audience Analytics", href: "/analytics", icon: BarChart3 },
        ],
    },
    {
        group: "Community & Assets",
        items: [
            { title: "Template Library", href: "/templates", icon: Palette },
            // { title: "Creator Community", href: "/community", icon: Users },
        ],
    },
    {
        group: "Manage",
        items: [
            { title: "Settings & Integrations", href: "/settings", icon: Settings },
            { title: "Billing & Plans", href: "/billing", icon: CreditCard },
            { title: "Admin & System Health", href: "/admin", icon: ShieldAlert },
        ],
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#08090d] flex flex-col h-screen sticky top-0 transition-colors duration-200">
            {/* Header Brand */}
            <div className="p-4 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2.5 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-zinc-900 dark:text-white tracking-tight text-sm uppercase">
                            Outsyra
                        </span>
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                            Creator Studio
                        </p>
                    </div>
                </Link>
                <ThemeToggle />
            </div>

            {/* Nav Menu */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="space-y-1">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">
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
                                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group",
                                        isActive
                                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold shadow-xs"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Icon
                                            className={cn(
                                                "h-4 w-4 transition-transform group-hover:scale-110",
                                                isActive
                                                    ? "text-indigo-600 dark:text-indigo-400"
                                                    : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"
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

            {/* Bottom Profile & Live Store Link */}
            <div className="p-3 border-t border-zinc-200 dark:border-white/[0.08] space-y-2.5 bg-zinc-50 dark:bg-[#0f1117]/60">
                <Link
                    href="/public/rajnish"
                    target="_blank"
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-all group shadow-xs"
                >
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        outsyra.com/rajnish
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                </Link>

                <div className="flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                            alt="Rajnish Sharma"
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">Rajnish Sharma</p>
                            <p className="text-[10px] text-zinc-500 truncate">rajnish@outsyra.com</p>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            await fetch("/api/auth/logout", { method: "POST" });
                            window.location.href = "/login";
                        }}
                        title="Sign Out"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        aria-label="Sign Out"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
}
