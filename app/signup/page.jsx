"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountryCodeSelect } from "@/components/auth/CountryCodeSelect";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    // Password strength evaluator
    const getStrength = (pass) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-emerald-500"];

    async function handleSignup(e) {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!termsAccepted) {
            setError("Please accept the Terms & Conditions to proceed.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    countryCode,
                    phone,
                    password,
                    confirmPassword,
                    termsAccepted,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create account.");
            }

            // Redirect to OTP verification screen
            router.push(`/verify-otp?email=${encodeURIComponent(email)}&purpose=signup`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleGoogleSignup() {
        setGoogleLoading(true);
        window.location.href = "/api/auth/google";
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Outsyra
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Create Your Creator Account
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Launch your storefront, courses, and bookings in under 2 minutes.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-5">
                    {/* Google OAuth Button */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignup}
                        disabled={googleLoading || loading}
                        className="w-full h-11 text-xs font-bold gap-2.5 shadow-sm"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span>{googleLoading ? "Connecting with Google..." : "Sign up with Google"}</span>
                    </Button>

                    <div className="relative flex items-center justify-center">
                        <div className="border-t border-zinc-200 dark:border-white/10 w-full" />
                        <span className="bg-white dark:bg-[#0f1117] px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                            or continue with email
                        </span>
                        <div className="border-t border-zinc-200 dark:border-white/10 w-full" />
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                <Input
                                    type="text"
                                    placeholder="Rajnish Sharma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 h-11 text-xs rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                <Input
                                    type="email"
                                    placeholder="you@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 text-xs rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mobile Number with Country Code */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Mobile Number
                            </label>
                            <div className="flex gap-2">
                                <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
                                <div className="relative flex-1">
                                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                    <Input
                                        type="tel"
                                        placeholder="98765 43210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-10 h-11 text-xs rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-11 text-xs rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            {password && (
                                <div className="space-y-1 pt-1">
                                    <div className="flex gap-1 h-1">
                                        {[0, 1, 2, 3].map((step) => (
                                            <div
                                                key={step}
                                                className={`h-full flex-1 rounded-full transition-all ${
                                                    step < strength ? strengthColors[strength - 1] : "bg-zinc-200 dark:bg-white/10"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-semibold text-zinc-500">
                                        Strength: {strengthLabels[strength - 1] || "Too Weak"} (8+ chars, numbers & symbols)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 h-11 text-xs rounded-xl"
                                    required
                                />
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-[10px] font-semibold text-rose-500">Passwords do not match.</p>
                            )}
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className="flex items-start gap-2.5 pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="terms" className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-normal">
                                I agree to the{" "}
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
                                    Privacy Policy
                                </a>
                                .
                            </label>
                        </div>

                        {/* Submit CTA */}
                        <Button
                            type="submit"
                            variant="gradient"
                            disabled={loading}
                            className="w-full h-11 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/25"
                        >
                            <span>{loading ? "Creating Account & Sending OTP..." : "Create Account & Verify"}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}