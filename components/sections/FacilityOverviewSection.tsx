import Image from "next/image";
import {
  Clock,
  MapPin,
  NavigationArrow,
  Phone,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/AnalyticsEvents";
import { getGoogleReviewsData } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site-config";

const gallery = siteConfig.images.facilityGallery;

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

export async function FacilityOverviewSection() {
  const googleReviews = await getGoogleReviewsData();
  const hasGoogleRating =
    googleReviews.status === "ready" && googleReviews.averageRating !== null;
  const averageRating = googleReviews.averageRating;

  return (
    <section className="-mt-14 scroll-mt-28 bg-brand-50 pb-12" id="facility-overview">
      <div className="section-shell relative">
        <div className="grid gap-7 rounded-2xl border bg-white p-4 shadow-soft lg:grid-cols-[1fr_1.1fr] lg:p-5">
          <div className="grid gap-3">
            <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-slate-200">
              <Image
                src={gallery[0]}
                alt="Pack-It-Up Self Storage facility with red drive-up unit doors"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((image, index) => (
                <div
                  className="relative min-h-[92px] overflow-hidden rounded-lg bg-slate-200"
                  key={image}
                >
                  <Image
                    src={image}
                    alt={`Pack-It-Up facility gallery view ${index + 1}`}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 lg:p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-brand-500">
              {hasGoogleRating && averageRating !== null ? (
                <>
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${averageRating.toFixed(1)} out of 5 stars on Google`}
                  >
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-slate-500">
                    {averageRating.toFixed(1)} on Google from{" "}
                    {googleReviews.reviewCount ?? googleReviews.reviews.length} reviews
                  </span>
                </>
              ) : (
                <span className="text-slate-500">Google reviews are loading</span>
              )}
            </div>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Self Storage Facility in Kings Mountain Area
            </h2>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <p className="flex gap-2">
                <MapPin className="h-4 w-4 flex-none text-brand-500" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.region} {siteConfig.address.postalCode}
                </span>
              </p>
              <p className="flex gap-2">
                <Phone className="h-4 w-4 flex-none text-brand-500" />
                <TrackedAnchor
                  href={siteConfig.phoneHref}
                  eventName={siteConfig.events.clickCallNow}
                  className="font-bold hover:text-brand-600"
                >
                  {siteConfig.phone}
                </TrackedAnchor>
              </p>
              <p className="flex gap-2">
                <Clock className="h-4 w-4 flex-none text-brand-500" />
                <span>Office hours: {siteConfig.hours}</span>
              </p>
              <p className="flex gap-2">
                <ShieldCheck className="h-4 w-4 flex-none text-brand-500" />
                <span>Access: {siteConfig.accessHours}</span>
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {siteConfig.amenities.map((amenity) => (
                <div
                  className="flex items-center gap-2 text-sm font-semibold"
                  key={amenity}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                  {amenity}
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                asChild
                variant="outline"
                className="border-slate-200 bg-transparent text-slate-900 hover:bg-slate-50"
              >
                <TrackedAnchor
                  href={siteConfig.directionsUrl}
                  eventName={siteConfig.events.clickDirections}
                  target="_blank"
                  rel="noreferrer"
                >
                  <NavigationArrow className="h-4 w-4" aria-hidden="true" />
                  View Map Location
                </TrackedAnchor>
              </Button>
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                <TrackedAnchor
                  href="/#rental-app"
                  eventName={siteConfig.events.clickViewUnits}
                  eventParams={{ location: "facility_overview_size_guide" }}
                >
                  View Unit Sizes
                </TrackedAnchor>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
