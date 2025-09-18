
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-4857532851-db1a1",
  appId: "1:909708043500:web:b823ec03ff8f46704e31c9",
  storageBucket: "studio-4857532851-db1a1.firebasestorage.app",
  apiKey: "AIzaSyDtQeyPtuf6j3N_HmE-X9IPpVAwH8kBBbw",
  authDomain: "studio-4857532851-db1a1.firebaseapp.com",
  messagingSenderId: "909708043500",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
