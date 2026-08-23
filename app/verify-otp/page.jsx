"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function VerifyOtpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const purpose = searchParams.get("purpose") || "signup";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (!email) {
            router.push("/signup");
        }
    }, [email, router]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => setCountdown((c) => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const maskedEmail = email
        ? email.replace(/^(.)(.*)(@.*)$/, (_, first, mid, last) => `${first}${"*".repeat(Math.max(mid.length, 3))}${last}`)
        : "your email";

    async function handleVerify(e) {
        if (e) e.preventDefault();
        if (otp.length !== 6) {
            setError("Please enter the complete 6-digit verification code.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/auth/verify-email-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, purpose }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Verification failed.");
            }

            setSuccessMessage("Code verified successfully! Redirecting...");
            setTimeout(() => {
                router.push("/dashboard");
                router.refresh();
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        if (countdown > 0 || resending) return;
        setResending(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/auth/send-email-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, purpose }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to resend code.");
            }

            setSuccessMessage("A fresh 6-digit code has been dispatched to your email.");
            setCountdown(60);
        } catch (err) {
            setError(err.message);
        } finally {
            setResending(false);
        }
    }

    return (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-6">
            <div className="text-center space-y-1">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    We sent a 6-digit security code to: <br />
                    <span className="font-bold text-zinc-900 dark:text-white">{maskedEmail}</span>
                </p>
            </div>

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

            <form onSubmit={handleVerify} className="space-y-6">
                <div className="py-2">
                    <OtpInput value={otp} onChange={setOtp} disabled={loading} autoFocus />
                </div>

                <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-11 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/25"
                >
                    <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </form>

            <div className="pt-2 text-center text-xs text-zinc-500 border-t border-zinc-100 dark:border-white/5">
                <p className="mb-2">Didn't receive the code?</p>
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={countdown > 0 || resending}
                    className={`inline-flex items-center gap-1.5 font-bold transition-colors ${
                        countdown > 0 || resending
                            ? "text-zinc-400 cursor-not-allowed"
                            : "text-indigo-600 dark:text-indigo-400 hover:underline"
                    }`}
                >
                    <RefreshCw className={`h-3 w-3 ${resending ? "animate-spin" : ""}`} />
                    <span>{countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}</span>
                </button>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
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
                    <ShieldCheck className="h-6 w-6" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Enter Verification Code
                </h1>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <Suspense fallback={<div className="glass-card p-8 rounded-3xl animate-pulse h-64" />}>
                    <VerifyOtpForm />
                </Suspense>
            </div>
        </div>
    );
}
