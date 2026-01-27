/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Breakpoints from styles/media.js
      screens: {
        mob: { max: '480px' },
        tab: { min: '481px', max: '1024px' },
        desk: { min: '1025px', max: '1600px' },
        fw: { min: '1601px' },
        // Standard min-width breakpoints for mobile-first approach
        'sm': '481px',
        'md': '1025px',
        'lg': '1601px',
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

      // Font sizes mapped from styles/text.js (all rem values, use breakpoint prefixes for responsive)
      fontSize: {
        // Giant - 100px at fullWidth (1600px)
        'giant': ['6.25rem', { lineHeight: '6.875rem', fontWeight: '700' }],
        // Giant at desktop (1600px): 6.944vw = 111px = 6.944rem
        'giant-desk': ['6.944rem', { lineHeight: '7.639rem', fontWeight: '700' }],
        // Giant at tablet (1024px): 9.766vw = 100px = 6.25rem
        'giant-tab': ['6.25rem', { lineHeight: '6.875rem', fontWeight: '700' }],
        
        // Stat - 48px at fullWidth
        'stat': ['3rem', { lineHeight: '3.625rem', fontWeight: '500' }],
        
        // H1 - 46px at fullWidth (1600px)
        'h1': ['2.875rem', { lineHeight: '3.5rem', fontWeight: '800' }],
        // H1 at desktop (1600px): 3.194vw = 51px = 3.188rem
        'h1-desk': ['3.188rem', { lineHeight: '3.875rem', fontWeight: '800' }],
        // H1 at tablet (1024px): 4.492vw = 46px = 2.875rem
        'h1-tab': ['2.875rem', { lineHeight: '3.5rem', fontWeight: '800' }],
        // H1 at mobile (480px): 7.477vw = 36px = 2.25rem
        'h1-mob': ['2.25rem', { lineHeight: '2.813rem', fontWeight: '800' }],
        
        // H2 - 46px at fullWidth (1600px)
        'h2': ['2.875rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        // H2 at desktop (1600px): 3.194vw = 51px = 3.188rem
        'h2-desk': ['3.188rem', { lineHeight: '3.875rem', fontWeight: '700' }],
        // H2 at tablet (1024px): 4.492vw = 46px = 2.875rem
        'h2-tab': ['2.875rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        // H2 at mobile (480px): 7.477vw = 36px = 2.25rem
        'h2-mob': ['2.25rem', { lineHeight: '2.813rem', fontWeight: '700' }],
        
        // H3 - 32px at fullWidth (1600px)
        'h3': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        // H3 at desktop (1600px): 2.222vw = 36px = 2.25rem
        'h3-desk': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],
        // H3 at tablet (1024px): 3.125vw = 32px = 2rem
        'h3-tab': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        // H3 at mobile (480px): 6.075vw = 29px = 1.813rem
        'h3-mob': ['1.813rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        
        // H4 - 26px at fullWidth (1600px)
        'h4': ['1.625rem', { lineHeight: '2rem', fontWeight: '700' }],
        // H4 at desktop (1600px): 1.806vw = 29px = 1.813rem
        'h4-desk': ['1.813rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        // H4 at tablet (1024px): 2.539vw = 26px = 1.625rem
        'h4-tab': ['1.625rem', { lineHeight: '2rem', fontWeight: '700' }],
        // H4 at mobile (480px): 4.673vw = 22px = 1.375rem
        'h4-mob': ['1.375rem', { lineHeight: '1.688rem', fontWeight: '700' }],
        
        // H5 - 20px at fullWidth (1600px)
        'h5': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        // H5 at desktop (1600px): 1.389vw = 22px = 1.375rem
        'h5-desk': ['1.375rem', { lineHeight: '1.688rem', fontWeight: '700' }],
        // H5 at tablet (1024px): 1.953vw = 20px = 1.25rem
        'h5-tab': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        // H5 at mobile (480px): 4.673vw = 22px = 1.375rem
        'h5-mob': ['1.375rem', { lineHeight: '1.688rem', fontWeight: '700' }],
        
        // Body XL - 23px at fullWidth
        'body-xl': ['1.4375rem', { lineHeight: '1.875rem', fontWeight: '400' }],
        'body-xl-bold': ['1.4375rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        
        // Body LG - 18px at fullWidth
        'body-lg': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-lg-bold': ['1.125rem', { lineHeight: '1.375rem', fontWeight: '700' }],
        
        // Body MD - 16px at fullWidth
        'body-md': ['1rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        'body-md-bold': ['1rem', { lineHeight: '1.375rem', fontWeight: '600' }],
        
        // Body SM - 14px at fullWidth
        'body-sm': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        'body-sm-bold': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '700' }],
        
        // Button Large - 16px at fullWidth
        'button-lg': ['1rem', { lineHeight: '1.0625rem', fontWeight: '700', textTransform: 'uppercase' }],
        
        // Eyebrow - 14px at fullWidth
        'eyebrow': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '700', letterSpacing: '0.175rem', textTransform: 'uppercase' }],
        
        // Tag - 10px at fullWidth
        'tag': ['0.625rem', { lineHeight: '0.75rem', fontWeight: '400' }],
        'tag-bold': ['0.6875rem', { lineHeight: '0.875rem', fontWeight: '600' }],
        'tag-light': ['0.625rem', { lineHeight: '0.75rem', fontWeight: '300' }],
        
        // Subtle - 14px
        'subtle': ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        
        // Menu styles
        'm1': ['0.9375rem', { lineHeight: '1rem', fontWeight: '400', textTransform: 'uppercase' }],
        'm2': ['1.125rem', { lineHeight: '1.25rem', fontWeight: '500', textTransform: 'capitalize' }],
        'm3': ['1rem', { lineHeight: '1.3125rem', fontWeight: '500' }],
        
        // PDF specific
        'pdf-h1': ['3rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        'pdf-h3': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'pdf-body-headline': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
      },

      // Common spacing values used in components (converted to rem)
      spacing: {
        // Common values from Hero.js and other components
        '4.5': '1.125rem',    // 18px
        '13': '3.25rem',      // 52px
        '15': '3.75rem',      // 60px
        '18': '4.5rem',       // 72px
        '22': '5.5rem',       // 88px
        '25': '6.25rem',      // 100px
        '30': '7.5rem',       // 120px
        '37': '9.25rem',      // 148px - common padding
        '50': '12.5rem',      // 200px
        '75': '18.75rem',     // 300px
        '100': '25rem',       // 400px
        '150': '37.5rem',     // 600px
      },

      // Max widths
      maxWidth: {
        'content': '100rem',  // 1600px - fullWidth breakpoint
        'narrow': '55rem',    // 880px
        'wide': '75rem',      // 1200px
      },

      // Border radius
      borderRadius: {
        'sm': '0.1875rem',    // 3px
        'md': '0.5rem',       // 8px
        'lg': '1rem',         // 16px
        'xl': '1.5rem',       // 24px
      },

      // Transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
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
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Enable all core plugins
  },
};
