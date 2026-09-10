import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { AnimatedMedia } from "@/components/ui/animated-media";
import { ContactCTA } from "@/components/sections/contact-cta";
import { VALUES, TEAM, TIMELINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are a team of AI enthusiasts, engineers, and creators building intelligent solutions that solve real-world problems.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pb-20 pt-32 sm:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge variant="brand">About Nuviq</Badge>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
              We build the AI systems your business actually needs.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300 light:text-ink-500">
              We are a team of AI enthusiasts, engineers, and creators building intelligent
              solutions that solve real-world problems.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-300 light:text-ink-500">
              Founded in Dhaka and now working with clients across logistics, fintech, and
              manufacturing, we keep our team deliberately small and senior — every engagement
              is staffed by people who&apos;ve shipped models to production, not just notebooks.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 light:border-ink-900/10">
              {VALUES.map((value) => (
                <div key={value.title}>
                  <value.icon className="h-5 w-5 text-brand-blue-light" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-medium text-ink-100 light:text-ink-900">
                    {value.title}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── FIRST IMAGE — now with replayable scroll entrance ── */}
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 light:border-ink-900/10">
              <AnimatedMedia
                src="/images/about-mission.jpg"
                alt="Abstract network visualization representing Nuviq's AI systems"
                side="right"
                sizes="(min-width: 1024px) 45vw, 100vw"
                imageClassName="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values, expanded — unchanged */}
      <section className="border-y border-white/[0.06] bg-navy-900/40 py-20 light:border-ink-900/[0.05] light:bg-paper-100/60">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-100 light:text-ink-900">
            What guides the work
          </h2>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <RevealItem key={value.title}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue-light">
                    <value.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink-100 light:text-ink-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300 light:text-ink-500">
                    {value.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team — unchanged */}
      <section className="container-px mx-auto max-w-7xl py-20 sm:py-24">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-100 light:text-ink-900">
          The people behind it
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-300 light:text-ink-500">
          A small, senior team spanning strategy, ML engineering, and product design.
        </p>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <RevealItem key={member.name}>
              <div className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 light:border-ink-900/10">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Nuviq AI Studio`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-display text-base font-medium tracking-tight text-ink-100 light:text-ink-900">
                  {member.name}
                </p>
                <p className="text-sm text-ink-300 light:text-ink-500">{member.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Timeline — unchanged */}
      <section className="border-t border-white/[0.06] py-20 light:border-ink-900/[0.05]">
        <div className="container-px mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-100 light:text-ink-900">
            How we got here
          </h2>
          <div className="mt-10 space-y-0">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <div className="flex gap-6 border-t border-white/10 py-6 first:border-t-0 light:border-ink-900/10">
                  <span className="w-16 shrink-0 font-mono text-sm text-brand-blue-light">
                    {item.year}
                  </span>
                  <div>
                    <p className="font-display text-base font-medium tracking-tight text-ink-100 light:text-ink-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-300 light:text-ink-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}