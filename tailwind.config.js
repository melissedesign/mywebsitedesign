/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Elegant fonts for hero section
        'hero': [
          'Work Sans',
          'Inter',
          'system-ui',
          'sans-serif'
        ],
        'hero-alt': [
          'DM Sans',
          'Inter', 
          'system-ui',
          'sans-serif'
        ],
        'elegant': [
          'Satoshi',
          'Inter',
          'system-ui',
          'sans-serif'
        ],
        'refined': [
          'General Sans',
          'Inter',
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