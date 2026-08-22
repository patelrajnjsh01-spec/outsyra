"use client";
import React, { useState, useEffect } from "react";
import { Plus, Send, Users, CheckCircle2, Mail } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getEmailSubscribers, getEmailCampaigns, createEmailCampaign } from "@/lib/supabase/db";

export default function EmailMarketingPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [composerOpen, setComposerOpen] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const [subject, setSubject] = useState("");
    const [previewText, setPreviewText] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        async function fetchEmailData() {
            try {
                const [subsData, campsData] = await Promise.all([
                    getEmailSubscribers("ws-rajnish-001"),
                    getEmailCampaigns("ws-rajnish-001"),
                ]);
                setSubscribers(subsData || []);
                setCampaigns(campsData || []);
            } catch (err) {
                console.error("Failed to load email data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchEmailData();
    }, []);

    const monthlyUsage = 1240;
    const monthlyLimit = 3000;
    const usagePercentage = Math.round((monthlyUsage / monthlyLimit) * 100);

    const handleSendBroadcast = async (e) => {
        e.preventDefault();
        const newCamp = await createEmailCampaign("ws-rajnish-001", {
            subject,
            preview_text: previewText,
            content,
            total_recipients: subscribers.length || 1240,
        });
        setCampaigns([newCamp, ...campaigns]);
        setComposerOpen(false);
        setSentSuccess(true);
        setSubject("");
        setContent("");
        setTimeout(() => setSentSuccess(false), 3000);
    };

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Email Marketing & Newsletters (Supabase DB)"
                subtitle="Broadcast newsletters, nurture leads, and track deliverability powered by Supabase & Resend."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1 max-w-xl">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">Resend Monthly Email Quota</span>
                            <Badge variant="default" className="text-[10px]">
                                {usagePercentage}% Used
                            </Badge>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/5">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full"
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-400">
                            Email usage:{" "}
                            <span className="text-white font-medium">{monthlyUsage.toLocaleString()}</span> /{" "}
                            {monthlyLimit.toLocaleString()} monthly emails. (Resend API server-side active).
                        </p>
                    </div>
                    <Button variant="gradient" onClick={() => setComposerOpen(true)} className="gap-2 text-xs">
                        <Plus className="h-4 w-4" />
                        Compose Broadcast Newsletter
                    </Button>
                </div>

                {sentSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        Newsletter broadcast saved to Supabase and dispatched to {subscribers.length || 1240} subscribers!
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-sm font-semibold text-white">Broadcast Campaigns</h3>
                        <div className="space-y-3">
                            {campaigns.map((camp) => (
                                <Card key={camp.id} className="glass-panel border-white/5 p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="success" className="text-[10px]">
                                            Delivered
                                        </Badge>
                                        <span className="text-xs text-zinc-500">
                                            {camp.total_recipients || camp.recipients_count || 1240} recipients
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white">{camp.subject}</h4>
                                        {camp.preview_text && (
                                            <p className="text-xs text-zinc-400 mt-1">{camp.preview_text}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-white/5 text-xs">
                                        <div>
                                            <span className="text-zinc-500">Open Rate:</span>
                                            <p className="font-semibold text-emerald-400 text-sm mt-0.5">
                                                {camp.open_rate}%
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500">Click Rate:</span>
                                            <p className="font-semibold text-indigo-400 text-sm mt-0.5">
                                                {camp.click_rate}%
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500">Sent Date:</span>
                                            <p className="font-medium text-zinc-300 mt-0.5">
                                                {new Date(camp.created_at || camp.sent_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-indigo-400" /> Subscribers ({subscribers.length})
                            </h3>
                        </div>
                        <Card className="glass-panel border-white/5 p-4 space-y-3">
                            {subscribers.map((sub) => (
                                <div key={sub.id} className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-white">{sub.name || "Subscriber"}</span>
                                        <Badge variant="outline" className="text-[10px]">
                                            {sub.source || "store"}
                                        </Badge>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 font-mono truncate">{sub.email}</p>
                                    <div className="flex gap-1 flex-wrap pt-1">
                                        {sub.tags?.map((t, i) => (
                                            <span key={i} className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300">
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>
                </div>
            </main>

            {composerOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-2xl w-full space-y-5 animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-white">Compose Newsletter Broadcast</h3>
                        <form onSubmit={handleSendBroadcast} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Subject Line</label>
                                <Input
                                    required
                                    placeholder="e.g. How I gained 10,000 subscribers without paid ads"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Preview Header Text</label>
                                <Input
                                    placeholder="A quick 3-minute breakdown..."
                                    value={previewText}
                                    onChange={(e) => setPreviewText(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                    Email Body (Markdown / Text)
                                </label>
                                <textarea
                                    rows={8}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900/60 p-4 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed font-sans"
                                    placeholder="Hey {{name}},\n\nWrite your newsletter content here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-1/3" onClick={() => setComposerOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" className="w-2/3 gap-2">
                                    <Send className="h-4 w-4" />
                                    Send Broadcast ({subscribers.length || 1240} Leads)
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
