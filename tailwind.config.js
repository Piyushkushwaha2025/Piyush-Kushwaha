/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'spin-3d': 'spin-3d 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
        },
        '.scrollbar-thumb-neutral-800': {
          scrollbarColor: 'rgba(38, 38, 38) transparent',
        },
        '.scrollbar-track-transparent': {
          scrollbarColor: 'rgba(38, 38, 38) transparent',
        },
      });
    }),
  ],
}
