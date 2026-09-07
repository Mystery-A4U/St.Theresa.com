import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic programme, classes and curriculum at St. Theresa Matriculation Higher Secondary School, Sendurai.",
};

const CLASSES = [
  { stage: "Pre-Primary", range: "LKG – UKG", desc: "Play-based learning that builds early language, motor and social skills." },
  { stage: "Primary", range: "Std I – V", desc: "Foundational literacy, numeracy and curiosity-driven exploration." },
  { stage: "Middle School", range: "Std VI – VIII", desc: "Broader subject exposure with an emphasis on conceptual clarity." },
  { stage: "Matriculation", range: "Std IX – X", desc: "Rigorous preparation for the SSLC board examination." },
  { stage: "Higher Secondary", range: "Std XI – XII", desc: "Specialised streams in Science and Commerce with career guidance." },
];

const FEATURES = [
  { title: "Tamil Nadu State Board Curriculum", desc: "A structured, board-aligned syllabus from LKG through Std XII." },
  { title: "English Medium Instruction", desc: "All subjects taught in English, with dedicated Tamil language classes." },
  { title: "Continuous Assessment", desc: "Regular unit tests, projects and term exams to track real progress." },
  { title: "Remedial & Enrichment Classes", desc: "Extra support for students who need it, and advanced work for those ready for more." },
  { title: "Career Guidance", desc: "Counselling for Std X and XII students choosing their academic path." },
  { title: "Co-curricular Integration", desc: "Art, music and sport are timetabled, not an afterthought." },
];

export default function AcademicsPage() {
  return (
    <div>
      <section className="bg-mist py-16 md:py-24">
        <div className="container-school">
          <p className="eyebrow mb-4">Academics</p>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            A curriculum built for depth, not just marks
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">
            From Kindergarten to Higher Secondary, our academic programme balances
            board requirements with genuine understanding, guided by teachers who
            know every student by name.
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="py-20 md:py-28">
        <div className="container-school">
          <SectionHeading label="Programme" title="Classes offered" />
          <div className="mt-12 overflow-hidden rounded-xl2 border border-ink/8">
            {CLASSES.map((c, i) => (
              <div
                key={c.stage}
                className={`grid grid-cols-1 gap-2 px-7 py-6 sm:grid-cols-[1fr_auto_2fr] sm:items-center sm:gap-8 ${
                  i !== CLASSES.length - 1 ? "border-b border-ink/8" : ""
                } ${i % 2 === 0 ? "bg-white" : "bg-mist"}`}
              >
                <h3 className="font-serif text-lg font-medium text-ink">{c.stage}</h3>
                <span className="w-fit rounded-full bg-maroon/10 px-3 py-1 text-xs font-semibold text-maroon">
                  {c.range}
                </span>
                <p className="text-sm leading-relaxed text-slate">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum & Features */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-school">
          <SectionHeading
            label="Educational Approach"
            title="Curriculum & academic features"
            description="Every element of our academic programme is designed around one goal: helping each student genuinely understand, not just memorise."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl2 bg-white p-7 shadow-card">
                <h3 className="font-serif text-base font-medium text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
