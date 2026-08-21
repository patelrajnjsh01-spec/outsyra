"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, ChevronRight, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initialBookingServices } from "@/lib/supabase/mock-db";
export default function CalendarSchedulePage() {
    const [services, setServices] = useState(initialBookingServices);
    const [googleConnected, setGoogleConnected] = useState(false);
    const [days, setDays] = useState([
        { name: "Monday", active: true, start: "09:00", end: "17:00" },
        { name: "Tuesday", active: true, start: "09:00", end: "17:00" },
        { name: "Wednesday", active: true, start: "09:00", end: "17:00" },
        { name: "Thursday", active: true, start: "09:00", end: "17:00" },
        { name: "Friday", active: true, start: "10:00", end: "16:00" },
        { name: "Saturday", active: false, start: "10:00", end: "14:00" },
        { name: "Sunday", active: false, start: "10:00", end: "14:00" },
    ]);
    const toggleDay = (index) => {
        const updated = [...days];
        updated[index].active = !updated[index].active;
        setDays(updated);
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Calendar & Availability", subtitle: "Configure your booking hours, Google Calendar 2-way sync, buffers, and meeting types." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsxs("div", { className: "glass-panel p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400", children: _jsx(CalendarIcon, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-base font-bold text-white", children: "Google Calendar OAuth Sync" }), _jsx(Badge, { variant: googleConnected ? "success" : "secondary", className: "text-[10px]", children: googleConnected ? "Connected" : "Internal Booking Active" })] }), _jsx("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Automatically checks your real-time Google Calendar availability and blocks conflicts." })] })] }), _jsx(Button, { variant: googleConnected ? "outline" : "gradient", onClick: () => setGoogleConnected(!googleConnected), className: "text-xs", children: googleConnected ? "Disconnect Google" : "Connect Google Calendar" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: _jsxs(Card, { className: "glass-panel border-white/5", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsx(CardTitle, { className: "text-base", children: "Weekly Working Availability" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Set the hours when clients can book calls with you." })] }), _jsx(CardContent, { className: "space-y-3", children: days.map((day, idx) => (_jsxs("div", { className: `flex items-center justify-between p-3.5 rounded-2xl border transition-all ${day.active ? "bg-zinc-900/60 border-white/10" : "bg-zinc-950/40 border-white/5 opacity-50"}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: day.active, onChange: () => toggleDay(idx), className: "h-4 w-4 rounded bg-zinc-800 text-indigo-600 focus:ring-indigo-500" }), _jsx("span", { className: "text-xs font-semibold text-white w-24", children: day.name })] }), day.active ? (_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("input", { type: "time", value: day.start, onChange: (e) => {
                                                                    const updated = [...days];
                                                                    updated[idx].start = e.target.value;
                                                                    setDays(updated);
                                                                }, className: "rounded-lg bg-zinc-950 border border-white/10 px-2 py-1 text-white text-xs font-mono" }), _jsx("span", { className: "text-zinc-500", children: "-" }), _jsx("input", { type: "time", value: day.end, onChange: (e) => {
                                                                    const updated = [...days];
                                                                    updated[idx].end = e.target.value;
                                                                    setDays(updated);
                                                                }, className: "rounded-lg bg-zinc-950 border border-white/10 px-2 py-1 text-white text-xs font-mono" })] })) : (_jsx("span", { className: "text-xs text-zinc-500", children: "Unavailable" }))] }, day.name))) })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h3", { className: "text-sm font-semibold text-white", children: "Booking Event Types" }) }), services.map((svc) => (_jsxs(Card, { className: "glass-panel border-white/5 p-5 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Badge, { variant: "gradient", className: "text-[10px]", children: [svc.duration_minutes, " Mins"] }), _jsxs("span", { className: "text-xs font-bold text-emerald-400", children: ["$", svc.price, " USD"] })] }), _jsx("h4", { className: "text-sm font-bold text-white", children: svc.title }), _jsx("p", { className: "text-xs text-zinc-400 line-clamp-2 leading-relaxed", children: svc.description }), _jsxs("div", { className: "pt-2 flex items-center justify-between border-t border-white/5 text-[11px] text-zinc-500", children: [_jsxs("span", { children: ["Location: ", svc.location_type.toUpperCase()] }), _jsxs(Link, { href: `/book/${svc.slug}`, target: "_blank", className: "text-indigo-400 hover:underline flex items-center gap-1", children: ["Book Page ", _jsx(ChevronRight, { className: "h-3 w-3" })] })] })] }, svc.id)))] })] })] })] }));
}
