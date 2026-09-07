import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with St. Theresa Matriculation Higher Secondary School, Sendurai, Tamil Nadu.",
};

const INFO = [
  {
    label: "Address",
    value: "St. Theresa Matriculation Hr. Sec. School, Sendurai, Ariyalur District, Tamil Nadu – 621714, India",
  },
  { label: "Phone", value: "+91 43290 00000" },
  { label: "Email", value: "info@sttheresasendurai.edu.in" },
  { label: "Office Hours", value: "Monday – Saturday, 8:30 AM – 4:00 PM" },
];

export default function ContactPage() {
  return (
    <div>
      <section className="bg-mist py-16 md:py-24">
        <div className="container-school">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">
            Whether you have a question about admissions, academics, or would like
            to visit our campus — reach out and our team will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-school grid gap-14 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div>
            <h2 className="font-serif text-xl font-medium text-ink">School Information</h2>
            <dl className="mt-6 space-y-6">
              {INFO.map((i) => (
                <div key={i.label}>
                  <dt className="section-label mb-1.5">{i.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-slate">{i.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl2 bg-mist p-7 shadow-card md:p-9">
            <h2 className="mb-6 font-serif text-xl font-medium text-ink">Send an Enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-school">
          <div className="overflow-hidden rounded-xl2 shadow-card">
            <iframe
              title="School location on Google Maps"
              src="https://www.google.com/maps?q=Sendurai,Ariyalur,Tamil+Nadu&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
