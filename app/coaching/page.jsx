"use client";
import React, { useState } from "react";
import { Plus, CheckCircle2, Video, Sparkles, ExternalLink } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialCoachingOffers } from "@/lib/supabase/mock-db";
import { VideoService } from "@/lib/services/video";

export default function CoachingOffersPage() {
    const [offers, setOffers] = useState(initialCoachingOffers);
    const [createModal, setCreateModal] = useState(false);

    function startInstantCall(platform) {
        const videoService = VideoService.getInstance();
        const url = videoService.createMeeting("coaching-live", platform);
        window.open(url, "_blank");
    }

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="1:1 Coaching & Video Consultations"
                subtitle="Offer high-ticket mentorship, deep-dive strategy audits, and host calls on Google Meet or Jitsi."
            />
            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                {/* Instant Call Bar */}
                <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-white">Start a Live Client Coaching Session</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Select your preferred video platform to generate an instant meeting room.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="gradient"
                            size="sm"
                            className="gap-2 text-xs"
                            onClick={() => startInstantCall("google_meet")}
                        >
                            <Video className="h-4 w-4 text-emerald-300" />
                            Google Meet Room
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-xs border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20"
                            onClick={() => startInstantCall("jitsi")}
                        >
                            <Sparkles className="h-4 w-4 text-indigo-400" />
                            Jitsi Room
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-white">Active Coaching Offers</h3>
                        <p className="text-xs text-zinc-400">Clients can book directly through your link-in-bio storefront.</p>
                    </div>
                    <Button variant="gradient" onClick={() => setCreateModal(true)} className="gap-2 text-xs">
                        <Plus className="h-4 w-4" />
                        Create Coaching Offer
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                        <Card key={offer.id} className="glass-panel border-white/5 p-6 space-y-5 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Badge variant="gradient" className="text-[10px] capitalize">
                                        {offer.frequency.replace("_", " ")}
                                    </Badge>
                                    <span className="text-base font-bold text-emerald-400">
                                        ${offer.price} USD
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{offer.title}</h4>
                                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{offer.description}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                                        What's Included:
                                    </p>
                                    <div className="space-y-1.5">
                                        {offer.includes.map((inc, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                                                <span>{inc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 space-y-3">
                                <div className="flex items-center justify-between text-xs text-zinc-400">
                                    <span>{offer.duration_minutes}-min calls</span>
                                    <Badge variant="success" className="text-[10px]">Google Meet & Jitsi Ready</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full gap-1.5 text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                        onClick={() => startInstantCall("google_meet")}
                                    >
                                        <Video className="h-3.5 w-3.5" />
                                        Launch Google Meet
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full gap-1.5 text-xs border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                                        onClick={() => startInstantCall("jitsi")}
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Launch Jitsi
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
