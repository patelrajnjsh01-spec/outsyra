"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Video, CheckCircle2, ArrowLeft, Clock, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { initialBookingServices } from "@/lib/supabase/mock-db";
import { VideoService } from "@/lib/services/video/index.js";

export default function StandaloneBookPage() {
    const [bookingType, setBookingType] = useState("direct"); // "direct" or "calendly"
    const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
    const [completed, setCompleted] = useState(false);
    const [videoPlatform, setVideoPlatform] = useState("google_meet");
    const service = initialBookingServices[0];

    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";

    function handleConfirm() {
        const videoService = VideoService.getInstance();
        videoService.createMeeting("coaching-session", videoPlatform);
        setCompleted(true);
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 grid-bg relative overflow-hidden transition-colors duration-200">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="max-w-xl mx-auto w-full relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/public/rajnish"
                        className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Store
                    </Link>
                    <ThemeToggle />
                </div>

                <Card className="glass-card p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 border border-zinc-200 dark:border-white/10">
                    {!completed ? (
                        <>
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-4">
                                <Badge variant="gradient" className="text-xs">
                                    {service.duration_minutes} Minutes
                                </Badge>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    ${service.price.toFixed(2)} USD
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white">{service.title}</h1>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{service.description}</p>
                            </div>

                            {/* Booking provider selector */}
                            <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-200 dark:border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setBookingType("direct")}
                                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                        bookingType === "direct"
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                                >
                                    <Video className="h-3.5 w-3.5" />
                                    <span>Google Meet / Direct</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBookingType("calendly")}
                                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                        bookingType === "calendly"
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                                >
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Calendly Embed</span>
                                </button>
                            </div>

                            {bookingType === "direct" ? (
                                <>
                                    <div className="space-y-3">
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                            Video Meeting Provider (100% Free)
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setVideoPlatform("google_meet")}
                                                className={`p-3 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                                    videoPlatform === "google_meet"
                                                        ? "bg-emerald-500/10 dark:bg-emerald-600/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold"
                                                        : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                                }`}
                                            >
                                                <Video className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                <span>Google Meet (Free)</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setVideoPlatform("jitsi")}
                                                className={`p-3 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                                    videoPlatform === "jitsi"
                                                        ? "bg-indigo-500/10 dark:bg-indigo-600/20 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-bold"
                                                        : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                                }`}
                                            >
                                                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                <span>Jitsi Room</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                            Select Date & Time Slot
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {["09:30 AM", "11:00 AM", "03:00 PM"].map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`p-3 rounded-2xl text-xs font-mono border transition-all cursor-pointer ${
                                                        selectedSlot === slot
                                                            ? "bg-indigo-600 border-indigo-500 text-white font-bold"
                                                            : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                Your Full Name
                                            </label>
                                            <Input defaultValue="Liam O'Connor" className="text-xs" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                Email Address (for Google Meet & Calendar Invite)
                                            </label>
                                            <Input
                                                type="email"
                                                defaultValue="liam.oc@outlook.com"
                                                className="text-xs"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        variant="gradient"
                                        className="w-full h-12 text-sm font-bold shadow-lg"
                                        onClick={handleConfirm}
                                    >
                                        Confirm Appointment (${service.price.toFixed(2)})
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-4 text-center py-4">
                                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Calendly Live Scheduler</h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                            Select your live availability directly synced with Calendly.
                                        </p>
                                    </div>
                                    <a
                                        href={calendlyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full"
                                    >
                                        <Button variant="gradient" className="w-full gap-2 text-xs">
                                            <span>Open Calendly Scheduler</span>
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Booking Confirmed! 📅</h2>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto">
                                Your session is booked for{" "}
                                <strong className="text-zinc-900 dark:text-white">Tomorrow at {selectedSlot}</strong>. Your free{" "}
                                <strong className="text-emerald-600 dark:text-emerald-400">
                                    {videoPlatform === "google_meet" ? "Google Meet" : "Jitsi"}
                                </strong>{" "}
                                link has been generated!
                            </p>
                            <div className="pt-2 flex flex-col gap-2.5 max-w-sm mx-auto">
                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href="https://meet.google.com/new"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button variant="gradient" className="w-full gap-1.5 text-xs">
                                            <Video className="h-4 w-4" />
                                            Google Meet
                                        </Button>
                                    </a>
                                    <a
                                        href="https://meet.jit.si/outsyra-coaching-room-38492"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button variant="outline" className="w-full gap-1.5 text-xs border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-200 hover:bg-indigo-500/20">
                                            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                            Jitsi Room
                                        </Button>
                                    </a>
                                </div>
                                <Link href="/public/rajnish">
                                    <Button variant="ghost" className="w-full text-xs text-zinc-500 dark:text-zinc-400">
                                        Return to Store
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
