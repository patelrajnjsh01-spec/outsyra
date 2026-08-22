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
      if (authError.message?.includes("Failed to fetch") || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id")) {
        setError("Could not reach Supabase (URL in .env.local / Vercel is unreachable). Use 'Explore Demo Account' below to test immediately!");
      } else {
        setError(authError.message || "Unable to sign in. Check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDemoLogin() {
    router.push("/dashboard");
  }

  return (
    <main className="grid-bg flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-foreground">
            <Sparkles className="h-6 w-6 text-primary" />Outsyra
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your creator workspace.</p>
        </div>
        <div className="glass-panel rounded-2xl border p-6 shadow-xl sm:p-8">
          {error && (
            <div role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <p>{error}</p>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleLogin}>
            <label className="block text-sm font-medium">
              Email
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="creator@outsyra.com" />
            </label>
            <label className="block text-sm font-medium">
              Password
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" placeholder="••••••••" />
            </label>
            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-muted-foreground">Or Preview</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20" onClick={handleDemoLogin}>
            ⚡ Explore Demo Workspace (No Setup Needed)
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account? <Link href="/signup" className="font-semibold text-primary hover:underline">Create one</Link>
        </p>
      </section>
    </main>
  );
}