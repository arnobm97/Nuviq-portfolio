// components/ui/floating-buttons-enhanced.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
    const [showScrollTop, setShowScrollTop] = React.useState(false);
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [showWhatsAppTooltip, setShowWhatsAppTooltip] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setScrollProgress(progress);
            setShowScrollTop(scrollTop > 300);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    React.useEffect(() => {
        // Show WhatsApp tooltip after 3 seconds
        const timer = setTimeout(() => {
            setShowWhatsAppTooltip(true);
        }, 3000);

        // Hide after 8 seconds
        const hideTimer = setTimeout(() => {
            setShowWhatsAppTooltip(false);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Progress bar at top */}
            <div
                className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue-light transition-all duration-300 ease-smooth"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* WhatsApp Button - Bottom Right */}
            <div className="fixed bottom-6 right-6 z-40">
                <div className="relative">
                    <motion.a
                        href={`https://wa.me/+8801843377575?text=${encodeURIComponent("Hello! I'm interested in your AI solutions.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:shadow-xl"
                        aria-label="Contact on WhatsApp"
                    >
                        <MessageCircle className="h-7 w-7" />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 animate-ping rounded-full bg-[#25D366]" />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 rounded-full bg-[#25D366]" />
                    </motion.a>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {showWhatsAppTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-navy-950"
                            >
                                Chat with us on WhatsApp!
                                <button
                                    onClick={() => setShowWhatsAppTooltip(false)}
                                    className="ml-2 text-white/60 hover:text-white dark:text-navy-950/60 dark:hover:text-navy-950"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Scroll to Top Button - Bottom Left */}
            <div className="fixed bottom-6 left-6 z-40">
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollToTop}
                            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:shadow-xl dark:bg-navy-800 dark:shadow-navy-900/50"
                            aria-label="Scroll to top"
                        >
                            {/* Progress Ring */}
                            <svg className="absolute inset-0 h-full w-full -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="26"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-ink-200/30 dark:text-white/10"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="26"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-brand-blue-light transition-all duration-300 ease-smooth"
                                    strokeDasharray="163.36"
                                    strokeDashoffset={163.36 - (scrollProgress / 100) * 163.36}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Arrow Icon */}
                            <ArrowUp className="relative z-10 h-5 w-5 text-navy-950 transition-colors group-hover:text-brand-blue dark:text-white dark:group-hover:text-brand-blue-light" />

                            {/* Percentage badge */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-navy-950 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-navy-950">
                                {Math.round(scrollProgress)}%
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}