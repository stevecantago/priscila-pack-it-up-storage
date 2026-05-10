import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, Truck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig, unitSizes } from "@/lib/site-config";

type Props = {
  compact?: boolean;
};

export function UnitSizeGuide({ compact = false }: Props) {
  const visibleSizes = compact ? unitSizes.slice(0, 3) : unitSizes;
  const unitImages = [
    siteConfig.images.corridor,
    siteConfig.images.driveUp,
    siteConfig.images.securityGate,
    siteConfig.images.boxes,
    siteConfig.images.hero,
  ];
  const fitExamples = [
    "Closet overflow, boxes, seasonal decor",
    "Studio furniture, small appliances, inventory",
    "One-bedroom furniture and household boxes",
    "Large apartment contents and bulky furniture",
    "Multi-room moves, large furniture sets, equipment",
  ];

  return (
    <section className="scroll-mt-28 bg-white py-16 sm:py-20" id="unit-sizes">
      <div className="section-shell">
        <div className="motion-page-load max-w-2xl">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Storage options at Pack-It-Up
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Compare the unit sizes available for this Kings Mountain storage
            property, then move into the space that best fits your boxes,
            furniture, or business overflow.
          </p>
        </div>
        <div className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleSizes.map((unit, index) => (
            <Fragment key={unit.size}>
              <Card className="motion-card motion-wiggle h-full gap-0 py-0 shadow-sm">
                <div className="relative min-h-[190px] overflow-hidden bg-slate-200">
                  <Image
                    src={unitImages[index] ?? siteConfig.images.hero}
                    alt={`${unit.title} facility view`}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-black uppercase text-brand-600 shadow-sm">
                    {unit.size}
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col pt-6">
                  <h3 className="text-xl font-black text-slate-950">
                    {unit.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {unit.description}
                  </p>
                  <div className="mt-5 rounded-xl bg-brand-50 p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-brand-600">
                      Typical fit
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                      {fitExamples[index]}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 pb-6">
                  <Button
                    asChild
                    className="w-full justify-between bg-brand-950 text-white hover:bg-brand-900"
                  >
                    <TrackedAnchor
                      href="/#rental-app"
                      eventName={siteConfig.events.clickViewUnits}
                      eventParams={{ location: "size_guide_card", unit: unit.size }}
                    >
                      Move In
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedAnchor>
                  </Button>
                </CardFooter>
              </Card>
              {index === 3 ? (
                <Card
                  className="motion-card motion-wiggle flex min-h-[420px] flex-col justify-between overflow-hidden border-brand-700 bg-brand-600 p-6 text-white shadow-sm"
                >
                  <div className="flex justify-end">
                    <Truck className="h-20 w-20 text-white" weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase leading-tight">
                      U-Haul
                      <span className="block">Rentals</span>
                    </h3>
                    <p className="mt-5 max-w-[14rem] text-lg font-semibold leading-8 text-white/95">
                      We do U-Haul rentals now
                    </p>
                  </div>
                </Card>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="motion-card mt-10 rounded-2xl bg-brand-950 p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-black">Between two sizes?</h3>
              <p className="mt-3 leading-7 text-white/78">
                Choose the larger option when you need aisle space, expect to
                add more items later, or want easier access during the rental.
              </p>
            </div>
            <div className="grid gap-3 text-sm font-semibold sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4">
                Boxes only
                <span className="mt-2 block text-brand-100">Start small</span>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                Furniture
                <span className="mt-2 block text-brand-100">Size up</span>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                Frequent access
                <span className="mt-2 block text-brand-100">Leave aisle room</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
