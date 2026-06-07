import Icon from "../components/Icon";
import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import { services, faqs } from "../lib/content";

export const metadata = {
  title: "Services — Aarav Wealth",
  description:
    "Wealth management, insurance, tax and estate planning — one integrated strategy.",
};

const process = [
  {
    step: "01",
    title: "Discovery",
    body: "We listen first — understanding your goals, family, income and risk appetite.",
  },
  {
    step: "02",
    title: "Strategy",
    body: "We design a research-backed plan across investments, protection and tax.",
  },
  {
    step: "03",
    title: "Implementation",
    body: "We put the plan to work with the right products and structures.",
  },
  {
    step: "04",
    title: "Active review",
    body: "We monitor, rebalance and keep you informed as markets and life change.",
  },
];

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Everything your wealth needs"
        subtitle="Four integrated pillars working together so nothing about your financial life is left to chance."
      />

      {/* Detailed services */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.slug}
              id={s.slug}
              className="rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name={s.icon} />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-navy-900">
                  {s.title}
                </h2>
              </div>
              <p className="mt-4 text-navy-700/85 leading-relaxed">
                {s.summary}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-navy-800"
                  >
                    <Icon name="check" className="h-4 w-4 text-gold-600" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy-900 text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              How we work
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              A simple, transparent process
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.step}
                className="rounded-2xl border border-white/10 bg-navy-800/60 p-6"
              >
                <span className="font-serif text-3xl font-bold text-gold-400">
                  {p.step}
                </span>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
            FAQ
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-navy-900/10 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-navy-900">
                {f.q}
                <span className="ml-4 text-gold-600 transition-transform group-open:rotate-45">
                  <Icon name="arrow" className="h-5 w-5 rotate-90" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/85">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
