"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
export default function BillingPage() {
    const [currentPlan, setCurrentPlan] = useState("Creator Pro");
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Subscription & Billing", subtitle: "Manage your Outsyra creator plan, invoice history, and payment methods." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-5xl", children: [_jsxs("div", { className: "glass-panel p-8 rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 to-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "gradient", className: "text-xs", children: "Active Subscription" }), _jsx("span", { className: "text-xs text-zinc-400", children: "Renews on Sep 21, 2026" })] }), _jsx("h3", { className: "text-2xl font-extrabold text-white", children: "Creator Pro Plan ($49 / month)" }), _jsx("p", { className: "text-xs text-zinc-300 max-w-lg", children: "Unlimited digital products, unlimited video courses, official Meta Instagram automations, Google Calendar sync, and 0% transaction fees." })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "Manage in Stripe Portal" }) })] }), _jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsx(CardTitle, { className: "text-base", children: "Invoice History" }), _jsx("div", { className: "divide-y divide-white/5 text-xs", children: [
                                    { id: "INV-2026-008", date: "Aug 21, 2026", amount: "$49.00", status: "Paid" },
                                    { id: "INV-2026-007", date: "Jul 21, 2026", amount: "$49.00", status: "Paid" },
                                    { id: "INV-2026-006", date: "Jun 21, 2026", amount: "$49.00", status: "Paid" },
                                ].map((inv) => (_jsxs("div", { className: "py-3 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-white", children: inv.id }), _jsx("p", { className: "text-[11px] text-zinc-500", children: inv.date })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "font-bold text-white", children: inv.amount }), _jsx(Badge, { variant: "success", className: "text-[10px]", children: inv.status })] })] }, inv.id))) })] })] })] }));
}
