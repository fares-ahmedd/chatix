import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBmn-PzBI3-LeKp2DxywbtmgrhJC7JnC6E",
  authDomain: "chat-88026.firebaseapp.com",
  projectId: "chat-88026",
  storageBucket: "chat-88026.appspot.com",
  messagingSenderId: "168760086102",
  appId: "1:168760086102:web:fe6e9f966c4eeaa7ca75f7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
