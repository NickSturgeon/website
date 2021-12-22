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
        tmc: "url('./src/assets/img/bg-tmc.png')",
        "file-glow":
          "linear-gradient(120deg, rgba(164, 218, 228, 0.4) 10%, rgba(164, 218, 228, 0.1) 60%, rgba(164, 218, 228, 0.4) 80%, rgba(164, 218, 228, 0.4))",
      },
      boxShadow: {
        "file-glow": "0 0 8px 6px rgba(164, 218, 228, 0.4), inset 0 0 6px rgba(164, 218, 228, 0.4)",
      },
    },
  },
  plugins: [],
};
