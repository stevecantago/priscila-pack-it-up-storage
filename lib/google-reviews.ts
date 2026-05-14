import { siteConfig } from "@/lib/site-config";
import { unstable_noStore as noStore } from "next/cache";

type GoogleReview = {
  authorName: string;
  relativeTimeDescription: string;
  rating: number;
  text: string;
};

type GooglePlaceDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      author_name?: string;
      relative_time_description?: string;
      rating?: number;
      text?: string;
    }>;
    url?: string;
  };
};

export type GoogleReviewsData = {
  status: "ready" | "missing-config" | "unavailable";
  placeName: string;
  averageRating: number | null;
  reviewCount: number | null;
  reviews: GoogleReview[];
  sourceUrl: string;
  message?: string;
};

const GOOGLE_PLACE_DETAILS_ENDPOINT =
  "https://maps.googleapis.com/maps/api/place/details/json";

function buildFallbackData(message: string): GoogleReviewsData {
  return {
    status: "missing-config",
    placeName: siteConfig.name,
    averageRating: null,
    reviewCount: null,
    reviews: [],
    sourceUrl: siteConfig.directionsUrl,
    message,
  };
}

export async function getGoogleReviewsData(): Promise<GoogleReviewsData> {
  noStore();

  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    return buildFallbackData(
      "Google review data will appear here once the Google Places API key and place ID are configured.",
    );
  }

  const endpoint = new URL(GOOGLE_PLACE_DETAILS_ENDPOINT);
  endpoint.searchParams.set("place_id", placeId);
  endpoint.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  endpoint.searchParams.set("reviews_sort", "newest");
  endpoint.searchParams.set("key", apiKey);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(endpoint.toString(), {
      next: {
        revalidate: 60 * 60 * 24,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Google Places request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as GooglePlaceDetailsResponse;

    if (payload.status !== "OK" || !payload.result) {
      throw new Error(
        payload.error_message || `Google Places returned ${payload.status || "an error"}`,
      );
    }

    const reviews = (payload.result.reviews || [])
      .slice(0, 3)
      .map((review) => ({
        authorName: review.author_name?.trim() || "Google reviewer",
        relativeTimeDescription:
          review.relative_time_description?.trim() || "Recently",
        rating: typeof review.rating === "number" ? review.rating : 0,
        text: review.text?.trim() || "This review did not include written feedback.",
      }));

    return {
      status: "ready",
      placeName: payload.result.name?.trim() || siteConfig.name,
      averageRating:
        typeof payload.result.rating === "number" ? payload.result.rating : null,
      reviewCount:
        typeof payload.result.user_ratings_total === "number"
          ? payload.result.user_ratings_total
          : null,
      reviews,
      sourceUrl: payload.result.url || siteConfig.directionsUrl,
    };
  } catch (error) {
    console.error("Failed to load Google reviews", error);
    return {
      status: "unavailable",
      placeName: siteConfig.name,
      averageRating: null,
      reviewCount: null,
      reviews: [],
      sourceUrl: siteConfig.directionsUrl,
      message:
        "Google reviews are temporarily unavailable. Please check back soon or view the facility on Google Maps.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
