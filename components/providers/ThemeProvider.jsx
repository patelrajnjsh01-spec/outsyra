"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: "dark",
    setTheme: () => null,
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("outsyra-theme");
        if (stored) {
            setThemeState(stored);
            applyTheme(stored);
        } else {
            applyTheme("dark");
        }
    }, []);

    const applyTheme = (t) => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        if (t === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(systemDark ? "dark" : "light");
        } else {
            root.classList.add(t);
        }
    };

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
