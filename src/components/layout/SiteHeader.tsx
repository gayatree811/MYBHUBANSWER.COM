"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { isActivePath, NAV_ITEMS } from "@/lib/navigation";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isPageScrolled = () => window.scrollY > 16;
const isScrolledOnServer = () => false;

/** Clear over each page's dark hero, then solid once the page scrolls. */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isPageScrolled, isScrolledOnServer);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        scrolled && "border-b border-line bg-sand-50/90 shadow-soft backdrop-blur-lg",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo tone={scrolled ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActivePath(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      scrolled
                        ? "text-ink-700 hover:text-strong"
                        : "text-white/90 hover:text-white",
                    )}
                  >
                    {label}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-0.5 h-0.5 origin-left rounded-full bg-saffron-500 transition-transform duration-300 ease-out-soft",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              "grid size-11 place-items-center rounded-control transition-colors",
              scrolled ? "text-strong hover:bg-sand-100" : "text-white hover:bg-white/15",
            )}
          >
            <Icon name="search" />
          </Link>
          <MobileNav onDark={!scrolled} />
        </div>
      </div>
    </header>
  );
}
