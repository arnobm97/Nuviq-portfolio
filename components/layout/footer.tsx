"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SITE, FOOTER_LINKS, SOCIAL_LINKS, SERVICES } from "@/lib/constants";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Placeholder: wire this up to your email provider (see /app/api/contact/route.ts for the pattern).
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="relative border-t border-white/10 bg-navy-950 light:border-ink-900/10 light:bg-paper-50">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-300 light:text-ink-500">
              {SITE.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-white/25 hover:text-ink-100 light:border-ink-900/10 light:text-ink-500 light:hover:border-ink-900/25 light:hover:text-ink-900"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-100 light:text-ink-900">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-300 transition-colors hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.more.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-300 transition-colors hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-100 light:text-ink-900">Services</h4>
            <ul className="mt-4 space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-ink-300 transition-colors hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-100 light:text-ink-900">Newsletter</h4>
            <p className="mt-4 text-sm leading-relaxed text-ink-300 light:text-ink-500">
              Occasional notes on applied AI — no fluff, unsubscribe anytime.
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-1.5 focus-within:border-brand-blue/50 light:border-ink-900/10 light:bg-ink-900/[0.03]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="h-11 w-full bg-transparent text-sm text-ink-100 placeholder:text-ink-300/70 outline-none light:text-ink-900 light:placeholder:text-ink-500/70"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105"
                >
                  {submitted ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
              {submitted && (
                <p className="mt-2 text-xs text-brand-teal">You&rsquo;re on the list — thanks!</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-ink-300 sm:flex-row light:border-ink-900/10 light:text-ink-500">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="transition-colors hover:text-ink-100 light:hover:text-ink-900">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-ink-100 light:hover:text-ink-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
