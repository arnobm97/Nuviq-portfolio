import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-ink-100 placeholder:text-ink-300/70 outline-none transition-colors",
        "focus:border-brand-blue/50 focus:bg-white/[0.06]",
        "light:border-ink-900/10 light:bg-ink-900/[0.03] light:text-ink-900 light:placeholder:text-ink-500/70 light:focus:border-brand-blue/50 light:focus:bg-white",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-300/70 outline-none transition-colors",
        "focus:border-brand-blue/50 focus:bg-white/[0.06]",
        "light:border-ink-900/10 light:bg-ink-900/[0.03] light:text-ink-900 light:placeholder:text-ink-500/70 light:focus:border-brand-blue/50 light:focus:bg-white",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-ink-300 light:text-ink-500", className)}
      {...props}
    />
  );
}
