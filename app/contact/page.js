import Icon from "../components/Icon";
import { PageHeader } from "../about/page";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Meridian Wealth",
  description: "Book a free consultation or get in touch with the Meridian Wealth team.",
};

const details = [
  {
    icon: "pin",
    title: "Head Office",
    lines: ["123 Financial District", "Mumbai 400001, India"],
  },
  {
    icon: "mail",
    title: "Email",
    lines: ["hello@meridianwealth.example"],
  },
  {
    icon: "phone",
    title: "Phone",
    lines: ["+91 00000 00000", "Mon–Fri, 9am–6pm"],
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
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{d.title}</h3>
                    {d.lines.map((l) => (
                      <p key={l} className="text-sm text-navy-700/80">
                        {l}
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
    </>
  );
}
