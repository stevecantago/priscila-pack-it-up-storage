import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { UnitSizeGuide } from "@/components/sections/UnitSizeGuide";
import { siteConfig } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Storage Unit Size Guide | Pack-It-Up Self Storage",
  description:
    "Compare common storage unit sizes including 5x5, 5x10, 10x10, 10x15, and 10x20.",
  path: "/storage-unit-sizes",
});

export default function StorageUnitSizesPage() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Storage unit size guide
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Compare common storage sizes before starting your online rental.
              The examples below are general guidelines, and availability may
              vary by facility.
            </p>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-slate-200">
            <Image
              src={siteConfig.images.boxes}
              alt="Packing boxes placeholder for storage size planning"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <UnitSizeGuide />
      <ContactCTA />
    </>
  );
}
