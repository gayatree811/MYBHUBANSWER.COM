"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { isActivePath, NAV_ITEMS } from "@/lib/navigation";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";

/**
 * Uses the browser's native dialog, which keeps keyboard focus inside the
 * menu and closes on Escape without any extra code or packages.
 */
export function MobileNav({ onDark }: { onDark: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className={cn(
          "grid size-11 place-items-center rounded-control transition-colors lg:hidden",
          onDark ? "text-white hover:bg-white/15" : "text-strong hover:bg-sand-100",
        )}
      >
        <Icon name="menu" className="size-6" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        className="mobile-menu fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(88vw,24rem)] max-w-none bg-ink-950 p-0 text-white backdrop:bg-ink-950/60 backdrop:backdrop-blur-sm lg:hidden"
      >
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between">
            <Logo tone="light" onClick={close} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="grid size-11 place-items-center rounded-control hover:bg-white/10"
            >
              <Icon name="x" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ href, label, description, icon }) => {
                const active = isActivePath(pathname, href);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-4 rounded-card p-3 transition-colors",
                        active ? "bg-white/10" : "hover:bg-white/5",
                      )}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-control bg-white/10 text-saffron-400">
                        <Icon name={icon} />
                      </span>
                      <span>
                        <span className="block font-semibold">{label}</span>
                        <span className="block text-sm text-ink-300">{description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
