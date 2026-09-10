import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "border border-white/10 bg-white/5 text-ink-300 light:border-ink-900/10 light:bg-ink-900/5 light:text-ink-500",
        brand: "border border-brand-blue/25 bg-brand-blue/10 text-brand-blue-light",
        teal: "border border-brand-teal/25 bg-brand-teal/10 text-brand-teal",
        outline: "border border-white/15 text-ink-100 light:border-ink-900/15 light:text-ink-900",
      },
      size: {
        sm: "px-2.5 py-1",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
