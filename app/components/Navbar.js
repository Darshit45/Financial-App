"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/calculator", label: "Calculator" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-lg shadow-navy-950/10"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          aria-label="DhanVega Financial Services — Home"
          className="flex items-center gap-2.5"
        >
          <img
            src="/logo-mark.png"
            alt=""
            className="h-12 w-auto"
          />
          <span className="flex flex-col">
            <span className="font-serif text-xl font-bold leading-none tracking-wide text-navy-900">
              DHANVEGA
            </span>
            <span className="mt-1 text-[0.55rem] font-semibold leading-none tracking-[0.22em] text-gold-500">
              — FINANCIAL SERVICES —
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-gold-600"
                      : "text-navy-800 hover:text-gold-600"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Book a Consultation
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-navy-900/10 bg-white transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium ${
                    active
                      ? "bg-navy-900/5 text-gold-600"
                      : "text-navy-800 hover:bg-navy-900/5 hover:text-gold-600"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link
              href="/contact"
              className="block rounded-full bg-gold-500 px-5 py-2.5 text-center text-base font-semibold text-navy-950"
            >
              Book a Consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
