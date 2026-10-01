"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const options = [["en", "English"], ["zh", "中文"], ["es", "Español"]] as const;
export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Nav");
  return (
    <select aria-label={t("language")} value={locale}
      className="min-h-11 rounded-control border border-line bg-surface px-2"
      onChange={(e) => { document.cookie = `locale=${e.target.value}; path=/; max-age=31536000; samesite=lax`; router.refresh(); }}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}
