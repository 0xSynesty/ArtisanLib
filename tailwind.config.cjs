/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
          "royal": "#072B73ff",
          "oxford": "#012340ff",
          "azure": "#9DDAFEff",
          "gunmetal": "#313940ff",
          "orange": "#ec5a12",
          "siver": "#BFB3A8ff"
      }
    }
  }
};

module.exports = config;