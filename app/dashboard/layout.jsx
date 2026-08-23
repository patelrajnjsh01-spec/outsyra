"use client";

import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({ children }) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                    {children}
                </div>
            </div>
        </AuthGuard>
    );
}
