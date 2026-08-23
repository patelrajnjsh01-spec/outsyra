"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, Lock, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OtpInput } from "@/components/auth/OtpInput";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getStrength = (pass) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-emerald-500"];

    async function handleReset(e) {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Missing email address. Please start from the Forgot Password screen.");
            return;
        }

        if (otp.length !== 6) {
            setError("Please enter the 6-digit reset code sent to your email.");
            return;
        }

        if (password.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            // 1. Verify Reset OTP
            const otpRes = await fetch("/api/auth/verify-reset-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const otpData = await otpRes.json();
            if (!otpRes.ok) {
                throw new Error(otpData.error || "Invalid or expired reset code.");
            }

            // 2. Update Password
            const resetRes = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const resetData = await resetRes.json();
            if (!resetRes.ok) {
                throw new Error(resetData.error || "Failed to update password.");
            }

            setSuccessMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
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

            <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block text-center">
                        6-Digit Reset Code
                    </label>
                    <OtpInput value={otp} onChange={setOtp} disabled={loading} />
                </div>

                <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 h-11 text-xs rounded-xl"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>

                    {password && (
                        <div className="space-y-1 pt-1">
                            <div className="flex gap-1 h-1">
                                {[0, 1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-full flex-1 rounded-full transition-all ${
                                            step < strength ? strengthColors[strength - 1] : "bg-zinc-200 dark:bg-white/10"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-[10px] font-semibold text-zinc-500">
                                Strength: {strengthLabels[strength - 1] || "Too Weak"}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 h-11 text-xs rounded-xl"
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-11 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/25 mt-2"
                >
                    <span>{loading ? "Updating Password..." : "Save New Password"}</span>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
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

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Set New Password
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Enter the 6-digit code sent to your email and your new password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <Suspense fallback={<div className="glass-card p-8 rounded-3xl animate-pulse h-64" />}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
