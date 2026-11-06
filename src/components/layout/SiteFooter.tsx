import Link from "next/link";
import { FOOTER_LINKS, NAV_ITEMS } from "@/lib/navigation";
import { Container } from "@/components/layout/Container";
import { Logo, TempleMark } from "@/components/layout/Logo";

const linkClass =
  "inline-block py-1 text-ink-300 transition duration-200 hover:translate-x-1 hover:text-white";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
      <TempleMark className="absolute -right-16 -bottom-24 -z-10 size-96 text-white/4 md:size-[32rem]" />
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm leading-relaxed text-ink-300">
            Everything you need to know, do, discover and experience in Bhubaneswar, in one place.
          </p>
        </div>

        <nav aria-label="Footer sections">
          <h2 className="mb-3 text-sm font-semibold text-white">Discover</h2>
          <ul>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer information">
          <h2 className="mb-3 text-sm font-semibold text-white">Information</h2>
          <ul>
            {FOOTER_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="border-t border-white/10 py-6 text-sm text-ink-300">
        <p>© {new Date().getFullYear()} MyBhubaneswar.com. All rights reserved.</p>
      </Container>
    </footer>
  );
}
