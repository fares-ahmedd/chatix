import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createUser } from "./createUser";

export default async function sendData(
  email,
  password,
  name,
  file,
  setError,
  setIsLoading,
  navigate
) {
  try {
    setIsLoading(true);
    const response = await createUser(auth, email, password);
    if (!response)
      throw new Error(
        "something went wrong, maybe your email is already exist"
      );
    if (file) {
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setError(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(response.user, {
            displayName: name,
            photoURL: downloadURL,
          });
          const userData = {
            uid: response.user.uid,
            name,
            email,
            photoURL: downloadURL,
          };
          await setDoc(doc(db, "users", response.user.uid), userData);
          await setDoc(doc(db, "userChats", response.user.uid), {});
          navigate("/");
        }
      );
    } else {
      await updateProfile(response.user, {
        displayName: name,
        photoURL: null,
      });
      const userData = {
        uid: response.user.uid,
        name,
        email,
        photoURL: null,
      };
      await setDoc(doc(db, "users", response.user.uid), userData);
      await setDoc(doc(db, "userChats", response.user.uid), {});
      navigate("/");
    }
  } catch (error) {
    setError(error.message);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}
