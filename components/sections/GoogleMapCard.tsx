import { siteConfig } from "@/lib/site-config";

type GoogleMapCardProps = {
  className?: string;
};

export function GoogleMapCard({ className = "" }: GoogleMapCardProps) {
  return (
    <div
      className={`relative min-h-[260px] overflow-hidden rounded-xl border bg-white shadow-sm ${className}`}
    >
      <iframe
        src={siteConfig.mapEmbedUrl}
        title="Google map for Pack-It-Up Self Storage"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
      />
      <a
        href={siteConfig.directionsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Pack-It-Up Self Storage in Google Maps"
        className="absolute inset-0"
      />
    </div>
  );
}
