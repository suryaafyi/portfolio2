/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#f0ede8",
          secondary: "#e8e4de",
        },
        accent: {
          cream: "#f5e6c8",
          gold: "#f0c060",
          blue: "#4060ff",
          red: "#e8432d",
        },
        text: {
          primary: "#1a1a1a",
          muted: "#666666",
        },
        card: "#ffffff",
        glass: "rgba(26, 26, 26, 0.04)",
        "glass-border": "rgba(26, 26, 26, 0.08)",
      },
      fontFamily: {
        display: ["'Instrument Serif'", "'Playfair Display'", "serif"],
        body: ["'DM Sans'", "'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        hand: ["'Caveat'", "cursive"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
