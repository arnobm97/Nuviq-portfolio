import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ContactCTA } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI strategy, NLP & chatbot development, machine learning, data engineering, computer vision, and AI integration & automation.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pb-16 pt-32 sm:pt-40">
        <Reveal className="max-w-2xl">
          <Badge variant="brand">Services</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-100 sm:text-5xl light:text-ink-900">
            End-to-end AI, from first model to production system.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-300 light:text-ink-500">
            We offer end-to-end AI solutions tailored to your business needs — pick a single
            engagement or lean on us for the full build.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 sm:pb-28">
        <ServicesGrid />
      </section>

      <ContactCTA />
    </>
  );
}
