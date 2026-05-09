"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function HomepageViewEvent() {
  useEffect(() => {
    trackEvent(siteConfig.events.viewHomepage);
  }, []);

  return null;
}

export function TrackedAnchor({
  eventName,
  eventParams,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: (typeof siteConfig.events)[keyof typeof siteConfig.events];
  eventParams?: Record<string, unknown>;
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        trackEvent(eventName, eventParams);
      }}
    />
  );
}
