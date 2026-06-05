import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, sub, center = false, className = "" }) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-[2.6rem]">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 lead">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
