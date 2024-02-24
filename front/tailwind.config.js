/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          darkBackground: '#044784',
          darkFrom: '#155E75',
          darkTo: '#2563EB',
          btInActive: '#334155',
          btInActiveHover: '#64748B',
          btnTextInActive: '#FCD34D',
          primaryText: '#FCD34D',
          secondText: '#FCD34D',
          bgCard: '#fff',
        },
        light: {
          lightBackground: '#ffffff',
          lightFrom: '#598EFF',
          lightTo: '#8EACEC',
          btInActive: '#D2D2D2',
          btInActiveHover: '#969696',
          btnTextInActive: '#000',
          primaryText: '#FFF',
          secondText: '#555',
          bgCard: '#000',
        },
      },
    },
  },
  plugins: [],
};
