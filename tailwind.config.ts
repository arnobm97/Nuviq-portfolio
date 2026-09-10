import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Core brand navy — primary deep blue surface colors
        navy: {
          950: "#060B16", // page background, dark mode base
          900: "#0A1628", // primary deep blue (brief spec)
          800: "#0F1F3D", // elevated surfaces / cards
          700: "#1A2A4A", // lighter panels (brief spec)
          600: "#243657",
          border: "#1E2E4D",
        },
        // Accent trio: blue / indigo / teal gradient family
        brand: {
          blue: "#3B82F6",
          "blue-light": "#60A5FA",
          indigo: "#6366F1",
          teal: "#2DD4BF",
        },
        paper: {
          50: "#F7F9FC",
          100: "#FFFFFF",
          200: "#EEF2F8",
          300: "#DFE6F0",
        },
        ink: {
          900: "#0A1628",
          700: "#334155",
          500: "#64748B",
          300: "#96A3B8",
          100: "#F5F7FA",
        },
      },
      fontFamily: {
        // Geist Sans for display/headings — set via the `geist` package in app/layout.tsx
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        // Inter for body copy — set via next/font/google in app/layout.tsx
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        // Geist Mono for small data labels (tags, dates) — used sparingly
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #6366F1 55%, #2DD4BF 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(59,130,246,0.16) 0%, rgba(99,102,241,0.12) 55%, rgba(45,212,191,0.14) 100%)",
        "radial-fade": "radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.20) 0%, rgba(6,11,22,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,130,246,0.15), 0 8px 40px -8px rgba(59,130,246,0.35)",
        "glow-teal": "0 0 0 1px rgba(45,212,191,0.15), 0 8px 40px -8px rgba(45,212,191,0.3)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.5)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [
    // Mirrors Tailwind's built-in `dark:` variant so components can opt in
    // to explicit light-mode overrides, since dark is our default theme.
    plugin(({ addVariant }) => {
      addVariant("light", ":where(.light) &");
    }),
  ],
};

export default config;
