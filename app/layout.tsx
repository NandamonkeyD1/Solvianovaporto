import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Scene3D from "@/components/Scene3D";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Solvia.Nova — 3D Digital Solution Studio",
  description: "Understand Problems First, Build Solutions. Konsep, teknologi, dan solusi digital dalam satu ekosistem yang dirancang untuk berkembang.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 (GA4) Tracking Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SOLVIANOVA"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SOLVIANOVA', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="bg-[#020611] text-white antialiased relative min-h-screen flex flex-col selection:bg-[#61adff] selection:text-[#020611]">
        {/* 3D Scene Canvas Background */}
        <Scene3D />

        {/* Client Layout Wrapper (Conditionally renders Navbar & Footer for non-admin pages) */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
