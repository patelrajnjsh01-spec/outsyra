"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-white">
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <section>
            <h1 className="text-3xl font-bold">Outsyra needs a refresh.</h1>
            <p className="mt-3 text-sm text-zinc-400">The application encountered an unexpected error.</p>
            <button type="button" onClick={() => reset()} className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold">Reload application</button>
          </section>
        </main>
      </body>
    </html>
  );
}