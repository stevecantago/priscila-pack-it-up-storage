import { MapPin, Navigation, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

export function KingsMountainFacilityHighlight() {
  return (
    <section className="scroll-mt-28 bg-brand-50 py-8" id="storage">
      <div className="section-shell">
        <div className="grid gap-5 rounded-2xl border bg-white p-6 shadow-soft lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-600">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Featured Facility Location
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Storage units in Kings Mountain, Cleveland County, NC
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Pack-It-Up Self Storage currently highlights one facility serving
              Kings Mountain and the surrounding Cleveland County area. Current
              unit availability, move-in steps, payments, lease signing,
              insurance, and tenant setup are handled securely by Storable.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-brand-500" />
                Kings Mountain service area
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                Cleveland County, North Carolina
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="bg-brand-500 hover:bg-brand-600">
              <TrackedAnchor
                href="/#unit-sizes"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "homepage_facility_highlight" }}
              >
                View Facility Details
              </TrackedAnchor>
            </Button>
            <Button asChild variant="outline">
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
      </div>
    </section>
  );
}
