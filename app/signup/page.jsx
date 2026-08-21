"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { data, error: authError } = await createClient().auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: `${window.location.origin}/auth/callback` } });
      if (authError) throw authError;
      if (data.session) router.push("/onboarding");
      else setMessage("Check your email to confirm your account before signing in.");
    } catch (authError) {
      setError(authError.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid-bg flex min-h-screen items-center justify-center px-4 py-12"><section className="w-full max-w-md"><div className="mb-8 text-center"><Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-foreground"><Sparkles className="h-6 w-6 text-primary" />Outsyra</Link><h1 className="mt-6 text-3xl font-bold tracking-tight">Create your creator store</h1><p className="mt-2 text-sm text-muted-foreground">Start with a secure creator account.</p></div><div className="glass-panel rounded-2xl border p-6 shadow-xl sm:p-8">{error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}{message && <p role="status" className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600">{message}</p>}<form className="space-y-4" onSubmit={handleSignup}><label className="block text-sm font-medium">Full name<Input value={fullName} onChange={(event) => setFullName(event.target.value)} required autoComplete="name" /></label><label className="block text-sm font-medium">Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label><label className="block text-sm font-medium">Password<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete="new-password" /></label><Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}<ArrowRight className="ml-2 h-4 w-4" /></Button></form></div><p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p></section></main>;
}