/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)',
        accent: 'var(--color-accent)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      backgroundColor: {
        'paper': 'var(--color-paper)',
      },
      textColor: {
        'ink': 'var(--color-ink)',
      }
    },
  },
  plugins: [],
}
