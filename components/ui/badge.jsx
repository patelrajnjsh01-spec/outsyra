import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.15)]",
                secondary: "border-white/10 bg-[#162331] text-slate-300",
                destructive: "border-rose-500/20 bg-rose-500/10 text-rose-400",
                success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(0,230,118,0.15)]",
                gold: "border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.15)]",
                outline: "border-white/10 text-slate-300 bg-transparent",
                gradient:
                    "border-[#00f0ff]/40 bg-gradient-to-r from-[#00f0ff]/15 via-[#3b82f6]/15 to-[#8b5cf6]/15 text-[#00f0ff] shadow-[0_0_14px_rgba(0,240,255,0.2)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
