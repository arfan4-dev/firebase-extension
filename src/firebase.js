// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAisXAfWBPcasheo5OCMyP4Ci-pxNAVDRk",
  authDomain: "image-upload-fe348.firebaseapp.com",
  projectId: "image-upload-fe348",
  storageBucket: "image-upload-fe348.appspot.com",
  messagingSenderId: "821226479849",
  appId: "1:821226479849:web:7e66070cfa55fcb07b5078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;