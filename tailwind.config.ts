import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B19",
        slate: "#5B5750",
        paper: "#FFFFFF",
        mist: "#F7F5F1",
        mist2: "#F0EDE6",
        maroon: {
          DEFAULT: "#6E1423",
          light: "#8A1C2E",
          dark: "#4E0E19",
        },
        gold: {
          DEFAULT: "#B8862E",
          light: "#D4A85B",
          dark: "#8A6520",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,27,25,0.04), 0 8px 24px -8px rgba(28,27,25,0.10)",
        elevated: "0 4px 12px rgba(28,27,25,0.06), 0 24px 48px -16px rgba(28,27,25,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn 0.8s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
