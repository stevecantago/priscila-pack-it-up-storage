import type { Metadata } from "next";
import { ContactCardsSection } from "@/components/sections/ContactCardsSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Pack-It-Up Self Storage",
  description:
    "Contact Pack-It-Up Self Storage for help choosing a unit, renting online, or getting directions to the facility.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="section-shell max-w-4xl">
          <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Contact Pack-It-Up Self Storage
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Have a question about unit sizes, online rentals, or facility access?
            Send a message or call for help.
          </p>
        </div>
      </section>
      <ContactCardsSection />
    </>
  );
}
