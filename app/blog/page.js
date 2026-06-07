import Link from "next/link";
import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import { posts } from "../lib/content";

export const metadata = {
  title: "Insights — Meridian Wealth",
  description: "Practical thinking on investing, planning, tax and protecting wealth.",
};

export default function Blog() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas worth compounding"
        subtitle="Clear, practical thinking on building and protecting wealth for the long term."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        {/* Featured */}
        <Link
          href="/blog"
          className="group grid overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
        >
          <div className="flex min-h-56 items-center justify-center bg-navy-900 p-10">
            <span className="font-serif text-2xl font-semibold text-gold-400">
              Featured
            </span>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 text-xs text-navy-700/70">
              <span className="rounded-full bg-navy-900/5 px-3 py-1 font-semibold text-navy-900">
                {featured.category}
              </span>
              <span>{featured.read}</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl font-semibold text-navy-900 group-hover:text-gold-600">
              {featured.title}
            </h2>
            <p className="mt-3 text-navy-700/85">{featured.excerpt}</p>
            <p className="mt-5 text-xs text-navy-700/60">{featured.date}</p>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
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

        {/* Newsletter */}
        <div className="mt-14 rounded-2xl border border-navy-900/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <h3 className="font-serif text-2xl font-semibold text-navy-900">
            Get our insights in your inbox
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-navy-700/80">
            Occasional, no-spam notes on markets and personal finance.
          </p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-navy-900/20 px-5 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
            />
            <button
              type="submit"
              className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
