import type { Metadata } from "next";
import { MarkdownContent } from "@/components/legal/MarkdownContent";
import { privacyPolicyContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | Pack-It-Up Self Storage",
  description:
    "Privacy policy for Pack-It-Up Self Storage website visitors and online rental customers.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="section-shell max-w-3xl">
        <MarkdownContent content={privacyPolicyContent} />
      </div>
    </section>
  );
}
