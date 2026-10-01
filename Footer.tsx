import { getTranslations } from "next-intl/server";
export async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-t border-line">
      <p className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted">{t("rights", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
