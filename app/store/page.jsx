"use client";
import React, { useState, useEffect } from "react";
import {
    Sparkles,
    Plus,
    Eye,
    Check,
    Package,
    GraduationCap,
    Calendar,
    Mail,
    Users,
    Link as LinkIcon,
    Video,
    Trash2,
    Save,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    getStoreBlocks,
    addStoreBlock,
    updateStoreBlock,
    deleteStoreBlock,
    reorderStoreBlocks,
    getWorkspace,
    updateWorkspace,
} from "@/lib/supabase/db";

export default function StoreCustomizerPage() {
    const [blocks, setBlocks] = useState([]);
    const [theme, setTheme] = useState({
        primaryColor: "#6366f1",
        backgroundColor: "#09090b",
        cardStyle: "glass",
        fontFamily: "Inter",
        buttonShape: "rounded-xl",
        layout: "classic",
    });
    const [activeTab, setActiveTab] = useState("blocks");
    const [newBlockModal, setNewBlockModal] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoreData() {
            try {
                const [blocksData, wsData] = await Promise.all([
                    getStoreBlocks("ws-rajnish-001"),
                    getWorkspace("rajnish"),
                ]);
                setBlocks(blocksData || []);
                if (wsData?.theme_config) {
                    setTheme(wsData.theme_config);
                }
            } catch (err) {
                console.error("Failed to load store data", err);
            } finally {
                setLoading(false);
            }
        }
        loadStoreData();
    }, []);

    const toggleBlockVisibility = async (id) => {
        const target = blocks.find((b) => b.id === id);
        if (!target) return;
        const updatedVisibility = !target.is_visible;
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, is_visible: updatedVisibility } : b)));
        await updateStoreBlock(id, { is_visible: updatedVisibility });
    };

    const handleDeleteBlock = async (id) => {
        setBlocks(blocks.filter((b) => b.id !== id));
        await deleteStoreBlock(id);
    };

    const moveBlock = async (index, direction) => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return;
        const newBlocks = [...blocks];
        const temp = newBlocks[index];
        newBlocks[index] = newBlocks[targetIndex];
        newBlocks[targetIndex] = temp;
        setBlocks(newBlocks);
        await reorderStoreBlocks("ws-rajnish-001", newBlocks);
    };

    const handleAddBlock = async (type, title, subtitle) => {
        const newBlock = await addStoreBlock("ws-rajnish-001", {
            type,
            title,
            subtitle,
        });
        setBlocks([...blocks, newBlock]);
        setNewBlockModal(false);
    };

    const handleSave = async () => {
        await updateWorkspace("ws-rajnish-001", { theme_config: theme });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Link-in-Bio Store Customizer"
                subtitle="Design your public creator page, reorder monetization blocks, and save live to Supabase PostgreSQL."
            />
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Left controls pane */}
                <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-3xl border-r border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setActiveTab("blocks")}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                    activeTab === "blocks"
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                Store Blocks
                            </button>
                            <button
                                onClick={() => setActiveTab("design")}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                    activeTab === "design"
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                Themes & Design
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            {savedNotice && (
                                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                                    <Check className="h-3.5 w-3.5" /> Saved & Live!
                                </span>
                            )}
                            <Button variant="gradient" size="sm" onClick={handleSave} className="gap-1.5 text-xs">
                                <Save className="h-3.5 w-3.5" />
                                Save to Database
                            </Button>
                        </div>
                    </div>

                    {activeTab === "blocks" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Active Store Blocks</h3>
                                    <p className="text-xs text-zinc-400">
                                        Reorder, edit, or toggle blocks live in Supabase.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setNewBlockModal(true)}
                                    className="gap-1.5 text-xs text-indigo-300 border-indigo-500/20"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Add Block
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {blocks.map((block, idx) => (
                                    <div
                                        key={block.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                            block.is_visible
                                                ? "glass-panel border-white/5"
                                                : "bg-zinc-950/40 border-white/5 opacity-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="flex flex-col gap-1 text-zinc-600">
                                                <button
                                                    onClick={() => moveBlock(idx, "up")}
                                                    disabled={idx === 0}
                                                    className="hover:text-zinc-300 disabled:opacity-20 text-[10px]"
                                                >
                                                    ▲
                                                </button>
                                                <button
                                                    onClick={() => moveBlock(idx, "down")}
                                                    disabled={idx === blocks.length - 1}
                                                    className="hover:text-zinc-300 disabled:opacity-20 text-[10px]"
                                                >
                                                    ▼
                                                </button>
                                            </div>
                                            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                                                {block.type === "product" && <Package className="h-4 w-4" />}
                                                {block.type === "course" && <GraduationCap className="h-4 w-4" />}
                                                {block.type === "booking" && <Calendar className="h-4 w-4" />}
                                                {block.type === "coaching" && <Video className="h-4 w-4" />}
                                                {block.type === "newsletter" && <Mail className="h-4 w-4" />}
                                                {block.type === "community" && <Users className="h-4 w-4" />}
                                                {block.type === "header" && <Sparkles className="h-4 w-4" />}
                                                {block.type === "socials" && <LinkIcon className="h-4 w-4" />}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-white truncate">{block.title}</p>
                                                {block.subtitle && (
                                                    <p className="text-[11px] text-zinc-400 truncate">{block.subtitle}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] capitalize">
                                                {block.type}
                                            </Badge>
                                            <button
                                                onClick={() => toggleBlockVisibility(block.id)}
                                                className={`text-xs px-2 py-1 rounded-lg border transition-all ${
                                                    block.is_visible
                                                        ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/10"
                                                        : "border-zinc-700 text-zinc-500"
                                                }`}
                                            >
                                                {block.is_visible ? "Visible" : "Hidden"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBlock(block.id)}
                                                className="text-zinc-600 hover:text-red-400 p-1"
                                                title="Delete Block"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "design" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Theme Presets</h3>
                                <p className="text-xs text-zinc-400">Choose a high-converting aesthetic.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                                    {[
                                        { name: "Dark Neon", color: "#6366f1", bg: "#09090b", style: "glass" },
                                        { name: "Cyber Purple", color: "#a855f7", bg: "#0f0728", style: "neon" },
                                        { name: "Emerald Pro", color: "#10b981", bg: "#061a14", style: "glass" },
                                        { name: "Sunset Gold", color: "#f59e0b", bg: "#180e05", style: "solid" },
                                        { name: "Minimal Mono", color: "#ffffff", bg: "#000000", style: "minimal" },
                                    ].map((preset, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                setTheme({
                                                    ...theme,
                                                    primaryColor: preset.color,
                                                    backgroundColor: preset.bg,
                                                    cardStyle: preset.style,
                                                })
                                            }
                                            className="p-3 rounded-2xl border border-white/5 bg-zinc-900/60 flex flex-col items-center gap-2 hover:border-indigo-500/30 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-1.5 w-full">
                                                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: preset.color }} />
                                                <div className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: preset.bg }} />
                                            </div>
                                            <span className="text-xs font-semibold text-zinc-200">{preset.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right live mobile preview */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center bg-zinc-950/40">
                    <div className="w-[320px] rounded-[40px] border-4 border-zinc-800 bg-zinc-950 p-4 shadow-2xl overflow-hidden min-h-[580px] flex flex-col">
                        <div className="text-center py-4 space-y-1 border-b border-white/5">
                            <div className="h-14 w-14 rounded-full mx-auto bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                                RS
                            </div>
                            <h4 className="text-sm font-bold text-white">Rajnish Sharma</h4>
                            <p className="text-[10px] text-zinc-400">Creator & Growth Strategist 🚀</p>
                        </div>
                        <div className="space-y-2 py-4 flex-1 overflow-y-auto">
                            {blocks
                                .filter((b) => b.is_visible && b.type !== "header")
                                .map((b) => (
                                    <div
                                        key={b.id}
                                        className="p-3 rounded-xl border border-white/10 bg-white/5 text-center text-xs font-medium text-white shadow-sm hover:border-indigo-500/40 transition-all"
                                    >
                                        {b.title}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Add Block */}
            {newBlockModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 rounded-3xl border border-white/10 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
                        <h3 className="text-base font-bold text-white">Add New Storefront Block</h3>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {[
                                { type: "product", label: "Digital Product", desc: "Sell PDF, Ebook, Zip" },
                                { type: "course", label: "Video Course", desc: "Sell LMS Access" },
                                { type: "booking", label: "Call Booking", desc: "1:1 Google Meet / Jitsi" },
                                { type: "newsletter", label: "Email Opt-in", desc: "Collect Lead Emails" },
                                { type: "link", label: "Custom Link", desc: "Any External URL" },
                                { type: "socials", label: "Social Links", desc: "IG, YouTube, Twitter" },
                            ].map((item) => (
                                <button
                                    key={item.type}
                                    onClick={() => handleAddBlock(item.type, `New ${item.label}`, item.desc)}
                                    className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-left hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-all space-y-1"
                                >
                                    <p className="font-semibold text-white">{item.label}</p>
                                    <p className="text-[10px] text-zinc-400">{item.desc}</p>
                                </button>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full text-xs text-zinc-400" onClick={() => setNewBlockModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
