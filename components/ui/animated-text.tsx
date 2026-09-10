"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { useRevealInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  /** Plain text is required for `by="words"` (it needs a string to split on spaces). */
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: "block" | "words";
  delay?: number;
  className?: string;
}

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const wordContainer: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Fades/slides text into view on scroll. `by="words"` staggers each word —
 * reserve that treatment for a single hero moment rather than every heading.
 */
export function AnimatedText({
  children,
  as: Tag = "div",
  by = "block",
  delay = 0,
  className,
}: AnimatedTextProps) {
  const { ref, inView } = useRevealInView<HTMLDivElement>();

  if (by === "words") {
    const words = (typeof children === "string" ? children : String(children)).split(" ");
    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={cn("inline-block", className)}
        variants={wordContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={delay}
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <motion.span className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </motion.span>
    );
  }

  const MotionTag = motion[Tag as "div"];

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={blockVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
