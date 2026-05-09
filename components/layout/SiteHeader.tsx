"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Menu, Phone, Warehouse, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="section-shell flex min-h-[76px] items-center justify-between py-3">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-500 text-white">
            <Warehouse className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black text-slate-950">
              Pack-It-Up
            </span>
            <span className="block text-xs font-semibold uppercase text-slate-500">
              Self Storage
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {siteConfig.navItems.map((item) => (
            <Link
              className="text-sm font-bold text-slate-700 hover:text-brand-600"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <TrackedAnchor
            className="inline-flex items-center gap-2 text-sm font-black text-brand-600"
            href={siteConfig.phoneHref}
            eventName={siteConfig.events.clickCallNow}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </TrackedAnchor>
          <Button asChild className="bg-brand-500 hover:bg-brand-600">
            <TrackedAnchor
              href="/contact"
              eventName={siteConfig.events.clickViewUnits}
              eventParams={{ location: "header" }}
            >
              Contact Us
            </TrackedAnchor>
          </Button>
        </div>

        <Button
          className="md:hidden"
          variant="outline"
          size="icon"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>
      {isOpen ? (
        <nav
          className="section-shell grid gap-2 border-t bg-white py-4 md:hidden"
          aria-label="Mobile"
        >
          {siteConfig.navItems.map((item) => (
            <Link
              className="rounded-md px-2 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <TrackedAnchor
            className="rounded-md px-2 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50"
            href={siteConfig.phoneHref}
            eventName={siteConfig.events.clickCallNow}
            onClick={() => setIsOpen(false)}
          >
            Call Now
          </TrackedAnchor>
        </nav>
      ) : null}
    </header>
  );
}
