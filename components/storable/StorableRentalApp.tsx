"use client";

import Script from "next/script";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

function maskValue(value: string | undefined) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 8) {
    return `${value.slice(0, 2)}***`;
  }

  return `${value.slice(0, 4)}***${value.slice(-4)}`;
}

export function StorableRentalApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptError, setScriptError] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState("unknown");

  const config = useMemo(
    () => ({
      envUrl:
        process.env.NEXT_PUBLIC_STORABLE_ENV_URL ||
        "https://webapps.storable.io",
      providerId: process.env.NEXT_PUBLIC_STORABLE_PROVIDER_ID,
      organizationId: process.env.NEXT_PUBLIC_STORABLE_ORGANIZATION_ID,
      facilityId: process.env.NEXT_PUBLIC_STORABLE_FACILITY_ID,
      source: process.env.NEXT_PUBLIC_STORABLE_SOURCE || "website",
      accessKey: process.env.NEXT_PUBLIC_STORABLE_ACCESS_KEY,
    }),
    [],
  );
  const scriptSrc = `${config.envUrl.replace(/\/$/, "")}/rental-app/rental-app.js`;
  const isDevelopment = process.env.NODE_ENV !== "production";

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

  useEffect(() => {
    setCurrentOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!isDevelopment) {
      return;
    }

    const logRentalAppIssue = (label: string, detail: unknown) => {
      console.info(`[StorableRentalApp] ${label}`, {
        currentOrigin,
        scriptSrc,
        envUrl: config.envUrl,
        providerId: maskValue(config.providerId),
        organizationId: maskValue(config.organizationId),
        facilityId: maskValue(config.facilityId),
        accessKey: maskValue(config.accessKey),
        detail,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        reason instanceof Error ? reason.message : String(reason || "");

      if (/storable|axios|403|rental-app/i.test(message)) {
        logRentalAppIssue("unhandledrejection", reason);
      }
    };

    const onError = (event: ErrorEvent) => {
      const message = event.message || "";
      const filename = event.filename || "";

      if (/storable|rental-app|axios|403/i.test(`${message} ${filename}`)) {
        logRentalAppIssue("window.error", {
          message,
          filename,
          lineno: event.lineno,
          colno: event.colno,
        });
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError);
    };
  }, [
    config.accessKey,
    config.envUrl,
    config.facilityId,
    config.organizationId,
    config.providerId,
    currentOrigin,
    isDevelopment,
    scriptSrc,
  ]);

  if (missingValues.length > 0) {
    return (
      <div className="rounded-lg border border-brand-100 bg-brand-50 p-6">
        <div className="flex gap-3">
          <WarningCircle className="mt-1 h-5 w-5 flex-none text-brand-600" />
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
        src={scriptSrc}
        strategy="afterInteractive"
        onLoad={() => {
          if (isDevelopment) {
            console.info("[StorableRentalApp] rental-app.js loaded", {
              scriptSrc,
              currentOrigin,
            });
          }
        }}
        onError={() => setScriptError(true)}
      />
      {scriptError ? (
        <>
          <div className="mb-4 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
            The rental app script could not be loaded. Please call the facility
            for rental help.
          </div>
          {isDevelopment ? (
            <div className="mb-4 rounded-lg border border-dashed border-brand-200 bg-white p-4 text-sm leading-6 text-slate-700">
              <p className="font-semibold text-slate-950">
                Debug details for local testing
              </p>
              <p className="mt-2">
                Script URL: <span className="break-all">{scriptSrc}</span>
              </p>
              <p className="mt-2">
                If Chrome shows a CORS error, Storable likely needs to allow the
                current site origin for this script or the production embed
                domain is not whitelisted.
              </p>
            </div>
          ) : null}
        </>
      ) : null}
      {createElement("rental-app", {
        "data-provider-id": config.providerId,
        "data-organization-id": config.organizationId,
        "data-facility-id": config.facilityId,
        "data-source": config.source,
        "data-access-key": config.accessKey,
      })}
      {isDevelopment ? (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs leading-6 text-slate-700">
          <p className="font-semibold text-slate-950">Storable env debug</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <p>
              Site origin: <span className="font-medium">{currentOrigin}</span>
            </p>
            <p>
              Script URL: <span className="break-all font-medium">{scriptSrc}</span>
            </p>
            <p>
              Storable env URL:{" "}
              <span className="break-all font-medium">{config.envUrl}</span>
            </p>
            <p>
              Provider ID: <span className="font-medium">{maskValue(config.providerId)}</span>
            </p>
            <p>
              Organization ID:{" "}
              <span className="font-medium">{maskValue(config.organizationId)}</span>
            </p>
            <p>
              Facility ID: <span className="font-medium">{maskValue(config.facilityId)}</span>
            </p>
            <p>
              Access key: <span className="font-medium">{maskValue(config.accessKey)}</span>
            </p>
            <p>
              Missing values:{" "}
              <span className="font-medium">
                {missingValues.length > 0 ? missingValues.map(([label]) => label).join(", ") : "none"}
              </span>
            </p>
          </div>
          <p className="mt-3 text-slate-600">
            Production deployments must match the Storable allowlist for the
            exact site origin.
          </p>
        </div>
      ) : null}
    </div>
  );
}
