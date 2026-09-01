"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
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

    const auditLogs = [
        { event: "WEBHOOK_VERIFIED", prov: "stripe", actor: "system", time: "2m ago", status: "200 OK" },
        { event: "ORDER_COMPLETED", prov: "db_rls", actor: "sophia.m@gmail.com", time: "14m ago", status: "SUCCESS" },
        { event: "INSTAGRAM_AUTO_DM", prov: "meta_graph", actor: "@alex_designs", time: "28m ago", status: "DELIVERED" },
        { event: "BOOKING_CREATED", prov: "internal_calendar", actor: "liam.oc@outlook.com", time: "1h ago", status: "CONFIRMED" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Admin & System Health Center"
                subtitle="Platform-wide observability, provider statuses, multi-tenant workspace health, and system logs."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">All Core Systems Operational</h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                PostgreSQL RLS policies, background services & provider fallbacks running normally.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRefresh} className="text-xs gap-1.5">
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                        <span>Refresh Health Checks</span>
                    </Button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Provider Integration Health Matrix</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {healthStatus.map((prov, i) => (
                            <Card key={i} className="glass-card border-zinc-200 dark:border-white/10 p-5 space-y-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-white">{prov.name}</span>
                                    <Badge
                                        variant={prov.status === "operational" ? "success" : "default"}
                                        className="text-[10px] capitalize"
                                    >
                                        {prov.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{prov.message}</p>
                                <div className="pt-2 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                                    <span>
                                        Usage: {prov.currentUsage?.toLocaleString()} / {prov.monthlyLimit?.toLocaleString()} {prov.unit}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                    <CardTitle className="text-base">Recent Platform Audit Logs</CardTitle>
                    <div className="divide-y divide-zinc-200/60 dark:divide-white/5 text-xs font-mono">
                        {auditLogs.map((log, i) => (
                            <div key={i} className="py-2.5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{log.event}</span>
                                    <span className="text-zinc-500">[{log.prov}]</span>
                                    <span className="text-zinc-600 dark:text-zinc-400">{log.actor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{log.status}</span>
                                    <span className="text-zinc-500 text-[10px]">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
}
