import { MessageSquareQuote } from "lucide-react";

const cards = [
  {
    title: "Local review highlights",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
  {
    title: "Move-in experience notes",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  {
    title: "Facility feedback",
    avatar: "https://i.pravatar.cc/96?img=33",
  },
  {
    title: "Customer service comments",
    avatar: "https://i.pravatar.cc/96?img=56",
  },
  {
    title: "Storage size feedback",
    avatar: "https://i.pravatar.cc/96?img=8",
  },
  {
    title: "Online rental feedback",
    avatar: "https://i.pravatar.cc/96?img=24",
  },
];

export function TestimonialsPlaceholder() {
  return (
    <section className="bg-brand-50 py-20">
      <div className="section-shell">
        <div className="text-center">
          <h2 className="text-3xl font-black text-brand-950 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Verified review excerpts can be added here after launch. This
            section is structured for trust content without inventing customer
            claims.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article className="rounded-xl bg-white p-6 shadow-sm" key={card.title}>
              <MessageSquareQuote
                className="h-8 w-8 text-brand-500"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-lg font-black text-slate-950">
                {card.title}
              </h3>
              <p className="mt-3 min-h-24 text-sm font-medium leading-7 text-slate-600">
                Future verified testimonial content should include the review
                source, customer-approved excerpt, and role or location only when
                permitted.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={card.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full bg-slate-200 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Review placeholder
                  </p>
                  <p className="text-xs text-slate-500">Awaiting final copy</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
