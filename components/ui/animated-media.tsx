"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AnimatedMediaProps {
    src: string;
    alt: string;
    /** Which side of the layout the media sits on. Determines the entry corner. */
    side?: "left" | "right";
    /** Container className (e.g. aspect ratio, rounding, borders). */
    className?: string;
    /** Image className passed to next/image. */
    imageClassName?: string;
    /** sizes attribute for next/image. */
    sizes?: string;
    priority?: boolean;
}

export function AnimatedMedia({
    src,
    alt,
    side = "right",
    className,
    imageClassName,
    sizes = "100vw",
    priority = false,
}: AnimatedMediaProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.1,
    });

    const fromLeft = side === "left";

    const initial = {
        opacity: 0,
        x: fromLeft ? -60 : 60,
        y: 80,
        scale: 0.9,
    };

    const final = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
    };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? final : initial}
            transition={{
                duration: isInView ? 0.9 : 0,
                ease: EASE_PREMIUM,
            }}
            style={{
                transformOrigin: fromLeft ? "bottom left" : "bottom right",
            }}
            // ↓ fixes the fill: establishes positioning context + full size
            className={cn(
                "absolute inset-0 will-change-transform",
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={imageClassName}
            />
        </motion.div>
    );
}