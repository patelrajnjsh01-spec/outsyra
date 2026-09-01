"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
    const [currentPlan] = useState("Creator Pro");

    const invoices = [
        { id: "INV-2026-008", date: "Aug 21, 2026", amount: "$49.00", status: "Paid" },
        { id: "INV-2026-007", date: "Jul 21, 2026", amount: "$49.00", status: "Paid" },
        { id: "INV-2026-006", date: "Jun 21, 2026", amount: "$49.00", status: "Paid" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Subscription & Billing"
                subtitle="Manage your Outsyra creator plan, invoice history, and payment methods."
            />
            <main className="p-6 md:p-8 space-y-8 max-w-5xl">
                <div className="glass-card p-8 rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-950/40 dark:to-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="gradient" className="text-xs">
                                Active Subscription
                            </Badge>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">Renews on Sep 21, 2026</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">{currentPlan} Plan ($49 / month)</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-lg">
                            Unlimited digital products, unlimited video courses, official Meta Instagram automations, Google Calendar sync, and 0% transaction fees.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="text-xs">
                            Manage in Stripe Portal
                        </Button>
                    </div>
                </div>

                <Card className="glass-card border-zinc-200 dark:border-white/10 p-6 space-y-4 shadow-sm">
                    <CardTitle className="text-base">Invoice History</CardTitle>
                    <div className="divide-y divide-zinc-200/60 dark:divide-white/5 text-xs">
                        {invoices.map((inv) => (
                            <div key={inv.id} className="py-3 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-zinc-900 dark:text-white">{inv.id}</p>
                                    <p className="text-[11px] text-zinc-500">{inv.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-zinc-900 dark:text-white">{inv.amount}</span>
                                    <Badge variant="success" className="text-[10px]">
                                        {inv.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
}
