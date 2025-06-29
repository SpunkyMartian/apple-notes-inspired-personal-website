import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import SidebarLayout from "@/components/sidebar-layout";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{siteConfig.title}</title>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={siteConfig.name}></meta>
        <meta
          property="twitter:description"
          content={siteConfig.description}
        ></meta>
        <meta property="og:site_name" content={siteConfig.name}></meta>
        <meta property="og:description" content={siteConfig.description}></meta>
        <meta property="og:title" content={siteConfig.name}></meta>
        <meta property="og:url" content={siteConfig.url}></meta>
      </head>
      <body
        className={cn("min-h-dvh font-sans antialiased", fontSans.variable)}
      >
        <SidebarLayout>
          <Analytics />
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}