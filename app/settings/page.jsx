"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, Check } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { initialWorkspace } from "@/lib/supabase/mock-db";

export default function SettingsPage() {
    const [workspace, setWorkspace] = useState(initialWorkspace);
    const [saved, setSaved] = useState(false);
    const [customDomain, setCustomDomain] = useState("rajnishcreates.com");

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Workspace Settings"
                subtitle="Manage your creator profile, bio handle, custom domain, and store settings."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-4xl">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Link href="/settings">
                            <Button variant="default" size="sm" className="text-xs">
                                General
                            </Button>
                        </Link>
                        <Link href="/settings/integrations">
                            <Button variant="outline" size="sm" className="text-xs">
                                Integrations Setup
                            </Button>
                        </Link>
                    </div>
                    {saved && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                            <Check className="h-4 w-4" /> Settings Saved!
                        </span>
                    )}
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                        <CardTitle className="text-base">Creator Profile & Bio Handle</CardTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Display Name</label>
                                <Input
                                    value={workspace.display_name}
                                    onChange={(e) => setWorkspace({ ...workspace, display_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Outsyra Username Handle</label>
                                <div className="flex items-center rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                                    <span className="px-3 text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/10 py-2.5">
                                        outsyra.com/
                                    </span>
                                    <input
                                        type="text"
                                        value={workspace.username}
                                        onChange={(e) => setWorkspace({ ...workspace, username: e.target.value })}
                                        className="flex-1 bg-transparent px-3 text-xs text-zinc-900 dark:text-white focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Bio Tagline</label>
                            <textarea
                                rows={3}
                                value={workspace.bio}
                                onChange={(e) => setWorkspace({ ...workspace, bio: e.target.value })}
                                className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 p-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </Card>

                    <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                <span>Custom Domain (White-Label)</span>
                            </CardTitle>
                            <Badge variant="gradient" className="text-[10px]">
                                Pro Plan Feature
                            </Badge>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Map your own custom apex domain or subdomain to your storefront.</p>
                        <div className="flex gap-3">
                            <Input
                                placeholder="e.g. yourbrand.com"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                className="font-mono text-xs"
                            />
                            <Button type="button" variant="outline" className="text-xs shrink-0">
                                Verify DNS CNAME
                            </Button>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 space-y-1">
                            <p>Type: CNAME | Host: @ | Target: cname.outsyra.com</p>
                            <p className="text-emerald-600 dark:text-emerald-400 font-semibold">SSL Certificate: Auto-Provisioned (Active)</p>
                        </div>
                    </Card>

                    <Button type="submit" variant="gradient" className="w-full h-11 text-xs">
                        Save Workspace Changes
                    </Button>
                </form>
            </main>
        </div>
    );
}
