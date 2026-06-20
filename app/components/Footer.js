import Link from "next/link";
import Icon from "./Icon";

const cols = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/calculator", label: "Calculator" },
      { href: "/blog", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Wealth Management" },
      { href: "/services", label: "Insurance Planning" },
      { href: "/services", label: "Tax Planning" },
      { href: "/services", label: "Estate Planning" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-gold-500 font-serif text-lg font-bold text-navy-950">
                D
              </span>
              <span className="font-serif text-xl font-semibold text-cream">
                Dhan<span className="text-gold-400">vega</span>
              </span>
            </Link>
            <p className="mt-3 font-serif text-sm italic text-gold-300">
              With You, For Every Tomorrow
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Disciplined, research-backed wealth management built around your
              goals — not sales targets.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cream">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l, i) => (
                  <li key={`${l.label}-${i}`}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-gold-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cream">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>123 Financial District, Mumbai 400001</li>
              <li>
                <a
                  href="mailto:jigarmodi1992@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-gold-300"
                >
                  <span className="inline-grid h-5 w-5 shrink-0 place-items-center rounded bg-white">
                    <Icon name="gmail" className="h-3.5 w-3.5" />
                  </span>
                  jigarmodi1992@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917778877555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold-300"
                >
                  <span className="inline-grid h-5 w-5 shrink-0 place-items-center rounded bg-white">
                    <Icon name="whatsapp" className="h-3.5 w-3.5" />
                  </span>
                  +91 77788 77555
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Dhanvega. All rights reserved.</p>
          <p className="text-cream/50">
            Investments are subject to market risks. Read all documents carefully.
          </p>
        </div>
      </div>
    </footer>
  );
}
