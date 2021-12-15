module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#263457",
        gold: "gold",
        border: "#1c2a49",
      },
      spacing: {
        chartHeight: "400px",
        metricWidth: "7ch",
      },
      backgroundImage: {
        oot: "url('./src/assets/img/bg-oot.png')",
        mm: "url('./src/assets/img/bg-mm.png')",
      },
    },
  },
  plugins: [],
};
