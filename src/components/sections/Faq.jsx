"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";

const EASE = [0.16, 1, 0.3, 1];

const FAQS = [
  {
    q: "How long does it take to go live?",
    a: "Most teams are running within 2 to 6 weeks. If one of our existing agents fits your workflow out of the box, like RFP matching or sales query relay, you'll be live in about 2 weeks. If we need to tune the agents to your specific catalogue, SOPs, or systems, plan for 4 to 6 weeks.",
  },
  {
    q: "How is our data kept safe?",
    a: "Your formulations, buyer lists, RFPs, and pricing stay yours. LabGenie isolates each customer's data in its own tenant schema, so it never mixes with anyone else's. Data is encrypted in transit, access is role-based and least-privilege, activity is logged, and you keep full ownership of everything you upload, used only to run the platform for you and never sold. SOC 2 Type II and GDPR readiness are in progress, and we sign NDAs and put a data processing agreement in place for enterprise onboarding.",
  },
  {
    q: "Does it work with the tools we already use?",
    a: "Yes. LabGenie sits on top of what you already run. We integrate with SAP (S/4HANA and B1), Sage, Salesforce, Outlook, Teams, Slack, and the Excel sheets and shared drives your team lives in. If a data source matters to your decisions, we connect to it.",
  },
  {
    q: "Can it handle our specific products and formulations?",
    a: "Yes. The agents learn your product catalogue, your SOPs, your spec formats, and your way of describing things. We start by ingesting what your team already references, and the agents get sharper with every interaction.",
  },
  {
    q: "What if we only need one station, not the whole platform?",
    a: "Each agent works independently. Most customers start with one, usually the one solving their loudest pain, whether that's RFP matching, sales query routing, or compliance reporting. You expand when you see results. There's no requirement to deploy the full platform on day one.",
  },
  {
    q: "How is LabGenie priced?",
    a: "We price on value created, not seats or usage. The starting point is a small percentage of the measurable value LabGenie generates, whether that's hours saved, RFPs won, reduced waste, or faster turnarounds. For new customers we run a three-month proof of concept at a fixed fee so we can measure the actual impact together, then move to value-based pricing once the numbers are real. No long lock-ins, no per-user surprises.",
  },
];

export default function Faq({ items }) {
  // Editable copy comes from Keystatic (singleton "faqs"); fall back to the
  // built-in list if none is passed or it's empty.
  const faqs = items?.length ? items : FAQS;
  // Start fully collapsed — every item reads as just a question at first glance.
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className="container-x py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-7 bg-accent/60" />
            <span className="kicker kicker-accent">Questions</span>
          </Reveal>
          <Reveal as="h2" delay={0.05} variant="blur" className="mt-5 text-3xl sm:text-4xl">
            The things buyers ask before a demo.
          </Reveal>
          <Reveal as="p" delay={0.1} className="lead mt-4">
            Straight answers on timelines, security, pricing, and fit. Anything else, ask us directly.
          </Reveal>
        </div>

        <Reveal as="ul" delay={0.05} className="divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-medium text-text">{item.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted"
                    }`}
                  >
                    <motion.svg
                      viewBox="0 0 14 14"
                      className="h-3.5 w-3.5"
                      fill="none"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      aria-hidden="true"
                    >
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </motion.svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="overflow-hidden"
                    >
                      {/* answer resolves in: fades up and sharpens from dim to
                          full weight, slightly after the panel opens */}
                      <motion.p
                        initial={{ opacity: 0, y: 6, color: "#6F7D8F" }}
                        animate={{ opacity: 1, y: 0, color: "#A6B2C2" }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
                        className="max-w-[68ch] pb-6 text-[15px] leading-relaxed"
                      >
                        {item.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
