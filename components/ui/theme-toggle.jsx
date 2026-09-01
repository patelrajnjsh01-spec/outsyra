"use client";
import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle({ className = "" }) {
    const { theme, setTheme, mounted } = useTheme();

    if (!mounted) {
        return <div className={`w-24 h-8 rounded-full bg-zinc-200/50 dark:bg-white/5 animate-pulse ${className}`} />;
    }

    return (
        <div
            className={`inline-flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 shadow-xs transition-colors duration-200 ${className}`}
            role="group"
            aria-label="Theme selector"
        >
            <button
                type="button"
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    theme === "light"
                        ? "bg-white text-zinc-900 shadow-sm font-bold"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Light Mode"
                aria-label="Switch to light mode"
            >
                <Sun className="h-3.5 w-3.5" />
            </button>
            <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    theme === "dark"
                        ? "bg-zinc-800 text-indigo-400 shadow-sm font-bold"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Dark Mode"
                aria-label="Switch to dark mode"
            >
                <Moon className="h-3.5 w-3.5" />
            </button>
            <button
                type="button"
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    theme === "system"
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-bold"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="System Mode"
                aria-label="Switch to system theme"
            >
                <Monitor className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
