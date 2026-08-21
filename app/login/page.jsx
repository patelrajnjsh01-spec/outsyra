"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "configuration") setError("Authentication is not configured for this deployment.");
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.push(new URLSearchParams(window.location.search).get("next") || "/dashboard");
      router.refresh();
    } catch (authError) {
      setError(authError.message || "Unable to sign in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid-bg flex min-h-screen items-center justify-center px-4 py-12"><section className="w-full max-w-md"><div className="mb-8 text-center"><Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-foreground"><Sparkles className="h-6 w-6 text-primary" />Outsyra</Link><h1 className="mt-6 text-3xl font-bold tracking-tight">Welcome back</h1><p className="mt-2 text-sm text-muted-foreground">Sign in to your creator workspace.</p></div><div className="glass-panel rounded-2xl border p-6 shadow-xl sm:p-8">{error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<form className="space-y-4" onSubmit={handleLogin}><label className="block text-sm font-medium">Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label><label className="block text-sm font-medium">Password<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label><Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}<ArrowRight className="ml-2 h-4 w-4" /></Button></form></div><p className="mt-6 text-center text-sm text-muted-foreground">No account? <Link href="/signup" className="font-semibold text-primary hover:underline">Create one</Link></p></section></main>;
}