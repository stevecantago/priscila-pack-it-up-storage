import { StorableRentalApp } from "@/components/storable/StorableRentalApp";

export function StorableRentalSection() {
  return (
    <section className="scroll-mt-28 bg-brand-50 pb-20" id="rental-app">
      <div className="section-shell">
        <div className="rounded-2xl border bg-white p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="mb-6">
            <p className="mb-3 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600">
              Secure move-in powered by Storable
            </p>
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Move in online
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Use the Storable rental app to view current availability and
              complete the move-in workflow. Payments, lease signing, insurance,
              tenant setup, and facility updates are handled inside Storable.
            </p>
          </div>
          <StorableRentalApp />
        </div>
      </div>
    </section>
  );
}
