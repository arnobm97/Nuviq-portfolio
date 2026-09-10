import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-8", className)}>
      <Image
        src="/images/logo.png"
        alt="Nuviq AI Studio Logo"
        width={40}
        height={40}
        className="object-contain rounded-sm"
        priority
      />
    </div>
  );
}

export function Logo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <LogoMark className={iconClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-wide text-ink-100 light:text-ink-500">
          NUVIQ
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-ink-300 light:text-ink-500">
          AI STUDIO
        </span>
      </span>
    </Link>
  );
}