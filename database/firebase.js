// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDblwGey5mn6lKOKnUX3l75JYDGT5-9Z8E",
  authDomain: "react-native-crud-6c677.firebaseapp.com",
  projectId: "react-native-crud-6c677",
  storageBucket: "react-native-crud-6c677.appspot.com",
  messagingSenderId: "773923042132",
  appId: "1:773923042132:web:4ed181ad905855ab134ec1",
  measurementId: "G-FC5P2FN2F6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionRef = collection(db, "users");

export const addNewUser = (name, email, phone) => {
  try {
    addDoc(collectionRef, {
      nombre: name,
      email: email,
      num_telefono: phone,
    });
  } catch (error) {
    console.error("Error adding doc", error);
  }
};

export const onGetUsers = (callback) => onSnapshot(collectionRef, callback);
