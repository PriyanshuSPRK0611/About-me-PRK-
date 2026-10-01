import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
export const locales = ["en", "zh", "es"] as const;
export type Locale = (typeof locales)[number];
export default getRequestConfig(async () => {
  const c = (await cookies()).get("locale")?.value;
  const locale: Locale = locales.includes(c as Locale) ? (c as Locale) : "en";
  return { locale, messages: (await import(`./messages/${locale}.json`)).default };
});
