"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }) {
    const { user, loading, authenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !authenticated) {
            router.replace("/login?next=/dashboard");
        }
    }, [loading, authenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                <p className="text-xs font-semibold text-zinc-500 animate-pulse">
                    Verifying session security...
                </p>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
}
