// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111827", // Clean dark gray
        surface: "#1F2937",    // Slightly lighter card background
        primary: "#8B5CF6",    // Soft violet
        primaryHover: "#7C3AED",
        textMain: "#F9FAFB",   // Pure white text
        textMuted: "#9CA3AF",  // Soft gray text
      }
    },
  },
  plugins: [],
}