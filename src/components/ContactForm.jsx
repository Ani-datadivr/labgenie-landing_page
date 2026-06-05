"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

const fields = [
  { name: "name", label: "Full name", type: "text", required: true, placeholder: "Jane Doe", half: true },
  { name: "email", label: "Work email", type: "email", required: true, placeholder: "jane@company.com", half: true },
  { name: "company", label: "Company", type: "text", required: true, placeholder: "Your manufacturing company", half: true },
  { name: "role", label: "Your role", type: "text", required: false, placeholder: "Head of Quality", half: true },
];

// NOTE: This form is wired to a placeholder handler. To go live, connect the
// onSubmit to your backend/CRM (e.g. an API route, Formspree, or HubSpot).
export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [values, setValues] = useState({
    name: "", email: "", company: "", role: "", interest: "demo", message: "",
  });

  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: replace with real endpoint, e.g.:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel flex flex-col items-center px-8 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none">
            <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-3 max-w-sm text-sm text-muted">
          A member of our team will reach out within one business day. In the
          meantime, feel free to email us directly at{" "}
          <a href={`mailto:${site.email}`} className="text-accent">{site.email}</a>.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={f.name} className="mb-2 block text-sm font-medium text-text">
              {f.label}
              {f.required && <span className="ml-1 text-accent">*</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={update(f.name)}
              className="w-full rounded-xl border border-border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:border-accent/50 focus:outline-none"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="interest" className="mb-2 block text-sm font-medium text-text">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            value={values.interest}
            onChange={update("interest")}
            className="w-full cursor-pointer rounded-xl border border-border bg-bg-elev/60 px-4 py-3 text-sm text-text transition-colors focus:border-accent/50 focus:outline-none"
          >
            <option value="demo">Requesting a demo</option>
            <option value="partner">Becoming a design partner</option>
            <option value="security">Security documentation</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
            What are you hoping to solve?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={update("message")}
            placeholder="Tell us about your spec-reconciliation or sales-ops workflow today."
            className="w-full resize-none rounded-xl border border-border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request a demo"}
        </button>
        <AnimatePresence>
          {status === "error" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-warm"
            >
              Something went wrong. Email us at {site.email}.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
