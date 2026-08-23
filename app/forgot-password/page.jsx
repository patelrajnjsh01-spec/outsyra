"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Mail, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function handleForgotPassword(e) {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to process request.");
            }

            setSuccessMessage(data.message || "Reset instructions have been sent to your email.");
            setTimeout(() => {
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            }, 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Outsyra
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 shadow-inner">
                    <KeyRound className="h-6 w-6" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Reset Your Password
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Enter the email address associated with your creator account.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-5">
                    {error && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Registered Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                <Input
                                    type="email"
                                    placeholder="you@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 text-xs rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="gradient"
                            disabled={loading}
                            className="w-full h-11 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/25"
                        >
                            <span>{loading ? "Sending Reset Code..." : "Send Password Reset Code"}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    Remember your password?{" "}
                    <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Return to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
