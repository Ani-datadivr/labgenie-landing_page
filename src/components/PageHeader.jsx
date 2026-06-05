import Reveal from "./Reveal";

// Standard inner-page hero header.
export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-[3.4rem]">{title}</h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl lead">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
