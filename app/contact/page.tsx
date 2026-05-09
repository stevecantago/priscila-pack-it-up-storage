import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Pack-It-Up Self Storage",
  description:
    "Contact Pack-It-Up Self Storage for help choosing a unit, renting online, or getting directions to the facility.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="section-shell max-w-4xl">
          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Contact Pack-It-Up Self Storage
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Have a question about unit sizes, online rentals, or facility access?
            Send a message or call for help.
          </p>
        </div>
      </section>
      <section className="bg-slate-50 py-12">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">
              Send a message
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Include your preferred unit size if you already know what you need.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">
                Facility details
              </h2>
              <address className="mt-5 space-y-4 not-italic text-slate-700">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-brand-500" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.region}{" "}
                    {siteConfig.address.postalCode}
                  </span>
                </p>
                <p>
                  <TrackedAnchor
                    className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-800"
                    href={siteConfig.phoneHref}
                    eventName={siteConfig.events.clickCallNow}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    {siteConfig.phone}
                  </TrackedAnchor>
                </p>
              </address>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <TrackedAnchor
                    href={siteConfig.directionsUrl}
                    eventName={siteConfig.events.clickDirections}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Get Directions
                  </TrackedAnchor>
                </Button>
                <Button asChild variant="outline">
                  <TrackedAnchor
                    href="/#unit-sizes"
                    eventName={siteConfig.events.clickViewUnits}
                    eventParams={{ location: "contact_page" }}
                  >
                    Facility Details
                  </TrackedAnchor>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-lg border bg-slate-200 shadow-sm">
              <Image
                src={siteConfig.images.map}
                alt="Map placeholder for Pack-It-Up Self Storage location"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
