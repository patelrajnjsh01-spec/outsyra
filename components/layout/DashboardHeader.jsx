"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bell, Plus, Zap, ExternalLink, ChevronDown, Sparkles, Store, Package, GraduationCap, Calendar, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader({ title, subtitle }) {
    const [quickMenuOpen, setQuickMenuOpen] = useState(false);
    const [notifsOpen, setNotifsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#08090d]/85 px-6 backdrop-blur-xl transition-colors duration-200">
            <div>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                    {title}
                </h1>
                {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3">
                <Link href="/public/rajnish" target="_blank">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 border-indigo-500/25 bg-indigo-500/5 hover:bg-indigo-500/10"
                    >
                        <Zap className="h-3.5 w-3.5 text-indigo-500" />
                        <span>View Live Store</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                    </Button>
                </Link>

                {/* Global Create Button */}
                <div className="relative">
                    <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => setQuickMenuOpen(!quickMenuOpen)}
                        className="gap-1.5 text-xs shadow-sm"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create New</span>
                        <ChevronDown className="h-3 w-3 opacity-70" />
                    </Button>

                    {quickMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#0f1117]/95 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 space-y-1">
                            <Link
                                href="/products?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span>Digital Product</span>
                            </Link>
                            <Link
                                href="/courses?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                <span>Course / LMS</span>
                            </Link>
                            <Link
                                href="/calendar?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-purple-500" />
                                <span>Booking Service</span>
                            </Link>
                            <Link
                                href="/email?action=new"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-pink-500" />
                                <span>Email Broadcast</span>
                            </Link>
                            {/* <Link
                                href="/instagram"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-pink-400" />
                                <span>Instagram Auto-DM</span>
                            </Link> */}
                            <Link
                                href="/store"
                                onClick={() => setQuickMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors border-t border-zinc-100 dark:border-white/5"
                            >
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                <span>Customize Store</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setNotifsOpen(!notifsOpen)}
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#08090d]" />
                    </button>

                    {notifsOpen && (
                        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#0f1117]/95 p-4 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
                                <span className="text-xs font-bold text-zinc-900 dark:text-white">Recent Activity</span>
                                <Badge variant="default" className="text-[10px]">
                                    3 New
                                </Badge>
                            </div>
                            <div className="py-2 space-y-3">
                                <div className="flex items-start gap-2.5 text-xs">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                                    <div>
                                        <p className="text-zinc-900 dark:text-zinc-200 font-semibold">New Sale: +$199.00</p>
                                        <p className="text-[11px] text-zinc-500">
                                            Sophia enrolled in Creator Masterclass
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 text-xs">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5" />
                                    <div>
                                        <p className="text-zinc-900 dark:text-zinc-200 font-semibold">New Booking: 30-Min Call</p>
                                        <p className="text-[11px] text-zinc-500">
                                            Liam booked for Tomorrow at 3:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 text-xs">
                                    <div className="h-2 w-2 rounded-full bg-pink-500 mt-1.5" />
                                    <div>
                                        <p className="text-zinc-900 dark:text-zinc-200 font-semibold">Instagram Auto-DM Fired</p>
                                        <p className="text-[11px] text-zinc-500">
                                            Keyword "EBOOK" triggered by @creator_fan
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
