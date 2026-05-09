import Image from "next/image";
import { ArrowRight, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

export function AvailableUnitsPreview() {
  return (
    <section className="scroll-mt-28 bg-brand-50 pb-20" id="unit-sizes">
      <div className="section-shell">
        <div className="rounded-2xl border bg-white p-4 shadow-soft sm:p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Kings Mountain Unit Sizes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Preview common sizes here. Current availability and rental steps
                are handled by Storable.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <TrackedAnchor
                href="/#unit-sizes"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "unit_preview_filter" }}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                View Facility Details
              </TrackedAnchor>
            </Button>
          </div>
          <div className="grid gap-4">
            {siteConfig.previewUnits.map((unit) => (
              <article
                className="grid gap-4 rounded-xl border bg-white p-3 shadow-sm md:grid-cols-[140px_1fr_auto] md:items-center"
                key={unit.title}
              >
                <div className="relative min-h-[110px] overflow-hidden rounded-lg bg-slate-200">
                  <Image
                    src={unit.image}
                    alt={`${unit.title} preview placeholder`}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-slate-950">
                      {unit.title}
                    </h3>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black uppercase text-brand-600">
                      Check live availability
                    </span>
                  </div>
                  <p className="mt-2 leading-7 text-slate-600">
                    {unit.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {unit.tags.map((tag) => (
                      <span
                        className="inline-flex items-center gap-1.5 text-sm text-slate-600"
                        key={tag}
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-500" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button asChild size="sm" className="bg-brand-500 hover:bg-brand-600">
                  <TrackedAnchor
                    href="/#rental-app"
                    eventName={siteConfig.events.clickViewUnits}
                    eventParams={{ location: "unit_preview_row", unit: unit.size }}
                  >
                    Move In
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedAnchor>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
