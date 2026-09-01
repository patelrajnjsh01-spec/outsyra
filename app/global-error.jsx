"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <section>
            <h1 className="text-3xl font-bold">Outsyra needs a refresh.</h1>
            <p className="mt-3 text-sm text-muted-foreground">The application encountered an unexpected error.</p>
            <button type="button" onClick={() => reset()} className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Reload application</button>
          </section>
        </main>
      </body>
    </html>
  );
}