"use client";

export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold text-primary">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-bold">We could not load this page.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again, or return to the home page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={() => reset()} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Try again</button>
          <a href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold">Home</a>
        </div>
      </section>
    </main>
  );
}