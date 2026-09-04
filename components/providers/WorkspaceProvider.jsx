"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import { getAllWorkspaces, getWorkspace } from "@/lib/supabase/db";
import { initialWorkspace } from "@/lib/supabase/mock-db";

const WorkspaceContext = createContext({
    workspace: initialWorkspace,
    loading: true,
    isSuperAdmin: false,
    isImpersonating: false,
    allWorkspaces: [],
    switchWorkspace: async () => {},
    exitImpersonation: async () => {},
    refreshWorkspace: async () => {},
});

export function WorkspaceProvider({ children }) {
    const { user, authenticated } = useAuth();
    const [workspace, setWorkspace] = useState(initialWorkspace);
    const [allWorkspaces, setAllWorkspaces] = useState([]);
    const [isImpersonating, setIsImpersonating] = useState(false);
    const [loading, setLoading] = useState(true);

    const isSuperAdmin = user?.role === "superadmin" || user?.role === "admin";

    // Load workspaces and determine current active workspace
    const refreshWorkspace = useCallback(async () => {
        try {
            const list = getAllWorkspaces();
            setAllWorkspaces(list);

            // Check if superadmin is impersonating a creator
            let impersonatedId = null;
            if (typeof document !== "undefined") {
                const match = document.cookie.match(/(?:^|;\s*)outsyra_impersonated_ws=([^;]*)/);
                if (match) impersonatedId = decodeURIComponent(match[1]);
            }

            if (isSuperAdmin && impersonatedId) {
                const ws = await getWorkspace(impersonatedId);
                if (ws) {
                    setWorkspace(ws);
                    setIsImpersonating(true);
                    return;
                }
            }

            setIsImpersonating(false);

            // If creator is logged in, find their workspace
            if (user?.workspace_id || user?.email) {
                const userUsername = user.email ? user.email.split("@")[0].replace(/[^a-z0-9]/g, "") : "rajnish";
                const targetIdentifier = user.workspace_id || userUsername;
                const ws = await getWorkspace(targetIdentifier);
                if (ws) {
                    setWorkspace(ws);
                    return;
                }
            }

            // Fallback default workspace
            setWorkspace(initialWorkspace);
        } catch (err) {
            console.warn("[WorkspaceProvider] Error resolving workspace:", err);
            setWorkspace(initialWorkspace);
        } finally {
            setLoading(false);
        }
    }, [user, isSuperAdmin]);

    useEffect(() => {
        refreshWorkspace();
    }, [refreshWorkspace, authenticated]);

    // Superadmin switch creator workspace
    const switchWorkspace = async (workspaceId) => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/impersonate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workspace_id: workspaceId }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.workspace) {
                    setWorkspace(data.workspace);
                    setIsImpersonating(true);
                }
            }
        } catch (err) {
            console.error("Failed to switch workspace:", err);
        } finally {
            setLoading(false);
        }
    };

    // Exit impersonation and reset back to superadmin
    const exitImpersonation = async () => {
        try {
            setLoading(true);
            await fetch("/api/admin/impersonate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "exit" }),
            });

            if (typeof document !== "undefined") {
                document.cookie = "outsyra_impersonated_ws=; Max-Age=0; path=/;";
            }

            setIsImpersonating(false);
            refreshWorkspace();
        } catch (err) {
            console.error("Failed to exit impersonation:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <WorkspaceContext.Provider
            value={{
                workspace,
                loading,
                isSuperAdmin,
                isImpersonating,
                allWorkspaces,
                switchWorkspace,
                exitImpersonation,
                refreshWorkspace,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspace() {
    return useContext(WorkspaceContext);
}
