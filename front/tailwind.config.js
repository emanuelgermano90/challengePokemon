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
      colors: { // en esta parte definimos las propiedades de estilos para la parte Dark y Light Mode.
        dark: {
          darkBackground: '#044784',
          bgBodyFrom: '#434f6e',
          bgBodyTo: '#0f2750',
          darkFrom: '#155E75',
          darkTo: '#2563EB',
          btInActive: '#334155',
          btInActiveHover: '#64748B',
          btnTextInActive: '#FCD34D',
          primaryText: '#FCD34D',
          secondText: '#000',
          thirdText: '#fff',
          bgCard: '#fff',
          bgCardFrom: '#007a52',
          bgCardTo: '#00235d',
          bgCardFromHov: '#5b0730',
          bgCardToHov: '#604800',
          borderColorPrimary: '#fff',
        },
        light: {
          lightBackground: '#ffffff',
          bgBodyFrom: '#427287',
          bgBodyTo: '#cccccc',
          lightFrom: '#598EFF',
          lightTo: '#8EACEC',
          btInActive: '#D2D2D2',
          btInActiveHover: '#969696',
          btnTextInActive: '#000',
          primaryText: '#FFF',
          secondText: '#FBBF24',
          thirdText: '#000',
          bgCard: '#000',
          bgCardFrom: '#4adead',
          bgCardTo: '#3b82f6',
          bgCardFromHov: '#ec4899',
          bgCardToHov: '#eab308',
          borderColorPrimary: '#444',
        },
      },
    },
  },
  plugins: [],
};
