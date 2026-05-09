import { faqs, siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

type Props = {
  includeFaq?: boolean;
};

export function SEOJsonLd({ includeFaq = false }: Props) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    image: absoluteUrl(siteConfig.images.hero),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {includeFaq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
    </>
  );
}
