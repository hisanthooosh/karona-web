import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDExXS45RCnLFxgEnz6jww1R2R_hWGVQus",
  authDomain: "fb-test-8e4db.firebaseapp.com",
  databaseURL: "https://fb-test-8e4db-default-rtdb.firebaseio.com",
  projectId: "fb-test-8e4db",
  storageBucket: "fb-test-8e4db.appspot.com",
  messagingSenderId: "794561803633",
  appId: "1:794561803633:web:ca1785d1b7c5f8705bf2d0"
};
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)