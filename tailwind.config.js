/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cormorant Garamond — high-contrast editorial serif for all headings
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        // DM Sans — clean modern sans for all UI text and body copy
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Royal Navy Blue — Stana's primary brand colour
        navy: {
          950: '#000C33',
          900: '#001050',
          800: '#0B2564',  // primary brand target
          700: '#0E2E78',
          600: '#143591',
          500: '#1a3a8f',
          400: '#2552C0',
          300: '#3D6CD4',
          200: '#6A92E0',
          100: '#D0DEFF',
          50:  '#EEF2FF',
        },
        // Gallery whites — warm off-white canvas palette
        gallery: {
          DEFAULT: '#F8F7F4',
          50:  '#FDFCFB',
          100: '#F8F7F4',
          200: '#F2F0EC',
          300: '#E8E5DF',
          400: '#D8D4CC',
          500: '#C4BEB3',
        },
        // Architectural charcoals — text hierarchy
        charcoal: {
          900: '#0D0D0D',
          800: '#1C1C1C',  // primary text
          700: '#2A2A2A',
          600: '#3A3A3A',
          500: '#4A4A4A',
          400: '#6A6A6A',  // secondary text
          300: '#8A8A8A',
          200: '#AAAAAA',  // muted text
          100: '#C8C8C8',
        },
      },
      letterSpacing: {
        widest: '0.4em',
        wider:  '0.25em',
        wide:   '0.15em',
      },
    },
  },
  plugins: [],
};
