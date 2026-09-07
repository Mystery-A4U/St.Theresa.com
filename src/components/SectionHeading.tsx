export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {label && <p className="section-label mb-3">{label}</p>}
      <h2 className="font-serif text-3xl font-medium leading-tight text-ink md:text-[2.5rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-slate">{description}</p>
      )}
    </div>
  );
}
