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
          950: "#050505",
          900: "#0A0A0A",
          850: "#141414",
          800: "#1A1A1A",
          700: "#2A2A2A",
          600: "#3A3A3A",
        },
        brand: {
          DEFAULT: "#E50914",
          hover: "#B80710",
          light: "#FF3A2F",
          muted: "rgba(229, 9, 20, 0.15)",
        },
        surface: {
          base: "#0A0A0A",
          card: "#141414",
          cardHover: "#1A1A1A",
          border: "#2A2A2A",
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
