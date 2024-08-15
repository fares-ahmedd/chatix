import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";

export default function useUsersList({ uid, idRef, setLoading }) {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const userRef = collection(db, "users");

    const usersQuery = query(
      userRef,
      where("name", ">=", ""),
      where("name", "<", "\uf8ff")
    );
    const unsub = onSnapshot(usersQuery, (data) => {
      const users = [];
      data.forEach((userData) => {
        if (userData.data().uid !== uid) {
          users.push(userData.data());
        }
      });
      setUsersList(users);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [uid, idRef, setLoading]);

  return usersList;
}
