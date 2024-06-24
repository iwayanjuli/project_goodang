// https://nuxt.com/docs/api/configuration/nuxt-config

// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  plugins: ["~/plugins/firebase.js"],
});
