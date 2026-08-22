"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Download, ArrowLeft, Lock, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProducts, createOrder } from "@/lib/supabase/db";

export default function StandaloneCheckoutPage({ params }) {
    const [item, setItem] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [paymentProvider, setPaymentProvider] = useState("stripe");
    const [name, setName] = useState("Sophia Martinez");
    const [email, setEmail] = useState("sophia.m@gmail.com");

    useEffect(() => {
        async function fetchItem() {
            const products = await getProducts("ws-rajnish-001");
            const found = products?.find((p) => p.id === params?.id) || products?.[0];
            setItem(found);
        }
        fetchItem();
    }, [params?.id]);

    const handlePay = async () => {
        if (item) {
            await createOrder({
                workspace_id: "ws-rajnish-001",
                customer_name: name,
                customer_email: email,
                total_amount: item.price || 0,
                currency: "USD",
                item_title: item.name,
                payment_provider: paymentProvider,
            });
        }
        setCompleted(true);
    };

    if (!item) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 grid-bg relative overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-xl mx-auto w-full relative z-10 space-y-6">
                <Link
                    href="/public/rajnish"
                    className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Store
                </Link>

                <Card className="glass-panel border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
                    {!completed ? (
                        <>
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-emerald-400" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                                        Outsyra 256-Bit Encrypted Checkout
                                    </span>
                                </div>
                                <Badge variant="success" className="text-[10px]">
                                    Instant Access
                                </Badge>
                            </div>

                            <div className="flex gap-4 items-center p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                                <img
                                    src={item.cover_image}
                                    alt={item.name}
                                    className="h-16 w-16 rounded-xl object-cover border border-white/10"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-sm truncate">{item.name}</h3>
                                    <p className="text-xs text-zinc-400">{item.file_name}</p>
                                    <p className="text-sm font-bold text-emerald-400 mt-1">
                                        ${item.price?.toFixed(2)} USD
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-zinc-300">Choose Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentProvider("stripe")}
                                        className={`p-3 rounded-2xl border text-xs flex items-center justify-center gap-2 transition-all ${
                                            paymentProvider === "stripe"
                                                ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                                                : "bg-zinc-900/40 border-white/5 text-zinc-400"
                                        }`}
                                    >
                                        <CreditCard className="h-4 w-4 text-indigo-400" />
                                        Cards / Apple Pay
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentProvider("razorpay")}
                                        className={`p-3 rounded-2xl border text-xs flex items-center justify-center gap-2 transition-all ${
                                            paymentProvider === "razorpay"
                                                ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                                                : "bg-zinc-900/40 border-white/5 text-zinc-400"
                                        }`}
                                    >
                                        <Sparkles className="h-4 w-4 text-pink-400" />
                                        Razorpay / UPI
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="gradient"
                                className="w-full h-12 text-sm font-bold shadow-lg"
                                onClick={handlePay}
                            >
                                Pay ${item.price?.toFixed(2)} USD Now
                            </Button>
                        </>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-white">Order Completed! 🎉</h2>
                            <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                                Thank you for your order. Your purchase has been recorded in the database and confirmation sent to {email}.
                            </p>
                            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 max-w-sm mx-auto text-left space-y-2">
                                <p className="text-xs font-semibold text-white">{item.name}</p>
                                <p className="text-[11px] text-zinc-400">File size: 14.2 MB • Protected Download</p>
                            </div>
                            <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
                                <a href={`/api/products/${item.id}/download`} className="w-full">
                                    <Button variant="gradient" className="w-full gap-2 text-xs">
                                        <Download className="h-4 w-4" />
                                        Download Protected Files
                                    </Button>
                                </a>
                                <Link href="/public/rajnish">
                                    <Button variant="ghost" className="w-full text-xs text-zinc-400">
                                        Return to Store
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
