import Icon from "../components/Icon";
import { CtaBand } from "../page";
import { stats, values, team } from "../lib/content";

export const metadata = {
  title: "About — Aarav Wealth",
  description:
    "Learn about Aarav Wealth's philosophy, values and the team behind your financial plan.",
};

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Built on truthful progress"
        subtitle="We exist to help families make confident financial decisions — grounded in research, discipline, and complete transparency."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-navy-900">
              Our story
            </h2>
            <div className="mt-5 space-y-4 text-navy-700/85 leading-relaxed">
              <p>
                Aarav Wealth was founded on a simple conviction: that good
                financial advice should be honest, patient, and free of hidden
                agendas. Too often, investors are sold products instead of
                being served plans.
              </p>
              <p>
                We do things differently. We start by understanding your goals,
                your risk appetite, and your timeline. Only then do we build a
                strategy — one we monitor actively and adjust as your life
                changes.
              </p>
              <p>
                We don't offer intraday calls, speculative tips, or crypto
                guidance. We focus on long-term wealth preservation and growth,
                because that's what actually compounds.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy-900/10 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-serif text-3xl font-bold text-gold-600">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-navy-700/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy-900 text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              What we stand for
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Principles that guide every decision
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-navy-800/60 p-6"
              >
                <Icon name="star" className="h-6 w-6 text-gold-400" />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
            Leadership
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Meet the team
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-navy-900/10 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy-900 font-serif text-2xl font-semibold text-gold-400">
                {m.initials}
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-navy-900">
                {m.name}
              </h3>
              <p className="text-sm font-medium text-gold-600">{m.role}</p>
              <p className="mt-3 text-sm text-navy-700/80">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-cream">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/80">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
