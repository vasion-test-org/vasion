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
      // Breakpoints (renamed from mob/tab/desk/fw to sm/md/lg/xl)
      // sm = mobile (max 480px)
      // md = tablet (481-1024px)
      // lg = desktop (1025-1600px)
      // xl = full width (1601px+)
      screens: {
        sm: { max: '480px' },
        md: { min: '481px', max: '1024px' },
        lg: { min: '1025px', max: '1600px' },
        xl: { min: '1601px' },
      },

      // Colors from styles/colors.js
      colors: {
        // Yellow palette
        yellow: {
          dark: '#D3A809',
          DEFAULT: '#FFCB04',
          500: '#FFDB4F',
          400: '#FFE068',
          300: '#FFE582',
          200: '#FFF5CD',
          100: '#FFFAE6',
        },
        // Teal palette
        teal: {
          dark: '#007C77',
          DEFAULT: '#00A19B',
          500: '#33B4AF',
          400: '#66C7C3',
          300: '#99DAD7',
          200: '#CCECEB',
          100: '#E5F6F5',
        },
        // Purple palette
        purple: {
          navy: '#090121',
          border: '#945AEE',
          light: '#7E5FDD',
          medium: '#583F99',
          sysLight: '#b19cf1',
          dark: '#201435',
          DEFAULT: '#3D2562',
          500: '#6A2C6A',
          400: '#8B5B8B',
          300: '#AC8AAC',
          200: '#CBBFF1',
          100: '#E6DFF8',
          tag: '#E5DFF8',
          gray50: '#ECE9EF',
          lightGrey: '#F5F4F7',
          reddit: '#190C31',
        },
        // Pink
        pink: {
          DEFAULT: '#DD5FC1',
        },
        // Orange palette
        orange: {
          dark: '#CC4800',
          DEFAULT: '#ff5100',
          500: '#FF612A',
          400: '#FF854d',
          300: '#FFAD80',
          200: '#FFCBB2',
          100: '#FFEEE5',
        },
        // Text colors
        txt: {
          primary: '#1B1D21',
          subtle: '#808085',
        },
        // Grey palette
        grey: {
          800: '#191D1E',
          750: '#292B2C',
          700: '#38383D',
          600: '#5E5F61',
          500: '#838587',
          400: '#A8ABAE',
          300: '#BBBEC1',
          200: '#C2C5C7',
          100: '#CFD2D4',
          ghost: '#C8C9CE',
          75: '#DDDFE0',
          50: '#EBECEC',
          25: '#F6F7F7',
        },
      },

      // Font families
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        'archivo-bold': ['Archivo Bold', 'sans-serif'],
        orbitron: ['Orbitron Regular', 'sans-serif'],
      },

      // Font sizes mapped from styles/text.js
      // Duplicates removed: h1-md = h1, h2-md = h2, h3-md = h3, h4-md = h4, h5-md = h5, giant-md = giant
      // Renamed: -mob → -sm, -desk → -lg, -tab → -md (removed if same as base)
      fontSize: {
        // Giant - 100px base (same at md)
        giant: ['6.25rem', { lineHeight: '6.875rem', fontWeight: '700' }],
        'giant-lg': ['6.944rem', { lineHeight: '7.639rem', fontWeight: '700' }],

        // Stat - 48px
        stat: ['3rem', { lineHeight: '3.625rem', fontWeight: '500' }],

        // H1 - 46px base (same at md)
        h1: ['2.875rem', { lineHeight: '3.5rem', fontWeight: '800' }],
        'h1-lg': ['3.188rem', { lineHeight: '3.875rem', fontWeight: '800' }],
        'h1-sm': ['2.25rem', { lineHeight: '2.813rem', fontWeight: '800' }],

        // H2 - 46px base (same at md)
        h2: ['2.875rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        'h2-lg': ['3.188rem', { lineHeight: '3.875rem', fontWeight: '700' }],
        'h2-sm': ['2.25rem', { lineHeight: '2.813rem', fontWeight: '700' }],

        // H3 - 32px base (same at md)
        h3: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'h3-lg': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],
        'h3-sm': ['1.813rem', { lineHeight: '2.25rem', fontWeight: '700' }],

        // H4 - 26px base (same at md)
        h4: ['1.625rem', { lineHeight: '2rem', fontWeight: '700' }],
        'h4-lg': ['1.813rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'h4-sm': ['1.375rem', { lineHeight: '1.688rem', fontWeight: '700' }],

        // H5 - 20px base (same at md), lg and sm are same value
        h5: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'h5-lg': ['1.375rem', { lineHeight: '1.688rem', fontWeight: '700' }],

        // Body sizes
        'body-xl': ['1.4375rem', { lineHeight: '1.875rem', fontWeight: '400' }],
        'body-xl-bold': ['1.4375rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-lg-bold': ['1.125rem', { lineHeight: '1.375rem', fontWeight: '700' }],
        'body-md': ['1rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        'body-md-bold': ['1rem', { lineHeight: '1.375rem', fontWeight: '600' }],
        'body-sm': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        'body-sm-bold': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '700' }],

        // Button
        'button-lg': [
          '1rem',
          { lineHeight: '1.0625rem', fontWeight: '700', textTransform: 'uppercase' },
        ],

        // Eyebrow
        eyebrow: [
          '0.875rem',
          {
            lineHeight: '1.125rem',
            fontWeight: '700',
            letterSpacing: '0.175rem',
            textTransform: 'uppercase',
          },
        ],

        // Tags
        tag: ['0.625rem', { lineHeight: '0.75rem', fontWeight: '400' }],
        'tag-bold': ['0.6875rem', { lineHeight: '0.875rem', fontWeight: '600' }],
        'tag-light': ['0.625rem', { lineHeight: '0.75rem', fontWeight: '300' }],

        // Subtle
        subtle: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],

        // Menu
        m1: ['0.9375rem', { lineHeight: '1rem', fontWeight: '400', textTransform: 'uppercase' }],
        m2: ['1.125rem', { lineHeight: '1.25rem', fontWeight: '500', textTransform: 'capitalize' }],
        m3: ['1rem', { lineHeight: '1.3125rem', fontWeight: '500' }],

        // PDF
        'pdf-h1': ['3rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        'pdf-h3': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'pdf-body-headline': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
      },

      // Common spacing values used in components (converted to rem)
      spacing: {
        // Common values from Hero.js and other components
        4.5: '1.125rem', // 18px
        7: '1.8125rem', // 29px (mobile horizontal padding)
        11: '2.8125rem', // 45px (mobile top padding)
        13: '3.25rem', // 52px
        15: '3.75rem', // 60px
        17: '4.1875rem', // 67px (mobile bottom padding)
        18: '4.5rem', // 72px
        22: '5.5rem', // 88px
        25: '6.25rem', // 100px
        30: '7.5rem', // 120px
        37: '9.25rem', // 148px - common padding
        50: '12.5rem', // 200px
        75: '18.75rem', // 300px
        100: '25rem', // 400px
        150: '37.5rem', // 600px
      },

      // Max widths
      maxWidth: {
        content: '100rem', // 1600px - fullWidth breakpoint
        narrow: '55rem', // 880px
        wide: '75rem', // 1200px
        326: '81.5rem', // 1304px - LogoCube card width
      },

      // Border radius
      borderRadius: {
        sm: '0.1875rem', // 3px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        '2xl': '1rem', // 16px (default override)
        '3xl': '1.5rem', // 24px
        '4xl': '1.6875rem', // 27px (mobile rounded corners)
      },

      // Transitions
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },

      // Background gradients (reference CSS custom properties)
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
  corePlugins: {
    // Enable all core plugins
  },
};
