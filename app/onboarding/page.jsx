"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Sparkles,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Package,
    Palette,
    Layers,
    User,
    Link as LinkIcon,
    Radio,
    Check,
    Briefcase,
    Music,
    Camera,
    FolderKanban,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { updateWorkspace, replaceStoreBlocks } from "@/lib/supabase/db";
import { MARKETPLACE_TEMPLATES } from "@/data/marketplace-templates";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Step 1: Persona
    const [persona, setPersona] = useState("creator");

    // Step 2: Username check
    const [username, setUsername] = useState("rajnish");
    const [usernameStatus, setUsernameStatus] = useState("available"); // "checking" | "available" | "taken"

    // Step 3: Template selection
    const [selectedTemplateId, setSelectedTemplateId] = useState(MARKETPLACE_TEMPLATES[0].id);

    // Step 4: Profile Details
    const [displayName, setDisplayName] = useState("Rajnish Sharma");
    const [bio, setBio] = useState("Helping modern creators build 6-figure digital businesses & automated funnels.");
    const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");

    // Step 5: First Link
    const [firstLinkTitle, setFirstLinkTitle] = useState("Check out my latest project");
    const [firstLinkUrl, setFirstLinkUrl] = useState("https://outsyra.com");

    const personas = [
        { id: "creator", title: "Content Creator / Influencer", icon: Sparkles, desc: "Monetize audience with links, ebooks & courses" },
        { id: "business", title: "Startup / Small Business", icon: Briefcase, desc: "Generate leads, bookings & showcase products" },
        { id: "portfolio", title: "Freelancer / Portfolio", icon: FolderKanban, desc: "Showcase case studies, skills & client intake" },
        { id: "music", title: "Musician / Audio Artist", icon: Music, desc: "Stream drops, Spotify albums & sample packs" },
        { id: "personal", title: "Personal Brand & Bio", icon: User, desc: "Unify social profiles and contact info" },
    ];

    const handleUsernameChange = (val) => {
        const clean = val.toLowerCase().replace(/[^a-z0-9_-]/g, "");
        setUsername(clean);
        if (clean.length > 2) {
            setUsernameStatus("available");
        } else {
            setUsernameStatus("checking");
        }
    };

    const handleCompleteOnboarding = async () => {
        setLoading(true);
        try {
            const chosenTemplate = MARKETPLACE_TEMPLATES.find((t) => t.id === selectedTemplateId) || MARKETPLACE_TEMPLATES[0];

            await updateWorkspace("ws-rajnish-001", {
                username,
                display_name: displayName,
                bio,
                avatar_url: avatarUrl,
                category: persona,
                theme_config: {
                    ...chosenTemplate.config,
                    templateId: chosenTemplate.slug,
                },
            });

            // Populate initial blocks
            const initialBlocks = [
                {
                    id: `block-${Date.now()}-1`,
                    workspace_id: "ws-rajnish-001",
                    type: "header",
                    title: displayName,
                    subtitle: bio,
                    order_index: 0,
                    is_visible: true,
                },
                {
                    id: `block-${Date.now()}-2`,
                    workspace_id: "ws-rajnish-001",
                    type: "link",
                    title: firstLinkTitle,
                    subtitle: "Featured Link",
                    url: firstLinkUrl,
                    discountBadge: "FEATURED",
                    order_index: 1,
                    is_visible: true,
                },
                {
                    id: `block-${Date.now()}-3`,
                    workspace_id: "ws-rajnish-001",
                    type: "newsletter",
                    title: "Join my VIP Newsletter",
                    subtitle: "Weekly insights & exclusive updates",
                    order_index: 2,
                    is_visible: true,
                },
                {
                    id: `block-${Date.now()}-4`,
                    workspace_id: "ws-rajnish-001",
                    type: "socials",
                    title: "Connect with me",
                    order_index: 3,
                    is_visible: true,
                },
            ];

            await replaceStoreBlocks("ws-rajnish-001", initialBlocks);

            setStep(6);
        } catch (err) {
            console.error("Onboarding failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 grid-bg relative transition-colors duration-200">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto w-full relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Outsyra Setup
                        </span>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-zinc-500">
                        <span>Step {step} of 6</span>
                        <span>{Math.round((step / 6) * 100)}% Completed</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300"
                            style={{ width: `${(step / 6) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Main Card */}
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-6">
                    {/* STEP 1: What are you creating? */}
                    {step === 1 && (
                        <div className="space-y-5 animate-in fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    What kind of page are you building?
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">
                                    We will personalize your templates and blocks based on your objective.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {personas.map((p) => {
                                    const Icon = p.icon;
                                    const isSelected = persona === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setPersona(p.id)}
                                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                                                isSelected
                                                    ? "bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-300 ring-2 ring-indigo-500/20"
                                                    : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 hover:border-indigo-500/40"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <Icon className="h-5 w-5 text-indigo-500" />
                                                {isSelected && <Check className="h-4 w-4 text-indigo-500 font-bold" />}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                    {p.title}
                                                </h4>
                                                <p className="text-[11px] text-zinc-500 mt-0.5">{p.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="gradient"
                                className="w-full text-xs gap-2"
                                onClick={() => setStep(2)}
                            >
                                <span>Continue</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}

                    {/* STEP 2: Claim Username */}
                    {step === 2 && (
                        <div className="space-y-5 animate-in fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Claim your unique Outsyra handle
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">
                                    This will be your shareable public link (e.g. outsyra.com/yourname).
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                                    <span className="px-4 text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/10 py-3.5">
                                        outsyra.com/
                                    </span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => handleUsernameChange(e.target.value)}
                                        className="flex-1 bg-transparent px-3 text-sm text-zinc-900 dark:text-white font-bold outline-none"
                                        placeholder="yourname"
                                    />
                                    {usernameStatus === "available" && (
                                        <span className="pr-3 text-xs text-emerald-500 font-bold flex items-center gap-1">
                                            <Check className="h-3.5 w-3.5" /> Available
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="text-xs" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button
                                    variant="gradient"
                                    className="flex-1 text-xs gap-2"
                                    disabled={username.length < 3}
                                    onClick={() => setStep(3)}
                                >
                                    <span>Claim Handle</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Choose Template */}
                    {step === 3 && (
                        <div className="space-y-5 animate-in fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Choose your starting template
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">
                                    You can customize every single color, font, and button anytime later.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                                {MARKETPLACE_TEMPLATES.slice(0, 6).map((tmpl) => {
                                    const isSelected = selectedTemplateId === tmpl.id;
                                    return (
                                        <button
                                            key={tmpl.id}
                                            type="button"
                                            onClick={() => setSelectedTemplateId(tmpl.id)}
                                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                                isSelected
                                                    ? "bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20"
                                                    : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-white/5 hover:border-indigo-500/40"
                                            }`}
                                        >
                                            <div
                                                className={`h-16 w-full rounded-xl bg-gradient-to-tr ${tmpl.previewGradient} p-2 flex items-center justify-between mb-2`}
                                            >
                                                <Badge variant="outline" className="text-[8px] bg-black/60 text-white border-white/20 uppercase font-bold">
                                                    {tmpl.categoryLabel}
                                                </Badge>
                                                {isSelected && <Check className="h-4 w-4 text-white font-bold" />}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{tmpl.name}</h4>
                                                <p className="text-[10px] text-zinc-500 line-clamp-1">{tmpl.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="text-xs" onClick={() => setStep(2)}>
                                    Back
                                </Button>
                                <Button
                                    variant="gradient"
                                    className="flex-1 text-xs gap-2"
                                    onClick={() => setStep(4)}
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Profile Details */}
                    {step === 4 && (
                        <div className="space-y-5 animate-in fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Set up your profile identity
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">
                                    Add your display name, avatar, and bio tagline.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500">Display Name</label>
                                    <Input
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="h-10 text-xs mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500">Bio Tagline</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={2}
                                        className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white mt-1 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500">Avatar Image URL</label>
                                    <Input
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        className="h-10 text-xs mt-1"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="text-xs" onClick={() => setStep(3)}>
                                    Back
                                </Button>
                                <Button
                                    variant="gradient"
                                    className="flex-1 text-xs gap-2"
                                    onClick={() => setStep(5)}
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: First Link */}
                    {step === 5 && (
                        <div className="space-y-5 animate-in fade-in">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Add your primary featured link
                                </h2>
                                <p className="text-xs text-zinc-500 mt-1">
                                    What is the main destination you want visitors to click first?
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500">Link Title</label>
                                    <Input
                                        value={firstLinkTitle}
                                        onChange={(e) => setFirstLinkTitle(e.target.value)}
                                        className="h-10 text-xs mt-1"
                                        placeholder="e.g. My Portfolio / Latest YouTube Video"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500">Destination URL</label>
                                    <Input
                                        value={firstLinkUrl}
                                        onChange={(e) => setFirstLinkUrl(e.target.value)}
                                        className="h-10 text-xs mt-1"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="text-xs" onClick={() => setStep(4)}>
                                    Back
                                </Button>
                                <Button
                                    variant="gradient"
                                    className="flex-1 text-xs gap-2"
                                    disabled={loading}
                                    onClick={handleCompleteOnboarding}
                                >
                                    <span>{loading ? "Publishing Page..." : "Publish My Page 🎉"}</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: Celebratory Success */}
                    {step === 6 && (
                        <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-xl">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                                You're Live on Outsyra! 🚀
                            </h3>
                            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                                Your public page is live at{" "}
                                <strong className="text-indigo-500 font-mono">outsyra.com/{username}</strong>. Let's open your Visual Builder to add more monetization blocks.
                            </p>

                            <div className="pt-3">
                                <Button
                                    variant="gradient"
                                    className="w-full text-xs gap-2"
                                    onClick={() => router.push("/store")}
                                >
                                    <span>Open Visual Page Builder</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
