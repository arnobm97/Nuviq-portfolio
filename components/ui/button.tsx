import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-smooth focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient bg-[length:180%_180%] bg-left text-white shadow-glow hover:bg-right hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_10px_50px_-8px_rgba(59,130,246,0.55)]",
        secondary:
          "bg-white/10 text-ink-100 hover:bg-white/[0.16] light:bg-ink-900/[0.06] light:text-ink-900 light:hover:bg-ink-900/10",
        outline:
          "border border-white/15 text-ink-100 hover:border-white/30 hover:bg-white/5 light:border-ink-900/15 light:text-ink-900 light:hover:border-ink-900/30 light:hover:bg-ink-900/5",
        ghost:
          "text-ink-300 hover:text-ink-100 light:text-ink-500 light:hover:text-ink-900",
        new:
          "bg-white/10 text-ink-100 hover:bg-white/[0.16] light:bg-white/10 text-ink-100  light:hover:bg-white/[0.16]"
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, icon, iconPosition = "right", children, ...props }, ref) => {
    const content = (
      <>
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </>
    );

    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
