"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
type Props = { links: { href: string; label: string }[]; label: string; children: ReactNode };
export function MobileMenu({ links, label, children }: Props) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="md:hidden">
      <Button ref={btn} variant="secondary" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{label}</Button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-paper px-5 py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line">{l.label}</a></li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">{children}</div>
        </div>
      )}
    </div>
  );
}
