import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
export default function DashboardLayout({ children, }) {
    return (_jsxs("div", { className: "flex min-h-screen bg-zinc-950 text-zinc-100", children: [_jsx(DashboardSidebar, {}), _jsx("div", { className: "flex-1 flex flex-col min-w-0 overflow-y-auto", children: children })] }));
}
