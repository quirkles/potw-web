// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

import { getConfig } from "@/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = getConfig().firebase;

// Initialize Firebase

let app: FirebaseApp;
let appCheck: AppCheck;
let analytics: Analytics;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    console.log("Initializing Firebase app");
    console.log(firebaseConfig);
    app = initializeApp(firebaseConfig);
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(getConfig().recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
  return app;
}

export function getFirebaseAppCheck(): AppCheck {
  if (!appCheck) {
    getFirebaseApp();
  }
  return appCheck;
}

export function getFirebaseAnalytics(): Analytics {
  if (!analytics) {
    analytics = getAnalytics(getFirebaseApp());
  }
  return analytics;
}
