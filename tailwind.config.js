module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "black",
      white: "white",
      purple: "#4054B2",
      gold: "gold",
    },
    extend: {
      backgroundImage: {
        'zelda': "url('./src/assets/img/background.png')",
      }
    },
  },
  plugins: [],
}
