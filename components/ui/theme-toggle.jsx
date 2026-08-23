"use client";
import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle({ className = "" }) {
    const { theme, setTheme, mounted } = useTheme();

    if (!mounted) {
        return <div className="w-20 h-8 rounded-full bg-white/5 animate-pulse" />;
    }

    return (
        <div className={`inline-flex items-center p-1 rounded-full bg-zinc-900/80 dark:bg-zinc-900/90 border border-zinc-800/80 dark:border-white/10 shadow-sm ${className}`}>
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full text-xs transition-all ${
                    theme === "light"
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Light Mode"
            >
                <Sun className="h-3.5 w-3.5" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full text-xs transition-all ${
                    theme === "dark"
                        ? "bg-zinc-800 text-indigo-400 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Dark Mode"
            >
                <Moon className="h-3.5 w-3.5" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full text-xs transition-all ${
                    theme === "system"
                        ? "bg-zinc-800 text-white shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="System Mode"
            >
                <Monitor className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
