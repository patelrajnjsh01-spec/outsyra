const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Rubik'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
                heading: ["'Rubik'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                clutch: {
                    void: "#090e15",
                    navy: "#0f1923",
                    panel: "#162331",
                    elevated: "#1a2c3d",
                    border: "rgba(255, 255, 255, 0.08)",
                    cyan: "#00f0ff",
                    teal: "#00d2ff",
                    emerald: "#00e676",
                    violet: "#8b5cf6",
                    gold: "#fbbf24",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            borderRadius: {
                "3xl": "1.5rem",
                "2xl": "1rem",
                xl: "0.75rem",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.3" },
                    "50%": { opacity: "0.7" },
                },
            },
            animation: {
                float: "float 5s ease-in-out infinite",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
