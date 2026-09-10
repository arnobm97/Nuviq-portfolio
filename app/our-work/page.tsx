import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { WorkList } from "@/components/sections/work-list";
import { ContactCTA } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies in applied AI: analytics dashboards, industrial automation, conversational assistants, and predictive maintenance.",
};

export default function OurWorkPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pb-16 pt-32 sm:pt-40">
        <Reveal className="max-w-2xl">
          <Badge variant="brand">Our Work</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
            Systems we&rsquo;ve taken from prototype to production.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-300 light:text-ink-500">
            Four case studies, four different problems — a shared approach: understand the
            workflow first, then build the smallest model that reliably improves it.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 sm:pb-28">
        <WorkList />
      </section>

      <ContactCTA />
    </>
  );
}
