import Image from "next/image";
import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { siteConfig } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white">
      <Image
        src={siteConfig.images.hero}
        alt="Storage facility call to action background placeholder"
        fill
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent" />
      <div className="section-shell relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black uppercase leading-tight sm:text-5xl">
            Ready to take back your space?
          </h2>
          <p className="mt-5 leading-7 text-white/85">
            Your clutter-free life is just one click away. Start online or call
            for help choosing the right storage size.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-white text-brand-700 hover:bg-white/90">
              <TrackedAnchor
                href="/contact"
                eventName={siteConfig.events.clickViewUnits}
                eventParams={{ location: "image_cta" }}
              >
                Message Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedAnchor>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <TrackedAnchor
                href={siteConfig.phoneHref}
                eventName={siteConfig.events.clickCallNow}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contact Us
              </TrackedAnchor>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
