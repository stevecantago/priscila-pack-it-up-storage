import { Clock, Key, MapPin, Ruler } from "@phosphor-icons/react/dist/ssr";

const items = [
  { label: "Online rentals available 24/7", icon: Clock },
  { label: "Secure facility access", icon: Key },
  { label: "Flexible storage sizes", icon: Ruler },
  { label: "Local self-storage facility", icon: MapPin },
];

export function TrustBar() {
  return (
    <section className="border-y bg-brand-950 text-white">
      <div className="section-shell grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className="flex items-center gap-3" key={item.label}>
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-500">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
