import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],
  build: {
    // extend(config, ctx) {
    //   // Konfigurasi tambahan di sini
    // },
  },
  // modules: ["@nuxtjs/axios"],
  // // axios: {
  // //   baseURL: process.env.BASE_URL || "http://localhost:3000",
  // //   // konfigurasi axios lainnya jika diperlukan
  // // },

  plugins: ["~/plugins/firebase.js"],
});
