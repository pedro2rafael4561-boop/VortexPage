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
          950: "#0C0614",
          900: "#120A21",
          850: "#161616",
          800: "#1C142A",
          750: "#241A38",
          700: "#2E2248",
          600: "#433261",
          secondary: "#969CA3",
          muted: "#6E7178",
        },
        brand: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
          light: "#A78BFA",
          dark: "#5B13D5",
          muted: "rgba(124, 58, 237, 0.15)",
        },
        surface: {
          base: "#0C0614",
          card: "#161616",
          cardHover: "#1E172A",
          border: "rgba(124, 58, 237, 0.25)",
        },
        text: {
          primary: "#F5F7F8",
          secondary: "#969CA3",
          muted: "#6E7178",
        },
      },
      borderRadius: {
        card: "16px",
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
