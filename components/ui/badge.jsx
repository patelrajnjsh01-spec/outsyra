import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
    {
        variants: {
            variant: {
                default:
                    "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
                secondary:
                    "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
                success:
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                destructive:
                    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
                outline:
                    "border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300",
                gradient:
                    "border-indigo-500/40 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 text-indigo-600 dark:text-indigo-300",
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
