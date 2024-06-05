import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default async function createChat({ combinedId, user, currentUser }) {
  try {
    const response = await getDoc(doc(db, "chats", combinedId));
    if (!response.exists()) {
      // todo: create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      // todo: create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${combinedId}.userInfo`]: {
          uid: user.uid,
          name: user.name,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}
