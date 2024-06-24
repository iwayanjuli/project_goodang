import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = {
    apiKey: nuxtApp.$config.firebaseConfig.apiKey,
    authDomain: nuxtApp.$config.firebaseConfig.authDomain,
    projectId: nuxtApp.$config.firebaseConfig.projectId,
    storageBucket: nuxtApp.$config.firebaseConfig.storageBucket,
    messagingSenderId: nuxtApp.$config.firebaseConfig.messagingSenderId,
    appId: nuxtApp.$config.firebaseConfig.appId,
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  let auth;

  if (process.client) {
    auth = getAuth(app);
    signInAnonymously(auth).catch((error) => {
      console.error("Error signing in anonymously:", error);
    });
  }

  nuxtApp.provide("firebase", app);
  nuxtApp.provide("firestore", firestore);
  if (auth) {
    nuxtApp.provide("auth", auth);
  }
});
