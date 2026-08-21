import "./globals.css";

export const metadata = {
  title: "Outsyra - The All-in-One Creator Business OS",
  description:
    "Monetize your audience with link-in-bio stores, digital products, course LMS, appointment bookings, 1:1 coaching, Instagram automation, and email marketing.",
  openGraph: {
    title: "Outsyra - Complete Creator SaaS Platform",
    description:
      "All-in-one creator business platform replacing Linktree, Stan, Kajabi, Calendly, and ManyChat.",
    url: "https://outsyra.com",
    siteName: "Outsyra",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Outsyra Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
