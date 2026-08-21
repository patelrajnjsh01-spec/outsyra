"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Sparkles, Plus, Eye, Check, Package, GraduationCap, Calendar, Mail, Users, Link as LinkIcon, Video, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { initialStoreBlocks, initialWorkspace } from "@/lib/supabase/mock-db";
export default function StoreCustomizerPage() {
    const [blocks, setBlocks] = useState(initialStoreBlocks);
    const [theme, setTheme] = useState(initialWorkspace.theme_config);
    const [activeTab, setActiveTab] = useState("blocks");
    const [newBlockModal, setNewBlockModal] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);
    const toggleBlockVisibility = (id) => {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, is_visible: !b.is_visible } : b)));
    };
    const moveBlock = (index, direction) => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length)
            return;
        const newBlocks = [...blocks];
        const temp = newBlocks[index];
        newBlocks[index] = newBlocks[targetIndex];
        newBlocks[targetIndex] = temp;
        setBlocks(newBlocks);
    };
    const addBlock = (type, title, subtitle) => {
        const newBlock = {
            id: `block-${Date.now()}`,
            workspace_id: initialWorkspace.id,
            type,
            title,
            subtitle,
            order_index: blocks.length,
            is_visible: true,
        };
        setBlocks([...blocks, newBlock]);
        setNewBlockModal(false);
    };
    const handleSave = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Link-in-Bio Store Customizer", subtitle: "Design your public creator page, reorder monetization blocks, and preview in real-time." }), _jsxs("div", { className: "flex-1 flex flex-col lg:flex-row min-h-0", children: [_jsxs("div", { className: "flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-3xl border-r border-white/5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex bg-zinc-900 p-1 rounded-xl border border-white/5", children: [_jsx("button", { onClick: () => setActiveTab("blocks"), className: `px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "blocks" ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-white"}`, children: "Store Blocks" }), _jsx("button", { onClick: () => setActiveTab("design"), className: `px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "design" ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-white"}`, children: "Themes & Design" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [savedNotice && (_jsxs("span", { className: "text-xs text-emerald-400 font-medium flex items-center gap-1", children: [_jsx(Check, { className: "h-3.5 w-3.5" }), " Saved & Live!"] })), _jsx(Button, { variant: "gradient", size: "sm", onClick: handleSave, children: "Publish Changes" })] })] }), activeTab === "blocks" && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Active Store Blocks" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Reorder or toggle blocks on your public link." })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setNewBlockModal(true), className: "gap-1.5 text-xs text-indigo-300 border-indigo-500/20", children: [_jsx(Plus, { className: "h-3.5 w-3.5" }), "Add Block"] })] }), _jsx("div", { className: "space-y-3", children: blocks.map((block, idx) => (_jsxs("div", { className: `flex items-center justify-between p-4 rounded-2xl border transition-all ${block.is_visible
                                                ? "glass-panel border-white/5"
                                                : "bg-zinc-950/40 border-white/5 opacity-50"}`, children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [_jsxs("div", { className: "flex flex-col gap-1 text-zinc-600", children: [_jsx("button", { onClick: () => moveBlock(idx, "up"), disabled: idx === 0, className: "hover:text-zinc-300 disabled:opacity-20 text-[10px]", children: "\u25B2" }), _jsx("button", { onClick: () => moveBlock(idx, "down"), disabled: idx === blocks.length - 1, className: "hover:text-zinc-300 disabled:opacity-20 text-[10px]", children: "\u25BC" })] }), _jsxs("div", { className: "h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0", children: [block.type === "product" && _jsx(Package, { className: "h-4 w-4" }), block.type === "course" && _jsx(GraduationCap, { className: "h-4 w-4" }), block.type === "booking" && _jsx(Calendar, { className: "h-4 w-4" }), block.type === "coaching" && _jsx(Video, { className: "h-4 w-4" }), block.type === "newsletter" && _jsx(Mail, { className: "h-4 w-4" }), block.type === "community" && _jsx(Users, { className: "h-4 w-4" }), block.type === "header" && _jsx(Sparkles, { className: "h-4 w-4" }), block.type === "socials" && _jsx(LinkIcon, { className: "h-4 w-4" })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-xs font-semibold text-white truncate", children: block.title }), block.subtitle && (_jsx("p", { className: "text-[11px] text-zinc-400 truncate", children: block.subtitle }))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-[10px] capitalize", children: block.type }), _jsx("button", { onClick: () => toggleBlockVisibility(block.id), className: `text-xs px-2 py-1 rounded-lg border transition-all ${block.is_visible
                                                                ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/10"
                                                                : "border-zinc-700 text-zinc-500"}`, children: block.is_visible ? "Visible" : "Hidden" })] })] }, block.id))) })] })), activeTab === "design" && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Theme Presets" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Choose a high-converting aesthetic." }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3", children: [
                                                    { name: "Dark Neon", color: "#6366f1", bg: "#09090b", style: "glass" },
                                                    { name: "Cyber Purple", color: "#a855f7", bg: "#0f0728", style: "neon" },
                                                    { name: "Emerald Pro", color: "#10b981", bg: "#061a14", style: "glass" },
                                                    { name: "Sunset Gold", color: "#f59e0b", bg: "#180e05", style: "solid" },
                                                    { name: "Minimal Mono", color: "#ffffff", bg: "#000000", style: "minimal" },
                                                ].map((preset, idx) => (_jsxs("button", { onClick: () => setTheme({
                                                        ...theme,
                                                        primaryColor: preset.color,
                                                        backgroundColor: preset.bg,
                                                        cardStyle: preset.style,
                                                    }), className: "p-3 rounded-2xl border border-white/5 bg-zinc-900/60 hover:border-indigo-500/40 text-left transition-all", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "h-4 w-4 rounded-full", style: { backgroundColor: preset.color } }), _jsx("div", { className: "h-4 w-4 rounded-full border border-white/20", style: { backgroundColor: preset.bg } })] }), _jsx("span", { className: "text-xs font-medium text-white", children: preset.name })] }, idx))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Accent Color" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "color", value: theme.primaryColor, onChange: (e) => setTheme({ ...theme, primaryColor: e.target.value }), className: "h-10 w-12 rounded-xl bg-transparent cursor-pointer border border-white/10" }), _jsx(Input, { value: theme.primaryColor, onChange: (e) => setTheme({ ...theme, primaryColor: e.target.value }), className: "text-xs font-mono" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Card Button Shape" }), _jsxs("select", { value: theme.buttonShape, onChange: (e) => setTheme({ ...theme, buttonShape: e.target.value }), className: "w-full h-11 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-xs text-white", children: [_jsx("option", { value: "rounded-xl", children: "Rounded Medium" }), _jsx("option", { value: "rounded-full", children: "Pill (Rounded Full)" }), _jsx("option", { value: "rounded-none", children: "Sharp Corners" })] })] })] })] }))] }), _jsxs("div", { className: "w-full lg:w-[420px] p-6 md:p-8 bg-zinc-950 flex flex-col items-center justify-center", children: [_jsx("div", { className: "text-center mb-3", children: _jsxs("span", { className: "text-xs text-zinc-500 font-medium flex items-center justify-center gap-1.5", children: [_jsx(Eye, { className: "h-3.5 w-3.5 text-indigo-400" }), " Live Mobile View"] }) }), _jsx("div", { className: "w-[320px] h-[640px] rounded-[42px] border-[6px] border-zinc-800 bg-zinc-950 shadow-2xl p-4 overflow-y-auto relative flex flex-col text-center", children: _jsxs("div", { className: "pt-4 pb-6 space-y-4", children: [_jsx("img", { src: initialWorkspace.avatar_url, alt: "Avatar", className: "h-20 w-20 rounded-full mx-auto object-cover ring-2 ring-indigo-500 shadow-xl" }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-bold text-white", children: initialWorkspace.display_name }), _jsx("p", { className: "text-[11px] text-zinc-400 px-4 mt-1 leading-tight", children: initialWorkspace.bio })] }), _jsx("div", { className: "space-y-2.5 pt-2", children: blocks
                                                .filter((b) => b.is_visible && b.type !== "header")
                                                .map((b) => (_jsxs("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-left hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm group", style: { borderRadius: theme.buttonShape === "rounded-full" ? "9999px" : "16px" }, children: [_jsx("p", { className: "text-xs font-semibold text-white group-hover:text-indigo-300", children: b.title }), b.subtitle && (_jsx("p", { className: "text-[10px] text-zinc-400 truncate mt-0.5", children: b.subtitle }))] }, b.id))) }), _jsxs("div", { className: "pt-4 text-[10px] text-zinc-600", children: ["Powered by ", _jsx("span", { className: "font-semibold text-zinc-400", children: "Outsyra" })] })] }) })] })] }), newBlockModal && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 rounded-3xl border border-white/10 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95", children: [_jsx("h3", { className: "text-base font-bold text-white", children: "Add New Store Block" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                                { type: "product", title: "Digital Product", desc: "Sell PDF, ZIP, Ebook", icon: Package },
                                { type: "course", title: "Video Course", desc: "Enroll in LMS masterclass", icon: GraduationCap },
                                { type: "booking", title: "1:1 Booking", desc: "Consultation appointment", icon: Calendar },
                                { type: "coaching", title: "Coaching Offer", desc: "Recurring mentorship", icon: Video },
                                { type: "newsletter", title: "Email Newsletter", desc: "Lead capture box", icon: Mail },
                                { type: "community", title: "Community", desc: "Private circle access", icon: Users },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (_jsxs("button", { onClick: () => addBlock(item.type, item.title, item.desc), className: "p-3 rounded-2xl bg-zinc-900 border border-white/5 hover:border-indigo-500 text-left transition-all", children: [_jsx(Icon, { className: "h-5 w-5 text-indigo-400 mb-1.5" }), _jsx("p", { className: "text-xs font-semibold text-white", children: item.title }), _jsx("p", { className: "text-[10px] text-zinc-500", children: item.desc })] }, item.type));
                            }) }), _jsx(Button, { variant: "ghost", className: "w-full text-xs", onClick: () => setNewBlockModal(false), children: "Cancel" })] }) }))] }));
}
