"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface WorkListProps {
  projects?: Project[];
}

/** Premium easing — smooth, no bounce, no overshoot */
const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * ────────────────────────────────────────────────────────────────────
 *  REPLAYABLE ENTRANCE ANIMATION
 * ────────────────────────────────────────────────────────────────────
 *  Cycle (infinite, both scroll directions):
 *
 *    OUT OF VIEWPORT
 *          ↓
 *    ENTERS VIEWPORT  →  play entrance (900ms, smooth)
 *          ↓
 *    FULL STATE       →  hover layer is now free to respond
 *          ↓
 *    LEAVES VIEWPORT  →  instant reset to initial state (0ms, invisible)
 *          ↓
 *    ENTERS AGAIN     →  play entrance again
 *          ↓
 *        ... repeat ...
 *
 *  Implementation notes:
 *   • `once: false` keeps the IntersectionObserver alive forever.
 *   • Conditional transition duration (900ms in / 0ms out) makes the
 *     reset instantaneous so the user never sees a reverse animation.
 *   • Reset threshold is low (`amount: 0.1`) so the reset fires only
 *     when the element is ~90% off-screen — no visible jump.
 * ────────────────────────────────────────────────────────────────────
 */
export function WorkList({ projects = PROJECTS }: WorkListProps) {
  const [active, setActive] = React.useState<Project | null>(null);

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <div ref={sectionRef} className="space-y-20 sm:space-y-28">
        {projects.map((project, i) => {
          const mediaFirst = i % 2 === 1;

          // Card-level in-view (text column) — unchanged
          const cardRef = React.useRef<HTMLDivElement>(null);
          const isInView = useInView(cardRef, { once: false, amount: 0.2 });

          // ── MEDIA in-view — REPLAYABLE (once: false) ────────────────
          //  Fires true every time element enters viewport (any direction).
          //  Fires false every time element leaves viewport.
          //  Observer is NEVER disconnected.
          const mediaRef = React.useRef<HTMLDivElement>(null);
          const isMediaInView = useInView(mediaRef, {
            once: false,          // ← critical: keep observing forever
            amount: 0.1,          // ← low threshold so reset happens off-screen
          });

          // Parallax translateY (Layer 3) — unchanged
          const parallaxOffset = (i + 1) * 20;
          const y = useTransform(
            scrollYProgress,
            [0, 1],
            [parallaxOffset, -parallaxOffset]
          );

          // Hover tilt state (Layer 2) — unchanged
          const [rotateX, setRotateX] = React.useState(0);
          const [rotateY, setRotateY] = React.useState(0);

          const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const yPos = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            setRotateX(((yPos - centerY) / centerY) * -6);
            setRotateY(((x - centerX) / centerX) * 6);
          };

          const handleMouseLeave = () => {
            setRotateX(0);
            setRotateY(0);
          };

          // ── Directional entrance variants ───────────────────────────
          //   Direction depends ONLY on side (mediaFirst), never on scroll.
          const mediaInitial = {
            opacity: 0,
            x: mediaFirst ? -60 : 60,   // left → -60 ; right → +60
            y: 80,                       // both start below final position
            scale: 0.9,                  // both start slightly smaller
          };

          const mediaFinal = {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          };

          return (
            <motion.div
              key={project.slug}
              ref={cardRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              id={project.slug}
            >
              {/* ═══════════════ TEXT COLUMN (unchanged) ═══════════════ */}
              <div className={cn(mediaFirst && "lg:order-2")}>
                <span className="font-mono text-xs tracking-wide text-brand-blue-light">
                  {project.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl light:text-ink-900">
                  {project.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-300 light:text-ink-500">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
                >
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* ═══════════════ MEDIA COLUMN ═══════════════ */}

              {/* ── LAYER 1 · ENTRANCE — REPLAYS on every enter ───── */}
              <motion.div
                ref={mediaRef}
                className={cn(
                  "will-change-transform",
                  mediaFirst && "lg:order-1"
                )}
                initial={mediaInitial}
                animate={isMediaInView ? mediaFinal : mediaInitial}
                transition={{
                  // 900ms smooth on entry; 0ms instant on exit
                  // so the reset is invisible to the user.
                  duration: isMediaInView ? 0.9 : 0,
                  ease: EASE_PREMIUM,
                }}
                style={{
                  transformOrigin: mediaFirst ? "bottom left" : "bottom right",
                }}
              >
                {/* ── LAYER 2 · HOVER — unchanged ──────────────────── */}
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 light:border-ink-900/10"
                  style={{
                    rotateX,
                    rotateY,
                    transition: "transform 0.1s ease-out",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                >
                  {/* ── LAYER 3 · PARALLAX — unchanged ───────────── */}
                  <motion.div
                    className="relative h-full w-full"
                    style={{ y }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

                  {project.mediaType === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                        <Play
                          className="h-5 w-5 translate-x-0.5"
                          fill="currentColor"
                        />
                      </span>
                    </span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ═══════════════ MODAL (unchanged) ═══════════════ */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <div>
            <p className="text-sm leading-relaxed text-ink-300 light:text-ink-500">
              {active.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <Badge key={tech} variant="brand">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}