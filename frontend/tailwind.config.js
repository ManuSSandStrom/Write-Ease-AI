/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F1A",
        panel: "#111827",
        surface: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.08)",
        accent: {
          purple: "#7C3AED",
          blue: "#4F46E5",
          cyan: "#22D3EE"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(79, 70, 229, 0.18)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at top, rgba(124,58,237,0.35), transparent 28%), radial-gradient(circle at bottom right, rgba(34,211,238,0.15), transparent 30%), linear-gradient(180deg, #0B0F1A 0%, #111827 100%)"
      }
    }
  },
  plugins: []
};

