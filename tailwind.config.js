/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: '480px' },
        tablet: { min: '481px', max: '1024px' },
        desktop: { min: '1025px', max: '1600px' },
        fullWidth: { min: '1601px' },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Enable all core plugins
  },
};

