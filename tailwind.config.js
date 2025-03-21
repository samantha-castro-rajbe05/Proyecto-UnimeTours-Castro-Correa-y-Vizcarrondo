/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                serif: "sans-serif"
            }
        },
        screens: {
            minimum: "320px",
            tiny: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            resp: { max: "768px" }
        }
    },
    plugins: []
};

module.exports = {
    theme: {
      extend: {
        animation: {
          pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }
      }
    }
  }