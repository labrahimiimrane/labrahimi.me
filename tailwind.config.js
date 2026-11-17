/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Map Tailwind color names to the design tokens defined in app/globals.css
      colors: {
        border: "var(--border-color)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        subtle: "var(--text-subtle)",
      },
    },
  },
  plugins: [],
}

module.exports = config
