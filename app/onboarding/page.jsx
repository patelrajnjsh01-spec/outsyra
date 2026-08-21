"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2, Package, GraduationCap, Calendar, Mail, Zap, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    // Form State
    const [creatorName, setCreatorName] = useState("Rajnish Sharma");
    const [username, setUsername] = useState("rajnish");
    const [bio, setBio] = useState("Helping creators build 6-figure digital businesses, courses & coaching.");
    const [category, setCategory] = useState("Creator Business & Growth");
    const [instagramHandle, setInstagramHandle] = useState("rajnish_creates");
    const [websiteUrl, setWebsiteUrl] = useState("https://outsyra.com/rajnish");
    const [country, setCountry] = useState("United States");
    const [currency, setCurrency] = useState("USD");
    // Offerings State
    const [offerings, setOfferings] = useState({
        products: true,
        courses: true,
        coaching: true,
        email: true,
        instagram: true,
    });
    const categories = [
        "Creator Business & Growth",
        "Design & Video Editing",
        "Tech & Software Development",
        "Fitness & Health",
        "Finance & Investing",
        "Marketing & Social Media",
        "Productivity & Notion",
    ];
    const handleFinish = () => {
        setLoading(true);
        setTimeout(() => {
            router.push("/dashboard");
        }, 1200);
    };
    return (_jsxs("div", { className: "min-h-screen bg-zinc-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 grid-bg relative", children: [_jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none" }), _jsxs("div", { className: "max-w-2xl mx-auto w-full relative z-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-md", children: _jsx(Sparkles, { className: "h-5 w-5 text-white" }) }), _jsx("span", { className: "text-2xl font-bold text-white tracking-tight", children: "Outsyra Setup" })] }), _jsx("h1", { className: "text-3xl font-extrabold text-white", children: "Let's build your creator workspace" }), _jsxs("p", { className: "text-sm text-zinc-400 mt-2", children: ["Step ", step, " of 3"] }), _jsx("div", { className: "w-full bg-zinc-900 h-1.5 rounded-full mt-4 overflow-hidden border border-white/5", children: _jsx("div", { className: "bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300", style: { width: `${(step / 3) * 100}%` } }) })] }), _jsxs("div", { className: "glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl", children: [step === 1 && (_jsxs("div", { className: "space-y-5 animate-in fade-in", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "1. Creator Profile & Bio Handle" }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Display Name" }), _jsx(Input, { value: creatorName, onChange: (e) => setCreatorName(e.target.value), placeholder: "e.g. Rajnish Sharma" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Claim your unique Outsyra handle" }), _jsxs("div", { className: "flex items-center rounded-xl border border-white/10 bg-zinc-900/60 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500", children: [_jsx("span", { className: "px-3.5 text-xs text-zinc-500 bg-zinc-900 border-r border-white/10 py-3", children: "outsyra.com/" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")), className: "flex-1 bg-transparent px-3 text-sm text-white focus:outline-none", placeholder: "yourname" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Short Bio" }), _jsx("textarea", { value: bio, onChange: (e) => setBio(e.target.value), rows: 3, className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500", placeholder: "Tell your audience what you create and teach..." })] }), _jsxs(Button, { variant: "gradient", className: "w-full h-11 mt-4", onClick: () => setStep(2), children: ["Continue to Category & Region", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })), step === 2 && (_jsxs("div", { className: "space-y-5 animate-in fade-in", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "2. Category, Currency & Social Links" }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Primary Creator Category" }), _jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full h-11 rounded-xl border border-white/10 bg-zinc-900/60 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500", children: categories.map((cat) => (_jsx("option", { value: cat, className: "bg-zinc-950 text-white", children: cat }, cat))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Instagram Handle" }), _jsxs("div", { className: "flex items-center rounded-xl border border-white/10 bg-zinc-900/60 overflow-hidden", children: [_jsx("span", { className: "px-3 text-xs text-zinc-500", children: "@" }), _jsx("input", { type: "text", value: instagramHandle, onChange: (e) => setInstagramHandle(e.target.value), className: "flex-1 bg-transparent py-2.5 pr-3 text-sm text-white focus:outline-none" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Store Currency" }), _jsxs("select", { value: currency, onChange: (e) => setCurrency(e.target.value), className: "w-full h-11 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500", children: [_jsx("option", { value: "USD", className: "bg-zinc-950", children: "USD ($)" }), _jsx("option", { value: "EUR", className: "bg-zinc-950", children: "EUR (\u20AC)" }), _jsx("option", { value: "GBP", className: "bg-zinc-950", children: "GBP (\u00A3)" }), _jsx("option", { value: "INR", className: "bg-zinc-950", children: "INR (\u20B9)" }), _jsx("option", { value: "CAD", className: "bg-zinc-950", children: "CAD ($)" }), _jsx("option", { value: "AUD", className: "bg-zinc-950", children: "AUD ($)" })] })] })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx(Button, { variant: "outline", className: "w-1/3", onClick: () => setStep(1), children: "Back" }), _jsxs(Button, { variant: "gradient", className: "w-2/3 h-11", onClick: () => setStep(3), children: ["Continue to Offerings", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] })), step === 3 && (_jsxs("div", { className: "space-y-5 animate-in fade-in", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "3. What do you plan to offer?" }), _jsx("p", { className: "text-xs text-zinc-400 mt-1", children: "We will automatically configure these blocks in your new store." })] }), _jsx("div", { className: "space-y-3", children: [
                                            { key: "products", label: "Sell Digital Products (Ebooks, PDFs, Templates, ZIPs)", icon: Package },
                                            { key: "courses", label: "Build & Host Video Courses (LMS with Quizzes)", icon: GraduationCap },
                                            { key: "coaching", label: "1:1 Coaching Calls & Appointment Bookings", icon: Calendar },
                                            { key: "email", label: "Email Marketing & Broadcast Newsletters", icon: Mail },
                                            { key: "instagram", label: "Official Meta Instagram Comment Automations", icon: Zap },
                                        ].map((item) => {
                                            const Icon = item.icon;
                                            const isChecked = offerings[item.key];
                                            return (_jsxs("div", { onClick: () => setOfferings((prev) => ({
                                                    ...prev,
                                                    [item.key]: !prev[item.key],
                                                })), className: `flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${isChecked
                                                    ? "bg-indigo-600/10 border-indigo-500/40 text-white"
                                                    : "bg-zinc-900/30 border-white/5 text-zinc-400 hover:bg-zinc-900/60"}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `h-8 w-8 rounded-lg flex items-center justify-center ${isChecked ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400"}`, children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsx("span", { className: "text-xs font-medium", children: item.label })] }), _jsx("div", { className: `h-5 w-5 rounded-full flex items-center justify-center border ${isChecked ? "bg-indigo-600 border-indigo-500 text-white" : "border-zinc-700"}`, children: isChecked && _jsx(CheckCircle2, { className: "h-3.5 w-3.5" }) })] }, item.key));
                                        }) }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { variant: "outline", className: "w-1/3", onClick: () => setStep(2), children: "Back" }), _jsxs(Button, { variant: "gradient", className: "w-2/3 h-11", disabled: loading, onClick: handleFinish, children: [loading ? "Generating Your Store..." : "Create My Workspace", _jsx(Sparkles, { className: "ml-2 h-4 w-4" })] })] })] }))] })] })] }));
}
