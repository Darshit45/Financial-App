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
    title: "Head Office",
    lines: [{ text: "123 Financial District" }, { text: "Mumbai 400001, India" }],
  },
  {
    icon: "gmail",
    title: "Email",
    lines: [
      { text: "jigarmodi1992@gmail.com", href: "mailto:jigarmodi1992@gmail.com" },
    ],
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    lines: [
      {
        text: "+91 77788 77555",
        href: "https://wa.me/917778877555",
        external: true,
      },
      { text: "Chat with us on WhatsApp" },
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

            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-900/10">
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.80%2C18.90%2C72.90%2C19.00&layer=mapnik"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
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
