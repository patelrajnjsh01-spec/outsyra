"use client";
import React, { useState, useEffect } from "react";
import { Instagram, Plus, CheckCircle2, History, Trash2, Power } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    getInstagramRules,
    createInstagramRule,
    toggleInstagramRule,
    deleteInstagramRule,
} from "@/lib/supabase/db";

export default function InstagramAutomationPage() {
    const [rules, setRules] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [connected, setConnected] = useState(true);
    const [loading, setLoading] = useState(true);

    const [ruleName, setRuleName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    useEffect(() => {
        async function fetchRules() {
            try {
                const data = await getInstagramRules("ws-rajnish-001");
                setRules(data || []);
            } catch (err) {
                console.error("Failed to load Instagram rules", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRules();
    }, []);

    const handleCreateRule = async (e) => {
        e.preventDefault();
        const newRule = await createInstagramRule("ws-rajnish-001", {
            name: ruleName,
            trigger_type: "comment_keyword",
            trigger_keywords: keyword.split(",").map((k) => k.trim().toUpperCase()),
            response_type: "send_dm",
            response_message: responseMsg,
        });
        setRules([newRule, ...rules]);
        setCreateModal(false);
        setRuleName("");
        setKeyword("");
        setResponseMsg("");
    };

    const handleToggleRule = async (id) => {
        const updated = await toggleInstagramRule(id);
        setRules(rules.map((r) => (r.id === id ? updated : r)));
    };

    const handleDeleteRule = async (id) => {
        setRules(rules.filter((r) => r.id !== id));
        await deleteInstagramRule(id);
    };

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Meta Instagram Automation (Supabase DB)"
                subtitle="Turn post comments and story mentions into automated product sales stored in PostgreSQL."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                            <Instagram className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-white">Official Meta Graph API Connection</h3>
                                <Badge variant={connected ? "success" : "secondary"}>
                                    {connected ? "@rajnish_creates Connected" : "Not Connected"}
                                </Badge>
                            </div>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Official Webhooks subscribed for Comments & Direct Messages.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant={connected ? "outline" : "gradient"}
                        onClick={() => setConnected(!connected)}
                        className="text-xs"
                    >
                        {connected ? "Configure Permissions" : "Connect Instagram Account"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Active Automation Rules</h3>
                                <p className="text-xs text-zinc-400">
                                    Triggers that listen for incoming keywords on your Instagram account.
                                </p>
                            </div>
                            <Button
                                variant="gradient"
                                size="sm"
                                onClick={() => setCreateModal(true)}
                                className="gap-1.5 text-xs"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                Create Trigger Rule
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {rules.map((rule) => (
                                <Card key={rule.id} className="glass-panel border-white/5 p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    rule.is_active ? "bg-emerald-400" : "bg-zinc-600"
                                                }`}
                                            />
                                            <h4 className="text-sm font-bold text-white">{rule.name}</h4>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="default" className="text-[10px]">
                                                {rule.executions_count || 0} DMs Sent
                                            </Badge>
                                            <button
                                                onClick={() => handleToggleRule(rule.id)}
                                                className={`p-1.5 rounded-lg border text-xs transition-all ${
                                                    rule.is_active
                                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                        : "bg-zinc-900 border-zinc-700 text-zinc-500"
                                                }`}
                                                title={rule.is_active ? "Active" : "Disabled"}
                                            >
                                                <Power className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRule(rule.id)}
                                                className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors"
                                                title="Delete Rule"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-500 font-medium">Keywords:</span>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {rule.trigger_keywords?.map((kw, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[10px]"
                                                    >
                                                        "{kw}"
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-white/5">
                                            <span className="text-zinc-500 font-medium">Automated Response:</span>
                                            <p className="text-zinc-200 mt-1 font-mono text-[11px] leading-relaxed bg-zinc-950/60 p-2.5 rounded-xl border border-white/5">
                                                {rule.response_message}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                            <History className="h-4 w-4 text-indigo-400" /> Realtime Webhook Logs
                        </h3>
                        <Card className="glass-panel border-white/5 p-4 space-y-3">
                            {[
                                { user: "@alex_designs", kw: "EBOOK", status: "DM Delivered", time: "12m ago" },
                                { user: "@creative_maya", kw: "COURSE", status: "DM Delivered", time: "34m ago" },
                                { user: "@sam_builder", kw: "EBOOK", status: "DM Delivered", time: "1h ago" },
                                { user: "@dev_sarah", kw: "GUIDE", status: "DM Delivered", time: "2h ago" },
                            ].map((log, i) => (
                                <div key={i} className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-xs space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-white">{log.user}</span>
                                        <span className="text-[10px] text-zinc-500">{log.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-indigo-400 font-mono">Comment: "{log.kw}"</span>
                                        <span className="text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3" /> {log.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>
                </div>
            </main>

            {createModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-white">Create Instagram Keyword Trigger</h3>
                        <form onSubmit={handleCreateRule} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Rule Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Free Template Keyword DM"
                                    value={ruleName}
                                    onChange={(e) => setRuleName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Trigger Keywords (comma separated)
                                </label>
                                <Input
                                    required
                                    placeholder="EBOOK, GUIDE, START"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Automated Direct Message (DM)
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Hey! Thanks for commenting. Here is your direct link: https://..."
                                    value={responseMsg}
                                    onChange={(e) => setResponseMsg(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-1/3" onClick={() => setCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" className="w-2/3">
                                    Save to Supabase
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
