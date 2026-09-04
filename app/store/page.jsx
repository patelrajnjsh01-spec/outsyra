"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Sparkles,
    Plus,
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
    Eye,
    EyeOff,
    Smartphone,
    Tablet,
    Monitor,
    Share2,
    QrCode,
    Wand2,
    Palette,
    Layers,
    Type,
    CheckCircle2,
    Flame,
    Coffee,
    Clock,
    Star,
    ExternalLink,
    Copy,
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    ChevronUp,
    ChevronDown,
    Settings,
    Edit3,
    X,
    RefreshCw,
    CopyPlus,
    RotateCcw,
    MessageCircle,
    Phone,
    Sliders,
    Globe,
    Radio,
    Code,
    Image as ImageIcon,
    HelpCircle,
    Music,
    Heading,
    AlignLeft,
    Minus,
    Upload,
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
    replaceStoreBlocks,
    getWorkspace,
    updateWorkspace,
} from "@/lib/supabase/db";
import { TRENDY_TEMPLATES, AI_CREATOR_NICHES } from "@/data/trendy-templates";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";

export default function VisualPageBuilderPage() {
    const { workspace: activeWs } = useWorkspace();
    const activeWsId = activeWs?.id || "ws-rajnish-001";
    const activeWsUsername = activeWs?.username || "rajnish";

    // Workspace & Page state
    const [workspace, setWorkspace] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [isPublished, setIsPublished] = useState(true);
    const [theme, setTheme] = useState({
        primaryColor: "#00f0ff",
        secondaryColor: "#d946ef",
        backgroundColor: "#070814",
        backgroundImage: "",
        backgroundOverlay: "rgba(7, 8, 20, 0.78)",
        backgroundStyle: "cyber-grid",
        cardStyle: "neon-glow",
        fontFamily: "Outfit",
        buttonShape: "rounded-xl",
        layout: "classic",
        animation: "fade",
        glowColor: "rgba(0, 240, 255, 0.35)",
        accentBorder: "rgba(0, 240, 255, 0.4)",
        cardBg: "rgba(10, 13, 30, 0.8)",
        textColor: "#ffffff",
        subtextColor: "#94a3b8",
        badgeColor: "#00f0ff",
        badgeText: "#000000",
        templateId: "cyberpunk-neon",
    });

    // Profile Settings
    const [profile, setProfile] = useState({
        displayName: "Rajnish Sharma",
        username: "rajnish",
        bio: "Helping modern creators build 6-figure digital product businesses and automated funnels.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        followersCount: "125K+",
        verifiedBadge: true,
        alignment: "center",
    });

    // UI state
    const [activeCustomTab, setActiveCustomTab] = useState("blocks"); // "blocks" | "templates" | "ai" | "design" | "profile"
    const [previewDevice, setPreviewDevice] = useState("mobile"); // "mobile" | "tablet" | "desktop"
    const [newBlockModal, setNewBlockModal] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const [qrModal, setQrModal] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);
    const [copiedNotice, setCopiedNotice] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // AI Studio state
    const [aiGenerating, setAiGenerating] = useState(false);

    // Live preview interactive simulation state
    const [testCheckoutProduct, setTestCheckoutProduct] = useState(null);
    const [testSubscribed, setTestSubscribed] = useState(false);
    const [testTipAmount, setTestTipAmount] = useState(5);
    const [testTipSuccess, setTestTipSuccess] = useState(false);

    // 1. Initial Load from Supabase
    useEffect(() => {
        async function loadStoreData() {
            try {
                const [blocksData, wsData] = await Promise.all([
                    getStoreBlocks(activeWsId),
                    getWorkspace(activeWsUsername),
                ]);
                if (blocksData && blocksData.length > 0) {
                    setBlocks(blocksData);
                }
                if (wsData) {
                    setWorkspace(wsData);
                    if (wsData.theme_config) {
                        setTheme((prev) => ({ ...prev, ...wsData.theme_config }));
                    }
                    setProfile({
                        displayName: wsData.display_name || activeWs?.display_name || "Creator",
                        username: wsData.username || activeWsUsername,
                        bio: wsData.bio || activeWs?.bio || "Creator & Strategist",
                        avatarUrl:
                            wsData.avatar_url ||
                            activeWs?.avatar_url ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                        followersCount: wsData.theme_config?.followersCount || "125K+",
                        verifiedBadge: wsData.theme_config?.verifiedBadge !== false,
                        alignment: wsData.theme_config?.alignment || "center",
                    });
                }
            } catch (err) {
                console.error("Failed to load store builder data:", err);
            }
        }
        loadStoreData();
    }, [activeWsId, activeWsUsername]);

    // 2. Block CRUD & Reordering Operations
    const toggleBlockVisibility = async (id) => {
        const target = blocks.find((b) => b.id === id);
        if (!target) return;
        const updatedVisibility = !target.is_visible;
        const updated = blocks.map((b) =>
            b.id === id ? { ...b, is_visible: updatedVisibility } : b
        );
        setBlocks(updated);
        await updateStoreBlock(id, { is_visible: updatedVisibility });
    };

    const handleDeleteBlock = async (id) => {
        const updated = blocks.filter((b) => b.id !== id);
        setBlocks(updated);
        await deleteStoreBlock(id);
    };

    const handleDuplicateBlock = async (block) => {
        const duplicatedData = {
            type: block.type,
            title: `${block.title} (Copy)`,
            subtitle: block.subtitle || "",
            price: block.price || 0,
            discountBadge: block.discountBadge || "",
            ctaText: block.ctaText || "Learn More",
            url: block.url || "#",
            icon: block.icon || "",
            image_url: block.image_url || "",
            config: block.config || {},
        };
        const created = await addStoreBlock(activeWsId, duplicatedData);
        setBlocks([...blocks, created]);
    };

    const moveBlock = async (index, direction) => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return;
        const newBlocks = [...blocks];
        const temp = newBlocks[index];
        newBlocks[index] = newBlocks[targetIndex];
        newBlocks[targetIndex] = temp;
        setBlocks(newBlocks);
        await reorderStoreBlocks(activeWsId, newBlocks);
    };

    const handleAddBlock = async (blockType, defaultTitle, defaultSubtitle, extraConfig = {}) => {
        const newBlockData = {
            type: blockType,
            title: defaultTitle,
            subtitle: defaultSubtitle,
            price: extraConfig.price || 0,
            discountBadge: extraConfig.discountBadge || "",
            ctaText: extraConfig.ctaText || "Click Here",
            url: extraConfig.url || "#",
            icon: extraConfig.icon || "",
            image_url: extraConfig.image_url || "",
            config: extraConfig,
        };
        const created = await addStoreBlock(activeWsId, newBlockData);
        setBlocks([...blocks, created]);
        setNewBlockModal(false);
    };

    const handleSaveBlockEdit = async () => {
        if (!editingBlock) return;
        const updated = blocks.map((b) => (b.id === editingBlock.id ? editingBlock : b));
        setBlocks(updated);
        await updateStoreBlock(editingBlock.id, editingBlock);
        setEditingBlock(null);
    };

    // 3. Apply Trendy Template (1-Click)
    const handleApplyTemplate = async (template) => {
        const newTheme = {
            ...theme,
            ...template.theme,
            templateId: template.id,
            backgroundImage: template.config?.backgroundImage || template.backgroundImage || "",
        };
        setTheme(newTheme);
        await updateWorkspace(activeWsId, {
            theme_config: newTheme,
        });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    const handleResetDefaults = () => {
        const defaultTmpl = TRENDY_TEMPLATES[0];
        setTheme({
            ...defaultTmpl.theme,
            templateId: defaultTmpl.id,
            backgroundImage: "",
        });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    // 4. AI Storefront Generator by Niche
    const handleApplyAiNiche = async (niche) => {
        setAiGenerating(true);
        setTimeout(async () => {
            const matchedTemplate = TRENDY_TEMPLATES.find((t) => t.id === niche.templateId) || TRENDY_TEMPLATES[0];
            const updatedTheme = {
                ...theme,
                ...matchedTemplate.theme,
                templateId: matchedTemplate.id,
            };
            setTheme(updatedTheme);

            const updatedProfile = {
                ...profile,
                displayName: niche.profile.display_name,
                username: niche.profile.username,
                bio: niche.profile.bio,
                avatarUrl: niche.profile.avatar_url,
                followersCount: niche.profile.followersCount,
            };
            setProfile(updatedProfile);

            setBlocks(niche.blocks);
            await replaceStoreBlocks(activeWsId, niche.blocks);
            await updateWorkspace(activeWsId, {
                display_name: updatedProfile.displayName,
                username: updatedProfile.username,
                bio: updatedProfile.bio,
                avatar_url: updatedProfile.avatarUrl,
                theme_config: {
                    ...updatedTheme,
                    followersCount: updatedProfile.followersCount,
                    verifiedBadge: updatedProfile.verifiedBadge,
                },
            });

            setAiGenerating(false);
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 3000);
        }, 600);
    };

    // 5. Global Save to Supabase
    const handleSaveLive = async () => {
        setIsSaving(true);
        try {
            await Promise.all([
                updateWorkspace(activeWsId, {
                    display_name: profile.displayName,
                    username: profile.username,
                    bio: profile.bio,
                    avatar_url: profile.avatarUrl,
                    theme_config: {
                        ...theme,
                        followersCount: profile.followersCount,
                        verifiedBadge: profile.verifiedBadge,
                        alignment: profile.alignment,
                    },
                }),
                reorderStoreBlocks(activeWsId, blocks),
            ]);
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 3000);
        } catch (err) {
            console.error("Failed to save live to Supabase:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopyBioLink = () => {
        const url = `${window.location.origin}/public/${profile.username}`;
        navigator.clipboard.writeText(url);
        setCopiedNotice(true);
        setTimeout(() => setCopiedNotice(false), 2500);
    };

    // Background Style computation with full Image Template support
    const getBackgroundStyle = () => {
        if (theme.backgroundImage || theme.backgroundStyle === "image") {
            const bgUrl = theme.backgroundImage || "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80";
            const overlay = theme.backgroundOverlay || "rgba(6, 8, 20, 0.78)";
            return {
                backgroundColor: theme.backgroundColor || "#050505",
                backgroundImage: `linear-gradient(${overlay}, ${overlay}), url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            };
        }

        switch (theme.backgroundStyle) {
            case "cyber-grid":
                return {
                    backgroundColor: theme.backgroundColor || "#070814",
                    backgroundImage: `radial-gradient(${theme.primaryColor || "#00f0ff"}22 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                };
            case "mesh-aurora":
                return {
                    backgroundColor: theme.backgroundColor || "#09090b",
                    backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.primaryColor || "#6366f1"}33, transparent 60%), radial-gradient(circle at 100% 100%, ${theme.secondaryColor || "#a855f7"}25, transparent 60%)`,
                };
            case "sunset":
                return {
                    backgroundColor: theme.backgroundColor || "#120818",
                    backgroundImage: `radial-gradient(circle at 50% -10%, #f43f5e35 0%, transparent 70%), radial-gradient(circle at 90% 80%, #fbbf2425 0%, transparent 60%)`,
                };
            case "obsidian":
                return {
                    backgroundColor: "#050505",
                    backgroundImage: `radial-gradient(circle at 50% 10%, #e5c07b15 0%, transparent 50%)`,
                };
            case "clean":
            default:
                return {
                    backgroundColor: theme.backgroundColor || "#0b0f19",
                };
        }
    };

    const getAnimationClass = () => {
        switch (theme.animation) {
            case "bounce-hover":
                return "hover:scale-[1.025] hover:-translate-y-0.5 transition-all duration-200 active:scale-95";
            case "shimmer-glow":
                return "hover:shadow-[0_0_22px_rgba(0,240,255,0.4)] hover:border-cyan-400 transition-all duration-300";
            case "brutalist-jump":
                return "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.9)] active:translate-x-0 active:translate-y-0 transition-all duration-150";
            case "smooth-lift":
            default:
                return "hover:-translate-y-1 hover:shadow-xl transition-all duration-200";
        }
    };

    const getCardStyleClasses = () => {
        const anim = getAnimationClass();
        switch (theme.cardStyle) {
            case "neon-glow":
                return `border backdrop-blur-xl shadow-lg ${anim}`;
            case "minimal-outline":
                return `border ${anim}`;
            case "brutalist":
                return `border-2 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] font-bold ${anim}`;
            case "solid":
                return `border shadow-md ${anim}`;
            case "glass":
            default:
                return `border backdrop-blur-2xl shadow-sm ${anim}`;
        }
    };

    const getButtonShapeClass = () => {
        switch (theme.buttonShape) {
            case "sharp":
                return "rounded-none";
            case "rounded-lg":
                return "rounded-lg";
            case "rounded-2xl":
                return "rounded-2xl";
            case "rounded-full":
                return "rounded-full";
            case "rounded-xl":
            default:
                return "rounded-xl";
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            {/* Header */}
            <DashboardHeader
                title="Visual Link-in-Bio Page Builder"
                subtitle="Design your creator page, use custom image templates, reorder monetization blocks, and save live to Supabase."
            />

            {/* Top Toolbar */}
            <div className="px-6 py-3 bg-zinc-50 dark:bg-[#0b0d13] border-b border-zinc-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 backdrop-blur-md">
                {/* Navigation Tabs */}
                <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-300/60 dark:border-white/10 shadow-inner overflow-x-auto scrollbar-none">
                    <button
                        type="button"
                        onClick={() => setActiveCustomTab("blocks")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            activeCustomTab === "blocks"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        <Layers className="h-3.5 w-3.5" />
                        <span>Blocks ({blocks.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveCustomTab("templates")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            activeCustomTab === "templates"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        <Palette className="h-3.5 w-3.5" />
                        <span>Themes & Image Templates</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveCustomTab("ai")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            activeCustomTab === "ai"
                                ? "bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-md shadow-purple-500/20"
                                : "text-purple-600 dark:text-purple-400 hover:text-purple-700 font-bold"
                        }`}
                    >
                        <Wand2 className="h-3.5 w-3.5" />
                        <span>AI Studio</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveCustomTab("design")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            activeCustomTab === "design"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        <Sliders className="h-3.5 w-3.5" />
                        <span>Styling & Images</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveCustomTab("profile")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            activeCustomTab === "profile"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        <Settings className="h-3.5 w-3.5" />
                        <span>Profile</span>
                    </button>
                </div>

                {/* Live Controls */}
                <div className="flex items-center gap-2">
                    {savedNotice && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Saved Live!
                        </span>
                    )}

                    {/* Publish / Unpublish Switch */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsPublished(!isPublished);
                            setSavedNotice(true);
                            setTimeout(() => setSavedNotice(false), 2500);
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                            isPublished
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 bg-zinc-100 dark:bg-zinc-900"
                        }`}
                        title="Toggle Page Published Status"
                    >
                        <Radio className={`h-3 w-3 ${isPublished ? "animate-pulse text-emerald-500" : "text-zinc-400"}`} />
                        <span>{isPublished ? "Published" : "Draft"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleCopyBioLink}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-indigo-500 transition-all cursor-pointer shadow-xs"
                        title="Copy Public Bio Link"
                    >
                        {copiedNotice ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedNotice ? "Copied" : "Copy Link"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setQrModal(true)}
                        className="p-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-all cursor-pointer shadow-xs"
                        title="QR Code"
                    >
                        <QrCode className="h-4 w-4" />
                    </button>

                    <Link
                        href={`/public/${profile.username}`}
                        target="_blank"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition-all shadow-xs"
                    >
                        <span>Open Live</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <Button
                        variant="gradient"
                        size="sm"
                        onClick={handleSaveLive}
                        disabled={isSaving}
                        className="gap-1.5 text-xs shadow-md shadow-indigo-500/20"
                    >
                        {isSaving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                        <span>{isSaving ? "Saving..." : "Save to Database"}</span>
                    </Button>
                </div>
            </div>

            {/* Split Screen Workspace */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Left Controls Pane */}
                <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-3xl border-r border-zinc-200 dark:border-white/5">
                    {/* TAB: BLOCKS */}
                    {activeCustomTab === "blocks" && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                        <span>Page Blocks & Sections</span>
                                        <Badge variant="outline" className="text-[10px]">
                                            {blocks.length} Items
                                        </Badge>
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Reorder via ▲/▼ arrows, customize discount badges, duplicate or toggle visibility.
                                    </p>
                                </div>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={() => setNewBlockModal(true)}
                                    className="gap-1.5 text-xs"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Add Block</span>
                                </Button>
                            </div>

                            {/* Block list */}
                            <div className="space-y-3">
                                {blocks.map((block, idx) => (
                                    <div
                                        key={block.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                            block.is_visible
                                                ? "glass-card border-zinc-200 dark:border-white/10 shadow-xs hover:border-indigo-500/40"
                                                : "bg-zinc-100/60 dark:bg-zinc-950/40 border-zinc-200/50 dark:border-white/5 opacity-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                            {/* Reorder Arrows */}
                                            <div className="flex flex-col gap-1 text-zinc-400">
                                                <button
                                                    type="button"
                                                    onClick={() => moveBlock(idx, "up")}
                                                    disabled={idx === 0}
                                                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/10 disabled:opacity-20 text-[10px] cursor-pointer"
                                                    title="Move Up"
                                                >
                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveBlock(idx, "down")}
                                                    disabled={idx === blocks.length - 1}
                                                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/10 disabled:opacity-20 text-[10px] cursor-pointer"
                                                    title="Move Down"
                                                >
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                </button>
                                            </div>

                                            {/* Block Icon */}
                                            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                                {block.type === "product" && <Package className="h-5 w-5" />}
                                                {block.type === "course" && <GraduationCap className="h-5 w-5" />}
                                                {block.type === "booking" && <Calendar className="h-5 w-5" />}
                                                {block.type === "coaching" && <Video className="h-5 w-5" />}
                                                {block.type === "newsletter" && <Mail className="h-5 w-5" />}
                                                {block.type === "community" && <Users className="h-5 w-5" />}
                                                {block.type === "header" && <Sparkles className="h-5 w-5" />}
                                                {block.type === "socials" && <LinkIcon className="h-5 w-5" />}
                                                {block.type === "tipjar" && <Coffee className="h-5 w-5" />}
                                                {block.type === "countdown" && <Clock className="h-5 w-5" />}
                                                {block.type === "testimonial" && <Star className="h-5 w-5" />}
                                                {block.type === "youtube" && <Youtube className="h-5 w-5" />}
                                                {block.type === "spotify" && <Music className="h-5 w-5" />}
                                                {block.type === "whatsapp" && <MessageCircle className="h-5 w-5" />}
                                                {block.type === "phone" && <Phone className="h-5 w-5" />}
                                                {block.type === "link" && <ExternalLink className="h-5 w-5" />}
                                                {block.type === "image" && <ImageIcon className="h-5 w-5" />}
                                                {block.type === "heading" && <Heading className="h-5 w-5" />}
                                                {block.type === "text" && <AlignLeft className="h-5 w-5" />}
                                            </div>

                                            {/* Details */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                        {block.title}
                                                    </p>
                                                    {block.discountBadge && (
                                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                                                            {block.discountBadge}
                                                        </span>
                                                    )}
                                                </div>
                                                {block.subtitle && (
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                                        {block.subtitle}
                                                    </p>
                                                )}
                                                {block.price !== undefined && block.price > 0 && (
                                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                                                        ${Number(block.price).toFixed(2)} USD
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => setEditingBlock(block)}
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                                                title="Edit Block"
                                            >
                                                <Edit3 className="h-3.5 w-3.5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDuplicateBlock(block)}
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                                                title="Duplicate Block"
                                            >
                                                <CopyPlus className="h-3.5 w-3.5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => toggleBlockVisibility(block.id)}
                                                className={`text-xs p-1.5 rounded-lg border transition-all cursor-pointer ${
                                                    block.is_visible
                                                        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                                                        : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                                                }`}
                                                title="Toggle Visibility"
                                            >
                                                {block.is_visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteBlock(block.id)}
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
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

                    {/* TAB: TEMPLATES */}
                    {activeCustomTab === "templates" && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                        Trendy Creator & Image Templates
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Choose an aesthetic theme or photographic background template to apply color palettes and typography.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetDefaults}
                                    className="text-xs gap-1"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Reset to Default</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {TRENDY_TEMPLATES.map((tmpl) => {
                                    const isCurrent = theme.templateId === tmpl.id;
                                    return (
                                        <div
                                            key={tmpl.id}
                                            className={`glass-card p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group ${
                                                isCurrent
                                                    ? "ring-2 ring-indigo-500 border-indigo-500/50 shadow-lg"
                                                    : "border-zinc-200 dark:border-white/10 hover:border-indigo-500/40"
                                            }`}
                                        >
                                            <div
                                                className={`h-24 w-full rounded-xl bg-gradient-to-tr ${tmpl.previewGradient} p-3 flex flex-col justify-between relative overflow-hidden`}
                                            >
                                                <div className="flex justify-between items-center z-10">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-[9px] bg-black/60 text-white border-white/20 uppercase font-bold"
                                                    >
                                                        {tmpl.badge}
                                                    </Badge>
                                                    <div className="flex gap-1">
                                                        <div
                                                            className="h-3.5 w-3.5 rounded-full border border-white/40"
                                                            style={{ backgroundColor: tmpl.theme.primaryColor }}
                                                        />
                                                        <div
                                                            className="h-3.5 w-3.5 rounded-full border border-white/40"
                                                            style={{ backgroundColor: tmpl.theme.secondaryColor }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-mono text-white/90 uppercase z-10 font-bold">
                                                    {tmpl.theme.fontFamily} • {tmpl.theme.cardStyle}
                                                </span>
                                            </div>

                                            <div className="py-3 space-y-1">
                                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                    {tmpl.name}
                                                </h4>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {tmpl.tagline}
                                                </p>
                                            </div>

                                            <Button
                                                variant={isCurrent ? "outline" : "gradient"}
                                                size="sm"
                                                onClick={() => handleApplyTemplate(tmpl)}
                                                className="w-full text-xs gap-1.5"
                                            >
                                                {isCurrent ? <Check className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                                                <span>{isCurrent ? "Applied Theme" : "Apply Template"}</span>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TAB: AI STUDIO */}
                    {activeCustomTab === "ai" && (
                        <div className="space-y-6 animate-in fade-in">
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Wand2 className="h-4 w-4 text-fuchsia-500 animate-spin" />
                                    <span>AI Storefront & Copywriting Studio</span>
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Instant 1-click storefront generation by creator niche, viral bio polish, and high-converting offer copy hooks.
                                </p>
                            </div>

                            {/* 1-Click Storefront by Niche */}
                            <div className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
                                    1-Click Storefront Generation by Niche
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {AI_CREATOR_NICHES.map((niche) => (
                                        <button
                                            key={niche.id}
                                            type="button"
                                            onClick={() => handleApplyAiNiche(niche)}
                                            disabled={aiGenerating}
                                            className="p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 hover:border-indigo-500/40"
                                        >
                                            <span className="text-2xl">{niche.icon}</span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                    {niche.name}
                                                </p>
                                                <span className="text-[10px] text-zinc-500">
                                                    {niche.badge} • 1-Click Setup
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: STYLING & IMAGE TEMPLATES */}
                    {activeCustomTab === "design" && (
                        <div className="space-y-6 animate-in fade-in">
                            {/* Photographic Image Template Selection */}
                            <div className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                        <ImageIcon className="h-4 w-4" />
                                        <span>Photographic Image Templates</span>
                                    </h4>
                                    {theme.backgroundImage && (
                                        <button
                                            type="button"
                                            onClick={() => setTheme({ ...theme, backgroundImage: "", backgroundStyle: "cyber-grid" })}
                                            className="text-[10px] text-rose-500 hover:underline font-bold"
                                        >
                                            Remove Background Image
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {[
                                        { label: "Tokyo Cyber Night", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80", color: "#00f0ff" },
                                        { label: "Malibu Golden Coast", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", color: "#fb923c" },
                                        { label: "Emerald Botanical", url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80", color: "#34d399" },
                                        { label: "Studio Portrait Luxe", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80", color: "#f43f5e" },
                                        { label: "Synthwave Sunset", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80", color: "#a855f7" },
                                        { label: "Obsidian Marble", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80", color: "#e5c07b" },
                                    ].map((img, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() =>
                                                setTheme({
                                                    ...theme,
                                                    backgroundImage: img.url,
                                                    backgroundStyle: "image",
                                                    primaryColor: img.color,
                                                })
                                            }
                                            className={`relative h-20 rounded-xl overflow-hidden border text-left p-2 flex flex-col justify-end group transition-all cursor-pointer ${
                                                theme.backgroundImage === img.url
                                                    ? "ring-2 ring-indigo-500 border-white shadow-lg"
                                                    : "border-white/10 hover:scale-105"
                                            }`}
                                            style={{
                                                backgroundImage: `url(${img.url})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                                            <span className="relative z-10 text-[10px] font-extrabold text-white">
                                                {img.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="text-[11px] font-semibold text-zinc-500">Custom Background Image URL</label>
                                    <Input
                                        value={theme.backgroundImage || ""}
                                        placeholder="https://images.unsplash.com/..."
                                        onChange={(e) =>
                                            setTheme({
                                                ...theme,
                                                backgroundImage: e.target.value,
                                                backgroundStyle: e.target.value ? "image" : "cyber-grid",
                                            })
                                        }
                                        className="h-9 text-xs mt-1"
                                    />
                                </div>
                            </div>

                            {/* Aesthetic Colors & Styling Tokens */}
                            <div className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                    Aesthetic Colors & Typography
                                </h4>

                                <div className="space-y-4">
                                    {/* Primary Color */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-zinc-500">Primary Accent Color</label>
                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                            {[
                                                "#00f0ff",
                                                "#6366f1",
                                                "#a855f7",
                                                "#10b981",
                                                "#f43f5e",
                                                "#fbbf24",
                                                "#a3e635",
                                                "#3b82f6",
                                                "#e5c07b",
                                            ].map((col) => (
                                                <button
                                                    key={col}
                                                    type="button"
                                                    onClick={() => setTheme({ ...theme, primaryColor: col })}
                                                    className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer ${
                                                        theme.primaryColor === col
                                                            ? "ring-2 ring-white scale-110 border-white"
                                                            : "border-transparent opacity-80 hover:opacity-100"
                                                    }`}
                                                    style={{ backgroundColor: col }}
                                                />
                                            ))}
                                            <input
                                                type="color"
                                                value={theme.primaryColor}
                                                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                                                className="h-7 w-7 rounded-full cursor-pointer bg-transparent border-0"
                                                title="Custom Hex"
                                            />
                                        </div>
                                    </div>

                                    {/* Typography Font */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-zinc-500">Typography Font Family</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
                                            {[
                                                "Plus Jakarta Sans",
                                                "Outfit",
                                                "Inter",
                                                "Playfair Display",
                                                "JetBrains Mono",
                                                "Syne",
                                            ].map((font) => (
                                                <button
                                                    key={font}
                                                    type="button"
                                                    onClick={() => setTheme({ ...theme, fontFamily: font })}
                                                    className={`p-2 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                                                        theme.fontFamily === font
                                                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                                                            : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                                                    }`}
                                                    style={{ fontFamily: font }}
                                                >
                                                    {font}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Animation Style */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-zinc-500">Card & Button Animation Style</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                                            {[
                                                { id: "bounce-hover", label: "Playful Bounce" },
                                                { id: "shimmer-glow", label: "Shimmer Glow" },
                                                { id: "brutalist-jump", label: "Brutalist Jump" },
                                                { id: "smooth-lift", label: "Smooth Lift" },
                                            ].map((anim) => (
                                                <button
                                                    key={anim.id}
                                                    type="button"
                                                    onClick={() => setTheme({ ...theme, animation: anim.id })}
                                                    className={`p-2 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                                                        theme.animation === anim.id
                                                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                                                            : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    {anim.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Button Radius */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-zinc-500">Button Corner Radius</label>
                                        <div className="grid grid-cols-4 gap-2 mt-1.5">
                                            {[
                                                { id: "sharp", label: "Sharp" },
                                                { id: "rounded-lg", label: "Smooth" },
                                                { id: "rounded-xl", label: "Modern" },
                                                { id: "rounded-full", label: "Pill" },
                                            ].map((shape) => (
                                                <button
                                                    key={shape.id}
                                                    type="button"
                                                    onClick={() => setTheme({ ...theme, buttonShape: shape.id })}
                                                    className={`p-2 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                                                        theme.buttonShape === shape.id
                                                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                                                            : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    {shape.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: PROFILE */}
                    {activeCustomTab === "profile" && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="glass-card p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                    Creator Identity & Bio
                                </h4>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] font-semibold text-zinc-500">Display Name</label>
                                            <Input
                                                value={profile.displayName}
                                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-semibold text-zinc-500">Username (@)</label>
                                            <Input
                                                value={profile.username}
                                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-semibold text-zinc-500">Bio Tagline</label>
                                        <textarea
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            rows={3}
                                            className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white mt-1 outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] font-semibold text-zinc-500">Avatar URL</label>
                                            <Input
                                                value={profile.avatarUrl}
                                                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-semibold text-zinc-500">Follower Badge</label>
                                            <Input
                                                value={profile.followersCount}
                                                onChange={(e) => setProfile({ ...profile, followersCount: e.target.value })}
                                                className="h-9 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Interactive Live Device Preview */}
                <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center bg-zinc-100/60 dark:bg-[#07080c] relative overflow-hidden">
                    {/* Device Switcher */}
                    <div className="mb-4 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-900/90 p-1 rounded-xl border border-zinc-300/60 dark:border-white/10 shadow-xs z-10">
                        <button
                            type="button"
                            onClick={() => setPreviewDevice("mobile")}
                            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                previewDevice === "mobile"
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Smartphone className="h-3.5 w-3.5" />
                            <span>Phone</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewDevice("tablet")}
                            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                previewDevice === "tablet"
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Tablet className="h-3.5 w-3.5" />
                            <span>Tablet</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewDevice("desktop")}
                            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                previewDevice === "desktop"
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Monitor className="h-3.5 w-3.5" />
                            <span>Desktop</span>
                        </button>
                    </div>

                    {/* Canvas Wrapper */}
                    <div
                        className={`transition-all duration-300 relative ${
                            previewDevice === "mobile"
                                ? "w-[360px] h-[720px] rounded-[48px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/20"
                                : previewDevice === "tablet"
                                ? "w-[480px] h-[720px] rounded-3xl border-4 border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
                                : "w-full max-w-xl h-[720px] rounded-3xl border-2 border-zinc-300 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        }`}
                        style={{
                            ...getBackgroundStyle(),
                            fontFamily: theme.fontFamily,
                        }}
                    >
                        {/* Dynamic Island for Mobile */}
                        {previewDevice === "mobile" && (
                            <div className="pt-3 pb-1 flex justify-center items-center relative z-20">
                                <div className="h-4 w-24 bg-black rounded-full flex items-center justify-between px-2">
                                    <div className="h-2 w-2 rounded-full bg-zinc-800" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500/60" />
                                </div>
                            </div>
                        )}

                        {/* Bio Content */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none relative z-10">
                            {/* Profile Header */}
                            <div className="text-center space-y-3 pt-2">
                                <div className="relative inline-block">
                                    <img
                                        src={profile.avatarUrl}
                                        alt={profile.displayName}
                                        className="h-20 w-20 rounded-full object-cover mx-auto ring-4 shadow-xl"
                                        style={{ ringColor: theme.primaryColor }}
                                    />
                                    {profile.verifiedBadge && (
                                        <span
                                            className="absolute bottom-0 right-0 h-5 w-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-md"
                                            style={{ backgroundColor: theme.primaryColor }}
                                        >
                                            ✓
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-0.5">
                                    <h4 className="text-base font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
                                        <span>{profile.displayName}</span>
                                    </h4>
                                    <p className="text-[11px] font-bold" style={{ color: theme.primaryColor }}>
                                        @{profile.username} • {profile.followersCount} Followers
                                    </p>
                                    <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed pt-1">
                                        {profile.bio}
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    {[
                                        { icon: Instagram, href: "#" },
                                        { icon: Youtube, href: "#" },
                                        { icon: Twitter, href: "#" },
                                        { icon: Linkedin, href: "#" },
                                    ].map((s, i) => {
                                        const Icon = s.icon;
                                        return (
                                            <div
                                                key={i}
                                                className={`h-7 w-7 ${getButtonShapeClass()} flex items-center justify-center text-white/80 transition-all`}
                                                style={{
                                                    backgroundColor: theme.cardBg || "rgba(255,255,255,0.06)",
                                                    borderColor: theme.accentBorder || "rgba(255,255,255,0.1)",
                                                    borderWidth: "1px",
                                                }}
                                            >
                                                <Icon className="h-3.5 w-3.5" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Active Ordered Blocks */}
                            <div className="space-y-2.5 pt-2">
                                {blocks
                                    .filter((b) => b.is_visible && b.type !== "header")
                                    .map((b) => (
                                        <div
                                            key={b.id}
                                            onClick={() => {
                                                if (b.type === "product" || b.type === "course") {
                                                    setTestCheckoutProduct(b);
                                                }
                                            }}
                                            className={`${getCardStyleClasses()} ${getButtonShapeClass()} p-3.5 flex items-center gap-3 cursor-pointer group shadow-sm hover:scale-[1.01]`}
                                            style={{
                                                backgroundColor: theme.cardBg || "rgba(15, 17, 23, 0.75)",
                                                borderColor: theme.accentBorder || "rgba(255, 255, 255, 0.1)",
                                                boxShadow:
                                                    theme.cardStyle === "neon-glow"
                                                        ? `0 0 15px ${theme.glowColor || "rgba(99,102,241,0.2)"}`
                                                        : "none",
                                            }}
                                        >
                                            <div
                                                className={`h-9 w-9 ${getButtonShapeClass()} flex items-center justify-center flex-shrink-0`}
                                                style={{
                                                    backgroundColor: `${theme.primaryColor}20`,
                                                    color: theme.primaryColor,
                                                }}
                                            >
                                                {b.type === "product" && <Package className="h-4 w-4" />}
                                                {b.type === "course" && <GraduationCap className="h-4 w-4" />}
                                                {b.type === "booking" && <Calendar className="h-4 w-4" />}
                                                {b.type === "coaching" && <Video className="h-4 w-4" />}
                                                {b.type === "newsletter" && <Mail className="h-4 w-4" />}
                                                {b.type === "community" && <Users className="h-4 w-4" />}
                                                {b.type === "tipjar" && <Coffee className="h-4 w-4" />}
                                                {b.type === "countdown" && <Clock className="h-4 w-4" />}
                                                {b.type === "testimonial" && <Star className="h-4 w-4" />}
                                                {b.type === "youtube" && <Youtube className="h-4 w-4" />}
                                                {b.type === "spotify" && <Music className="h-4 w-4" />}
                                                {b.type === "whatsapp" && <MessageCircle className="h-4 w-4" />}
                                                {b.type === "image" && <ImageIcon className="h-4 w-4" />}
                                                {b.type === "link" && <ExternalLink className="h-4 w-4" />}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-1">
                                                    <h5 className="text-xs font-bold text-white truncate">
                                                        {b.title}
                                                    </h5>
                                                    {b.discountBadge && (
                                                        <span
                                                            className="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase shrink-0"
                                                            style={{
                                                                backgroundColor: theme.primaryColor,
                                                                color: "#000000",
                                                            }}
                                                        >
                                                            {b.discountBadge}
                                                        </span>
                                                    )}
                                                </div>

                                                {b.subtitle && (
                                                    <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                                                        {b.subtitle}
                                                    </p>
                                                )}

                                                {/* Image Block Simulation */}
                                                {b.type === "image" && b.image_url && (
                                                    <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-28 w-full bg-black/50">
                                                        <img
                                                            src={b.image_url}
                                                            alt={b.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {/* Newsletter Simulation */}
                                                {b.type === "newsletter" && (
                                                    <div className="mt-2 flex gap-1.5">
                                                        {testSubscribed ? (
                                                            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                                                <Check className="h-3 w-3" /> Subscribed!
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="email"
                                                                    placeholder="name@email.com"
                                                                    className="h-7 text-[10px] px-2 rounded-lg bg-black/40 border border-white/10 text-white flex-1 outline-none"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setTestSubscribed(true);
                                                                        setTimeout(() => setTestSubscribed(false), 3000);
                                                                    }}
                                                                    className={`h-7 px-2.5 text-[10px] font-bold text-black ${getButtonShapeClass()}`}
                                                                    style={{ backgroundColor: theme.primaryColor }}
                                                                >
                                                                    Join
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Tip Jar Simulation */}
                                                {b.type === "tipjar" && (
                                                    <div className="mt-2 flex items-center gap-1.5">
                                                        {[3, 5, 10].map((amt) => (
                                                            <button
                                                                key={amt}
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setTestTipAmount(amt);
                                                                    setTestTipSuccess(true);
                                                                    setTimeout(() => setTestTipSuccess(false), 2500);
                                                                }}
                                                                className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${
                                                                    testTipAmount === amt
                                                                        ? "border-amber-400 bg-amber-400/20 text-amber-300"
                                                                        : "border-white/10 bg-white/5 text-zinc-300"
                                                                }`}
                                                            >
                                                                ${amt}
                                                            </button>
                                                        ))}
                                                        {testTipSuccess && (
                                                            <span className="text-[9px] text-emerald-400 font-bold ml-1">
                                                                ☕️ Tip sent!
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Price tag */}
                                                {b.price !== undefined && b.price > 0 && (
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span
                                                            className="text-[10px] font-extrabold"
                                                            style={{ color: theme.primaryColor }}
                                                        >
                                                            ${Number(b.price).toFixed(2)} USD
                                                        </span>
                                                        <span className="text-[9px] text-zinc-400 font-semibold group-hover:text-white transition-colors">
                                                            {b.ctaText || "Unlock →"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Footer */}
                            <div className="pt-6 pb-4 text-center">
                                <span className="text-[9px] text-zinc-500 font-medium">
                                    Powered by <strong className="text-zinc-300">Outsyra Creator OS</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL: 18 BLOCK TYPES LIBRARY */}
            {newBlockModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-2xl w-full space-y-5 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Component & Monetization Library
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Choose from 18 high-converting block types including Image Banners and Media.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setNewBlockModal(false)}
                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                            {[
                                { type: "image", icon: ImageIcon, label: "Photo / Image Card", desc: "Showcase visual banner or lookbook", badge: "VISUAL", image_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80" },
                                { type: "link", icon: ExternalLink, label: "Custom Link", desc: "Direct link to any URL", badge: "CORE" },
                                { type: "product", icon: Package, label: "Digital Product", desc: "Sell PDF, Ebook, Notion template", badge: "COMMERCE", price: 39 },
                                { type: "course", icon: GraduationCap, label: "Video Course", desc: "Sell LMS masterclass access", badge: "LMS", price: 149 },
                                { type: "booking", icon: Calendar, label: "1:1 Strategy Call", desc: "Google Meet / Jitsi appointment", badge: "CALENDAR", price: 99 },
                                { type: "coaching", icon: Video, label: "Executive Coaching", desc: "High-ticket 1-on-1 mentorship", badge: "HIGH-TICKET", price: 299 },
                                { type: "newsletter", icon: Mail, label: "Lead Magnet Opt-in", desc: "Capture emails to Supabase DB", badge: "GROWTH" },
                                { type: "community", icon: Users, label: "VIP Community", desc: "Private discussion forum access", badge: "RECURRING", price: 19 },
                                { type: "tipjar", icon: Coffee, label: "Tip Jar & Donation", desc: "Buy Me a Coffee widget", badge: "DONATE", price: 5 },
                                { type: "youtube", icon: Youtube, label: "YouTube Video Embed", desc: "Playable video player", badge: "MEDIA" },
                                { type: "spotify", icon: Music, label: "Spotify / Podcast", desc: "Embed songs, tracks or albums", badge: "AUDIO" },
                                { type: "whatsapp", icon: MessageCircle, label: "WhatsApp Direct Chat", desc: "1-Click direct chat button", badge: "CONTACT" },
                                { type: "phone", icon: Phone, label: "Phone Call Button", desc: "Instant click-to-call link", badge: "CONTACT" },
                                { type: "testimonial", icon: Star, label: "Social Proof Review", desc: "Customer review quote card", badge: "TRUST" },
                                { type: "countdown", icon: Clock, label: "Countdown Timer", desc: "Flash sale ticker banner", badge: "URGENCY" },
                                { type: "heading", icon: Heading, label: "Section Heading", desc: "Divider title for categories", badge: "LAYOUT" },
                                { type: "text", icon: AlignLeft, label: "Text Block", desc: "Rich paragraph description", badge: "CONTENT" },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.type}
                                        type="button"
                                        onClick={() =>
                                            handleAddBlock(item.type, `New ${item.label}`, item.desc, {
                                                price: item.price || 0,
                                                discountBadge: item.badge,
                                                image_url: item.image_url || "",
                                            })
                                        }
                                        className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-left hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all space-y-1 cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[8px] font-extrabold uppercase text-zinc-500">
                                                {item.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                            {item.label}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                            {item.desc}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT BLOCK PROPERTIES */}
            {editingBlock && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                Edit Block Properties
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingBlock(null)}
                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="font-semibold text-zinc-500">Block Headline / Title</label>
                                <Input
                                    value={editingBlock.title}
                                    onChange={(e) => setEditingBlock({ ...editingBlock, title: e.target.value })}
                                    className="h-9 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-zinc-500">Subtitle / Description</label>
                                <textarea
                                    value={editingBlock.subtitle || ""}
                                    onChange={(e) => setEditingBlock({ ...editingBlock, subtitle: e.target.value })}
                                    rows={2}
                                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white mt-1 outline-none"
                                />
                            </div>

                            {editingBlock.type === "image" && (
                                <div>
                                    <label className="font-semibold text-zinc-500">Image URL</label>
                                    <Input
                                        value={editingBlock.image_url || ""}
                                        placeholder="https://images.unsplash.com/..."
                                        onChange={(e) =>
                                            setEditingBlock({ ...editingBlock, image_url: e.target.value })
                                        }
                                        className="h-9 text-xs mt-1"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="font-semibold text-zinc-500">Price (USD)</label>
                                    <Input
                                        type="number"
                                        value={editingBlock.price || 0}
                                        onChange={(e) =>
                                            setEditingBlock({ ...editingBlock, price: parseFloat(e.target.value) || 0 })
                                        }
                                        className="h-9 text-xs mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-zinc-500">Discount Badge</label>
                                    <Input
                                        value={editingBlock.discountBadge || ""}
                                        placeholder="e.g. 50% OFF, BESTSELLER"
                                        onChange={(e) =>
                                            setEditingBlock({ ...editingBlock, discountBadge: e.target.value })
                                        }
                                        className="h-9 text-xs mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-zinc-500">Button CTA Text / Destination URL</label>
                                <Input
                                    value={editingBlock.url || editingBlock.ctaText || ""}
                                    placeholder="e.g. https://... or Get Instant Access"
                                    onChange={(e) =>
                                        setEditingBlock({ ...editingBlock, url: e.target.value, ctaText: e.target.value })
                                    }
                                    className="h-9 text-xs mt-1"
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex gap-2">
                            <Button variant="gradient" className="w-full text-xs" onClick={handleSaveBlockEdit}>
                                Save Changes
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-xs text-zinc-500"
                                onClick={() => setEditingBlock(null)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: QR CODE FOR MOBILE SCANNING */}
            {qrModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                Test on Real Mobile Phone
                            </h3>
                            <button
                                type="button"
                                onClick={() => setQrModal(false)}
                                className="text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                                    typeof window !== "undefined"
                                        ? `${window.location.origin}/public/${profile.username}`
                                        : "https://outsyra.com/rajnish"
                                )}`}
                                alt="Store QR Code"
                                className="h-40 w-40 mx-auto"
                            />
                        </div>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Scan with your smartphone camera to preview your live customized creator page in real time!
                        </p>
                    </div>
                </div>
            )}

            {/* MODAL: TEST CHECKOUT */}
            {testCheckoutProduct && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                            <Badge variant="default" className="text-[10px]">
                                Checkout Simulation
                            </Badge>
                            <button
                                type="button"
                                onClick={() => setTestCheckoutProduct(null)}
                                className="text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                {testCheckoutProduct.title}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {testCheckoutProduct.subtitle}
                            </p>
                            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Total Price:</span>
                                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                    ${Number(testCheckoutProduct.price || 0).toFixed(2)} USD
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="gradient"
                            className="w-full text-xs"
                            onClick={() => {
                                alert("🎉 Checkout simulated successfully! Instant download would start here.");
                                setTestCheckoutProduct(null);
                            }}
                        >
                            Simulate Instant Purchase
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
