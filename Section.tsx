import type { ReactNode } from "react";
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-5xl scroll-mt-16 px-5 py-16 md:py-24">
      <h2 id={`${id}-h`} className="text-3xl md:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
