/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          light: {
            primary: '#ffffff',
            secondary: '#f3f4f6',
            accent1: '#0ea5e9',
            accent2: '#8b5cf6',
            text: '#1f2937',
            'text-secondary': '#4b5563'
          },
          dark: {
            primary: '#000000',
            secondary: '#111827',
            accent1: '#22d3ee',
            accent2: '#a855f7',
            text: '#ffffff',
            'text-secondary': '#9ca3af'
          }
        }
      },
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'caveat': ['Caveat', 'cursive'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'slide-out': 'slideOut 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-120%)', opacity: '0' }
        },
        slideIn: {
          '0%': { transform: 'translateY(120%)', opacity: '0' },
          '80%': { transform: 'translateY(-10%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
}
