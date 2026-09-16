import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#050507",
          900: "#09090b",
          850: "#0f0f13",
          800: "#15151b",
          700: "#1f1f27",
        },
        vortex: {
          light: "#c084fc",
          DEFAULT: "#8b5cf6",
          dark: "#6d28d9",
          glow: "#a855f7",
        },
      },
      container: {
        padding: "1.25rem",
        center: true,
      },
    },
  },
  plugins: [],
}
export default config
