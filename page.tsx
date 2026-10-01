import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
export default async function Home() {
  const t = await getTranslations("Hero");
  return (
    <main className="mx-auto max-w-5xl px-5 py-24 md:py-40">
      <h1 className="text-5xl md:text-7xl">{t("name")}</h1>
      <p className="mt-4 max-w-prose text-xl text-muted">{t("tagline")}. {t("intro")}</p>
      <div className="mt-8 flex flex-wrap gap-3"><Button>{t("work")}</Button><Button variant="secondary">{t("contact")}</Button></div>
    </main>
  );
}
