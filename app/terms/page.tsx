import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms | Pack-It-Up Self Storage",
  description:
    "Terms placeholder for Pack-It-Up Self Storage website visitors.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="bg-white py-14">
      <div className="section-shell max-w-3xl">
        <h1 className="text-4xl font-black text-slate-950">Terms</h1>
        <div className="mt-6 space-y-5 leading-8 text-slate-600">
          <p>
            These placeholder terms should be reviewed and replaced with final
            legal copy before production launch.
          </p>
          <p>
            Website content is provided for general storage information. Unit
            availability, rental pricing, payments, lease terms, insurance, and
            move-in steps are controlled by the Storable rental workflow and
            facility policies.
          </p>
          <p>
            Customers should review all rental terms shown during the secure
            rental process before completing a reservation or move-in.
          </p>
        </div>
      </div>
    </section>
  );
}
