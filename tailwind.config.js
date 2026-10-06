/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: { 50: '#eef5f1', 100: '#d5e6dc', 600: '#1f5a43', 700: '#174534', 900: '#0d2a20' },
        saffron: { 400: '#f6c34f', 500: '#f2b134', 600: '#d9961a' },
        paper: '#f6f8f5',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
