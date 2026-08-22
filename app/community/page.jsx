"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Pin, Plus, Hash } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCommunityPosts, createCommunityPost, toggleLikeCommunityPost } from "@/lib/supabase/db";
import { initialCommunities } from "@/lib/supabase/mock-db";

export default function CommunityPage() {
    const [channels, setChannels] = useState(initialCommunities);
    const [activeChannelId, setActiveChannelId] = useState("chan-3");
    const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [composerOpen, setComposerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getCommunityPosts("comm-001");
                setPosts(data || []);
            } catch (err) {
                console.error("Failed to load community posts", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const activeChannel = channels.find((c) => c.id === activeChannelId);
    const channelPosts = posts.filter((p) => p.channel_id === activeChannelId || !p.channel_id);

    const handleLike = async (postId) => {
        const updated = await toggleLikeCommunityPost(postId);
        setPosts(posts.map((p) => (p.id === postId ? updated : p)));
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const newPost = await createCommunityPost("comm-001", {
            channel_id: activeChannelId,
            title: postTitle,
            content: postContent,
            is_pinned: false,
        });
        setPosts([newPost, ...posts]);
        setComposerOpen(false);
        setPostTitle("");
        setPostContent("");
    };

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Creator Community (Supabase Database)"
                subtitle="Host an exclusive community space for your students, clients, and VIP members."
            />
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Channels sidebar */}
                <div className="w-full lg:w-64 border-r border-white/5 bg-zinc-950/80 p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Channels</span>
                        <Badge variant="gradient" className="text-[10px]">
                            420 Members
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        {channels.map((chan) => (
                            <button
                                key={chan.id}
                                onClick={() => setActiveChannelId(chan.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                    activeChannelId === chan.id
                                        ? "bg-indigo-600/20 text-white border border-indigo-500/30"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                }`}
                            >
                                <Hash className="h-4 w-4 text-indigo-400" />
                                <span>{chan.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts feed */}
                <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Hash className="h-5 w-5 text-indigo-400" /> #{activeChannel?.name}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-0.5">{activeChannel?.description}</p>
                        </div>
                        <Button
                            variant="gradient"
                            size="sm"
                            onClick={() => setComposerOpen(true)}
                            className="gap-1.5 text-xs"
                        >
                            <Plus className="h-4 w-4" />
                            New Post
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {channelPosts.map((post) => (
                            <Card key={post.id} className="glass-panel border-white/5 p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.author_avatar}
                                            alt={post.author_name}
                                            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                                        />
                                        <div>
                                            <span className="text-xs font-bold text-white">{post.author_name}</span>
                                            <p className="text-[10px] text-zinc-500">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {post.is_pinned && (
                                        <Badge variant="default" className="text-[10px] gap-1">
                                            <Pin className="h-3 w-3" /> Pinned
                                        </Badge>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white">{post.title}</h4>
                                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed whitespace-pre-line">
                                        {post.content}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-white/5 flex items-center gap-4 text-xs text-zinc-400">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center gap-1.5 transition-colors ${
                                            post.is_liked ? "text-rose-400 font-bold" : "hover:text-rose-400"
                                        }`}
                                    >
                                        <Heart
                                            className={`h-4 w-4 text-rose-500 ${
                                                post.is_liked ? "fill-rose-500" : "fill-rose-500/20"
                                            }`}
                                        />
                                        <span>{post.likes_count || 0}</span>
                                    </button>
                                    <span className="flex items-center gap-1.5">
                                        <MessageSquare className="h-4 w-4 text-indigo-400" />
                                        <span>{post.comments_count || 0} comments</span>
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {composerOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95">
                        <h3 className="text-base font-bold text-white">Post to #{activeChannel?.name}</h3>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Post Title</label>
                                <Input
                                    required
                                    placeholder="e.g. My top takeaway from Module 2"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Discussion Content</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Share details, questions, or celebrate your milestones..."
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-1/3" onClick={() => setComposerOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" className="w-2/3">
                                    Save to Supabase
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
