"use client";

import Script from "next/script";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function StorableRentalApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptError, setScriptError] = useState(false);

  const config = useMemo(
    () => ({
      envUrl:
        process.env.NEXT_PUBLIC_STORABLE_ENV_URL ||
        "/rental-app/rental-app.js",
      providerId: process.env.NEXT_PUBLIC_STORABLE_PROVIDER_ID,
      organizationId: process.env.NEXT_PUBLIC_STORABLE_ORGANIZATION_ID,
      facilityId: process.env.NEXT_PUBLIC_STORABLE_FACILITY_ID,
      source: process.env.NEXT_PUBLIC_STORABLE_SOURCE || "website",
      accessKey: process.env.NEXT_PUBLIC_STORABLE_ACCESS_KEY,
    }),
    [],
  );

  const missingValues = [
    ["provider ID", config.providerId],
    ["organization ID", config.organizationId],
    ["facility ID", config.facilityId],
    ["access key", config.accessKey],
  ].filter(([, value]) => !value);

  useEffect(() => {
    if (!containerRef.current || missingValues.length > 0) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent(siteConfig.events.viewRentalAppSection);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [missingValues.length]);

  if (missingValues.length > 0) {
    return (
      <div className="rounded-lg border border-brand-100 bg-brand-50 p-6">
        <div className="flex gap-3">
          <AlertCircle className="mt-1 h-5 w-5 flex-none text-brand-600" />
          <div>
            <h2 className="font-bold text-slate-950">
              Storable rental app configuration needed
            </h2>
            <p className="mt-2 leading-7 text-slate-700">
              Add the missing public Storable values before launch:{" "}
              {missingValues.map(([label]) => label).join(", ")}.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Confirm with Storable that the embed access key is intended for
              public browser usage and whether allowed-origin controls are
              available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <Script
        src={`${config.envUrl.replace(/\/$/, "")}/rental-app/rental-app.js`}
        type="module"
        strategy="afterInteractive"
        onError={() => setScriptError(true)}
      />
      {scriptError ? (
        <div className="mb-4 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
          The rental app script could not be loaded. Please call the facility for
          rental help.
        </div>
      ) : null}
      {createElement("rental-app", {
        "data-provider-id": config.providerId,
        "data-organization-id": config.organizationId,
        "data-facility-id": config.facilityId,
        "data-source": config.source,
        "data-access-key": config.accessKey,
      })}
    </div>
  );
}
