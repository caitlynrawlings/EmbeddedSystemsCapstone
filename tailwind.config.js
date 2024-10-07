/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontSize: {
        'h1': '2.5rem',  // Custom size for h1
        'h2': '2rem',    // Custom size for h2
        'h3': '1.5rem', // Custom size for h3
      },
      fontWeight: {
        'h1': '400',     // Custom font weight for h1 (bold)
        'h2': '300',     // Custom font weight for h2 (semi-bold)
        'h3': '300',     // Custom font weight for h3 (medium)
      },
      rotate: {
        '135': '135deg',  // Add custom rotate value
      },
    },
  },
  plugins: [],
}

