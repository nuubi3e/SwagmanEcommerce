import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'charcoal-grey': '#36454f',
        black: '#050505',
        white: '#ffffff',
        'off-white': '#f5f5f5',
        'off-white-light': '#f7f7f7',
        'off-white-dark': '#eee',
      },
      fontFamily: {
        primary: 'var(--font-pr)',
      },
      screens: {
        xs: '350px',
      },
    },
  },
  plugins: [],
};
export default config;
