import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig, unitSizes } from "@/lib/site-config";

type Props = {
  compact?: boolean;
};

export function UnitSizeGuide({ compact = false }: Props) {
  const visibleSizes = compact ? unitSizes.slice(0, 3) : unitSizes;

  return (
    <section className="section-y bg-white">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
              Common storage unit sizes
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Use these examples as a starting point, then check current unit
              availability on the rental page.
            </p>
          </div>
          <Button asChild>
            <TrackedAnchor
              href="/#unit-sizes"
              eventName={siteConfig.events.clickViewUnits}
              eventParams={{ location: "size_guide" }}
            >
              View Facility Details
            </TrackedAnchor>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleSizes.map((unit) => (
            <Card className="shadow-sm" key={unit.size}>
              <CardContent>
                <p className="text-sm font-bold uppercase text-brand-600">
                  {unit.size}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {unit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {unit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
