import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f0ff",
          100: "#e0e0ff",
          200: "#c4b5fd",
          300: "#a78bfa",
          400: "#8b5cf6",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
        },
        candy: {
          pink: "#f472b6",
          orange: "#fb923c",
          yellow: "#fbbf24",
          green: "#34d399",
          blue: "#38bdf8",
          purple: "#a78bfa",
          red: "#f87171",
        },
        surface: {
          0: "#fafbff",
          1: "#f1f3f9",
          2: "#e8ecf4",
          3: "#dde2ed",
        },
      },
      fontFamily: {
        display: ['"Fredoka"', "sans-serif"],
        body: ['"Nunito"', "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "bounce-in": "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
        "pop": "pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
