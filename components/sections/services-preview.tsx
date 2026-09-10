import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { HOME_SERVICES_PREVIEW } from "@/lib/constants";

export function ServicesPreview() {
  return (
    <section className="border-y border-white/[0.06] bg-navy-900/40 py-24 sm:py-28 light:border-ink-900/[0.05] light:bg-paper-100/60">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          title="What we build"
          subtitle="Six practice areas, one team — strategy, engineering, and the integration work that connects them."
          link={{ label: "View all services", href: "/services" }}
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES_PREVIEW.map((service) => (
            <RevealItem key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="card-surface group flex h-full flex-col p-6 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-white/[0.14] light:hover:border-ink-900/[0.12]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue-light">
                  <service.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-base font-medium tracking-tight text-ink-100 light:text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300 light:text-ink-500">
                  {service.shortDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue-light opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
