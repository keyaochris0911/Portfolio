/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F5F7FA',
        'text-primary': '#2C3E50',
      },
    },
  },
  plugins: [],
}