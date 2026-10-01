import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
export async function Contact() {
  const t = await getTranslations("Contact");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <Section id="contact" title={t("title")}>
      <p className="max-w-prose text-lg">{t("body")}</p>
      {email && <a className="mt-4 inline-block text-contour underline underline-offset-4" href={`mailto:${email}`}>{email}</a>}
    </Section>
  );
}
