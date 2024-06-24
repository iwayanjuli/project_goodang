// plugins/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM0YfcmGMeSeCbWxxfclP6BDDKAdlTxnI",
  authDomain: "goodang-project-3f7f4.firebaseapp.com",
  projectId: "goodang-project-3f7f4",
  storageBucket: "goodang-project-3f7f4.appspot.com",
  messagingSenderId: "399137880407",
  appId: "1:399137880407:web:fcd6bc7c9e3a15358aa612",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
let auth;

if (typeof window !== "undefined") {
  auth = getAuth(app);
  signInAnonymously(auth).catch((error) => {
    console.error("Error signing in anonymously:", error);
  });
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("firebase", app);
  nuxtApp.provide("firestore", firestore);
  if (auth) {
    nuxtApp.provide("auth", auth);
  }
});
