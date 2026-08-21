import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
    variants: {
        variant: {
            default: "bg-indigo-600 text-white shadow hover:bg-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/30",
            gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:opacity-95",
            destructive: "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
            outline: "border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-zinc-200 backdrop-blur-sm",
            secondary: "bg-zinc-800 text-zinc-100 shadow-sm hover:bg-zinc-700",
            ghost: "hover:bg-white/5 hover:text-white text-zinc-400",
            link: "text-indigo-400 underline-offset-4 hover:underline",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-8 rounded-lg px-3 text-xs",
            lg: "h-12 rounded-xl px-8 text-base font-semibold",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (_jsx("button", { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button, buttonVariants };
