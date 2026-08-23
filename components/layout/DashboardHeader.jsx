"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bell, Plus, Zap, ExternalLink, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader({ title, subtitle }) {
    const [quickMenuOpen, setQuickMenuOpen] = useState(false);
    const [notifsOpen, setNotifsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#0f1923]/90 px-6 backdrop-blur-2xl">
            <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    {title}
                </h1>
                {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3">
                <Link href="/public/rajnish" target="_blank">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex gap-1.5 text-xs text-[#00f0ff] border-[#00f0ff]/20 bg-[#162331] hover:bg-[#1a2c3d]"
                    >
                        <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
                        View Live Store
                        <ExternalLink className="h-3 w-3 opacity-60" />
                    </Button>
                </Link>

                <div className="relative">
                    <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => setQuickMenuOpen(!quickMenuOpen)}
                        className="gap-1.5 text-xs"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create</span>
                        <ChevronDown className="h-3 w-3 opacity-70" />
                    </Button>

                    {quickMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0f1923]/95 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 space-y-1">
                            <Link
                                href="/products?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#162331] rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-[#00e676]" />
                                Digital Product
                            </Link>
                            <Link
                                href="/courses?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#162331] rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-[#00f0ff]" />
                                Course / LMS
                            </Link>
                            <Link
                                href="/calendar?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#162331] rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
                                Booking Service
                            </Link>
                            <Link
                                href="/email?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-[#162331] rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-[#fbbf24]" />
                                Email Broadcast
                            </Link>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setNotifsOpen(!notifsOpen)}
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-[#162331] text-slate-400 hover:text-white hover:bg-[#1a2c3d] transition-colors"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#00f0ff] ring-2 ring-[#0f1923]" />
                    </button>

                    {notifsOpen && (
                        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0f1923]/95 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                <span className="text-xs font-bold text-white">Live Alerts</span>
                                <Badge variant="default" className="text-[10px]">
                                    3 New
                                </Badge>
                            </div>
                            <div className="py-2 space-y-3">
                                <div className="flex items-start gap-2.5 text-xs">
                                    <div className="h-2 w-2 rounded-full bg-[#00e676] mt-1.5" />
                                    <div>
                                        <p className="text-slate-200 font-semibold">New Sale: +$199.00</p>
                                        <p className="text-[11px] text-slate-400">
                                            Sophia enrolled in Creator Masterclass
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 text-xs">
                                    <div className="h-2 w-2 rounded-full bg-[#00f0ff] mt-1.5" />
                                    <div>
                                        <p className="text-slate-200 font-semibold">New Booking: 30-Min Call</p>
                                        <p className="text-[11px] text-slate-400">
                                            Liam booked for Tomorrow at 3:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
