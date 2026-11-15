/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // paleta GOMES: laranja do símbolo, grafite do nome, creme de fundo
        laranja: '#F06722', laranja2: '#FF9A5C', grafite: '#14181d', grafite2: '#3A424B', creme: '#F4F2EE',
      },
      fontFamily: {
        serif: ['Montserrat', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
