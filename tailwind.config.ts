// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mrl: {
          primary: "#1A2B4C",
          primarySoft: "#174669",

          accent: "#00B2A9",
          accentSoft: "#4ED1C1",

          success: "#00C271",
          warning: "#FFB94A",
          info: "#1A8CFF",

          danger: "#FF3737",
          dangerSoft: "#FF5A5F",

          card: "#FFFFFF",
          pageBg: "#F9FAFB",
          highlightBg: "#DDFFFF",

          border: "#D9D9D9",
          muted: "#656565",
        },
      },
      boxShadow: {
        mrlCard: "0 2px 8px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;



// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#00b2a9", // MRL button color
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;
