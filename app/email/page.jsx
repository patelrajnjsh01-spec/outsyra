"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Plus, Send, Users, CheckCircle2, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialEmailSubscribers, initialEmailCampaigns } from "@/lib/supabase/mock-db";
export default function EmailMarketingPage() {
    const [subscribers, setSubscribers] = useState(initialEmailSubscribers);
    const [campaigns, setCampaigns] = useState(initialEmailCampaigns);
    const [composerOpen, setComposerOpen] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    // Free Tier Usage Info
    const monthlyUsage = 1240;
    const monthlyLimit = 3000;
    const usagePercentage = Math.round((monthlyUsage / monthlyLimit) * 100);
    // Broadcast Composer State
    const [subject, setSubject] = useState("");
    const [previewText, setPreviewText] = useState("");
    const [content, setContent] = useState("");
    const handleSendBroadcast = (e) => {
        e.preventDefault();
        const newCamp = {
            id: `camp-${Date.now()}`,
            workspace_id: "ws-rajnish-001",
            subject,
            preview_text: previewText,
            content,
            status: "sent",
            sent_at: new Date().toISOString(),
            total_recipients: 1240,
            open_rate: 0.0,
            click_rate: 0.0,
            created_at: new Date().toISOString(),
        };
        setCampaigns([newCamp, ...campaigns]);
        setComposerOpen(false);
        setSentSuccess(true);
        setSubject("");
        setContent("");
        setTimeout(() => setSentSuccess(false), 3000);
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Email Marketing & Newsletters", subtitle: "Broadcast newsletters, nurture leads, and track deliverability powered by Resend." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsxs("div", { className: "glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [_jsxs("div", { className: "space-y-2 flex-1 max-w-xl", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-bold text-white", children: "Resend Monthly Email Quota" }), _jsxs(Badge, { variant: "default", className: "text-[10px]", children: [usagePercentage, "% Used"] })] }), _jsx("div", { className: "w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/5", children: _jsx("div", { className: "bg-gradient-to-r from-indigo-500 to-pink-500 h-full", style: { width: `${usagePercentage}%` } }) }), _jsxs("p", { className: "text-xs text-zinc-400", children: ["Email usage: ", _jsx("span", { className: "text-white font-medium", children: monthlyUsage.toLocaleString() }), " / ", monthlyLimit.toLocaleString(), " monthly emails. (Resend API server-side active)."] })] }), _jsxs(Button, { variant: "gradient", onClick: () => setComposerOpen(true), className: "gap-2 text-xs", children: [_jsx(Plus, { className: "h-4 w-4" }), "Compose Broadcast Newsletter"] })] }), sentSuccess && (_jsxs("div", { className: "p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-400" }), "Newsletter broadcast successfully sent to 1,240 subscribers!"] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Broadcast Campaigns" }), _jsx("div", { className: "space-y-3", children: campaigns.map((camp) => (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "success", className: "text-[10px]", children: "Delivered" }), _jsxs("span", { className: "text-xs text-zinc-500", children: [camp.total_recipients, " recipients"] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-bold text-white", children: camp.subject }), camp.preview_text && (_jsx("p", { className: "text-xs text-zinc-400 mt-1", children: camp.preview_text }))] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-white/5 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-zinc-500", children: "Open Rate:" }), _jsxs("p", { className: "font-semibold text-emerald-400 text-sm mt-0.5", children: [camp.open_rate, "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-zinc-500", children: "Click Rate:" }), _jsxs("p", { className: "font-semibold text-indigo-400 text-sm mt-0.5", children: [camp.click_rate, "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-zinc-500", children: "Sent Date:" }), _jsx("p", { className: "font-medium text-zinc-300 mt-0.5", children: new Date(camp.created_at).toLocaleDateString() })] })] })] }, camp.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-1.5", children: [_jsx(Users, { className: "h-4 w-4 text-indigo-400" }), " Subscribers (", subscribers.length, ")"] }) }), _jsx(Card, { className: "glass-panel border-white/5 p-4 space-y-3", children: subscribers.map((sub) => (_jsxs("div", { className: "p-3 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1.5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-semibold text-white", children: sub.name || "Subscriber" }), _jsx(Badge, { variant: "outline", className: "text-[10px]", children: sub.source })] }), _jsx("p", { className: "text-[11px] text-zinc-400 font-mono truncate", children: sub.email }), _jsx("div", { className: "flex gap-1 flex-wrap pt-1", children: sub.tags.map((t, i) => (_jsxs("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300", children: ["#", t] }, i))) })] }, sub.id))) })] })] })] }), composerOpen && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-2xl w-full space-y-5 animate-in fade-in zoom-in-95", children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Compose Newsletter Broadcast" }), _jsxs("form", { onSubmit: handleSendBroadcast, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Email Subject Line" }), _jsx(Input, { required: true, placeholder: "e.g. How I gained 10,000 subscribers without paid ads", value: subject, onChange: (e) => setSubject(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Preview Header Text" }), _jsx(Input, { placeholder: "A quick 3-minute breakdown...", value: previewText, onChange: (e) => setPreviewText(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Email Body (Markdown / Text)" }), _jsx("textarea", { rows: 8, required: true, className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-4 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed font-sans", placeholder: "Hey {{name}},\n\nWrite your newsletter content here...", value: content, onChange: (e) => setContent(e.target.value) })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx(Button, { variant: "outline", type: "button", className: "w-1/3", onClick: () => setComposerOpen(false), children: "Cancel" }), _jsxs(Button, { variant: "gradient", type: "submit", className: "w-2/3 gap-2", children: [_jsx(Send, { className: "h-4 w-4" }), "Send Broadcast to 1,240 Subscribers"] })] })] })] }) }))] }));
}
