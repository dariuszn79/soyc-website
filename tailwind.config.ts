import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: { preflight: true },
  theme: {
    extend: {
      colors: {
        brand: {
          "primary-100": withOpacity("--brand-primary-100"),
          "primary-hover": withOpacity("--brand-primary-hover"),
          "secondary-100": withOpacity("--brand-secondary-100"),
          "secondary-hover": withOpacity("--brand-secondary-hover"),
          "tertiary-100": withOpacity("--brand-tertiary-100"),
          border: "rgb(var(--brand-border) / 0.15)",
          ink: withOpacity("--brand-ink"),
          muted: withOpacity("--brand-muted"),
          rule: withOpacity("--brand-rule"),
          "rule-strong": withOpacity("--brand-rule-strong"),
          tint: withOpacity("--brand-tint"),
        },
        text: {
          primary: withOpacity("--text-primary"),
          secondary: withOpacity("--text-secondary"),
          tertiary: withOpacity("--text-tertiary"),
          light: withOpacity("--text-light"),
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        baskerville: ["baskerville", "Georgia", "serif"],
        gill: ['"gill-sans"', '"gill-sans-nova"', "Optima", "sans-serif"],
        button: ['"gill-sans-nova"', '"Gill Sans Nova"', "Optima", "sans-serif"],
      },
      fontSize: {
        button: ["var(--button-font-size)", { lineHeight: "var(--button-line-height)" }],
        display: ["var(--type-display)", { lineHeight: "var(--leading-display)" }],
        "heading-xl": ["var(--type-heading-xl)", { lineHeight: "var(--leading-heading)" }],
        "heading-lg": ["var(--type-heading-lg)", { lineHeight: "var(--leading-heading)" }],
        "heading-md": ["var(--type-heading-md)", { lineHeight: "var(--leading-heading)" }],
        "heading-sm": ["var(--type-heading-sm)", { lineHeight: "var(--leading-heading)" }],
        "heading-xs": ["var(--type-heading-xs)", { lineHeight: "var(--leading-heading)" }],
        person: ["var(--type-person)", { lineHeight: "var(--leading-heading)" }],
        "person-title": ["var(--type-person-title)", { lineHeight: "var(--leading-heading)" }],
        "body-lg": ["var(--type-body-lg)", { lineHeight: "var(--leading-body-lg)" }],
        body: ["var(--type-body)", { lineHeight: "var(--leading-body)" }],
        "body-sm": ["var(--type-body-sm)", { lineHeight: "var(--leading-body-sm)" }],
        label: ["var(--type-label)", { lineHeight: "var(--leading-label)" }],
        caption: ["var(--type-caption)", { lineHeight: "var(--leading-caption)" }],
      },
      fontWeight: {
        button: "500",
      },
      lineHeight: {
        button: "var(--button-line-height)",
        display: "var(--leading-display)",
        heading: "var(--leading-heading)",
        "body-lg": "var(--leading-body-lg)",
        body: "var(--leading-body)",
        "body-sm": "var(--leading-body-sm)",
        label: "var(--leading-label)",
        caption: "var(--leading-caption)",
      },
      letterSpacing: {
        button: "var(--button-letter-spacing)",
        overline: "var(--tracking-overline)",
      },
      spacing: {
        "spacing-xxs": "var(--spacing-xxs)",
        "spacing-xs": "var(--spacing-xs)",
        "spacing-sm": "var(--spacing-sm)",
        "spacing-md": "var(--spacing-md)",
        "spacing-lg": "var(--spacing-lg)",
        "spacing-tight": "var(--spacing-tight)",
        "spacing-xl": "var(--spacing-xl)",
        "spacing-card-x": "var(--spacing-card-x)",
        "spacing-card-y": "var(--spacing-card-y)",
        "spacing-section-x": "var(--spacing-section-x)",
        "spacing-section-y": "var(--spacing-section-y)",
        "spacing-section-gap": "var(--spacing-section-gap)",
        "spacing-fee": "var(--spacing-fee)",
        "spacing-compact": "var(--spacing-compact)",
        "spacing-footer-y": "var(--spacing-footer-y)",
        "spacing-hero-x": "var(--spacing-hero-x)",
        "spacing-content-right": "var(--spacing-content-right)",
        "spacing-overline": "var(--spacing-overline)",
        "spacing-overline-lg": "var(--spacing-overline-lg)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [tailwindcssAnimate, typography],
  darkMode: ["class"],
} satisfies Config;
