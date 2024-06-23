import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],

  plugins: ["~/plugins/axios.js", "~/plugins/firebase.js"],

  build: {
    // Extend webpack config
    extend(config, ctx) {
      // Example: Add support for TypeScript
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          test: /\.ts$/,
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] },
        });
      }
    },
  },
});
