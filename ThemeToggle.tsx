"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
export function ThemeToggle() {
  const t = useTranslations("Nav");
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return <Button variant="secondary" onClick={toggle} aria-label={t("theme")} className="px-3">{t("theme")}</Button>;
}
