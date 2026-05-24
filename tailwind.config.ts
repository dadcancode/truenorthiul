import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── COLOR SYSTEM ──────────────────────────────────────────────────────
      colors: {
        // Semantic aliases (used in globals.css vars)
        background: "var(--bg-canvas)",
        foreground: "var(--color-neutral-900)",

        // ── Brand Navy (primary) ──
        "brand-navy": {
          50:  "#EBF2FC",
          100: "#D6E4F7",
          200: "#ADC9EF",
          300: "#84ADE7",
          400: "#5B92DF",
          500: "#3277D7",
          600: "#265080",
          700: "#1E3F6A",
          800: "#163050",
          900: "#0F2240",
          950: "#07142B",
        },

        // ── Brand Teal (secondary / action) ──
        "brand-teal": {
          50:  "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0B7A70",
          800: "#0A6B62",
          900: "#095C54",
        },

        // ── Brand Gold (accent — use sparingly) ──
        "brand-gold": {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#D4AF37",
          600: "#B7881C",
          700: "#926A10",
        },

        // ── Neutrals (Slate-based — cooler gray) ──
        neutral: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },

        // ── Semantic Colors ──
        semantic: {
          "success":     "#059669",
          "success-bg":  "#ECFDF5",
          "warning":     "#D97706",
          "warning-bg":  "#FFFBEB",
          "error":       "#DC2626",
          "error-bg":    "#FEF2F2",
          "info":        "#2563EB",
          "info-bg":     "#EFF6FF",
        },
      },

      // ─── TYPOGRAPHY ────────────────────────────────────────────────────────
      fontFamily: {
        // DM Serif Display — headings, hero text
        display: ['"DM Serif Display"', "Georgia", "serif"],
        // Inter — body, UI, labels
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        // Fallback mono (for code snippets if needed)
        mono: ["'Fira Code'", "Menlo", "monospace"],
      },

      // ─── FONT SIZE SCALE ───────────────────────────────────────────────────
      fontSize: {
        // Micro / label
        "2xs":  ["0.6875rem", { lineHeight: "1.4" }],  // 11px
        micro:  ["0.75rem",   { lineHeight: "1.4" }],  // 12px
        label:  ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }], // 13px
        // Body
        sm:     ["0.875rem",  { lineHeight: "1.5" }],  // 14px
        base:   ["1rem",      { lineHeight: "1.6" }],  // 16px
        lg:     ["1.125rem",  { lineHeight: "1.6" }],  // 18px
        xl:     ["1.25rem",   { lineHeight: "1.65" }], // 20px
        // Headings
        "2xl":  ["1.375rem",  { lineHeight: "1.35" }], // 22px — quiz question
        "3xl":  ["1.75rem",   { lineHeight: "1.25" }], // 28px — section heading
        "4xl":  ["2.25rem",   { lineHeight: "1.2" }],  // 36px — results headline
        "5xl":  ["2.75rem",   { lineHeight: "1.15" }], // 44px — display mobile
        // Display
        "6xl":  ["3.5rem",    { lineHeight: "1.1" }],  // 56px — hero desktop
        // Score display
        "7xl":  ["4.5rem",    { lineHeight: "1.0" }],  // 72px — score number
      },

      // ─── BORDER RADIUS ─────────────────────────────────────────────────────
      borderRadius: {
        none: "0",
        sm:   "6px",
        DEFAULT: "8px",
        md:   "10px",
        lg:   "16px",
        xl:   "24px",
        "2xl":"32px",
        full: "9999px",
      },

      // ─── BOX SHADOWS ───────────────────────────────────────────────────────
      boxShadow: {
        xs:   "0 1px 2px rgba(15, 34, 64, 0.06)",
        sm:   "0 1px 4px rgba(15, 34, 64, 0.08), 0 1px 2px rgba(15, 34, 64, 0.04)",
        md:   "0 4px 12px rgba(15, 34, 64, 0.10), 0 2px 4px rgba(15, 34, 64, 0.06)",
        lg:   "0 10px 30px rgba(15, 34, 64, 0.12), 0 4px 8px rgba(15, 34, 64, 0.06)",
        xl:   "0 20px 50px rgba(15, 34, 64, 0.15), 0 8px 16px rgba(15, 34, 64, 0.08)",
        // Colored shadows for CTAs
        teal: "0 4px 14px rgba(13, 148, 136, 0.35)",
        "teal-lg": "0 6px 20px rgba(13, 148, 136, 0.40)",
        // Focus ring (use ring utilities instead)
        none: "none",
      },

      // ─── SPACING ───────────────────────────────────────────────────────────
      spacing: {
        // Semantic spacing tokens
        "quiz-card-px":  "2.5rem",   // 40px card horizontal padding
        "quiz-card-py":  "2rem",     // 32px card vertical padding
        "section-y":     "5rem",     // 80px section vertical padding
        "hero-y":        "6rem",     // 96px hero vertical padding
        "nav-h":         "4rem",     // 64px nav height
        "answer-h":      "3.25rem",  // 52px minimum answer card height
        "btn-h":         "3.25rem",  // 52px large button height
        "btn-h-sm":      "2.75rem",  // 44px standard button height
      },

      // ─── MAX WIDTHS ────────────────────────────────────────────────────────
      maxWidth: {
        "quiz":    "36rem",   // 576px — quiz card
        "results": "42rem",   // 672px — results card
        "content": "52.5rem", // 840px — hero content
        "page":    "64rem",   // 1024px — page container
      },

      // ─── TRANSITIONS ───────────────────────────────────────────────────────
      transitionDuration: {
        "0":   "0ms",
        "75":  "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "350": "350ms",
        "400": "400ms",
        "500": "500ms",
      },

      transitionTimingFunction: {
        "ease-smooth-in":  "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
        "ease-smooth-out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-in-expo":    "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "ease-out-expo":   "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      // ─── ANIMATIONS ────────────────────────────────────────────────────────
      keyframes: {
        // Quiz step: slide in from right
        "slide-in-right": {
          "0%":   { transform: "translateX(48px)", opacity: "0" },
          "100%": { transform: "translateX(0)",    opacity: "1" },
        },
        // Quiz step: slide out to left
        "slide-out-left": {
          "0%":   { transform: "translateX(0)",    opacity: "1" },
          "100%": { transform: "translateX(-48px)", opacity: "0" },
        },
        // Quiz step: slide in from left (back navigation)
        "slide-in-left": {
          "0%":   { transform: "translateX(-48px)", opacity: "0" },
          "100%": { transform: "translateX(0)",     opacity: "1" },
        },
        // Quiz step: slide out to right (back navigation)
        "slide-out-right": {
          "0%":   { transform: "translateX(0)",    opacity: "1" },
          "100%": { transform: "translateX(48px)", opacity: "0" },
        },
        // General fade in
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Fade in with upward drift
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Fade in with downward drift (for dropdowns, tooltips)
        "fade-in-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Progress dot pulse (on step advance)
        "step-pulse": {
          "0%":   { transform: "scale(1)" },
          "40%":  { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        // Connector fill (for step progress)
        "fill-left-right": {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
        // Results score count up (CSS only rough animation)
        "score-reveal": {
          "0%":   { opacity: "0", transform: "scale(0.85) translateY(12px)" },
          "60%":  { opacity: "1", transform: "scale(1.02) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        // Spin (loading indicator)
        "spin": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // Subtle float (for decorative elements)
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        // Shimmer (for skeleton loading)
        "shimmer": {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        // Checkmark draw (for success states)
        "check-draw": {
          "0%":   { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },

      animation: {
        // Quiz step transitions
        "slide-in-right": "slide-in-right 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "slide-out-left":  "slide-out-left 180ms cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards",
        "slide-in-left":   "slide-in-left 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "slide-out-right": "slide-out-right 180ms cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards",
        // Fades
        "fade-in":     "fade-in 300ms ease-out forwards",
        "fade-in-up":  "fade-in-up 450ms ease-out forwards",
        "fade-in-down":"fade-in-down 250ms ease-out forwards",
        // Progress
        "step-pulse":  "step-pulse 350ms ease-out forwards",
        "fill-ltr":    "fill-left-right 400ms ease-out forwards",
        // Results
        "score-reveal":"score-reveal 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        // Utility
        "spin":        "spin 800ms linear infinite",
        "float":       "float 3s ease-in-out infinite",
        "shimmer":     "shimmer 1.4s linear infinite",
      },

      // ─── BACKGROUND IMAGE ──────────────────────────────────────────────────
      backgroundImage: {
        // Landing page hero gradient
        "hero-gradient": "linear-gradient(160deg, #FFFFFF 0%, #EBF2FC 50%, #F0FDFA 100%)",
        // Results hero gradient
        "results-gradient": "linear-gradient(135deg, #F0FDFA 0%, #EBF2FC 100%)",
        // Dark CTA gradient
        "cta-gradient": "linear-gradient(135deg, #0F2240 0%, #07142B 100%)",
        // Shimmer for skeletons
        "shimmer-gradient": "linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)",
      },

      // ─── Z-INDEX ───────────────────────────────────────────────────────────
      zIndex: {
        "nav":     "50",
        "overlay": "40",
        "modal":   "60",
        "tooltip": "70",
      },

      // ─── SCREEN BREAKPOINTS ────────────────────────────────────────────────
      screens: {
        xs:  "475px",
        sm:  "640px",
        md:  "768px",
        lg:  "1024px",
        xl:  "1280px",
        "2xl": "1536px",
      },
    },
  },

  // ─── PLUGINS ─────────────────────────────────────────────────────────────
  plugins: [
    // Uncomment when installed:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};

export default config;
