import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", instance);
});
