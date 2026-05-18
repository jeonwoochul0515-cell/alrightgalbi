import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsSupported, type Analytics } from 'firebase/analytics';
import { getPerformance, type FirebasePerformance } from 'firebase/performance';
import { getFunctions, connectFunctionsEmulator, type Functions } from 'firebase/functions';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const functions: Functions = getFunctions(app, 'asia-northeast3');

let analytics: Analytics | null = null;
let performance: FirebasePerformance | null = null;
let appCheck: AppCheck | null = null;

if (typeof window !== 'undefined') {
  if (import.meta.env.DEV) {
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  } else {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (siteKey) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
    void analyticsSupported().then((ok) => {
      if (ok) analytics = getAnalytics(app);
    });
    performance = getPerformance(app);
  }
}

export { analytics, performance, appCheck };
