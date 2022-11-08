/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs' : '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        nato : ['Noto Sans', 'sans'],
      },
      colors : {
        sun : '#FFBD00',
        flame : '#FF7733',
        safari : ""

      },
      backgroundImage: {
        'mobilebg': "url(../public/img/mobile_bg.png')",
        'mainbg': "url('../public/img/background.png')",
      }
    },
  },
  plugins: [],
}
