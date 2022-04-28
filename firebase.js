// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh65iLnoBZRppOwA1OBcn5Q_gOKAIHy-Y",
  authDomain: "instagram-2-ad037.firebaseapp.com",
  projectId: "instagram-2-ad037",
  storageBucket: "instagram-2-ad037.appspot.com",
  messagingSenderId: "937157501974",
  appId: "1:937157501974:web:a65c6768c425e6a7770137"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};