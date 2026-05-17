"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="bg-brand-800 text-white">
        <div className="section-shell flex min-h-9 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-xs font-semibold sm:justify-between">
          <span>Local self storage with online rentals available 24/7</span>
          <a
            className="transition-colors hover:text-brand-100"
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.phone}`}
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
      <div className="section-shell flex min-h-[88px] flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center self-center sm:self-auto" href="/" aria-label={siteConfig.name}>
          <Image
            src="/images/brand/pack-it-up-us-logo-transparent.png"
            alt="Pack-It-Up Self Storage"
            width={520}
            height={140}
            priority
            className="h-16 w-auto object-contain sm:h-20"
          />
        </Link>

        <div className="w-full sm:hidden">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full border-brand-500 px-4 font-black text-brand-600 hover:bg-brand-50 hover:text-brand-700"
          >
            <a
              href={siteConfig.tenantLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tenant Log In
            </a>
          </Button>
        </div>

        <div className="hidden items-center gap-2.5 sm:flex">
          <Button
            asChild
            size="sm"
            className="bg-brand-500 px-4 font-black hover:bg-brand-600"
          >
            <TrackedAnchor
              href="/contact"
              eventName={siteConfig.events.clickViewUnits}
              eventParams={{ location: "header" }}
            >
              Contact Us
            </TrackedAnchor>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-brand-500 px-4 font-black text-brand-600 hover:bg-brand-50 hover:text-brand-700"
          >
            <a
              href={siteConfig.tenantLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tenant Log In
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
