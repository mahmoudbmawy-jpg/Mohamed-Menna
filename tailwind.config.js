/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#11100E",
        secondary: "#191714",
        card: "#1E1C18",
        ivory: {
          DEFAULT: "#F4EFE7",
          muted: "#D8D0C4",
          subtle: "#A8A096",
        },
        champagne: {
          light: "#E3CAA5",
          DEFAULT: "#C8A978",
          dark: "#B99A67",
          deep: "#8E6D3B",
        },
        taupe: {
          light: "#B5ACA2",
          DEFAULT: "#8E8376",
          dark: "#5A5248",
        },
        borderGold: "rgba(200, 169, 120, 0.2)",
        goldGlow: "rgba(200, 169, 120, 0.08)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Cinzel", "Georgia", "serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "Inter", "Manrope", "sans-serif"],
        arabic: ["var(--font-amiri)", "Amiri", "Noto Naskh Arabic", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
        monumental: "0.5em",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "wax-glow": "waxGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        waxGlow: {
          "0%, 100%": { boxShadow: "0 0 25px rgba(200, 169, 120, 0.3)" },
          "50%": { boxShadow: "0 0 45px rgba(200, 169, 120, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
