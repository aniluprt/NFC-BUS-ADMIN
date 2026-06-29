/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: '#0095f6',
          blueDark: '#1877f2',
          bg: '#fafafa',
          border: '#dbdbdb',
          text: '#262626',
          textSecondary: '#8e8e8e',
        }
      }
    },
  },
  plugins: [],
}