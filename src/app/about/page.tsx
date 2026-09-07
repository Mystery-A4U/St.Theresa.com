import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The history, vision, mission and values of St. Theresa Matriculation Higher Secondary School, Sendurai.",
};

const VALUES = [
  { title: "Integrity", desc: "We teach children to act rightly even when no one is watching." },
  { title: "Compassion", desc: "Kindness toward others is treated as seriously as academic ability." },
  { title: "Discipline", desc: "Structure and self-control form the foundation for lifelong learning." },
  { title: "Excellence", desc: "We encourage every student to pursue their personal best, not comparison." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-mist py-16 md:py-24">
        <div className="container-school">
          <p className="eyebrow mb-4">About Us</p>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            A legacy of learning, character and community in Sendurai
          </h1>
        </div>
      </section>

      {/* History */}
      <section className="py-20 md:py-28">
        <div className="container-school grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading label="Our History" title="Rooted in tradition, growing with the times" />
            <div className="prose-school mt-6">
              <p>
                St. Theresa Matriculation Higher Secondary School was founded with a
                singular purpose: to bring quality, values-based education to the
                children of Sendurai and its surrounding villages. What began as a
                small institution has, over more than three decades, grown into one
                of the region's most trusted schools.
              </p>
              <p>
                Generations of families have walked through our gates — many
                returning to enrol their own children, a quiet testament to the
                trust we have earned over the years. Today, we continue to honour
                that legacy while embracing modern teaching methods that prepare
                our students for a changing world.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              alt="School campus building"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-school grid gap-8 md:grid-cols-2">
          <div className="rounded-xl2 bg-white p-9 shadow-card">
            <p className="section-label mb-3">Vision</p>
            <h3 className="font-serif text-2xl font-medium text-ink">
              To be a centre of academic and moral excellence
            </h3>
            <p className="prose-school mt-4">
              We envision a school where every child is empowered to discover their
              potential, guided by faith, knowledge and compassion, growing into a
              responsible citizen of tomorrow.
            </p>
          </div>
          <div className="rounded-xl2 bg-white p-9 shadow-card">
            <p className="section-label mb-3">Mission</p>
            <h3 className="font-serif text-2xl font-medium text-ink">
              To nurture confident, capable and caring learners
            </h3>
            <p className="prose-school mt-4">
              Our mission is to deliver a well-rounded education — academic,
              physical, moral and cultural — that equips students with the skills
              and character to thrive at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 md:py-28">
        <div className="container-school grid items-center gap-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800&auto=format&fit=crop"
              alt="Principal of St. Theresa Matriculation Higher Secondary School"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="section-label mb-3">Principal's Message</p>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
              "Every child who walks through our doors carries a story worth
              nurturing."
            </h2>
            <div className="prose-school mt-6">
              <p>
                At St. Theresa, we believe education is far more than examination
                results. It is about shaping minds that question, hearts that care,
                and character that endures. Our dedicated faculty work closely with
                every student, ensuring that no child is left behind and every
                talent is given room to grow.
              </p>
              <p>
                I invite you to visit our campus and witness firsthand the warmth
                and discipline that define our school community.
              </p>
            </div>
            <p className="mt-6 font-serif text-lg font-medium text-ink">
              — Principal, St. Theresa Matriculation Higher Secondary School
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-school">
          <SectionHeading label="What We Stand For" title="Our core values" align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl2 bg-white p-7 shadow-card">
                <h3 className="font-serif text-lg font-medium text-maroon">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
