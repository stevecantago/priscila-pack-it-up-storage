import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | Pack-It-Up Self Storage",
  description:
    "Privacy policy placeholder for Pack-It-Up Self Storage website visitors.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-14">
      <div className="section-shell max-w-3xl">
        <h1 className="text-4xl font-black text-slate-950">Privacy Policy</h1>
        <div className="mt-6 space-y-5 leading-8 text-slate-600">
          <p>
            This placeholder privacy policy should be reviewed and replaced with
            final legal copy before production launch.
          </p>
          <p>
            The website may collect contact form submissions, analytics events,
            and basic interaction data. The embedded Storable rental app is
            responsible for its own rental workflow data collection and should be
            covered by the applicable Storable and facility privacy terms.
          </p>
          <p>
            Contact information submitted through the website should be used only
            to respond to storage inquiries unless the final policy states
            otherwise.
          </p>
        </div>
      </div>
    </section>
  );
}
