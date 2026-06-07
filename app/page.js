import Link from "next/link";
import Icon from "./components/Icon";
import { stats, services, values, team, posts } from "./lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-navy-600/40 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300">
              Truthful progress, real wealth
            </span>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Clarity in every <span className="text-gold-400">financial</span>{" "}
              decision.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              Personalized, research-backed wealth management that puts your
              goals first. We help you build, protect, and pass on wealth with
              discipline — never speculation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Book a Free Consultation
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="animate-fade-up rounded-2xl border border-white/10 bg-navy-800/60 p-8 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              Our philosophy
            </p>
            <p className="mt-4 font-serif text-2xl leading-snug text-cream">
              “Investing is more about temperament than timing.”
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.slice(0, 4).map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl font-bold text-gold-400">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-cream/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
            What we do
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            A complete plan for your wealth
          </h2>
          <p className="mt-4 text-navy-700/80">
            Four pillars, one integrated strategy built around your life and
            your goals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.slug}
              className="group rounded-2xl border border-navy-900/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                <Icon name={s.icon} />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
                {s.summary}
              </p>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
              >
                Learn more <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Values band */}
      <section className="bg-navy-900 text-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                Why Aarav
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Advice you can actually trust
              </h2>
              <p className="mt-4 max-w-lg text-cream/80">
                We don't chase markets or hit sales quotas. We manage risk,
                stay disciplined, and keep you informed at every step.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                More about us <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl border border-white/10 bg-navy-800/60 p-6"
                >
                  <Icon name="check" className="h-6 w-6 text-gold-400" />
                  <h3 className="mt-3 font-semibold text-cream">{v.title}</h3>
                  <p className="mt-2 text-sm text-cream/70">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
            The people
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Experienced advisors in your corner
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Insights preview */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-24">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">
                Insights
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
                From our desk
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
            >
              View all <Icon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href="/blog"
                className="group rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 text-xs text-navy-700/70">
                  <span className="rounded-full bg-navy-900/5 px-3 py-1 font-semibold text-navy-900">
                    {p.category}
                  </span>
                  <span>{p.read}</span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-navy-900 group-hover:text-gold-600">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-navy-700/80">{p.excerpt}</p>
                <p className="mt-4 text-xs text-navy-700/60">{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="bg-navy-950">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
        <h2 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">
          Ready to take control of your financial future?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/70">
          Book a free, no-obligation consultation. We'll listen first, then
          design a plan that fits your life.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          Book a Free Consultation <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
