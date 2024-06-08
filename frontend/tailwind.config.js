const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // screens :{
  //   'sm': '400px',
  //     // => @media (min-width: 576px) { ... }

  //     'md': '960px',
  //     // => @media (min-width: 960px) { ... }

  //     'lg': '1440px',
  //     // => @media (min-width: 1440px) { ... }
  // }
});