import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata = {
  title: "Outsyra — The Operating System for Creator Businesses",
  description:
    "Monetize your audience with link-in-bio storefronts, digital products, multi-module course LMS, 1:1 coaching & calendar bookings, Instagram comment auto-DMs, and email newsletters — unified in one workspace.",
  keywords: [
    "creator economy",
    "link in bio",
    "sell digital products",
    "course platform",
    "creator LMS",
    "1:1 coaching booking",
    "instagram automation",
    "email marketing for creators",
    "Stan Store alternative",
    "Kajabi alternative",
  ],
  authors: [{ name: "Outsyra Team" }],
  creator: "Outsyra",
  publisher: "Outsyra",
  metadataBase: new URL("https://outsyra.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Outsyra — The Operating System for Creator Businesses",
    description:
      "Sell products, host courses, book 1:1 coaching, and automate audience growth with 0% transaction fees.",
    url: "https://outsyra.vercel.app",
    siteName: "Outsyra",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Outsyra Creator Business OS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outsyra — The Operating System for Creator Businesses",
    description:
      "All-in-one creator commerce and audience automation platform.",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
