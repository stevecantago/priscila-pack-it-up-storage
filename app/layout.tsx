import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { SEOJsonLd } from "@/components/seo/SEOJsonLd";
import { getMissingRequiredEnvGroups, warnOnceForMissingRequiredEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/seo";
import "./globals.css";
import { Figtree, Nunito_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const nunitoSansHeading = Nunito_Sans({subsets:['latin'],variable:'--font-heading'});

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Pack-It-Up Self Storage | Secure Online Storage Rentals",
    description:
      "Rent secure self storage online in minutes with Pack-It-Up Self Storage.",
    path: "/",
  }),
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: "/images/brand/kings-mountain-self-storage-favicon.png",
    shortcut: "/images/brand/kings-mountain-self-storage-favicon.png",
    apple: "/images/brand/kings-mountain-self-storage-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const missingEnvGroups = getMissingRequiredEnvGroups();

  warnOnceForMissingRequiredEnv();

  return (
    <html lang="en" className={cn("font-sans", figtree.variable, nunitoSansHeading.variable)}>
      <body className="min-h-screen antialiased">
        {process.env.NODE_ENV !== "production" && missingEnvGroups.length > 0 ? (
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p className="font-semibold">Missing environment variables detected</p>
            <div className="mt-1 space-y-1">
              {missingEnvGroups.map((group) => (
                <p key={group.label}>
                  <span className="font-medium">{group.label}:</span>{" "}
                  {group.names.join(", ")}
                </p>
              ))}
            </div>
          </div>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <SEOJsonLd />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
