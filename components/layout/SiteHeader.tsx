"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy, Phone } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="bg-brand-800 text-white">
        <div className="section-shell flex min-h-9 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-xs font-semibold sm:justify-between">
          <span>Local self storage with online rentals available 24/7</span>
          <span className="inline-flex items-center gap-1">
            Use code: PACKITUP <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="section-shell flex min-h-[88px] items-center justify-between py-3">
        <Link className="flex items-center" href="/" aria-label={siteConfig.name}>
          <Image
            src="/images/brand/kings-mountain-self-storage-logo.png"
            alt="Kings Mountain Self Storage"
            width={520}
            height={140}
            priority
            className="h-16 w-auto sm:h-20"
          />
        </Link>

        <div className="hidden items-center gap-2.5 sm:flex">
          <TrackedAnchor
            className="inline-flex items-center gap-1.5 text-[13px] font-black text-brand-600"
            href={siteConfig.phoneHref}
            eventName={siteConfig.events.clickCallNow}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </TrackedAnchor>
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
        </div>
      </div>
    </header>
  );
}
