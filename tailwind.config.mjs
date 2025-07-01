/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkRed: '#8B0000',
        blood: '#3B0000',
      },
      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
      },
      animation: {
        "scroll-watcher": "scroll-watcher linear",
      },
      keyframes: {
        "scroll-watcher": {
          to: { transform: "scaleX(1)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
