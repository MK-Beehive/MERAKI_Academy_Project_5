// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const storage = getStorage();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1MufH2BPgL-znp5A96KOwUcfklQRcM5g",
  authDomain: "prokect5.firebaseapp.com",
  projectId: "prokect5",
  storageBucket: "prokect5.appspot.com",
  messagingSenderId: "709469792729",
  appId: "1:709469792729:web:3439180e2ac80c856f91c8",
  measurementId: "G-83CFQLQFX6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);