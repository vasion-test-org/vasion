/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],

  // Safelist ensures these classes are always generated
  safelist: [
    'bg-purple',
    'bg-purple-dark',
    'bg-white',
    'bg-transparent',
    'text-white',
    'text-txt-primary',
    'max-w-326',
    'max-w-full',
    'list-none',
    'p-15',
    'py-15',
    'pt-15',
    'pb-15',
    'rounded-3xl',
    'rounded-4xl',
  ],

  theme: {
    extend: {
      // Custom breakpoints (isolated ranges - NOT mobile-first cascade)
      // These MUST stay here - CSS @theme doesn't support min/max ranges
      // sm = mobile only (max 480px)
      // md = tablet only (481-1024px)
      // lg = desktop only (1025-1600px)
      // xl = full width (1601px+)
      screens: {
        sm: { max: '480px' },
        md: { min: '481px', max: '1024px' },
        lg: { min: '1025px', max: '1600px' },
        xl: { min: '1601px' },
      },

      // Background gradients (reference CSS custom properties from globals.css)
      backgroundImage: {
        'purple-orbital': 'var(--gradient-purple-orbital)',
        'purple-gradient': 'var(--gradient-purple)',
        'orange-gradient': 'var(--gradient-orange)',
        'grey-gradient': 'var(--gradient-grey)',
        'light-purple': 'var(--gradient-light-purple)',
        'dark-purple': 'var(--gradient-dark-purple)',
        'medium-purple': 'var(--gradient-medium-purple)',
        footer: 'var(--gradient-footer)',
      },
    },
  },

  plugins: [],
};
