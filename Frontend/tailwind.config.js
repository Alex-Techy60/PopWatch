// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0f',
        surface: {
          DEFAULT: '#12121a',
          elevated: '#1a1a27',
        },
        primary: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          glow: 'rgba(124, 58, 237, 0.3)',
        },
        accent: '#a78bfa',
        text: {
          primary: '#f0f0ff',
          secondary: '#a0a0b8',
        },
        border: 'rgba(124, 58, 237, 0.2)',
        error: '#ef4444',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
}