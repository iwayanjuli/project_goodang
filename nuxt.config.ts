import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],
  build: {
    // extend(config, ctx) {
    //   // Konfigurasi tambahan di sini
    // },
  },
  plugins: ["~/plugins/axios.js", "~/plugins/firebase.js"],
});
