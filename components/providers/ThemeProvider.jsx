"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext({
    theme: "dark",
    setTheme: () => null,
    mounted: false,
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState("dark");
    const [mounted, setMounted] = useState(false);

    const applyTheme = useCallback((t) => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        if (t === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(systemDark ? "dark" : "light");
        } else {
            root.classList.add(t);
        }
    }, []);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("outsyra-theme") || "dark";
        setThemeState(stored);
        applyTheme(stored);

        // Listen for OS theme preference changes if system theme is selected
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleMediaChange = () => {
            const current = localStorage.getItem("outsyra-theme") || "dark";
            if (current === "system") {
                applyTheme("system");
            }
        };

        // Listen for storage events across tabs
        const handleStorageChange = (e) => {
            if (e.key === "outsyra-theme" && e.newValue) {
                setThemeState(e.newValue);
                applyTheme(e.newValue);
            }
        };

        mediaQuery.addEventListener("change", handleMediaChange);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [applyTheme]);

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem("outsyra-theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
