"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Instagram, Plus, CheckCircle2, History, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialInstagramRules } from "@/lib/supabase/mock-db";
export default function InstagramAutomationPage() {
    const [rules, setRules] = useState(initialInstagramRules);
    const [createModal, setCreateModal] = useState(false);
    const [connected, setConnected] = useState(true);
    // New Rule Form State
    const [ruleName, setRuleName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const handleCreateRule = (e) => {
        e.preventDefault();
        const newRule = {
            id: `rule-${Date.now()}`,
            workspace_id: "ws-rajnish-001",
            name: ruleName,
            trigger_type: "comment_keyword",
            trigger_keywords: keyword.split(",").map((k) => k.trim().toUpperCase()),
            response_type: "send_dm",
            response_message: responseMsg,
            is_active: true,
            executions_count: 0,
            created_at: new Date().toISOString(),
        };
        setRules([newRule, ...rules]);
        setCreateModal(false);
        setRuleName("");
        setKeyword("");
        setResponseMsg("");
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Meta Instagram Automation", subtitle: "Turn post comments and story mentions into automated product sales using official Meta Graph APIs." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsxs("div", { className: "glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400", children: _jsx(Instagram, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-base font-bold text-white", children: "Official Meta Graph API Connection" }), _jsx(Badge, { variant: connected ? "success" : "secondary", className: "text-[10px]", children: connected ? "@rajnish_creates Connected" : "Not Connected" })] }), _jsx("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Official Webhooks subscribed for Comments & Direct Messages. No unofficial scraping." })] })] }), _jsx(Button, { variant: connected ? "outline" : "gradient", onClick: () => setConnected(!connected), className: "text-xs", children: connected ? "Configure Permissions" : "Connect Instagram Account" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Active Automation Rules" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Triggers that listen for incoming keywords on your Instagram account." })] }), _jsxs(Button, { variant: "gradient", size: "sm", onClick: () => setCreateModal(true), className: "gap-1.5 text-xs", children: [_jsx(Plus, { className: "h-3.5 w-3.5" }), "Create Trigger Rule"] })] }), _jsx("div", { className: "space-y-4", children: rules.map((rule) => (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }), _jsx("h4", { className: "text-sm font-bold text-white", children: rule.name })] }), _jsxs(Badge, { variant: "default", className: "text-[10px]", children: [rule.executions_count, " DMs Sent"] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-zinc-500 font-medium", children: "Keywords:" }), _jsx("div", { className: "flex gap-1.5 flex-wrap", children: rule.trigger_keywords.map((kw, i) => (_jsxs("span", { className: "px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[10px]", children: ["\"", kw, "\""] }, i))) })] }), _jsxs("div", { className: "pt-2 border-t border-white/5", children: [_jsx("span", { className: "text-zinc-500 font-medium", children: "Automated Response:" }), _jsx("p", { className: "text-zinc-200 mt-1 font-mono text-[11px] leading-relaxed bg-zinc-950/60 p-2.5 rounded-xl border border-white/5", children: rule.response_message })] })] })] }, rule.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-1.5", children: [_jsx(History, { className: "h-4 w-4 text-indigo-400" }), " Realtime Webhook Logs"] }), _jsx(Card, { className: "glass-panel border-white/5 p-4 space-y-3", children: [
                                            { user: "@alex_designs", kw: "EBOOK", status: "DM Delivered", time: "12m ago" },
                                            { user: "@creative_maya", kw: "COURSE", status: "DM Delivered", time: "34m ago" },
                                            { user: "@sam_builder", kw: "EBOOK", status: "DM Delivered", time: "1h ago" },
                                            { user: "@dev_sarah", kw: "GUIDE", status: "DM Delivered", time: "2h ago" },
                                        ].map((log, i) => (_jsxs("div", { className: "p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-xs space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-white", children: log.user }), _jsx("span", { className: "text-[10px] text-zinc-500", children: log.time })] }), _jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [_jsxs("span", { className: "text-indigo-400 font-mono", children: ["Comment: \"", log.kw, "\""] }), _jsxs("span", { className: "text-emerald-400 flex items-center gap-1", children: [_jsx(CheckCircle2, { className: "h-3 w-3" }), " ", log.status] })] })] }, i))) })] })] })] }), createModal && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95", children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Create Instagram Keyword Trigger" }), _jsxs("form", { onSubmit: handleCreateRule, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Rule Name" }), _jsx(Input, { required: true, placeholder: "e.g. Free Template Keyword DM", value: ruleName, onChange: (e) => setRuleName(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Trigger Keywords (comma separated)" }), _jsx(Input, { required: true, placeholder: "EBOOK, GUIDE, START", value: keyword, onChange: (e) => setKeyword(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Automated Direct Message (DM)" }), _jsx("textarea", { rows: 4, required: true, className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none", placeholder: "Hey! Thanks for commenting. Here is your direct link: https://...", value: responseMsg, onChange: (e) => setResponseMsg(e.target.value) })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx(Button, { variant: "outline", type: "button", className: "w-1/3", onClick: () => setCreateModal(false), children: "Cancel" }), _jsx(Button, { variant: "gradient", type: "submit", className: "w-2/3", children: "Activate Rule" })] })] })] }) }))] }));
}
