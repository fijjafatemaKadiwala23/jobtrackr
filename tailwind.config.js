export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "Inter", "sans-serif"],
      },
      colors: {
        harbor: "#0E2A36",
        lagoon: { DEFAULT: "#1F7A8C", light: "#4BA3B5" },
        mist: "#EEF3F4",
        marigold: "#E8A33D",
        pine: "#2E7D5B",
        plum: "#8B3A62",
      },
    },
  },
  plugins: [],
};
