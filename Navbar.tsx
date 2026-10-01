import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
export const navKeys = ["about", "skills", "projects", "contact"] as const;
export async function Navbar() {
  const t = await getTranslations("Nav");
  const links = navKeys.map((k) => ({ href: `#${k}`, label: t(k) }));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center justify-between px-5 py-2">
        <a href="#top" className="font-display text-xl font-semibold">PRK</a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => <li key={l.href}><a href={l.href} className="hover:text-contour">{l.label}</a></li>)}
        </ul>
        <div className="hidden items-center gap-2 md:flex"><LocaleSwitcher /><ThemeToggle /></div>
        <MobileMenu links={links} label={t("menu")}><LocaleSwitcher /><ThemeToggle /></MobileMenu>
      </nav>
    </header>
  );
}
