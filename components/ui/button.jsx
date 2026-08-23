import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-[#00f0ff] text-[#090e15] font-bold shadow-lg shadow-[#00f0ff]/20 hover:bg-[#38f4ff] hover:shadow-[#00f0ff]/35",
                gradient:
                    "bg-gradient-to-r from-[#00b4db] to-[#0083b0] hover:from-[#00c6ff] hover:to-[#0072ff] text-white font-bold shadow-lg shadow-[#00b4db]/30 hover:shadow-[#00c6ff]/45",
                destructive: "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
                outline:
                    "border border-white/10 bg-[#162331]/80 hover:bg-[#1a2c3d] hover:border-[#00f0ff]/40 hover:text-white text-slate-200 backdrop-blur-sm shadow-sm",
                secondary: "bg-[#1a2c3d] text-slate-100 shadow-sm hover:bg-[#22394f] border border-white/5",
                ghost: "hover:bg-white/5 hover:text-white text-slate-400",
                link: "text-[#00f0ff] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base font-bold",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
