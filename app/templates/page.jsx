"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Sparkles,
    Search,
    SlidersHorizontal,
    ArrowRight,
    Check,
    Eye,
    Zap,
    Crown,
    Star,
    Layers,
    Smartphone,
    Monitor,
    X,
    Filter,
    Flame,
    Share2,
    Palette,
    Plus,
    Image as ImageIcon,
    Save,
    RotateCcw,
    Upload,
    Wand2,
    ExternalLink,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TEMPLATE_CATEGORIES, MARKETPLACE_TEMPLATES } from "@/data/marketplace-templates";
import { TRENDY_IMAGE_CATEGORIES, TRENDY_FREE_IMAGES } from "@/data/trendy-images";
import { updateWorkspace, replaceStoreBlocks } from "@/lib/supabase/db";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";

export default function TemplateMarketplacePage() {
    const router = useRouter();

    // Marketplace Navigation State
    const [marketplaceView, setMarketplaceView] = useState("templates"); // "templates" | "free-images" | "custom-creator"
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImageCategory, setSelectedImageCategory] = useState("all");
    const [sortBy, setSortBy] = useState("popular"); // "popular" | "featured" | "newest"

    // Preview Modal State
    const [previewModalTemplate, setPreviewModalTemplate] = useState(null);
    const [previewDevice, setPreviewDevice] = useState("mobile"); // "mobile" | "desktop"
    const [applyingTemplateId, setApplyingTemplateId] = useState(null);
    const [appliedNotice, setAppliedNotice] = useState(false);

    // Custom Template Designer State
    const [customTemplateModal, setCustomTemplateModal] = useState(false);
    const [customTmplName, setCustomTmplName] = useState("My Aesthetic 2026 Theme");
    const [customCategory, setCustomCategory] = useState("creator");
    const [customPrimaryColor, setCustomPrimaryColor] = useState("#00f0ff");
    const [customSecondaryColor, setCustomSecondaryColor] = useState("#d946ef");
    const [customBackgroundStyle, setCustomBackgroundStyle] = useState("image");
    const [customBackgroundImage, setCustomBackgroundImage] = useState(
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80"
    );
    const [customCardStyle, setCustomCardStyle] = useState("neon-glow"); // "glass" | "neon-glow" | "minimal-outline" | "brutalist"
    const [customFontFamily, setCustomFontFamily] = useState("Outfit");
    const [customButtonShape, setCustomButtonShape] = useState("rounded-xl");
    const [customAnimation, setCustomAnimation] = useState("bounce-hover");

    // Dynamic Templates List (Standard + User Created)
    const [templatesList, setTemplatesList] = useState(MARKETPLACE_TEMPLATES);

    // Filter and sort templates
    const filteredTemplates = useMemo(() => {
        return templatesList.filter((tmpl) => {
            const matchesCategory =
                selectedCategory === "all" ||
                tmpl.category === selectedCategory ||
                (selectedCategory === "image" && tmpl.isImageTemplate);
            const matchesSearch =
                tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tmpl.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            if (sortBy === "featured") return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
            if (sortBy === "popular") return b.popularity - a.popularity;
            return b.id.localeCompare(a.id);
        });
    }, [templatesList, searchQuery, selectedCategory, sortBy]);

    // Filter free images
    const filteredFreeImages = useMemo(() => {
        return TRENDY_FREE_IMAGES.filter((img) => {
            const matchesCategory =
                selectedImageCategory === "all" || img.category === selectedImageCategory;
            const matchesSearch =
                img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                img.photographer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedImageCategory]);

    const { workspace } = useWorkspace();
    const activeWsId = workspace?.id || "ws-rajnish-001";

    // Handle "Use This Template" -> Clones configuration into user's Supabase workspace
    const handleUseTemplate = async (template) => {
        setApplyingTemplateId(template.id);
        try {
            await updateWorkspace(activeWsId, {
                theme_config: {
                    ...template.config,
                    templateId: template.slug,
                    backgroundImage: template.config?.backgroundImage || template.preview_image || "",
                },
            });

            if (template.sampleBlocks && template.sampleBlocks.length > 0) {
                const newBlocks = template.sampleBlocks.map((b, i) => ({
                    id: `block-${Date.now()}-${i}`,
                    workspace_id: activeWsId,
                    type: b.type,
                    title: b.title,
                    subtitle: b.subtitle || "",
                    price: b.price || 0,
                    discountBadge: b.discountBadge || "",
                    ctaText: b.ctaText || "Learn More",
                    url: b.url || "#",
                    image_url: b.image_url || "",
                    order_index: i,
                    is_visible: true,
                }));
                await replaceStoreBlocks(activeWsId, newBlocks);
            }

            setAppliedNotice(true);
            setTimeout(() => {
                setAppliedNotice(false);
                router.push("/store");
            }, 800);
        } catch (err) {
            console.error("Failed to apply template:", err);
        } finally {
            setApplyingTemplateId(null);
        }
    };

    // Apply Free Image directly to Store
    const handleApplyFreeImage = async (img) => {
        setApplyingTemplateId(img.id);
        try {
            await updateWorkspace(activeWsId, {
                theme_config: {
                    backgroundImage: img.url,
                    backgroundStyle: "image",
                    primaryColor: img.primaryColor,
                },
            });
            setAppliedNotice(true);
            setTimeout(() => {
                setAppliedNotice(false);
                router.push("/store");
            }, 800);
        } catch (err) {
            console.error("Failed to apply free image background:", err);
        } finally {
            setApplyingTemplateId(null);
        }
    };

    // Save Custom Template to Marketplace & Supabase
    const handleSaveCustomTemplate = () => {
        const slug = customTmplName.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newCustomTmpl = {
            id: `custom-${Date.now()}`,
            slug: slug,
            name: customTmplName,
            category: customCategory,
            categoryLabel: "Custom Creator Preset",
            creator: "You (Creator)",
            creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            description: "Custom designed visual template with personalized palette, typography, and background.",
            popularity: 100,
            viewsCount: "1.2k",
            is_featured: true,
            is_premium: false,
            isImageTemplate: customBackgroundStyle === "image",
            preview_image: customBackgroundImage,
            previewGradient: "from-indigo-600 via-purple-600 to-pink-600",
            config: {
                primaryColor: customPrimaryColor,
                secondaryColor: customSecondaryColor,
                backgroundColor: "#060814",
                backgroundImage: customBackgroundImage,
                backgroundStyle: customBackgroundStyle,
                backgroundOverlay: "rgba(6, 8, 20, 0.78)",
                cardStyle: customCardStyle,
                fontFamily: customFontFamily,
                buttonShape: customButtonShape,
                animation: customAnimation,
                layout: "classic",
                glowColor: `${customPrimaryColor}55`,
                accentBorder: `${customPrimaryColor}66`,
                cardBg: "rgba(12, 16, 32, 0.85)",
                textColor: "#ffffff",
                subtextColor: "#94a3b8",
                badgeColor: customPrimaryColor,
                badgeText: "#000000",
                followersCount: "125K+",
                verifiedBadge: true,
            },
            sampleBlocks: [
                { type: "header", title: "Your Brand Name", subtitle: "Creator & Innovator ✨" },
                { type: "link", title: "Explore Featured Content", subtitle: "Latest releases & portfolio", discountBadge: "NEW", url: "#" },
                { type: "product", title: "Digital Masterpiece Kit", subtitle: "Ebook, Presets & Templates", price: 39.0, discountBadge: "POPULAR", ctaText: "Get Access ($39)" },
                { type: "newsletter", title: "Join The VIP Insider Club", subtitle: "Weekly drops & private insights", ctaText: "Subscribe Free" },
                { type: "socials", title: "Connect" },
            ],
        };

        setTemplatesList([newCustomTmpl, ...templatesList]);
        setCustomTemplateModal(false);
        handleUseTemplate(newCustomTmpl);
    };

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Template Marketplace & Asset Studio"
                subtitle="Browse 20+ trendy creator templates, apply 4K free image backgrounds, or create your own custom theme."
            />

            <main className="p-6 md:p-8 space-y-8 max-w-7xl">
                {/* Main View Switcher (Templates vs Free Images vs Create Custom) */}
                <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs">
                    {/* View Switcher Pills */}
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/5">
                        <button
                            type="button"
                            onClick={() => setMarketplaceView("templates")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                marketplaceView === "templates"
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <Palette className="h-3.5 w-3.5" />
                            <span>Templates ({templatesList.length})</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setMarketplaceView("free-images")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                marketplaceView === "free-images"
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                        >
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span>Free Trendy Images ({TRENDY_FREE_IMAGES.length})</span>
                        </button>
                    </div>

                    {/* Right Action: Create Custom Template */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="gradient"
                            size="sm"
                            onClick={() => setCustomTemplateModal(true)}
                            className="gap-1.5 text-xs font-bold shadow-md shadow-indigo-500/20"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Create Custom Template</span>
                        </Button>
                    </div>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <Input
                                type="text"
                                placeholder={
                                    marketplaceView === "templates"
                                        ? "Search by aesthetic, niche, or creator..."
                                        : "Search free 4K images by title or photographer..."
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-10 text-xs bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/10"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        {marketplaceView === "templates" && (
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-zinc-500 font-medium">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-10 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                                >
                                    <option value="popular">Most Popular 🔥</option>
                                    <option value="featured">Featured First ⭐</option>
                                    <option value="newest">Newest Drops ✨</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {marketplaceView === "templates"
                            ? TEMPLATE_CATEGORIES.map((cat) => {
                                  const isSelected = selectedCategory === cat.id;
                                  return (
                                      <button
                                          key={cat.id}
                                          type="button"
                                          onClick={() => setSelectedCategory(cat.id)}
                                          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                                              isSelected
                                                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                                  : "bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5"
                                          }`}
                                      >
                                          <span>{cat.label}</span>
                                      </button>
                                  );
                              })
                            : TRENDY_IMAGE_CATEGORIES.map((cat) => {
                                  const isSelected = selectedImageCategory === cat.id;
                                  return (
                                      <button
                                          key={cat.id}
                                          type="button"
                                          onClick={() => setSelectedImageCategory(cat.id)}
                                          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                                              isSelected
                                                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                                  : "bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5"
                                          }`}
                                      >
                                          <span>{cat.label}</span>
                                      </button>
                                  );
                              })}
                    </div>
                </div>

                {/* Success Notification Banner */}
                {appliedNotice && (
                    <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in fade-in">
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Template applied successfully! Launching your Visual Builder...
                        </span>
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                    </div>
                )}

                {/* VIEW 1: TEMPLATE CARDS GRID */}
                {marketplaceView === "templates" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map((tmpl) => (
                            <Card
                                key={tmpl.id}
                                className="glass-card border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col justify-between group shadow-sm hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 relative"
                            >
                                <div>
                                    {/* Top Preview Canvas with Image Background Support */}
                                    <div
                                        className={`h-60 w-full p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-tr ${tmpl.previewGradient} transition-transform duration-500 group-hover:scale-[1.02]`}
                                    >
                                        {tmpl.preview_image && (
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${tmpl.preview_image})` }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 backdrop-blur-[1px]" />
                                            </div>
                                        )}

                                        <div className="flex justify-between items-start z-10 relative">
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] uppercase font-bold bg-black/70 text-white border-white/20 backdrop-blur-md px-2 py-0.5"
                                            >
                                                {tmpl.categoryLabel}
                                            </Badge>

                                            {tmpl.is_premium ? (
                                                <Badge
                                                    variant="gradient"
                                                    className="text-[9px] uppercase font-bold px-2 py-0.5 flex items-center gap-1 shadow-md"
                                                >
                                                    <Crown className="h-3 w-3" /> Pro
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[9px] uppercase font-bold bg-white/20 text-white border-0 backdrop-blur-md"
                                                >
                                                    Free
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Mock Cards Inside Visual Preview */}
                                        <div className="space-y-2 py-2 relative z-10">
                                            <div className="p-2.5 rounded-xl bg-black/60 border border-white/20 backdrop-blur-md text-center shadow-lg">
                                                <p className="text-xs font-bold text-white tracking-tight">
                                                    {tmpl.name}
                                                </p>
                                                <p className="text-[10px] text-zinc-300 font-mono mt-0.5">
                                                    {tmpl.config.fontFamily} • {tmpl.config.cardStyle}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div
                                                    className="h-2 flex-1 rounded-full opacity-90 shadow-xs"
                                                    style={{ backgroundColor: tmpl.config.primaryColor }}
                                                />
                                                <div
                                                    className="h-2 flex-1 rounded-full opacity-90 shadow-xs"
                                                    style={{ backgroundColor: tmpl.config.secondaryColor }}
                                                />
                                            </div>
                                        </div>

                                        {/* Bottom Creator Meta in Canvas */}
                                        <div className="flex justify-between items-center text-[11px] text-white/90 z-10 pt-1 relative">
                                            <div className="flex items-center gap-1.5">
                                                <img
                                                    src={tmpl.creatorAvatar}
                                                    alt={tmpl.creator}
                                                    className="h-5 w-5 rounded-full object-cover ring-1 ring-white/40"
                                                />
                                                <span className="font-semibold text-xs text-white">{tmpl.creator}</span>
                                            </div>
                                            <span className="font-mono text-[10px] bg-black/60 px-2 py-0.5 rounded-full border border-white/10 text-white">
                                                ★ {tmpl.popularity}% match
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description and Info */}
                                    <div className="p-5 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                                                {tmpl.name}
                                            </h4>
                                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                                                {tmpl.viewsCount} views
                                            </span>
                                        </div>

                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                            {tmpl.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Footer */}
                                <div className="p-4 bg-zinc-50/80 dark:bg-zinc-950/60 border-t border-zinc-200/60 dark:border-white/5 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPreviewModalTemplate(tmpl)}
                                        className="text-xs gap-1.5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        <span>Preview</span>
                                    </Button>

                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        disabled={applyingTemplateId === tmpl.id}
                                        onClick={() => handleUseTemplate(tmpl)}
                                        className="flex-1 text-xs gap-1.5 shadow-md shadow-indigo-500/10"
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        <span>
                                            {applyingTemplateId === tmpl.id
                                                ? "Cloning..."
                                                : "Use This Template"}
                                        </span>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* VIEW 2: FREE TRENDY 4K IMAGES GALLERY */}
                {marketplaceView === "free-images" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredFreeImages.map((img) => (
                            <Card
                                key={img.id}
                                className="glass-card border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col justify-between group shadow-sm hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 relative"
                            >
                                <div className="relative h-52 w-full overflow-hidden bg-black">
                                    <img
                                        src={img.thumb}
                                        alt={img.title}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-between">
                                        <Badge variant="outline" className="self-start text-[9px] bg-black/60 text-white border-white/20 uppercase font-bold">
                                            Free 4K Preset
                                        </Badge>
                                        <div>
                                            <p className="text-xs font-bold text-white leading-snug">{img.title}</p>
                                            <p className="text-[10px] text-zinc-300">Photo by {img.photographer}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200/60 dark:border-white/5 flex gap-2">
                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        onClick={() => handleApplyFreeImage(img)}
                                        disabled={applyingTemplateId === img.id}
                                        className="w-full text-xs gap-1.5"
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        <span>Apply as Background</span>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            {/* FULL-SCREEN LIVE TEMPLATE PREVIEW MODAL */}
            {previewModalTemplate && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 mb-4">
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    {previewModalTemplate.name}
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    by {previewModalTemplate.creator} • {previewModalTemplate.categoryLabel}
                                </p>
                            </div>

                            {/* Device Switcher */}
                            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setPreviewDevice("mobile")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                                        previewDevice === "mobile"
                                            ? "bg-indigo-600 text-white shadow-xs"
                                            : "text-zinc-500 hover:text-white"
                                    }`}
                                >
                                    <Smartphone className="h-3.5 w-3.5" />
                                    <span>Phone</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewDevice("desktop")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                                        previewDevice === "desktop"
                                            ? "bg-indigo-600 text-white shadow-xs"
                                            : "text-zinc-500 hover:text-white"
                                    }`}
                                >
                                    <Monitor className="h-3.5 w-3.5" />
                                    <span>Desktop</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={() => {
                                        const t = previewModalTemplate;
                                        setPreviewModalTemplate(null);
                                        handleUseTemplate(t);
                                    }}
                                    className="text-xs gap-1.5"
                                >
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>Use This Template</span>
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewModalTemplate(null)}
                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Interactive Canvas */}
                        <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 bg-zinc-950/40 rounded-2xl">
                            <div
                                className={`transition-all duration-300 overflow-y-auto relative ${
                                    previewDevice === "mobile"
                                        ? "w-[340px] h-[580px] rounded-[40px] border-[8px] border-zinc-800 shadow-2xl p-4 flex flex-col"
                                        : "w-full max-w-xl h-[580px] rounded-2xl border-2 border-white/10 shadow-2xl p-6 flex flex-col"
                                }`}
                                style={{
                                    backgroundColor: previewModalTemplate.config.backgroundColor || "#050505",
                                    backgroundImage: previewModalTemplate.config.backgroundImage
                                        ? `linear-gradient(${previewModalTemplate.config.backgroundOverlay || "rgba(0,0,0,0.75)"}, ${previewModalTemplate.config.backgroundOverlay || "rgba(0,0,0,0.75)"}), url(${previewModalTemplate.config.backgroundImage})`
                                        : undefined,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    fontFamily: previewModalTemplate.config.fontFamily,
                                }}
                            >
                                <div className="text-center space-y-2 pb-4 border-b border-white/10 relative z-10">
                                    <div
                                        className="h-16 w-16 rounded-full mx-auto ring-2 shadow-lg flex items-center justify-center text-lg font-bold text-white"
                                        style={{
                                            backgroundColor: `${previewModalTemplate.config.primaryColor}30`,
                                            borderColor: previewModalTemplate.config.primaryColor,
                                        }}
                                    >
                                        ✨
                                    </div>
                                    <h4 className="text-sm font-bold text-white">
                                        {previewModalTemplate.name}
                                    </h4>
                                    <p
                                        className="text-[10px] font-semibold"
                                        style={{ color: previewModalTemplate.config.primaryColor }}
                                    >
                                        @{previewModalTemplate.slug} • Verified Creator
                                    </p>
                                </div>

                                <div className="space-y-2.5 py-4 flex-1 overflow-y-auto relative z-10">
                                    {previewModalTemplate.sampleBlocks?.map((b, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-xl border text-center transition-all ${
                                                previewModalTemplate.config.cardStyle === "neon-glow"
                                                    ? "border-cyan-500/40 bg-cyan-950/40 text-white"
                                                    : "border-white/10 bg-white/5 text-white"
                                            }`}
                                        >
                                            <p className="text-xs font-bold">{b.title}</p>
                                            {b.subtitle && (
                                                <p className="text-[10px] text-zinc-300 mt-0.5 truncate">
                                                    {b.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: CREATE CUSTOM TEMPLATE STUDIO */}
            {customTemplateModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in-95 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Wand2 className="h-4 w-4 text-indigo-500" />
                                    <span>Create Custom Template & Preset</span>
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Design your own custom aesthetic theme, typography, card shapes, and background imagery.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCustomTemplateModal(false)}
                                className="text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div>
                                <label className="font-semibold text-zinc-400">Template Name</label>
                                <Input
                                    value={customTmplName}
                                    onChange={(e) => setCustomTmplName(e.target.value)}
                                    className="h-10 text-xs mt-1"
                                    placeholder="e.g. Cyberpunk Noir 2026"
                                />
                            </div>

                            {/* Background Image Picker from Presets */}
                            <div>
                                <label className="font-semibold text-zinc-400">Choose Background Image Preset</label>
                                <div className="grid grid-cols-3 gap-2 mt-1.5">
                                    {TRENDY_FREE_IMAGES.slice(0, 6).map((img) => (
                                        <button
                                            key={img.id}
                                            type="button"
                                            onClick={() => {
                                                setCustomBackgroundImage(img.url);
                                                setCustomPrimaryColor(img.primaryColor);
                                            }}
                                            className={`relative h-16 rounded-xl overflow-hidden border text-left p-1 flex flex-col justify-end transition-all cursor-pointer ${
                                                customBackgroundImage === img.url
                                                    ? "ring-2 ring-indigo-500 border-white"
                                                    : "border-white/10 opacity-70 hover:opacity-100"
                                            }`}
                                            style={{
                                                backgroundImage: `url(${img.thumb})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-black/40" />
                                            <span className="relative z-10 text-[9px] font-bold text-white truncate">
                                                {img.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-zinc-400">Custom Image URL</label>
                                <Input
                                    value={customBackgroundImage}
                                    onChange={(e) => setCustomBackgroundImage(e.target.value)}
                                    className="h-9 text-xs mt-1"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-zinc-400">Primary Accent Color</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            type="color"
                                            value={customPrimaryColor}
                                            onChange={(e) => setCustomPrimaryColor(e.target.value)}
                                            className="h-8 w-12 rounded-lg cursor-pointer bg-transparent border border-white/10"
                                        />
                                        <Input
                                            value={customPrimaryColor}
                                            onChange={(e) => setCustomPrimaryColor(e.target.value)}
                                            className="h-8 text-xs font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-semibold text-zinc-400">Card Style</label>
                                    <select
                                        value={customCardStyle}
                                        onChange={(e) => setCustomCardStyle(e.target.value)}
                                        className="w-full h-8 px-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white mt-1 outline-none"
                                    >
                                        <option value="neon-glow">Neon Glow</option>
                                        <option value="glass">Glassmorphism</option>
                                        <option value="minimal-outline">Minimalist Outline</option>
                                        <option value="brutalist">Brutalist Shadow Jump</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-semibold text-zinc-400">Font Family</label>
                                    <select
                                        value={customFontFamily}
                                        onChange={(e) => setCustomFontFamily(e.target.value)}
                                        className="w-full h-8 px-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white mt-1 outline-none"
                                    >
                                        <option value="Outfit">Outfit (Modern Clean)</option>
                                        <option value="Playfair Display">Playfair Display (Editorial Serif)</option>
                                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Minimal)</option>
                                        <option value="JetBrains Mono">JetBrains Mono (Code/Tech)</option>
                                        <option value="Syne">Syne (High Energy)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="font-semibold text-zinc-400">Button Corner Radius</label>
                                    <select
                                        value={customButtonShape}
                                        onChange={(e) => setCustomButtonShape(e.target.value)}
                                        className="w-full h-8 px-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white mt-1 outline-none"
                                    >
                                        <option value="rounded-xl">Modern (Rounded XL)</option>
                                        <option value="rounded-full">Pill (Full Radius)</option>
                                        <option value="rounded-lg">Smooth (Rounded LG)</option>
                                        <option value="sharp">Sharp (0px Brutalist)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 flex gap-2">
                            <Button
                                variant="gradient"
                                className="w-full text-xs font-bold gap-2"
                                onClick={handleSaveCustomTemplate}
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Save & Apply Custom Template</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
