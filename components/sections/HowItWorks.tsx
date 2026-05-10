import {
  Key,
  MouseLeftClick,
  Truck,
} from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    title: "Select Your Unit",
    text: "Browse unit sizes and start the online rental flow from the storage units page.",
    icon: MouseLeftClick,
  },
  {
    title: "Complete Storable Move-In",
    text: "Storable handles payment, lease steps, tenant setup, and rental confirmation.",
    icon: Key,
  },
  {
    title: "Move In",
    text: "Use the confirmation and access details provided after the rental process.",
    icon: Truck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-50 py-20">
      <div className="section-shell">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Find Storage and Move In With Help
          </h2>
          <p className="mt-3 text-slate-600">
            Review the facility details, choose a likely size, and contact the
            team for current availability.
          </p>
        </div>
        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[18%] right-[18%] top-12 hidden border-t border-dashed border-slate-300 md:block" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="motion-card motion-wiggle relative rounded-lg p-3 text-center" key={step.title}>
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-brand-500 shadow-sm ring-8 ring-brand-50">
                  <Icon className="h-11 w-11" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-black text-brand-950">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
