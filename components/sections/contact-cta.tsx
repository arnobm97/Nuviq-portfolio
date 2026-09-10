import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="container-px mx-auto max-w-7xl py-24 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900 px-8 py-16 text-center light:border-ink-900/10 light:bg-navy-900 sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-teal/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-indigo/25 blur-[100px]" />

        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-300">
            Tell us what you&rsquo;re trying to build. We&rsquo;ll reply within one business day
            with next steps — no sales deck required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" icon={<ArrowUpRight className="h-4 w-4" />}>
              Let&rsquo;s Talk
            </Button>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-300 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
