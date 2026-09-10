import { SectionHeader } from "@/components/ui/section-header";
import { WorkList } from "@/components/sections/work-list";
import { FEATURED_PROJECTS } from "@/lib/constants";

export function WorkPreview() {
  return (
    <section id="work-preview" className="container-px mx-auto max-w-7xl py-24 sm:py-28">
      <SectionHeader
        title="Selected work"
        subtitle="A few of the systems we've taken from prototype to production."
        link={{ label: "View all work", href: "/our-work" }}
      />

      <div className="mt-14 sm:mt-16">
        <WorkList projects={FEATURED_PROJECTS} />
      </div>
    </section>
  );
}

