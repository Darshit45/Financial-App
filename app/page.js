import Link from "next/link";
import Icon from "./components/Icon";
import AnimatedBackground from "./components/AnimatedBackground";
import HeroBackground from "./components/HeroBackground";
import GrowthBackground from "./components/GrowthBackground";
import { stats, services, values, team } from "./lib/content";

export default function Home() {
  return (
    <>
      {/* Hero — animation with just the tagline */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-navy-900 text-cream">
        <HeroBackground />
        <div className="animate-fade-up relative px-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cream/80">
            Dhanvega
          </p>
          <p className="mt-4 font-serif text-3xl italic leading-tight text-gold-300 sm:text-5xl lg:text-6xl">
            With You, For Every Tomorrow
          </p>
          <div className="mt-12 flex justify-center">
            <Icon
              name="arrow"
              className="h-6 w-6 rotate-90 animate-bounce text-gold-300/70"
            />
          </div>
        </div>
      </section>

      {/* Intro — headline, promise & CTAs */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:py-24">
          <span className="inline-block rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600">
            Accelerating financial growth
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-navy-900 sm:text-5xl">
            Clarity in every <span className="text-gold-600">financial</span>{" "}
            decision.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-700/80">
            Personalized, research-backed wealth management that puts your goals
            first. We help you build, protect, and pass on wealth with
            discipline — never speculation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Book a Free Consultation
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-navy-900/20 px-7 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-navy-900/5"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy & stats */}
      <section className="relative overflow-hidden bg-navy-900 text-cream">
        <AnimatedBackground particles={false} />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
            Our philosophy
          </p>
          <blockquote className="mx-auto mt-4 max-w-3xl font-serif text-2xl italic leading-snug sm:text-3xl">
            “Investing is more about temperament than timing.”
          </blockquote>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.slice(0, 4).map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-bold text-gold-400 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-cream/70">{s.label}</p>
              </div>
            ))}
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
            Five pillars, one integrated strategy built around your life and
            your goals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
      <section className="relative overflow-hidden bg-navy-900 text-cream">
        <AnimatedBackground particles={false} />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                Why Dhanvega
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
        <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-2">
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

      {/* CTA */}
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <GrowthBackground />
      <div className="relative mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
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
