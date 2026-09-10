"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Thin wrapper around framer-motion's useInView with sensible defaults
 * for scroll-reveal sections: fires once, slightly before the element
 * fully enters the viewport.
 */
export function useRevealInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  return { ref, inView };
}
