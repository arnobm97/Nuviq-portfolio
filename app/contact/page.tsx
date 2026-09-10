import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/sections/contact-form";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nuviq AI Studio — tell us about your project.",
};

export default function ContactPage() {
  return (
    <section className="container-px mx-auto max-w-7xl pb-24 pt-32 sm:pb-28 sm:pt-40">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge variant="brand">Contact</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
            Let&rsquo;s build something amazing together.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-300 light:text-ink-500">
            Have a project in mind? Let&rsquo;s talk — tell us what you&rsquo;re working on and
            we&rsquo;ll get back to you within one business day.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-sm text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 light:border-ink-900/10">
                <Mail className="h-4 w-4" />
              </span>
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 text-sm text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 light:border-ink-900/10">
                <Phone className="h-4 w-4" />
              </span>
              {SITE.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-ink-300 light:text-ink-500">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 light:border-ink-900/10">
                <MapPin className="h-4 w-4" />
              </span>
              {SITE.address}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-white/25 hover:text-ink-100 light:border-ink-900/10 light:text-ink-500 light:hover:border-ink-900/25 light:hover:text-ink-900"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>

          {/* Map placeholder — swap for a real embed (Google Maps / Mapbox) when you have an address to point to. */}
          <div className="mt-10 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-sm text-ink-300 light:border-ink-900/15 light:bg-ink-900/[0.02] light:text-ink-500">
            Map placeholder — embed your office location here
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
