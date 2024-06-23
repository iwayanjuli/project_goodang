import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  });

  // Optionally add interceptors
  instance.interceptors.request.use(
    (config) => {
      // Modify request config if necessary
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // Modify response data if necessary
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Provide Axios instance to the app
  nuxtApp.provide("axios", instance);
});
