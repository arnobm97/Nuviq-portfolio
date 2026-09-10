import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  link?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "left", link, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "left" ? "sm:flex-row sm:items-end sm:justify-between" : "items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-xl", align === "center" && "mx-auto")}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-100 md:text-4xl light:text-ink-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base leading-relaxed text-ink-300 light:text-ink-500">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
