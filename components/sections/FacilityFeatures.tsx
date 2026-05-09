import Image from "next/image";
import { Camera, DoorOpen, ShieldCheck, Truck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const features = [
  { title: "Secure facility access", icon: ShieldCheck },
  { title: "Drive-up storage options", icon: DoorOpen },
  { title: "Moving and household storage", icon: Truck },
  { title: "Facility-focused support", icon: Camera },
];

export function FacilityFeatures() {
  return (
    <section className="section-y bg-brand-950 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-slate-800">
          <Image
            src={siteConfig.images.securityGate}
            alt="Security gate placeholder at Pack-It-Up Self Storage"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-black sm:text-4xl">
            Facility features customers expect
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Use this section for confirmed facility details, access notes, and
            local convenience messaging once the final property information is
            available.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                  key={feature.title}
                >
                  <Icon className="h-5 w-5 text-brand-100" aria-hidden="true" />
                  <span className="font-semibold">{feature.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
