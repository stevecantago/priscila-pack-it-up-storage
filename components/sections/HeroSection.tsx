import Image from "next/image";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-brand-950">
      <Image
        src={siteConfig.images.hero}
        alt="Pack-It-Up Self Storage facility exterior placeholder"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      <div className="section-shell relative flex min-h-[620px] items-center py-16">
        <div className="max-w-3xl">
          <h1 className="text-balance text-4xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Secure, <span className="text-brand-600">Affordable Storage</span>{" "}
            in Your Area
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
              <TrackedAnchor
                href="/#unit-sizes"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "hero" }}
              >
                View Facility Details
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </TrackedAnchor>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-500 text-brand-600 hover:bg-brand-50"
            >
              <TrackedAnchor
                href={siteConfig.phoneHref}
                eventName={siteConfig.events.clickCallNow}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call for Help
              </TrackedAnchor>
            </Button>
          </div>
          <p className="mt-8 max-w-2xl text-base font-medium leading-7 text-slate-800">
            Clean units, secure access placeholders, and online rentals through
            Storable. Choose your unit and complete the rental process without
            waiting for office hours.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-brand-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                className="h-4 w-4 fill-current"
                aria-hidden="true"
                key={index}
              />
            ))}
            <span className="ml-1 text-slate-800">
              Review highlights coming soon.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
