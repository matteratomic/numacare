import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        "primary-dark": "#0284c7",
        "primary-muted": "#e0f2fe",
        slateglass: "rgba(15, 23, 42, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(15, 118, 176, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
