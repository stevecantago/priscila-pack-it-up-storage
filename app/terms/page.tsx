import type { Metadata } from "next";
import { MarkdownContent } from "@/components/legal/MarkdownContent";
import { termsContent } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms | Pack-It-Up Self Storage",
  description:
    "Website terms and conditions for Pack-It-Up Self Storage visitors and online rental customers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="section-shell max-w-3xl">
        <MarkdownContent content={termsContent} />
      </div>
    </section>
  );
}
