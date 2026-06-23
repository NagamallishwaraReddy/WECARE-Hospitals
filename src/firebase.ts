import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxhUMzQwLg3OvOcvp6pkjfr0ybtZcz4k8",
  authDomain: "wecare-hospitals-ebfbc.firebaseapp.com",
  projectId: "wecare-hospitals-ebfbc",
  storageBucket: "wecare-hospitals-ebfbc.firebasestorage.app",
  messagingSenderId: "173843488686",
  appId: "1:173843488686:web:214721b4a21516c914323f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
