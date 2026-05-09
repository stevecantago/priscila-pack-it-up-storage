"use client";

import { siteConfig } from "@/lib/site-config";

type AnalyticsEvent = (typeof siteConfig.events)[keyof typeof siteConfig.events];

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, params);
}
