"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition(24);
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth",
        scrolled || open ? "glass-surface shadow-[0_1px_0_0_rgba(255,255,255,0.06)]" : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-ink-100 light:text-ink-500 light:bg-ink-700"
                    : "text-ink-300 hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] light:bg-ink-900/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button href="/contact" size="sm" className="hidden lg:inline-flex">
            Let&rsquo;s Talk
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 light:border-ink-900/10 light:bg-ink-900/5 light:text-ink-900 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden glass-surface border-t border-white/10 lg:hidden light:border-ink-900/10"
          >
            <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-white/[0.06] text-ink-100 light:bg-ink-900/[0.06] light:text-ink-900"
                      : "text-ink-300 hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4 light:border-ink-900/10">
                <span className="text-sm text-ink-300 light:text-ink-500">Appearance</span>
                <ThemeToggle />
              </div>
              <Button href="/contact" className="mt-3 w-full">
                Let&rsquo;s Talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
