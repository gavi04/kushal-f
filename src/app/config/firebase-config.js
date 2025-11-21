import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB_ZjdsnO75FwWZEe2BjISD8SCRo8eQU4",
  authDomain: "anand-feeds-c4396.firebaseapp.com",
  projectId: "anand-feeds-c4396",
  storageBucket: "anand-feeds-c4396.firebasestorage.app",
  messagingSenderId: "944662338639",
  appId: "1:944662338639:web:44696002b58ff0dd599e3a",
  measurementId: "G-SQ8M4XKFFV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
