"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";
import { COUNTRIES, flagEmoji } from "@/lib/countries";
import Combobox from "@/components/Combobox";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Plain text fields. Country + phone are custom comboboxes below.
const fields = [
  { name: "name", label: "Full name", type: "text", required: true, placeholder: "Jane Doe", half: true },
  { name: "email", label: "Work email", type: "email", required: true, placeholder: "jane@company.com", half: true },
  { name: "company", label: "Company", type: "text", required: false, placeholder: "Your manufacturing company", half: true },
  { name: "teamSize", label: "Team size / interest", type: "text", required: false, placeholder: "20 scientists", half: true },
];

// Submits the lead to /api/contact, which forwards a rich message to Slack
// server-side. The Slack webhook URL is never exposed to the browser.
export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [values, setValues] = useState({
    name: "", email: "", company: "", teamSize: "", message: "",
  });
  const [country, setCountry] = useState(null); // selected country option
  const [dial, setDial] = useState(null); // selected dialing-code option
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  // Build the combobox option lists once. Country options carry their dial so
  // choosing a country can prefill the phone code.
  const { countryOptions, dialOptions } = useMemo(() => {
    const cOpts = COUNTRIES.map((c) => {
      const flag = flagEmoji(c.iso2);
      return {
        value: c.iso2,
        dial: c.dial,
        display: c.name,
        search: `${c.name.toLowerCase()} ${c.iso2.toLowerCase()}`,
        node: (
          <>
            <span aria-hidden="true">{flag}</span>
            <span>{c.name}</span>
          </>
        ),
      };
    });
    const dOpts = COUNTRIES.map((c) => {
      const flag = flagEmoji(c.iso2);
      return {
        value: c.iso2,
        dial: c.dial,
        display: `${flag} ${c.dial}`,
        search: `${c.name.toLowerCase()} ${c.dial} ${c.iso2.toLowerCase()}`,
        node: (
          <>
            <span aria-hidden="true">{flag}</span>
            <span className="flex-1 truncate">{c.name}</span>
            <span className="text-dim">{c.dial}</span>
          </>
        ),
      };
    });
    return { countryOptions: cOpts, dialOptions: dOpts };
  }, []);

  const update = (k) => (e) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er));
  };

  // Flag a malformed email the moment the user leaves the field.
  function checkEmail() {
    const v = values.email.trim();
    if (v && !EMAIL_RE.test(v)) {
      setErrors((er) => ({ ...er, email: "Please enter a valid email." }));
    }
  }

  // Choosing a country prefills the matching dialing code.
  function chooseCountry(opt) {
    setCountry(opt);
    setDial(dialOptions.find((d) => d.value === opt.value) || null);
  }

  // Client-side checks: required fields, email shape, and (when a number is
  // entered) a dialing code plus a plausible digit count. Server re-validates.
  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Enter your name.";
    if (!values.email.trim()) e.email = "Enter your work email.";
    else if (!EMAIL_RE.test(values.email.trim()))
      e.email = "Please enter a valid email.";
    if (phone.trim()) {
      const digits = phone.replace(/\D/g, "");
      if (!dial) e.phone = "Select your country dialing code.";
      else if (digits.length < 6 || digits.length > 15)
        e.phone = "Enter a valid phone number.";
    }
    if (!values.message.trim()) e.message = "Tell us what you're hoping to solve.";
    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("submitting");
    const payload = {
      ...values,
      country: country?.display || "",
      phone: phone.trim() ? `${dial?.dial || ""} ${phone.trim()}`.trim() : "",
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data?.ok ? "success" : "error");
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
          <a href={`mailto:${site.email}`} className="text-accent-text">{site.email}</a>.
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
              {f.required && <span className="ml-1 text-accent-text">*</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={update(f.name)}
              onBlur={f.name === "email" ? checkEmail : undefined}
              aria-invalid={errors[f.name] ? true : undefined}
              aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
              className={`w-full rounded-xl border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:outline-none ${
                errors[f.name] ? "border-warm/70 focus:border-warm" : "border-border focus:border-accent/50"
              }`}
            />
            {errors[f.name] && (
              <p id={`${f.name}-error`} className="mt-1.5 text-xs text-warm">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}

        {/* Country — searchable combobox */}
        <div className="sm:col-span-2">
          <label htmlFor="country" className="mb-2 block text-sm font-medium text-text">
            Country
          </label>
          <Combobox
            id="country"
            options={countryOptions}
            selected={country}
            onSelect={chooseCountry}
            placeholder="Search or select your country"
          />
        </div>

        {/* Phone — dialing-code combobox + number */}
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text">
            Phone
          </label>
          <div className="flex gap-2.5">
            <Combobox
              id="phone-code"
              className="w-[116px] shrink-0 sm:w-[132px]"
              options={dialOptions}
              selected={dial}
              onSelect={(opt) => {
                setDial(opt);
                setErrors((er) => (er.phone ? { ...er, phone: undefined } : er));
              }}
              placeholder="Code"
              error={errors.phone}
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="555 000 0000"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((er) => (er.phone ? { ...er, phone: undefined } : er));
              }}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full rounded-xl border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:outline-none ${
                errors.phone ? "border-warm/70 focus:border-warm" : "border-border focus:border-accent/50"
              }`}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-warm">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
            What are you hoping to solve?
            <span className="ml-1 text-accent-text">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={values.message}
            onChange={update("message")}
            placeholder="Tell us about your spec-reconciliation or sales-ops workflow today."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full resize-none rounded-xl border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:outline-none ${
              errors.message ? "border-warm/70 focus:border-warm" : "border-border focus:border-accent/50"
            }`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-warm">
              {errors.message}
            </p>
          )}
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
