import Image from "next/image";
import { ArrowRight, Phone, Star } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { getGoogleReviewsData } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site-config";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const isFilled = index < Math.round(rating);

    return (
      <Star
        className={isFilled ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-amber-200"}
        weight={isFilled ? "fill" : "regular"}
        aria-hidden="true"
        key={index}
      />
    );
  });
}

export async function HeroSection() {
  const googleReviews = await getGoogleReviewsData();
  const hasGoogleRating =
    googleReviews.status === "ready" && googleReviews.averageRating !== null;
  const averageRating = googleReviews.averageRating;

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-brand-950">
      <Image
        src={siteConfig.images.hero}
        alt="Aerial rendering of Pack-It-Up Self Storage with red storage unit doors"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
      <div className="section-shell relative flex min-h-[620px] items-center py-16">
        <div className="motion-page-load max-w-3xl">
          <h1 className="text-balance text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Secure, <span className="text-brand-100">Affordable Storage</span>{" "}
            in Your Area
          </h1>
          <div className="motion-page-load motion-delay-1 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
              <TrackedAnchor
                href="/#rental-app"
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
              className="border-white/80 bg-white/10 text-white hover:bg-white hover:text-brand-800"
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
          <p className="motion-page-load motion-delay-2 mt-8 max-w-2xl text-base font-medium leading-7 text-brand-50">
            Clean units, secure access placeholders, and online rentals through
            Storable. Choose your unit and complete the rental process without
            waiting for office hours.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-brand-100">
            {hasGoogleRating && averageRating !== null ? (
              <>
                <div className="flex items-center gap-1" aria-label={`${averageRating.toFixed(1)} out of 5 stars on Google`}>
                  {renderStars(averageRating)}
                </div>
                <span className="ml-1 text-white">
                  {averageRating.toFixed(1)} on Google from{" "}
                  {googleReviews.reviewCount ?? googleReviews.reviews.length} reviews
                </span>
              </>
            ) : (
              <span className="text-white/90">
                Google reviews are loading.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
