/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
// const spacing = require('tailwindcss/scripts/')

const Sizes = (count) => {
  const result = {}
  for (let i = 2; i <= count; i+=2) {
    result[`${i}`] = `${i}px`
  }
  return result
}



module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src//UI/**/*.{js,ts,jsx,tsx,mdx}',
    './build/*.html'
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      333: "#333",
      f9f9f9: "f9f9f9",
    },
    fontFamily: {
      comfortaa: ["'Comfortaa'", "sans-serif"],
      italiana: ["'Italiana'", "sans-serif"]
    },
    fontSize: {
      ...Sizes(128)
    }
  },
  plugins: [],
}
