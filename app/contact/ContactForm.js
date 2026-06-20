"use client";

import { useState } from "react";
import Icon from "../components/Icon";

const services = [
  "Wealth Management",
  "Insurance Planning",
  "Tax Planning",
  "Portfolio Revamp",
  "Strategic Allocation",
  "General enquiry",
];

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    message: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // No backend wired yet — simulate a submit. Replace with an API route or
    // form service (e.g. /api/contact, Formspree, Resend) when ready.
    setTimeout(() => setStatus("sent"), 800);
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-navy-900/10 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-navy-950">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">
          Thank you, {form.name || "there"}!
        </h3>
        <p className="mt-2 text-navy-700/80">
          We've received your request and will be in touch within one business
          day.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", email: "", phone: "", service: services[0], message: "" });
            setStatus("idle");
          }}
          className="mt-6 rounded-full border border-navy-900/20 px-6 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-900/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-navy-900/10 bg-white p-7 shadow-sm sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 00000 00000"
            className={inputClass}
          />
        </Field>
        <Field label="I'm interested in">
          <select
            value={form.service}
            onChange={update("service")}
            className={inputClass}
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message">
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={update("message")}
            placeholder="Tell us a little about your goals..."
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send message"}
        {status !== "sending" && <Icon name="arrow" className="h-4 w-4" />}
      </button>
      <p className="mt-4 text-xs text-navy-700/60">
        By submitting, you agree to be contacted about your enquiry. We never
        share your details.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-navy-900/20 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-800">
        {label}
      </span>
      {children}
    </label>
  );
}
