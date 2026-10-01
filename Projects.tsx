import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Section } from "./Section";
const projects = ["fade", "codemotion"] as const;
export async function Projects() {
  const t = await getTranslations("Projects");
  return (
    <Section id="projects" title={t("title")}>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p}><h3 className="text-2xl">{t(`${p}.name`)}</h3><p className="mt-2 text-muted">{t(`${p}.desc`)}</p></Card>
        ))}
      </div>
    </Section>
  );
}
