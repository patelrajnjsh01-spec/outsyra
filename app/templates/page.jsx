"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Download, Sliders, Check, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialTemplates } from "@/lib/supabase/mock-db";
export default function TemplateStudioPage() {
    const [templates, setTemplates] = useState(initialTemplates);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [activeEditorTemplate, setActiveEditorTemplate] = useState(null);
    // Live Canvas Editing State
    const [customText, setCustomText] = useState("");
    const [customBg, setCustomBg] = useState("");
    const [downloadNotice, setDownloadNotice] = useState(false);
    const categories = [
        { id: "all", label: "All Formats" },
        { id: "instagram_post", label: "Instagram Post (1080x1080)" },
        { id: "youtube_thumbnail", label: "YouTube Thumbnail" },
        { id: "reels_cover", label: "Reels / TikTok Cover" },
    ];
    const filteredTemplates = selectedCategory === "all"
        ? templates
        : templates.filter((t) => t.category === selectedCategory);
    const openEditor = (tmpl) => {
        setActiveEditorTemplate(tmpl);
        const mainTextEl = tmpl.canvas_json.elements.find((el) => el.type === "text");
        setCustomText(mainTextEl?.content || "");
        setCustomBg(tmpl.canvas_json.background);
    };
    const handleDownload = () => {
        setDownloadNotice(true);
        setTimeout(() => setDownloadNotice(false), 2500);
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Social Media Template Studio", subtitle: "Dynamic JSON-rendered design templates for high-converting social carousels and thumbnails." }), _jsxs("main", { className: "p-6 md:p-8 space-y-8 max-w-7xl", children: [_jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: categories.map((cat) => (_jsx("button", { onClick: () => setSelectedCategory(cat.id), className: `px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.id
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5"}`, children: cat.label }, cat.id))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTemplates.map((tmpl) => (_jsxs(Card, { className: "glass-panel border-white/5 overflow-hidden flex flex-col justify-between group", children: [_jsxs("div", { children: [_jsxs("div", { className: "h-56 w-full p-6 flex flex-col justify-between relative overflow-hidden transition-all group-hover:scale-[1.01]", style: { background: tmpl.canvas_json.background }, children: [_jsx("div", { className: "space-y-2", children: tmpl.canvas_json.elements.map((el) => (_jsxs("div", { children: [el.type === "badge" && (_jsx("span", { className: "inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider", style: { backgroundColor: el.color }, children: el.content })), el.type === "text" && (_jsx("p", { className: "font-extrabold text-white leading-tight mt-2", style: {
                                                                    fontSize: `${Math.min(22, (el.fontSize || 32) * 0.45)}px`,
                                                                    color: el.color || "#ffffff",
                                                                }, children: el.content }))] }, el.id))) }), _jsxs("div", { className: "flex justify-between items-center text-[10px] text-zinc-400", children: [_jsxs("span", { className: "font-mono", children: [tmpl.canvas_json.width, "x", tmpl.canvas_json.height] }), _jsx(Badge, { variant: "outline", className: "text-[9px] capitalize bg-black/40", children: tmpl.category.replace("_", " ") })] })] }), _jsxs("div", { className: "p-5 space-y-2", children: [_jsx("h4", { className: "font-bold text-white text-sm", children: tmpl.title }), _jsx("div", { className: "flex gap-1.5 flex-wrap", children: tmpl.tags.map((t, i) => (_jsxs("span", { className: "text-[10px] text-zinc-500", children: ["#", t] }, i))) })] })] }), _jsx("div", { className: "p-4 bg-zinc-950/60 border-t border-white/5 flex gap-2", children: _jsxs(Button, { variant: "gradient", size: "sm", onClick: () => openEditor(tmpl), className: "w-full text-xs gap-1.5", children: [_jsx(Sliders, { className: "h-3.5 w-3.5" }), "Customize Template"] }) })] }, tmpl.id))) })] }), activeEditorTemplate && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-4xl w-full flex flex-col lg:flex-row gap-8 animate-in fade-in zoom-in-95", children: [_jsx("div", { className: "flex-1 flex flex-col items-center justify-center", children: _jsxs("div", { className: "w-full aspect-square max-w-[360px] rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-white/10", style: { background: customBg }, children: [_jsxs("div", { children: [_jsx("span", { className: "px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold uppercase", children: "OUTSYRA STUDIO" }), _jsx("p", { className: "text-xl font-extrabold text-white mt-4 leading-tight whitespace-pre-line", children: customText || "Your headline text here..." })] }), _jsx("p", { className: "text-xs text-zinc-400", children: "@rajnish_creates \u2022 outsyra.com/rajnish" })] }) }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Edit & Export Template" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Modify dynamic JSON elements in real time." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Headline Text" }), _jsx("textarea", { rows: 4, value: customText, onChange: (e) => setCustomText(e.target.value), className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Background Color / Preset" }), _jsx("div", { className: "flex gap-2", children: ["#09090b", "#0f0728", "#061a14", "#1e1b4b", "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"].map((bg, idx) => (_jsx("button", { onClick: () => setCustomBg(bg), className: "h-8 w-8 rounded-lg border border-white/20", style: { background: bg } }, idx))) })] }), downloadNotice && (_jsxs("p", { className: "text-xs text-emerald-400 flex items-center gap-1 font-medium", children: [_jsx(Check, { className: "h-3.5 w-3.5" }), " High-Resolution Asset Exported!"] })), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-white/5", children: [_jsx(Button, { variant: "outline", className: "w-1/3", onClick: () => setActiveEditorTemplate(null), children: "Close" }), _jsxs(Button, { variant: "gradient", className: "w-2/3 gap-2", onClick: handleDownload, children: [_jsx(Download, { className: "h-4 w-4" }), "Export PNG / JSON"] })] })] })] }) }))] }));
}
