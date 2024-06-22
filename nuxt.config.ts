export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  plugins: ["~/plugins/firebase.js"],
});
