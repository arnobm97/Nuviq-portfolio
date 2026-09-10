"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
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

interface WorkCardProps {
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
}

/**
 * Premium easing — smooth, no bounce, no overshoot
 */
const EASE_PREMIUM: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

/**
 * ────────────────────────────────────────────────────────────────────
 * WORK CARD
 * ────────────────────────────────────────────────────────────────────
 *
 * Each project gets its own React component.
 *
 * This is important because React Hooks cannot be called inside
 * projects.map(). Hooks must be called at the top level of a component.
 *
 * The following hooks therefore live here:
 * - useRef
 * - useInView
 * - useTransform
 * - useState
 */
function WorkCard({
  project,
  index,
  scrollYProgress,
  onOpen,
}: WorkCardProps) {
  const mediaFirst = index % 2 === 1;

  // ──────────────────────────────────────────────────────────────────
  // CARD-LEVEL IN-VIEW
  // ──────────────────────────────────────────────────────────────────

  const cardRef = React.useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.2,
  });

  // ──────────────────────────────────────────────────────────────────
  // MEDIA IN-VIEW
  // ──────────────────────────────────────────────────────────────────
  //
  // once: false means the animation can replay whenever the element
  // enters the viewport again.
  //
  // amount: 0.1 means the element only needs roughly 10% visibility
  // before the observer considers it in view.

  const mediaRef = React.useRef<HTMLDivElement>(null);

  const isMediaInView = useInView(mediaRef, {
    once: false,
    amount: 0.1,
  });

  // ──────────────────────────────────────────────────────────────────
  // PARALLAX
  // ──────────────────────────────────────────────────────────────────

  const parallaxOffset = (index + 1) * 20;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset]
  );

  // ──────────────────────────────────────────────────────────────────
  // HOVER TILT STATE
  // ──────────────────────────────────────────────────────────────────

  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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

  // ──────────────────────────────────────────────────────────────────
  // DIRECTIONAL ENTRANCE ANIMATION
  // ──────────────────────────────────────────────────────────────────
  //
  // Direction depends on which side the media appears on.
  //
  // Left side:
  // x = -60
  //
  // Right side:
  // x = +60
  //
  // Both start slightly below their final position.

  const mediaInitial = {
    opacity: 0,
    x: mediaFirst ? -60 : 60,
    y: 80,
    scale: 0.9,
  };

  const mediaFinal = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={
        isInView
          ? {
            opacity: 1,
            y: 0,
          }
          : {
            opacity: 0,
            y: 40,
          }
      }
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
      id={project.slug}
    >
      {/* ══════════════════════════════════════════════════════════════
          TEXT COLUMN
          ══════════════════════════════════════════════════════════════ */}

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

        {/* Technologies */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Case Study Button */}
        <button
          type="button"
          onClick={onOpen}
          className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 transition-colors hover:text-brand-blue-light light:text-ink-900"
        >
          View case study

          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MEDIA COLUMN
          ══════════════════════════════════════════════════════════════ */}

      <motion.div
        ref={mediaRef}
        className={cn(
          "will-change-transform",
          mediaFirst && "lg:order-1"
        )}
        initial={mediaInitial}
        animate={
          isMediaInView
            ? mediaFinal
            : mediaInitial
        }
        transition={{
          // Smooth entrance
          // Instant reset when leaving viewport
          duration: isMediaInView ? 0.9 : 0,
          ease: EASE_PREMIUM,
        }}
        style={{
          transformOrigin: mediaFirst
            ? "bottom left"
            : "bottom right",
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            HOVER / TILT LAYER
            ───────────────────────────────────────────────────────────── */}

        <motion.div
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 light:border-ink-900/10"
          style={{
            rotateX,
            rotateY,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            duration: 0.3,
            ease: EASE_PREMIUM,
          }}
        >
          {/* ─────────────────────────────────────────────────────────
              PARALLAX IMAGE LAYER
              ───────────────────────────────────────────────────────── */}

          <motion.div
            className="relative h-full w-full"
            style={{
              y,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              DARK GRADIENT OVERLAY
              ───────────────────────────────────────────────────────── */}

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

          {/* ─────────────────────────────────────────────────────────
              VIDEO PLAY BUTTON
              ───────────────────────────────────────────────────────── */}

          {project.mediaType === "video" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
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
}

/**
 * ────────────────────────────────────────────────────────────────────
 * WORK LIST
 * ────────────────────────────────────────────────────────────────────
 *
 * Replayable entrance animation:
 *
 * OUT OF VIEWPORT
 *       ↓
 * ENTERS VIEWPORT
 *       ↓
 * Entrance animation plays
 *       ↓
 * FULL STATE
 *       ↓
 * LEAVES VIEWPORT
 *       ↓
 * Animation resets
 *       ↓
 * ENTERS AGAIN
 *       ↓
 * Animation plays again
 *
 * The important difference from the previous implementation is that
 * WorkList itself does NOT call hooks inside projects.map().
 *
 * Instead, every project is rendered as a WorkCard component.
 */
export function WorkList({
  projects = PROJECTS,
}: WorkListProps) {
  const [active, setActive] =
    React.useState<Project | null>(null);

  // ──────────────────────────────────────────────────────────────────
  // SECTION SCROLL PROGRESS
  // ──────────────────────────────────────────────────────────────────

  const sectionRef =
    React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          PROJECT LIST
          ══════════════════════════════════════════════════════════════ */}

      <div
        ref={sectionRef}
        className="space-y-20 sm:space-y-28"
      >
        {projects.map((project, i) => (
          <WorkCard
            key={project.slug}
            project={project}
            index={i}
            scrollYProgress={scrollYProgress}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CASE STUDY MODAL
          ══════════════════════════════════════════════════════════════ */}

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <div>
            {/* Long Description */}
            <p className="text-sm leading-relaxed text-ink-300 light:text-ink-500">
              {active.longDescription}
            </p>

            {/* Technologies */}
            <div className="mt-6 flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="brand"
                >
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