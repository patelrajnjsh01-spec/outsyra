"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Users,
    Shield,
    ShieldCheck,
    ShieldAlert,
    RefreshCw,
    Search,
    Filter,
    ExternalLink,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    DollarSign,
    Package,
    Store,
    Activity,
    Layers,
    Sparkles,
    Check,
    AlertCircle,
    UserCheck,
    LogOut,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsageMonitorService } from "@/lib/services/usage";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { useAuth } from "@/components/providers/AuthProvider";

export default function SuperadminPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { switchWorkspace } = useWorkspace();
    const usageService = UsageMonitorService.getInstance();

    const [activeTab, setActiveTab] = useState("creators"); // "creators" | "health"
    const [creators, setCreators] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterAccess, setFilterAccess] = useState("all");
    const [toastMessage, setToastMessage] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const [healthStatus, setHealthStatus] = useState(usageService.getSystemHealth());

    const showToast = (message, type = "success") => {
        setToastMessage({ text: message, type });
        setTimeout(() => setToastMessage(null), 3500);
    };

    const fetchCreators = async () => {
        try {
            const res = await fetch("/api/admin/creators");
            if (res.ok) {
                const data = await res.json();
                setCreators(data.creators || []);
                setSummary(data.summary || null);
            } else {
                showToast("Failed to load creator tenants.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Error connecting to admin API.", "error");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCreators();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchCreators();
        setHealthStatus(usageService.getSystemHealth());
    };

    // Toggle creator dashboard access (Grant / Revoke)
    const handleToggleAccess = async (creator) => {
        const newAccess = !creator.dashboard_access;
        const newStatus = newAccess ? "active" : "suspended";
        setUpdatingId(creator.id);

        // Optimistic UI update
        setCreators((prev) =>
            prev.map((c) =>
                c.id === creator.id ? { ...c, dashboard_access: newAccess, status: newStatus } : c
            )
        );

        try {
            const res = await fetch(`/api/admin/creators/${encodeURIComponent(creator.id)}/access`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dashboard_access: newAccess,
                    status: newStatus,
                }),
            });

            if (res.ok) {
                showToast(
                    `Dashboard access ${newAccess ? "granted" : "revoked"} for ${creator.name}.`,
                    "success"
                );
            } else {
                throw new Error("API update failed");
            }
        } catch (err) {
            console.error(err);
            showToast("Failed to update access. Reverting...", "error");
            // Revert optimistic update
            fetchCreators();
        } finally {
            setUpdatingId(null);
        }
    };

    // Impersonate creator & open their dashboard
    const handleImpersonate = async (creator) => {
        const wsId = creator.workspace?.id || creator.workspace_id;
        showToast(`Switching tenant workspace to ${creator.name}...`, "success");
        await switchWorkspace(wsId);
        setTimeout(() => {
            router.push("/dashboard");
        }, 400);
    };

    // Filter creators list
    const filteredCreators = creators.filter((c) => {
        const matchesSearch =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.workspace?.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.workspace?.category || "").toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === "all" ||
            (filterStatus === "active" && c.status === "active") ||
            (filterStatus === "pending" && c.status === "pending") ||
            (filterStatus === "suspended" && c.status === "suspended");

        const matchesAccess =
            filterAccess === "all" ||
            (filterAccess === "granted" && c.dashboard_access) ||
            (filterAccess === "revoked" && !c.dashboard_access);

        return matchesSearch && matchesStatus && matchesAccess;
    });

    const auditLogs = [
        { event: "ACCESS_GRANTED", prov: "superadmin", actor: "admin@outsyra.com", time: "Just now", status: "200 OK" },
        { event: "WEBHOOK_VERIFIED", prov: "stripe", actor: "system", time: "2m ago", status: "200 OK" },
        { event: "ORDER_COMPLETED", prov: "db_rls", actor: "sophia.m@gmail.com", time: "14m ago", status: "SUCCESS" },
        { event: "INSTAGRAM_AUTO_DM", prov: "meta_graph", actor: "@alex_designs", time: "28m ago", status: "DELIVERED" },
        { event: "BOOKING_CREATED", prov: "internal_calendar", actor: "liam.oc@outlook.com", time: "1h ago", status: "CONFIRMED" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Superadmin Tenant Center"
                subtitle="Manage multi-tenant creator access, grant/revoke dashboard permissions, and inspect platform workspaces."
            />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
                    <div
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-xs font-semibold ${
                            toastMessage.type === "error"
                                ? "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400"
                                : "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        }`}
                    >
                        {toastMessage.type === "error" ? (
                            <AlertCircle className="h-4 w-4 shrink-0" />
                        ) : (
                            <Check className="h-4 w-4 shrink-0" />
                        )}
                        <span>{toastMessage.text}</span>
                    </div>
                </div>
            )}

            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                {/* Mode Tabs */}
                <div className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-white/5 p-1 rounded-2xl border border-zinc-200 dark:border-white/10">
                        <button
                            onClick={() => setActiveTab("creators")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeTab === "creators"
                                    ? "bg-white dark:bg-[#0f1117] text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-white/10"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Users className="h-4 w-4" />
                            <span>Creator Tenants & Access</span>
                            {summary && (
                                <Badge variant="default" className="text-[10px] px-1.5 py-0 ml-1">
                                    {summary.total_creators}
                                </Badge>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab("health")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeTab === "health"
                                    ? "bg-white dark:bg-[#0f1117] text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-white/10"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Activity className="h-4 w-4" />
                            <span>System Health & Logs</span>
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </button>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        className="text-xs gap-1.5 shadow-xs"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                        <span>Refresh Data</span>
                    </Button>
                </div>

                {/* TAB 1: CREATOR TENANTS & ACCESS MANAGEMENT */}
                {activeTab === "creators" && (
                    <div className="space-y-6">
                        {/* Summary Metric Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="glass-card border-zinc-200 dark:border-white/10 p-5 shadow-sm space-y-1">
                                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                                    <span>Total Creators</span>
                                    <Users className="h-4 w-4 text-indigo-500" />
                                </div>
                                <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    {summary?.total_creators ?? creators.length}
                                </p>
                                <p className="text-[11px] text-zinc-500">Registered platform tenants</p>
                            </Card>

                            <Card className="glass-card border-zinc-200 dark:border-white/10 p-5 shadow-sm space-y-1">
                                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                                    <span>Dashboard Access Granted</span>
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                </div>
                                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                                    {summary?.granted_access_count ?? creators.filter((c) => c.dashboard_access).length}
                                </p>
                                <p className="text-[11px] text-zinc-500">Can view & edit creator dashboard</p>
                            </Card>

                            <Card className="glass-card border-zinc-200 dark:border-white/10 p-5 shadow-sm space-y-1">
                                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                                    <span>Access Revoked / Pending</span>
                                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                                </div>
                                <p className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                                    {summary?.revoked_access_count ?? creators.filter((c) => !c.dashboard_access).length}
                                </p>
                                <p className="text-[11px] text-zinc-500">Blocked / pending superadmin grant</p>
                            </Card>

                            <Card className="glass-card border-zinc-200 dark:border-white/10 p-5 shadow-sm space-y-1">
                                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                                    <span>Platform GMV</span>
                                    <DollarSign className="h-4 w-4 text-purple-500" />
                                </div>
                                <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    ${(summary?.total_platform_gmv ?? 61410).toLocaleString()}
                                </p>
                                <p className="text-[11px] text-zinc-500">Combined gross merchandise value</p>
                            </Card>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input
                                    placeholder="Search by creator name, email, @username, niche..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 pl-10 text-xs bg-white dark:bg-black/40 border-zinc-200 dark:border-white/10"
                                />
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Filter className="h-3.5 w-3.5" />
                                    <span>Status:</span>
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="h-9 px-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f1117] text-xs font-semibold text-zinc-900 dark:text-white cursor-pointer"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending Approval</option>
                                    <option value="suspended">Suspended</option>
                                </select>

                                <div className="flex items-center gap-1.5 text-xs text-zinc-500 ml-2">
                                    <span>Access:</span>
                                </div>
                                <select
                                    value={filterAccess}
                                    onChange={(e) => setFilterAccess(e.target.value)}
                                    className="h-9 px-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f1117] text-xs font-semibold text-zinc-900 dark:text-white cursor-pointer"
                                >
                                    <option value="all">All Access</option>
                                    <option value="granted">Granted</option>
                                    <option value="revoked">Revoked</option>
                                </select>
                            </div>
                        </div>

                        {/* Creator Tenants List Table */}
                        <div className="rounded-3xl border border-zinc-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#08090d] shadow-sm">
                            <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        Multi-Tenant Creator Directory
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        Superadmin control to grant or revoke creator dashboard access across the platform.
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-xs font-mono">
                                    {filteredCreators.length} {filteredCreators.length === 1 ? "Creator" : "Creators"} Found
                                </Badge>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                            <th className="py-3 px-4">Creator / Account</th>
                                            <th className="py-3 px-4">Workspace & Public Store</th>
                                            <th className="py-3 px-4">Plan</th>
                                            <th className="py-3 px-4">Products & GMV</th>
                                            <th className="py-3 px-4">Dashboard Access</th>
                                            <th className="py-3 px-4 text-right">Superadmin Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5">
                                        {filteredCreators.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-8 text-center text-zinc-500 text-xs">
                                                    No creator tenants found matching your filter criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCreators.map((creator) => {
                                                const hasAccess = creator.dashboard_access;
                                                const isUpdating = updatingId === creator.id;
                                                const wsUsername = creator.workspace?.username || creator.username;

                                                return (
                                                    <tr
                                                        key={creator.id}
                                                        className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors"
                                                    >
                                                        {/* Creator Profile */}
                                                        <td className="py-3.5 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={
                                                                        creator.avatar ||
                                                                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                                                            creator.name
                                                                        )}`
                                                                    }
                                                                    alt={creator.name}
                                                                    className="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-white/10 shrink-0"
                                                                />
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <span className="font-bold text-zinc-900 dark:text-white truncate">
                                                                            {creator.name}
                                                                        </span>
                                                                        {creator.status === "active" && (
                                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Active" />
                                                                        )}
                                                                        {creator.status === "pending" && (
                                                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="Pending Approval" />
                                                                        )}
                                                                        {creator.status === "suspended" && (
                                                                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" title="Suspended" />
                                                                        )}
                                                                    </div>
                                                                    <p className="text-[11px] text-zinc-500 truncate font-mono">
                                                                        {creator.email}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Workspace & Store */}
                                                        <td className="py-3.5 px-4">
                                                            <div>
                                                                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                                                                    {creator.workspace?.display_name || creator.name}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <span className="text-[11px] text-zinc-400">
                                                                        {creator.workspace?.category || "Creator"}
                                                                    </span>
                                                                    <Link
                                                                        href={`/public/${wsUsername}`}
                                                                        target="_blank"
                                                                        className="text-[11px] text-indigo-500 hover:underline flex items-center gap-0.5"
                                                                    >
                                                                        <span>outsyra.com/{wsUsername}</span>
                                                                        <ExternalLink className="h-2.5 w-2.5" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Plan Tier */}
                                                        <td className="py-3.5 px-4">
                                                            <Badge
                                                                variant={
                                                                    creator.workspace?.plan_tier === "pro" || creator.workspace?.plan_tier === "business"
                                                                        ? "gradient"
                                                                        : "outline"
                                                                }
                                                                className="text-[10px] uppercase font-bold"
                                                            >
                                                                {creator.workspace?.plan_tier || "free"}
                                                            </Badge>
                                                        </td>

                                                        {/* Products & GMV */}
                                                        <td className="py-3.5 px-4">
                                                            <div>
                                                                <p className="font-bold text-zinc-900 dark:text-white">
                                                                    ${(creator.stats?.total_revenue || 0).toLocaleString()}
                                                                </p>
                                                                <p className="text-[11px] text-zinc-500">
                                                                    {creator.stats?.products_count || 0} products • {creator.stats?.orders_count || 0} orders
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* Dashboard Access Status */}
                                                        <td className="py-3.5 px-4">
                                                            <div className="flex items-center gap-2">
                                                                {hasAccess ? (
                                                                    <Badge
                                                                        variant="success"
                                                                        className="gap-1 text-[10px] font-bold py-0.5"
                                                                    >
                                                                        <CheckCircle2 className="h-3 w-3" />
                                                                        <span>Access Granted</span>
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant={creator.status === "pending" ? "warning" : "destructive"}
                                                                        className="gap-1 text-[10px] font-bold py-0.5"
                                                                    >
                                                                        {creator.status === "pending" ? (
                                                                            <Clock className="h-3 w-3" />
                                                                        ) : (
                                                                            <XCircle className="h-3 w-3" />
                                                                        )}
                                                                        <span>
                                                                            {creator.status === "pending"
                                                                                ? "Pending Approval"
                                                                                : "Access Revoked"}
                                                                        </span>
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Superadmin Actions */}
                                                        <td className="py-3.5 px-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                {/* 1-Click Access Grant/Revoke Button */}
                                                                <Button
                                                                    size="sm"
                                                                    variant={hasAccess ? "outline" : "default"}
                                                                    disabled={isUpdating}
                                                                    onClick={() => handleToggleAccess(creator)}
                                                                    className={`h-8 text-[11px] font-bold gap-1 ${
                                                                        hasAccess
                                                                            ? "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/30"
                                                                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                                                                    }`}
                                                                >
                                                                    {isUpdating ? (
                                                                        <RefreshCw className="h-3 w-3 animate-spin" />
                                                                    ) : hasAccess ? (
                                                                        <>
                                                                            <XCircle className="h-3 w-3" />
                                                                            <span>Revoke Access</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <CheckCircle2 className="h-3 w-3" />
                                                                            <span>Grant Access</span>
                                                                        </>
                                                                    )}
                                                                </Button>

                                                                {/* Impersonate / Inspect Creator Dashboard */}
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleImpersonate(creator)}
                                                                    className="h-8 text-[11px] font-semibold gap-1.5 hover:bg-indigo-500/10 hover:text-indigo-600 hover:border-indigo-500/30"
                                                                    title="Open and manage this creator's dashboard"
                                                                >
                                                                    <Eye className="h-3.5 w-3.5 text-indigo-500" />
                                                                    <span className="hidden md:inline">Inspect Dashboard</span>
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: SYSTEM HEALTH & OBSERVABILITY */}
                {activeTab === "health" && (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                                <div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                        Multi-Tenant Infrastructure Operational
                                    </h3>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        PostgreSQL Row-Level Security (RLS) tenant isolation policies, Redis session edge verification, and provider webhooks active.
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleRefresh} className="text-xs gap-1.5">
                                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                                <span>Re-evaluate Health</span>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                Provider Integration Health Matrix
                            </h3>
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
                            <CardTitle className="text-base">Recent Platform & Security Audit Logs</CardTitle>
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
                    </div>
                )}
            </main>
        </div>
    );
}
