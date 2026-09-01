"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initialBookingServices } from "@/lib/supabase/mock-db";

export default function CalendarSchedulePage() {
    const [services] = useState(initialBookingServices);
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

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Calendar & Availability"
                subtitle="Configure your booking hours, Google Calendar 2-way sync, buffers, and meeting types."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <CalendarIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Google Calendar OAuth Sync</h3>
                                <Badge variant={googleConnected ? "success" : "secondary"} className="text-[10px]">
                                    {googleConnected ? "Connected" : "Internal Booking Active"}
                                </Badge>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                                Automatically checks your real-time Google Calendar availability and blocks conflicts.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant={googleConnected ? "outline" : "gradient"}
                        onClick={() => setGoogleConnected(!googleConnected)}
                        className="text-xs"
                    >
                        {googleConnected ? "Disconnect Google" : "Connect Google Calendar"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="glass-card border-zinc-200 dark:border-white/10">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base">Weekly Working Availability</CardTitle>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                    Set the hours when clients can book calls with you.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {days.map((day, idx) => (
                                    <div
                                        key={day.name}
                                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                                            day.active
                                                ? "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/10"
                                                : "bg-zinc-100/50 dark:bg-zinc-950/40 border-zinc-200/50 dark:border-white/5 opacity-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={day.active}
                                                onChange={() => toggleDay(idx)}
                                                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs font-semibold text-zinc-900 dark:text-white w-24">
                                                {day.name}
                                            </span>
                                        </div>
                                        {day.active ? (
                                            <div className="flex items-center gap-2 text-xs">
                                                <input
                                                    type="time"
                                                    value={day.start}
                                                    onChange={(e) => {
                                                        const updated = [...days];
                                                        updated[idx].start = e.target.value;
                                                        setDays(updated);
                                                    }}
                                                    className="rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 px-2 py-1 text-zinc-900 dark:text-white text-xs font-mono"
                                                />
                                                <span className="text-zinc-500">-</span>
                                                <input
                                                    type="time"
                                                    value={day.end}
                                                    onChange={(e) => {
                                                        const updated = [...days];
                                                        updated[idx].end = e.target.value;
                                                        setDays(updated);
                                                    }}
                                                    className="rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 px-2 py-1 text-zinc-900 dark:text-white text-xs font-mono"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-xs text-zinc-500">Unavailable</span>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Booking Event Types</h3>
                        </div>
                        {services.map((svc) => (
                            <Card key={svc.id} className="glass-card border-zinc-200 dark:border-white/10 p-5 space-y-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <Badge variant="gradient" className="text-[10px]">
                                        {svc.duration_minutes} Mins
                                    </Badge>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        ${svc.price} USD
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{svc.title}</h4>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                    {svc.description}
                                </p>
                                <div className="pt-2 flex items-center justify-between border-t border-zinc-200/60 dark:border-white/5 text-[11px] text-zinc-500">
                                    <span>Location: {svc.location_type?.toUpperCase()}</span>
                                    <Link
                                        href={`/book/${svc.slug}`}
                                        target="_blank"
                                        className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                                    >
                                        <span>Book Page</span>
                                        <ChevronRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
