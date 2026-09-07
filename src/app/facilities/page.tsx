import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Smart classrooms, laboratories, library, sports and campus facilities at St. Theresa Matriculation Higher Secondary School, Sendurai.",
};

const FACILITIES = [
  {
    title: "Smart Classrooms",
    desc: "Every classroom is equipped with interactive digital boards, enabling teachers to bring lessons to life with multimedia content.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Science Laboratories",
    desc: "Dedicated, fully-equipped Physics, Chemistry and Biology labs give students hands-on experience from Std VIII onward.",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Library",
    desc: "A quiet, well-stocked library with over 12,000 titles spanning fiction, reference material and periodicals for every age group.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Sports & Athletics",
    desc: "An athletics track, basketball and volleyball courts, and open playfields support a strong culture of physical fitness.",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Computer Lab",
    desc: "A modern computer lab introduces students to digital literacy and foundational programming concepts.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Campus & Green Spaces",
    desc: "A spacious, secure campus with shaded courtyards and gardens gives students room to breathe, play and reflect.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function FacilitiesPage() {
  return (
    <div>
      <section className="bg-mist py-16 md:py-24">
        <div className="container-school">
          <p className="eyebrow mb-4">Facilities</p>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            A campus designed for learning, play and growth
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-school space-y-16 md:space-y-24">
          {FACILITIES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-elevated">
                <Image src={f.img} alt={f.title} fill className="object-cover" />
              </div>
              <div>
                <SectionHeading title={f.title} description={f.desc} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
