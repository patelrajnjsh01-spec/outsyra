"use client";
import React, { useState } from "react";
import { Video, User, ExternalLink, Calendar, Plus, CheckCircle2, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VideoService } from "@/lib/services/video";

export default function BookingsListPage() {
    const [appointments, setAppointments] = useState([
        {
            id: "appt-1",
            customer_name: "Liam O'Connor",
            customer_email: "liam.oc@outlook.com",
            service_title: "30-Minute Growth Strategy Call",
            start_time: new Date(Date.now() + 86400000).toISOString(),
            duration: "30 mins",
            meeting_url: "https://meet.google.com/new",
            platform: "Google Meet (Free)",
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
            meeting_url: "https://meet.google.com/new",
            platform: "Google Meet (Free)",
            status: "confirmed",
            answers: {
                "Main creator handle": "@marcus_sterling",
                "Primary bottleneck": "Scaling our paid Notion workspace from $2k to $10k/mo",
            },
        },
    ]);

    function createInstantMeet() {
        const videoService = VideoService.getInstance();
        const url = videoService.createMeeting("instant-call", "google_meet");
        window.open(url, "_blank");
    }

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Scheduled Bookings & Google Meet"
                subtitle="Manage client consultation calls, questionnaires, and launch instant Google Meet video rooms."
            />
            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                {/* Instant Google Meet Launcher Bar */}
                <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Video className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Instant Google Meet Room</h3>
                            <p className="text-xs text-zinc-400">Launch a free, zero-setup Google Meet video room for any unscheduled call.</p>
                        </div>
                    </div>
                    <Button variant="gradient" className="gap-2 text-xs" onClick={createInstantMeet}>
                        <Video className="h-4 w-4" />
                        Launch Google Meet Now
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                        <Card
                            key={appt.id}
                            className="glass-panel border-white/5 p-6 space-y-5 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Badge variant="success" className="text-[10px]">
                                        Confirmed
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                        <Clock className="h-3.5 w-3.5" />
                                        {appt.duration}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{appt.service_title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                                        <User className="h-3.5 w-3.5 text-zinc-500" />
                                        <span className="text-white font-medium">{appt.customer_name}</span>
                                        <span>({appt.customer_email})</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2 text-xs">
                                    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                                        Intake Answers:
                                    </p>
                                    {Object.entries(appt.answers).map(([q, a], i) => (
                                        <div key={i}>
                                            <span className="text-zinc-500">{q}: </span>
                                            <span className="text-zinc-200">{a}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-2">
                                <a
                                    href={appt.meeting_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                >
                                    <Button variant="gradient" size="sm" className="w-full gap-2 text-xs">
                                        <Video className="h-4 w-4" />
                                        Join Google Meet Room
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </a>
                                <a
                                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(appt.service_title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs border-white/10">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Add to G-Calendar
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
