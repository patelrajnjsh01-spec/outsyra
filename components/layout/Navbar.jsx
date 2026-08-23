"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Zap, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0f1923]/90 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#00c6ff] via-[#0072ff] to-[#00f0ff] p-0.5 shadow-[0_0_15px_rgba(0,198,255,0.35)] group-hover:scale-105 transition-transform">
                        <div className="w-full h-full bg-[#0f1923] rounded-[10px] flex items-center justify-center">
                            <Zap className="h-4 w-4 text-[#00f0ff] stroke-[2.5]" />
                        </div>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 uppercase font-sans">
                        OUTSYRA
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 tracking-wider">
                            STUDIO
                        </span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Link href="/landing" className="hover:text-white transition-colors">
                        Platform
                    </Link>
                    <Link href="/pricing" className="hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/templates" className="hover:text-white transition-colors">
                        Templates
                    </Link>
                    <Link
                        href="/public/rajnish"
                        className="hover:text-[#00f0ff] text-[#00f0ff]/90 transition-colors flex items-center gap-1.5"
                    >
                        <span className="h-2 w-2 rounded-full bg-[#00e676] animate-pulse" />
                        Live Demo Store
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="text-xs font-bold text-slate-300 hover:text-white">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="gradient" size="sm" className="gap-2 text-xs">
                            Launch Studio <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-slate-400 hover:text-white"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-b border-white/5 bg-[#0f1923]/95 px-6 py-6 space-y-4">
                    <Link
                        href="/landing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-slate-300 hover:text-white py-2 text-sm font-semibold"
                    >
                        Platform
                    </Link>
                    <Link
                        href="/pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-slate-300 hover:text-white py-2 text-sm font-semibold"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/templates"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-slate-300 hover:text-white py-2 text-sm font-semibold"
                    >
                        Templates
                    </Link>
                    <Link
                        href="/public/rajnish"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[#00f0ff] py-2 text-sm font-semibold"
                    >
                        Live Demo Store (@rajnish)
                    </Link>
                    <div className="pt-4 flex flex-col gap-3">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="gradient" className="w-full">
                                Launch Creator Studio
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
