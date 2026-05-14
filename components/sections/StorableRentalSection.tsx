import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function StorableRentalSection() {
  return (
    <section className="scroll-mt-28 bg-blue-600 py-20" id="rental-app">
      <div className="section-shell">
        <div className="rounded-2xl border border-blue-500/30 bg-white p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="mb-6">
            <p className="mb-3 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600">
              Secure move-in powered by Storable
            </p>
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Move in online
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Use the online move-in portal to view current availability and
              complete the rental workflow. Payments, lease signing, insurance,
              tenant setup, and facility updates are handled inside Storedge.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">
                Online move-in portal
              </p>
              <Button asChild variant="outline" size="sm">
                <TrackedAnchor
                  href={siteConfig.tenantMoveInUrl}
                  eventName={siteConfig.events.clickMoveIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowSquareOut className="h-4 w-4" aria-hidden="true" />
                  Open in new tab
                </TrackedAnchor>
              </Button>
            </div>
            <iframe
              src={siteConfig.tenantMoveInUrl}
              title="Storedge online move-in portal"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[780px] w-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
