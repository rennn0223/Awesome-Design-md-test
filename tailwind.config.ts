import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      spacing: {
        "xxs": "2px",
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
        "xxl": "32px",
        "section": "64px",
      },
      colors: {
        primary: {
          DEFAULT: "#76b900",
          dark: "#5a8d00",
          pale: "#bff230",
        },
        "on-primary": "#000000",
        canvas: "#ffffff",
        "surface-soft": "#f7f7f7",
        "surface-dark": "#000000",
        "surface-elevated": "#1a1a1a",
        hairline: {
          DEFAULT: "#cccccc",
          strong: "#5e5e5e",
        },
        ink: "#000000",
        body: "#1a1a1a",
        mute: "#757575",
        stone: "#898989",
        ash: "#a7a7a7",
        "on-dark": "#ffffff",
        "on-dark-mute": "rgba(255,255,255,0.7)",
        "link-blue": "#0046a4",
        error: "#e52020",
        "error-deep": "#650b0b",
        warning: "#df6500",
        "warning-bright": "#ef9100",
        "success-deep": "#3f8500",
        "accent-purple": "#952fc6",
        "accent-purple-deep": "#4d1368",
        "accent-purple-pale": "#f9d4ff",
        "accent-yellow-pale": "#feeeb2",
      },
      borderRadius: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        full: "9999px",
      },
      maxWidth: {
        "content": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
