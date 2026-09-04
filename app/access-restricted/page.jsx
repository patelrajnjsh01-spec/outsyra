"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, RefreshCw, Mail, LogOut, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AccessRestrictedPage() {
    const router = useRouter();
    const { user, refreshAuth, logout } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const handleCheckStatus = async () => {
        setRefreshing(true);
        try {
            await refreshAuth();
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                if (data?.user?.dashboard_access) {
                    router.push("/dashboard");
                    return;
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => setRefreshing(false), 800);
        }
    };

    const isPending = user?.status === "pending" || !user?.status;

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
            {/* Top Minimal Navigation */}
            <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] px-6 bg-white/50 dark:bg-[#08090d]/50 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-zinc-900 dark:text-white tracking-tight text-sm uppercase">
                            Outsyra
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold ml-1">Creator Studio</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" onClick={logout} className="text-xs gap-1.5 text-zinc-500 hover:text-rose-500">
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95">
                    {/* Status Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/25 text-amber-500 shadow-lg shadow-amber-500/10">
                        {isPending ? (
                            <Clock className="h-8 w-8 animate-pulse" />
                        ) : (
                            <ShieldAlert className="h-8 w-8 text-rose-500" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Badge
                            variant={isPending ? "warning" : "destructive"}
                            className="text-[10px] tracking-wider uppercase px-2.5 py-0.5"
                        >
                            {isPending ? "Application Pending Review" : "Dashboard Access Restricted"}
                        </Badge>
                        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            {isPending
                                ? "Your Creator Workspace is Awaiting Approval"
                                : "Creator Dashboard Access Revoked"}
                        </h1>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {isPending ? (
                                <>
                                    Hello <strong className="text-zinc-900 dark:text-white">{user?.name || "Creator"}</strong>.
                                    The platform Superadmin has not granted dashboard access to your account yet.
                                    Once approved, you will have full access to your link-in-bio store, product builder, and courses.
                                </>
                            ) : (
                                <>
                                    Hello <strong className="text-zinc-900 dark:text-white">{user?.name || "Creator"}</strong>.
                                    Access to the creator dashboard has been paused by the Superadmin.
                                    Please contact platform administration if you believe this is in error.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Account Details Capsule */}
                    <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-left text-xs space-y-1.5 font-mono">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Account:</span>
                            <span className="text-zinc-900 dark:text-white font-semibold truncate max-w-[200px]">
                                {user?.email || "creator@outsyra.com"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Workspace:</span>
                            <span className="text-indigo-500 font-semibold truncate max-w-[200px]">
                                {user?.workspace_id || "ws-pending"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Access Status:</span>
                            <span className="text-amber-500 font-semibold">
                                {isPending ? "Awaiting Superadmin Grant" : "Revoked"}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2.5 pt-2">
                        <Button
                            variant="gradient"
                            className="w-full h-10 text-xs font-bold gap-2"
                            disabled={refreshing}
                            onClick={handleCheckStatus}
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                            <span>{refreshing ? "Checking Approval..." : "Check Approval Status"}</span>
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1 h-9 text-xs gap-1.5"
                                onClick={() => setContactOpen(!contactOpen)}
                            >
                                <Mail className="h-3.5 w-3.5" />
                                <span>Contact Admin</span>
                            </Button>

                            <Button
                                variant="outline"
                                className="flex-1 h-9 text-xs gap-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                onClick={logout}
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Switch Account</span>
                            </Button>
                        </div>

                        {contactOpen && (
                            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-left animate-in fade-in space-y-1">
                                <p className="font-bold text-indigo-600 dark:text-indigo-400">
                                    Contact Superadmin
                                </p>
                                <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                                    Email our operations team at <a href="mailto:admin@outsyra.com" className="font-semibold underline text-indigo-500">admin@outsyra.com</a> to expedite access verification.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
