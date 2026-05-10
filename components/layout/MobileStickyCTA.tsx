"use client";

import Link from "next/link";
import { Phone } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-3 shadow-[0_-12px_35px_rgba(15,23,42,0.12)] md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand-950 px-3 text-sm font-bold text-white"
          href="/#unit-sizes"
          onClick={() =>
            trackEvent(siteConfig.events.clickViewUnits, {
              location: "mobile_sticky",
            })
          }
        >
          Facility
        </Link>
        <a
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-500 px-3 text-sm font-bold text-white"
          href={siteConfig.phoneHref}
          onClick={() => trackEvent(siteConfig.events.clickCallNow)}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </div>
  );
}
