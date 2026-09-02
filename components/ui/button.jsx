import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35",
                gradient:
                    "relative overflow-hidden text-white border-none transition-[background] duration-300 ease-in-out [box-shadow:inset_0_2px_1px_#ffffff40,inset_0_-4px_2px_#00000040!important] [background:radial-gradient(50%_50%_at_50%_50%,#54b8ff_0%,#1090ea_100%)] hover:shadow-indigo-500/35",
                outline:
                    "border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-zinc-100 backdrop-blur-sm shadow-sm",
                secondary:
                    "bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 border border-zinc-200/60 dark:border-white/5 shadow-sm",
                destructive:
                    "bg-rose-600 hover:bg-rose-500 text-white shadow-sm",
                ghost:
                    "hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
                link:
                    "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-7 text-sm font-bold",
                icon: "h-9 w-9",
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
