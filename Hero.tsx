import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
export async function Hero() {
  const t = await getTranslations("Hero");
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 py-24 md:py-40">
      <h1 className="text-5xl md:text-7xl">{t("name")}</h1>
      <p className="mt-4 max-w-prose text-xl text-muted">{t("tagline")}. {t("intro")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects"><Button>{t("work")}</Button></a>
        <a href="#contact"><Button variant="secondary">{t("contact")}</Button></a>
      </div>
    </section>
  );
}
