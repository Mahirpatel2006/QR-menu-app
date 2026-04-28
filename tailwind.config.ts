import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display SC"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#F57363',
          dark: '#E05A4A',
          light: '#FDDDD8',
        },
        bg: '#FAF7F2',
        surface: '#FFFFFF',
        sidebar: '#F5F1EB',
        border: '#EDE8E0',
        text: {
          primary: '#1C1410',
          secondary: '#6B635A',
          muted: '#A09588',
        },
        accent: {
          orange: '#F59E0B',
          green: '#22C55E',
          blue: '#60A5FA',
          purple: '#A78BFA',
        }
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(28,20,16,0.06)',
        'md': '0 4px 12px rgba(28,20,16,0.08)',
        'lg': '0 8px 24px rgba(28,20,16,0.10)',
        'hover': '0 12px 32px rgba(245,115,99,0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
