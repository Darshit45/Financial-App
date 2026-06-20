import Icon from "../components/Icon";
import { PageHeader } from "../about/page";
import { CtaBand } from "../page";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Dhanvega",
  description: "Book a free consultation or get in touch with the Dhanvega team.",
};

const details = [
  {
    icon: "pin",
    title: "Office",
    lines: [
      { text: "303, Abhusan Complex" },
      { text: "Sardar Patel Stadium Road, Naranpura" },
      { text: "Ahmedabad - 380013" },
    ],
  },
  {
    icon: "mail",
    title: "Email",
    lines: [
      {
        text: "info@dhanvegafinserv.com",
        href: "mailto:info@dhanvegafinserv.com",
      },
    ],
  },
  {
    icon: "whatsapp",
    title: "Mobile",
    lines: [
      {
        text: "+91 92748 86588",
        href: "https://wa.me/919274886588",
        external: true,
      },
      { text: "Call or chat with us on WhatsApp" },
    ],
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's start a conversation"
        subtitle="Book a free, no-obligation consultation. Tell us about your goals and we'll take it from there."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Reach us directly
            </h2>
            <p className="mt-3 text-navy-700/80">
              Prefer to talk? Use the details below, or fill out the form and
              we'll get back within one business day.
            </p>
            <div className="mt-8 space-y-6">
              {details.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      d.icon === "gmail" || d.icon === "whatsapp"
                        ? "bg-white ring-1 ring-navy-900/10"
                        : "bg-navy-900 text-gold-400"
                    }`}
                  >
                    <Icon name={d.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{d.title}</h3>
                    {d.lines.map((l) => (
                      <p key={l.text} className="text-sm text-navy-700/80">
                        {l.href ? (
                          <a
                            href={l.href}
                            className="transition-colors hover:text-gold-600"
                            {...(l.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                          >
                            {l.text}
                          </a>
                        ) : (
                          l.text
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=303%2C+Abhusan+Complex%2C+Sardar+Patel+Stadium+Road%2C+Naranpura%2C+Ahmedabad+380013"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open our office location in Google Maps"
              className="group relative mt-8 block overflow-hidden rounded-2xl border border-navy-900/10"
            >
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.55%2C23.03%2C72.59%2C23.07&layer=mapnik&marker=23.0496%2C72.5713"
                className="pointer-events-none h-56 w-full"
                loading="lazy"
              />
              {/* Transparent click layer so tapping anywhere opens Maps */}
              <span className="absolute inset-0" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-cream shadow-md transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                <Icon name="pin" className="h-3.5 w-3.5" />
                Open in Google Maps
              </span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
