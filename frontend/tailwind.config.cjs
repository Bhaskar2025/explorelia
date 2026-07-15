/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Synced with previous inline CDN config
        primary: "#10b774",
        "background-light": "#f6f8f7",
        "background-dark": "#10221b",
        "surface-light": "#f5e9dc", // Warm beige
        "surface-dark": "#2d2a3d", // Rich purple
        "text-light": "#5d4037", // Brown
        "text-dark": "#f8f6ff", // Light purple-white
        "muted-light": "#8d6e63", // Muted brown
        "muted-dark": "#b0a8cc", // Muted purple
        "card-light": "#ffffff",
        "card-dark": "#252236", // Card purple
        "border-light": "#d7ccc8", // Light terracotta
        "border-dark": "#5c567a", // Border purple
      },
      fontFamily: {
        display: ["Plus Jakarta Sans"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px"
      }
    },
  },
  plugins: [],
}
