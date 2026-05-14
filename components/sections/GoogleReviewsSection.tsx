import {
  ArrowSquareOut,
  Quotes,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { getGoogleReviewsData } from "@/lib/google-reviews";

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

export async function GoogleReviewsSection() {
  const data = await getGoogleReviewsData();
  const hasReviews = data.status === "ready" && data.reviews.length > 0;

  return (
    <section className="bg-brand-50 py-20">
      <div className="section-shell">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-600 shadow-sm ring-1 ring-brand-100">
            Google Reviews
          </p>
          <h2 className="mt-4 text-3xl font-black text-brand-950 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Live Google reviews help visitors see recent feedback about the
            facility, move-in experience, and local support.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-2xl bg-brand-950 p-6 text-white shadow-soft sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-100">
              {data.status === "ready" ? "Live Google data" : "Google reviews"}
            </p>
            <h3 className="mt-3 text-3xl font-black">{data.placeName}</h3>

            {data.status === "ready" && data.averageRating !== null ? (
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black leading-none">
                    {data.averageRating.toFixed(1)}
                  </span>
                  <div>
                    <div className="flex items-center gap-1">
                      {renderStars(data.averageRating)}
                    </div>
                    <p className="mt-2 text-sm text-white/75">
                      Based on {data.reviewCount ?? data.reviews.length} Google reviews
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-6 max-w-md leading-7 text-white/80">
                {data.message}
              </p>
            )}

            <div className="mt-8 rounded-xl bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-100">
                Source
              </p>
              <p className="mt-2 text-sm leading-7 text-white/80">
                Reviews are pulled from Google Places and displayed with the
                latest available excerpt data.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-white text-brand-950 hover:bg-white/90">
                <a href={data.sourceUrl} target="_blank" rel="noreferrer">
                  <ArrowSquareOut className="h-4 w-4" aria-hidden="true" />
                  View on Google
                </a>
              </Button>
            </div>
          </article>

          {hasReviews ? (
            <div className="grid gap-5 md:grid-cols-2">
              {data.reviews.map((review) => (
                <article
                  className="motion-card motion-wiggle rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  key={`${review.authorName}-${review.relativeTimeDescription}`}
                >
                  <Quotes className="h-8 w-8 text-brand-500" aria-hidden="true" />
                  <div className="mt-4 flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {review.text}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        {review.authorName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {review.relativeTimeDescription}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      Google
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-600">
                    Review feed unavailable
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-slate-950">
                    Google reviews will appear here once configured
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                    The section is ready for live Google Places data. Add the
                    place ID and API key, and the latest review excerpts will
                    populate this area automatically.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-brand-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                      Config needed
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Set `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY` in the
                      deployment environment.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                      Fallback link
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Visitors can still open the facility location on Google
                      Maps while review data is being configured.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
