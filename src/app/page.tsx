import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import type { SchoolEvent } from "@/lib/types";

const STATS = [
  { value: "35+", label: "Years of Legacy" },
  { value: "2,400+", label: "Students" },
  { value: "95+", label: "Faculty Members" },
  { value: "100%", label: "Board Result, 2025" },
];

const ACHIEVEMENTS = [
  {
    title: "State-level Science Fair — 1st Place",
    year: "2025",
    desc: "Our senior team's water-purification project won top honours at the Tamil Nadu State Science Exhibition.",
  },
  {
    title: "District Athletics Championship",
    year: "2024",
    desc: "St. Theresa athletes brought home 14 medals at the Ariyalur District Meet.",
  },
  {
    title: "100% Pass — SSLC & HSC",
    year: "2025",
    desc: "Every student in our outgoing batches cleared their board examinations, with 68% scoring distinction.",
  },
];

const FACILITIES_PREVIEW = [
  { title: "Smart Classrooms", desc: "Interactive digital boards in every classroom." },
  { title: "Science Laboratories", desc: "Fully equipped Physics, Chemistry & Biology labs." },
  { title: "Library", desc: "Over 12,000 titles across fiction, reference and journals." },
  { title: "Sports Complex", desc: "Athletics track, basketball & volleyball courts." },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
];

async function getFeaturedEvents(): Promise<SchoolEvent[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function HomePage() {
  const events = await getFeaturedEvents();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mist">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-maroon/5 blur-3xl" />

        <div className="container-school relative grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fadeUp">
            <p className="eyebrow mb-5">Sendurai, Tamil Nadu, India</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
              St. Theresa Matriculation
              <br />
              Higher Secondary School
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-slate">
              For over three decades, we have shaped young minds in Sendurai through
              disciplined academics, moral formation and a genuine love of learning —
              guiding every child toward character, curiosity and quiet confidence.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-maroon px-7 py-3.5 text-sm font-medium text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-maroon-light"
              >
                Apply for Admission
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-ink/15 bg-white px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-maroon/40 hover:text-maroon"
              >
                Discover Our Story
              </Link>
            </div>
          </div>

          <div className="relative animate-fadeIn">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop"
                alt="Students of St. Theresa Matriculation Higher Secondary School"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 bg-white p-5 shadow-elevated sm:block">
              <p className="font-serif text-3xl font-semibold text-maroon">35+</p>
              <p className="text-xs text-slate">Years of educational excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introduction ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-school grid gap-12 md:grid-cols-2 md:gap-20">
          <SectionHeading
            label="Welcome"
            title="An institution built on faith, discipline and academic excellence"
            description="St. Theresa Matriculation Higher Secondary School has been a cornerstone of education in Sendurai, dedicated to nurturing well-rounded individuals equipped with knowledge, values and the confidence to lead."
          />
          <div className="space-y-5 text-[15px] leading-relaxed text-slate">
            <p>
              Our classrooms blend time-tested teaching with modern learning tools,
              while our campus offers space for sport, science and the arts to
              flourish side by side.
            </p>
            <p>
              Every student is known by name and guided individually — because we
              believe education is not only about marks, but about the person a
              child becomes.
            </p>
            <Link href="/about" className="inline-block text-sm font-medium text-maroon">
              Read our full story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-maroon py-16">
        <div className="container-school grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-white md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs tracking-wide text-white/70 md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Events ──────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-school">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              label="What's Happening"
              title="Featured events"
              description="A glimpse into the celebrations, competitions and milestones on our school calendar."
            />
            <Link
              href="/events"
              className="whitespace-nowrap text-sm font-medium text-maroon hover:underline"
            >
              View all events →
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-xl2 border border-dashed border-ink/15 bg-mist p-12 text-center">
              <p className="text-sm text-slate">
                Events will appear here once published from the admin dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Achievements ─────────────────────────────────── */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-school">
          <SectionHeading
            label="Recognition"
            title="Our achievements"
            description="Milestones that reflect the dedication of our students, teachers and school community."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.title}
                className="rounded-xl2 bg-white p-7 shadow-card transition-shadow hover:shadow-elevated"
              >
                <p className="text-xs font-semibold tracking-wide text-gold-dark">
                  {a.year}
                </p>
                <h3 className="mt-3 font-serif text-lg font-medium text-ink">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities Preview ───────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-school">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              label="Campus"
              title="Facilities that support every child's growth"
            />
            <Link
              href="/facilities"
              className="whitespace-nowrap text-sm font-medium text-maroon hover:underline"
            >
              Explore facilities →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES_PREVIEW.map((f) => (
              <div
                key={f.title}
                className="rounded-xl2 border border-ink/8 p-6 transition-colors hover:border-maroon/30"
              >
                <h3 className="font-serif text-base font-medium text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ──────────────────────────────── */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-school">
          <SectionHeading
            label="Campus Life"
            title="Moments from school life"
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-xl2 shadow-card ${
                  i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt="St. Theresa school campus life"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-school">
          <div className="grid items-center gap-10 rounded-xl2 bg-ink px-8 py-14 shadow-elevated md:grid-cols-2 md:px-16">
            <div>
              <h2 className="font-serif text-2xl font-medium text-white md:text-3xl">
                Considering St. Theresa for your child?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Visit our campus, meet our faculty, and see for yourself why
                generations of families in Sendurai have trusted us with their
                children's education.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                href="/events"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/50"
              >
                See School Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
