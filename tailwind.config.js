/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Outfit',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
        // Elegant serif for headings and hero
        'serif': [
          'Cormorant Garamond',
          'Georgia',
          'serif'
        ],
        'hero': [
          'Cormorant Garamond',
          'Georgia',
          'serif'
        ],
        'hero-alt': [
          'Questrial',
          'Outfit',
          'system-ui',
          'sans-serif'
        ],
        'elegant': [
          'Outfit',
          'system-ui',
          'sans-serif'
        ],
        'refined': [
          'Questrial',
          'Outfit',
          'system-ui',
          'sans-serif'
        ]
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};