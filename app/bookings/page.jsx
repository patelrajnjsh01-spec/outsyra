"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Video, User, ExternalLink, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
export default function BookingsListPage() {
    const [appointments, setAppointments] = useState([
        {
            id: "appt-1",
            customer_name: "Liam O'Connor",
            customer_email: "liam.oc@outlook.com",
            service_title: "30-Minute Growth Strategy Call",
            start_time: new Date(Date.now() + 86400000).toISOString(),
            duration: "30 mins",
            meeting_url: "https://meet.jit.si/outsyra-growth-call-liam-38492",
            status: "confirmed",
            answers: {
                "Main creator handle": "@liamgrowth",
                "Primary bottleneck": "Converting bio visitors into email subscribers & digital product buyers",
            },
        },
        {
            id: "appt-2",
            customer_name: "Marcus Sterling",
            customer_email: "marcus@techagency.io",
            service_title: "60-Minute Intensive Offer Audit",
            start_time: new Date(Date.now() + 2 * 86400000).toISOString(),
            duration: "60 mins",
            meeting_url: "https://meet.jit.si/outsyra-offer-audit-marcus-94821",
            status: "confirmed",
            answers: {
                "Main creator handle": "@marcus_sterling",
                "Primary bottleneck": "Scaling our paid Notion workspace from $2k to $10k/mo",
            },
        },
    ]);
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Scheduled Bookings", subtitle: "Manage upcoming client consultation calls, questionnaires, and video meeting rooms." }), _jsx("main", { className: "p-6 md:p-8 space-y-6 max-w-7xl", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: appointments.map((appt) => (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-5 flex flex-col justify-between", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "success", className: "text-[10px]", children: "Confirmed" }), _jsx("span", { className: "text-xs text-indigo-400 font-medium", children: appt.duration })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-white", children: appt.service_title }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-zinc-400 mt-1", children: [_jsx(User, { className: "h-3.5 w-3.5 text-zinc-500" }), _jsx("span", { className: "text-white font-medium", children: appt.customer_name }), _jsxs("span", { children: ["(", appt.customer_email, ")"] })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2 text-xs", children: [_jsx("p", { className: "text-[11px] font-semibold text-zinc-400 uppercase tracking-wider", children: "Intake Answers:" }), Object.entries(appt.answers).map(([q, a], i) => (_jsxs("div", { children: [_jsxs("span", { className: "text-zinc-500", children: [q, ": "] }), _jsx("span", { className: "text-zinc-200", children: a })] }, i)))] })] }), _jsx("div", { className: "pt-4 border-t border-white/5 flex items-center justify-between", children: _jsx("a", { href: appt.meeting_url, target: "_blank", rel: "noopener noreferrer", className: "w-full", children: _jsxs(Button, { variant: "gradient", size: "sm", className: "w-full gap-2 text-xs", children: [_jsx(Video, { className: "h-4 w-4" }), "Join Instant Video Room (Jitsi / Meet)", _jsx(ExternalLink, { className: "h-3.5 w-3.5" })] }) }) })] }, appt.id))) }) })] }));
}
