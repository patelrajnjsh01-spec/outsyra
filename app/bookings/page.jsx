"use client";

import React, { useState } from "react";
import { Video, User, ExternalLink, Calendar, Clock, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VideoService } from "@/lib/services/video/index.js";

export default function BookingsListPage() {
    const [appointments] = useState([
        {
            id: "appt-1",
            customer_name: "Liam O'Connor",
            customer_email: "liam.oc@outlook.com",
            service_title: "30-Minute Growth Strategy Call",
            start_time: new Date(Date.now() + 86400000).toISOString(),
            duration: "30 mins",
            google_meet_url: "https://meet.google.com/new",
            jitsi_url: "https://meet.jit.si/outsyra-growth-call-liam-38492#config.prejoinPageEnabled=false&config.prejoinConfig.enabled=false&config.requireDisplayName=false&userInfo.displayName=%22Rajnish%20Sharma%22",
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
            google_meet_url: "https://meet.google.com/new",
            jitsi_url: "https://meet.jit.si/outsyra-offer-audit-marcus-94821#config.prejoinPageEnabled=false&config.prejoinConfig.enabled=false&config.requireDisplayName=false&userInfo.displayName=%22Rajnish%20Sharma%22",
            status: "confirmed",
            answers: {
                "Main creator handle": "@marcus_sterling",
                "Primary bottleneck": "Scaling our paid Notion workspace from $2k to $10k/mo",
            },
        },
    ]);

    function launchMeeting(platform) {
        const videoService = VideoService.getInstance();
        const url = videoService.createMeeting("instant-call", platform);
        window.open(url, "_blank");
    }

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Scheduled Bookings & Video Calling"
                subtitle="Manage client consultations with instant 1-click Google Meet and Jitsi Meet video rooms."
            />
            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                {/* Instant Dual Video Meeting Launcher */}
                <div className="glass-card p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Video className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Instant Video Call Generator</h3>
                                <Badge variant="success" className="text-[10px]">Google Meet & Jitsi</Badge>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                                Launch a private video room instantly using either Google Meet or Jitsi (zero login required).
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                        <Button
                            variant="gradient"
                            className="gap-2 text-xs flex-1 md:flex-initial"
                            onClick={() => launchMeeting("google_meet")}
                        >
                            <Video className="h-4 w-4" />
                            <span>Launch Google Meet</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="gap-2 text-xs border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-200 hover:bg-indigo-500/20 flex-1 md:flex-initial"
                            onClick={() => launchMeeting("jitsi")}
                        >
                            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <span>Launch Jitsi Room</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                        <Card
                            key={appt.id}
                            className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-5 flex flex-col justify-between shadow-sm"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Badge variant="success" className="text-[10px]">
                                        Confirmed
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{appt.duration}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">{appt.service_title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                        <User className="h-3.5 w-3.5 text-zinc-500" />
                                        <span className="text-zinc-900 dark:text-white font-medium">{appt.customer_name}</span>
                                        <span>({appt.customer_email})</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 space-y-2 text-xs">
                                    <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                        Intake Answers:
                                    </p>
                                    {Object.entries(appt.answers).map(([q, a], i) => (
                                        <div key={i}>
                                            <span className="text-zinc-500">{q}: </span>
                                            <span className="text-zinc-800 dark:text-zinc-200 font-medium">{a}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href={appt.google_meet_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button variant="gradient" size="sm" className="w-full gap-1.5 text-xs">
                                            <Video className="h-3.5 w-3.5" />
                                            <span>Google Meet</span>
                                            <ExternalLink className="h-3 w-3 opacity-60" />
                                        </Button>
                                    </a>
                                    <a
                                        href={appt.jitsi_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full gap-1.5 text-xs border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-500/20"
                                        >
                                            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                            <span>Jitsi Room</span>
                                            <ExternalLink className="h-3 w-3 opacity-60" />
                                        </Button>
                                    </a>
                                </div>
                                <a
                                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(appt.service_title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="ghost" size="sm" className="w-full gap-2 text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>Add Appointment to Google Calendar</span>
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
