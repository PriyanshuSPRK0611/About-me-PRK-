import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
const skills = ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "UI/UX", "AI tools", "Video / animation"];
export async function Skills() {
  const t = await getTranslations("Skills");
  return (
    <Section id="skills" title={t("title")}>
      <ul className="flex flex-wrap gap-2">
        {skills.map((s) => <li key={s} className="rounded-control border border-line bg-surface px-3 py-1.5">{s}</li>)}
      </ul>
    </Section>
  );
}
