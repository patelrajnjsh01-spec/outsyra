import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
            secondary: "border-transparent bg-zinc-800 text-zinc-300",
            destructive: "border-transparent bg-rose-500/10 text-rose-400 border-rose-500/20",
            success: "border-transparent bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            outline: "text-zinc-300 border-zinc-700",
            gradient: "border-transparent bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300 border border-indigo-500/30",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Badge({ className, variant, ...props }) {
    return (_jsx("div", { className: cn(badgeVariants({ variant }), className), ...props }));
}
export { Badge, badgeVariants };
