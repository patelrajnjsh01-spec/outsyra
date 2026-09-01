"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-200 ${
                scrolled
                    ? "bg-white/80 dark:bg-[#08090d]/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/[0.08] shadow-sm"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Outsyra
                        </span>
                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                            Creator OS
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    <Link href="/templates" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                        <Sparkles className="h-3 w-3" />
                        Templates
                    </Link>
                    <Link href="/#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="/#ecosystem" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                        Ecosystem
                    </Link>
                    <Link href="/#pricing" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/#faq" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                        FAQ
                    </Link>
                    <Link
                        href="/public/rajnish"
                        target="_blank"
                        className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Store
                        <ExternalLink className="h-3 w-3 opacity-70" />
                    </Link>
                </nav>

                {/* Right Side: Theme Switcher + Auth CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="text-xs font-semibold">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="gradient" size="sm" className="gap-1.5 text-xs font-bold shadow-md">
                            <span>Start Building Free</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu & Theme Toggle Trigger */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden border-b border-zinc-200 dark:border-white/[0.08] bg-white/95 dark:bg-[#08090d]/95 backdrop-blur-2xl px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-4">
                    <Link
                        href="/#features"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 py-1.5 hover:text-indigo-600"
                    >
                        Features
                    </Link>
                    <Link
                        href="/#ecosystem"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 py-1.5 hover:text-indigo-600"
                    >
                        Ecosystem
                    </Link>
                    <Link
                        href="/#demo"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 py-1.5 hover:text-indigo-600"
                    >
                        Interactive Demo
                    </Link>
                    <Link
                        href="/#pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 py-1.5 hover:text-indigo-600"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/#faq"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 py-1.5 hover:text-indigo-600"
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/public/rajnish"
                        target="_blank"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-bold text-indigo-600 dark:text-indigo-400 py-1.5"
                    >
                        Live Demo Store (@rajnish)
                    </Link>
                    <div className="pt-3 flex flex-col gap-2.5 border-t border-zinc-200 dark:border-white/5">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full text-xs font-bold">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="gradient" className="w-full text-xs font-bold">
                                Start Building Free
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
