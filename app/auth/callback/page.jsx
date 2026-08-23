"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function CallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [statusText, setStatusText] = useState("Verifying your Google authentication...");
    const [error, setError] = useState("");

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam) {
            setError(
                errorParam === "google_oauth_not_configured"
                    ? "Google OAuth is not configured on the server. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables."
                    : errorParam === "oauth_cancelled"
                    ? "Google authentication was cancelled."
                    : "Google authentication failed. Please try again."
            );
            return;
        }

        async function verifyAuth() {
            try {
                setStatusText("Authenticating session with backend...");
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Cache-Control": "no-cache" },
                });

                const data = await res.json();

                if (data.authenticated && data.user) {
                    setStatusText("Success! Launching your Creator Studio...");
                    setTimeout(() => {
                        router.replace("/dashboard");
                    }, 500);
                } else {
                    setError("Failed to verify authenticated session. Please try logging in again.");
                }
            } catch (err) {
                console.error("Callback verification error:", err);
                setError("Network error while verifying session. Please try logging in again.");
            }
        }

        verifyAuth();
    }, [router, searchParams]);

    if (error) {
        return (
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-500/30 shadow-2xl max-w-md w-full text-center space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Authentication Error</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{error}</p>
                <div className="pt-2">
                    <Button
                        variant="gradient"
                        onClick={() => router.push("/login")}
                        className="w-full text-xs font-bold"
                    >
                        Return to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl max-w-md w-full text-center space-y-4">
            <div className="relative inline-block">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">Authenticating with Google</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 animate-pulse">{statusText}</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />
            <Suspense fallback={<div className="glass-card p-8 rounded-3xl animate-pulse h-48 w-80" />}>
                <CallbackHandler />
            </Suspense>
        </div>
    );
}
