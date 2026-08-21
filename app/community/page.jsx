"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { MessageSquare, Heart, Pin, Plus, Hash, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialCommunities, initialCommunityPosts } from "@/lib/supabase/mock-db";
export default function CommunityPage() {
    const [channels, setChannels] = useState(initialCommunities);
    const [activeChannelId, setActiveChannelId] = useState("chan-3");
    const [posts, setPosts] = useState(initialCommunityPosts);
    // New Post State
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [composerOpen, setComposerOpen] = useState(false);
    const activeChannel = channels.find((c) => c.id === activeChannelId);
    const channelPosts = posts.filter((p) => p.channel_id === activeChannelId);
    const handleLike = (postId) => {
        setPosts(posts.map((p) => p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p));
    };
    const handleCreatePost = (e) => {
        e.preventDefault();
        const newPost = {
            id: `post-${Date.now()}`,
            workspace_id: "ws-rajnish-001",
            channel_id: activeChannelId,
            author_id: "usr-rajnish-001",
            author_name: "Rajnish Sharma",
            author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            title: postTitle,
            content: postContent,
            likes_count: 1,
            comments_count: 0,
            is_pinned: false,
            created_at: new Date().toISOString(),
        };
        setPosts([newPost, ...posts]);
        setComposerOpen(false);
        setPostTitle("");
        setPostContent("");
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Creator Community", subtitle: "Host an exclusive community space for your students, clients, and VIP members." }), _jsxs("div", { className: "flex-1 flex flex-col lg:flex-row min-h-0", children: [_jsxs("div", { className: "w-full lg:w-64 border-r border-white/5 bg-zinc-950/80 p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-white/5", children: [_jsx("span", { className: "text-xs font-bold text-white uppercase tracking-wider", children: "Channels" }), _jsx(Badge, { variant: "gradient", className: "text-[10px]", children: "420 Members" })] }), _jsx("div", { className: "space-y-1", children: channels.map((chan) => (_jsxs("button", { onClick: () => setActiveChannelId(chan.id), className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeChannelId === chan.id
                                        ? "bg-indigo-600/20 text-white border border-indigo-500/30"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"}`, children: [_jsx(Hash, { className: "h-4 w-4 text-indigo-400" }), _jsx("span", { children: chan.name })] }, chan.id))) })] }), _jsxs("div", { className: "flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-4xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [_jsx(Hash, { className: "h-5 w-5 text-indigo-400" }), " #", activeChannel?.name] }), _jsx("p", { className: "text-xs text-zinc-400 mt-0.5", children: activeChannel?.description })] }), _jsxs(Button, { variant: "gradient", size: "sm", onClick: () => setComposerOpen(true), className: "gap-1.5 text-xs", children: [_jsx(Plus, { className: "h-4 w-4" }), "New Post"] })] }), _jsx("div", { className: "space-y-4", children: channelPosts.map((post) => (_jsxs(Card, { className: "glass-panel border-white/5 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: post.author_avatar, alt: post.author_name, className: "h-9 w-9 rounded-full object-cover ring-1 ring-white/10" }), _jsxs("div", { children: [_jsx("span", { className: "text-xs font-bold text-white", children: post.author_name }), _jsx("p", { className: "text-[10px] text-zinc-500", children: new Date(post.created_at).toLocaleDateString() })] })] }), post.is_pinned && (_jsxs(Badge, { variant: "default", className: "text-[10px] gap-1", children: [_jsx(Pin, { className: "h-3 w-3" }), " Pinned"] }))] }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-bold text-white", children: post.title }), _jsx("p", { className: "text-xs text-zinc-300 mt-2 leading-relaxed whitespace-pre-line", children: post.content })] }), _jsxs("div", { className: "pt-3 border-t border-white/5 flex items-center gap-4 text-xs text-zinc-400", children: [_jsxs("button", { onClick: () => handleLike(post.id), className: "flex items-center gap-1.5 hover:text-rose-400 transition-colors", children: [_jsx(Heart, { className: "h-4 w-4 text-rose-500 fill-rose-500/20" }), _jsx("span", { children: post.likes_count })] }), _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(MessageSquare, { className: "h-4 w-4 text-indigo-400" }), _jsxs("span", { children: [post.comments_count, " comments"] })] })] })] }, post.id))) })] })] }), composerOpen && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95", children: [_jsxs("h3", { className: "text-base font-bold text-white", children: ["Post to #", activeChannel?.name] }), _jsxs("form", { onSubmit: handleCreatePost, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Post Title" }), _jsx(Input, { required: true, placeholder: "e.g. My top takeaway from Module 2", value: postTitle, onChange: (e) => setPostTitle(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Discussion Content" }), _jsx("textarea", { rows: 4, required: true, className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500", placeholder: "Share details, questions, or celebrate your milestones...", value: postContent, onChange: (e) => setPostContent(e.target.value) })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx(Button, { variant: "outline", type: "button", className: "w-1/3", onClick: () => setComposerOpen(false), children: "Cancel" }), _jsx(Button, { variant: "gradient", type: "submit", className: "w-2/3", children: "Publish Post" })] })] })] }) }))] }));
}
