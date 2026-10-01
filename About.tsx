import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
export async function About() {
  const t = await getTranslations("About");
  return <Section id="about" title={t("title")}><p className="max-w-prose text-lg">{t("body")}</p></Section>;
}
