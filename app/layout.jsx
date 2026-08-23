import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Outsyra - The All-in-One Creator Business OS",
  description:
    "Monetize your audience with link-in-bio stores, digital products, course LMS, appointment bookings, 1:1 coaching, Instagram automation, and email marketing.",
  openGraph: {
    title: "Outsyra - Complete Creator SaaS Platform",
    description:
      "All-in-one creator business platform replacing Linktree, Stan, Kajabi, Calendly, and ManyChat.",
    url: "https://outsyra.vercel.app",
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

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
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
      <body className="min-h-screen bg-[#090e15] font-sans antialiased text-[#f1f5f9] selection:bg-[#00f0ff] selection:text-[#090e15]">
        {children}
      </body>
    </html>
  );
}
