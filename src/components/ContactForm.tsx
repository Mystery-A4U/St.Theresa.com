"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website Enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:info@sttheresasendurai.edu.in?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-maroon"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-maroon"
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-maroon"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-maroon"
          placeholder="Tell us how we can help..."
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-maroon px-7 py-3.5 text-sm font-medium text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-maroon-light"
      >
        Send Message
      </button>

      {status === "sent" && (
        <p className="text-sm text-slate">
          Your email app should now be open with your message ready to send.
        </p>
      )}
    </form>
  );
}
