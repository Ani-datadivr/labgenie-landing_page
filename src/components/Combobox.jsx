"use client";

import { useEffect, useRef, useState } from "react";

// A searchable single-select combobox. Type to filter the list; click, Enter, or
// arrow + Enter to choose. Built on the WAI-ARIA combobox pattern (role+aria
// state, keyboard nav, outside-click + Escape close). The list is absolutely
// positioned; the form panel doesn't clip overflow, so it's never cut off.
//
// `options`: [{ value, display, search, node }]. `selected` is the chosen option
// (or null). `onSelect(option)` fires on choose. `display` is shown when closed;
// `search` is the lowercased haystack; `node` is the row's rendered content.
export default function Combobox({
  id,
  options,
  selected,
  onSelect,
  placeholder,
  error,
  invalidNote, // optional: text typed that didn't match, surfaced to caller via onTypeChange
  onTypeChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => o.search.includes(q)).slice(0, 80)
    : options;

  useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Keep the active row scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[active];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(opt) {
    onSelect(opt);
    setQuery("");
    onTypeChange?.("");
    setOpen(false);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[active]) {
        e.preventDefault();
        choose(filtered[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const inputValue = open ? query : selected?.display ?? "";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onTypeChange?.(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onKeyDown={onKeyDown}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-bg-elev/60 px-4 py-3 text-sm text-text placeholder:text-dim transition-colors focus:outline-none ${
          error ? "border-warm/70 focus:border-warm" : "border-border focus:border-accent/50"
        }`}
      />
      {open && filtered.length > 0 && (
        <ul
          id={`${id}-listbox`}
          ref={listRef}
          role="listbox"
          className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-border bg-bg-elev py-1 shadow-panel"
        >
          {filtered.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={selected?.value === o.value}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(o);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm ${
                i === active ? "bg-surface text-text" : "text-muted"
              }`}
            >
              {o.node}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
