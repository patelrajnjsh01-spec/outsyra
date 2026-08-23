"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext({
    user: null,
    loading: true,
    authenticated: false,
    refreshAuth: async () => {},
    logout: async () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const refreshAuth = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me", {
                method: "GET",
                credentials: "include",
                headers: { "Cache-Control": "no-cache" },
            });

            if (res.ok) {
                const data = await res.json();
                if (data.authenticated && data.user) {
                    setUser(data.user);
                    setAuthenticated(true);
                    return;
                }
            }
            setUser(null);
            setAuthenticated(false);
        } catch {
            setUser(null);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshAuth();
    }, [refreshAuth]);

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            setUser(null);
            setAuthenticated(false);
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, authenticated, refreshAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
