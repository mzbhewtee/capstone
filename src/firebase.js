// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlzV07SDFrR5nnw6J3WW8njm7eEzcYRwc",
  authDomain: "capstone-1a204.firebaseapp.com",
  projectId: "capstone-1a204",
  storageBucket: "capstone-1a204.appspot.com",
  messagingSenderId: "913676746005",
  appId: "1:913676746005:web:f988449ea5715ffbbbfd1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage};