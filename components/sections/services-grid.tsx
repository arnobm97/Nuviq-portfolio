"use client";

import * as React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import type { Service } from "@/types";

export function ServicesGrid() {
  const [active, setActive] = React.useState<Service | null>(null);

  return (
    <>
      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <RevealItem key={service.slug}>
            <div
              id={service.slug}
              className="card-surface flex h-full scroll-mt-28 flex-col p-7 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-white/[0.14] light:hover:border-ink-900/[0.12]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue-light">
                <service.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink-100 light:text-ink-900">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300 light:text-ink-500">
                {service.shortDescription}
              </p>
              <button
                type="button"
                onClick={() => setActive(service)}
                className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div>
            <p className="text-sm leading-relaxed text-ink-300 light:text-ink-500">
              {active.description}
            </p>
            <ul className="mt-6 space-y-3">
              {active.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-100 light:text-ink-900">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-8">
              Start a conversation
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
