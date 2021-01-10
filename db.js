import firebase from "firebase/app";
import "firebase/firestore";

export const config = {
  apiKey: "AIzaSyCozfQR8ZSoteD_OvkkxvWcHuxdEHb0-Is",
  authDomain: "gqmain-6ec8d.firebaseapp.com",
  databaseURL:
    "https://gqmain-6ec8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gqmain-6ec8d",
  storageBucket: "gqmain-6ec8d.appspot.com",
  messagingSenderId: "356938773788",
  appId: "1:356938773788:web:f27133aaa021f166bbf6d9",
  measurementId: "G-MV1WX9W2J2",
};

firebase.initializeApp(config);

export default firebase.firestore();
