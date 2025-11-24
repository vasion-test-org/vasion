/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable Tailwind's base styles to avoid conflicts with existing styles
  corePlugins: {
    preflight: false,
  },
}

