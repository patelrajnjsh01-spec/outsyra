"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Sparkles, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam === "oauth_cancelled") {
            setError("Google sign-in was cancelled. Please try again.");
        } else if (errorParam === "oauth_failed") {
            setError("Google sign-in failed. Please try again or use email login.");
        }
    }, [searchParams]);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Invalid email or password.");
            }

            const nextUrl = searchParams.get("next") || "/dashboard";
            router.push(nextUrl);
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleGoogleLogin() {
        setGoogleLoading(true);
        window.location.href = "/api/auth/google";
    }

    return (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-5">
            {/* Google OAuth Button */}
            <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="w-full h-11 text-xs font-bold gap-2.5 shadow-sm"
            >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                </svg>
                <span>{googleLoading ? "Connecting with Google..." : "Continue with Google"}</span>
            </Button>

            <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-200 dark:border-white/10 w-full" />
                <span className="bg-white dark:bg-[#0f1117] px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    or log in with email
                </span>
                <div className="border-t border-zinc-200 dark:border-white/10 w-full" />
            </div>

            <div className="p-3 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between gap-3">
                <div className="space-y-0.5 text-left">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">Demo Studio Access</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        rajnish@outsyra.com • Password@123
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setEmail("rajnish@outsyra.com");
                        setPassword("Password@123");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shrink-0 transition-colors shadow-sm"
                >
                    Auto-Fill
                </button>
            </div>

            {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Email Address
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

                {/* Password */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
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
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 pt-1">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember" className="text-xs text-zinc-600 dark:text-zinc-400">
                        Remember me for 7 days
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading}
                    className="w-full h-11 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/25"
                >
                    <span>{loading ? "Signing in..." : "Sign In to Studio"}</span>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
}

export default function LoginPage() {
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
                    Welcome Back, Creator
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Sign in to manage your storefront, courses, and audience growth.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <Suspense fallback={<div className="glass-card p-8 rounded-3xl animate-pulse h-64" />}>
                    <LoginForm />
                </Suspense>

                <p className="mt-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Start Building Free
                    </Link>
                </p>
            </div>
        </div>
    );
}