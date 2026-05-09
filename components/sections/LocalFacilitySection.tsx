import Image from "next/image";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

export function LocalFacilitySection() {
  return (
    <section className="bg-brand-950 py-20 text-white">
      <div className="section-shell">
        <h2 className="text-center text-3xl font-black sm:text-4xl">
          Self Storage Facility in NC Area
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-white/14 p-6">
              <h3 className="text-2xl font-black">
                Why Choose Pack-It-Up Self Storage?
              </h3>
              <p className="mt-4 leading-7 text-white/85">
                {siteConfig.localSeo.whyChoose}
              </p>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-xl bg-white">
              <Image
                src={siteConfig.images.map}
                alt="Map placeholder for Pack-It-Up Self Storage"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src={siteConfig.images.driveUp}
                alt="Pack-It-Up facility exterior placeholder"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-xl bg-white/14 p-6">
              <MapPin className="h-8 w-8 text-white" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-black">
                Directions to Pack-It-Up
              </h3>
              <p className="mt-4 leading-7 text-white/85">
                {siteConfig.localSeo.directions}
              </p>
              <Button asChild className="mt-6 bg-white text-brand-800 hover:bg-white/90">
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
            </div>
          </div>
          <div className="rounded-xl bg-white p-7 text-slate-950 shadow-soft">
            <h3 className="text-3xl font-black">{siteConfig.localSeo.headline}</h3>
            <p className="mt-5 leading-8 text-slate-600">
              {siteConfig.localSeo.facility}
            </p>
            <p className="mt-5 leading-8 text-slate-600">
              Address, access details, and local facility features should be
              confirmed before launch. The current site uses placeholders so the
              page can be reviewed safely before final client data is available.
            </p>
            <Button asChild className="mt-7 bg-brand-500 hover:bg-brand-600">
              <TrackedAnchor
                href="/#unit-sizes"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "local_facility" }}
              >
                View Facility
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedAnchor>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
