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
        primary: {
          50: '#faf8fc',
          100: '#f5f0fa',
          200: '#ebe3f6',
          300: '#ddd0ef',
          400: '#c9b3e3',
          500: '#b799d4',
          600: '#a07fc0',
          700: '#8868a8',
          800: '#70548c',
          900: '#5c4573',
        },
        secondary: {
          50: '#f9f7fc',
          100: '#f3eef9',
          200: '#e8e0f4',
          300: '#d9cdec',
          400: '#c5b0e0',
          500: '#b196d2',
          600: '#9a7cbe',
          700: '#8264a4',
          800: '#6b5188',
          900: '#584370',
        }
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}