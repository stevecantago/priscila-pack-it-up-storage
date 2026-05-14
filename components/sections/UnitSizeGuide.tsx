import { unitSizes } from "@/lib/site-config";

type Props = {
  compact?: boolean;
};

const fitExamples = {
  "5x5": "Closet overflow, boxes, seasonal decor",
  "5x10": "Studio furniture, small appliances, inventory",
  "10x10": "One-bedroom furniture and household boxes",
  "10x15": "Large apartment contents and bulky furniture",
  "10x20": "Multi-room moves, large furniture sets, equipment",
} as const;

export function UnitSizeGuide({ compact = false }: Props) {
  const visibleSizes = compact ? unitSizes.slice(0, 3) : unitSizes;

  return (
    <section className="scroll-mt-28 bg-white py-16 sm:py-20" id="unit-sizes">
      <div className="section-shell">
        <div className="motion-page-load max-w-2xl">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Storage options at Pack-It-Up
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These are general storage examples only. Actual fit depends on how
            much furniture, boxes, and walkthrough space you need.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-600">
                    Unit Size
                  </th>
                  <th className="px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-600">
                    Typical Fit
                  </th>
                  <th className="px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-600">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visibleSizes.map((unit) => (
                  <tr key={unit.size} className="align-top">
                    <td className="px-5 py-4">
                      <div className="text-base font-black text-slate-950">
                        {unit.size}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {unit.title}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm leading-7 text-slate-700">
                      {fitExamples[unit.size as keyof typeof fitExamples]}
                    </td>
                    <td className="px-5 py-4 text-sm leading-7 text-slate-600">
                      {unit.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
