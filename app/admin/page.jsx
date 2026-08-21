"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { RefreshCw, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsageMonitorService } from "@/lib/services/usage";
export default function AdminHealthPage() {
    const usageService = UsageMonitorService.getInstance();
    const [healthStatus, setHealthStatus] = useState(usageService.getSystemHealth());
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setHealthStatus(usageService.getSystemHealth());
            setRefreshing(false);
        }, 600);
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Admin & System Health Center", subtitle: "Platform-wide observability, provider statuses, multi-tenant workspace health, and system logs." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsxs("div", { className: "glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-emerald-400 animate-pulse" }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-white", children: "All Core Systems Operational" }), _jsx("p", { className: "text-xs text-zinc-400", children: "PostgreSQL RLS policies, background services & provider fallbacks running normally." })] })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, className: "text-xs gap-1.5", children: [_jsx(RefreshCw, { className: `h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}` }), "Refresh Health Checks"] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Provider Integration Health Matrix" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: healthStatus.map((prov, i) => (_jsxs(Card, { className: "glass-panel border-white/5 p-5 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-semibold text-white", children: prov.name }), _jsx(Badge, { variant: prov.status === "operational" ? "success" : "default", className: "text-[10px] capitalize", children: prov.status })] }), _jsx("p", { className: "text-xs text-zinc-400 leading-relaxed", children: prov.message }), _jsx("div", { className: "pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500", children: _jsxs("span", { children: ["Usage: ", prov.currentUsage.toLocaleString(), " / ", prov.monthlyLimit.toLocaleString(), " ", prov.unit] }) })] }, i))) })] }), _jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsx(CardTitle, { className: "text-base", children: "Recent Platform Audit Logs" }), _jsx("div", { className: "divide-y divide-white/5 text-xs font-mono", children: [
                                    { event: "WEBHOOK_VERIFIED", prov: "stripe", actor: "system", time: "2m ago", status: "200 OK" },
                                    { event: "ORDER_COMPLETED", prov: "db_rls", actor: "sophia.m@gmail.com", time: "14m ago", status: "SUCCESS" },
                                    { event: "INSTAGRAM_AUTO_DM", prov: "meta_graph", actor: "@alex_designs", time: "28m ago", status: "DELIVERED" },
                                    { event: "BOOKING_CREATED", prov: "internal_calendar", actor: "liam.oc@outlook.com", time: "1h ago", status: "CONFIRMED" },
                                ].map((log, i) => (_jsxs("div", { className: "py-2.5 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-indigo-400 font-bold", children: log.event }), _jsxs("span", { className: "text-zinc-500", children: ["[", log.prov, "]"] }), _jsx("span", { className: "text-zinc-400", children: log.actor })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-emerald-400", children: log.status }), _jsx("span", { className: "text-zinc-600 text-[10px]", children: log.time })] })] }, i))) })] })] })] }));
}
