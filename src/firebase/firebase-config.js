//https://www.youtube.com/watch?v=2yNyiW_41H8
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  startAfter,
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAnalytics, logEvent } from "firebase/analytics";

// const analytics = getAnalytics();
// logEvent(analytics, "notification_received");
//Mit diesem Object verbinden wir die App mit dem Firebase Backend
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

//initialize app
const app = initializeApp(firebaseConfig);

//initialize services
const db = getFirestore();
const auth = getAuth(app);
// const auth = "getAuth(app)";

export { app, db, auth };
