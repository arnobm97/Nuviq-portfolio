import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { WorkPreview } from "@/components/sections/work-preview";
import { ServicesPreview } from "@/components/sections/services-preview";
import { ContactCTA } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Nuviq AI Studio designs and builds applied AI systems — strategy, machine learning, computer vision, and automation for teams who need AI that ships.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <ServicesPreview />
      <ContactCTA />
    </>
  );
}
