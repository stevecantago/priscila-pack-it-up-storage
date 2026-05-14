import {
  Bank,
  Camera,
  DoorOpen,
  Ruler,
  ShieldCheck,
  Van,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

const benefits = [
  {
    title: "24/7 Video Surveillance",
    text: "Security messaging placeholder for camera coverage and facility visibility.",
    icon: Camera,
  },
  {
    title: "Gated Facility",
    text: "Access-control messaging placeholder pending final facility confirmation.",
    icon: ShieldCheck,
  },
  {
    title: "Drive-Up Storage",
    text: "Convenient unit access for moving, loading, and household storage needs.",
    icon: DoorOpen,
  },
  {
    title: "Flexible Sizes",
    text: "Common unit sizes for boxes, furniture, business inventory, and moves.",
    icon: Ruler,
  },
  {
    title: "Business Storage",
    text: "Practical overflow storage for supplies, records, and local business needs.",
    icon: Bank,
  },
  {
    title: "Vehicle Storage",
    text: "Vehicle availability must be confirmed on the rental page or by phone.",
    icon: Van,
  },
];

export function StorageBenefits() {
  return (
    <section className="bg-white py-16">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="text-3xl font-black text-brand-950 sm:text-4xl">
            Why Store With Us?
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Experience a clean online rental path, practical storage information,
            and local support when you need help choosing a unit.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-brand-500 hover:bg-brand-600">
              <TrackedAnchor
                href="/#rental-app"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "benefits" }}
              >
                View Facility
              </TrackedAnchor>
            </Button>
            <Button asChild variant="outline">
              <TrackedAnchor href="/#faq" eventName={siteConfig.events.clickViewUnits}>
                Learn More
              </TrackedAnchor>
            </Button>
          </div>
        </div>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="motion-card motion-wiggle flex gap-4 rounded-lg p-2" key={benefit.title}>
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-slate-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {benefit.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
