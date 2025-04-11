"use client";
// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getFirestore } from "firebase/firestore";

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
    app = initializeApp(firebaseConfig);
    const reCaptchaEnterpriseProvider = new ReCaptchaEnterpriseProvider(
      getConfig().recaptchaSiteKey,
    );
    if (typeof window !== "undefined") {
      appCheck = initializeAppCheck(app, {
        provider: reCaptchaEnterpriseProvider,
        isTokenAutoRefreshEnabled: true,
      });
    }
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

export function getAppFirestore() {
  return getFirestore(getFirebaseApp());
}
