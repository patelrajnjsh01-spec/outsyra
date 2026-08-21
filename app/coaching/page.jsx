"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Plus, CheckCircle2, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialCoachingOffers } from "@/lib/supabase/mock-db";
export default function CoachingOffersPage() {
    const [offers, setOffers] = useState(initialCoachingOffers);
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("1:1 90-Day Creator Growth Partnership");
    const [price, setPrice] = useState("1200.00");
    const [description, setDescription] = useState("High-touch personalized 1-on-1 coaching to build and scale your 6-figure creator funnel.");
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "1:1 Coaching Programs", subtitle: "Offer high-ticket mentorship, deep-dive strategy audits, and recurring coaching packages." }), _jsxs("main", { className: "p-6 md:p-8 space-y-6 max-w-7xl", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-white", children: "Active Coaching Offers" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Clients can book directly through your link-in-bio storefront." })] }), _jsxs(Button, { variant: "gradient", onClick: () => setCreateModal(true), className: "gap-2 text-xs", children: [_jsx(Plus, { className: "h-4 w-4" }), "Create Coaching Offer"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: offers.map((offer) => (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "gradient", className: "text-[10px] capitalize", children: offer.frequency.replace("_", " ") }), _jsxs("span", { className: "text-base font-bold text-emerald-400", children: ["$", offer.price, " USD"] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold text-white", children: offer.title }), _jsx("p", { className: "text-xs text-zinc-400 mt-1 leading-relaxed", children: offer.description })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-[11px] font-semibold text-zinc-300 uppercase tracking-wider", children: "What's Included:" }), _jsx("div", { className: "space-y-1.5", children: offer.includes.map((inc, i) => (_jsxs("div", { className: "flex items-center gap-2 text-xs text-zinc-300", children: [_jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-indigo-400" }), _jsx("span", { children: inc })] }, i))) })] }), _jsxs("div", { className: "pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500", children: [_jsxs("span", { children: [offer.duration_minutes, "-min calls via Jitsi / Meet"] }), _jsx(Badge, { variant: "success", className: "text-[10px]", children: "Active in Store" })] })] }, offer.id))) })] })] }));
}
